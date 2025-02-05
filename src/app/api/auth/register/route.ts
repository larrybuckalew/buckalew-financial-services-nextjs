import { NextRequest, NextResponse } from 'next/server'
import { hashPassword, generateTokens } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { UserRole } from '@/types/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, role = UserRole.USER } = await req.json()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } })
    
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        role,
        profileComplete: false
      }
    })

    // Generate tokens
    const tokens = generateTokens(user)

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profileComplete: user.profileComplete
      },
      tokens
    }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ message: 'Registration failed' }, { status: 500 })
  }
}