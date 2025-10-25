import Stripe from 'stripe';

type PlanId = 'standard' | 'pro' | 'premium';

type PlanConfig = {
  id: PlanId;
  name: string;
  priceCents: number;
  description: string;
};

export const plans: Record<PlanId, PlanConfig> = {
  standard: { id: 'standard', name: 'Standard', priceCents: 900, description: 'Single W-2 filing with chat support.' },
  pro: { id: 'pro', name: 'Pro', priceCents: 1900, description: 'Add 1099 + Schedule C guidance.' },
  premium: { id: 'premium', name: 'Premium', priceCents: 2900, description: 'Joint filing, reminders, PDF exports.' }
};

export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
      appInfo: {
        name: 'TaxHelp AI',
        url: 'https://taxhelp.ai'
      }
    })
  : null;

export const getPlan = (plan: string): PlanConfig | null => {
  if (plan === 'standard' || plan === 'pro' || plan === 'premium') {
    return plans[plan];
  }
  return null;
};
