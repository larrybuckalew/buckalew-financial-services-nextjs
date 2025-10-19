# 🚀 ADMIN DASHBOARD ACCESS - COMPLETE GUIDE

## ✅ What You Need to Do (Step-by-Step)

### STEP 1: Check PostgreSQL is Installed

**Option A: Check if PostgreSQL is installed**
1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Look for "postgresql-x64-15" or "postgresql-x64-16"

**If NOT installed:**
- Download from: https://www.postgresql.org/download/windows/
- During installation, remember the password you set for `postgres` user
- Default port: 5432

### STEP 2: Update Your Password in .env.local

Open `.env.local` and update this line with YOUR postgres password:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD_HERE@localhost:5432/Buckalew?schema=public
```

**Example:**
If your postgres password is `MyPass123`, then:
```env
DATABASE_URL=postgresql://postgres:MyPass123@localhost:5432/Buckalew?schema=public
```

### STEP 3: Run the Automated Setup

**Open Command Prompt in your project folder:**
```bash
cd "C:\Users\larry\BFS Website\fresh-clone\buckalew-financial-services-nextjs"
```

**Run the setup script:**
```bash
setup-database.bat
```

This will:
- ✅ Create the Buckalew database
- ✅ Install required packages
- ✅ Generate Prisma Client
- ✅ Create all database tables
- ✅ Create admin user accounts

### STEP 4: Verify Setup Worked

**Open Prisma Studio to view your database:**
```bash
npm run db:studio
```

This opens http://localhost:5555 where you can see:
- User table (should have 2 users: admin and larry)
- Role table (should have 3 roles: admin, user, agent)
- Other tables

### STEP 5: Start Your Website

```bash
npm run dev
```

### STEP 6: Login to Admin Dashboard

1. Go to: http://localhost:3000/login
2. Use these credentials:

**Admin Account:**
- Email: `admin@buckalewfinancialservices.com`
- Password: `Admin123!@#`

**Larry's Account:**
- Email: `larry@buckalewfinancialservices.com`
- Password: `Larry123!@#`

3. After login, go to: http://localhost:3000/admin

---

## 🔧 If Something Goes Wrong

### Problem: "Cannot connect to database"

**Solution 1: Check PostgreSQL is running**
```bash
# Open Services
Win + R → services.msc

# Find: postgresql-x64-15
# Status should be: Running
# If not, right-click → Start
```

**Solution 2: Check password in .env.local**
- Make sure DATABASE_URL has correct password
- No spaces, no special characters that need escaping

**Solution 3: Test connection manually**
```bash
psql -U postgres
# Enter your password
# If this works, PostgreSQL is fine
```

### Problem: "Database does not exist"

**Solution:**
```bash
# Create database manually
createdb -U postgres Buckalew

# Or use psql
psql -U postgres
CREATE DATABASE "Buckalew";
\q
```

### Problem: "Tables don't exist"

**Solution:**
```bash
npx prisma db push
```

### Problem: "Prisma Client not found"

**Solution:**
```bash
npx prisma generate
```

### Problem: "Can't login to admin"

**Solution:**
```bash
# Re-run seed script
npm run seed
```

### Problem: "Still can't access /admin"

**Check middleware.js:**
- Make sure `/admin` is in protectedRoutes
- Make sure you're logged in first

**Check your role:**
- Open Prisma Studio: `npm run db:studio`
- Check User table → your user should have roleId pointing to admin role

---

## 📋 Quick Command Reference

```bash
# Setup everything at once
setup-database.bat

# Or manually:
npx prisma generate          # Generate Prisma Client
npx prisma db push           # Create tables
npm run seed                 # Create admin user

# View database
npm run db:studio            # Opens http://localhost:5555

# Reset everything
npx prisma migrate reset     # Deletes all data!
npm run seed                 # Recreate admin user

# Start website
npm run dev                  # Opens http://localhost:3000
```

---

## 🎯 Complete Fresh Setup (Start from Scratch)

If nothing works, do a complete reset:

```bash
# 1. Stop dev server (Ctrl+C)

# 2. Delete database
dropdb -U postgres Buckalew

# 3. Delete Prisma files
rmdir /s node_modules\.prisma

# 4. Run setup
setup-database.bat

# 5. Start server
npm run dev
```

---

## ✅ Checklist - Is Everything Working?

Use this to verify your setup:

- [ ] PostgreSQL service is running (check Services)
- [ ] Can connect: `psql -U postgres -d Buckalew -c "SELECT 1;"`
- [ ] .env.local has correct DATABASE_URL with password
- [ ] Database "Buckalew" exists
- [ ] Tables exist (check in Prisma Studio)
- [ ] Admin user exists in User table
- [ ] Admin role exists in Role table
- [ ] Can login at /login
- [ ] After login, can access /admin
- [ ] Can see dashboard data

---

## 🆘 Still Need Help?

### Check Logs

**PostgreSQL Logs:**
```
C:\Program Files\PostgreSQL\15\data\log\
```

**Application Logs:**
- Look in your terminal where `npm run dev` is running
- Check for database connection errors

### Test Database Connection

```bash
# Test if PostgreSQL is responding
psql -U postgres -c "SELECT NOW();"

# Test if Buckalew database works
psql -U postgres -d Buckalew -c "SELECT COUNT(*) FROM \"User\";"
```

### Verify Environment Variables

```bash
# In project folder
type .env.local | findstr DATABASE_URL
```

Should show your connection string with password.

---

## 🔐 Security Notes

**IMPORTANT:** After first login:
1. Change the default passwords immediately
2. Don't commit .env.local to git
3. Use strong passwords for production

**Change Password After Login:**
1. Login to admin dashboard
2. Go to Profile/Settings
3. Change password
4. Update .env.local if you changed postgres password

---

## 📊 Database Schema Overview

Your database has these tables:

- **User** - User accounts (admin, agents, clients)
- **Role** - User roles and permissions
- **Session** - User sessions
- **Account** - OAuth accounts
- **Quote** - Insurance quote requests
- **BlogPost** - Blog articles
- **Appointment** - Scheduled appointments
- **AuditLog** - Activity tracking
- **SystemSettings** - Application configuration

---

## 🎉 Success Indicators

You'll know everything is working when:

1. ✅ No errors when running `npm run dev`
2. ✅ Can login at http://localhost:3000/login
3. ✅ Can access http://localhost:3000/admin
4. ✅ Can see users/quotes/data in admin panel
5. ✅ Prisma Studio shows all tables with data

---

**Last Updated:** October 2, 2025

**Need more help?** Run `troubleshoot-database.bat` to diagnose issues!
