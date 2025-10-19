@echo off
echo ========================================
echo Clean Restart
echo ========================================
echo.

echo Stopping any running servers...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 >nul

echo.
echo Clearing Next.js cache...
if exist .next (
    rmdir /s /q .next
    echo ✓ Cleared .next folder
)

echo.
echo Starting fresh development server...
echo.
echo After it starts, go to: http://localhost:3000/login
echo You should see the Google login button!
echo.
timeout /t 3

npm run dev
