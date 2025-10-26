import { describe, expect, it } from 'vitest';

import { calculateTax } from '../lib/tax-calculator';

describe('calculateTax', () => {
  it('returns refund when withholding exceeds liability', () => {
    const result = calculateTax({
      filing_status: 'single',
      dependents: 1,
      annual_income: 60000,
      federal_withheld: 12000
    });

    expect(result.status).toBe('Refund');
    expect(result.refund).toBeGreaterThan(0);
  });

  it('returns balance due when liability exceeds withholding', () => {
    const result = calculateTax({
      filing_status: 'married',
      dependents: 0,
      annual_income: 200000,
      federal_withheld: 10000
    });

    expect(result.status).toBe('Balance Due');
    expect(result.tax_due).toBeGreaterThan(result.refund);
  });
});
