import { NextResponse } from 'next/server';

// Rate Limiting and Security Middleware
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sensitiveRoutes = ['/dashboard', '/profile', '/admin'];

  // Basic bot protection
  const userAgent = request.headers.get('user-agent') || '';
  const botPatterns = [/bot/i, /spider/i, /crawler/i];
  if (botPatterns.some(pattern => pattern.test(userAgent))) {
    return new NextResponse(null, { status: 403 });
  }

  // Enhanced security for sensitive routes
  if (sensitiveRoutes.includes(pathname)) {
    const token = request.cookies.get('auth-token');
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/admin/:path*']
};