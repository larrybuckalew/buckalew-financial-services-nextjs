import { auditLogger } from '@/lib/security/audit-logger'
import { prisma } from '@/lib/db'

// Mock Prisma client
jest.mock('@/lib/db', () => ({
  prisma: {
    auditLog: {
      create: jest.fn(),
      findMany: jest.fn()
    },
    user: {
      findUnique: jest.fn()
    }
  }
}))

describe('AuditLogger', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('logSecurityEvent', () => {
    it('should log a security event', async () => {
      const mockCreate = prisma.auditLog.create as jest.Mock
      mockCreate.mockResolvedValue({})

      await auditLogger.logSecurityEvent('user123', 'LOGIN', {
        method: 'credentials'
      })

      expect(mockCreate).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: 'user123',
          eventType: 'LOGIN',
          metadata: expect.any(String)
        })
      })
    })
  })

  describe('getUserSecurityEvents', () => {
    it('should retrieve user security events', async () => {
      const mockFindMany = prisma.auditLog.findMany as jest.Mock
      const mockEvents = [
        { id: '1', eventType: 'LOGIN', timestamp: new Date() },
        { id: '2', eventType: 'LOGOUT', timestamp: new Date() }
      ]
      mockFindMany.mockResolvedValue(mockEvents)

      const events = await auditLogger.getUserSecurityEvents('user123')
      
      expect(mockFindMany).toHaveBeenCalledWith({
        where: { userId: 'user123' },
        orderBy: { timestamp: 'desc' },
        take: 50
      })
      expect(events).toEqual(mockEvents)
    })
  })

  describe('detectSuspiciousActivity', () => {
    it('should detect suspicious activity based on login attempts', async () => {
      const mockFindMany = prisma.auditLog.findMany as jest.Mock
      const mockFailedLoginEvents = Array(6).fill({
        eventType: 'LOGIN',
        metadata: JSON.stringify({ status: 'failed' })
      })
      mockFindMany.mockResolvedValue(mockFailedLoginEvents)

      const isSuspicious = await auditLogger.detectSuspiciousActivity('user123')
      
      expect(isSuspicious).toBeTruthy()
    })

    it('should not flag activity with few failed attempts', async () => {
      const mockFindMany = prisma.auditLog.findMany as jest.Mock
      const mockFailedLoginEvents = Array(4).fill({
        eventType: 'LOGIN',
        metadata: JSON.stringify({ status: 'failed' })
      })
      mockFindMany.mockResolvedValue(mockFailedLoginEvents)

      const isSuspicious = await auditLogger.detectSuspiciousActivity('user123')
      
      expect(isSuspicious).toBeFalsy()
    })
  })
})