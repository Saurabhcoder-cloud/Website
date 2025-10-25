import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RefundCalculatorPage() {
  const [income, setIncome] = useState('');
  const [deductions, setDeductions] = useState('');
  const [estimatedRefund, setEstimatedRefund] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const incomeValue = Number(income) || 0;
    const deductionValue = Number(deductions) || 0;
    const taxable = Math.max(incomeValue - deductionValue, 0);
    const estimate = Math.round(taxable * 0.12 * -1);
    setEstimatedRefund(estimate);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-14">
        <header>
          <h1 className="text-3xl font-semibold text-slate-900">Refund calculator</h1>
          <p className="text-sm text-slate-600">
            Quickly approximate your tax refund by entering income and deductions. Replace this logic with the backend calculator.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <label className="block text-sm font-medium text-slate-700">
            Annual gross income
            <input
              type="number"
              value={income}
              onChange={(event) => setIncome(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Itemized deductions
            <input
              type="number"
              value={deductions}
              onChange={(event) => setDeductions(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Estimate refund
          </button>
        </form>

        {estimatedRefund !== null && (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <p className="text-sm text-slate-500">Estimated refund (placeholder):</p>
            <p className="text-2xl font-semibold text-indigo-600">${estimatedRefund.toLocaleString()}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
