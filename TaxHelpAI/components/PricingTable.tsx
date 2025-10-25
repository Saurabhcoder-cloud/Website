import Link from 'next/link';

import { plans } from '../lib/stripe';

type Props = {
  ctaHref?: string;
};

export default function PricingTable({ ctaHref = '/dashboard' }: Props) {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {Object.values(plans).map((plan) => (
        <div key={plan.id} className="card p-6 shadow-lg shadow-primary-500/20">
          <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
          <p className="mt-2 text-sm text-slate-300">{plan.description}</p>
          <p className="mt-4 text-3xl font-bold text-primary-300">
            ${(plan.priceCents / 100).toFixed(2)}
            <span className="ml-1 text-base font-medium text-slate-400">/mo</span>
          </p>
          <Link
            href={`${ctaHref}?plan=${plan.id}`}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-500"
          >
            Choose {plan.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
