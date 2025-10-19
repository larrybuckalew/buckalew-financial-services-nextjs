# ✅ PostgreSQL is Installed - Here's How to Fix It

## The Problem
PostgreSQL is installed on your computer, but Windows can't find it because it's not in the system PATH.

## 🚀 QUICK FIX (Use This Script)

I created a special script that finds PostgreSQL automatically and sets it up.

### Run This:
```bash
setup-db-fixed.bat
```

This script:
- ✅ Automatically finds your PostgreSQL installation
- ✅ Sets it up temporarily so it works
- ✅ Creates your database
- ✅ Sets up everything you need

**Just double-click `setup-db-fixed.bat` in your project folder!**

---

## 🔧 Alternative: Fix PATH Permanently

If you want to fix this permanently so all scripts work:

### Step 1: Find PostgreSQL Location
Run this to find where PostgreSQL is:
```bash
find-postgresql.bat
```

It will show you the path, something like:
```
C:\Program Files\PostgreSQL\15\bin
```

### Step 2: Add to System PATH

1. **Press `Win + R`**
2. **Type: `sysdm.cpl`** and press Enter
3. **Click "Advanced" tab**
4. **Click "Environment Variables" button**
5. **Under "System variables"** find **"Path"**
6. **Click "Edit"**
7. **Click "New"**
8. **Paste the path** from Step 1 (e.g., `C:\Program Files\PostgreSQL\15\bin`)
9. **Click OK** on everything
10. **RESTART Command Prompt** (close and reopen)
11. **Test it:**
    ```bash
    psql --version
    ```
    Should show PostgreSQL version!

### Step 3: Run Normal Setup
Now the original script will work:
```bash
setup-database.bat
```

---

## 🎯 After Setup Works

Once the database is set up (using either method), you need to:

### 1. Make Sure Your Password is Correct

Open `.env.local` and update this line with YOUR PostgreSQL password:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/Buckalew?schema=public
```

Example: If your password is `MyPass123`:
```env
DATABASE_URL=postgresql://postgres:MyPass123@localhost:5432/Buckalew?schema=public
```

### 2. Start Your Website
```bash
npm run dev
```

### 3. Login
- Go to: http://localhost:3000/login
- Email: `larry@buckalewfinancialservices.com`
- Password: `Larry123!@#`
- Then go to: http://localhost:3000/admin

---

## 🆘 If You Get Errors

### Error: "Cannot connect to PostgreSQL"

**Check if service is running:**
1. Press `Win + R`
2. Type `services.msc`
3. Find "postgresql-x64-15" (or 16)
4. Status should be "Running"
5. If not, right-click → Start

### Error: "Password authentication failed"

**Your .env.local password is wrong:**
1. Open `.env.local`
2. Find DATABASE_URL line
3. Put your correct postgres password
4. Save file
5. Run setup again

### Error: "Database does not exist"

**Run the setup script again:**
```bash
setup-db-fixed.bat
```

---

## ✅ You Should See This When It Works:

```
========================================
Finding PostgreSQL...
========================================

Found PostgreSQL at: C:\Program Files\PostgreSQL\15\bin

========================================
PostgreSQL Database Setup
========================================

Step 1: Testing PostgreSQL connection...
✓ PostgreSQL is running and accessible

Step 2: Creating database...
✓ Database 'Buckalew' created

Step 3: Installing npm packages...
✓ Packages installed

Step 4: Generating Prisma Client...
✓ Prisma Client generated

Step 5: Creating database tables...
✓ Database tables created

Step 6: Seeding database with admin user...
✓ Database seeded successfully!

Login Credentials:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Larry's Account:
  Email: larry@buckalewfinancialservices.com
  Password: Larry123!@#
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

========================================
✓ Setup Complete!
========================================
```

---

## 📋 Summary

**The Easy Way:**
1. Run `setup-db-fixed.bat` (finds PostgreSQL automatically)
2. Update password in `.env.local`
3. Run `npm run dev`
4. Login at /login

**The Permanent Fix Way:**
1. Run `find-postgresql.bat` to see where it is
2. Add that path to Windows System PATH
3. Restart Command Prompt
4. Run `setup-database.bat`
5. Update password in `.env.local`
6. Run `npm run dev`
7. Login at /login

**Either way works!** The first way is faster, the second way is more permanent.
