# Buckalew Financial Services - Deployment Guide

## Prerequisites
- Node.js (v20.x)
- npm (v9.x)
- Vercel CLI
- GitHub account
- Supabase account
- Google Cloud Project (for OAuth)

## Local Setup
1. Clone the repository
```bash
git clone https://github.com/larrybuckalew/buckalew-financial-services-nextjs.git
cd buckalew-financial-services-nextjs
```

2. Install Dependencies
```bash
npm install
```

3. Configure Environment Variables
- Copy `.env.example` to `.env`
- Fill in all required configuration values

## Database Migration
```bash
npx prisma migrate dev
npx prisma generate
```

## Development Workflow
- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run test`: Run test suite
- `npm run lint`: Run code linting

## Deployment Platforms

### Vercel Deployment
1. Install Vercel CLI
```bash
npm i -g vercel
```

2. Login to Vercel
```bash
vercel login
```

3. Deploy to Staging
```bash
vercel
```

4. Deploy to Production
```bash
vercel --prod
```

### Manual Server Deployment
1. Build the application
```bash
npm run build
```

2. Start Production Server
```bash
npm run start
```

## Environment Configuration
- **Development**: `.env.development`
- **Staging**: `.env.staging`
- **Production**: `.env.production`

## Continuous Integration
- Automated tests run on every pull request
- Deployment to staging on merge to `develop`
- Production deployment on merge to `main`

## Monitoring and Logging
- Error tracking via Sentry
- Performance monitoring via Vercel
- Logs stored in Cloudwatch

## Troubleshooting
- Check Vercel deployment logs
- Verify environment variables
- Ensure database connections
- Review CI/CD pipeline status

## Security Considerations
- Always use HTTPS
- Implement strong authentication
- Regularly update dependencies
- Enable multi-factor authentication

## Post-Deployment Checklist
- [ ] Verify deployment URL
- [ ] Run smoke tests
- [ ] Check error logs
- [ ] Validate OAuth flows
- [ ] Test critical user journeys

## Rollback Procedure
```bash
vercel rollback
```

## Support
- Email: engineering@buckalew.com
- Slack: #buckalew-engineering
