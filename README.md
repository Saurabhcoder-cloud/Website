# TaxHelp AI Monorepo

This repository hosts the **TaxHelp AI** project, an AI-assisted U.S. tax preparation platform combining a Next.js frontend, Express backend, and PostgreSQL database with integrations for Stripe, OpenAI, Google Vision, i18next, and pdf-lib.

## Project layout

```
taxhelp-ai/
 ├── frontend/   # Next.js + TailwindCSS app
 ├── backend/    # Express API with PostgreSQL
 ├── database/   # SQL schema and seed data
 └── README.md   # Detailed project documentation
```

The implementation lives inside the [`taxhelp-ai`](taxhelp-ai/) directory. Refer to its [README](taxhelp-ai/README.md) for setup instructions, environment configuration, and development scripts.

## Quick start

1. Install dependencies for the frontend and backend workspaces:
   ```bash
   cd taxhelp-ai/frontend && npm install
   cd ../backend && npm install
   ```
2. Copy `.env.example` to `.env` at the project root and provide the required secrets.
3. In separate terminals run `npm run dev` inside `frontend` and `backend` respectively.
4. Apply the SQL schema and optional seed data from the `database/` directory to your PostgreSQL instance.

For more details on features, API endpoints, and future enhancements, see [`taxhelp-ai/README.md`](taxhelp-ai/README.md).
