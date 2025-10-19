@echo off
echo ========================================
echo Restarting with PROTECTED Dashboard
echo ========================================
echo.

echo Stopping Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo Clearing cache...
if exist ".next" rmdir /s /q ".next"

echo.
echo ✅ FIXED: Dashboard now checks authentication!
echo ✅ You'll see your real name from Google OAuth!
echo.
echo Starting server...
echo.

npm run dev
