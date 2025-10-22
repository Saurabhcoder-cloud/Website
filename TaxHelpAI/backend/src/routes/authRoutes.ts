import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { registerValidator, loginValidator } from '../validators/authValidators';
import { validateRequest } from '../middleware/validateRequest';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/register', registerValidator, validateRequest, register);
router.post('/login', loginValidator, validateRequest, login);
router.get('/user/:id', authenticate, getProfile);

export default router;
