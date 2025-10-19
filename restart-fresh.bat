@echo off
echo ========================================
echo Complete Setup and Restart
echo ========================================
echo.

echo Step 1: Checking environment variables...
findstr "GOOGLE_CLIENT_ID" .env.local | findstr "794502958837" >nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ Google Client ID is set
) else (
    echo ✗ Google Client ID NOT found
)

findstr "GOOGLE_CLIENT_SECRET" .env.local | findstr "GOCSPX" >nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ Google Client Secret is set
) else (
    echo ✗ Google Client Secret NOT found
)
echo.

echo Step 2: Checking NextAuth installation...
npm list next-auth | findstr "next-auth@" >nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ NextAuth is installed
) else (
    echo ✗ NextAuth NOT installed
    echo Installing next-auth...
    npm install next-auth
)
echo.

echo Step 3: Building fresh...
echo This may take a minute...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ✗ Build failed!
    echo Check the errors above.
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✓ Build complete!
echo ========================================
echo.
echo Now starting development server...
echo.
echo After it starts:
echo 1. Go to: http://localhost:3000/login
echo 2. You should see "Sign in with Google" button
echo 3. Below that is email/password login
echo.
echo Press Ctrl+C to stop the server when done
echo.
pause

npm run dev
