import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/lib/auth/authService'
import { handleApiError, ApiError } from '@/lib/errorHandler'
import { logger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    logger.info('Registration attempt', { email })

    const user = await AuthService.register({ 
      email, 
      password, 
      name 
    })

    logger.info('User registered successfully', { userId: user.id })

    return NextResponse.json({ 
      message: 'Registration successful', 
      user: { id: user.id, email: user.email } 
    }, { status: 201 })
  } catch (error) {
    logger.error('Registration error', { error: String(error) })

    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { 
      status: errorResponse.statusCode 
    })
  }
}
