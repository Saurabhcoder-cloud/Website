import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { initDb } from './config/db.js';
import authRoutes from './routes/auth.js';
import paymentRoutes from './routes/payment.js';
import taxRoutes from './routes/tax.js';
import ocrRoutes from './routes/ocr.js';
import aiRoutes from './routes/ai.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(
  express.json({
    verify: (req, _res, buf) => {
      if (req.originalUrl === '/api/payment/webhook') {
        req.rawBody = buf;
      }
    }
  })
);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/tax', taxRoutes);
app.use('/api/ocr', ocrRoutes);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 4000;

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 TaxHelp AI backend running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Server failed to start due to database error:', error.message);
    process.exit(1);
  });
