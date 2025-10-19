# Creating New Google OAuth Credentials

## Step 1: Go to Google Cloud Console
https://console.cloud.google.com/apis/credentials

## Step 2: Create OAuth Client ID

1. Click **"+ CREATE CREDENTIALS"**
2. Select **"OAuth client ID"**
3. Choose **"Web application"**

## Step 3: Configure Settings

**Name:** Buckalew Financial - Local Dev

**Authorized JavaScript origins:**
```
http://localhost:3000
```

**Authorized redirect URIs:**
```
http://localhost:3000/api/auth/callback/google
```

## Step 4: Copy Credentials

After creating, you'll get:
- Client ID (long string ending in .apps.googleusercontent.com)
- Client Secret (starts with GOCSPX-)

## Step 5: Update .env.local

Replace these lines in your .env.local file:

```
GOOGLE_CLIENT_ID=your_new_client_id_here
GOOGLE_CLIENT_SECRET=your_new_client_secret_here
```

## Step 6: Restart Server

1. Stop the server (Ctrl+C)
2. Run: npm run dev
3. Test again at: http://localhost:3000/google-test

---

## Common Issues:

❌ **Missing OAuth Consent Screen**
- Go to: https://console.cloud.google.com/apis/credentials/consent
- Fill out the consent screen first before creating credentials

❌ **Wrong Project Selected**
- Make sure you're in the correct Google Cloud project

❌ **API Not Enabled**
- Go to: https://console.cloud.google.com/apis/library
- Search for "Google+ API" and enable it
