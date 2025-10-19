@echo off
echo ========================================
echo Test PostgreSQL Connection
echo ========================================
echo.

set PGPASSWORD=Buckalew2025

echo Testing connection to Buckalew database...
echo.

"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -d Buckalew -c "SELECT version();"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✓ Connection Works!
    echo ========================================
    echo.
    echo Your .env.local is correct.
    echo Password authentication is working.
    echo.
    echo Now run: setup-postgres17.bat
    echo.
) else (
    echo.
    echo ========================================
    echo ❌ Connection Failed
    echo ========================================
    echo.
    echo Possible issues:
    echo.
    echo 1. Service not fully restarted
    echo    Solution: Run restart-postgres.bat
    echo.
    echo 2. pg_hba.conf issue
    echo    Check: C:\Program Files\PostgreSQL\17\data\pg_hba.conf
    echo    Should have: scram-sha-256 (not trust or md5)
    echo.
    echo 3. Password hash not updated
    echo    Solution: Set pg_hba.conf to trust temporarily
    echo              Reset password again
    echo              Change back to scram-sha-256
    echo.
)

pause
