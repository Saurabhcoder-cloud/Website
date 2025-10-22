import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import env from './config/env';
import { apiLimiter } from './middleware/rateLimiter';
import authRoutes from './routes/authRoutes';
import chatRoutes from './routes/chatRoutes';
import taxRoutes from './routes/taxRoutes';
import paymentRoutes from './routes/paymentRoutes';
import reminderRoutes from './routes/reminderRoutes';
import documentRoutes from './routes/documentRoutes';
import { errorHandler } from './middleware/errorHandler';
import { scheduleDailyReminders } from './modules/reminders/reminderService';
import { webhook } from './controllers/paymentController';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.FRONTEND_URL ?? 'http://localhost:3000', credentials: true }));
app.post('/api/payment/webhook', bodyParser.raw({ type: 'application/json' }), webhook);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', apiLimiter);

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/api/tax', taxRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/reminder', reminderRoutes);
app.use('/api/documents', documentRoutes);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);

scheduleDailyReminders();

export default app;
