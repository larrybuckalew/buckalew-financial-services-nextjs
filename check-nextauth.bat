@echo off
echo ========================================
echo Checking NextAuth Installation
echo ========================================
echo.

echo Checking if next-auth is installed...
npm list next-auth

echo.
echo Checking if next-auth/react is available...
node -e "try { require('next-auth/react'); console.log('✓ next-auth/react is available'); } catch(e) { console.log('✗ next-auth/react is NOT available'); }"

echo.
echo ========================================
echo If next-auth is not installed:
echo ========================================
echo Run: npm install next-auth
echo.
pause
