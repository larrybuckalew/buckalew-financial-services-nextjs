import { SecurityMonitor, SecurityEvent } from '@/lib/security/security-monitor';
import { DatabaseService } from '@/lib/db/db-service';

jest.mock('@/lib/db/db-service');

describe('SecurityMonitor', () => {
  let securityMonitor: SecurityMonitor;
  let mockDb: jest.Mocked<DatabaseService>;

  beforeEach(() => {
    mockDb = new DatabaseService() as jest.Mocked<DatabaseService>;
    securityMonitor = new SecurityMonitor(mockDb);
  });

  describe('logSecurityEvent', () => {
    it('should log security event successfully', async () => {
      const event: SecurityEvent = {
        type: 'login_attempt',
        userId: 'user-123',
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent',
        status: 'success',
        details: { browser: 'Chrome' },
      };

      mockDb.executeQuery.mockResolvedValueOnce(undefined);

      await securityMonitor.logSecurityEvent(event);

      expect(mockDb.executeQuery).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO security_events'),
        expect.arrayContaining([
          'login_attempt',
          'user-123',
          '127.0.0.1',
          'test-agent',
          'success',
          expect.any(String), // JSON stringified details
          expect.any(Date),
        ])
      );
    });

    it('should detect multiple failed login attempts', async () => {
      const event: SecurityEvent = {
        type: 'login_attempt',
        userId: 'user-123',
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent',
        status: 'failure',
      };

      mockDb.executeQuery
        .mockResolvedValueOnce(undefined) // Log event
        .mockResolvedValueOnce({ count: 5 }) // Check failed attempts
        .mockResolvedValueOnce(undefined); // Create alert

      await securityMonitor.logSecurityEvent(event);

      expect(mockDb.executeQuery).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO security_alerts'),
        expect.arrayContaining([
          'multiple_failed_logins',
          'high',
          '127.0.0.1',
        ])
      );
    });

    it('should detect frequent password resets', async () => {
      const event: SecurityEvent = {
        type: 'password_reset',
        userId: 'user-123',
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent',
        status: 'success',
      };

      mockDb.executeQuery
        .mockResolvedValueOnce(undefined) // Log event
        .mockResolvedValueOnce({ count: 3 }) // Check reset count
        .mockResolvedValueOnce(undefined); // Create alert

      await securityMonitor.logSecurityEvent(event);

      expect(mockDb.executeQuery).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO security_alerts'),
        expect.arrayContaining([
          'frequent_password_resets',
          'medium',
          'user-123',
        ])
      );
    });

    it('should detect excessive permission changes', async () => {
      const event: SecurityEvent = {
        type: 'role_change',
        userId: 'user-123',
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent',
        status: 'success',
      };

      mockDb.executeQuery
        .mockResolvedValueOnce(undefined) // Log event
        .mockResolvedValueOnce({ count: 10 }) // Check change count
        .mockResolvedValueOnce(undefined); // Create alert

      await securityMonitor.logSecurityEvent(event);

      expect(mockDb.executeQuery).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO security_alerts'),
        expect.arrayContaining([
          'excessive_permission_changes',
          'high',
          'user-123',
        ])
      );
    });
  });

  describe('getSecurityEvents', () => {
    it('should filter security events correctly', async () => {
      const filter = {
        type: 'login_attempt',
        userId: 'user-123',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-01-31'),
      };

      mockDb.executeQuery.mockResolvedValueOnce([
        {
          type: 'login_attempt',
          userId: 'user-123',
          timestamp: new Date('2025-01-15'),
          status: 'success',
        },
      ]);

      const events = await securityMonitor.getSecurityEvents(filter);

      expect(mockDb.executeQuery).toHaveBeenCalledWith(
        expect.stringMatching(/WHERE.*type.*user_id.*timestamp.*timestamp/),
        expect.arrayContaining([
          'login_attempt',
          'user-123',
          filter.startDate,
          filter.endDate,
        ])
      );
      expect(events).toHaveLength(1);
    });
  });

  describe('getSecurityAlerts', () => {
    it('should filter alerts by status and severity', async () => {
      mockDb.executeQuery.mockResolvedValueOnce([
        {
          type: 'multiple_failed_logins',
          severity: 'high',
          status: 'open',
          created_at: new Date(),
        },
      ]);

      const alerts = await securityMonitor.getSecurityAlerts({
        status: 'open',
        severity: 'high',
      });

      expect(mockDb.executeQuery).toHaveBeenCalledWith(
        expect.stringMatching(/WHERE.*status.*severity/),
        expect.arrayContaining(['open', 'high'])
      );
      expect(alerts).toHaveLength(1);
    });

    it('should handle empty filter', async () => {
      mockDb.executeQuery.mockResolvedValueOnce([]);

      await securityMonitor.getSecurityAlerts();

      expect(mockDb.executeQuery).toHaveBeenCalledWith(
        expect.stringMatching(/WHERE status = \$1/),
        ['open']
      );
    });
  });

  describe('error handling', () => {
    it('should handle database errors gracefully', async () => {
      const event: SecurityEvent = {
        type: 'login_attempt',
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent',
        status: 'success',
      };

      mockDb.executeQuery.mockRejectedValueOnce(new Error('Database error'));

      await expect(securityMonitor.logSecurityEvent(event))
        .rejects.toThrow('Database error');
    });

    it('should handle malformed event data', async () => {
      const event: SecurityEvent = {
        type: 'login_attempt',
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent',
        status: 'success',
        details: {
          circular: {},
        },
      };
      
      // Create circular reference
      event.details.circular = event.details;

      await expect(securityMonitor.logSecurityEvent(event))
        .rejects.toThrow();
    });
  });
});