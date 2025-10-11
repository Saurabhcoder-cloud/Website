import { calculateTaxLiability } from '../utils/taxCalculation.js';

function buildSamplePayload() {
  return {
    request: {
      filing_status: 'single',
      dependents: 1,
      income: 85000,
      withheld: 12000
    }
  };
}

export function calculateTax(req, res) {
  const { filing_status, dependents, income, withheld } = req.body ?? {};

  const errors = [];
  const allowedStatuses = ['single', 'married', 'head'];

  if (!filing_status || !allowedStatuses.includes(String(filing_status).toLowerCase())) {
    errors.push('filing_status must be one of: single, married, head.');
  }

  const numericChecks = [
    { key: 'dependents', value: dependents, min: 0 },
    { key: 'income', value: income, min: 0 },
    { key: 'withheld', value: withheld, min: 0 }
  ];

  for (const check of numericChecks) {
    const parsed = Number(check.value);
    if (check.value === undefined || Number.isNaN(parsed)) {
      errors.push(`${check.key} must be provided as a number.`);
    } else if (parsed < check.min) {
      errors.push(`${check.key} cannot be negative.`);
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'validation_error',
      message: 'Unable to calculate tax with the provided payload.',
      details: errors,
      sample: buildSamplePayload()
    });
  }

  try {
    const result = calculateTaxLiability({
      filingStatus: filing_status,
      dependents: Number(dependents),
      income: Number(income),
      withheld: Number(withheld)
    });

    return res.json({
      message: 'Tax calculation completed successfully.',
      result,
      sample: {
        ...buildSamplePayload(),
        response: result
      }
    });
  } catch (error) {
    console.error('Tax calculation failed:', error);
    return res.status(500).json({
      error: 'calculation_failed',
      message: 'An unexpected error occurred while calculating the tax liability.'
    });
  }
}

export default {
  calculateTax
};
