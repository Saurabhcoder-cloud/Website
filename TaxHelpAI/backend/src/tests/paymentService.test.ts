import { handleStripeWebhook } from '../modules/payments/paymentService';
import pool from '../config/db';

describe('handleStripeWebhook', () => {
  it('updates user plan on checkout.session.completed', async () => {
    const queryMock = jest.fn().mockResolvedValue(undefined);
    const client = {
      query: queryMock,
      release: jest.fn()
    };
    jest.spyOn(pool, 'connect').mockResolvedValue(client as any);

    const event: any = {
      type: 'checkout.session.completed',
      data: {
        object: {
          metadata: { userId: '1', plan: 'pro' },
          payment_status: 'paid',
          id: 'sess_123'
        }
      }
    };

    await handleStripeWebhook(event);
    expect(queryMock).toHaveBeenCalled();
  });
});
