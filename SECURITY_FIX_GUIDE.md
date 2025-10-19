# 🔐 PostgreSQL Security Fix - Complete Guide

## The Situation
You changed `pg_hba.conf` from `scram-sha-256` or `md5` to `trust` to reset the password.
Now we need to:
1. Set the new password (Buckalew2025)
2. Change back to secure authentication
3. Update your .env.local

---

## 🚀 OPTION 1: Automated Fix (Easiest)

Run this script:
```bash
reset-postgres-password.bat
```

This will:
- ✓ Set password to `Buckalew2025`
- ✓ Restore secure settings
- ✓ Restart PostgreSQL
- ✓ Update .env.local
- ✓ Test the connection

**Then skip to the "After Setup" section below.**

---

## 🛠️ OPTION 2: Manual Fix (If Script Doesn't Work)

### Step 1: Set the New Password

While `pg_hba.conf` is still set to `trust`:

**Open Command Prompt:**
```bash
cd "C:\Program Files\PostgreSQL\17\bin"
psql -U postgres
```

**In the psql prompt, run:**
```sql
ALTER USER postgres WITH PASSWORD 'Buckalew2025';
\q
```

✓ Password is now set!

---

### Step 2: Fix pg_hba.conf Security

**Open this file as Administrator:**
```
C:\Program Files\PostgreSQL\17\data\pg_hba.conf
```

**Find these lines and change from `trust` to `scram-sha-256`:**

**BEFORE (insecure):**
```conf
# IPv4 local connections:
host    all             all             127.0.0.1/32            trust

# IPv6 local connections:
host    all             all             ::1/128                 trust
```

**AFTER (secure):**
```conf
# IPv4 local connections:
host    all             all             127.0.0.1/32            scram-sha-256

# IPv6 local connections:
host    all             all             ::1/128                 scram-sha-256
```

**Also check the "local" line:**
```conf
local   all             all                                     scram-sha-256
```

**Save the file!**

---

### Step 3: Restart PostgreSQL Service

**Option A: Using Services**
1. Press `Win + R`
2. Type `services.msc`
3. Find `postgresql-x64-17`
4. Right-click → **Restart**

**Option B: Using Command Prompt (as Admin)**
```bash
net stop postgresql-x64-17
net start postgresql-x64-17
```

**Option C: Using pg_ctl**
```bash
cd "C:\Program Files\PostgreSQL\17\bin"
pg_ctl restart -D "C:\Program Files\PostgreSQL\17\data"
```

---

### Step 4: Test the New Password

```bash
cd "C:\Program Files\PostgreSQL\17\bin"
psql -U postgres
```

When prompted, enter password: `Buckalew2025`

If it works, you'll see:
```
postgres=#
```

Type `\q` to exit.

✓ Password is working!

---

### Step 5: Update .env.local

Open `.env.local` and change line 9 to:

```env
DATABASE_URL=postgresql://postgres:Buckalew2025@localhost:5432/Buckalew?schema=public
```

**Save the file!**

---

## ✅ After Setup

Once password is reset and security is restored:

### 1. Run Database Setup:
```bash
setup-postgres17.bat
```

OR manually:
```bash
npm install bcryptjs
npx prisma generate
npx prisma db push
npm run seed
```

### 2. Start Your Website:
```bash
npm run dev
```

### 3. Login:
- Go to: http://localhost:3000/login
- Email: `larry@buckalewfinancialservices.com`
- Password: `Larry123!@#`
- Access: http://localhost:3000/admin

---

## 🔍 Verify Security is Restored

Check your `pg_hba.conf`:
```bash
type "C:\Program Files\PostgreSQL\17\data\pg_hba.conf"
```

Should see `scram-sha-256` or `md5`, NOT `trust`!

---

## 📋 Complete pg_hba.conf Template

If you need to recreate the file, here's a secure template:

```conf
# PostgreSQL Client Authentication Configuration File
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     scram-sha-256

# IPv4 local connections:
host    all             all             127.0.0.1/32            scram-sha-256

# IPv6 local connections:
host    all             all             ::1/128                 scram-sha-256

# Allow replication connections from localhost
host    replication     all             127.0.0.1/32            scram-sha-256
host    replication     all             ::1/128                 scram-sha-256
```

**Save this as `pg_hba.conf` in:**
```
C:\Program Files\PostgreSQL\17\data\
```

Then restart the service.

---

## 🆘 Troubleshooting

### Can't connect after changing back to scram-sha-256

**Issue:** Old password hash format
**Solution:**
1. Change back to `trust` temporarily
2. Run: `ALTER USER postgres WITH PASSWORD 'Buckalew2025';`
3. Change to `scram-sha-256`
4. Restart service

### Service won't restart

**Solution:**
1. Check Windows Event Viewer for errors
2. Verify pg_hba.conf syntax (no typos!)
3. Make sure you have one authentication method per line

### Password still doesn't work

**Solution:**
1. Set `pg_hba.conf` to `trust` again
2. Connect: `psql -U postgres`
3. Run: `\password postgres`
4. Enter new password twice
5. Change back to `scram-sha-256`
6. Restart

---

## ✅ Success Checklist

- [ ] Password set to `Buckalew2025`
- [ ] pg_hba.conf changed back to `scram-sha-256`
- [ ] PostgreSQL service restarted
- [ ] Can connect with: `psql -U postgres` (using password)
- [ ] .env.local updated with password
- [ ] `npx prisma db push` works
- [ ] `npm run dev` starts without errors
- [ ] Can login to website

---

## 🎯 Final Commands After Security is Fixed

```bash
# Setup database
npm install bcryptjs
npx prisma generate
npx prisma db push
npm run seed

# Start website
npm run dev
```

Then access:
- Login: http://localhost:3000/login
- Admin: http://localhost:3000/admin

---

**Your new PostgreSQL password: Buckalew2025**

**Keep this safe!**
