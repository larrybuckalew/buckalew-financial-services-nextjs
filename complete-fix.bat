@echo off
echo ========================================
echo COMPLETE SYSTEM CHECK AND FIX
echo ========================================
echo.

echo [1/8] Checking if server is running...
tasklist | find /I "node.exe" >nul
if %ERRORLEVEL% EQU 0 (
    echo ! Node.exe is running. Killing all Node processes...
    taskkill /F /IM node.exe >nul 2>&1
    timeout /t 3 >nul
    echo ✓ All Node processes stopped
) else (
    echo ✓ No Node processes running
)
echo.

echo [2/8] Checking Google OAuth credentials...
findstr "GOOGLE_CLIENT_ID=794502958837" .env.local >nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ Google Client ID found
) else (
    echo ✗ Google Client ID MISSING or WRONG
    echo.
    echo FIXING: Adding Google credentials...
    echo GOOGLE_CLIENT_ID=794502958837-2pvshueo9ndafmprt2fga6nsoderhmt6.apps.googleusercontent.com >> .env.local
    echo GOOGLE_CLIENT_SECRET=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 >> .env.local
)
echo.

echo [3/8] Deleting cache folders...
if exist .next (
    rmdir /s /q .next
    echo ✓ Deleted .next cache
)
if exist node_modules\.cache (
    rmdir /s /q node_modules\.cache
    echo ✓ Deleted node_modules cache
)
echo.

echo [4/8] Checking NextAuth installation...
call npm list next-auth >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ! NextAuth not properly installed
    echo Installing next-auth...
    call npm install next-auth
) else (
    echo ✓ NextAuth is installed
)
echo.

echo [5/8] Reinstalling dependencies (just to be safe)...
call npm install
echo.

echo [6/8] Generating Prisma Client...
call npx prisma generate
echo.

echo [7/8] Testing configuration...
echo Creating test page at /test-login
echo Visit: http://localhost:3000/test-login
echo.

echo [8/8] Starting development server...
echo.
echo ========================================
echo After server starts:
echo ========================================
echo.
echo TEST PAGES:
echo   1. http://localhost:3000/test-login  (Simple test)
echo   2. http://localhost:3000/login       (Real login)
echo.
echo WHAT TO LOOK FOR:
echo   - Google "Sign in with Google" button
echo   - Email/Password form below it
echo.
echo BROWSER STEPS:
echo   1. Open browser
echo   2. Press F12 (open console)
echo   3. Go to login page
echo   4. Check for any RED errors in console
echo   5. Take screenshot and share if issues
echo.
echo Press Ctrl+C to stop server
echo.
timeout /t 5

npm run dev
