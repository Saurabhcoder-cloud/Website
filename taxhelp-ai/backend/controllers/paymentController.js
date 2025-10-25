import Stripe from 'stripe';

import { findUserById, updateUserPlan } from '../models/User.js';
import { createPaymentRecord, findPaymentByStripeId, updatePaymentStatus } from '../models/Payment.js';

const STRIPE_API_VERSION = '2023-10-16';

const PLAN_CONFIG = {
  standard: { label: 'Standard', amountCents: 999, amount: 9.99 },
  pro: { label: 'Pro', amountCents: 1999, amount: 19.99 },
  premium: { label: 'Premium', amountCents: 2999, amount: 29.99 }
};

function getStripeClient() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: STRIPE_API_VERSION
  });
}

function getPlanConfig(plan) {
  const normalized = plan?.toLowerCase();
  return normalized && PLAN_CONFIG[normalized] ? { ...PLAN_CONFIG[normalized], value: normalized } : null;
}

function calculatePlanExpiry() {
  const expiry = new Date();
  expiry.setFullYear(expiry.getFullYear() + 1);
  return expiry;
}

export async function createCheckoutSession(req, res) {
  const planInput = req.body?.plan;
  const config = getPlanConfig(planInput);

  if (!config) {
    return res.status(400).json({
      error: 'invalid_plan',
      message: 'Plan must be one of: standard, pro, premium.',
      sample: { request: { plan: 'pro' } }
    });
  }

  if (!req.userId) {
    return res.status(401).json({
      error: 'unauthorized',
      message: 'Authentication token missing or invalid.'
    });
  }

  try {
    const stripe = getStripeClient();
    const user = await findUserById(req.userId);

    if (!user) {
      return res.status(404).json({
        error: 'not_found',
        message: 'User record could not be located.'
      });
    }

    const frontendBase = process.env.FRONTEND_URL ?? 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: config.amountCents,
            product_data: {
              name: `TaxHelp AI ${config.label} Plan`
            }
          },
          quantity: 1
        }
      ],
      success_url: `${frontendBase}/subscription?status=success&plan=${config.value}`,
      cancel_url: `${frontendBase}/subscription?status=cancelled`,
      metadata: {
        userId: String(user.id),
        plan: config.value
      }
    });

    await createPaymentRecord({
      userId: user.id,
      plan: config.value,
      amount: config.amount,
      stripeId: session.id,
      status: 'pending'
    });

    return res.status(201).json({
      message: `Stripe checkout session created for the ${config.label} plan.`,
      checkoutUrl: session.url,
      sample: {
        request: { plan: 'pro' },
        response: { checkoutUrl: 'https://checkout.stripe.com/c/pay_cs_test_123' }
      }
    });
  } catch (error) {
    console.error('Stripe checkout session error:', error);
    return res.status(500).json({
      error: 'stripe_error',
      message: 'Unable to create Stripe checkout session at this time.'
    });
  }
}

export async function handleStripeWebhook(req, res) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(500).json({
      error: 'stripe_config_error',
      message: 'Stripe environment variables are not configured.'
    });
  }

  const stripe = getStripeClient();
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    const payload = req.rawBody ?? JSON.stringify(req.body ?? {});
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error('Stripe webhook signature verification failed:', error);
    return res.status(400).json({ error: 'invalid_signature', message: `Webhook Error: ${error.message}` });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const stripeId = session.id;

    try {
      let payment = await findPaymentByStripeId(stripeId);
      const planKey = session.metadata?.plan ?? payment?.plan;
      const planConfig = getPlanConfig(planKey);
      const userId = payment?.user_id ?? Number(session.metadata?.userId);

      if (!planConfig || !userId) {
        console.warn('Webhook received but plan or user information is missing.', {
          planKey,
          userId,
          stripeId
        });
      } else {
        const planExpiry = calculatePlanExpiry();
        await updateUserPlan(userId, { plan: planConfig.value, planExpiry });

        if (!payment) {
          payment = await createPaymentRecord({
            userId,
            plan: planConfig.value,
            amount: planConfig.amount,
            stripeId,
            status: 'succeeded'
          });
        } else {
          await updatePaymentStatus(stripeId, 'succeeded');
        }

        console.log(`✅ Upgraded user ${userId} to ${planConfig.label} plan.`);

        return res.json({
          message: `✅ Your ${planConfig.label} plan is now active.`,
          receiptUrl: session.latest_charge ? `https://dashboard.stripe.com/payments/${session.latest_charge}` : undefined
        });
      }
    } catch (error) {
      console.error('Failed to process Stripe checkout completion:', error);
      return res.status(500).json({
        error: 'payment_update_failed',
        message: 'Payment succeeded but we could not update the account. Please contact support.'
      });
    }
  }

  return res.json({ received: true });
}
