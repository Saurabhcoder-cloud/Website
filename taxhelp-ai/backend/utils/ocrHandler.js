import vision from '@google-cloud/vision';

import { calculateTaxLiability } from './taxCalculation.js';
import { generateForm1040Pdf } from './pdfGenerator.js';

function decodeVisionCredentials() {
  const raw = process.env.GOOGLE_VISION_KEY;

  if (!raw) {
    return null;
  }

  try {
    const json = raw.trim().startsWith('{')
      ? raw
      : Buffer.from(raw, 'base64').toString('utf8');

    const credentials = JSON.parse(json);

    if (!credentials.project_id) {
      throw new Error('Missing project_id in Google Vision credentials.');
    }

    return {
      credentials,
      projectId: credentials.project_id
    };
  } catch (error) {
    const err = new Error('Invalid GOOGLE_VISION_KEY environment variable. Provide a JSON string or base64 encoded service account.');
    err.name = 'VisionCredentialsError';
    err.cause = error;
    throw err;
  }
}

function buildVisionClient() {
  const decoded = decodeVisionCredentials();

  if (decoded) {
    return new vision.ImageAnnotatorClient({
      credentials: decoded.credentials,
      projectId: decoded.projectId
    });
  }

  return new vision.ImageAnnotatorClient();
}

function normalizeCurrency(value) {
  if (!value) {
    return 0;
  }

  const sanitized = String(value)
    .replace(/[^0-9.,-]/g, '')
    .replace(/,/g, '');

  const parsed = Number.parseFloat(sanitized);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function findLine(lines, predicate) {
  const index = lines.findIndex(predicate);
  if (index === -1) {
    return null;
  }

  const line = lines[index];
  const nextLine = lines[index + 1] ?? null;
  return { line, nextLine };
}

function extractEmployer(lines) {
  const match = findLine(lines, (line) => /employer/i.test(line));
  if (!match) {
    return lines[0] ?? '';
  }

  const cleaned = match.line.replace(/employer[:\s-]*/i, '').trim();
  if (cleaned) {
    return cleaned;
  }

  return match.nextLine ? match.nextLine.trim() : '';
}

function extractPattern(text, label, regex) {
  const pattern = regex ?? new RegExp(`${label}[^\d]*([\d-]{4,})`, 'i');
  const result = pattern.exec(text);
  return result ? result[1].replace(/[^\d-]/g, '') : '';
}

function extractCurrencyFromText(text, labels) {
  for (const label of labels) {
    const regex = new RegExp(`${label}[\s:]*([$]?[-\d,.]+)`, 'i');
    const match = regex.exec(text);
    if (match) {
      return normalizeCurrency(match[1]);
    }
  }

  return 0;
}

function buildForm1040Payload(extracted, taxSummary) {
  return {
    filer: {
      social_security_number: extracted.ssn || ''
    },
    employer: {
      name: extracted.employer || '',
      identification_number: extracted.ein || ''
    },
    wages: extracted.wages,
    federal_income_tax_withheld: extracted.withheld,
    totals: taxSummary
  };
}

export async function processTaxDocument(fileBuffer, options = {}) {
  if (!fileBuffer || !(fileBuffer instanceof Buffer)) {
    throw new Error('A valid file buffer is required for OCR processing.');
  }

  let client;
  try {
    client = buildVisionClient();
  } catch (error) {
    error.message = error.message || 'Failed to initialize Google Vision client.';
    throw error;
  }

  let visionResponse;
  try {
    visionResponse = await client.textDetection({ image: { content: fileBuffer } });
  } catch (error) {
    const err = new Error('Google Vision API request failed. Verify your credentials and network access.');
    err.name = 'VisionApiError';
    err.cause = error;
    throw err;
  }

  const [result] = visionResponse;
  const text = result?.fullTextAnnotation?.text;

  if (!text) {
    const error = new Error('Unable to detect text in the provided document.');
    error.name = 'EmptyOcrResultError';
    throw error;
  }

  const lines = text
    .split(/\r?\n/) // split on newline variations
    .map((line) => line.trim())
    .filter(Boolean);

  const extracted = {
    employer: extractEmployer(lines),
    wages: extractCurrencyFromText(text, ['wages', 'w-2 box 1', 'box 1']),
    withheld: extractCurrencyFromText(text, ['federal income tax withheld', 'withheld tax', 'box 2']),
    ein: extractPattern(text, 'EIN', /(EIN|Employer Identification Number)[^\d]*([\d-]{4,})/i),
    ssn: extractPattern(text, 'SSN', /(SSN|Social Security Number)[^\d]*([\d-]{4,})/i)
  };

  const filingStatus = options.filingStatus ?? 'single';
  const dependents = Number.parseInt(options.dependents ?? '0', 10);

  const taxSummary = calculateTaxLiability({
    filingStatus,
    dependents: Number.isNaN(dependents) ? 0 : dependents,
    income: extracted.wages,
    withheld: extracted.withheld
  });

  const form1040 = buildForm1040Payload(extracted, taxSummary);

  const pdfBuffer = await generateForm1040Pdf({
    form1040,
    source: {
      name: options.originalName,
      mimeType: options.mimeType
    }
  });

  return {
    extractedFields: extracted,
    form1040,
    taxSummary,
    pdfBuffer
  };
}

export default {
  processTaxDocument
};
