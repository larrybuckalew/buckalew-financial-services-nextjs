@echo off
echo ========================================
echo PostgreSQL Database Setup
echo ========================================
echo.
echo This script will set up your database
echo.

REM Check if PostgreSQL is installed
where psql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: PostgreSQL is not installed or not in PATH
    echo Please install PostgreSQL from: https://www.postgresql.org/download/windows/
    echo.
    pause
    exit /b 1
)

echo Step 1: Testing PostgreSQL connection...
psql -U postgres -d postgres -c "SELECT version();" >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Cannot connect to PostgreSQL
    echo Make sure PostgreSQL service is running
    echo Check Services: postgresql-x64-15 should be "Running"
    echo.
    pause
    exit /b 1
)
echo ✓ PostgreSQL is running

echo.
echo Step 2: Creating database...
psql -U postgres -c "CREATE DATABASE \"Buckalew\";" >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ Database 'Buckalew' created
) else (
    echo ! Database 'Buckalew' already exists (this is OK)
)

echo.
echo Step 3: Installing npm packages...
call npm install bcryptjs
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install packages
    pause
    exit /b 1
)
echo ✓ Packages installed

echo.
echo Step 4: Generating Prisma Client...
call npx prisma generate
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to generate Prisma Client
    pause
    exit /b 1
)
echo ✓ Prisma Client generated

echo.
echo Step 5: Creating database tables...
call npx prisma db push
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to create tables
    pause
    exit /b 1
)
echo ✓ Database tables created

echo.
echo Step 6: Seeding database with admin user...
call node prisma\seed.js
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to seed database
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✓ Database Setup Complete!
echo ========================================
echo.
echo You can now:
echo   1. Start the dev server: npm run dev
echo   2. Login at: http://localhost:3000/login
echo   3. View database: npm run db:studio
echo.
echo Login credentials were displayed above
echo.
pause
