# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project: Buckalew Financial Services — Next.js 15 (App Router) + TypeScript + Prisma + Tailwind + Jest

Commands

Use npm (package-lock.json is present).
- Install dependencies
  - npm ci
- Start dev server
  - npm run dev
- Build production
  - npm run build
- Start production server (after build)
  - npm start
- Lint
  - npm run lint
- Tests (Jest via next/jest, jsdom)
  - Run all tests: npm test
  - Watch mode: npm run test:watch
  - Single file: npm test -- src/path/to/your.test.tsx
  - By name pattern: npm test -- -t "your test name"
  - Coverage: npm run test:coverage
  - CI: npm run test:ci
- Database (Prisma/PostgreSQL)
  - Migrate (dev): npm run db:migrate
  - Generate client: npm run db:generate
  - Seed data: npm run db:seed
  - Reset (drops data): npm run db:reset
  - Deploy migrations: npm run db:deploy
  - Studio (GUI): npm run db:studio
- Environment/setup scripts (optional helpers in scripts/)
  - Database setup: scripts/db-setup.bat (Windows) or scripts/db-setup.sh (macOS/Linux)
  - Sentry setup: scripts/setup-sentry.sh (ensure env and auth are configured)

Architecture overview

Routing and rendering (Next.js App Router)
- App directory: src/app
  - Root layout: src/app/layout.tsx wraps all pages and applies global font (Inter) and ClientLayout
  - Home page: src/app/page.tsx renders a marketing landing page using lucide-react icons and Tailwind components
  - Not found: src/app/not-found.tsx
  - Sitemap: src/app/sitemap.ts returns static routes for SEO
- Legacy pages folder: src/pages (404.tsx, _error.jsx, sentry-example-page.jsx) exists alongside the App Router. App Router is primary; ensure no conflicting routes when adding legacy pages.

Styling and assets
- TailwindCSS configured via tailwind.config.ts and postcss.config.js; content scanning includes src/**/* and app/pages/components folders
- Global styles live at src/app/globals.css

Environment configuration
- src/env.mjs validates process.env at startup with zod. Required keys:
  - DATABASE_URL (PostgreSQL)
  - NEXTAUTH_SECRET (min 32 chars)
  - ENCRYPTION_SECRET_KEY (min 32 chars)
  - Optional: GITHUB_ID/SECRET, ALLOWED_ORIGINS, RATE_LIMIT_ENABLED, SENTRY_DSN, NODE_ENV
- See .env.example for additional SMTP and analytics variables; provide values via .env.local during development

Data layer (Prisma + PostgreSQL)
- Prisma schema: prisma/schema.prisma (User, Role, AuditLog, SystemSettings, Quote)
- Seed script: prisma/seed.ts (invoked by npm run db:seed)
- Client initialization:
  - src/lib/prisma.ts exports a singleton PrismaClient
  - src/lib/db.ts also exports a PrismaClient and helpers (safeDatabaseOperation, checkDatabaseConnection)
  - Prefer a single client import path consistently to avoid duplicate instances in dev

Authentication (NextAuth)
- Configuration: src/lib/auth.ts
  - PrismaAdapter backed by the Prisma schema
  - CredentialsProvider with bcrypt password check
  - JWT sessions; custom sign-in/sign-out/error pages under /auth/*

Security and middleware
- src/middleware.ts
  - Adds security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, CSP, Referrer-Policy)
  - Simple route protection: redirects unauthenticated users from protected routes (/dashboard, /profile, /appointments, /calculators) to /login based on an auth-token cookie
  - Prevents visiting auth routes when already authenticated
  - CORS preflight headers for OPTIONS
  - matcher excludes api, _next, static, favicon, sitemap

Testing
- Jest config: jest.config.js (next/jest) with jsdom environment
  - setupFilesAfterEnv: jest.setup.js (mocks IntersectionObserver, ResizeObserver, matchMedia, and fetch)
  - Test discovery: __tests__/**/* and *.(test|spec).(ts|tsx|js|jsx)
  - Coverage: src/**/* excluding .d.ts, stories, and barrel index files

Linting
- .eslintrc.js extends next/core-web-vitals and @typescript-eslint/recommended
  - Warns on no-console and unused vars; explicit return types are off

Notes observed in repo
- Mixed app (src/app) and legacy pages (src/pages) routing; prefer app router patterns for new work
- Two Prisma client modules (src/lib/prisma.ts and src/lib/db.ts); standardize imports to one to avoid duplication
- README mentions Sentry release commands, but package.json does not define sentry:* scripts; use scripts/setup-sentry.sh and Next.js/Sentry guides if needed
