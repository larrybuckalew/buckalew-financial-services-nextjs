@echo off
echo ========================================
echo Check User Passwords in Database
echo ========================================
echo.

set PGPASSWORD=Buckalew2025

echo Checking Larry's user account...
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -d Buckalew -c "SELECT email, name, substring(password, 1, 20) as password_start, substring(\"hashedPassword\", 1, 20) as hashed_start FROM \"User\" WHERE email = 'larry@buckalewfinancialservices.com';"

echo.
echo Checking admin account...
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -d Buckalew -c "SELECT email, name, substring(password, 1, 20) as password_start, substring(\"hashedPassword\", 1, 20) as hashed_start FROM \"User\" WHERE email = 'admin@buckalewfinancialservices.com';"

echo.
echo ========================================
echo Password Field Info:
echo ========================================
echo.
echo Both 'password' and 'hashedPassword' should start with $2
echo This means they're bcrypt hashed.
echo.
echo If they match, the seed worked correctly.
echo.
pause
