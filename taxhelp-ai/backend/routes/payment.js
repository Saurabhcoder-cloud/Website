import { Router } from 'express';

import { createCheckoutSession, handleStripeWebhook } from '../controllers/paymentController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/create-checkout', authenticateToken, createCheckoutSession);
router.post('/webhook', handleStripeWebhook);

export default router;
