const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function testLogin() {
  console.log('Testing login credentials...\n');

  // Get Larry's user
  const user = await prisma.user.findUnique({
    where: { email: 'larry@buckalewfinancialservices.com' },
    include: { role: true }
  });

  if (!user) {
    console.log('❌ User not found!');
    return;
  }

  console.log('✅ User found:');
  console.log('   Email:', user.email);
  console.log('   Name:', user.name);
  console.log('   Role:', user.role.name);
  console.log('   Password field starts with:', user.password.substring(0, 10));
  console.log('   HashedPassword field starts with:', user.hashedPassword?.substring(0, 10) || 'null');
  console.log();

  // Test password
  const testPassword = 'Larry123!@#';
  console.log(`Testing password: "${testPassword}"\n`);

  const isValid = await bcrypt.compare(testPassword, user.password);
  
  if (isValid) {
    console.log('✅ Password is CORRECT! Login should work.');
  } else {
    console.log('❌ Password is INCORRECT!');
    console.log('   This means the password hash is wrong.');
    console.log('   We need to reset the password.');
  }

  await prisma.$disconnect();
}

testLogin().catch(console.error);
