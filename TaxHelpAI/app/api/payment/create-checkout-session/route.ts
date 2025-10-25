import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '../../../../../lib/auth';
import { getPlan, stripe } from '../../../../../lib/stripe';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const planId = body.plan as string;
  const plan = getPlan(planId);

  if (!plan) {
    return NextResponse.json({ error: 'Plan not found' }, { status: 400 });
  }

  if (!stripe) {
    return NextResponse.json({
      url: `/dashboard?status=success&plan=${plan.id}`,
      message: 'Stripe not configured, returning mock confirmation.'
    });
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          unit_amount: plan.priceCents,
          product_data: {
            name: `TaxHelp AI ${plan.name}`
          }
        },
        quantity: 1
      }
    ],
    success_url: `${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/dashboard?status=success`,
    cancel_url: `${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/dashboard?status=cancelled`,
    client_reference_id: session.user.id.toString(),
    metadata: {
      plan: plan.id
    }
  });

  return NextResponse.json({ url: checkout.url });
}
