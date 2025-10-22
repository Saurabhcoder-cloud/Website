'use client';

import { useState } from 'react';
import api from '../lib/api';

const statuses = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married Filing Jointly' },
  { value: 'head', label: 'Head of Household' }
];

export default function RefundCalculatorForm() {
  const [form, setForm] = useState({ filing_status: 'single', dependents: 0, annual_income: 60000, federal_withheld: 8000 });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/api/tax/calculate', {
        ...form,
        dependents: Number(form.dependents),
        annual_income: Number(form.annual_income),
        federal_withheld: Number(form.federal_withheld)
      });
      setResult(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-slate-700">Filing Status</label>
          <select
            name="filing_status"
            value={form.filing_status}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Dependents</label>
          <input
            type="number"
            name="dependents"
            value={form.dependents}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Annual Income</label>
          <input
            type="number"
            name="annual_income"
            value={form.annual_income}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Federal Tax Withheld</label>
          <input
            type="number"
            name="federal_withheld"
            value={form.federal_withheld}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-secondary disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? 'Calculating…' : 'Calculate Refund'}
        </button>
      </form>
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-primary">Results</h3>
        {result ? (
          <div className="mt-4 space-y-2 text-sm">
            <p>Taxable Income: ${result.taxable_income?.toFixed?.(2) ?? result.taxable_income}</p>
            <p>Tax Due: ${result.tax_due?.toFixed?.(2) ?? result.tax_due}</p>
            <p>Refund: ${result.refund?.toFixed?.(2) ?? result.refund}</p>
            <p>Status: {result.status}</p>
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-500">Fill in your information to see estimated results.</p>
        )}
      </div>
    </div>
  );
}
