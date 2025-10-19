@echo off
echo ========================================
echo Force Restart PostgreSQL Service
echo ========================================
echo.

echo Stopping PostgreSQL 17...
net stop postgresql-x64-17

echo.
echo Waiting 5 seconds...
timeout /t 5 /nobreak

echo.
echo Starting PostgreSQL 17...
net start postgresql-x64-17

echo.
echo Waiting 3 seconds for service to fully start...
timeout /t 3 /nobreak

echo.
echo Testing connection with new password...
echo.

set PGPASSWORD=Buckalew2025
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -d Buckalew -c "SELECT 'Connection successful!' AS status;"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✓ PostgreSQL is working correctly!
    echo ========================================
    echo.
    echo Now run: setup-postgres17.bat
    echo.
) else (
    echo.
    echo ========================================
    echo ❌ Still having connection issues
    echo ========================================
    echo.
    echo Try these steps:
    echo 1. Manually restart service in services.msc
    echo 2. Wait 10 seconds
    echo 3. Run this script again
    echo.
)

pause
