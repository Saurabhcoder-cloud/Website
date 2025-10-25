import { PDFDocument, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import env from '../config/env';

export async function generateTaxSummaryPdf(
  data: {
    employer: string;
    wages: number;
    withheldTax: number;
    ein: string;
    ssn: string;
  },
  calculation: { taxable_income: number; tax_due: number; refund: number; status: string }
) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([612, 792]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const { width, height } = page.getSize();

  const drawText = (text: string, y: number) => {
    page.drawText(text, { x: 50, y, size: 14, font });
  };

  drawText('TaxHelp AI – Form 1040 Summary', height - 80);
  drawText(`Employer: ${data.employer}`, height - 110);
  drawText(`Wages: $${data.wages.toFixed(2)}`, height - 140);
  drawText(`Federal Tax Withheld: $${data.withheldTax.toFixed(2)}`, height - 170);
  drawText(`EIN: ${data.ein}`, height - 200);
  drawText(`SSN: ${data.ssn}`, height - 230);
  drawText(`Taxable Income: $${calculation.taxable_income.toFixed(2)}`, height - 280);
  drawText(`Tax Due: $${calculation.tax_due.toFixed(2)}`, height - 310);
  drawText(`Refund: $${calculation.refund.toFixed(2)}`, height - 340);
  drawText(`Status: ${calculation.status}`, height - 370);

  const pdfBytes = await pdf.save();
  const filename = `tax-summary-${Date.now()}.pdf`;
  const outputPath = path.join(env.LOCAL_UPLOAD_DIR, filename);
  fs.mkdirSync(env.LOCAL_UPLOAD_DIR, { recursive: true });
  fs.writeFileSync(outputPath, pdfBytes);
  return outputPath;
}
