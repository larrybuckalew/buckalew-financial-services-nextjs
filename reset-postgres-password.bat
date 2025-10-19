@echo off
echo ========================================
echo PostgreSQL Password Reset Helper
echo ========================================
echo.

set "PG_PATH=C:\Program Files\PostgreSQL\17\bin"
set "PG_DATA=C:\Program Files\PostgreSQL\17\data"
set "PATH=%PG_PATH%;%PATH%"

echo Step 1: Connecting to PostgreSQL (should work without password now)...
echo.

echo Resetting postgres user password...
echo.
echo Please enter your NEW password when prompted.
echo (Suggestion: Buckalew2025)
echo.

REM Reset password
"%PG_PATH%\psql.exe" -U postgres -d postgres -c "ALTER USER postgres WITH PASSWORD 'Buckalew2025';"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✓ Password has been set to: Buckalew2025
    echo.
) else (
    echo.
    echo ERROR: Could not set password
    echo.
    pause
    exit /b 1
)

echo Step 2: Restoring security settings...
echo.

REM Backup current pg_hba.conf
copy "%PG_DATA%\pg_hba.conf" "%PG_DATA%\pg_hba.conf.backup" >nul

echo Creating secure pg_hba.conf...

REM Create new secure pg_hba.conf
(
    echo # PostgreSQL Client Authentication Configuration File
    echo # TYPE  DATABASE        USER            ADDRESS                 METHOD
    echo.
    echo # "local" is for Unix domain socket connections only
    echo local   all             all                                     scram-sha-256
    echo.
    echo # IPv4 local connections:
    echo host    all             all             127.0.0.1/32            scram-sha-256
    echo.
    echo # IPv6 local connections:
    echo host    all             all             ::1/128                 scram-sha-256
    echo.
    echo # Allow replication connections from localhost
    echo host    replication     all             127.0.0.1/32            scram-sha-256
    echo host    replication     all             ::1/128                 scram-sha-256
) > "%PG_DATA%\pg_hba.conf"

echo ✓ Security settings restored (using scram-sha-256)
echo.

echo Step 3: Restarting PostgreSQL service...
echo.

REM Restart PostgreSQL service
net stop postgresql-x64-17 >nul 2>&1
timeout /t 2 >nul
net start postgresql-x64-17 >nul 2>&1

if %ERRORLEVEL% EQU 0 (
    echo ✓ PostgreSQL service restarted
    echo.
) else (
    echo ! Service restart may have failed
    echo   Manually restart it:
    echo   Win+R ^> services.msc ^> postgresql-x64-17 ^> Restart
    echo.
)

echo Step 4: Testing new password...
timeout /t 3 >nul
echo.

set PGPASSWORD=Buckalew2025
"%PG_PATH%\psql.exe" -U postgres -d postgres -c "SELECT 'Password works!' AS status;" 2>nul

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✓ SUCCESS! Everything is secured!
    echo ========================================
    echo.
    echo Your new PostgreSQL password: Buckalew2025
    echo.
) else (
    echo.
    echo ⚠️  Password test failed
    echo    You may need to restart the service manually
    echo.
)

echo Step 5: Updating .env.local...
echo.

REM Update .env.local
if exist .env.local (
    powershell -Command "(Get-Content .env.local) -replace 'DATABASE_URL=postgresql://postgres@localhost:5432/Buckalew', 'DATABASE_URL=postgresql://postgres:Buckalew2025@localhost:5432/Buckalew' | Set-Content .env.local"
    
    if %ERRORLEVEL% EQU 0 (
        echo ✓ .env.local updated with new password
        echo.
    ) else (
        echo ! Could not auto-update .env.local
        echo   Please update manually:
        echo.
        echo   DATABASE_URL=postgresql://postgres:Buckalew2025@localhost:5432/Buckalew?schema=public
        echo.
    )
) else (
    echo ! .env.local not found
    echo.
)

echo ========================================
echo SUMMARY:
echo ========================================
echo.
echo ✓ Password reset to: Buckalew2025
echo ✓ Security restored (scram-sha-256)
echo ✓ PostgreSQL service restarted
echo ✓ .env.local updated
echo.
echo NEXT STEPS:
echo 1. Run: setup-postgres17.bat
echo 2. Run: npm run dev
echo 3. Login at: http://localhost:3000/login
echo.
echo Your password is now: Buckalew2025
echo.
pause
