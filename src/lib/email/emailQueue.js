import Redis from 'ioredis';
export class EmailQueue {
    constructor() {
        this.queueKey = 'email:queue';
        this.maxAttempts = 3;
        this.retryDelays = [60, 300, 900]; // Retry delays in seconds: 1min, 5min, 15min
        this.redis = new Redis(process.env.REDIS_URL || '');
    }
    async addToQueue(email) {
        const id = `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const queuedEmail = {
            ...email,
            id,
            attempts: 0,
            status: 'pending'
        };
        await this.redis.hset(this.queueKey, id, JSON.stringify(queuedEmail));
        return id;
    }
    async getNextPendingEmail() {
        const allEmails = await this.redis.hgetall(this.queueKey);
        for (const [id, emailStr] of Object.entries(allEmails)) {
            const email = JSON.parse(emailStr);
            if (email.status === 'pending' ||
                (email.status === 'failed' &&
                    email.attempts < this.maxAttempts &&
                    this.shouldRetry(email))) {
                return email;
            }
        }
        return null;
    }
    shouldRetry(email) {
        if (!email.lastAttempt)
            return true;
        const timeSinceLastAttempt = (Date.now() - new Date(email.lastAttempt).getTime()) / 1000;
        const requiredDelay = this.retryDelays[email.attempts - 1] || 0;
        return timeSinceLastAttempt >= requiredDelay;
    }
    async updateEmailStatus(id, status, error) {
        const emailStr = await this.redis.hget(this.queueKey, id);
        if (!emailStr)
            return;
        const email = JSON.parse(emailStr);
        const updatedEmail = {
            ...email,
            status,
            attempts: email.attempts + 1,
            lastAttempt: new Date(),
            error: error
        };
        await this.redis.hset(this.queueKey, id, JSON.stringify(updatedEmail));
    }
    async cleanupCompletedEmails(maxAge = 7 * 24 * 60 * 60) {
        const allEmails = await this.redis.hgetall(this.queueKey);
        const now = Date.now();
        for (const [id, emailStr] of Object.entries(allEmails)) {
            const email = JSON.parse(emailStr);
            if (email.status === 'completed' && email.lastAttempt) {
                const age = (now - new Date(email.lastAttempt).getTime()) / 1000;
                if (age > maxAge) {
                    await this.redis.hdel(this.queueKey, id);
                }
            }
        }
    }
    async getEmailStatus(id) {
        const emailStr = await this.redis.hget(this.queueKey, id);
        return emailStr ? JSON.parse(emailStr) : null;
    }
}
export const emailQueue = new EmailQueue();
