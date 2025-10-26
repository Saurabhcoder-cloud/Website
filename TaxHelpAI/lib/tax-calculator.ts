type FilingStatus = 'single' | 'married' | 'head';

type TaxInput = {
  filing_status: FilingStatus;
  dependents: number;
  annual_income: number;
  federal_withheld: number;
  deductions?: number;
};

const STANDARD_DEDUCTION: Record<FilingStatus, number> = {
  single: 13850,
  married: 27700,
  head: 20800
};

const BRACKETS: Record<FilingStatus, { upTo: number; rate: number }[]> = {
  single: [
    { upTo: 11000, rate: 0.1 },
    { upTo: 44725, rate: 0.12 },
    { upTo: 95375, rate: 0.22 },
    { upTo: 182100, rate: 0.24 },
    { upTo: 231250, rate: 0.32 },
    { upTo: 578125, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 }
  ],
  married: [
    { upTo: 22000, rate: 0.1 },
    { upTo: 89450, rate: 0.12 },
    { upTo: 190750, rate: 0.22 },
    { upTo: 364200, rate: 0.24 },
    { upTo: 462500, rate: 0.32 },
    { upTo: 693750, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 }
  ],
  head: [
    { upTo: 15700, rate: 0.1 },
    { upTo: 59850, rate: 0.12 },
    { upTo: 95350, rate: 0.22 },
    { upTo: 182100, rate: 0.24 },
    { upTo: 231250, rate: 0.32 },
    { upTo: 578100, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 }
  ]
};

function computeLiability(taxableIncome: number, status: FilingStatus) {
  let remaining = taxableIncome;
  let previousCap = 0;
  let tax = 0;

  for (const bracket of BRACKETS[status]) {
    const cap = bracket.upTo;
    const incomeInBracket = Math.min(remaining, cap - previousCap);
    if (incomeInBracket <= 0) {
      continue;
    }
    tax += incomeInBracket * bracket.rate;
    remaining -= incomeInBracket;
    previousCap = cap;
    if (remaining <= 0) break;
  }

  return Math.max(0, tax);
}

export function calculateTax(input: TaxInput) {
  const deduction = STANDARD_DEDUCTION[input.filing_status] ?? STANDARD_DEDUCTION.single;
  const taxableBase = Math.max(0, input.annual_income - deduction - (input.deductions ?? 0));
  const childCredit = Math.min(input.dependents * 2000, 2000 * input.dependents);
  const taxDueBeforeCredits = computeLiability(taxableBase, input.filing_status);
  const taxDue = Math.max(0, taxDueBeforeCredits - childCredit);
  const refund = Math.max(0, input.federal_withheld - taxDue);
  return {
    taxable_income: Math.round(taxableBase),
    tax_due: Math.round(taxDue),
    refund: Math.round(refund),
    status: refund > 0 ? 'Refund' : 'Balance Due'
  } as const;
}
