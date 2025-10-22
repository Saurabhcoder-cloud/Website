type FilingStatus = 'single' | 'married' | 'head';

type TaxInput = {
  filing_status: FilingStatus;
  dependents: number;
  income: number;
  withheld: number;
  deductions?: number;
};

const STANDARD_DEDUCTIONS: Record<FilingStatus, number> = {
  single: 13850,
  married: 27700,
  head: 20800
};

type TaxBracket = { limit: number; rate: number };

const BRACKETS: Record<FilingStatus, TaxBracket[]> = {
  single: [
    { limit: 11000, rate: 0.1 },
    { limit: 44725, rate: 0.12 },
    { limit: 95375, rate: 0.22 },
    { limit: 182100, rate: 0.24 },
    { limit: 231250, rate: 0.32 },
    { limit: 578125, rate: 0.35 },
    { limit: Infinity, rate: 0.37 }
  ],
  married: [
    { limit: 22000, rate: 0.1 },
    { limit: 89450, rate: 0.12 },
    { limit: 190750, rate: 0.22 },
    { limit: 364200, rate: 0.24 },
    { limit: 462500, rate: 0.32 },
    { limit: 693750, rate: 0.35 },
    { limit: Infinity, rate: 0.37 }
  ],
  head: [
    { limit: 15700, rate: 0.1 },
    { limit: 59850, rate: 0.12 },
    { limit: 95350, rate: 0.22 },
    { limit: 182100, rate: 0.24 },
    { limit: 231250, rate: 0.32 },
    { limit: 578100, rate: 0.35 },
    { limit: Infinity, rate: 0.37 }
  ]
};

function computeTaxableIncome({ filing_status, income, deductions }: TaxInput) {
  const standardDeduction = STANDARD_DEDUCTIONS[filing_status];
  const deduction = deductions ?? standardDeduction;
  return Math.max(0, income - deduction);
}

function applyBrackets(taxableIncome: number, status: FilingStatus) {
  let remaining = taxableIncome;
  let tax = 0;
  let previousLimit = 0;

  for (const bracket of BRACKETS[status]) {
    const bracketWidth = bracket.limit - previousLimit;
    const incomeInBracket = Math.min(remaining, bracketWidth);
    tax += incomeInBracket * bracket.rate;
    remaining -= incomeInBracket;
    previousLimit = bracket.limit;
    if (remaining <= 0) break;
  }

  return tax;
}

export function calculateTax(input: TaxInput) {
  const taxable_income = computeTaxableIncome(input);
  const childCredit = (input.dependents || 0) * 2000;
  const rawTax = applyBrackets(taxable_income, input.filing_status);
  const tax_due = Math.max(0, rawTax - childCredit);
  const refund = input.withheld - tax_due;
  return {
    taxable_income,
    tax_due,
    refund,
    status: refund >= 0 ? 'Refund' : 'Balance Due'
  };
}

export type TaxCalculationResponse = ReturnType<typeof calculateTax>;
