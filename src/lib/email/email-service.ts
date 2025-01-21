import nodemailer from 'nodemailer';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    await this.transporter.sendMail({
      from: process.env.SMTP_FROM_ADDRESS,
      to: email,
      subject: 'Password Reset Request - Buckalew Financial Services',
      html: `
        <h1>Password Reset Request</h1>
        <p>You have requested to reset your password. Click the link below to proceed:</p>
        <p><a href="${resetLink}">Reset Password</a></p>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request this password reset, please ignore this email.</p>
        <p>Best regards,<br>Buckalew Financial Services Team</p>
      `,
      text: `
        Password Reset Request
        
        You have requested to reset your password. Click the link below to proceed:
        ${resetLink}
        
        This link will expire in 1 hour.
        
        If you did not request this password reset, please ignore this email.
        
        Best regards,
        Buckalew Financial Services Team
      `,
    });
  }

  async sendWelcomeEmail(email: string, fullName: string): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.SMTP_FROM_ADDRESS,
      to: email,
      subject: 'Welcome to Buckalew Financial Services',
      html: `
        <h1>Welcome to Buckalew Financial Services!</h1>
        <p>Dear ${fullName},</p>
        <p>Thank you for creating an account with Buckalew Financial Services. We're excited to help you manage your financial needs.</p>
        <p>Log in to your account to:</p>
        <ul>
          <li>View your financial dashboard</li>
          <li>Access investment calculators</li>
          <li>Generate financial reports</li>
          <li>Set up investment goals</li>
        </ul>
        <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
        <p>Best regards,<br>Buckalew Financial Services Team</p>
      `,
      text: `
        Welcome to Buckalew Financial Services!
        
        Dear ${fullName},
        
        Thank you for creating an account with Buckalew Financial Services. We're excited to help you manage your financial needs.
        
        Log in to your account to:
        - View your financial dashboard
        - Access investment calculators
        - Generate financial reports
        - Set up investment goals
        
        If you have any questions or need assistance, please don't hesitate to contact our support team.
        
        Best regards,
        Buckalew Financial Services Team
      `,
    });
  }

  async sendAccountActivityAlert(email: string, activity: string): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.SMTP_FROM_ADDRESS,
      to: email,
      subject: 'Account Activity Alert - Buckalew Financial Services',
      html: `
        <h1>Account Activity Alert</h1>
        <p>We detected the following activity on your account:</p>
        <p>${activity}</p>
        <p>If you did not perform this action, please contact our support team immediately.</p>
        <p>Best regards,<br>Buckalew Financial Services Team</p>
      `,
      text: `
        Account Activity Alert
        
        We detected the following activity on your account:
        ${activity}
        
        If you did not perform this action, please contact our support team immediately.
        
        Best regards,
        Buckalew Financial Services Team
      `,
    });
  }
}
