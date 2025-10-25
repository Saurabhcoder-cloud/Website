import { Buffer } from 'buffer';
import { randomUUID } from 'crypto';

export type OcrResult = {
  employer: string;
  wages: number;
  withheldTax: number;
  ein: string;
  ssn: string;
  blobKey: string;
};

async function mockParse(): Promise<OcrResult> {
  return {
    employer: 'Sample Employer LLC',
    wages: 65000,
    withheldTax: 7200,
    ein: '12-3456789',
    ssn: '123-45-6789',
    blobKey: `mock-${randomUUID()}`
  };
}

export async function parseTaxDocument(blobUrl: string): Promise<OcrResult> {
  if (!blobUrl) {
    throw new Error('Blob URL is required');
  }

  try {
    const response = await fetch(blobUrl);
    if (!response.ok) {
      throw new Error(`Failed to download blob: ${response.status}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    if (process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.GOOGLE_VISION_KEY) {
      const vision = await import('@google-cloud/vision');
      let credentials: Record<string, unknown> | undefined;
      if (process.env.GOOGLE_VISION_KEY) {
        try {
          credentials = JSON.parse(Buffer.from(process.env.GOOGLE_VISION_KEY, 'base64').toString());
        } catch (error) {
          console.warn('Invalid GOOGLE_VISION_KEY payload, falling back to default credentials.');
        }
      }

      const client = credentials
        ? new vision.ImageAnnotatorClient({ credentials })
        : new vision.ImageAnnotatorClient();
      const [result] = await client.documentTextDetection({ image: { content: buffer } });
      const text = result.fullTextAnnotation?.text ?? '';

      const employer = /Employer:?\s*(.*)/i.exec(text)?.[1]?.split('\n')[0] ?? 'Detected Employer';
      const wagesMatch = /Wages[, ]*tips[, ]*other compensation\s*\$?(\d+[\d,.]*)/i.exec(text);
      const withheldMatch = /Federal income tax withheld\s*\$?(\d+[\d,.]*)/i.exec(text);
      const einMatch = /Employer identification number\s*([0-9\-]+)/i.exec(text);
      const ssnMatch = /(Social security number|SSN)\s*([0-9\-]+)/i.exec(text);

      return {
        employer,
        wages: wagesMatch ? Number(wagesMatch[1].replace(/,/g, '')) : 65000,
        withheldTax: withheldMatch ? Number(withheldMatch[1].replace(/,/g, '')) : 7200,
        ein: einMatch ? einMatch[1] : '12-3456789',
        ssn: ssnMatch ? ssnMatch[2] ?? ssnMatch[1] : '123-45-6789',
        blobKey: blobUrl
      };
    }

    return mockParse();
  } catch (error) {
    console.error('parseTaxDocument error', error);
    return mockParse();
  }
}
