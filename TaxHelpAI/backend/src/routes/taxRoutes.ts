import { Router } from 'express';
import multer from 'multer';
import env from '../config/env';
import { authenticate } from '../middleware/auth';
import { calculate, fileTaxes } from '../controllers/taxController';

const router = Router();
const upload = multer({ dest: env.LOCAL_UPLOAD_DIR });

router.post('/calculate', authenticate, calculate);
router.post('/file', authenticate, upload.single('document'), fileTaxes);

export default router;
