# TaxHelp AI Codebase Analysis

## Repository layout
- The repo contains two parallel implementations: a TypeScript monorepo under `TaxHelpAI/` and an older JavaScript workspace inside `taxhelp-ai/`. The root README still directs developers to the legacy tree, which can lead to onboarding confusion.【F:README.md†L1-L28】【F:taxhelp-ai/README.md†L1-L87】
- The TypeScript stack documents the active architecture, covering backend, frontend, and database folders in a single workspace.【F:TaxHelpAI/README.md†L1-L76】

## Backend (TaxHelpAI/backend)
- Express app wiring lives in `src/app.ts`, enabling Helmet, CORS, raw-body parsing for Stripe webhooks, JSON/body parsing, a rate limiter, and feature routers for auth, chat, tax, payments, reminders, and document APIs before registering error handling and the daily reminder scheduler.【F:TaxHelpAI/backend/src/app.ts†L1-L38】
- Environment management loads variables from the monorepo root, requires database, JWT, and upload configuration, and exposes optional keys for Stripe, OpenAI, Google Vision/Translate, SendGrid, and cross-origin URLs.【F:TaxHelpAI/backend/src/config/env.ts†L1-L28】【F:TaxHelpAI/.env.example†L1-L13】
- PostgreSQL access is handled via `authService`, which hashes incoming passwords, enforces unique emails, and returns signed JWTs. Authenticated requests use middleware to attach decoded token data.【F:TaxHelpAI/backend/src/modules/auth/authService.ts†L1-L49】【F:TaxHelpAI/backend/src/middleware/auth.ts†L1-L22】
- The AI chat module performs a lightweight RAG lookup, optionally calls OpenAI GPT‑4o-mini, falls back to mock output without API keys, and supports language-specific responses through Google Translate, all surfaced via the `/chat/ask` endpoint.【F:TaxHelpAI/backend/src/modules/chat/chatService.ts†L1-L15】【F:TaxHelpAI/backend/src/utils/aiClient.ts†L1-L53】【F:TaxHelpAI/backend/src/utils/translate.ts†L1-L16】
- Tax calculations reuse 2024 IRS brackets, standard deductions, and child tax credits to produce taxable income, liabilities, refunds, and status messaging for downstream workflows.【F:TaxHelpAI/backend/src/utils/taxCalculator.ts†L1-L66】
- OCR uploads accept W‑2/1099 files, use Vision or mock data to extract key values, reuse the tax calculator, and persist a pdf-lib Form 1040 summary to the configured upload directory.【F:TaxHelpAI/backend/src/utils/ocr.ts†L1-L36】【F:TaxHelpAI/backend/src/utils/pdfGenerator.ts†L1-L37】
- Stripe billing either creates live checkout sessions or returns mock URLs, then upgrades users and records payments when webhooks arrive, keeping plan pricing in one place.【F:TaxHelpAI/backend/src/modules/payments/paymentService.ts†L1-L61】
- Reminder tooling schedules a daily SendGrid-backed notification batch (or logs in mock mode) and can be triggered manually.【F:TaxHelpAI/backend/src/modules/reminders/reminderService.ts†L1-L28】
- Jest suites cover critical flows including authentication, Stripe webhook handling, and tax calculations.【F:TaxHelpAI/backend/src/tests/authService.test.ts†L1-L21】【F:TaxHelpAI/backend/src/tests/paymentService.test.ts†L1-L24】【F:TaxHelpAI/backend/src/tests/taxCalculator.test.ts†L1-L16】

## Frontend (TaxHelpAI/frontend)
- The Next.js 14 app uses Tailwind, React Query providers, and i18next translations for eight locales documented in shared language utilities.【F:TaxHelpAI/frontend/app/layout.tsx†L1-L28】【F:TaxHelpAI/frontend/lib/languages.ts†L1-L9】
- Landing and subscription experiences advertise tiered plans with reusable components and localized hero messaging.【F:TaxHelpAI/frontend/app/page.tsx†L1-L79】【F:TaxHelpAI/frontend/components/PlanCard.tsx†L1-L31】
- Authentication persists the user profile and JWT in a Zustand store, while an Axios client injects tokens into every backend call.【F:TaxHelpAI/frontend/hooks/useAuth.ts†L1-L27】【F:TaxHelpAI/frontend/lib/api.ts†L1-L16】
- The dashboard and tool pages cover chat, refund calculator, OCR filing, documents, and subscription flows, each issuing API requests with loading/error handling.【F:TaxHelpAI/frontend/app/dashboard/page.tsx†L1-L64】【F:TaxHelpAI/frontend/components/ChatWindow.tsx†L1-L95】【F:TaxHelpAI/frontend/components/RefundCalculatorForm.tsx†L1-L67】【F:TaxHelpAI/frontend/components/OCRUploader.tsx†L1-L52】【F:TaxHelpAI/frontend/app/documents/page.tsx†L1-L77】【F:TaxHelpAI/frontend/app/subscription/page.tsx†L1-L83】

## Database & configuration
- PostgreSQL schema provisions `users`, `payments`, and `documents` tables with foreign keys and timestamps; seed data bootstraps demo users and payment history.【F:TaxHelpAI/database/schema.sql†L1-L24】【F:TaxHelpAI/database/seed.sql†L1-L11】
- Environment template covers all integrations plus front/back-end URLs and local upload storage, ensuring predictable setup across services.【F:TaxHelpAI/.env.example†L1-L13】

## Legacy JavaScript workspace (`taxhelp-ai/`)
- The legacy project mirrors the same feature set with JavaScript-based controllers, routes, and utilities. It retains its own README and environment template, indicating the code is still present but likely superseded by the TypeScript monorepo.【F:taxhelp-ai/README.md†L1-L87】【F:taxhelp-ai/backend/controllers/authController.js†L1-L80】

## Observations & potential follow-ups
1. **Dual codebases:** Maintaining both the TypeScript and JavaScript implementations increases maintenance overhead and risks diverging behavior; consolidating on one stack would simplify contributions.【F:README.md†L1-L28】【F:TaxHelpAI/README.md†L1-L76】
2. **Documentation alignment:** Updating the root README to reference `TaxHelpAI/` (or removing the legacy tree) would prevent newcomers from following outdated setup steps.【F:README.md†L1-L28】
3. **Mock integrations:** The backend gracefully degrades when third-party keys are absent, but documenting how mocks behave for each module (AI, OCR, Stripe, email) can help testers understand expected responses.【F:TaxHelpAI/backend/src/utils/aiClient.ts†L24-L53】【F:TaxHelpAI/backend/src/utils/ocr.ts†L1-L24】【F:TaxHelpAI/backend/src/modules/payments/paymentService.ts†L13-L31】【F:TaxHelpAI/backend/src/modules/reminders/reminderService.ts†L1-L28】
