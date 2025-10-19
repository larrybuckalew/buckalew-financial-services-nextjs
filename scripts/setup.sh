#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}  Buckalew Financial Services Setup     ${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command_exists node; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

if ! command_exists npm; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version 18 or higher required. Current version: $(node -v)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v) found${NC}"
echo -e "${GREEN}✅ npm $(npm -v) found${NC}"

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${RED}❌ .env.local file not found${NC}"
    echo -e "${YELLOW}Creating .env.local from .env.example...${NC}"
    cp .env.example .env.local
    echo -e "${GREEN}✅ .env.local created. Please edit it with your database credentials.${NC}"
    echo -e "${YELLOW}Press any key to continue after editing .env.local...${NC}"
    read -n 1 -s
fi

# Install dependencies
echo ""
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Dependencies installed${NC}"

# Generate Prisma client
echo ""
echo -e "${YELLOW}Generating Prisma client...${NC}"
npx prisma generate
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to generate Prisma client${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Prisma client generated${NC}"

# Test database connection
echo ""
echo -e "${YELLOW}Testing database connection...${NC}"
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.\$connect()
  .then(() => {
    console.log('✅ Database connection successful');
    process.exit(0);
  })
  .catch((e) => {
    console.log('❌ Database connection failed:', e.message);
    process.exit(1);
  });"

if [ $? -ne 0 ]; then
    echo -e "${RED}Please check your database configuration in .env.local${NC}"
    echo -e "${YELLOW}Make sure PostgreSQL is running and credentials are correct.${NC}"
    exit 1
fi

# Run migrations
echo ""
echo -e "${YELLOW}Running database migrations...${NC}"
npx prisma migrate dev --name setup_database
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Database migration failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Database migrations completed${NC}"

# Seed database
echo ""
echo -e "${YELLOW}Seeding database with initial data...${NC}"
npx prisma db seed
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Database seeding failed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Database seeded successfully${NC}"

# Final status check
echo ""
echo -e "${YELLOW}Verifying setup...${NC}"
npm run db:studio > /dev/null 2>&1 &
STUDIO_PID=$!
sleep 2
kill $STUDIO_PID 2>/dev/null

echo ""
echo -e "${GREEN}🎉 Setup completed successfully!${NC}"
echo ""
echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}  Next Steps:                           ${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""
echo -e "${GREEN}1. Start the development server:${NC}"
echo -e "   ${YELLOW}npm run dev${NC}"
echo ""
echo -e "${GREEN}2. Open your browser to:${NC}"
echo -e "   ${YELLOW}http://localhost:3000${NC}"
echo ""
echo -e "${GREEN}3. Access the admin panel:${NC}"
echo -e "   ${YELLOW}http://localhost:3000/admin${NC}"
echo -e "   Email: admin@buckalew-financial.com"
echo -e "   Password: Admin123!"
echo ""
echo -e "${GREEN}4. View database (optional):${NC}"
echo -e "   ${YELLOW}npm run db:studio${NC}"
echo ""
echo -e "${GREEN}5. Run tests (optional):${NC}"
echo -e "   ${YELLOW}npm test${NC}"
echo ""
echo -e "${BLUE}=========================================${NC}"

exit 0