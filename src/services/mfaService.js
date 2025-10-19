import { authenticator } from 'otplib';
import QRCode from 'qrcode';
import crypto from 'crypto';
const prisma = new PrismaClient();
export class MFAService {
    // Generate MFA secret
    static generateMFASecret(user) {
        // Generate a unique secret
        const secret = authenticator.generateSecret();
        // Generate QR code URI
        const otpAuthUrl = authenticator.keyuri(user.email, 'Buckalew Financial Services', secret);
        return {
            secret,
            qrCodeUrl: otpAuthUrl
        };
    }
    // Enable MFA for a user
    static async enableMFA(userId, secret, token) {
        // Verify the provided token
        const isValidToken = this.verifyMFAToken(secret, token);
        if (!isValidToken) {
            return {
                success: false,
                message: 'Invalid verification code'
            };
        }
        // Generate backup recovery codes
        const backupCodes = this.generateBackupCodes();
        // Update user in database
        await prisma.user.update({
            where: { id: userId },
            data: {
                twoFactorEnabled: true,
                twoFactorSecret: secret,
                backupCodes
            }
        });
        return {
            success: true,
            message: 'Two-factor authentication enabled',
            backupCodes
        };
    }
    // Disable MFA for a user
    static async disableMFA(userId, providedToken) {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user || !user.twoFactorSecret) {
            return {
                success: false,
                message: 'MFA is not enabled'
            };
        }
        // Verify current token
        const isValidToken = this.verifyMFAToken(user.twoFactorSecret, providedToken);
        if (!isValidToken) {
            return {
                success: false,
                message: 'Invalid verification code'
            };
        }
        // Disable MFA
        await prisma.user.update({
            where: { id: userId },
            data: {
                twoFactorEnabled: false,
                twoFactorSecret: null,
                backupCodes: []
            }
        });
        return {
            success: true,
            message: 'Two-factor authentication disabled'
        };
    }
    // Verify MFA token
    static verifyMFAToken(secret, token) {
        try {
            return authenticator.verify({
                token,
                secret
            });
        }
        catch (error) {
            return false;
        }
    }
    // Generate backup recovery codes
    static generateBackupCodes(count = 5) {
        return Array.from({ length: count }, () => crypto.randomBytes(8).toString('hex'));
    }
    // Validate backup recovery code
    static async validateBackupCode(userId, providedCode) {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            return {
                success: false,
                message: 'User not found'
            };
        }
        // Check if code exists and remove it
        const backupCodes = user.backupCodes || [];
        const codeIndex = backupCodes.indexOf(providedCode);
        if (codeIndex === -1) {
            return {
                success: false,
                message: 'Invalid recovery code'
            };
        }
        // Remove used code
        backupCodes.splice(codeIndex, 1);
        // Update user
        await prisma.user.update({
            where: { id: userId },
            data: { backupCodes }
        });
        return {
            success: true,
            message: 'Recovery code validated'
        };
    }
    // Full MFA authentication process
    static async authenticateWithMFA(userId, providedToken) {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user || !user.twoFactorEnabled) {
            return {
                success: false,
                message: 'MFA not enabled'
            };
        }
        // Try standard MFA token
        if (user.twoFactorSecret) {
            const isValidToken = this.verifyMFAToken(user.twoFactorSecret, providedToken);
            if (isValidToken) {
                return {
                    success: true,
                    message: 'MFA verified'
                };
            }
        }
        // If standard token fails, try backup code
        const backupResult = await this.validateBackupCode(userId, providedToken);
        return backupResult;
    }
}
// Utility to generate QR Code for MFA setup
export async function generateMFAQRCode(otpAuthUrl) {
    return QRCode.toDataURL(otpAuthUrl);
}
