const STANDARD_DEDUCTION = {
  single: 13850,
  married: 27700,
  head: 20800
};

const TAX_BRACKETS_2024 = {
  single: [
    { limit: 11600, rate: 0.1 },
    { limit: 47150, rate: 0.12 },
    { limit: 100525, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243725, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 }
  ],
  married: [
    { limit: 23200, rate: 0.1 },
    { limit: 94300, rate: 0.12 },
    { limit: 201050, rate: 0.22 },
    { limit: 383900, rate: 0.24 },
    { limit: 487450, rate: 0.32 },
    { limit: 731200, rate: 0.35 },
    { limit: Infinity, rate: 0.37 }
  ],
  head: [
    { limit: 16550, rate: 0.1 },
    { limit: 63100, rate: 0.12 },
    { limit: 100500, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: 243700, rate: 0.32 },
    { limit: 609350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 }
  ]
};

const CHILD_TAX_CREDIT_PER_DEPENDENT = 2000;

function roundCurrency(value) {
  return Math.round(value * 100) / 100;
}

function calculateBracketTax(brackets, taxableIncome) {
  let tax = 0;
  let previousLimit = 0;

  for (const bracket of brackets) {
    if (taxableIncome <= previousLimit) {
      break;
    }

    const incomeInBracket = Math.min(taxableIncome, bracket.limit) - previousLimit;

    if (incomeInBracket > 0) {
      tax += incomeInBracket * bracket.rate;
    }

    previousLimit = bracket.limit;
  }

  return tax;
}

export function calculateTaxLiability({ filingStatus, dependents = 0, income = 0, withheld = 0 }) {
  const normalizedStatus = filingStatus?.toLowerCase();
  const deduction = STANDARD_DEDUCTION[normalizedStatus];

  if (!deduction) {
    throw new Error('Invalid filing status. Expected single, married, or head.');
  }

  const sanitizedDependents = Number.isFinite(dependents) ? dependents : Number(dependents);
  const sanitizedIncome = Number.isFinite(income) ? income : Number(income);
  const sanitizedWithheld = Number.isFinite(withheld) ? withheld : Number(withheld);

  if ([sanitizedDependents, sanitizedIncome, sanitizedWithheld].some((value) => Number.isNaN(value))) {
    throw new Error('Dependents, income, and withheld must be numeric.');
  }

  const nonNegativeDependents = Math.max(0, Math.floor(sanitizedDependents));
  const grossIncome = Math.max(0, sanitizedIncome);
  const withheldAmount = Math.max(0, sanitizedWithheld);

  const taxableIncomeRaw = grossIncome - deduction;
  const taxableIncome = Math.max(0, taxableIncomeRaw);

  const brackets = TAX_BRACKETS_2024[normalizedStatus];
  const preCreditTax = calculateBracketTax(brackets, taxableIncome);
  const credits = nonNegativeDependents * CHILD_TAX_CREDIT_PER_DEPENDENT;
  const taxDueBeforeFloor = preCreditTax - credits;
  const taxDue = Math.max(0, taxDueBeforeFloor);
  const refund = withheldAmount - taxDue;
  const status = refund >= 0 ? 'Refund' : 'Balance Due';

  return {
    taxable_income: roundCurrency(taxableIncome),
    tax_due: roundCurrency(taxDue),
    refund: roundCurrency(refund),
    status
  };
}

export default calculateTaxLiability;
