# 🔐 Google OAuth Setup Guide

## Quick Setup (10 Minutes)

### Step 1: Go to Google Cloud Console

1. Visit: https://console.cloud.google.com/
2. Sign in with your Google account (larry@buckalewfinancialservices.com)

### Step 2: Create a New Project (or use existing)

1. Click the project dropdown at the top
2. Click "New Project"
3. Name it: "Buckalew Financial Services"
4. Click "Create"

### Step 3: Enable Google+ API

1. In the left sidebar, go to: **APIs & Services** → **Library**
2. Search for: **Google+ API**
3. Click on it
4. Click **Enable**

### Step 4: Configure OAuth Consent Screen

1. Go to: **APIs & Services** → **OAuth consent screen**
2. Choose **External** (unless you have Google Workspace)
3. Click **Create**

**Fill in the form:**
- **App name:** Buckalew Financial Services
- **User support email:** larry@buckalewfinancialservices.com
- **App logo:** (Optional - skip for now)
- **App domain:**
  - Homepage: http://localhost:3000
  - Privacy policy: http://localhost:3000/privacy (create later)
  - Terms of service: http://localhost:3000/terms (create later)
- **Authorized domains:** localhost
- **Developer contact:** larry@buckalewfinancialservices.com

4. Click **Save and Continue**
5. **Scopes:** Click **Save and Continue** (default scopes are fine)
6. **Test users:** Add your email (larry@buckalewfinancialservices.com)
7. Click **Save and Continue**

### Step 5: Create OAuth Credentials

1. Go to: **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** → **OAuth client ID**
3. **Application type:** Web application
4. **Name:** Buckalew Financial Services Web Client

**Add Authorized JavaScript origins:**
- http://localhost:3000
- http://127.0.0.1:3000

**Add Authorized redirect URIs:**
- http://localhost:3000/api/auth/callback/google
- http://127.0.0.1:3000/api/auth/callback/google

5. Click **Create**

### Step 6: Copy Your Credentials

You'll see a popup with:
- **Client ID** (looks like: 123456789-abc123.apps.googleusercontent.com)
- **Client Secret** (looks like: GOCSPX-abc123xyz)

**Keep this window open!**

### Step 7: Add to .env.local

Open your `.env.local` file and add these lines:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

Replace with your actual Client ID and Client Secret.

### Step 8: Restart Your Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

---

## ✅ Testing Google Login

1. Go to: http://localhost:3000/login
2. Click **"Sign in with Google"**
3. Choose your Google account
4. Grant permissions
5. You should be redirected to /dashboard

---

## 🎯 For Production (Later)

When you're ready to deploy:

1. Go back to **OAuth consent screen**
2. Click **Publish App**
3. Update **Authorized JavaScript origins** to include:
   - https://buckalew-financial.com
   - https://www.buckalew-financial.com
4. Update **Authorized redirect URIs** to include:
   - https://buckalew-financial.com/api/auth/callback/google
   - https://www.buckalew-financial.com/api/auth/callback/google

---

## 🔐 Security Notes

- Never commit `.env.local` to Git
- Keep your Client Secret private
- Only add trusted redirect URIs
- For production, use HTTPS only

---

## 🆘 Troubleshooting

### Error: "redirect_uri_mismatch"
**Solution:** Make sure the redirect URI in Google Console exactly matches:
```
http://localhost:3000/api/auth/callback/google
```

### Error: "Access blocked: This app's request is invalid"
**Solution:** 
1. Check OAuth consent screen is configured
2. Add yourself as a test user
3. Make sure app is in "Testing" mode

### Google button doesn't work
**Solution:**
1. Check `.env.local` has correct credentials
2. Restart dev server
3. Clear browser cache

---

## 📋 Current Status

After setup, you'll be able to:
- ✅ Sign in with Google (one click!)
- ✅ Auto-create user account on first Google sign-in
- ✅ Link Google account to existing email (if emails match)
- ✅ Access dashboard after Google login

---

**Once you have your Google credentials, add them to `.env.local` and restart the server!**
