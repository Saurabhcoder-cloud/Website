import { PDFDocument, StandardFonts } from 'pdf-lib';
import { put } from '@vercel/blob';

type TaxSummary = {
  employer: string;
  wages: number;
  withheldTax: number;
  ein: string;
  ssn: string;
};

type Calculation = {
  taxable_income: number;
  tax_due: number;
  refund: number;
  status: 'Refund' | 'Balance Due';
};

export async function createTaxSummaryPdf(fields: TaxSummary, calculation: Calculation) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  const drawText = (text: string, y: number) => {
    page.drawText(text, { x: 50, y, size: 12, font });
  };

  drawText('TaxHelp AI - Form 1040 Summary', 780);
  drawText(`Employer: ${fields.employer}`, 740);
  drawText(`Wages: $${fields.wages.toLocaleString()}`, 720);
  drawText(`Withheld Tax: $${fields.withheldTax.toLocaleString()}`, 700);
  drawText(`EIN: ${fields.ein}`, 680);
  drawText(`SSN: ${fields.ssn}`, 660);

  drawText(`Taxable Income: $${calculation.taxable_income.toLocaleString()}`, 620);
  drawText(`Tax Due: $${calculation.tax_due.toLocaleString()}`, 600);
  drawText(`Refund: $${calculation.refund.toLocaleString()}`, 580);
  drawText(`Status: ${calculation.status}`, 560);

  const bytes = await pdf.save();
  return bytes;
}

export async function persistPdf(bytes: Uint8Array) {
  if (!bytes) {
    throw new Error('PDF bytes missing');
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    const base64 = Buffer.from(bytes).toString('base64');
    return {
      url: `data:application/pdf;base64,${base64}`,
      expiresIn: 60 * 60 * 24
    };
  }

  const blob = await put(`taxhelp-${Date.now()}.pdf`, bytes, {
    access: 'authenticated',
    contentType: 'application/pdf'
  });

  return {
    url: blob.url,
    expiresIn: blob.expires ?? 60 * 60 * 24,
    blob
  };
}
