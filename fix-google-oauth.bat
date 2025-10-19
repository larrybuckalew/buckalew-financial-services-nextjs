@echo off
echo ========================================
echo Google OAuth Login Fix
echo ========================================
echo.

echo Step 1: Clearing Next.js cache...
rmdir /s /q .next 2>nul
rmdir /s /q node_modules\.cache 2>nul
echo Cache cleared!
echo.

echo Step 2: Generating Prisma Client...
call npx prisma generate
echo.

echo Step 3: Pushing database schema...
call npx prisma db push
echo.

echo ========================================
echo IMPORTANT: Next Steps
echo ========================================
echo 1. Open a NEW command prompt/terminal
echo 2. Navigate to this directory
echo 3. Run: npm run dev
echo 4. Open browser in INCOGNITO/PRIVATE mode
echo 5. Go to: http://localhost:3000/login
echo 6. You should see the "Sign in with Google" button!
echo.
echo If it still doesn't work, press Ctrl+Shift+R to hard refresh
echo ========================================
pause
