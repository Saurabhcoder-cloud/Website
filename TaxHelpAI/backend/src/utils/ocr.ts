import env from '../config/env';
import { calculateTax } from './taxCalculator';

type OcrResult = {
  employer: string;
  wages: number;
  withheldTax: number;
  ein: string;
  ssn: string;
};

export async function parseTaxDocument(filePath: string): Promise<OcrResult> {
  if (!env.GOOGLE_VISION_API_KEY) {
    return {
      employer: 'Mock Employer Inc.',
      wages: 75000,
      withheldTax: 9000,
      ein: '12-3456789',
      ssn: '123-45-6789'
    };
  }

  // Real implementation would go here; for brevity we simulate the same.
  return {
    employer: 'Vision Parsed Employer',
    wages: 82000,
    withheldTax: 9500,
    ein: '98-7654321',
    ssn: '987-65-4321'
  };
}

export async function buildTaxSummaryFromOcr(data: OcrResult) {
  const calculation = calculateTax({
    filing_status: 'single',
    dependents: 0,
    income: data.wages,
    withheld: data.withheldTax
  });

  return { extracted: data, calculation };
}
