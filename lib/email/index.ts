import nodemailer from 'nodemailer';

interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  senderName: string;
  senderEmail: string;
}

interface EmailOptions {
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }[];
}

export async function sendEmail(options: EmailOptions & EmailSettings) {
  const {
    smtpHost,
    smtpPort,
    smtpUser,
    smtpPassword,
    senderName,
    senderEmail,
    ...emailOptions
  } = options;

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  // Send email
  try {
    const info = await transporter.sendMail({
      from: `"${senderName}" <${senderEmail}>`,
      ...emailOptions,
    });

    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

export async function sendTemplatedEmail(
  template: string,
  data: Record<string, any>,
  options: EmailOptions & EmailSettings
) {
  try {
    // Here you could implement template rendering logic
    // For example, using a template engine like handlebars
    const renderedHtml = await renderTemplate(template, data);
    
    return await sendEmail({
      ...options,
      html: renderedHtml,
    });
  } catch (error) {
    console.error('Error sending templated email:', error);
    throw error;
  }
}

async function renderTemplate(template: string, data: Record<string, any>): Promise<string> {
  // Implement template rendering logic here
  // This is a placeholder implementation
  let rendered = template;
  Object.entries(data).forEach(([key, value]) => {
    rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), value);
  });
  return rendered;
}

// Utility function to validate email configuration
export async function validateEmailConfig(config: EmailSettings): Promise<boolean> {
  try {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpPort === 465,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPassword,
      },
    });

    // Verify connection configuration
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Email configuration validation failed:', error);
    return false;
  }
}

export const emailTemplates = {
  welcome: {
    subject: 'Welcome to Buckalew Financial Services',
    template: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1>Welcome, {{name}}!</h1>
        <p>Thank you for joining Buckalew Financial Services. We're excited to help you achieve your financial goals.</p>
        <div style="margin: 20px 0;">
          <p>Here are some quick links to get you started:</p>
          <ul>
            <li><a href="{{dashboardUrl}}">Your Dashboard</a></li>
            <li><a href="{{profileUrl}}">Complete Your Profile</a></li>
            <li><a href="{{appointmentUrl}}">Schedule a Consultation</a></li>
          </ul>
        </div>
        <p>If you have any questions, feel free to <a href="{{supportUrl}}">contact our support team</a>.</p>
      </div>
    `
  },
  passwordReset: {
    subject: 'Password Reset Request',
    template: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1>Password Reset Request</h1>
        <p>We received a request to reset your password. Click the button below to create a new password:</p>
        <div style="margin: 20px 0;">
          <a href="{{resetUrl}}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
            Reset Password
          </a>
        </div>
        <p>If you didn't request this change, please ignore this email or contact our support team.</p>
        <p>This link will expire in 1 hour.</p>
      </div>
    `
  },
  appointmentConfirmation: {
    subject: 'Appointment Confirmation',
    template: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1>Appointment Confirmed</h1>
        <p>Your appointment has been scheduled for:</p>
        <div style="margin: 20px 0; padding: 20px; background-color: #f3f4f6; border-radius: 4px;">
          <p><strong>Date:</strong> {{date}}</p>
          <p><strong>Time:</strong> {{time}}</p>
          <p><strong>Type:</strong> {{type}}</p>
          <p><strong>Consultant:</strong> {{consultant}}</p>
        </div>
        <p><a href="{{calendarUrl}}">Add to Calendar</a></p>
        <p>Need to make changes? <a href="{{manageUrl}}">Manage your appointment</a></p>
      </div>
    `
  },
  documentUpload: {
    subject: 'Your Document Has Been Uploaded',
    template: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1>Document Received</h1>
        <p>Hello {{name}},</p>
        <p>This is to confirm that we have received your document: <strong>{{documentName}}</strong>.</p>
        <p>We will review it shortly. You can view your uploaded documents on your <a href="{{dashboardUrl}}">dashboard</a>.</p>
      </div>
    `
  },
  appointmentReminder: {
    subject: 'Appointment Reminder',
    template: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1>Appointment Reminder</h1>
        <p>This is a reminder for your upcoming appointment:</p>
        <div style="margin: 20px 0; padding: 20px; background-color: #f3f4f6; border-radius: 4px;">
          <p><strong>Date:</strong> {{date}}</p>
          <p><strong>Time:</strong> {{time}}</p>
          <p><strong>Type:</strong> {{type}}</p>
          <p><strong>Consultant:</strong> {{consultant}}</p>
        </div>
        <p>If you need to reschedule, please <a href="{{manageUrl}}">manage your appointment</a>.</p>
      </div>
    `
  },
  newsletterUpdate: {
    subject: '{{subject}}',
    template: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1>{{title}}</h1>
        <p>{{content}}</p>
      </div>
    `
  },
  securityAlert: {
    subject: 'Security Alert',
    template: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1>Security Alert</h1>
        <p>We noticed a new sign-in to your account from an unrecognized device. If this was you, you can safely ignore this email.</p>
        <p>If you don't recognize this activity, please <a href="{{resetPasswordUrl}}">reset your password</a> immediately and contact our support team.</p>
      </div>
    `
  }
};