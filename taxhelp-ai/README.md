# TaxHelp AI

TaxHelp AI is an AI-assisted tax preparation platform for U.S. filers. It combines a Next.js frontend, Express backend, PostgreSQL database, and integrations for Stripe, OpenAI, Google Vision, i18next, and pdf-lib to streamline the filing experience.

## Project structure

```
taxhelp-ai/
 ├── frontend/              # Next.js + TailwindCSS app
 │   ├── pages/             # Route-based pages for core workflows
 │   └── components/        # Shared UI components
 ├── backend/               # Express REST API
 │   ├── config/            # Database client
 │   ├── controllers/       # Route handlers
 │   ├── models/            # Data access helpers
 │   ├── routes/            # Express routers
 │   ├── utils/             # Shared backend utilities (future)
 │   └── server.js          # API entry point
 └── database/              # SQL schema and seed data
```

## Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL database instance

## Environment variables

Copy `.env.example` to `.env` and populate the values before starting either service.

```bash
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Connection string for PostgreSQL |
| `STRIPE_SECRET_KEY` | Stripe secret API key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `OPENAI_API_KEY` | OpenAI API key |
| `GOOGLE_VISION_KEY` | Google Vision API credentials (JSON or base64-encoded service account) |
| `GOOGLE_TRANSLATE_PROJECT_ID` | Google Cloud project ID enabled for the Translation API |
| `GOOGLE_TRANSLATE_LOCATION` | Translation API location (defaults to `global`) |
| `GOOGLE_APPLICATION_CREDENTIALS` | Filesystem path to the Google Cloud service account JSON key |
| `JWT_SECRET` | Secret used to sign JWT tokens |
| `FRONTEND_URL` | (Optional) Base URL used for Stripe success and cancel redirects |

## Installation

Install dependencies for both frontend and backend:

```bash
# Frontend dependencies
cd taxhelp-ai/frontend
npm install

# Backend dependencies
cd ../backend
npm install
```

## Development scripts

In two separate terminals:

```bash
# Terminal 1 - frontend
cd taxhelp-ai/frontend
npm run dev

# Terminal 2 - backend
cd taxhelp-ai/backend
npm run dev
```

The frontend runs on http://localhost:3000 and proxies requests to the backend at http://localhost:4000.

## Key API routes

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create a new user account and return a JWT |
| `POST` | `/api/auth/login` | Exchange credentials for a JWT |
| `GET` | `/api/auth/me` | Retrieve the authenticated user's profile |
| `POST` | `/api/payment/create-checkout` | Create a Stripe Checkout session for Standard, Pro, or Premium plans |
| `POST` | `/api/payment/webhook` | Stripe webhook that activates the plan once the payment succeeds |
| `POST` | `/api/tax/calculate` | Estimate taxable income, liability, and refund using 2024 IRS brackets |
| `POST` | `/api/ocr/upload` | Accept a W-2/1099 upload, extract key values with Google Vision, and return a filled Form 1040 preview |
| `POST` | `/api/ai/chat` | Generate an AI-grounded tax answer with IRS citations, OpenAI reasoning, and Google Translate localization |

### Subscription lifecycle

1. The frontend calls `POST /api/payment/create-checkout` with the desired plan (`standard`, `pro`, or `premium`).
2. Stripe redirects the user to its hosted checkout experience.
3. After a successful payment, Stripe sends a `checkout.session.completed` event to `/api/payment/webhook`.
4. The webhook marks the payment record as `succeeded`, updates `users.plan` and `users.plan_expiry`, and responds with a success message such as `✅ Your Pro plan is now active.`

## Database

Apply the schema and seed data from the `database/` directory:

```bash
psql "$DATABASE_URL" -f database/schema.sql
psql "$DATABASE_URL" -f database/seed.sql
```

## Next steps

- Connect the frontend forms to backend endpoints, including the OCR upload workflow.
- Wire the AI chat assistant and multilingual tooling to the backend.
- Add automated tests for the authentication, payment, OCR, and tax calculation flows.
