import { Request, Response } from 'express';
import Stripe from 'stripe';
import env from '../config/env';
import { AuthenticatedRequest } from '../types';
import { createCheckoutSession, handleStripeWebhook } from '../modules/payments/paymentService';

export async function createCheckout(req: AuthenticatedRequest, res: Response) {
  const { plan } = req.body;
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  if (!plan) {
    return res.status(400).json({ message: 'Plan is required' });
  }
  const result = await createCheckoutSession(req.user.id, plan);
  return res.json(result);
}

export async function webhook(req: Request, res: Response) {
  const signature = req.headers['stripe-signature'];
  if (!signature) {
    return res.status(400).send('Missing stripe signature');
  }
  try {
    let event: Stripe.Event;
    if (!env.STRIPE_WEBHOOK_SECRET) {
      event = req.body as Stripe.Event;
    } else {
      const stripe = new Stripe(env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });
      event = stripe.webhooks.constructEvent(req.body, signature, env.STRIPE_WEBHOOK_SECRET);
    }
    await handleStripeWebhook(event);
    return res.status(200).json({ received: true });
  } catch (error: any) {
    return res.status(400).send(`Webhook error: ${error.message}`);
  }
}
