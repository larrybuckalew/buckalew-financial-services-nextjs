# Troubleshooting Guide

## Common Issues and Solutions

### Prisma Database Issues

If you see Prisma errors:

1. Check your database connection:
```bash
# Test database connection
npx prisma db pull
```

2. Reset the database:
```bash
npx prisma migrate reset
npx prisma generate
npx prisma migrate dev
```

3. Verify your .env file has the correct DATABASE_URL:
```
DATABASE_URL="postgresql://username:password@localhost:5432/buckalew_financial"
```

### Next.js Build Issues

1. Clear Next.js cache:
```bash
rm -rf .next
npm run build
```

2. Check for TypeScript errors:
```bash
npm run lint
```

### Component Loading Issues

1. Check file paths in imports
2. Verify component exports are correct
3. Clear and reinstall node_modules:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Development Server Issues

1. Check if port 3000 is in use:
```bash
# Windows
netstat -ano | findstr :3000
# Kill the process if needed
taskkill /PID <PID> /F
```

2. Verify environment variables are set correctly
3. Check for any error messages in the console

## Quick Setup

Run these commands in order:

```powershell
# Install dependencies
.\tools\Install-Dependencies.ps1

# Setup database
npx prisma generate
npx prisma migrate dev

# Start development server
npm run dev
```

## Need Help?

1. Check the error logs in `./logs`
2. Review recent git commits for changes
3. Verify all environment variables are set
4. Make sure PostgreSQL is running locally