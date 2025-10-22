# TaxHelp AI

TaxHelp AI is an end-to-end web application that helps U.S. taxpayers prepare filings with AI-guided chat, automated OCR intake, multilingual support, and subscription billing.

## Project Structure

```
TaxHelpAI/
├── .env.example
├── README.md
├── backend/        # Express + TypeScript API
├── frontend/       # Next.js 14 + TailwindCSS client
└── database/       # PostgreSQL schema & seed files
```

## Features

- JWT authentication with optional Google OAuth hook
- Multilingual AI chat powered by OpenAI GPT-4o-mini with RAG context and translation
- Refund calculator applying 2024 IRS tax brackets
- OCR ingestion for W-2/1099 with pdf-lib Form 1040 summaries
- Stripe Checkout billing with plan upgrades and webhook handling
- SendGrid-backed reminder engine with node-cron scheduler
- Next.js dashboard with tabs for chat, filing, refund calculator, documents, and subscription management

## How TaxHelp AI Works

1. **Getting Started** – Visitors land on the multilingual marketing page, choose their preferred language, and create an account or sign in. Successful authentication stores a JWT that the frontend reuses for all subsequent API calls, keeping the session active across page refreshes.
2. **Dashboard Experience** – Authenticated users reach the dashboard where the active subscription tier is displayed alongside quick links to each tool. Every tab (Chat Assistant, Refund Calculator, File Taxes, Documents, Subscription Plan) lives on its own route and requests data from the backend with loading and error states.
3. **AI Chat Assistant** – The chat interface sends each question, language choice, and user ID to `/chat/ask`. The backend performs a retrieval-augmented lookup, calls OpenAI when available (or a mock otherwise), optionally translates the answer, and returns IRS citations that are rendered under every response bubble.
4. **Refund Calculator** – Users provide filing status, income, dependents, deductions, and withholding; the frontend posts the payload to `/api/tax/calculate`, then renders the taxable income, tax due, refund amount, and whether a balance is owed or a refund is expected.
5. **OCR Filing Workflow** – The File Taxes tab accepts W‑2/1099 uploads. The backend runs OCR (mocking Vision when no key is present), maps results to Form 1040 fields, reuses the tax calculator, generates a pdf-lib summary, stores metadata, and responds with a download link that surfaces in both the immediate results view and the Documents tab for later retrieval.
6. **Subscription Management** – When a user selects Standard, Pro, or Premium, the frontend requests `/api/payment/create-checkout-session`. In production Stripe redirects to checkout; in development mock URLs are returned. Upon successful payment, the webhook upgrades the user plan, extends the expiry, logs a payment record, and the dashboard reflects the new access level.
7. **Reminders & Notifications** – A scheduled job checks for plans nearing expiry. If SendGrid credentials exist, reminder emails are sent automatically; otherwise the action is logged for local debugging. Admins can also trigger the job manually through `/api/reminder/send`.

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Stripe, OpenAI, Google Vision/Translate, and SendGrid API keys (optional – mocked when absent)

## Environment Setup

1. Duplicate `.env.example` as `.env` in the project root.
2. Fill in the required values (`DATABASE_URL`, `JWT_SECRET`, `LOCAL_UPLOAD_DIR`) and optional API keys.
3. Ensure the `LOCAL_UPLOAD_DIR` directory is writable for PDF exports.

## Database

```bash
psql "$DATABASE_URL" -f database/schema.sql
psql "$DATABASE_URL" -f database/seed.sql
```

## Backend

```bash
cd backend
npm install
npm run dev
```

- Runs on `http://localhost:4000` by default.
- `npm test` executes Jest suites for auth services, tax calculations, and Stripe webhooks.
- `npm run seed` inserts demo users and payments.

### Key Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | `/auth/register` | Create a new user |
| POST | `/auth/login` | Authenticate user and issue JWT |
| GET | `/auth/user/:id` | Retrieve user profile |
| POST | `/chat/ask` | Submit question to AI assistant |
| POST | `/api/tax/calculate` | Calculate refund or balance |
| POST | `/api/tax/file` | OCR upload + PDF generation |
| POST | `/api/payment/create-checkout-session` | Start Stripe checkout |
| POST | `/api/payment/webhook` | Stripe webhook receiver |
| GET | `/api/documents` | List generated PDFs for authenticated user |
| POST | `/api/reminder/send` | Trigger reminder email batch |

## Frontend

```bash
cd frontend
npm install
npm run dev
```

- Runs on `http://localhost:3000`.
- Configure `NEXT_PUBLIC_BACKEND_URL` in `.env.local` if the API uses a non-default URL.
- Supports English, Spanish, French, Hindi, Arabic, Chinese (Simplified), German, and Russian via `i18next`.

## Testing Stripe Webhooks Locally

```bash
stripe listen --forward-to localhost:4000/api/payment/webhook
```

## Deployment

- **Frontend**: Deploy to Vercel with environment variables `NEXT_PUBLIC_BACKEND_URL` and i18n locales.
- **Backend**: Deploy to Render or Railway, setting the same `.env` variables and enabling cron workers.
- **Database**: Host on Neon, Supabase, or any managed Postgres service. Run `database/schema.sql` and `database/seed.sql` once provisioned.

## Development Tips

- All external integrations gracefully degrade to mocks when API keys are absent.
- Helmet, CORS, and rate limiting are enabled by default for security.
- Uploaded files are stored in `LOCAL_UPLOAD_DIR`. Use cloud storage in production.
