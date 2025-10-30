# TaxHelp AI Marketing Site

This repository contains the Next.js marketing experience for TaxHelp AI, including the public demo wizard, pricing, security, contact, and legal pages.

## Tech stack

- **Framework:** Next.js App Router (React + TypeScript)
- **Styling:** Tailwind CSS with shadcn/ui components
- **Language support:** English and Spanish via localized dictionaries
- **Tooling:** ESLint, Prettier, and custom binary-audit utilities

## Getting started

```bash
npm install
npm run dev
```

The app runs on [Next.js App Router](https://nextjs.org/docs/app) with Tailwind CSS and shadcn/ui components. Preview the site at `http://localhost:3000`.

## Environment variables

Create a `.env.local` file with optional keys:

```env
NEXT_PUBLIC_APP_NAME=TaxHelp AI
OPENROUTER_API_KEY=sk-...
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

`OPENROUTER_API_KEY` enables the `/api/ai/explain` proxy for the Q&A step. When the key is not provided the demo falls back to a mock response.

## Available scripts

- `npm run dev` – start the development server
- `npm run build` – create an optimized production build
- `npm run start` – run the production server
- `npm run lint` – run ESLint
- `npm run check:binaries` – scan branch history for disallowed binary assets
- `npm run resolve:binaries` – auto-stage binary conflict files in favour of the current branch

## Project structure

```
app/                  # App Router routes and API handlers
components/           # Shared UI components, layout, and pages
lib/                  # Shared utilities and tax rule mappings
public/               # Static assets (icons, robots.txt, etc.)
tailwind.config.ts    # Tailwind configuration
```

## Deployment checklist

1. **Install dependencies** using `npm ci` on the target environment.
2. **Build the app** with `npm run build`; the command must complete without ESLint or TypeScript errors.
3. **Provision environment variables** (`OPENROUTER_API_KEY`, `NEXT_PUBLIC_GTM_ID`, etc.) inside Vercel project settings.
4. **Connect the GitHub repository** to Vercel so pull requests automatically create preview deployments.
5. **Promote staging to production** once checks pass and content is approved.
6. **Attach the domain** (e.g., `staging.taxhelp.ai`, `taxhelp.ai`) through Vercel DNS management.

Refer to [`docs/security.md`](docs/security.md) and [`docs/roadmap.md`](docs/roadmap.md) for additional operational details.

## Preventing binary-asset push failures

If GitHub blocks a push with a "Binary files are not supported" message, run `npm run check:binaries` to list the offending paths. The command delegates to [`scripts/audit-binaries.mjs`](scripts/audit-binaries.mjs), which inspects the branch history for known binary extensions and points to [`docs/binary-assets.md`](docs/binary-assets.md) for remediation steps.

When the error appears while merging or rebasing with upstream, keep the repository's `.gitattributes` file intact and run `npm run resolve:binaries`. The script checks each conflicted path for the `binary` attribute, stages your branch's copy automatically, and prints the next commands to commit the resolution. Because Git avoids content merges for binary-marked paths, this preserves your branch's files and prevents unsupported-asset warnings on push.
