# TaxHelp AI Codebase Analysis

## Repository layout
- The repo contains two parallel implementations: a TypeScript monorepo under `TaxHelpAI/` and an older JavaScript workspace inside `taxhelp-ai/`. The root README still directs developers to the legacy tree, which can lead to onboarding confusion.【F:README.md†L1-L28】【F:taxhelp-ai/README.md†L1-L87】
- The TypeScript stack documents the active architecture, covering backend, frontend, and database folders in a single workspace with detailed setup steps.【F:TaxHelpAI/README.md†L1-L76】

## Backend (TaxHelpAI/backend)
- Express wiring in `src/app.ts` layers Helmet, CORS, Stripe webhook parsing, JSON handling, rate limiting, feature routers, centralized error handling, and the daily reminder scheduler so every module shares consistent middleware.【F:TaxHelpAI/backend/src/app.ts†L1-L38】
- Environment loading enforces database, JWT, and upload configuration while leaving Stripe, OpenAI, Google, and SendGrid keys optional for mock-friendly development; the template documents every variable consumers need.【F:TaxHelpAI/backend/src/config/env.ts†L1-L28】【F:TaxHelpAI/.env.example†L1-L13】
- Auth services hash passwords, guard duplicate emails, and sign JWTs; middleware reads bearer tokens and exposes the decoded payload to controllers for authorization checks.【F:TaxHelpAI/backend/src/modules/auth/authService.ts†L1-L49】【F:TaxHelpAI/backend/src/middleware/auth.ts†L1-L22】
- Chat handling combines a tiny IRS RAG dataset with optional OpenAI calls, emits citations, and translates answers when Google Translate is configured, keeping localization concerns in one service.【F:TaxHelpAI/backend/src/modules/chat/chatService.ts†L1-L15】【F:TaxHelpAI/backend/src/utils/aiClient.ts†L1-L53】【F:TaxHelpAI/backend/src/utils/translate.ts†L1-L16】
- The tax engine encapsulates standard deductions, 2024 brackets, and child credits, returning taxable income, liability, refund, and status values for both calculators and OCR pipelines.【F:TaxHelpAI/backend/src/utils/taxCalculator.ts†L1-L66】
- OCR processing mocks Vision in development, builds a tax summary with the shared calculator, and generates/stores pdf-lib reports in the configured upload directory for later download.【F:TaxHelpAI/backend/src/utils/ocr.ts†L1-L36】【F:TaxHelpAI/backend/src/utils/pdfGenerator.ts†L1-L37】
- Stripe integration either launches real checkout sessions or returns mock URLs, then upgrades the user and records payment metadata when webhook events arrive—all in a single transactional service.【F:TaxHelpAI/backend/src/modules/payments/paymentService.ts†L1-L61】
- Reminder jobs query soon-to-expire subscriptions, dispatch SendGrid emails (or log mock output), and register a 14:00 daily cron task as part of app bootstrapping.【F:TaxHelpAI/backend/src/modules/reminders/reminderService.ts†L1-L25】【F:TaxHelpAI/backend/src/utils/email.ts†L1-L18】

### Request flow & persistence
- Controllers validate payloads, reuse shared utilities, and persist results—e.g., tax filing ties uploads to users, stores metadata/PDF paths, and reuses the tax calculator before responding.【F:TaxHelpAI/backend/src/controllers/taxController.ts†L1-L40】
- Document listings, checkout endpoints, and webhooks are isolated behind routers that enforce authentication where needed to keep cross-cutting concerns centralized.【F:TaxHelpAI/backend/src/controllers/documentController.ts†L1-L10】【F:TaxHelpAI/backend/src/controllers/paymentController.ts†L1-L33】【F:TaxHelpAI/backend/src/routes/documentRoutes.ts†L1-L9】
- PostgreSQL schema and seeds cover users, payments, and documents so feature modules have the tables they expect during local development.【F:TaxHelpAI/database/schema.sql†L1-L24】【F:TaxHelpAI/database/seed.sql†L1-L11】

### Tooling & quality gates
- Jest suites exercise auth creation, Stripe webhook handling, and tax math to guard the most business-critical workflows.【F:TaxHelpAI/backend/src/tests/authService.test.ts†L1-L23】【F:TaxHelpAI/backend/src/tests/paymentService.test.ts†L1-L24】【F:TaxHelpAI/backend/src/tests/taxCalculator.test.ts†L1-L13】
- The server entrypoint respects the configured backend URL/port, making deployment overrides straightforward.【F:TaxHelpAI/backend/src/server.ts†L1-L11】

## Frontend (TaxHelpAI/frontend)
- Global providers combine Tailwind styling, React Query caching, and i18next localization across eight supported languages documented in shared utilities.【F:TaxHelpAI/frontend/app/layout.tsx†L1-L23】【F:TaxHelpAI/frontend/components/Providers.tsx†L1-L14】【F:TaxHelpAI/frontend/lib/languages.ts†L1-L9】【F:TaxHelpAI/frontend/lib/i18n.ts†L1-L24】
- Authentication state persists via a Zustand store and companion Axios interceptor, so all pages can reliably attach JWTs to API calls without prop drilling.【F:TaxHelpAI/frontend/hooks/useAuth.ts†L1-L27】【F:TaxHelpAI/frontend/lib/api.ts†L1-L16】
- The landing page presents localized hero messaging and pricing, reusing `PlanCard` components; post-login flows gate every dashboard tab and deep link into chat, refund, filing, documents, and subscription tools.【F:TaxHelpAI/frontend/app/page.tsx†L1-L79】【F:TaxHelpAI/frontend/components/PlanCard.tsx†L1-L27】【F:TaxHelpAI/frontend/app/dashboard/page.tsx†L1-L64】
- Feature pages wire directly to backend endpoints: chat renders citations and language toggles, refund calculator posts numeric inputs, OCR uploader handles multipart submissions, documents list stored PDFs, and subscriptions kick off Stripe checkout or mock URLs.【F:TaxHelpAI/frontend/components/ChatWindow.tsx†L1-L95】【F:TaxHelpAI/frontend/components/RefundCalculatorForm.tsx†L1-L67】【F:TaxHelpAI/frontend/components/OCRUploader.tsx†L1-L52】【F:TaxHelpAI/frontend/app/documents/page.tsx†L1-L77】【F:TaxHelpAI/frontend/app/subscription/page.tsx†L1-L83】
- Auth pages manage registration/login toggling, persist JWTs, and redirect to the dashboard once authentication succeeds.【F:TaxHelpAI/frontend/app/login/page.tsx†L1-L84】

## Legacy JavaScript workspace (`taxhelp-ai/`)
- The JavaScript backend mirrors the TypeScript feature set with Express routes for auth, payments, tax, OCR, and AI; it still ships comprehensive controllers such as the Vision-powered document processor and JWT-authenticated auth controller.【F:taxhelp-ai/backend/server.js†L1-L36】【F:taxhelp-ai/backend/controllers/authController.js†L1-L80】【F:taxhelp-ai/backend/utils/ocrHandler.js†L1-L120】
- Documentation, environment templates, and frontend scaffolding remain in place, which can mislead newcomers now that the top-level README still points to this legacy stack.【F:README.md†L1-L28】【F:taxhelp-ai/README.md†L1-L87】

## Observations & potential follow-ups
1. **Dual codebases:** Maintaining both the TypeScript and JavaScript implementations increases maintenance overhead and risks diverging behavior; consolidating on one stack would simplify contributions.【F:README.md†L1-L28】【F:TaxHelpAI/README.md†L1-L76】
2. **Documentation alignment:** Updating the root README to reference `TaxHelpAI/` (or removing the legacy tree) would prevent newcomers from following outdated setup steps.【F:README.md†L1-L28】
3. **Mock integrations clarity:** Because AI, OCR, Stripe, and email gracefully degrade without API keys, adding explicit mock-behavior notes to the README would set expectations for local testing.【F:TaxHelpAI/backend/src/utils/aiClient.ts†L24-L53】【F:TaxHelpAI/backend/src/utils/ocr.ts†L1-L24】【F:TaxHelpAI/backend/src/modules/payments/paymentService.ts†L13-L31】【F:TaxHelpAI/backend/src/utils/email.ts†L1-L18】
4. **Reminder strategy:** The cron job is registered at startup; documenting how to disable or adjust scheduling in serverless deployments would help operators avoid duplicate jobs.【F:TaxHelpAI/backend/src/app.ts†L1-L38】【F:TaxHelpAI/backend/src/modules/reminders/reminderService.ts†L1-L25】
