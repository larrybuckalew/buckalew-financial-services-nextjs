require('dotenv').config({ path: '.env.local' });
const { validateEmailConfig } = require('./lib/email');

async function testEmail() {
  const emailConfig = {
    smtpHost: process.env.EMAIL_HOST,
    smtpPort: parseInt(process.env.EMAIL_PORT, 10),
    smtpUser: process.env.EMAIL_USER,
    smtpPassword: process.env.EMAIL_PASSWORD,
    senderName: 'Test',
    senderEmail: process.env.EMAIL_FROM,
  };

  const isValid = await validateEmailConfig(emailConfig);

  if (isValid) {
    console.log('Email configuration is valid.');
  }
  else {
    console.error('Email configuration is invalid.');
  }
}

testEmail();