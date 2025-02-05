import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/appointments',
  '/calculators',
];

// Define auth routes
const authRoutes = ['/login', '/register', '/reset-password'];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Get auth token from cookies
  const token = request.cookies.get('auth-token');
  const path = request.nextUrl.pathname;

  // Security Headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  );

  // CORS Headers
  if (request.method === 'OPTIONS') {
    response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  // Route protection logic
  if (protectedRoutes.some(route => path.startsWith(route))) {
    if (!token) {
      // Redirect to login if accessing protected route without auth
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Prevent authenticated users from accessing auth routes
  if (authRoutes.some(route => path.startsWith(route)) && token) {
    // Redirect to dashboard if trying to access auth routes while logged in
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

// Configure middleware matching
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (static files)
     * 4. /favicon.ico, sitemap.xml (static files)
     */
    '/((?!api|_next|_static|favicon.ico|sitemap.xml).*)',
  ],
};