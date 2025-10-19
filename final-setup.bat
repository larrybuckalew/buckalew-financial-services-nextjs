@echo off
echo ========================================
echo Final Database Setup
echo ========================================
echo.

echo Both .env and .env.local are now updated!
echo.

echo Step 1: Generating Prisma Client...
call npx prisma generate
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Generate failed
    pause
    exit /b 1
)
echo ✓ Prisma Client generated
echo.

echo Step 2: Pushing database schema...
call npx prisma db push
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Database push failed
    pause
    exit /b 1
)
echo ✓ Database schema pushed
echo.

echo Step 3: Seeding database...
call node prisma\seed.js
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Seed may have had issues
    echo You can run it manually later: npm run seed
)
echo.

echo ========================================
echo ✓ SETUP COMPLETE!
echo ========================================
echo.
echo Your website is ready!
echo.
echo Start it with: npm run dev
echo.
echo Then login at: http://localhost:3000/login
echo   Email: larry@buckalewfinancialservices.com
echo   Password: Larry123!@#
echo.
echo Admin dashboard: http://localhost:3000/admin
echo.
pause
