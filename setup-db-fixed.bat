@echo off
setlocal enabledelayedexpansion

echo ========================================
echo Finding PostgreSQL...
echo ========================================
echo.

REM Try common locations
set "PSQL_PATH="

if exist "C:\Program Files\PostgreSQL\16\bin\psql.exe" set "PSQL_PATH=C:\Program Files\PostgreSQL\16\bin"
if exist "C:\Program Files\PostgreSQL\15\bin\psql.exe" set "PSQL_PATH=C:\Program Files\PostgreSQL\15\bin"
if exist "C:\Program Files\PostgreSQL\14\bin\psql.exe" set "PSQL_PATH=C:\Program Files\PostgreSQL\14\bin"
if exist "C:\Program Files (x86)\PostgreSQL\16\bin\psql.exe" set "PSQL_PATH=C:\Program Files (x86)\PostgreSQL\16\bin"
if exist "C:\Program Files (x86)\PostgreSQL\15\bin\psql.exe" set "PSQL_PATH=C:\Program Files (x86)\PostgreSQL\15\bin"

if "%PSQL_PATH%"=="" (
    echo ERROR: PostgreSQL not found!
    echo.
    echo Please check if PostgreSQL is installed in:
    echo - C:\Program Files\PostgreSQL\
    echo.
    pause
    exit /b 1
)

echo Found PostgreSQL at: %PSQL_PATH%
echo.

REM Add to PATH for this session
set "PATH=%PSQL_PATH%;%PATH%"

echo ========================================
echo PostgreSQL Database Setup
echo ========================================
echo.

echo Step 1: Testing PostgreSQL connection...
"%PSQL_PATH%\psql.exe" -U postgres -d postgres -c "SELECT version();" >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Cannot connect to PostgreSQL
    echo.
    echo This usually means:
    echo 1. PostgreSQL service is not running, OR
    echo 2. Wrong password
    echo.
    echo Let me check if the service is running...
    sc query postgresql-x64-16 | find "RUNNING" >nul 2>nul
    if %ERRORLEVEL% NEQ 0 (
        sc query postgresql-x64-15 | find "RUNNING" >nul 2>nul
        if %ERRORLEVEL% NEQ 0 (
            echo.
            echo ❌ PostgreSQL service is NOT running!
            echo.
            echo TO FIX:
            echo 1. Press Win + R
            echo 2. Type: services.msc
            echo 3. Find "postgresql-x64-15" or "postgresql-x64-16"
            echo 4. Right-click and select "Start"
            echo 5. Then run this script again
            echo.
            pause
            exit /b 1
        )
    )
    echo.
    echo Service is running, but connection failed.
    echo This is likely a password issue.
    echo.
    echo When prompted, enter your PostgreSQL password.
    echo (The password you set when you installed PostgreSQL)
    echo.
    pause
    exit /b 1
)
echo ✓ PostgreSQL is running and accessible
echo.

echo Step 2: Creating database...
"%PSQL_PATH%\psql.exe" -U postgres -c "CREATE DATABASE \"Buckalew\";" >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ Database 'Buckalew' created
) else (
    echo ! Database 'Buckalew' already exists (this is OK)
)
echo.

echo Step 3: Installing npm packages...
call npm install bcryptjs >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install packages
    echo Make sure you have npm installed
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
    echo.
    echo This might be a DATABASE_URL issue in .env.local
    echo Make sure it has your correct PostgreSQL password
    echo.
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
echo ✓ Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. npm run dev
echo 2. Go to http://localhost:3000/login
echo 3. Login with credentials shown above
echo.
pause
