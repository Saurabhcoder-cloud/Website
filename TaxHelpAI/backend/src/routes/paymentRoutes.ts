import { Router } from 'express';
import bodyParser from 'body-parser';
import { createCheckout } from '../controllers/paymentController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/create-checkout-session', authenticate, createCheckout);

export default router;
