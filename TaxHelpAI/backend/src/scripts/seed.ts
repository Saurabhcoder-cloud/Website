import pool from '../config/db';

async function seed() {
  await pool.query(
    `INSERT INTO users (name, email, password, plan) VALUES
      ('Demo User', 'demo@taxhelp.ai', '$2a$10$abcdefghijklmnopqrstuv', 'pro')
    ON CONFLICT (email) DO NOTHING;`
  );
  await pool.query(
    `INSERT INTO payments (user_id, plan, amount, status)
     VALUES (1, 'pro', 19.99, 'paid')
     ON CONFLICT DO NOTHING;`
  );
  // eslint-disable-next-line no-console
  console.log('Seed data inserted');
  await pool.end();
}

seed().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
