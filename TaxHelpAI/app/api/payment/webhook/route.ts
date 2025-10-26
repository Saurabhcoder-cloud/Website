export const runtime = 'nodejs';

import { Buffer } from 'buffer';
import { NextResponse } from 'next/server';

import prisma from '../../../../../lib/db';
import { getPlan, stripe } from '../../../../../lib/stripe';

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event: any;

  if (stripe && process.env.STRIPE_WEBHOOK_SECRET && signature) {
    try {
      event = stripe.webhooks.constructEvent(Buffer.from(rawBody), signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook verification failed', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
  } else {
    event = rawBody ? JSON.parse(rawBody) : {};
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data?.object;
    const planId = session?.metadata?.plan as string;
    const plan = getPlan(planId);
    const userId = Number(session?.client_reference_id ?? session?.metadata?.userId);

    if (plan && userId) {
      const planExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

      await prisma.$transaction(async (tx) => {
        await tx.user.update({
          where: { id: userId },
          data: { plan: plan.id, planExpiry }
        });

        await tx.payment.create({
          data: {
            userId,
            plan: plan.id,
            amountCents: plan.priceCents,
            status: 'paid',
            providerRef: session.id ?? 'mock-session'
          }
        });

        await tx.reminder.upsert({
          where: {
            userId_kind: {
              userId,
              kind: 'plan-expiry'
            }
          },
          update: { dueDate: planExpiry, sentAt: null },
          create: {
            userId,
            kind: 'plan-expiry',
            dueDate: planExpiry
          }
        });
      });
    }
  }

  return NextResponse.json({ received: true });
}

export async function GET() {
  return NextResponse.json({ status: 'ok' });
}
