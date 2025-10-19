@echo off
echo =========================================
echo Buckalew Financial Services DB Setup
echo =========================================

echo.
echo Step 1: Checking PostgreSQL connection...
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.$connect().then(() => { console.log('✅ Database connection successful'); prisma.$disconnect(); }).catch((e) => { console.log('❌ Database connection failed:', e.message); process.exit(1); });"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Please ensure PostgreSQL is running and credentials are correct in .env.local
    echo Database URL: postgresql://postgres:Buckalew2025@localhost:5432/buckalew_financial
    pause
    exit /b 1
)

echo.
echo Step 2: Generating Prisma Client...
npx prisma generate

echo.
echo Step 3: Running database migrations...
npx prisma migrate dev --name setup_database

echo.
echo Step 4: Seeding initial data...
npx prisma db seed

echo.
echo ✅ Database setup completed successfully!
echo.
echo Next steps:
echo 1. Run: npm run dev
echo 2. Visit: http://localhost:3000
echo 3. Check database at: http://localhost:3000/admin
echo.
pause
