import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { listDocuments } from '../controllers/documentController';

const router = Router();

router.get('/', authenticate, listDocuments);

export default router;
