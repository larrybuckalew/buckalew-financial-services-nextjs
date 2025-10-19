import nodemailer from 'nodemailer';
// Email configuration from environment variables
const emailConfig = {
    host: process.env.EMAIL_HOST || 'smtp.ionos.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true', // false for port 587, true for 465
    auth: {
        user: process.env.EMAIL_USER || process.env.EMAIL_FROM || '',
        pass: process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD || ''
    },
    tls: {
        rejectUnauthorized: false // Allow self-signed certificates
    }
};
// Create reusable transporter
let transporter = null;
/**
 * Get or create email transporter
 */
export function getEmailTransporter() {
    if (!transporter) {
        transporter = nodemailer.createTransport(emailConfig);
    }
    return transporter;
}
/**
 * Verify email connection
 */
export async function verifyEmailConnection() {
    try {
        const transport = getEmailTransporter();
        await transport.verify();
        console.log('✅ Email server connection verified');
        return true;
    }
    catch (error) {
        console.error('❌ Email verification failed:', error);
        return false;
    }
}
/**
 * Send email with improved error handling
 */
export async function sendEmail(options) {
    try {
        const transport = getEmailTransporter();
        const mailOptions = {
            from: options.from || process.env.EMAIL_FROM || emailConfig.auth.user,
            to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
            subject: options.subject,
            html: options.html,
            text: options.text,
            cc: options.cc ? (Array.isArray(options.cc) ? options.cc.join(', ') : options.cc) : undefined,
            bcc: options.bcc ? (Array.isArray(options.bcc) ? options.bcc.join(', ') : options.bcc) : undefined,
            attachments: options.attachments
        };
        const info = await transport.sendMail(mailOptions);
        console.log('✅ Email sent successfully:', {
            messageId: info.messageId,
            to: mailOptions.to,
            subject: mailOptions.subject
        });
        return {
            success: true,
            messageId: info.messageId
        };
    }
    catch (error) {
        console.error('❌ Failed to send email:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
// Email templates
export const emailTemplates = {
    /**
     * Quote confirmation email for customers
     */
    quoteConfirmation: (data) => ({
        subject: `Quote Request Received - ${data.insuranceType}`,
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .quote-box {
            background: white;
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 20px 0;
          }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background: #667eea;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📋 Quote Request Received</h1>
        </div>
        <div class="content">
          <p>Dear ${data.name},</p>
          
          <p>Thank you for requesting a quote from <strong>Buckalew Financial Services</strong>!</p>
          
          <div class="quote-box">
            <h3>Your Quote Details:</h3>
            <p><strong>Quote Number:</strong> ${data.quoteNumber}</p>
            <p><strong>Insurance Type:</strong> ${data.insuranceType}</p>
            <p><strong>Status:</strong> Under Review</p>
          </div>

          <p>We've received your quote request and one of our insurance specialists will review it shortly. You can expect to hear from us within 24-48 hours.</p>

          <h3>What happens next?</h3>
          <ol>
            <li>Our team will review your information</li>
            <li>We'll prepare customized insurance options</li>
            <li>A licensed agent will contact you to discuss your options</li>
          </ol>

          <a href="https://buckalewfinancialservices.com/quote/status?id=${data.quoteNumber}" class="button">
            Check Quote Status
          </a>

          <p>If you have any immediate questions, please don't hesitate to contact us:</p>
          <p>
            📧 Email: larry@buckalewfinancialservices.com<br>
            📞 Phone: [Your Phone Number]
          </p>

          <div class="footer">
            <p><strong>Buckalew Financial Services</strong></p>
            <p>Professional Insurance Solutions You Can Trust</p>
            <p style="font-size: 12px; color: #999;">
              This is an automated confirmation. Please do not reply to this email.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
        text: `
Quote Request Received

Dear ${data.name},

Thank you for requesting a quote from Buckalew Financial Services!

Your Quote Details:
- Quote Number: ${data.quoteNumber}
- Insurance Type: ${data.insuranceType}
- Status: Under Review

We've received your quote request and one of our insurance specialists will review it shortly. You can expect to hear from us within 24-48 hours.

What happens next?
1. Our team will review your information
2. We'll prepare customized insurance options
3. A licensed agent will contact you to discuss your options

If you have any questions, please contact us:
Email: larry@buckalewfinancialservices.com

Buckalew Financial Services
Professional Insurance Solutions You Can Trust
    `
    }),
    /**
     * Admin notification for new quote
     */
    adminQuoteNotification: (data) => ({
        subject: `🔔 New Quote Request - ${data.insuranceType} [${data.quoteNumber}]`,
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
          }
          .alert-header {
            background: #10b981;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .info-box {
            background: white;
            border: 2px solid #10b981;
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
          }
          .priority-high {
            background: #ef4444;
            color: white;
            padding: 5px 10px;
            border-radius: 3px;
            display: inline-block;
          }
          .button {
            display: inline-block;
            padding: 12px 30px;
            background: #10b981;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="alert-header">
          <h1>🔔 New Quote Request</h1>
          ${data.priority === 'high' ? '<span class="priority-high">HIGH PRIORITY</span>' : ''}
        </div>
        <div class="content">
          <h2>Quote Details:</h2>
          <div class="info-box">
            <p><strong>Quote Number:</strong> ${data.quoteNumber}</p>
            <p><strong>Insurance Type:</strong> ${data.insuranceType}</p>
            <p><strong>Customer Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <a href="http://localhost:3000/admin" class="button">
            View in Admin Dashboard
          </a>

          <p><strong>Action Required:</strong></p>
          <ul>
            <li>Review the quote request details</li>
            <li>Contact the customer within 24 hours</li>
            <li>Prepare insurance options and quotes</li>
          </ul>
        </div>
      </body>
      </html>
    `,
        text: `
New Quote Request Received

Quote Number: ${data.quoteNumber}
Insurance Type: ${data.insuranceType}
Customer: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Time: ${new Date().toLocaleString()}

Action Required:
- Review the quote request details
- Contact the customer within 24 hours
- Prepare insurance options and quotes

View in Admin Dashboard: http://localhost:3000/admin
    `
    }),
    /**
     * Contact form submission notification
     */
    contactFormNotification: (data) => ({
        subject: `📨 Contact Form: ${data.subject}`,
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
          .header { background: #667eea; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .message-box { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #667eea; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📨 Contact Form Submission</h1>
        </div>
        <div class="content">
          <p><strong>From:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          <p><strong>Subject:</strong> ${data.subject}</p>
          
          <div class="message-box">
            <h3>Message:</h3>
            <p>${data.message.replace(/\n/g, '<br>')}</p>
          </div>

          <p><small>Received: ${new Date().toLocaleString()}</small></p>
        </div>
      </body>
      </html>
    `,
        text: `
Contact Form Submission

From: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
Subject: ${data.subject}

Message:
${data.message}

Received: ${new Date().toLocaleString()}
    `
    }),
    /**
     * Password reset email
     */
    passwordReset: (resetLink) => ({
        subject: 'Password Reset Request - Buckalew Financial Services',
        html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; }
          .header { background: #667eea; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f9f9f9; }
          .button { 
            display: inline-block; 
            padding: 12px 30px; 
            background: #667eea; 
            color: white; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0;
          }
          .warning { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🔐 Password Reset Request</h1>
        </div>
        <div class="content">
          <p>You have requested to reset your password for your Buckalew Financial Services account.</p>
          
          <p>Click the button below to reset your password:</p>
          
          <a href="${resetLink}" class="button">Reset Password</a>
          
          <div class="warning">
            <strong>⚠️ Security Notice:</strong><br>
            This link will expire in 1 hour. If you did not request a password reset, please ignore this email and contact us immediately.
          </div>

          <p>For security reasons, never share this link with anyone.</p>

          <p>
            Questions? Contact us at<br>
            📧 larry@buckalewfinancialservices.com
          </p>
        </div>
      </body>
      </html>
    `,
        text: `
Password Reset Request

You have requested to reset your password for your Buckalew Financial Services account.

Reset your password by clicking this link:
${resetLink}

⚠️ Security Notice:
- This link will expire in 1 hour
- If you did not request this, please ignore this email
- Never share this link with anyone

Questions? Contact us at: larry@buckalewfinancialservices.com
    `
    })
};
/**
 * Email Service class with helper methods
 */
export class EmailService {
    /**
     * Send quote confirmation to customer
     */
    static async sendQuoteConfirmation(to, data) {
        const template = emailTemplates.quoteConfirmation(data);
        return await sendEmail({
            to,
            subject: template.subject,
            html: template.html,
            text: template.text
        });
    }
    /**
     * Send admin notification for new quote
     */
    static async sendAdminQuoteNotification(data) {
        const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
        const template = emailTemplates.adminQuoteNotification(data);
        return await sendEmail({
            to: adminEmail,
            subject: template.subject,
            html: template.html,
            text: template.text
        });
    }
    /**
     * Send contact form notification
     */
    static async sendContactFormNotification(data) {
        const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
        const template = emailTemplates.contactFormNotification(data);
        return await sendEmail({
            to: adminEmail,
            subject: template.subject,
            html: template.html,
            text: template.text
        });
    }
    /**
     * Send password reset email
     */
    static async sendPasswordResetEmail(to, resetLink) {
        const template = emailTemplates.passwordReset(resetLink);
        return await sendEmail({
            to,
            subject: template.subject,
            html: template.html,
            text: template.text
        });
    }
}
export default EmailService;
