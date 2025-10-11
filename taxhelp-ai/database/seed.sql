INSERT INTO users (name, email, password, plan, plan_expiry)
VALUES
  ('Demo User', 'demo@taxhelp.ai', '$2b$10$examplehashvalueexamplehashvalueex', 'standard', CURRENT_DATE + INTERVAL '1 year')
ON CONFLICT (email) DO NOTHING;

INSERT INTO payments (user_id, plan, amount, stripe_id, status)
VALUES
  ((SELECT id FROM users WHERE email = 'demo@taxhelp.ai'), 'standard', 9.99, 'cs_test_demo_123', 'succeeded')
ON CONFLICT (stripe_id) DO NOTHING;
