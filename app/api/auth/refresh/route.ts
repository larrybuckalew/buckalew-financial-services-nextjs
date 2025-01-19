import { NextRequest, NextResponse } from 'next/server'
import { AuthService } from '@/lib/auth/authService'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.split(' ')[1]

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    // Verify the existing token
    const decoded = AuthService.verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { id: (decoded as any).id }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Generate new token
    const newToken = AuthService.generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    })

    return NextResponse.json({ token: newToken })
  } catch (error) {
    console.error('Token refresh error:', error)
    return NextResponse.json({ error: 'Token refresh failed' }, { status: 500 })
  }
}
