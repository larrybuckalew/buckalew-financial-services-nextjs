<<<<<<< HEAD
# Buckalew Financial Services - Next.js Web Application

## Overview
A comprehensive web application for Buckalew Financial Services, providing insurance and financial solutions.

## Features
- Insurance quote generation
- Policy management
- Gated content PDF generation
- Responsive design
- Secure authentication

## Prerequisites
- Node.js (v18+)
- npm or Yarn
- GoHighLevel account
- Sentry account (optional)

## Installation

1. Clone the repository
```bash
git clone https://github.com/larrybuckalew/buckalew-financial-services-nextjs.git
cd buckalew-financial-services-nextjs
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Configure environment variables
- Copy `.env.example` to `.env.local`
- Fill in required API keys and credentials

## Development
```bash
npm run dev
# or
yarn dev
```

## Build for Production
```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Testing
```bash
npm run test
# or
yarn test
```

## Deployment
- Vercel recommended
- Environment-specific configurations in `.env.production`

## Technologies
- Next.js
- React
- TypeScript
- Tailwind CSS
- GoHighLevel CRM
- Sentry for monitoring

## License
Proprietary - All rights reserved
=======
# Buckalew Financial Services Web Application

A Next.js-based web application for managing insurance policies, quotes, and financial calculations.

## Features

- 🔒 Secure authentication with NextAuth
- 💰 Insurance policy management
- 📊 Financial calculators
- 📱 Responsive design
- 🔐 Role-based access control
- ⚡ Real-time premium calculations

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js
- **Database:** PostgreSQL with Prisma
- **Error Tracking:** Sentry
- **Testing:** Jest & React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/larrybuckalew/buckalew-financial-services-nextjs.git
   cd buckalew-financial-services-nextjs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

4. Set up your environment variables in `.env`

5. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
/src
  /components
    /ui          # Shared UI components
    /insurance   # Insurance-related components
    /calculators # Financial calculators
    /layout      # Layout components
  /lib
    /auth       # Authentication utilities
    /security   # Security-related utilities
  /pages
    /api        # API routes
    /auth       # Authentication pages
    /insurance  # Insurance pages
    /dashboard  # Dashboard pages
  /styles       # Global styles
  /types        # TypeScript types
/prisma         # Database schema and migrations
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## Testing

Run tests using Jest:

```bash
npm test
```

For test coverage:

```bash
npm run test:coverage
```

## Database Migrations

Create a new migration:

```bash
npx prisma migrate dev --name your_migration_name
```

Apply migrations:

```bash
npx prisma migrate deploy
```

## Contributing

1. Create a new branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## Security

- All routes are protected with NextAuth
- Role-based access control implemented
- Two-factor authentication available
- Regular security audits

## License

MIT

## Contact

For questions or support, please contact support@buckalewfinancial.com
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b
