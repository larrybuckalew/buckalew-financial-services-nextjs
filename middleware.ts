import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AuthService } from './lib/auth/authService'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const path = request.nextUrl.pathname

  // Public paths that don't require authentication
  const publicPaths = ['/login', '/register', '/']

  // Check if path requires authentication
  const isProtectedPath = !publicPaths.includes(path)

  if (isProtectedPath) {
    // No token present
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Validate token
    try {
      const decoded = AuthService.verifyToken(token)
      if (!decoded) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

// Configure routes to be protected
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/calculators/:path*',
    '/settings/:path*'
  ]
}
