import { PrismaClient } from '@prisma/client'

class AuditLogger {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  // Log security-related events
  async logSecurityEvent(
    userId: string, 
    eventType: 'LOGIN' | 'LOGOUT' | 'PASSWORD_CHANGE' | 'SUSPICIOUS_ACTIVITY',
    metadata: Record<string, any> = {}
  ) {
    try {
      await this.prisma.auditLog.create({
        data: {
          userId,
          eventType,
          timestamp: new Date(),
          metadata: JSON.stringify(metadata)
        }
      })
    } catch (error) {
      console.error('Failed to log security event:', error)
    }
  }

  // Retrieve recent security events for a user
  async getUserSecurityEvents(
    userId: string, 
    limit: number = 50
  ) {
    try {
      return await this.prisma.auditLog.findMany({
        where: { userId },
        orderBy: { timestamp: 'desc' },
        take: limit
      })
    } catch (error) {
      console.error('Failed to retrieve security events:', error)
      return []
    }
  }

  // Check for suspicious activity patterns
  async detectSuspiciousActivity(userId: string): Promise<boolean> {
    try {
      const recentEvents = await this.getUserSecurityEvents(userId, 10)
      
      // Example suspicious activity detection
      const failedLoginAttempts = recentEvents.filter(
        event => event.eventType === 'LOGIN' && 
                 event.metadata.includes('failed')
      )

      return failedLoginAttempts.length > 5
    } catch (error) {
      console.error('Failed to detect suspicious activity:', error)
      return false
    }
  }
}

export const auditLogger = new AuditLogger()