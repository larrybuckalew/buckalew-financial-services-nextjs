import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Exclude authentication for public routes
  const publicPaths = ['/api/auth', '/api/public'];
  if (publicPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = await getToken({ req: request });
  
  if (!token) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Authentication required' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    );
  }

  // Rate limiting check
  const ip = request.ip ?? 'unknown';
  const rateLimit = await checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Rate limit exceeded' }),
      { status: 429, headers: { 'content-type': 'application/json' } }
    );
  }

  return NextResponse.next();
}

async function checkRateLimit(ip: string): Promise<{ allowed: boolean }> {
  // Implement rate limiting logic here
  // This is a placeholder - you'll want to use Redis or similar for production
  return { allowed: true };
}

export const config = {
  matcher: '/api/:path*',
}