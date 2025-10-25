import { pool } from '../config/db.js';

export async function createUser({ name, email, passwordHash }) {
  const text = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, plan, plan_expiry, created_at
  `;
  const values = [name, email, passwordHash];
  const { rows } = await pool.query(text, values);
  return rows[0];
}

export async function findUserByEmail(email) {
  const text = 'SELECT * FROM users WHERE email = $1 LIMIT 1';
  const { rows } = await pool.query(text, [email]);
  return rows[0] ?? null;
}

export async function findUserById(id) {
  const text = `
    SELECT id, name, email, plan, plan_expiry, created_at
    FROM users
    WHERE id = $1
  `;
  const { rows } = await pool.query(text, [id]);
  return rows[0] ?? null;
}

export async function updateUserPlan(userId, { plan, planExpiry }) {
  const text = `
    UPDATE users
    SET plan = $2, plan_expiry = $3
    WHERE id = $1
    RETURNING id, name, email, plan, plan_expiry, created_at
  `;
  const values = [userId, plan, planExpiry];
  const { rows } = await pool.query(text, values);
  return rows[0] ?? null;
}
