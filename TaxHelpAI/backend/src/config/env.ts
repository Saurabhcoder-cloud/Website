import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

type RequiredEnv = {
  DATABASE_URL: string;
  JWT_SECRET: string;
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  OPENAI_API_KEY?: string;
  GOOGLE_TRANSLATE_API_KEY?: string;
  GOOGLE_VISION_API_KEY?: string;
  SENDGRID_API_KEY?: string;
  LOCAL_UPLOAD_DIR: string;
  FRONTEND_URL?: string;
  BACKEND_URL?: string;
};

const required: Array<keyof RequiredEnv> = ['DATABASE_URL', 'JWT_SECRET', 'LOCAL_UPLOAD_DIR'];

const env = process.env as NodeJS.ProcessEnv & RequiredEnv;

required.forEach((key) => {
  if (!env[key]) {
    throw new Error(`Missing required environment variable ${key}`);
  }
});

export default env;
