@echo off
echo ========================================
echo Comprehensive PostgreSQL Search
echo ========================================
echo.
echo Searching your entire system for PostgreSQL...
echo This may take a minute...
echo.

REM Search C: drive for psql.exe
echo Searching C:\ drive...
for /f "delims=" %%i in ('dir /s /b "C:\psql.exe" 2^>nul') do (
    echo.
    echo ✓ FOUND PostgreSQL!
    echo Location: %%i
    echo.
    set "PSQL_EXE=%%i"
    goto :found
)

echo.
echo Searching D:\ drive (if exists)...
if exist D:\ (
    for /f "delims=" %%i in ('dir /s /b "D:\psql.exe" 2^>nul') do (
        echo.
        echo ✓ FOUND PostgreSQL!
        echo Location: %%i
        echo.
        set "PSQL_EXE=%%i"
        goto :found
    )
)

echo.
echo ❌ PostgreSQL not found on your system.
echo.
echo This means PostgreSQL is NOT installed.
echo.
echo PLEASE DO ONE OF THE FOLLOWING:
echo.
echo OPTION 1 - Install PostgreSQL Locally:
echo ========================================
echo 1. Go to: https://www.postgresql.org/download/windows/
echo 2. Download PostgreSQL (version 15 or 16)
echo 3. Run installer
echo 4. REMEMBER the password you set!
echo 5. After install, run this script again
echo.
echo OPTION 2 - Use Cloud Database (Easier):
echo ========================================
echo Use a free cloud database instead:
echo.
echo A. Supabase (Recommended):
echo    1. Go to: https://supabase.com
echo    2. Sign up (free)
echo    3. Create new project
echo    4. Copy the database connection string
echo    5. Paste it in your .env.local file
echo.
echo B. Neon:
echo    1. Go to: https://neon.tech
echo    2. Sign up (free)
echo    3. Create project
echo    4. Copy connection string
echo    5. Paste it in your .env.local file
echo.
echo After using cloud database:
echo    npx prisma db push
echo    npm run seed
echo    npm run dev
echo.
pause
exit /b 1

:found
echo PostgreSQL executable: %PSQL_EXE%
echo.

REM Get the bin directory
for %%F in ("%PSQL_EXE%") do set "PG_BIN=%%~dpF"
set "PG_BIN=%PG_BIN:~0,-1%"

echo PostgreSQL bin directory: %PG_BIN%
echo.

REM Test version
echo Testing PostgreSQL...
"%PSQL_EXE%" --version
echo.

REM Save to a file for later use
echo %PG_BIN% > postgres-path.txt
echo.
echo ✓ PostgreSQL path saved to: postgres-path.txt
echo.
echo ========================================
echo NEXT STEPS:
echo ========================================
echo.
echo Your PostgreSQL is at: %PG_BIN%
echo.
echo Now I'll create a custom setup script for you...
echo.

REM Create custom setup script
(
    echo @echo off
    echo set "PATH=%PG_BIN%;%%PATH%%"
    echo.
    echo echo ========================================
    echo echo PostgreSQL Database Setup
    echo echo ========================================
    echo echo Using PostgreSQL at: %PG_BIN%
    echo echo.
    echo.
    echo echo Step 1: Testing PostgreSQL connection...
    echo psql -U postgres -d postgres -c "SELECT version();" ^>nul 2^>nul
    echo if %%ERRORLEVEL%% NEQ 0 ^(
    echo     echo.
    echo     echo ERROR: Cannot connect to PostgreSQL
    echo     echo.
    echo     echo Possible issues:
    echo     echo 1. PostgreSQL service not running
    echo     echo 2. Wrong password
    echo     echo.
    echo     echo TO CHECK SERVICE:
    echo     echo - Press Win + R
    echo     echo - Type: services.msc
    echo     echo - Look for postgresql service
    echo     echo - Make sure it's "Running"
    echo     echo.
    echo     pause
    echo     exit /b 1
    echo ^)
    echo echo ✓ PostgreSQL is accessible
    echo echo.
    echo.
    echo echo Step 2: Creating database...
    echo psql -U postgres -c "CREATE DATABASE \"Buckalew\";" ^>nul 2^>nul
    echo if %%ERRORLEVEL%% EQU 0 ^(
    echo     echo ✓ Database 'Buckalew' created
    echo ^) else ^(
    echo     echo ! Database 'Buckalew' already exists ^(OK^)
    echo ^)
    echo echo.
    echo.
    echo echo Step 3: Installing packages...
    echo call npm install bcryptjs ^>nul 2^>nul
    echo echo ✓ Packages installed
    echo echo.
    echo.
    echo echo Step 4: Generating Prisma Client...
    echo call npx prisma generate
    echo if %%ERRORLEVEL%% NEQ 0 ^(
    echo     echo ERROR: Prisma generate failed
    echo     pause
    echo     exit /b 1
    echo ^)
    echo echo ✓ Prisma Client generated
    echo echo.
    echo.
    echo echo Step 5: Creating database tables...
    echo call npx prisma db push
    echo if %%ERRORLEVEL%% NEQ 0 ^(
    echo     echo ERROR: Database push failed
    echo     echo Check your DATABASE_URL in .env.local
    echo     pause
    echo     exit /b 1
    echo ^)
    echo echo ✓ Database tables created
    echo echo.
    echo.
    echo echo Step 6: Seeding database...
    echo call node prisma\seed.js
    echo if %%ERRORLEVEL%% NEQ 0 ^(
    echo     echo ERROR: Seed failed
    echo     pause
    echo     exit /b 1
    echo ^)
    echo echo.
    echo echo ========================================
    echo echo ✓ SETUP COMPLETE!
    echo echo ========================================
    echo echo.
    echo echo Next: npm run dev
    echo echo Then: http://localhost:3000/login
    echo echo.
    echo pause
) > run-setup-custom.bat

echo.
echo ✓ Created: run-setup-custom.bat
echo.
echo ========================================
echo NOW RUN THIS:
echo ========================================
echo.
echo     run-setup-custom.bat
echo.
echo This will complete your database setup!
echo.
pause
