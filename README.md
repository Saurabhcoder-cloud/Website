# TaxHelp AI Monorepo

This repository hosts the **TaxHelp AI** project, an AI-assisted U.S. tax preparation platform with a Next.js 14 frontend, TypeScript Express backend, PostgreSQL database, and integrations for Stripe, OpenAI, Google Vision, i18next, and pdf-lib.

> **Heads up:** The actively maintained codebase lives in [`TaxHelpAI/`](TaxHelpAI/). The legacy JavaScript prototype under `taxhelp-ai/` remains for reference only.

## Project layout

```
TaxHelpAI/
 ├── frontend/   # Next.js + TailwindCSS client
 ├── backend/    # Express + TypeScript API
 ├── database/   # SQL schema and seed data
 └── README.md   # Detailed project documentation
```

## How to preview the site locally

1. **Install dependencies**
   ```bash
   cd TaxHelpAI/frontend && npm install
   cd ../backend && npm install
   ```
2. **Configure environment variables**
   - Copy `TaxHelpAI/.env.example` to `TaxHelpAI/.env` and provide required values (`DATABASE_URL`, `JWT_SECRET`, `LOCAL_UPLOAD_DIR`).
   - Optionally set API keys for Stripe, OpenAI, Google Vision/Translate, and SendGrid. The app falls back to safe mocks when keys are missing.
3. **Prepare the database**
   ```bash
   cd ../database
   psql "$DATABASE_URL" -f schema.sql
   psql "$DATABASE_URL" -f seed.sql   # optional sample data
   ```
4. **Start the backend API**
   ```bash
   cd ../backend
   npm run dev
   ```
   The server listens on `http://localhost:4000` and exposes REST endpoints for auth, chat, tax filing, Stripe payments, and reminders.
5. **Start the frontend app** (new terminal)
   ```bash
   cd TaxHelpAI/frontend
   npm run dev
   ```
   Next.js serves the UI at `http://localhost:3000`. Sign up or log in to reach the dashboard, then explore the Chat Assistant, Refund Calculator, File Taxes, Documents, and Subscription tabs.

For more feature details, API documentation, and deployment guidance, see [`TaxHelpAI/README.md`](TaxHelpAI/README.md).
