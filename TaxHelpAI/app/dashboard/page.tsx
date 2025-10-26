import { redirect } from 'next/navigation';

import DashboardTabs from '../../components/DashboardTabs';
import { getServerSession } from 'next-auth';

import { authOptions } from '../../lib/auth';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/dashboard');
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      <p className="mt-2 text-sm text-slate-300">
        Access your AI assistant, refund calculator, OCR filing tools, documents, and subscription controls in one place.
      </p>
      <div className="mt-10">
        <DashboardTabs />
      </div>
    </div>
  );
}
