import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of paths that require authentication
const protectedPaths = [
  '/dashboard',
  '/admin',
  '/profile',
  '/account'
]

// Check if the current path matches any protected paths
const isProtectedPath = (path: string) => {
  return protectedPaths.some(protectedPath => path.startsWith(protectedPath))
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('accessToken')?.value

  // Only check auth for protected paths
  if (isProtectedPath(path)) {
    // No token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Only run middleware on specific paths that need protection
    '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/account/:path*'
  ]
}