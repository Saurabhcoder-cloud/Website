'use client';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PlanCard from '../../components/PlanCard';
import { useAuth } from '../../hooks/useAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import api from '../../lib/api';

const plans = [
  {
    name: 'Standard',
    price: '$9/mo',
    id: 'standard',
    features: ['Single W-2 filing', 'Refund calculator', 'Email reminders']
  },
  {
    name: 'Pro',
    price: '$19/mo',
    id: 'pro',
    features: ['1099 & Schedule C', 'Priority AI chat', 'PDF exports']
  },
  {
    name: 'Premium',
    price: '$29/mo',
    id: 'premium',
    features: ['Joint filing', 'Deadline reminders', 'Dedicated tax concierge']
  }
];

export default function SubscriptionPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  useEffect(() => {
    const status = params?.get('status');
    if (status === 'success') {
      alert('✅ Your subscription is now active.');
    }
  }, [params]);

  if (!user) return null;

  const handleSelectPlan = async (plan: string) => {
    try {
      const { data } = await api.post('/api/payment/create-checkout-session', { plan });
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      alert('Unable to start checkout. Please try again later.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-slate-100 py-10">
        <div className="mx-auto max-w-5xl space-y-6 px-4">
          <h1 className="text-3xl font-semibold text-slate-900">Upgrade your plan</h1>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                name={plan.name}
                price={plan.price}
                features={plan.features}
                onSelect={() => handleSelectPlan(plan.id)}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
