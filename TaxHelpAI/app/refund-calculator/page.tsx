import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import RefundCalculatorForm from '../../components/RefundCalculatorForm';
import { authOptions } from '../../lib/auth';

export default async function RefundCalculatorPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/refund-calculator');
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold text-white">Refund Calculator</h1>
      <p className="mt-2 text-sm text-slate-300">
        Estimate your refund or balance due using 2024 IRS brackets and child tax credits.
      </p>
      <div className="mt-8">
        <RefundCalculatorForm />
      </div>
    </div>
  );
}
