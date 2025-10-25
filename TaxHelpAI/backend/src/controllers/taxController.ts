import { Request, Response } from 'express';
import { calculateTax } from '../utils/taxCalculator';
import { parseTaxDocument, buildTaxSummaryFromOcr } from '../utils/ocr';
import { generateTaxSummaryPdf } from '../utils/pdfGenerator';
import pool from '../config/db';
import { AuthenticatedRequest } from '../types';

export function calculate(req: Request, res: Response) {
  const { filing_status, dependents = 0, annual_income, federal_withheld, deductions } = req.body;
  if (!filing_status || !annual_income || federal_withheld === undefined) {
    return res.status(400).json({ message: 'filing_status, annual_income and federal_withheld are required' });
  }
  const result = calculateTax({
    filing_status,
    dependents: Number(dependents) || 0,
    income: Number(annual_income),
    withheld: Number(federal_withheld),
    deductions: deductions ? Number(deductions) : undefined
  });
  return res.json(result);
}

export async function fileTaxes(req: AuthenticatedRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  if (!req.file) {
    return res.status(400).json({ message: 'Document upload is required' });
  }
  const parsed = await parseTaxDocument(req.file.path);
  const summary = await buildTaxSummaryFromOcr(parsed);
  const pdfPath = await generateTaxSummaryPdf(parsed, summary.calculation);
  await pool.query('INSERT INTO documents (user_id, file_path, metadata) VALUES ($1, $2, $3)', [
    req.user.id,
    pdfPath,
    JSON.stringify(parsed)
  ]);
  return res.json({
    pdf_url: pdfPath,
    refund: summary.calculation.refund,
    tax_due: summary.calculation.tax_due,
    extracted_fields: parsed
  });
}
