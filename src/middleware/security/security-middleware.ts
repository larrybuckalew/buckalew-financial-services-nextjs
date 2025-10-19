import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { logger, ErrorType } from '@/lib/logging/logger'

// Define role-based access control
const ROLE_PERMISSIONS = {
  ADMIN: ['*'], // Full access
  MANAGER: [
    '/dashboard', 
    '/reports', 
    '/calculations'
  ],
  USER: [
    '/dashboard', 
    '/calculators', 
    '/profile'
  ]
}

export async function securityMiddleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  })

  // Check for sensitive routes that require authentication
  const sensitiveRoutes = [
    '/dashboard',
    '/profile',
    '/admin',
    '/reports',
    '/calculations',
    '/export'
  ]

  // Check if route is sensitive
  const isSensitiveRoute = sensitiveRoutes.some(route => 
    path.startsWith(route)
  )

  // Authentication check for sensitive routes
  if (isSensitiveRoute) {
    if (!token) {
      // Log unauthorized access attempt
      logger.logError(
        logger.createError(
          'Unauthorized Access Attempt', 
          ErrorType.AUTHENTICATION, 
          { 
            path, 
            ip: req.ip || 'unknown',
            method: req.method
          }
        )
      )

      // Redirect to login
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Role-based access control
    const userRole = token.role as string || 'USER'
    const allowedRoutes = ROLE_PERMISSIONS[userRole] || []

    const isAuthorized = allowedRoutes.some(route => 
      path.startsWith(route) || route === '*'
    )

    if (!isAuthorized) {
      // Log unauthorized route access
      logger.logError(
        logger.createError(
          'Unauthorized Route Access', 
          ErrorType.AUTHENTICATION, 
          { 
            path, 
            userRole, 
            allowedRoutes 
          }
        )
      )

      // Redirect to unauthorized page
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  }

  // Rate limiting for API routes
  if (path.startsWith('/api/')) {
    const rateLimitKey = `rate_limit:${token?.sub || req.ip}`
    const currentTime = Date.now()

    // Check and update rate limit
    const rateLimitResult = checkAndUpdateRateLimit(rateLimitKey, currentTime)

    if (!rateLimitResult.allowed) {
      // Log rate limit violation
      logger.logError(
        logger.createError(
          'Rate Limit Exceeded', 
          ErrorType.NETWORK, 
          { 
            path, 
            ipOrUser: rateLimitKey 
          }
        )
      )

      // Return rate limit error
      return new NextResponse(
        JSON.stringify({ 
          error: 'Too many requests, please try again later' 
        }), 
        { 
          status: 429, 
          headers: { 'Content-Type': 'application/json' } 
        }
      )
    }
  }

  // Security headers
  const response = NextResponse.next()
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Content Security Policy (adjust as needed)
  response.headers.set(
    'Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data:; " +
    "connect-src 'self'"
  )

  return response
}

// In-memory rate limiting (replace with Redis in production)
const requestLimits: Record<string, number[]> = {}
const REQUEST_WINDOW = 60000 // 1 minute
const MAX_REQUESTS = 100 // 100 requests per minute

function checkAndUpdateRateLimit(
  key: string, 
  currentTime: number
): { allowed: boolean } {
  // Get existing request times for this key
  const requestTimes = requestLimits[key] || []

  // Filter out old requests
  const recentRequests = requestTimes.filter(
    time => currentTime - time < REQUEST_WINDOW
  )

  // Check if within limit
  if (recentRequests.length >= MAX_REQUESTS) {
    return { allowed: false }
  }

  // Update request times
  requestLimits[key] = [...recentRequests, currentTime]

  return { allowed: true }
}

// Middleware configuration for Next.js
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/admin/:path*',
    '/reports/:path*',
    '/calculations/:path*',
    '/export/:path*',
    '/api/:path*'
  ]
}