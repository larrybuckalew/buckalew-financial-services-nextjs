@echo off
echo ========================================
echo PostgreSQL Installation Checker
echo ========================================
echo.

echo Checking for PostgreSQL installation...
echo.

REM Check registry for PostgreSQL
echo [1/5] Checking Windows Registry...
reg query "HKLM\SOFTWARE\PostgreSQL" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✓ PostgreSQL found in registry
    reg query "HKLM\SOFTWARE\PostgreSQL"
    echo.
) else (
    echo ❌ PostgreSQL NOT in registry
    echo.
)

REM Check for service
echo [2/5] Checking for PostgreSQL Windows Service...
sc query | find /I "postgresql" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✓ PostgreSQL service found:
    sc query | find /I "postgresql"
    echo.
) else (
    echo ❌ PostgreSQL service NOT found
    echo.
)

REM Check common installation directories
echo [3/5] Checking common installation directories...
if exist "C:\Program Files\PostgreSQL\" (
    echo ✓ Found: C:\Program Files\PostgreSQL\
    dir "C:\Program Files\PostgreSQL\" /b
    echo.
) else (
    echo ❌ Not found: C:\Program Files\PostgreSQL\
)

if exist "C:\Program Files (x86)\PostgreSQL\" (
    echo ✓ Found: C:\Program Files (x86)\PostgreSQL\
    dir "C:\Program Files (x86)\PostgreSQL\" /b
    echo.
) else (
    echo ❌ Not found: C:\Program Files (x86)\PostgreSQL\
)

REM Check for psql in PATH
echo [4/5] Checking if psql is in PATH...
where psql >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✓ psql found in PATH:
    where psql
    psql --version
    echo.
) else (
    echo ❌ psql NOT in PATH
    echo.
)

REM Check for pg_ctl
echo [5/5] Checking for pg_ctl (PostgreSQL control program)...
where pg_ctl >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✓ pg_ctl found:
    where pg_ctl
    echo.
) else (
    echo ❌ pg_ctl NOT found
    echo.
)

echo ========================================
echo SUMMARY:
echo ========================================
echo.

REM Determine if PostgreSQL is installed
set INSTALLED=0

if exist "C:\Program Files\PostgreSQL\" set INSTALLED=1
if exist "C:\Program Files (x86)\PostgreSQL\" set INSTALLED=1

if %INSTALLED%==1 (
    echo ✓ PostgreSQL IS installed on your system
    echo.
    echo However, it's not in your system PATH.
    echo.
    echo SOLUTION:
    echo Run: find-postgres-everywhere.bat
    echo.
    echo This will locate it and create a custom setup script.
) else (
    echo ❌ PostgreSQL does NOT appear to be installed
    echo.
    echo PLEASE CHOOSE ONE:
    echo.
    echo ========================================
    echo OPTION 1: Install PostgreSQL Locally
    echo ========================================
    echo Download from: https://www.postgresql.org/download/windows/
    echo.
    echo Installation steps:
    echo 1. Download PostgreSQL 16 or 15
    echo 2. Run the installer
    echo 3. Set a password (REMEMBER THIS!)
    echo 4. Install to default location
    echo 5. Finish installation
    echo 6. Come back and run: setup-db-fixed.bat
    echo.
    echo ========================================
    echo OPTION 2: Use Cloud Database (EASIER!)
    echo ========================================
    echo.
    echo A. Supabase (Recommended - Free Forever):
    echo    - Go to https://supabase.com
    echo    - Create account
    echo    - Create new project
    echo    - Get connection string from:
    echo      Settings ^> Database ^> Connection String
    echo    - Update .env.local with connection string
    echo    - Run: npx prisma db push
    echo    - Run: npm run seed
    echo    - Run: npm run dev
    echo.
    echo B. Neon (Also Free):
    echo    - Go to https://neon.tech
    echo    - Create account  
    echo    - Create project
    echo    - Copy connection string
    echo    - Update .env.local
    echo    - Run: npx prisma db push
    echo    - Run: npm run seed
    echo    - Run: npm run dev
    echo.
    echo ========================================
    echo RECOMMENDATION:
    echo ========================================
    echo.
    echo For fastest setup: Use Supabase (cloud)
    echo - No local installation needed
    echo - Works in 5 minutes
    echo - Free forever
    echo - Access from anywhere
    echo.
    echo For full control: Install PostgreSQL locally
    echo - Complete control
    echo - No internet needed
    echo - Industry standard
    echo.
)

echo.
pause
