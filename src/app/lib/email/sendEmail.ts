import nodemailer from 'nodemailer';

// Email configuration interface
interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

// Email content interface
interface EmailContent {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(config: EmailConfig) {
    this.transporter = nodemailer.createTransport(config);
  }

  // Send email method
  async send(content: EmailContent) {
    try {
      const defaultFrom = process.env.EMAIL_FROM || 'noreply@buckalew-financial.com';
      
      const mailOptions = {
        from: defaultFrom,
        ...content
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Email sending error:', error);
      throw error;
    }
  }
}

// Password reset email template
export function createPasswordResetEmailTemplate(token: string): { 
  subject: string, 
  text: string, 
  html: string 
} {
  const resetLink = `${process.env.APP_URL}/auth/reset-password?token=${token}`;

  return {
    subject: 'Password Reset Request',
    text: `
      You have requested a password reset for your Buckalew Financial Services account.
      
      Please use the following link to reset your password:
      ${resetLink}
      
      If you did not request a password reset, please ignore this email.
      This link will expire in 1 hour.
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>You have requested a password reset for your Buckalew Financial Services account.</p>
        <p>
          <a href="${resetLink}" style="
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          ">Reset Password</a>
        </p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <small>This link will expire in 1 hour.</small>
      </div>
    `
  };
}

// Utility function to send password reset email
export async function sendPasswordResetEmail(email: string, token: string) {
  // Create email service with configuration from environment
  const emailService = new EmailService({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASSWORD || ''
    }
  });

  // Create email content
  const emailContent = createPasswordResetEmailTemplate(token);

  // Send email
  await emailService.send({
    to: email,
    subject: emailContent.subject,
    text: emailContent.text,
    html: emailContent.html
  });
}
