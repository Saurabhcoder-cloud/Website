'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RefundCalculatorForm from '../../components/RefundCalculatorForm';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RefundCalculatorPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-slate-100 py-10">
        <div className="mx-auto max-w-5xl space-y-6 px-4">
          <h1 className="text-3xl font-semibold text-slate-900">Refund Calculator</h1>
          <RefundCalculatorForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
