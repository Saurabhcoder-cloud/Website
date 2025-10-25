import { pool } from '../config/db.js';

export async function createPaymentRecord({ userId, plan, amount, stripeId, status = 'pending' }) {
  const text = `
    INSERT INTO payments (user_id, plan, amount, stripe_id, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, user_id, plan, amount, stripe_id, status, created_at
  `;
  const values = [userId, plan, amount, stripeId, status];
  const { rows } = await pool.query(text, values);
  return rows[0];
}

export async function findPaymentByStripeId(stripeId) {
  const text = `
    SELECT id, user_id, plan, amount, stripe_id, status, created_at
    FROM payments
    WHERE stripe_id = $1
    LIMIT 1
  `;
  const { rows } = await pool.query(text, [stripeId]);
  return rows[0] ?? null;
}

export async function updatePaymentStatus(stripeId, status) {
  const text = `
    UPDATE payments
    SET status = $2
    WHERE stripe_id = $1
    RETURNING id, user_id, plan, amount, stripe_id, status, created_at
  `;
  const values = [stripeId, status];
  const { rows } = await pool.query(text, values);
  return rows[0] ?? null;
}
