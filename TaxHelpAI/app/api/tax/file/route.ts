export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import prisma from '../../../../lib/db';
import { authOptions } from '../../../../lib/auth';
import { parseTaxDocument } from '../../../../lib/ocr';
import { createTaxSummaryPdf, persistPdf } from '../../../../lib/pdf';
import { calculateTax } from '../../../../lib/tax-calculator';
import { fileTaxSchema } from '../../../../lib/zod';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = fileTaxSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const ocrResult = await parseTaxDocument(parsed.data.blobUrl);
  const calculation = calculateTax({
    filing_status: 'single',
    dependents: 0,
    annual_income: ocrResult.wages,
    federal_withheld: ocrResult.withheldTax
  });

  await prisma.taxData.create({
    data: {
      userId: Number(session.user.id),
      filingStatus: 'single',
      dependents: 0,
      annualIncome: ocrResult.wages,
      federalWithheld: ocrResult.withheldTax,
      deductions: 0
    }
  });

  const pdfBytes = await createTaxSummaryPdf(
    {
      employer: ocrResult.employer,
      wages: ocrResult.wages,
      withheldTax: ocrResult.withheldTax,
      ein: ocrResult.ein,
      ssn: ocrResult.ssn
    },
    calculation
  );

  const persisted = await persistPdf(pdfBytes);

  const document = await prisma.document.create({
    data: {
      userId: Number(session.user.id),
      kind: 'Form 1040 Summary',
      blobKey: persisted.url,
      meta: {
        ocrResult,
        calculation,
        language: parsed.data.language
      }
    }
  });

  return NextResponse.json({
    extracted: ocrResult,
    calculation,
    file: {
      url: persisted.url,
      expires_in: persisted.expiresIn
    },
    documentId: document.id
  });
}
