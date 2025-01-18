# Deployment Guide

## Prerequisites
- Vercel account
- Environment variables set up
- Database provisioned

## Environment Variables
```
DATABASE_URL=
NEXT_PUBLIC_SENTRY_DSN=
UPSTASH_REDIS_URL=
UPSTASH_REDIS_TOKEN=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```

## Deployment Steps
1. Push to main branch
2. GitHub Actions will:
   - Run tests
   - Deploy to staging
   - Run security scans
3. Manual promotion to production

## Monitoring
- Sentry for error tracking
- Vercel Analytics for performance
- Upstash for Redis metrics