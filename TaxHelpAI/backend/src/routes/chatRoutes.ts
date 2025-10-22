import { Router } from 'express';
import { askAi } from '../controllers/chatController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.post('/ask', authenticate, askAi);
export default router;
