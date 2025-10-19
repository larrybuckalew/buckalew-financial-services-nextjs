/**
 * Email Test Utility for IONOS Configuration
 * 
 * This script tests the IONOS email configuration and sends a test email
 * Run with: node scripts/test-email.js
 */

const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

// IONOS SMTP Configuration
const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.ionos.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true', // false for port 587
  auth: {
    user: process.env.EMAIL_USER || process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD
  },
  tls: {
    // Do not fail on invalid certs
    rejectUnauthorized: false
  }
};

console.log('📧 IONOS Email Configuration Test\n');
console.log('Configuration:');
console.log('- Host:', emailConfig.host);
console.log('- Port:', emailConfig.port);
console.log('- Secure:', emailConfig.secure);
console.log('- User:', emailConfig.auth.user);
console.log('- From:', process.env.EMAIL_FROM);
console.log('- Admin:', process.env.ADMIN_EMAIL);
console.log('\n');

async function testEmailConnection() {
  try {
    console.log('🔄 Creating email transport...');
    const transporter = nodemailer.createTransport(emailConfig);

    console.log('🔄 Verifying connection...');
    await transporter.verify();
    console.log('✅ Email server connection successful!\n');

    return transporter;
  } catch (error) {
    console.error('❌ Email connection failed:', error.message);
    console.error('\nTroubleshooting tips:');
    console.error('1. Check that EMAIL_HOST is set to: smtp.ionos.com');
    console.error('2. Verify EMAIL_PORT is 587 (for TLS) or 465 (for SSL)');
    console.error('3. Confirm EMAIL_USER is: larry@buckalewfinancialservices.com');
    console.error('4. Double-check your EMAIL_PASS/EMAIL_PASSWORD');
    console.error('5. Ensure your IONOS account has SMTP access enabled\n');
    throw error;
  }
}

async function sendTestEmail(transporter) {
  const testEmail = {
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: '✅ Buckalew Financial Services - Email Configuration Test',
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
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px 10px 0 0;
            text-align: center;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .success-badge {
            background: #10b981;
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            display: inline-block;
            margin: 20px 0;
          }
          .info-box {
            background: white;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎉 Email Configuration Successful!</h1>
        </div>
        <div class="content">
          <div class="success-badge">
            ✅ IONOS Email Working
          </div>
          
          <h2>Configuration Details:</h2>
          <div class="info-box">
            <strong>Server:</strong> ${emailConfig.host}<br>
            <strong>Port:</strong> ${emailConfig.port}<br>
            <strong>From:</strong> ${process.env.EMAIL_FROM}<br>
            <strong>To:</strong> ${process.env.ADMIN_EMAIL}<br>
            <strong>Date:</strong> ${new Date().toLocaleString()}
          </div>

          <h3>✨ Your email system is now configured and working!</h3>
          <p>This confirms that:</p>
          <ul>
            <li>✅ IONOS SMTP server is accessible</li>
            <li>✅ Authentication is working correctly</li>
            <li>✅ Email sending functionality is operational</li>
            <li>✅ Your website can now send quote confirmations</li>
          </ul>

          <h3>🚀 Next Steps:</h3>
          <ol>
            <li>Test the quote form on your website</li>
            <li>Verify quote confirmation emails are received</li>
            <li>Check admin notification emails</li>
            <li>Review email templates in components/email/templates/</li>
          </ol>

          <div class="footer">
            <p><strong>Buckalew Financial Services</strong></p>
            <p>Professional Insurance Solutions</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
Email Configuration Test - SUCCESS!

Your IONOS email is now properly configured and working.

Configuration:
- Server: ${emailConfig.host}
- Port: ${emailConfig.port}
- From: ${process.env.EMAIL_FROM}
- To: ${process.env.ADMIN_EMAIL}

This confirms your website can now send:
✅ Quote confirmations
✅ Admin notifications
✅ Password reset emails
✅ System alerts

Next steps:
1. Test the quote form
2. Verify email delivery
3. Review email templates

Buckalew Financial Services
Professional Insurance Solutions
    `
  };

  try {
    console.log('📤 Sending test email...');
    const info = await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully!');
    console.log('📬 Message ID:', info.messageId);
    console.log('📧 Email sent to:', testEmail.to);
    console.log('\n🎉 Check your inbox for the test email!\n');
    return true;
  } catch (error) {
    console.error('❌ Failed to send test email:', error.message);
    throw error;
  }
}

// Main execution
async function main() {
  try {
    console.log('═══════════════════════════════════════════════════════');
    console.log('  IONOS EMAIL CONFIGURATION TEST');
    console.log('  Buckalew Financial Services');
    console.log('═══════════════════════════════════════════════════════\n');

    // Test connection
    const transporter = await testEmailConnection();

    // Send test email
    await sendTestEmail(transporter);

    console.log('═══════════════════════════════════════════════════════');
    console.log('  ✅ ALL TESTS PASSED - EMAIL IS CONFIGURED!');
    console.log('═══════════════════════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('\n═══════════════════════════════════════════════════════');
    console.error('  ❌ EMAIL TEST FAILED');
    console.error('═══════════════════════════════════════════════════════\n');
    process.exit(1);
  }
}

main();
