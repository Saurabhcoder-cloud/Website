'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PlanCard from '../components/PlanCard';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Suspense } from 'react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    features: ['Multilingual IRS chat', 'Demo refund calculator', 'Community resources'],
    href: '/subscription?plan=free'
  },
  {
    name: 'Standard',
    price: '$9/mo',
    features: ['Single W-2 filing', 'OCR document scanning', 'Email reminders'],
    href: '/subscription?plan=standard'
  },
  {
    name: 'Pro',
    price: '$19/mo',
    features: ['1099 + Schedule C support', 'Priority AI chat', 'PDF form exports'],
    href: '/subscription?plan=pro'
  },
  {
    name: 'Premium',
    price: '$29/mo',
    features: ['Joint filing', 'Deadline reminders', 'Dedicated tax concierge'],
    href: '/subscription?plan=premium'
  }
];

function Hero() {
  const { t } = useTranslation();
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 text-center">
        <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">{t('welcome')}</h1>
        <p className="max-w-2xl text-lg text-slate-600">
          File your U.S. taxes with an AI co-pilot, multilingual chat support, automated OCR imports,
          and instant refund estimates.
        </p>
        <Link
          href="/login"
          className="rounded-lg bg-primary px-6 py-3 text-white shadow-lg transition hover:bg-secondary"
        >
          {t('getStarted')}
        </Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="p-8">Loading…</div>}>
          <Hero />
        </Suspense>
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-semibold text-slate-900">Plans for every filer</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Upgrade to unlock OCR document automation, PDF exports, and proactive reminders.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.name}
                  name={plan.name}
                  price={plan.price}
                  features={plan.features}
                  onSelect={() => {
                    window.location.href = plan.href;
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
