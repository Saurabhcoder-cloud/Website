import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { triggerReminders } from '../controllers/reminderController';

const router = Router();

router.post('/send', authenticate, triggerReminders);

export default router;
