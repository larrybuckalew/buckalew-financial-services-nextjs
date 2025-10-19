@echo off
echo Starting Buckalew Financial Services Development Server...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo.
)

REM Check if .env.local exists
if not exist ".env.local" (
    echo ERROR: .env.local file not found!
    echo Please create a .env.local file with the necessary environment variables.
    pause
    exit /b 1
)

REM Generate Prisma client
echo Generating Prisma client...
npx prisma generate
echo.

REM Try to run migrations (this might fail if DB is not set up)
echo Attempting to run database migrations...
npx prisma migrate deploy 2>nul
if %errorlevel% neq 0 (
    echo.
    echo WARNING: Database migrations failed. 
    echo Make sure PostgreSQL is running and the DATABASE_URL in .env.local is correct.
    echo Continuing without database...
    echo.
)

REM Start the development server
echo Starting Next.js development server...
echo.
npm run dev

pause
