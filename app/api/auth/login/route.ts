import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { AuthService } from '@/lib/auth/authService'
import { handleApiError } from '@/lib/errorHandler'
import { logger } from '@/lib/logger'
import { 
  validateUserLogin, 
  checkAccountLockout 
} from '@/middleware/authMiddleware'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Find user to check lockout status
    const user = await prisma.user.findUnique({ 
      where: { email } 
    })

    // Check account lockout
    if (user && !checkAccountLockout(user)) {
      await validateUserLogin(email, false)
      return NextResponse.json(
        { message: 'Account temporarily locked. Try again later.' }, 
        { status: 403 }
      )
    }

    const loginResult = await AuthService.login({ email, password })

    // Track successful login
    await validateUserLogin(email, true)

    const response = NextResponse.json({ 
      message: 'Login successful', 
      user: loginResult 
    }, { status: 200 })

    // Set secure, HTTP-only token cookie
    response.cookies.set('token', loginResult.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 1 day
    })

    return response
  } catch (error) {
    // Track failed login attempt
    if (typeof error === 'object' && error !== null && 'email' in error) {
      await validateUserLogin(error.email as string, false)
    }

    logger.error('Login error', { error: String(error) })
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { 
      status: errorResponse.statusCode 
    })
  }
}
