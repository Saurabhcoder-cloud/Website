import * as authService from '../modules/auth/authService';
import pool from '../config/db';
import * as hash from '../utils/hash';

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a user and returns token', async () => {
    const client = {
      query: jest.fn().mockResolvedValue({
        rows: [{ id: 1, name: 'Test', email: 'test@example.com', plan: 'free', plan_expiry: null }]
      }),
      release: jest.fn()
    };
    jest.spyOn(pool, 'connect').mockResolvedValue(client as any);
    jest.spyOn(hash, 'hashPassword').mockResolvedValue('hashed');

    const result = await authService.createUser({ name: 'Test', email: 'test@example.com', password: 'secret' });
    expect(result.user.email).toBe('test@example.com');
    expect(result.token).toBeDefined();
    expect(client.query).toHaveBeenCalled();
  });
});
