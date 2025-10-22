import { calculateTax } from '../utils/taxCalculator';

describe('calculateTax', () => {
  it('computes refund for withheld greater than tax due', () => {
    const result = calculateTax({ filing_status: 'single', dependents: 1, income: 60000, withheld: 10000 });
    expect(result.status).toBe('Refund');
    expect(result.refund).toBeGreaterThan(0);
  });

  it('computes balance due when tax greater than withheld', () => {
    const result = calculateTax({ filing_status: 'married', dependents: 0, income: 200000, withheld: 10000 });
    expect(result.status).toBe('Balance Due');
    expect(result.tax_due).toBeGreaterThan(result.refund);
  });
});
