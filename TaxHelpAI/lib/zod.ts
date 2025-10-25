import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(128)
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128)
});

export const chatSchema = z.object({
  user_id: z.string().optional(),
  question: z.string().min(3),
  language: z.enum(['en', 'es', 'fr', 'hi', 'ar', 'zh-CN', 'de', 'ru']).default('en')
});

export const taxCalculateSchema = z.object({
  filing_status: z.enum(['single', 'married', 'head']),
  dependents: z.number().int().min(0).default(0),
  annual_income: z.number().nonnegative(),
  federal_withheld: z.number().nonnegative(),
  deductions: z.number().nonnegative().optional()
});

export const fileTaxSchema = z.object({
  blobUrl: z.string().url(),
  language: z.enum(['en', 'es', 'fr', 'hi', 'ar', 'zh-CN', 'de', 'ru']).default('en')
});
