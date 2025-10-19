@echo off
echo ========================================
echo Restarting with UPDATED NextAuth Config
echo (Auto-linking Google accounts enabled)
echo ========================================
echo.

echo Stopping Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo Clearing cache...
if exist ".next" rmdir /s /q ".next"

echo.
echo Starting server...
echo After it starts, test at: http://localhost:3000/google-test
echo.

npm run dev
