@echo off
echo ===================================
echo Troubleshooting BFS Next.js Site
echo ===================================
echo.

echo [1] Checking Node.js version...
node --version
echo.

echo [2] Checking npm version...
npm --version
echo.

echo [3] Checking if package.json exists...
if exist "package.json" (
    echo package.json found ✓
) else (
    echo package.json NOT FOUND ✗
    echo Please ensure you're in the correct directory.
    pause
    exit /b 1
)
echo.

echo [4] Checking if node_modules exists...
if exist "node_modules" (
    echo node_modules found ✓
    echo Checking Next.js installation...
    if exist "node_modules\next" (
        echo Next.js is installed ✓
    ) else (
        echo Next.js NOT installed ✗
        echo Run: npm install
    )
) else (
    echo node_modules NOT FOUND ✗
    echo Run: npm install
)
echo.

echo [5] Checking environment files...
if exist ".env.local" (
    echo .env.local found ✓
) else (
    echo .env.local NOT FOUND ✗
    echo You need to create this file!
)
echo.

echo [6] Checking Prisma setup...
if exist "prisma\schema.prisma" (
    echo Prisma schema found ✓
) else (
    echo Prisma schema NOT FOUND ✗
)
echo.

echo [7] Testing database connection...
npx prisma db pull 2>nul
if %errorlevel% equ 0 (
    echo Database connection successful ✓
) else (
    echo Database connection FAILED ✗
    echo Check your DATABASE_URL in .env.local
    echo Make sure PostgreSQL is running
)
echo.

echo [8] Checking for common issues...

REM Check if middleware.ts is in correct location
if exist "src\middleware.ts" (
    echo middleware.ts is in correct location (src/) ✓
) else if exist "src\app\middleware.ts" (
    echo ERROR: middleware.ts is in wrong location (src/app/)
    echo Moving it to src/...
    move "src\app\middleware.ts" "src\middleware.ts"
)
echo.

echo [9] Checking for build errors...
echo Running Next.js build check (this may take a moment)...
npx next build --no-lint 2>&1 | findstr /i "error"
if %errorlevel% equ 0 (
    echo Build errors detected. See output above.
) else (
    echo No obvious build errors detected ✓
)
echo.

echo ===================================
echo Troubleshooting complete!
echo ===================================
echo.
echo If everything shows ✓, try running: npm run dev
echo If you see ✗ marks, fix those issues first.
echo.
pause
