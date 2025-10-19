import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { AuthService } from '@/lib/auth/authService'
import { logger } from '@/lib/logger'
import { monitoring } from '@/lib/monitoring'

const prisma = new PrismaClient()

const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

export async function validateUserLogin(email: string, isSuccessful: boolean) {
  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) return

    if (isSuccessful) {
      // Reset login attempts on successful login
      await prisma.user.update({
        where: { id: user.id },
        data: { 
          loginAttempts: 0,
          lockoutTime: null 
        }
      })
    } else {
      const newAttemptCount = (user.loginAttempts || 0) + 1

      if (newAttemptCount >= MAX_LOGIN_ATTEMPTS) {
        // Lock the account
        await prisma.user.update({
          where: { id: user.id },
          data: { 
            loginAttempts: newAttemptCount,
            lockoutTime: new Date(Date.now() + LOCKOUT_DURATION)
          }
        })

        logger.warn('Account locked due to multiple failed login attempts', { 
          email, 
          attempts: newAttemptCount 
        })

        monitoring.recordMetric({
          name: 'security.account_lockout',
          value: 1,
          timestamp: new Date(),
          tags: { email }
        })
      } else {
        // Increment login attempts
        await prisma.user.update({
          where: { id: user.id },
          data: { loginAttempts: newAttemptCount }
        })
      }
    }
  } catch (error) {
    logger.error('Login attempt tracking error', { error: String(error) })
  }
}

export function checkAccountLockout(user: { lockoutTime?: Date | null }) {
  if (!user.lockoutTime) return true

  const isLockedOut = user.lockoutTime > new Date()
  
  if (isLockedOut) {
    logger.warn('Attempted login to locked account', { 
      lockoutTime: user.lockoutTime 
    })
  }

  return !isLockedOut
}
