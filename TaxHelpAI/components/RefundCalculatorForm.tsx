'use client';

import { useState } from 'react';

const filingStatuses = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married Filing Jointly' },
  { value: 'head', label: 'Head of Household' }
];

type Result = {
  taxable_income: number;
  tax_due: number;
  refund: number;
  status: 'Refund' | 'Balance Due';
};

export default function RefundCalculatorForm() {
  const [form, setForm] = useState({
    filing_status: 'single',
    dependents: 0,
    annual_income: 60000,
    federal_withheld: 8000,
    deductions: 0
  });
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: name === 'filing_status' ? value : Number(value) }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/tax/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!response.ok) {
        throw new Error('Failed to calculate refund');
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('Unable to calculate at this time.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={handleSubmit} className="card space-y-4 p-6">
        <h3 className="text-lg font-semibold">Refund calculator</h3>
        <label className="flex flex-col gap-2 text-sm">
          Filing status
          <select
            name="filing_status"
            value={form.filing_status}
            onChange={handleChange}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
          >
            {filingStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Dependents
          <input
            type="number"
            name="dependents"
            min={0}
            value={form.dependents}
            onChange={handleChange}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Annual income
          <input
            type="number"
            name="annual_income"
            min={0}
            value={form.annual_income}
            onChange={handleChange}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Federal tax withheld
          <input
            type="number"
            name="federal_withheld"
            min={0}
            value={form.federal_withheld}
            onChange={handleChange}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Additional deductions
          <input
            type="number"
            name="deductions"
            min={0}
            value={form.deductions}
            onChange={handleChange}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-primary-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? 'Calculating…' : 'Estimate refund'}
        </button>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </form>
      <div className="card p-6">
        <h3 className="text-lg font-semibold">Results</h3>
        {result ? (
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-slate-400">Taxable income</dt>
              <dd className="text-base font-semibold text-white">${result.taxable_income.toLocaleString()}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Tax due</dt>
              <dd className="text-base font-semibold text-white">${result.tax_due.toLocaleString()}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Refund</dt>
              <dd className="text-base font-semibold text-white">${result.refund.toLocaleString()}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Status</dt>
              <dd className="text-base font-semibold text-white">{result.status}</dd>
            </div>
          </dl>
        ) : (
          <p className="mt-4 text-sm text-slate-400">Run the calculator to preview your refund or balance due.</p>
        )}
      </div>
    </div>
  );
}
