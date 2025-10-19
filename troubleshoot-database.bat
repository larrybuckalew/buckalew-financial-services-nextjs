@echo off
echo ========================================
echo Database Troubleshooting Script
echo ========================================
echo.

echo Checking PostgreSQL status...
echo.

REM Check if PostgreSQL is in PATH
where psql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ PostgreSQL not found in PATH
    echo    Install from: https://www.postgresql.org/download/
    echo.
) else (
    echo ✓ PostgreSQL is installed
)

REM Check if service is running
sc query postgresql-x64-15 | find "RUNNING" >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ PostgreSQL service is running
) else (
    echo ❌ PostgreSQL service is NOT running
    echo    Fix: Open Services and start postgresql-x64-15
    echo.
)

REM Check if can connect
psql -U postgres -d postgres -c "SELECT 1;" >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ Can connect to PostgreSQL
) else (
    echo ❌ Cannot connect to PostgreSQL
    echo    Check your postgres password
    echo.
)

REM Check if database exists
psql -U postgres -lqt | find "Buckalew" >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ Buckalew database exists
) else (
    echo ❌ Buckalew database does NOT exist
    echo    Run: createdb -U postgres Buckalew
    echo.
)

REM Check .env.local file
if exist .env.local (
    echo ✓ .env.local file exists
    findstr "DATABASE_URL" .env.local >nul
    if %ERRORLEVEL% EQU 0 (
        echo ✓ DATABASE_URL is set in .env.local
    ) else (
        echo ❌ DATABASE_URL not found in .env.local
    )
) else (
    echo ❌ .env.local file NOT found
    echo.
)

REM Check if Prisma Client is generated
if exist node_modules\.prisma (
    echo ✓ Prisma Client is generated
) else (
    echo ❌ Prisma Client NOT generated
    echo    Run: npx prisma generate
    echo.
)

REM Check if tables exist
psql -U postgres -d Buckalew -c "\dt" >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ Database tables exist
    echo.
    echo Listing tables:
    psql -U postgres -d Buckalew -c "\dt"
) else (
    echo ❌ Database tables do NOT exist
    echo    Run: npx prisma db push
    echo.
)

echo.
echo ========================================
echo Quick Fixes:
echo ========================================
echo.
echo If PostgreSQL not running:
echo   1. Open Services (Win+R, type services.msc)
echo   2. Find "postgresql-x64-15"
echo   3. Right-click, Start
echo.
echo If database doesn't exist:
echo   createdb -U postgres Buckalew
echo.
echo If tables don't exist:
echo   npx prisma db push
echo.
echo If Prisma Client not generated:
echo   npx prisma generate
echo.
echo Complete setup:
echo   setup-database.bat
echo.
pause
