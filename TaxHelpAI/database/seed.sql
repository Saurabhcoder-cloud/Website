INSERT INTO users (name, email, password, plan, plan_expiry)
VALUES
  ('Alice Taxpayer', 'alice@example.com', '$2a$10$abcdefghijklmnopqrstuv', 'standard', NOW() + INTERVAL '20 days'),
  ('Bob Consultant', 'bob@example.com', '$2a$10$abcdefghijklmnopqrstuv', 'pro', NOW() + INTERVAL '10 days')
ON CONFLICT (email) DO NOTHING;

INSERT INTO payments (user_id, plan, amount, status)
VALUES
  (1, 'standard', 9.99, 'paid'),
  (2, 'pro', 19.99, 'paid')
ON CONFLICT DO NOTHING;
