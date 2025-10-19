/**
 * Alternative IONOS Email Test
 * Tests different authentication methods
 */

const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

const configs = [
  {
    name: 'Config 1: Port 465 SSL',
    host: 'smtp.ionos.com',
    port: 465,
    secure: true,
    auth: {
      user: 'larry@buckalewfinancialservices.com',
      pass: process.env.EMAIL_PASS
    }
  },
  {
    name: 'Config 2: Port 587 TLS',
    host: 'smtp.ionos.com',
    port: 587,
    secure: false,
    auth: {
      user: 'larry@buckalewfinancialservices.com',
      pass: process.env.EMAIL_PASS
    },
    tls: {
      ciphers: 'SSLv3'
    }
  },
  {
    name: 'Config 3: Port 587 with STARTTLS',
    host: 'smtp.ionos.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'larry@buckalewfinancialservices.com',
      pass: process.env.EMAIL_PASS
    }
  }
];

async function testConfig(config) {
  console.log(`\n📧 Testing: ${config.name}`);
  console.log(`   Host: ${config.host}`);
  console.log(`   Port: ${config.port}`);
  console.log(`   Secure: ${config.secure}`);
  console.log(`   User: ${config.auth.user}`);
  
  try {
    const transporter = nodemailer.createTransport(config);
    await transporter.verify();
    console.log(`   ✅ SUCCESS! This configuration works!\n`);
    return { success: true, config };
  } catch (error) {
    console.log(`   ❌ Failed: ${error.message}\n`);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  IONOS EMAIL CONFIGURATION TESTER');
  console.log('  Testing Multiple Configurations');
  console.log('═══════════════════════════════════════════════════════');
  
  console.log('\n🔐 Password from .env.local:', process.env.EMAIL_PASS ? '✅ Found' : '❌ Missing');
  
  let workingConfig = null;
  
  for (const config of configs) {
    const result = await testConfig(config);
    if (result.success) {
      workingConfig = result.config;
      break;
    }
  }
  
  if (workingConfig) {
    console.log('═══════════════════════════════════════════════════════');
    console.log('  ✅ FOUND WORKING CONFIGURATION!');
    console.log('═══════════════════════════════════════════════════════');
    console.log('\nUpdate your .env.local with:');
    console.log(`EMAIL_HOST=${workingConfig.host}`);
    console.log(`EMAIL_PORT=${workingConfig.port}`);
    console.log(`EMAIL_SECURE=${workingConfig.secure}`);
    console.log('');
  } else {
    console.log('═══════════════════════════════════════════════════════');
    console.log('  ❌ NO WORKING CONFIGURATION FOUND');
    console.log('═══════════════════════════════════════════════════════');
    console.log('\n🔍 Possible Issues:');
    console.log('1. Password is incorrect - Try logging into https://mail.ionos.com');
    console.log('2. SMTP access not enabled in IONOS account');
    console.log('3. Account may require 2FA or app-specific password');
    console.log('4. IP address might be blocked - Check IONOS security settings');
    console.log('5. Account might be suspended - Check IONOS account status\n');
  }
}

main().catch(console.error);
