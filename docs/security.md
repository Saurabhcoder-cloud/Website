# Security & Privacy Operations

This document summarizes the guardrails implemented in the TaxHelp AI marketing demo to protect customer information and outline how personal data is handled during the trial experience.

## PII handling principles

- **No persistent storage:** The demo wizard keeps parsed document data, questionnaire answers, and computed results exclusively in local browser state. Refreshing or using the **Delete now** option clears all information immediately.
- **Explicit consent:** Users must accept the export consent dialog and choose a retention window (7/30/90 days) before any files are made available for download.
- **Identifier masking:** Social Security Numbers, EINs, and dependent SSNs are masked throughout the UI (`***-**-6789`) and redacted before requests are logged.
- **Mocked infrastructure:** Demo API routes (`/api/demo/ocr`, `/api/demo/compute`) are deterministic mocks without external calls. The AI explanation route proxies requests to OpenRouter only when an API key is provided and strips potential PII tokens.

## Operational safeguards

- **Secure transport:** The site is intended to run behind HTTPS (automatic on Vercel). All outbound requests use `fetch` to same-origin API routes, preventing plain HTTP fallbacks.
- **Security headers:** `next.config.js` applies Content-Security-Policy, Strict-Transport-Security, Permissions-Policy, and Referrer-Policy headers for every response.
- **Logging hygiene:** Server-side handlers avoid logging raw payloads. Any diagnostic logging must mask identifiers and amounts before emitting events.
- **Analytics consent:** Google Tag Manager only loads after opt-in via the cookie banner and automatically respects the browser Do-Not-Track flag.

## Incident response and retention

- **Retention controls:** Users can select 7, 30, or 90-day retention for downloaded artifacts; all durations are simulated locally in the demo and intended to map to backend policies in production.
- **User-triggered purge:** The **Delete now** action clears local storage, wizard state, and generated files in the current session.
- **Access reviews:** When connected to staging/production infrastructure, limit elevated console and Vercel access to least-privilege roles and rotate OpenRouter keys every 90 days.

For questions or security reviews, contact `security@taxhelpai.com`.
