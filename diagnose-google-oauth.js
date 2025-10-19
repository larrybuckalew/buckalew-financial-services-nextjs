// Quick diagnostic script to check Google OAuth setup
const fs = require('fs');
const path = require('path');

console.log('\n========================================');
console.log('🔍 GOOGLE OAUTH DIAGNOSTIC');
console.log('========================================\n');

// Check 1: .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local file exists');
  
  // Read the file
  const envContent = fs.readFileSync(envPath, 'utf-8');
  
  // Check for Google credentials
  const hasGoogleClientId = envContent.includes('GOOGLE_CLIENT_ID=') && 
                             !envContent.includes('GOOGLE_CLIENT_ID=your_') &&
                             !envContent.includes('GOOGLE_CLIENT_ID=\n');
  const hasGoogleSecret = envContent.includes('GOOGLE_CLIENT_SECRET=') && 
                          !envContent.includes('GOOGLE_CLIENT_SECRET=your_') &&
                          !envContent.includes('GOOGLE_CLIENT_SECRET=\n');
  const hasNextAuthSecret = envContent.includes('NEXTAUTH_SECRET=') &&
                            !envContent.includes('NEXTAUTH_SECRET=\n');
  const hasNextAuthUrl = envContent.includes('NEXTAUTH_URL=');
  
  console.log(hasGoogleClientId ? '✅ GOOGLE_CLIENT_ID is set' : '❌ GOOGLE_CLIENT_ID is missing or empty');
  console.log(hasGoogleSecret ? '✅ GOOGLE_CLIENT_SECRET is set' : '❌ GOOGLE_CLIENT_SECRET is missing or empty');
  console.log(hasNextAuthSecret ? '✅ NEXTAUTH_SECRET is set' : '❌ NEXTAUTH_SECRET is missing or empty');
  console.log(hasNextAuthUrl ? '✅ NEXTAUTH_URL is set' : '⚠️  NEXTAUTH_URL not found (optional for dev)');
} else {
  console.log('❌ .env.local file NOT found!');
}

console.log('');

// Check 2: NextAuth route exists
const nextAuthPath = path.join(__dirname, 'src', 'app', 'api', 'auth', '[...nextauth]', 'route.js');
if (fs.existsSync(nextAuthPath)) {
  console.log('✅ NextAuth route exists');
  
  const routeContent = fs.readFileSync(nextAuthPath, 'utf-8');
  const hasGoogleProvider = routeContent.includes('GoogleProvider');
  const hasCredentialsProvider = routeContent.includes('CredentialsProvider');
  
  console.log(hasGoogleProvider ? '✅ GoogleProvider configured' : '❌ GoogleProvider NOT configured');
  console.log(hasCredentialsProvider ? '✅ CredentialsProvider configured' : '❌ CredentialsProvider NOT configured');
} else {
  console.log('❌ NextAuth route NOT found!');
}

console.log('');

// Check 3: LoginForm exists
const loginFormPath = path.join(__dirname, 'src', 'components', 'auth', 'LoginForm.jsx');
if (fs.existsSync(loginFormPath)) {
  console.log('✅ LoginForm component exists');
  
  const formContent = fs.readFileSync(loginFormPath, 'utf-8');
  const hasGoogleButton = formContent.includes('Sign in with Google') || 
                          formContent.includes('signIn(\'google\')');
  
  console.log(hasGoogleButton ? '✅ Google sign-in button in LoginForm' : '❌ Google button NOT found in LoginForm');
} else {
  console.log('❌ LoginForm component NOT found!');
}

console.log('');

// Check 4: Providers component
const providersPath = path.join(__dirname, 'src', 'components', 'Providers.jsx');
if (fs.existsSync(providersPath)) {
  console.log('✅ Providers component exists');
  
  const providersContent = fs.readFileSync(providersPath, 'utf-8');
  const hasSessionProvider = providersContent.includes('SessionProvider');
  
  console.log(hasSessionProvider ? '✅ SessionProvider configured' : '❌ SessionProvider NOT configured');
} else {
  console.log('❌ Providers component NOT found!');
}

console.log('');

// Check 5: package.json has required packages
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  console.log('✅ package.json exists');
  
  const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
  const hasNextAuth = packageContent.dependencies && packageContent.dependencies['next-auth'];
  const hasPrismaAdapter = packageContent.dependencies && packageContent.dependencies['@next-auth/prisma-adapter'];
  
  console.log(hasNextAuth ? `✅ next-auth installed (${hasNextAuth})` : '❌ next-auth NOT installed');
  console.log(hasPrismaAdapter ? `✅ @next-auth/prisma-adapter installed (${hasPrismaAdapter})` : '❌ @next-auth/prisma-adapter NOT installed');
} else {
  console.log('❌ package.json NOT found!');
}

console.log('\n========================================');
console.log('📊 SUMMARY');
console.log('========================================\n');

// Final recommendations
console.log('🎯 Next Steps:\n');
console.log('1. If any items above show ❌, fix those first');
console.log('2. Run: fix-google-oauth.bat');
console.log('3. Start dev server: npm run dev');
console.log('4. Test in incognito: http://localhost:3000/test-login');
console.log('5. Check browser console (F12) for any errors\n');

console.log('📚 Full guide: GOOGLE_OAUTH_FIX.md\n');
console.log('========================================\n');
