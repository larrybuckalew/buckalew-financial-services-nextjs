import nodemailer from 'nodemailer';
import { config } from '@/config/environment';

// Email transport configuration
export const emailTransport = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure,
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
});

// Email templates
export const emailTemplates = {
  // Password Reset Email
  passwordReset: (resetLink: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>Password Reset Request</h1>
      <p>You have requested to reset your password for your Buckalew Financial Services account.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #4A90E2;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      ">Reset Password</a>
      <p>If you did not request a password reset, please ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
    </div>
  `,

  // MFA Setup Notification
  mfaSetup: (backupCodes: string[]) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1>Two-Factor Authentication Enabled</h1>
      <p>Two-factor authentication has been successfully enabled for your account.</p>
      <h2>Backup Codes</h2>
      <p>Please save these backup codes in a secure location:</p>
      <ul>
        ${backupCodes.map(code => `<li>${code}</li>`).join('')}
      </ul>
      <p>If you did not enable two-factor authentication, please contact support immediately.</p>
    </div>
  `
};

// Email sending utility
export class EmailService {
  static async sendPasswordResetEmail(
    to: string, 
    resetLink: string
  ): Promise<boolean> {
    try {
      await emailTransport.sendMail({
        from: config.email.from,
        to,
        subject: 'Password Reset Request',
        html: emailTemplates.passwordReset(resetLink)
      });
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  static async sendMFASetupNotification(
    to: string, 
    backupCodes: string[]
  ): Promise<boolean> {
    try {
      await emailTransport.sendMail({
        from: config.email.from,
        to,
        subject: 'Two-Factor Authentication Enabled',
        html: emailTemplates.mfaSetup(backupCodes)
      });
      return true;
    } catch (error) {
      console.error('MFA notification email failed:', error);
      return false;
    }
  }
}
