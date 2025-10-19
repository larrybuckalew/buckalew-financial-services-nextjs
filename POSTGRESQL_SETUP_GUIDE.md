# PostgreSQL Setup Guide for Buckalew Financial Services Website

## 🎯 Goal
Get PostgreSQL working so you can access the admin dashboard and backend of your website.

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- [ ] PostgreSQL installed on your computer
- [ ] pgAdmin 4 (comes with PostgreSQL)
- [ ] Node.js and npm installed
- [ ] Access to command line/terminal

## Step 1: Install PostgreSQL (If Not Installed)

### Download PostgreSQL:
1. Go to: https://www.postgresql.org/download/windows/
2. Download the installer (version 15 or 16)
3. Run the installer
4. **IMPORTANT:** Remember the password you set for the `postgres` user!

### Installation Settings:
- Port: `5432` (default)
- Locale: Default
- Components: PostgreSQL Server, pgAdmin 4, Command Line Tools

## Step 2: Verify PostgreSQL is Running

### Option A: Using Services (Windows)
1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Look for "postgresql-x64-15" or similar
4. **Status should be "Running"**
5. If not, right-click → Start

### Option B: Using Command Line
```bash
# Open Command Prompt as Administrator
pg_ctl status -D "C:\Program Files\PostgreSQL\15\data"
```

## Step 3: Create the Database

### Using pgAdmin 4 (Recommended for Beginners):

1. **Open pgAdmin 4**
   - Start Menu → pgAdmin 4

2. **Connect to Server**
   - Double-click "PostgreSQL 15" (or your version)
   - Enter your postgres password

3. **Create Database**
   - Right-click "Databases" → Create → Database
   - Name: `Buckalew`
   - Owner: `postgres`
   - Click "Save"

### Using Command Line (Advanced):

```bash
# Open Command Prompt
psql -U postgres

# Enter your postgres password when prompted

# Create database
CREATE DATABASE "Buckalew";

# Verify
\l

# Exit
\q
```

## Step 4: Update Environment Variables

Your `.env.local` file should have:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/Buckalew?schema=public
```

**Replace `YOUR_PASSWORD` with your actual postgres password!**

Example:
```env
DATABASE_URL=postgresql://postgres:MyPassword123@localhost:5432/Buckalew?schema=public
```

## Step 5: Run Prisma Migrations

Open your project folder in Command Prompt or Terminal:

```bash
cd "C:\Users\larry\BFS Website\fresh-clone\buckalew-financial-services-nextjs"
```

### Generate Prisma Client:
```bash
npx prisma generate
```

### Create Database Tables:
```bash
npx prisma migrate dev --name init
```

If you get errors, try:
```bash
npx prisma db push
```

## Step 6: Seed the Database with Admin User

Create a seed script to add your admin user:

```bash
# Run the seed script (we'll create this next)
npm run seed
```

## Step 7: Verify Database Setup

### Check Tables Were Created:

**Using pgAdmin:**
1. Expand Buckalew → Schemas → public → Tables
2. You should see: User, Role, Quote, BlogPost, etc.

**Using Command Line:**
```bash
psql -U postgres -d Buckalew
\dt
```

You should see a list of tables!

## Step 8: Create Admin User

We'll create a script to add your admin account. Run:

```bash
node prisma/seed.js
```

This will create:
- Admin role
- User role  
- Admin user (you can login with this)

## Step 9: Test Database Connection

```bash
npx prisma studio
```

This opens a database browser at http://localhost:5555
- Check if your tables exist
- Verify admin user was created

## Step 10: Start Your Application

```bash
npm run dev
```

Then try logging into the admin dashboard:
- Go to: http://localhost:3000/login
- Email: admin@buckalewfinancialservices.com
- Password: (the one from seed script)

## 🔧 Troubleshooting

### Error: "Can't reach database server"

**Problem:** PostgreSQL is not running

**Solution:**
1. Open Services (services.msc)
2. Find postgresql service
3. Right-click → Start
4. Set Startup Type to "Automatic"

### Error: "password authentication failed"

**Problem:** Wrong password in DATABASE_URL

**Solution:**
1. Check your postgres password
2. Update .env.local with correct password
3. Restart dev server

### Error: "database does not exist"

**Problem:** Buckalew database wasn't created

**Solution:**
```bash
createdb -U postgres Buckalew
```
Or use pgAdmin to create it manually

### Error: "Prisma Client not generated"

**Solution:**
```bash
npx prisma generate
```

### Error: "relation does not exist"

**Problem:** Tables not created

**Solution:**
```bash
npx prisma db push
```

### Can't login to admin dashboard

**Problem:** Admin user doesn't exist or wrong credentials

**Solution:**
1. Run seed script: `node prisma/seed.js`
2. Check user in Prisma Studio: `npx prisma studio`
3. Verify password is hashed correctly

## 📊 Verify Everything Works

### Checklist:
- [ ] PostgreSQL service is running
- [ ] Buckalew database exists
- [ ] Tables are created (visible in pgAdmin or Prisma Studio)
- [ ] Admin user exists in User table
- [ ] Admin role exists in Role table
- [ ] Can connect to database from app
- [ ] Can login to admin dashboard
- [ ] Can access /admin routes

## 🎯 Quick Commands Reference

```bash
# Check if PostgreSQL is running
pg_ctl status -D "C:\Program Files\PostgreSQL\15\data"

# Start PostgreSQL
pg_ctl start -D "C:\Program Files\PostgreSQL\15\data"

# Connect to database
psql -U postgres -d Buckalew

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Create migration
npx prisma migrate dev --name your_migration_name

# Open database browser
npx prisma studio

# Seed database
npm run seed

# Start dev server
npm run dev
```

## 🆘 Still Having Issues?

### Check Database Connection:
```bash
psql -U postgres -d Buckalew -c "SELECT NOW();"
```

If this works, your database is fine!

### Check Environment Variables:
```bash
# In your project folder
echo %DATABASE_URL%
```

Make sure it shows your correct connection string!

### Reset Everything:
```bash
# Drop and recreate database
dropdb -U postgres Buckalew
createdb -U postgres Buckalew

# Push schema again
npx prisma db push

# Seed again
npm run seed
```

## 📝 Next Steps After Setup

1. ✅ Test login with admin credentials
2. ✅ Access admin dashboard (/admin)
3. ✅ Create additional users if needed
4. ✅ Test quote submissions
5. ✅ Check database is saving data

---

**Need Help?** 
- Check PostgreSQL logs: `C:\Program Files\PostgreSQL\15\data\log\`
- Check application logs in terminal
- Use Prisma Studio to inspect database

**Last Updated:** October 2, 2025
