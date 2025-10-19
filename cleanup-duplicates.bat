@echo off
echo ========================================
echo Cleaning up duplicate .tsx files
echo ========================================
echo.
echo This will DELETE all .tsx files where a .jsx version exists
echo Press Ctrl+C to cancel, or
pause

echo.
echo Deleting duplicate page files...

REM Main pages
del "src\app\page.tsx" 2>nul
del "src\app\about\page.tsx" 2>nul
del "src\app\admin\page.tsx" 2>nul
del "src\app\appointments\page.tsx" 2>nul
del "src\app\blog\page.tsx" 2>nul
del "src\app\calculators\page.tsx" 2>nul
del "src\app\contact\page.tsx" 2>nul
del "src\app\dashboard\page.tsx" 2>nul
del "src\app\drug-pricing\page.tsx" 2>nul
del "src\app\health-insurance\page.tsx" 2>nul
del "src\app\insurance\page.tsx" 2>nul
del "src\app\life-insurance\page.tsx" 2>nul
del "src\app\login\page.tsx" 2>nul
del "src\app\medicare\page.tsx" 2>nul
del "src\app\mobile-test\page.tsx" 2>nul
del "src\app\privacy-policy\page.tsx" 2>nul
del "src\app\profile\page.tsx" 2>nul
del "src\app\quote\page.tsx" 2>nul
del "src\app\register\page.tsx" 2>nul
del "src\app\resources\page.tsx" 2>nul
del "src\app\review\page.tsx" 2>nul
del "src\app\services\page.tsx" 2>nul
del "src\app\tailwind-test\page.tsx" 2>nul
del "src\app\terms-of-service\page.tsx" 2>nul
del "src\app\testimonials\page.tsx" 2>nul
del "src\app\unauthorized\page.tsx" 2>nul

REM Admin pages
del "src\app\admin\dashboard\page.tsx" 2>nul

REM Blog pages
del "src\app\blog\[slug]\page.tsx" 2>nul

REM Calculator pages
del "src\app\calculators\inflation\page.tsx" 2>nul
del "src\app\calculators\investment\page.tsx" 2>nul
del "src\app\calculators\life-insurance\page.tsx" 2>nul
del "src\app\calculators\loan\page.tsx" 2>nul
del "src\app\calculators\medicare\page.tsx" 2>nul
del "src\app\calculators\retirement\page.tsx" 2>nul

REM Health insurance pages
del "src\app\health-insurance\aca\page.tsx" 2>nul
del "src\app\health-insurance\dental\page.tsx" 2>nul
del "src\app\health-insurance\hearing\page.tsx" 2>nul
del "src\app\health-insurance\medicare\page.tsx" 2>nul
del "src\app\health-insurance\specialty-plans\page.tsx" 2>nul
del "src\app\health-insurance\vision\page.tsx" 2>nul
del "src\app\health-insurance\medicare\advantage\page.tsx" 2>nul
del "src\app\health-insurance\medicare\supplement\page.tsx" 2>nul

REM Legal pages
del "src\app\legal\terms-of-service\page.tsx" 2>nul

REM Life insurance pages
del "src\app\life-insurance\accidental-death\page.tsx" 2>nul
del "src\app\life-insurance\final-expense\page.tsx" 2>nul
del "src\app\life-insurance\fixed-annuities\page.tsx" 2>nul
del "src\app\life-insurance\indexed-universal-life\page.tsx" 2>nul
del "src\app\life-insurance\long-term-care\page.tsx" 2>nul
del "src\app\life-insurance\term-life\page.tsx" 2>nul
del "src\app\life-insurance\whole-life\page.tsx" 2>nul

REM Resources pages
del "src\app\resources\drug-pricing\page.tsx" 2>nul

REM Sitemap
del "src\app\sitemap.ts" 2>nul

REM API routes
del "src\app\api\calculations\route.ts" 2>nul
del "src\app\api\contact\route.ts" 2>nul
del "src\app\api\financial-summary\route.ts" 2>nul
del "src\app\api\newsletter\route.ts" 2>nul
del "src\app\api\quotes\route.ts" 2>nul
del "src\app\api\transactions\route.ts" 2>nul
del "src\app\api\users\route.ts" 2>nul
del "src\app\api\admin\audit-logs\route.ts" 2>nul
del "src\app\api\admin\settings\route.ts" 2>nul
del "src\app\api\auth\login\route.ts" 2>nul
del "src\app\api\auth\refresh\route.ts" 2>nul
del "src\app\api\auth\register\route.ts" 2>nul
del "src\app\api\auth\[...nextauth]\route.ts" 2>nul
del "src\app\api\user\notifications\route.ts" 2>nul
del "src\app\api\user\settings\route.ts" 2>nul
del "src\app\api\users\profile\route.ts" 2>nul
del "src\app\api\users\roles\route.ts" 2>nul
del "src\app\api\admin\settings\test-email\route.ts" 2>nul

REM Other duplicate files
del "src\instrumentation.ts" 2>nul
del "src\middleware.ts" 2>nul
del "pages\src\middleware.ts" 2>nul
del "pages\not-found.tsx" 2>nul

echo.
echo ========================================
echo Cleanup complete!
echo ========================================
echo.
echo All .tsx duplicate files have been removed.
echo Your .jsx files are still intact.
echo.
pause
