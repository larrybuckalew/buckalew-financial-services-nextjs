import { authenticator } from 'otplib';
import { prisma } from '@/lib/db';
export class TwoFactorAuthService {
    // Generate secret for 2FA
    static generateSecret(userId) {
        // Generate a unique secret for the user
        const secret = authenticator.generateSecret();
        return {
            secret,
            qrCodeUrl: this.generateQRCodeUrl(userId, secret)
        };
    }
    // Generate QR Code URL for authentication apps
    static generateQRCodeUrl(userId, secret) {
        const appName = 'Buckalew Financial Services';
        const keyUri = authenticator.keyuri(userId, appName, secret);
        return keyUri;
    }
    // Verify 2FA token
    static verifyToken(secret, token) {
        return authenticator.verify({
            token,
            secret
        });
    }
    // Enable 2FA for a user
    static async enableTwoFactor(userId, secret) {
        return prisma.user.update({
            where: { id: userId },
            data: {
                twoFactorSecret: secret,
                twoFactorEnabled: true
            }
        });
    }
    // Disable 2FA for a user
    static async disableTwoFactor(userId) {
        return prisma.user.update({
            where: { id: userId },
            data: {
                twoFactorSecret: null,
                twoFactorEnabled: false
            }
        });
    }
    // Generate backup codes
    static generateBackupCodes(count = 5) {
        return Array.from({ length: count }, () => Math.random().toString(36).substring(2, 10).toUpperCase());
    }
    // Validate 2FA during login
    static async validateTwoFactor(userId, token, backupCode) {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user?.twoFactorEnabled) {
            return true; // 2FA not enabled, allow login
        }
        // Check regular token
        if (user.twoFactorSecret && this.verifyToken(user.twoFactorSecret, token)) {
            return true;
        }
        // Check backup codes
        if (backupCode && user.backupCodes?.includes(backupCode)) {
            // Remove used backup code
            await prisma.user.update({
                where: { id: userId },
                data: {
                    backupCodes: {
                        set: user.backupCodes.filter(code => code !== backupCode)
                    }
                }
            });
            return true;
        }
        return false;
    }
}
// 2FA Configuration for NextAuth
export const twoFactorAuthProvider = {
    id: 'two-factor',
    name: 'Two-Factor Authentication',
    type: 'credentials',
    credentials: {
        token: {
            label: "Two-Factor Token",
            type: "text",
            placeholder: "Enter 6-digit code"
        },
        backupCode: {
            label: "Backup Code",
            type: "text",
            placeholder: "Optional backup code"
        }
    },
    async authorize(credentials) {
        // Validate 2FA token
        // This would be implemented in your login flow
        return null;
    }
};
