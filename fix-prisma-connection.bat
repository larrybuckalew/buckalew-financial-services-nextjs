@echo off
echo ========================================
echo Direct Prisma Connection Test
echo ========================================
echo.

echo Current DATABASE_URL in .env.local:
findstr "DATABASE_URL" .env.local
echo.

echo Testing with psql (PostgreSQL CLI)...
set PGPASSWORD=Buckalew2025
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -d Buckalew -c "SELECT 'psql works!' as test;"
echo.

if %ERRORLEVEL% EQU 0 (
    echo ✓ Direct connection with psql WORKS
    echo.
    echo This means:
    echo - PostgreSQL is running
    echo - Password is correct
    echo - Database exists
    echo.
    echo But Prisma can't connect...
    echo.
    echo Let's try forcing Prisma to reload:
    echo.
    
    REM Delete Prisma cache
    if exist node_modules\.prisma (
        echo Removing Prisma cache...
        rmdir /s /q node_modules\.prisma
    )
    
    echo.
    echo Regenerating Prisma Client with fresh environment...
    call npx prisma generate
    
    echo.
    echo Now testing Prisma connection...
    call npx prisma db push --accept-data-loss
    
) else (
    echo ❌ Even psql can't connect!
    echo.
    echo This means the service isn't fully using the new password.
    echo.
    echo DO THIS:
    echo 1. Open Services (Win+R, type services.msc)
    echo 2. Find postgresql-x64-17
    echo 3. Right-click → Stop
    echo 4. Wait 10 seconds
    echo 5. Right-click → Start
    echo 6. Wait 10 seconds
    echo 7. Run this script again
    echo.
)

pause
