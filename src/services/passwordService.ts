import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export class PasswordService {
  // Generate password reset token
  static async generateResetToken(email: string): Promise<string | null> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    // Generate a unique reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Update user with reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry
      }
    });

    return resetToken;
  }

  // Send password reset email
  static async sendResetEmail(email: string, resetToken: string): Promise<void> {
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Construct reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h1>Password Reset</h1>
        <p>You have requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      `
    });
  }

  // Verify reset token
  static async verifyResetToken(token: string): Promise<{
    user: { id: string, email: string } | null,
    isValid: boolean
  }> {
    const user = await prisma.user.findUnique({
      where: { 
        resetToken: token,
        resetTokenExpiry: { gt: new Date() }
      },
      select: { id: true, email: true }
    });

    return {
      user,
      isValid: !!user
    };
  }

  // Reset password
  static async resetPassword(
    token: string, 
    newPassword: string
  ): Promise<boolean> {
    // Verify token first
    const { user, isValid } = await this.verifyResetToken(token);

    if (!isValid || !user) {
      return false;
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        hashedPassword,
        resetToken: null,
        resetTokenExpiry: null
      }
    });

    return true;
  }

  // Change password (for authenticated users)
  static async changePassword(
    userId: string, 
    currentPassword: string, 
    newPassword: string
  ): Promise<boolean> {
    // Find user
    const user = await prisma.user.findUnique({ 
      where: { id: userId } 
    });

    if (!user) {
      return false;
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword, 
      user.hashedPassword
    );

    if (!isCurrentPasswordValid) {
      return false;
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { hashedPassword: hashedNewPassword }
    });

    return true;
  }

  // Password strength validator
  static validatePasswordStrength(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Check minimum length
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    // Check for uppercase letter
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    // Check for lowercase letter
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    // Check for number
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    // Check for special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// API Route Handler for Password Reset Request
export async function requestPasswordReset(email: string) {
  try {
    // Generate reset token
    const resetToken = await PasswordService.generateResetToken(email);

    if (!resetToken) {
      return { 
        success: false, 
        message: 'No account found with this email' 
      };
    }

    // Send reset email
    await PasswordService.sendResetEmail(email, resetToken);

    return { 
      success: true, 
      message: 'Password reset link sent to your email' 
    };
  } catch (error) {
    console.error('Password reset error:', error);
    return { 
      success: false, 
      message: 'An error occurred. Please try again later.' 
    };
  }
}
