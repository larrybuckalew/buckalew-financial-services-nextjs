import { randomUUID } from 'crypto';
export class SessionService {
    constructor(db) {
        this.db = db;
    }
    async createSession(userId) {
        const token = randomUUID();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        const session = await this.db.executeQuery(`INSERT INTO sessions (user_id, token, expires_at)
       VALUES ($1, $2, $3)
       RETURNING *`, [userId, token, expiresAt]);
        return session;
    }
    async validateSession(sessionId) {
        const session = await this.db.executeQuery(`SELECT * FROM sessions WHERE id = $1 AND expires_at > NOW()`, [sessionId]);
        return !!session;
    }
    async revokeSession(sessionId) {
        await this.db.executeQuery(`DELETE FROM sessions WHERE id = $1`, [sessionId]);
    }
    async refreshSession(sessionId) {
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        const session = await this.db.executeQuery(`UPDATE sessions
       SET expires_at = $2
       WHERE id = $1
       RETURNING *`, [sessionId, expiresAt]);
        if (!session) {
            throw new Error('Session not found');
        }
        return session;
    }
}
