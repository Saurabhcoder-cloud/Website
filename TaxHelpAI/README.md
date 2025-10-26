# TaxHelp AI

A Vercel-native, production-ready SaaS that helps U.S. taxpayers file accurately with AI chat, OCR-to-PDF automation, multilingual UX, Stripe subscriptions, and automated reminders — all inside a single Next.js 14 (App Router) codebase.

## Features

- **Next.js 14 + Tailwind UI** with marketing page, authenticated dashboard, and responsive tabs for chat, filing, refund calculator, documents, and subscriptions.
- **NextAuth (Credentials + Google)** with JWT sessions stored client-side, server-protected routes, and Prisma user persistence.
- **Stripe Checkout** plans (Standard, Pro, Premium) with webhook-driven plan upgrades, payments ledger, and renewal reminders.
- **AI chat assistant** combining mock IRS RAG snippets, OpenAI GPT-4o-mini, and optional Google Translate localisation.
- **OCR → Form 1040 PDF** pipeline using Google Vision (or mocks), pdf-lib summaries, and Vercel Blob storage with signed URLs.
- **Refund calculator** built on 2024 IRS brackets and child tax credits.
- **SendGrid reminders** triggered manually or via Vercel Cron (daily at 09:00 UTC).
- **Prisma/PostgreSQL schema** covering users, payments, tax data, documents, and reminders with seed data for two demo users.
- **Security middleware** adds Helmet-like headers and rate limiting across API endpoints.
- **Vitest unit coverage** for the tax calculator.

## Project structure

```
/app
  /api
    /auth/[...nextauth]
    /auth/register
    /chat/ask
    /payment/create-checkout-session
    /payment/webhook
    /reminder/send
    /tax/calculate
    /tax/documents
    /tax/file
  /(marketing)/page.tsx
  /dashboard/page.tsx
  /globals.css
  /layout.tsx
  /login/page.tsx
  /refund-calculator/page.tsx
/components
/lib
/prisma
/styles
/tests
```

## Prerequisites

- Node.js 18+
- PostgreSQL database (Neon/Supabase/Local)
- Optional: Stripe test account, OpenAI API key, Google Vision credentials, Google OAuth app, SendGrid key, Vercel Blob token

## Environment variables

Copy `.env.example` to `.env.local` and fill in the following:

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Postgres connection string |
| `NEXTAUTH_SECRET` | Random string for NextAuth JWT encryption |
| `NEXTAUTH_URL` | Base URL (e.g. `http://localhost:3000`) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials |
| `OPENAI_API_KEY` | Optional, enables real GPT-4o-mini calls |
| `GOOGLE_TRANSLATE_API_KEY` | Optional, enables Google translation |
| `GOOGLE_VISION_KEY` or `GOOGLE_APPLICATION_CREDENTIALS` | Optional, enables Vision OCR (`GOOGLE_VISION_KEY` expects base64-encoded service account JSON) |
| `STRIPE_SECRET_KEY` / `STRIPE_PUBLISHABLE_KEY` / `STRIPE_WEBHOOK_SECRET` | Stripe test/live keys |
| `SENDGRID_API_KEY` | Optional, sends renewal reminders |
| `BLOB_READ_WRITE_TOKEN` | Server token for Vercel Blob writes |
| `NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN` | Client token for Vercel Blob uploads |

## Getting started locally

```bash
cd TaxHelpAI
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
npm run dev
```

Visit `http://localhost:3000` to view the marketing page. Use `http://localhost:3000/login` to sign in with the seeded demo users (`demo@taxhelp.ai` / `Password123!`).

## Testing

```bash
npm run test
```

## Stripe webhook (local)

1. Install the Stripe CLI and run `stripe listen --forward-to localhost:3000/api/payment/webhook`.
2. Use the generated signing secret as `STRIPE_WEBHOOK_SECRET` in `.env.local`.
3. Trigger a checkout with `curl` or via the dashboard subscription tab.

## Deployment

- **Frontend/backend**: Deploy this repo directly to Vercel. The App Router handles both UI and APIs.
- **Database**: Use Neon/Supabase and update `DATABASE_URL` in Vercel project settings.
- **Stripe webhook**: Configure the endpoint in Stripe Dashboard to point at `https://<vercel-domain>/api/payment/webhook`.
- **Cron**: Vercel automatically provisions the daily reminder job from `vercel.json`.

## Seeding demo data

Two demo users are seeded via `npm run prisma:seed`:

- `demo@taxhelp.ai` – Standard plan (30-day expiry)
- `premium@taxhelp.ai` – Premium plan (60-day expiry)

Both use password `Password123!`.

## Notes

- Without external API keys, AI, OCR, translation, and Stripe fall back to deterministic mocks so the app remains fully navigable during development.
- Uploads default to in-memory data URLs if a Vercel Blob token is not present.
- Adjust rate limits or reminder windows in `middleware.ts` and `/api/reminder/send` respectively.
