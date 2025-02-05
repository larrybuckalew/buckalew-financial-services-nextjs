import { NextRequest, NextResponse } from 'next/server'
import { comparePasswords, generateTokens } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    // Find user
    const user = await prisma.user.findUnique({ where: { email } })
    
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    // Verify password
    const isValid = await comparePasswords(password, user.passwordHash)
    
    if (!isValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }

    // Generate tokens
    const tokens = generateTokens(user)

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      },
      tokens
    }, { status: 200 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'Authentication failed' }, { status: 500 })
  }
}