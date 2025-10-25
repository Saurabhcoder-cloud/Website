import pool from '../../config/db';
import { hashPassword, comparePassword } from '../../utils/hash';
import { generateToken } from '../../utils/jwt';

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export async function createUser({ name, email, password }: RegisterInput) {
  const hashed = await hashPassword(password);
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO users (name, email, password, plan) VALUES ($1, $2, $3, $4) RETURNING id, name, email, plan, plan_expiry',
      [name, email, hashed, 'free']
    );
    const user = result.rows[0];
    const token = generateToken({ id: user.id, email: user.email, plan: user.plan });
    return { user, token };
  } catch (error: any) {
    if (error.code === '23505') {
      throw Object.assign(new Error('Email already registered'), { status: 400 });
    }
    throw error;
  } finally {
    client.release();
  }
}

export async function authenticateUser(email: string, password: string) {
  const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
  const user = result.rows[0];
  if (!user) {
    throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  }
  const match = await comparePassword(password, user.password);
  if (!match) {
    throw Object.assign(new Error('Invalid credentials'), { status: 401 });
  }
  const token = generateToken({ id: user.id, email: user.email, plan: user.plan });
  delete user.password;
  return { user, token };
}

export async function getUserById(id: number) {
  const result = await pool.query('SELECT id, name, email, plan, plan_expiry, created_at FROM users WHERE id=$1', [id]);
  if (!result.rows.length) {
    throw Object.assign(new Error('User not found'), { status: 404 });
  }
  return result.rows[0];
}
