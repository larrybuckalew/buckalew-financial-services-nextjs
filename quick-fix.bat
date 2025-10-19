@echo off
echo ========================================
echo QUICK FIX - Cleaning Next.js Cache
echo ========================================
echo.

echo Step 1: Stopping all Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo Step 2: Removing .next folder...
if exist ".next" (
    rmdir /s /q ".next"
    echo ✓ .next folder deleted
) else (
    echo ✓ .next folder doesn't exist
)

echo Step 3: Clearing node_modules cache...
if exist "node_modules\.cache" (
    rmdir /s /q "node_modules\.cache"
    echo ✓ Cache cleared
) else (
    echo ✓ No cache to clear
)

echo.
echo ========================================
echo Starting fresh dev server...
echo ========================================
echo.
echo Server will start in a moment...
echo Press Ctrl+C to stop the server
echo.

npm run dev
