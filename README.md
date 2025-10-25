# TaxHelp AI Monorepo

This repository contains the Vercel-native TaxHelp AI application located in [`TaxHelpAI/`](./TaxHelpAI). It delivers the full SaaS stack — marketing site, authenticated dashboard, API routes, Prisma schema, and infrastructure configuration — inside a single Next.js 14 project.

## Quick start

```bash
cd TaxHelpAI
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
npm run dev
```

Visit `http://localhost:3000` for the marketing page and `http://localhost:3000/login` to authenticate with demo credentials (`demo@taxhelp.ai` / `Password123!`).

Refer to [`TaxHelpAI/README.md`](./TaxHelpAI/README.md) for environment variables, deployment steps, and integration notes.
