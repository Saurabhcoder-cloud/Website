import { Router } from 'express';

import { calculateTax } from '../controllers/taxController.js';

const router = Router();

router.post('/calculate', calculateTax);

export default router;
