@echo off
echo ========================================
echo PostgreSQL Detection and Fix
echo ========================================
echo.

echo Searching for PostgreSQL installation...
echo.

REM Common PostgreSQL installation paths
set PATHS[0]=C:\Program Files\PostgreSQL\16\bin
set PATHS[1]=C:\Program Files\PostgreSQL\15\bin
set PATHS[2]=C:\Program Files\PostgreSQL\14\bin
set PATHS[3]=C:\Program Files\PostgreSQL\13\bin
set PATHS[4]=C:\Program Files (x86)\PostgreSQL\16\bin
set PATHS[5]=C:\Program Files (x86)\PostgreSQL\15\bin
set PATHS[6]=C:\Program Files (x86)\PostgreSQL\14\bin

set FOUND=0
set PG_PATH=

for /L %%i in (0,1,6) do (
    if exist "!PATHS[%%i]!\psql.exe" (
        set PG_PATH=!PATHS[%%i]!
        set FOUND=1
        goto :found
    )
)

REM Try to find it in Program Files
echo Scanning Program Files...
for /d %%D in ("C:\Program Files\PostgreSQL\*") do (
    if exist "%%D\bin\psql.exe" (
        set PG_PATH=%%D\bin
        set FOUND=1
        goto :found
    )
)

for /d %%D in ("C:\Program Files (x86)\PostgreSQL\*") do (
    if exist "%%D\bin\psql.exe" (
        set PG_PATH=%%D\bin
        set FOUND=1
        goto :found
    )
)

:found
if %FOUND%==0 (
    echo.
    echo ❌ PostgreSQL NOT found in common locations
    echo.
    echo Please locate your PostgreSQL installation manually:
    echo 1. Open File Explorer
    echo 2. Look in C:\Program Files\PostgreSQL\
    echo 3. Find the bin folder
    echo 4. Note the full path
    echo.
    pause
    exit /b 1
)

echo.
echo ✓ PostgreSQL FOUND at: %PG_PATH%
echo.

REM Test if it works
"%PG_PATH%\psql.exe" --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✓ PostgreSQL is working!
    "%PG_PATH%\psql.exe" --version
    echo.
) else (
    echo ❌ PostgreSQL found but not working
    pause
    exit /b 1
)

REM Check if it's in PATH
echo %PATH% | find /I "%PG_PATH%" >nul
if %ERRORLEVEL% EQU 0 (
    echo ✓ PostgreSQL is already in your PATH
    echo.
    echo Your system is configured correctly.
    echo The setup-database.bat script should work now.
    echo.
    pause
    exit /b 0
)

echo.
echo ⚠️  PostgreSQL is NOT in your PATH
echo.
echo OPTION 1 - Quick Fix (Current Session Only):
echo ==========================================
echo Run this command in your Command Prompt:
echo.
echo set PATH=%PG_PATH%;%%PATH%%
echo.
echo Then run: setup-database.bat
echo.
echo.
echo OPTION 2 - Permanent Fix (Recommended):
echo ==========================================
echo 1. Press Win + R
echo 2. Type: sysdm.cpl
echo 3. Click "Advanced" tab
echo 4. Click "Environment Variables"
echo 5. Under "System variables" find "Path"
echo 6. Click "Edit"
echo 7. Click "New"
echo 8. Add this path: %PG_PATH%
echo 9. Click OK on everything
echo 10. RESTART Command Prompt
echo 11. Run setup-database.bat
echo.
echo.
echo OPTION 3 - Use This Script Instead:
echo ==========================================
echo I can create a modified setup script that works
echo without changing PATH.
echo.

set /p CHOICE="Would you like me to create a modified setup script? (Y/N): "
if /I "%CHOICE%"=="Y" (
    echo.
    echo Creating postgresql-setup-fixed.bat...
    
    (
        echo @echo off
        echo set PG_PATH=%PG_PATH%
        echo set PATH=%%PG_PATH%%;%%PATH%%
        echo.
        echo echo ========================================
        echo echo PostgreSQL Database Setup
        echo echo ========================================
        echo echo.
        echo echo PostgreSQL found at: %%PG_PATH%%
        echo echo.
        echo echo Step 1: Testing PostgreSQL connection...
        echo psql -U postgres -d postgres -c "SELECT version();" ^>nul 2^>nul
        echo if %%ERRORLEVEL%% NEQ 0 ^(
        echo     echo ERROR: Cannot connect to PostgreSQL
        echo     echo Make sure PostgreSQL service is running
        echo     pause
        echo     exit /b 1
        echo ^)
        echo echo ✓ PostgreSQL is running
        echo.
        echo echo Step 2: Creating database...
        echo psql -U postgres -c "CREATE DATABASE \"Buckalew\";" ^>nul 2^>nul
        echo if %%ERRORLEVEL%% EQU 0 ^(
        echo     echo ✓ Database 'Buckalew' created
        echo ^) else ^(
        echo     echo ! Database 'Buckalew' already exists ^(this is OK^)
        echo ^)
        echo.
        echo echo Step 3: Installing npm packages...
        echo call npm install bcryptjs
        echo echo ✓ Packages installed
        echo.
        echo echo Step 4: Generating Prisma Client...
        echo call npx prisma generate
        echo echo ✓ Prisma Client generated
        echo.
        echo echo Step 5: Creating database tables...
        echo call npx prisma db push
        echo echo ✓ Database tables created
        echo.
        echo echo Step 6: Seeding database with admin user...
        echo call node prisma\seed.js
        echo.
        echo echo ========================================
        echo echo ✓ Database Setup Complete!
        echo echo ========================================
        echo pause
    ) > postgresql-setup-fixed.bat
    
    echo.
    echo ✓ Created: postgresql-setup-fixed.bat
    echo.
    echo Now run: postgresql-setup-fixed.bat
    echo.
)

pause
