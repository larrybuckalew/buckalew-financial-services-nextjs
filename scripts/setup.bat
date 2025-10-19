@echo off
setlocal enabledelayedexpansion

echo =========================================
echo   Buckalew Financial Services Setup     
echo =========================================
echo.

:: Check if Node.js is installed
echo Checking prerequisites...
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

for /f "tokens=1 delims=v" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js found: %NODE_VERSION%

:: Check if .env.local exists
if not exist ".env.local" (
    echo ❌ .env.local file not found
    echo Creating .env.local from .env.example...
    copy ".env.example" ".env.local" >nul
    echo ✅ .env.local created
    echo.
    echo ⚠️  IMPORTANT: Please edit .env.local with your database credentials
    echo    The file is located at: %cd%\.env.local
    echo.
    echo Press any key after editing .env.local...
    pause >nul
)

:: Install dependencies
echo.
echo Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed

:: Generate Prisma client
echo.
echo Generating Prisma client...
call npx prisma generate
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to generate Prisma client
    pause
    exit /b 1
)
echo ✅ Prisma client generated

:: Test database connection
echo.
echo Testing database connection...
node -e "const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.$connect().then(() => { console.log('✅ Database connection successful'); process.exit(0); }).catch((e) => { console.log('❌ Database connection failed:', e.message); process.exit(1); });"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Database connection failed
    echo Please check your database configuration in .env.local
    echo Make sure PostgreSQL is running and credentials are correct.
    echo.
    echo Current DATABASE_URL in .env.local should be:
    echo postgresql://postgres:Buckalew2025@localhost:5432/buckalew_financial
    echo.
    pause
    exit /b 1
)

:: Run migrations
echo.
echo Running database migrations...
call npx prisma migrate dev --name setup_database
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Database migration failed
    pause
    exit /b 1
)
echo ✅ Database migrations completed

:: Seed database
echo.
echo Seeding database with initial data...
call npx prisma db seed
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Database seeding failed
    pause
    exit /b 1
)
echo ✅ Database seeded successfully

:: Success message
echo.
echo =========================================
echo 🎉 Setup completed successfully!
echo =========================================
echo.
echo Next Steps:
echo.
echo 1. Start the development server:
echo    npm run dev
echo.
echo 2. Open your browser to:
echo    http://localhost:3000
echo.
echo 3. Access the admin panel:
echo    http://localhost:3000/admin
echo    Email: admin@buckalew-financial.com
echo    Password: Admin123!
echo.
echo 4. View database (optional):
echo    npm run db:studio
echo.
echo 5. Run tests (optional):
echo    npm test
echo.
echo =========================================
echo.
echo Press any key to exit...
pause >nul
exit /b 0