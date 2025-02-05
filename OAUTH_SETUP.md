# OAuth Setup Guide for Buckalew Financial Services

## GitHub OAuth Setup
1. Go to GitHub > Settings > Developer settings > OAuth Apps
2. Create New OAuth App
- Homepage URL: `http://localhost:3000`
- Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

## Google OAuth Setup
1. Go to Google Cloud Console > Credentials
2. Create OAuth 2.0 Client ID
- Authorized JavaScript origins: `http://localhost:3000`
- Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

## Environment Configuration
Replace placeholders in `.env.development`:
- `GITHUB_ID`: Your GitHub OAuth Client ID
- `GITHUB_SECRET`: Your GitHub OAuth Client Secret
- `GOOGLE_ID`: Your Google OAuth Client ID
- `GOOGLE_SECRET`: Your Google OAuth Client Secret

## Recommended Next Steps
```bash
npm install next-auth @prisma/client @next-auth/prisma-adapter
npx prisma generate
npx prisma migrate dev --name init
```

## Deployment Notes
- Use environment variables in deployment platform
- Ensure callback URLs match production domain