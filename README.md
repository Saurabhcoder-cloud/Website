# TaxHelp AI Marketing Site

This repository contains the Next.js marketing experience for TaxHelp AI, including the public demo wizard, pricing, security, contact, and legal pages.

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

## Project structure

```
app/                  # App Router routes and API handlers
components/           # Shared UI components, layout, and pages
lib/                  # Shared utilities and tax rule mappings
public/               # Static assets (icons, robots.txt, etc.)
tailwind.config.ts    # Tailwind configuration
```
