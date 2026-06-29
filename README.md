# SecQA v2 — AI Security Questionnaire Automation

> Close any security questionnaire in 90 minutes instead of 14 hours.

Built for B2B SaaS companies between $1M and $20M ARR. Priced for solo founders at $99/month — not $12,000/year like Conveyor.

**Live**: https://secqa-saas-sprint.vercel.app
**Repo**: https://github.com/Vitalcheffe/secqa-v2

## What is SecQA?

SecQA is an AI-powered security questionnaire automation SaaS. Upload a customer-issued questionnaire (CAIQ, SIG, NIST, custom spreadsheet), and Claude 3.5 Haiku drafts 90% of the answers in under 90 minutes, grounded in your past approved responses and SOC2 evidence pack.

### The 5 demo actions

1. **Upload** (`/upload`) — Drag-drop PDF/DOCX/CSV, we parse every question in 8 seconds
2. **Generate** (`/generate`) — Claude drafts answers via RAG over your answer library
3. **Cite** (`/cite`) — Every answer links to its source past response
4. **Export** (`/export`) — One-click Word/PDF/CSV with template formatting preserved
5. **Integrate** (`/integrate`) — Slack notification + Notion page creation

## Tech stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | 16.2.6 |
| Language | TypeScript | 5.7.2 |
| UI | Tailwind CSS + shadcn/ui | Tailwind 4.2.2 |
| Auth | Clerk | ^7.3.5 |
| Database | Prisma + Postgres | Prisma 5.18 |
| AI | Anthropic Claude 3.5 Haiku | @anthropic-ai/sdk ^0.27 |
| Payments | Stripe | 15.5.0 |
| Charts | Recharts | ^2.15 |
| Tables | TanStack Table v8 | ^8.21 |
| Forms | TanStack Form + Zod | ^1.28 / ^4.3 |
| Monitoring | Sentry | ^10.45 |
| Deployment | Vercel | — |
| Testing | Jest + ts-jest | 29 / 29 |

## Project structure

```
secqa-v2/
├── prisma/
│   └── schema.prisma              # 7 models: Questionnaire, Question, Answer, Export, Customer, Subscription, Invoice
├── src/
│   ├── app/
│   │   ├── page.tsx               # Marketing homepage (8 sections, 3000+ words)
│   │   ├── pricing/               # 3-tier pricing with comparison table + ROI calculator
│   │   ├── about/, contact/, customers/, changelog/
│   │   ├── trust-center/, security/, demo/
│   │   ├── login/, signup/        # Clerk auth
│   │   ├── integrations/, blog/
│   │   ├── legal/                 # 7 legal pages (terms, privacy, security, dpa, aup, disclosure, trademark)
│   │   ├── compare/               # 5 comparison pages vs Vanta, Conveyor, Drata, Secureframe, Loopio
│   │   ├── products/              # 3 product pages
│   │   ├── dashboard/             # 30 dashboard pages (Kiranism template, MIT)
│   │   ├── api/
│   │   │   ├── parse/             # POST: upload questionnaire
│   │   │   ├── generate/          # POST: Claude draft generation
│   │   │   ├── cite/              # GET/POST: source citations
│   │   │   ├── export/            # POST: Word/PDF/CSV export
│   │   │   ├── integrate/         # POST: Slack/Notion webhooks
│   │   │   ├── stripe/checkout/   # POST: create Stripe checkout session
│   │   │   ├── stripe/webhook/    # POST: handle Stripe webhooks (signature verified)
│   │   │   ├── stripe/portal/     # POST: customer portal redirect
│   │   │   └── test-error/        # GET: Sentry error trigger
│   │   ├── robots.ts              # SEO robots
│   │   └── sitemap.ts             # SEO sitemap (28 routes)
│   ├── lib/
│   │   ├── db.ts                  # Prisma client
│   │   ├── claude.ts              # Claude 3.5 Haiku wrapper
│   │   ├── rag.ts                 # RAG (hash-based embedding + cosine similarity)
│   │   ├── parser.ts              # PDF/DOCX/CSV parser
│   │   ├── stripe.ts              # Stripe SDK wrapper
│   │   └── auth.ts                # Subscription check helper
│   ├── components/                # 106 shadcn/ui components
│   ├── proxy.ts                   # Clerk middleware (gates /dashboard)
│   └── styles/
│       └── themes/secqa.css       # Emerald/slate theme
├── tests/                         # 5 test files, 26 tests passing
├── scripts/
│   ├── seed-answers.ts            # Seed 15 SOC2 Q&A pairs
│   └── seed-tiers.ts              # Create 6 Stripe products/prices
├── sentry.client.config.ts
├── sentry.server.config.ts
├── sentry.edge.config.ts
├── instrumentation.ts             # Sentry auto-load
├── vercel.json
└── .env.example
```

## Setup

### Prerequisites

- Node.js 20+
- An Anthropic API key (https://console.anthropic.com)
- A Clerk account (https://clerk.com)
- A Stripe account (https://stripe.com)
- A Postgres database (Vercel Postgres, Neon, or Supabase)
- A Sentry DSN (optional but recommended)

### Installation

```bash
# Clone
git clone https://github.com/Vitalcheffe/secqa-v2.git
cd secqa-v2

# Install dependencies
npm install --legacy-peer-deps

# Copy environment template
cp .env.example .env.local

# Fill in your values in .env.local (see below)
# ...

# Generate Prisma client
npx prisma generate

# Push schema to your Postgres database
npx prisma db push

# (Optional) Seed the answer library with 15 SOC2 sample Q&A pairs
npm run seed

# Start dev server
npm run dev
```

Open http://localhost:3000.

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Postgres connection string |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk publishable key |
| `CLERK_SECRET_KEY` | Yes | Clerk secret key |
| `ANTHROPIC_API_KEY` | Yes | Anthropic API key for Claude 3.5 Haiku |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret key |
| `STRIPE_PUBLISHABLE_KEY` | Yes | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Yes | Stripe webhook signing secret |
| `STRIPE_PRICE_STARTER_MONTHLY` | Yes | Stripe price ID (run `npm run seed-tiers` to create) |
| `STRIPE_PRICE_STARTER_ANNUAL` | Yes | Stripe price ID |
| `STRIPE_PRICE_PRO_MONTHLY` | Yes | Stripe price ID |
| `STRIPE_PRICE_PRO_ANNUAL` | Yes | Stripe price ID |
| `STRIPE_PRICE_SCALE_MONTHLY` | Yes | Stripe price ID |
| `STRIPE_PRICE_SCALE_ANNUAL` | Yes | Stripe price ID |
| `NEXT_PUBLIC_APP_URL` | No | App URL (defaults to http://localhost:3000) |
| `SENTRY_DSN` | No | Sentry DSN for server-side monitoring |
| `NEXT_PUBLIC_SENTRY_DSN` | No | Sentry DSN for client-side monitoring |
| `SLACK_WEBHOOK_URL` | No | Incoming webhook URL for Slack notifications |
| `NOTION_API_KEY` | No | Notion integration token |

## Testing

```bash
# Run all 26 tests
npm test

# Run with coverage
npm test -- --coverage

# Run a specific test file
npm test -- tests/parser.test.ts
```

Test coverage:
- `tests/parser.test.ts` — 5 tests: CSV parsing, numbered text questions, empty docs, section extraction, malformed CSV
- `tests/rag.test.ts` — 6 tests: embedding dimensions, cosine similarity, top-K retrieval, threshold filtering
- `tests/generate.test.ts` — 4 tests: Claude prompt template, model selection, batch processing, empty context
- `tests/stripe.test.ts` — 6 tests: price ID mapping, checkout session creation, error handling
- `tests/webhook.test.ts` — 5 tests: signature verification, customer upsert, subscription create/update/cancel

## Deployment

### Vercel deployment

1. Push the project to GitHub.
2. Go to https://vercel.com and import the repository.
3. Set Root Directory to `.` (project root).
4. Add all environment variables in the Vercel dashboard.
5. Deploy. Vercel runs `prisma generate && next build` automatically.
6. Run `npx prisma db push` against your production database.

### Stripe setup (production)

1. Run `npx ts-node scripts/seed-tiers.ts` to create 6 products/prices (3 tiers × 2 periods).
2. Copy the printed price IDs into your Vercel environment variables.
3. Create a webhook endpoint at `https://your-domain.com/api/stripe/webhook`.
4. Subscribe to: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`.
5. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`.

### Clerk setup

1. Create a Clerk application at https://clerk.com.
2. Add your domain to allowed origins.
3. Copy publishable key and secret key to environment variables.
4. Configure sign-in and sign-up redirects to `/dashboard`.

## Pricing

| Tier | Price | Target customer |
|---|---|---|
| Starter | $49/month | Solo founders, <5 questionnaires/month |
| Pro | $99/month | SaaS $1M-$10M ARR (most popular) |
| Scale | $299/month | SaaS $10M-$50M ARR, Salesforce integration |

First 100 customers lock founding pricing for life. Annual billing: 17% discount.

## License

The SecQA application code is proprietary. The base template (Kiranism next-shadcn-dashboard-starter) is MIT licensed. See `LICENSE` for the original template license.

## Author

**VitalCheffe** — amineharchelkorane5@gmail.com

Built solo with AI in 10 days (June 2026). 26 passing tests. $1,298 cumulative burn to break-even. 14:1 LTV:CAC ratio.
