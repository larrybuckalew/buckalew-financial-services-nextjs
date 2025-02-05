import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '@/types/auth'

// JWT Secret - IMPORTANT: This should be a strong, environment-specific secret
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_development_secret'
const JWT_EXPIRATION = '1h'
const REFRESH_TOKEN_EXPIRATION = '7d'

interface TokenPayload {
  userId: string
  email: string
  role: string
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function comparePasswords(
  plainPassword: string, 
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword)
}

export function generateTokens(user: User): { 
  accessToken: string, 
  refreshToken: string 
} {
  const accessToken = jwt.sign(
    { 
      userId: user.id, 
      email: user.email, 
      role: user.role 
    }, 
    JWT_SECRET, 
    { expiresIn: JWT_EXPIRATION }
  )

  const refreshToken = jwt.sign(
    { 
      userId: user.id, 
      email: user.email 
    }, 
    JWT_SECRET, 
    { expiresIn: REFRESH_TOKEN_EXPIRATION }
  )

  return { accessToken, refreshToken }
}

export function validateToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}

export function refreshAccessToken(refreshToken: string): string {
  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET) as TokenPayload
    
    // Generate new access token
    return jwt.sign(
      { 
        userId: decoded.userId, 
        email: decoded.email, 
        role: decoded.role 
      }, 
      JWT_SECRET, 
      { expiresIn: JWT_EXPIRATION }
    )
  } catch (error) {
    throw new Error('Invalid refresh token')
  }
}
