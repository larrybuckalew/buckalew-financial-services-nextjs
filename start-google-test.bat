@echo off
cls
echo ========================================
echo RESTARTING DEV SERVER FOR GOOGLE OAUTH
echo ========================================
echo.
echo Step 1: Clearing any old processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul
echo.
echo Step 2: Starting fresh dev server...
echo.
echo ========================================
echo OPEN YOUR BROWSER TO:
echo http://localhost:3000/google-test
echo ========================================
echo.
echo Use INCOGNITO/PRIVATE mode!
echo Press Ctrl+C to stop the server
echo.
npm run dev
