import crypto from 'crypto';
export function generateVerificationToken() {
    return crypto.randomBytes(32).toString('hex');
}
export function generatePasswordResetToken() {
    return crypto.randomBytes(32).toString('hex');
}
export function generateTwoFactorBackupCodes(count = 8) {
    return Array(count)
        .fill(0)
        .map(() => crypto.randomBytes(4).toString('hex'));
}
export function generate2FASecret() {
    return crypto.randomBytes(20).toString('hex');
}
export function hasExpired(date, maxAge) {
    if (!date)
        return true;
    const now = Date.now();
    const expiryTime = date.getTime() + maxAge;
    return now > expiryTime;
}
// Token expiration times
export const TOKEN_EXPIRATION = {
    VERIFICATION: 24 * 60 * 60 * 1000, // 24 hours
    PASSWORD_RESET: 1 * 60 * 60 * 1000, // 1 hour
    SESSION: 7 * 24 * 60 * 60 * 1000, // 7 days
};
