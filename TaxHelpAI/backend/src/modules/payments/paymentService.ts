import Stripe from 'stripe';
import pool from '../../config/db';
import env from '../../config/env';

const stripe = env.STRIPE_SECRET_KEY ? new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' }) : null;

type Plan = 'standard' | 'pro' | 'premium';

const PLAN_PRICE: Record<Plan, { amount: number; priceId?: string }> = {
  standard: { amount: 9.99 },
  pro: { amount: 19.99 },
  premium: { amount: 29.99 }
};

export async function createCheckoutSession(userId: number, plan: Plan) {
  if (!stripe) {
    return {
      url: `${env.FRONTEND_URL}/subscription?status=mock&plan=${plan}`,
      plan,
      mode: 'mock'
    };
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    metadata: { userId: String(userId), plan },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(PLAN_PRICE[plan].amount * 100),
          product_data: { name: `${plan.charAt(0).toUpperCase()}${plan.slice(1)} Plan` },
          recurring: { interval: 'month' }
        }
      }
    ],
    success_url: `${env.FRONTEND_URL}/subscription?status=success&plan=${plan}`,
    cancel_url: `${env.FRONTEND_URL}/subscription?status=cancel`
  });

  return { url: session.url };
}

export async function handleStripeWebhook(event: Stripe.Event) {
  if (event.type !== 'checkout.session.completed') {
    return;
  }
  const session = event.data.object as Stripe.Checkout.Session;
  const userId = Number(session.metadata?.userId);
  const plan = session.metadata?.plan as Plan;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(
      'UPDATE users SET plan=$1, plan_expiry = NOW() + INTERVAL \'30 days\' WHERE id=$2',
      [plan, userId]
    );
    await client.query(
      'INSERT INTO payments (user_id, plan, amount, status, stripe_id) VALUES ($1, $2, $3, $4, $5)',
      [userId, plan, PLAN_PRICE[plan].amount, session.payment_status ?? 'paid', session.id]
    );
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
