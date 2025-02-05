import { DatabaseService } from '../db/db-service';

export interface SecurityEvent {
  type: 'login_attempt' | 'password_reset' | 'role_change' | 'permission_change';
  userId?: string;
  ipAddress: string;
  userAgent: string;
  status: 'success' | 'failure';
  details?: Record<string, any>;
  timestamp?: Date;
}

export class SecurityMonitor {
  private db: DatabaseService;

  constructor(db: DatabaseService) {
    this.db = db;
  }

  async logSecurityEvent(event: SecurityEvent): Promise<void> {
    const timestamp = event.timestamp || new Date();
    
    await this.db.executeQuery(
      `INSERT INTO security_events (
        type,
        user_id,
        ip_address,
        user_agent,
        status,
        details,
        timestamp
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        event.type,
        event.userId,
        event.ipAddress,
        event.userAgent,
        event.status,
        JSON.stringify(event.details),
        timestamp,
      ]
    );

<<<<<<< HEAD:src/app/lib/security/security-monitor.ts
    // Check for suspicious patterns
=======
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b:src/lib/security/security-monitor.ts
    await this.checkForSuspiciousActivity(event);
  }

  private async checkForSuspiciousActivity(event: SecurityEvent): Promise<void> {
<<<<<<< HEAD:src/app/lib/security/security-monitor.ts
    // Check for multiple failed login attempts
=======
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b:src/lib/security/security-monitor.ts
    if (event.type === 'login_attempt' && event.status === 'failure') {
      const failedAttempts = await this.db.executeQuery<{ count: number }>(
        `SELECT COUNT(*) as count
         FROM security_events
         WHERE type = 'login_attempt'
         AND status = 'failure'
         AND ip_address = $1
         AND timestamp > NOW() - INTERVAL '15 minutes'`,
        [event.ipAddress]
      );

      if (failedAttempts.count >= 5) {
        await this.createSecurityAlert({
          type: 'multiple_failed_logins',
          severity: 'high',
          source: event.ipAddress,
          details: {
            attempts: failedAttempts.count,
            userId: event.userId,
            userAgent: event.userAgent,
          },
        });
      }
    }

<<<<<<< HEAD:src/app/lib/security/security-monitor.ts
    // Check for password reset abuse
=======
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b:src/lib/security/security-monitor.ts
    if (event.type === 'password_reset') {
      const recentResets = await this.db.executeQuery<{ count: number }>(
        `SELECT COUNT(*) as count
         FROM security_events
         WHERE type = 'password_reset'
         AND user_id = $1
         AND timestamp > NOW() - INTERVAL '24 hours'`,
        [event.userId]
      );

      if (recentResets.count >= 3) {
        await this.createSecurityAlert({
          type: 'frequent_password_resets',
          severity: 'medium',
          source: event.userId,
          details: {
            resets: recentResets.count,
            ipAddress: event.ipAddress,
          },
        });
      }
    }

<<<<<<< HEAD:src/app/lib/security/security-monitor.ts
    // Monitor role and permission changes
=======
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b:src/lib/security/security-monitor.ts
    if (event.type === 'role_change' || event.type === 'permission_change') {
      const recentChanges = await this.db.executeQuery<{ count: number }>(
        `SELECT COUNT(*) as count
         FROM security_events
         WHERE type IN ('role_change', 'permission_change')
         AND timestamp > NOW() - INTERVAL '1 hour'`,
        []
      );

      if (recentChanges.count >= 10) {
        await this.createSecurityAlert({
          type: 'excessive_permission_changes',
          severity: 'high',
          source: event.userId,
          details: {
            changes: recentChanges.count,
            type: event.type,
          },
        });
      }
    }
  }

  private async createSecurityAlert(alert: {
    type: string;
    severity: 'low' | 'medium' | 'high';
    source: string;
    details: Record<string, any>;
  }): Promise<void> {
    await this.db.executeQuery(
      `INSERT INTO security_alerts (
        type,
        severity,
        source,
        details,
        created_at,
        status
      ) VALUES ($1, $2, $3, $4, NOW(), 'open')`,
      [alert.type, alert.severity, alert.source, JSON.stringify(alert.details)]
    );
<<<<<<< HEAD:src/app/lib/security/security-monitor.ts

    // Additional notification logic can be added here
    // For example, sending alerts to a security team
  }

  async getSecurityEvents(
    filter: Partial<SecurityEvent> & { 
      startDate?: Date;
      endDate?: Date;
    }
  ): Promise<SecurityEvent[]> {
=======
  }

  async getSecurityEvents(filter: Partial<SecurityEvent> & { 
    startDate?: Date;
    endDate?: Date;
  }): Promise<SecurityEvent[]> {
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b:src/lib/security/security-monitor.ts
    const conditions = [];
    const params = [];
    let paramCount = 1;

    if (filter.type) {
      conditions.push(`type = $${paramCount++}`);
      params.push(filter.type);
    }

    if (filter.userId) {
      conditions.push(`user_id = $${paramCount++}`);
      params.push(filter.userId);
    }

    if (filter.status) {
      conditions.push(`status = $${paramCount++}`);
      params.push(filter.status);
    }

    if (filter.startDate) {
      conditions.push(`timestamp >= $${paramCount++}`);
      params.push(filter.startDate);
    }

    if (filter.endDate) {
      conditions.push(`timestamp <= $${paramCount++}`);
      params.push(filter.endDate);
    }

    const whereClause = conditions.length > 0 
      ? `WHERE ${conditions.join(' AND ')}` 
      : '';

    return this.db.executeQuery<SecurityEvent>(
      `SELECT * FROM security_events
       ${whereClause}
       ORDER BY timestamp DESC
       LIMIT 1000`,
      params
    );
  }

<<<<<<< HEAD:src/app/lib/security/security-monitor.ts
  async getSecurityAlerts(
    status: 'open' | 'closed' | 'all' = 'open',
    severity?: 'low' | 'medium' | 'high'
  ): Promise<any[]> {
=======
  async getSecurityAlerts({
    status = 'open',
    severity,
  }: {
    status?: 'open' | 'investigating' | 'resolved' | 'false_positive';
    severity?: 'low' | 'medium' | 'high' | 'critical';
  } = {}): Promise<any[]> {
>>>>>>> 2cf111364f7c46e4f08e582ede8aebf03360532b:src/lib/security/security-monitor.ts
    const conditions = [];
    const params = [];
    let paramCount = 1;

    if (status !== 'all') {
      conditions.push(`status = $${paramCount++}`);
      params.push(status);
    }

    if (severity) {
      conditions.push(`severity = $${paramCount++}`);
      params.push(severity);
    }

    const whereClause = conditions.length > 0
      ? `WHERE ${conditions.join(' AND ')}`
      : '';

    return this.db.executeQuery(
      `SELECT * FROM security_alerts
       ${whereClause}
       ORDER BY created_at DESC`,
      params
    );
  }
}
