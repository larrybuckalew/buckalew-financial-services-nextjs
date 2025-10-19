@echo off
echo ========================================
echo PostgreSQL 17 Database Setup
echo ========================================
echo.

set PGPASSWORD=Buckalew2025

REM Set PostgreSQL 17 path
set "PG_PATH=C:\Program Files\PostgreSQL\17\bin"
set "PATH=%PG_PATH%;%PATH%"

echo Using PostgreSQL 17 at: %PG_PATH%
echo.

REM Test connection
echo Step 1: Testing PostgreSQL connection...
"%PG_PATH%\psql.exe" --version
echo.

echo Step 2: Checking if Buckalew database exists...
"%PG_PATH%\psql.exe" -U postgres -lqt | find "Buckalew" >nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ Database 'Buckalew' already exists
) else (
    echo Creating database 'Buckalew'...
    "%PG_PATH%\psql.exe" -U postgres -c "CREATE DATABASE \"Buckalew\";"
    if %ERRORLEVEL% EQU 0 (
        echo ✓ Database created
    ) else (
        echo ERROR: Could not create database
        echo Make sure you enter the correct postgres password
        pause
        exit /b 1
    )
)
echo.

echo Step 3: Installing required packages...
call npm install bcryptjs
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)
echo ✓ Packages installed
echo.

echo Step 4: Generating Prisma Client...
call npx prisma generate
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Prisma generate failed
    pause
    exit /b 1
)
echo ✓ Prisma Client generated
echo.

echo Step 5: Pushing schema to database...
call npx prisma db push
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Database push failed
    echo.
    echo This usually means:
    echo 1. Wrong password in .env.local
    echo 2. Database connection issue
    echo.
    echo Check your .env.local file:
    echo DATABASE_URL should be:
    echo postgresql://postgres:YOUR_PASSWORD@localhost:5432/Buckalew?schema=public
    echo.
    pause
    exit /b 1
)
echo ✓ Schema pushed to database
echo.

echo Step 6: Seeding database with admin user...
call node prisma\seed.js
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Seed failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✓ SETUP COMPLETE!
echo ========================================
echo.
echo Database is ready!
echo.
echo NEXT STEPS:
echo 1. Start dev server: npm run dev
echo 2. Go to: http://localhost:3000/login
echo 3. Login with credentials shown above
echo 4. Access admin at: http://localhost:3000/admin
echo.
pause
