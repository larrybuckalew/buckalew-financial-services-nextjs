<<<<<<< HEAD
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
=======
import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith("/login")

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
      return null
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  },
  {
    callbacks: {
      async authorized() {
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b
