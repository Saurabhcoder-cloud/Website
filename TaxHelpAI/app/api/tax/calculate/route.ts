import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import prisma from '../../../../lib/db';
import { authOptions } from '../../../../lib/auth';
import { calculateTax } from '../../../../lib/tax-calculator';
import { taxCalculateSchema } from '../../../../lib/zod';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = taxCalculateSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const result = calculateTax(parsed.data);

  await prisma.taxData.create({
    data: {
      userId: Number(session.user.id),
      filingStatus: parsed.data.filing_status,
      dependents: parsed.data.dependents,
      annualIncome: parsed.data.annual_income,
      federalWithheld: parsed.data.federal_withheld,
      deductions: parsed.data.deductions ?? 0
    }
  });

  return NextResponse.json(result);
}
