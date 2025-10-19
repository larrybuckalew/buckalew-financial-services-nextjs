const nodemailer = require('nodemailer');
const Handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');

// Load environment variables from the main project's .env.local
require('dotenv').config({ path: path.resolve(__dirname, '../../.env.local') });

const emailConfig = {
  smtpHost: process.env.EMAIL_HOST,
  smtpPort: parseInt(process.env.EMAIL_PORT, 10),
  smtpUser: process.env.EMAIL_USER,
  smtpPassword: process.env.EMAIL_PASSWORD,
  senderName: 'Buckalew Financial Services',
  senderEmail: process.env.EMAIL_FROM,
};

async function sendEmail(options) {
  const transporter = nodemailer.createTransport({
    host: emailConfig.smtpHost,
    port: emailConfig.smtpPort,
    secure: emailConfig.smtpPort === 465,
    auth: {
      user: emailConfig.smtpUser,
      pass: emailConfig.smtpPassword,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"${emailConfig.senderName}" <${emailConfig.senderEmail}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

const emailTemplates = {
  welcome: {
    subject: 'Welcome to Buckalew Financial Services',
    template: `
      <div style="font-family: 'Montserrat', Arial, sans-serif; background-color: #FFFFFF; padding: 20px; color: #285A84;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <h1 style="color: #285A84; font-size: 24px; margin: 0;">Welcome, {{name}}!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 20px;">
              <p style="font-size: 16px; line-height: 1.5; margin: 0;">Thank you for joining Buckalew Financial Services. We're excited to help you achieve your financial goals.</p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 20px;">
              <div style="background-color: #F3F4F6; padding: 15px; border-radius: 8px;">
                <p style="font-size: 16px; font-weight: bold; margin-top: 0;">Here are some quick links to get you started:</p>
                <ul style="list-style-type: none; padding: 0; margin: 0;">
                  <li style="margin-bottom: 10px;"><a href="{{dashboardUrl}}" style="color: #285A84; text-decoration: none; font-weight: bold;">Your Dashboard</a></li>
                  <li style="margin-bottom: 10px;"><a href="{{profileUrl}}" style="color: #285A84; text-decoration: none; font-weight: bold;">Complete Your Profile</a></li>
                  <li><a href="{{appointmentUrl}}" style="color: #285A84; text-decoration: none; font-weight: bold;">Schedule a Consultation</a></li>
                </ul>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p style="font-size: 16px; line-height: 1.5; margin: 0;">If you have any questions, feel free to <a href="{{supportUrl}}" style="color: #285A84; text-decoration: none; font-weight: bold;">contact our support team</a>.</p>
            </td>
          </tr>
        </table>
      </div>
    `
  },
  // Add other templates here as needed
};

async function sendTemplatedEmail(templateName, data, recipientEmail) {
  const templateInfo = emailTemplates[templateName];
  if (!templateInfo) {
    console.error(`Template '${templateName}' not found.`);
    return;
  }

  const compiledTemplate = Handlebars.compile(templateInfo.template);
  const html = compiledTemplate(data);

  try {
    await sendEmail({
      to: recipientEmail,
      subject: templateInfo.subject,
      html: html,
    });
    console.log(`'${templateName}' email sent successfully to ${recipientEmail}.`);
  } catch (error) {
    console.error(`Failed to send '${templateName}' email:`, error);
  }
}

// Parse command-line arguments
const args = process.argv.slice(2);
if (args.length === 3) {
  const templateName = args[0];
  const data = JSON.parse(args[1]);
  const recipientEmail = args[2];
  sendTemplatedEmail(templateName, data, recipientEmail);
} else {
  console.error('Usage: node sendEmail.js <templateName> <jsonData> <recipientEmail>');
  // For direct testing, you can uncomment the main() function call here
  // main();
}

module.exports = { handleRequest };