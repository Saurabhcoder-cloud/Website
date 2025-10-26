'use client';

import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { plans } from '../lib/stripe';

export default function SubscriptionManager() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const status = searchParams?.get('status');
    if (status === 'success') {
      setMessage('✅ Your plan is active.');
    }
  }, [searchParams]);

  const handleCheckout = async (planId: string) => {
    setLoadingPlan(planId);
    setMessage(null);
    try {
      const response = await fetch('/api/payment/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId })
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setMessage(data.message ?? 'Unable to start checkout.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Unable to start checkout.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="card space-y-6 p-6">
      <h3 className="text-lg font-semibold">Manage your subscription</h3>
      <p className="text-sm text-slate-300">
        Current plan: <span className="font-semibold text-white">{session?.user?.plan ?? 'free'}</span>
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {Object.values(plans).map((plan) => (
          <div key={plan.id} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h4 className="text-base font-semibold text-white">{plan.name}</h4>
            <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
            <p className="mt-3 text-2xl font-bold text-primary-300">${(plan.priceCents / 100).toFixed(2)}</p>
            <button
              className="mt-4 w-full rounded-xl bg-primary-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
              onClick={() => handleCheckout(plan.id)}
              disabled={loadingPlan === plan.id}
            >
              {loadingPlan === plan.id ? 'Redirecting…' : 'Upgrade'}
            </button>
          </div>
        ))}
      </div>
      {message && <p className="text-sm text-primary-200">{message}</p>}
    </div>
  );
}
