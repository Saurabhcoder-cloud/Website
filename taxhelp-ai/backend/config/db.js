import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function initDb() {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Connected to PostgreSQL');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    throw error;
  }
}
