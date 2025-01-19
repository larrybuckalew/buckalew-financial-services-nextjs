# Buckalew Financial Services - Next.js Application

## Overview
A comprehensive financial services web application built with Next.js, offering advanced financial calculators, user authentication, and personalized financial management tools.

## Features
- 🔐 Secure User Authentication
- 💰 Advanced Financial Calculators
  - Retirement Planning
  - Mortgage Calculation
  - Investment Growth Projection
- 📊 Interactive Dashboard
- 📁 Secure Document Management
- 📬 Messaging System
- ⚙️ User Account Settings

## Technologies
- Next.js 14 (App Router)
- React
- TypeScript
- Prisma ORM
- Tailwind CSS
- NextAuth.js
- PostgreSQL

## Prerequisites
- Node.js 18+
- PostgreSQL
- Prisma CLI

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/larrybuckalew/buckalew-financial-services-nextjs.git
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
- Copy `.env.example` to `.env`
- Fill in your configuration

4. Initialize Prisma
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Run the development server
```bash
npm run dev
```

## Deployment
- Vercel recommended for seamless Next.js deployment
- Configure environment variables in your hosting platform

## Security
See SECURITY.md for detailed security practices and reporting vulnerabilities.