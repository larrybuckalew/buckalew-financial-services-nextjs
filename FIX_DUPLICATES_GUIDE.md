# Fix Duplicate Files - Step by Step Guide

## Problem
Your project has duplicate files (.jsx and .tsx versions) causing warnings in Next.js.

## Solution

### Option 1: Automated Cleanup (RECOMMENDED)

1. **Run the cleanup script:**
   ```bash
   cleanup-duplicates.bat
   ```

2. **Stop your dev server** (Ctrl+C in the terminal)

3. **Restart your dev server:**
   ```bash
   npm run dev
   ```

### Option 2: Manual Cleanup

If you prefer to do it manually, delete all `.tsx` files where a `.jsx` version exists:

**Pages to delete:**
- All `src/app/**/page.tsx` files (keep the `.jsx` versions)
- All `src/app/api/**/route.ts` files (keep the `.js` versions)
- `src/app/sitemap.ts` (keep `sitemap.js`)
- `src/instrumentation.ts` (keep `instrumentation.js`)
- `src/middleware.ts` (keep `middleware.js`)
- `pages/src/middleware.ts`
- `pages/not-found.tsx` (keep `not-found.jsx`)

## What Was Fixed

### 1. ✅ Removed `swcMinify` from next.config.js
- This option is deprecated in Next.js 15
- SWC is now the default minifier

### 2. ✅ Added Image Configuration
- Added proper image domains configuration
- Allows Next.js Image optimization to work properly

### 3. ✅ Created Cleanup Script
- Automatically removes all duplicate .tsx files
- Keeps your working .jsx files intact

## Expected Result

After running the cleanup, you should see:
- ✅ No more duplicate page warnings
- ✅ No more `swcMinify` warning
- ✅ Clean console output
- ✅ Faster compilation

## Verify It Worked

After cleanup, run:
```bash
npm run dev
```

You should see:
```
✓ Ready in X.Xs
```

With NO duplicate page warnings!

## Why This Happened

Your project was likely converted from TypeScript to JavaScript, but the old `.tsx` files weren't deleted. Next.js sees both versions and gets confused.

## Important Notes

⚠️ **The cleanup script will DELETE .tsx files**
- Make sure you have a backup if needed
- The script keeps all your .jsx files safe
- Only removes duplicate .tsx files

## If You Get Errors

If you encounter any errors after cleanup:

1. **Missing file errors:**
   - Check if the .jsx version exists
   - Restore from backup if needed

2. **Import errors:**
   - Update imports from .tsx to .jsx
   - Check your import statements

3. **Still seeing duplicates:**
   - Manually search for remaining .tsx files
   - Delete them one by one

## Need Help?

If cleanup causes issues, you can always restore from git:
```bash
git checkout src/
```

## Next Steps

After cleanup is complete:
1. ✅ Restart your dev server
2. ✅ Test your website (http://localhost:3000)
3. ✅ Verify all pages load correctly
4. ✅ Check the console for any remaining warnings
