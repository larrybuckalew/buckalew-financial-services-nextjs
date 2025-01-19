import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import { validatePassword } from '@/config/security'
import { monitoring } from '@/lib/monitoring'
import { logger } from '@/lib/logger'

const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex')
const JWT_EXPIRATION = '1d'

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().refine(validatePassword, { 
    message: 'Password does not meet complexity requirements' 
  }),
  name: z.string().optional()
})

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export class AuthService {
  static generateToken(user: { id: string, email: string, role?: string }) {
    return jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        role: user.role 
      }, 
      JWT_SECRET, 
      { expiresIn: JWT_EXPIRATION }
    )
  }

  static async register(data: {
    email: string
    password: string
    name?: string
  }) {
    const startTime = Date.now()
    
    try {
      const validatedData = RegisterSchema.parse(data)

      const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email }
      })

      if (existingUser) {
        monitoring.trackError(new Error('User already exists'), { email: validatedData.email })
        throw new Error('User already exists')
      }

      const hashedPassword = await bcrypt.hash(validatedData.password, 10)

      const user = await prisma.user.create({
        data: {
          email: validatedData.email,
          password: hashedPassword,
          name: validatedData.name
        }
      })

      const token = this.generateToken(user)

      monitoring.trackPerformance('user_registration', startTime)
      logger.info('User registered successfully', { userId: user.id })

      return { 
        id: user.id, 
        email: user.email,
        token 
      }
    } catch (error) {
      monitoring.trackError(error as Error)
      logger.error('Registration error', { error: String(error) })
      throw error
    }
  }

  static async login(credentials: { email: string, password: string }) {
    const startTime = Date.now()
    
    try {
      const validatedData = LoginSchema.parse(credentials)

      const user = await prisma.user.findUnique({
        where: { email: validatedData.email }
      })

      if (!user) {
        monitoring.trackError(new Error('Invalid credentials'), { email: validatedData.email })
        throw new Error('Invalid credentials')
      }

      const isValid = await bcrypt.compare(
        validatedData.password, 
        user.password
      )

      if (!isValid) {
        monitoring.trackError(new Error('Invalid credentials'), { email: validatedData.email })
        throw new Error('Invalid credentials')
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { 
          lastLogin: new Date(),
          loginAttempts: 0 // Reset login attempts on successful login
        }
      })

      const token = this.generateToken(user)

      monitoring.trackPerformance('user_login', startTime)
      logger.info('User logged in successfully', { userId: user.id })

      return {
        id: user.id,
        email: user.email,
        role: user.role,
        token
      }
    } catch (error) {
      monitoring.trackError(error as Error)
      logger.error('Login error', { error: String(error) })
      throw error
    }
  }
}
