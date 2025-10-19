@echo off
echo ========================================
echo Restarting with NEW Google OAuth Credentials
echo ========================================
echo.

echo Step 1: Stopping all Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo Step 2: Clearing build cache...
if exist ".next" (
    rmdir /s /q ".next"
    echo ✓ Cache cleared
)

echo.
echo ========================================
echo Starting fresh server with NEW credentials...
echo ========================================
echo.
echo ✓ Client ID: 794502958837-n2ctn6gv5n1oafphucn7piulmh6fkr46
echo ✓ Client Secret: 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
echo.
echo Server will start in a moment...
echo After it starts, go to: http://localhost:3000/google-test
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev
