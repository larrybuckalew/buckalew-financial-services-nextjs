# Buckalew Financial Services Setup Guide

## Prerequisites
- Node.js (v18+)
- npm (v9+)
- PostgreSQL

## Installation Steps

1. Clone the Repository
```bash
git clone https://github.com/your-repo/buckalew-financial-services-nextjs.git
cd buckalew-financial-services-nextjs
```

2. Configure Environment
- Copy `.env.local` and update with your specific credentials
- Ensure PostgreSQL is running
- Create the database: `createdb buckalew_financial`

3. Install Dependencies
```bash
npm install
```

4. Set Up Database
```bash
# Generate Prisma Client
npx prisma generate

# Run Migrations
npx prisma migrate dev

# Optional: Seed Database
npx prisma db seed
```

5. Start Development Server
```bash
npm run dev
```

## Troubleshooting
- Ensure PostgreSQL is running
- Check `.env.local` for correct database credentials
- Verify Node.js and npm versions

## Common Commands
- Start Dev Server: `npm run dev`
- Build Production: `npm run build`
- Run Tests: `npm test`
- Lint Code: `npm run lint`

## Feature Flags
Configure in `.env.local`:
- `ENABLE_MFA`: Enable Multi-Factor Authentication
- `ENABLE_PASSWORD_RESET`: Enable Password Reset Feature
- `ENABLE_EMAIL_NOTIFICATIONS`: Enable Email Notifications
