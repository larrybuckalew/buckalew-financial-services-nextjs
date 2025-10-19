# Project Dependencies Guide

## Core Dependencies Installation

### 1. Initial Setup
```bash
# Create project
npx create-next-app@latest buckalew-financial-services-nextjs
cd buckalew-financial-services-nextjs

# Install core dependencies
npm install \
  @prisma/client \
  zod \
  jsonwebtoken \
  bcrypt \
  lru-cache \
  next-connect \
  axios
```

### 2. Development Dependencies
```bash
npm install -D \
  prisma \
  @types/jsonwebtoken \
  @types/bcrypt \
  typescript \
  eslint \
  @types/node
```

### 3. Security and Validation
```bash
npm install \
  helmet \
  cors \
  express-rate-limit
```

### 4. Database and ORM
```bash
# Prisma setup
npx prisma init
npx prisma generate
npx prisma migrate dev
```

### 5. Optional Performance and Monitoring
```bash
npm install \
  @sentry/nextjs \
  winston
```

## Configuration Steps

### Prisma Setup
1. Configure `schema.prisma`
2. Generate Prisma Client
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### TypeScript Configuration
Update `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## Recommended VS Code Extensions
- Prisma
- ESLint
- Prettier
- TypeScript

## Troubleshooting
- Ensure `.env` is properly configured
- Run `npm run dev` to start development server
- Use `npm run lint` for code quality checks
