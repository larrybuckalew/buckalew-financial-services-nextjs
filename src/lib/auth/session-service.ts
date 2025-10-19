import { randomUUID } from 'crypto';
import { DatabaseService } from '../db/db-service';
import { Session } from '../types/session';

export class SessionService {
  constructor(private db: DatabaseService) {}

  async createSession(userId: string): Promise<Session> {
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const session = await this.db.executeQuery<Session>(
      `INSERT INTO sessions (user_id, token, expires_at)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [userId, token, expiresAt]
    );

    return session;
  }

  async validateSession(sessionId: string): Promise<boolean> {
    const session = await this.db.executeQuery<Session | null>(
      `SELECT * FROM sessions WHERE id = $1 AND expires_at > NOW()`,
      [sessionId]
    );

    return !!session;
  }

  async revokeSession(sessionId: string): Promise<void> {
    await this.db.executeQuery(
      `DELETE FROM sessions WHERE id = $1`,
      [sessionId]
    );
  }

  async refreshSession(sessionId: string): Promise<Session> {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const session = await this.db.executeQuery<Session>(
      `UPDATE sessions
       SET expires_at = $2
       WHERE id = $1
       RETURNING *`,
      [sessionId, expiresAt]
    );

    if (!session) {
      throw new Error('Session not found');
    }

    return session;
  }
}
