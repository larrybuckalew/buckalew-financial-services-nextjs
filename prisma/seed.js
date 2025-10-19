const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create Roles
  console.log('Creating roles...');
  
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
      permissions: [
        'users:read',
        'users:write',
        'users:delete',
        'quotes:read',
        'quotes:write',
        'quotes:delete',
        'blog:read',
        'blog:write',
        'blog:delete',
        'appointments:read',
        'appointments:write',
        'appointments:delete',
        'settings:read',
        'settings:write',
        'audit:read',
      ],
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: {
      name: 'user',
      permissions: [
        'quotes:read',
        'quotes:write',
        'appointments:read',
        'appointments:write',
        'profile:read',
        'profile:write',
      ],
    },
  });

  const agentRole = await prisma.role.upsert({
    where: { name: 'agent' },
    update: {},
    create: {
      name: 'agent',
      permissions: [
        'quotes:read',
        'quotes:write',
        'appointments:read',
        'appointments:write',
        'appointments:delete',
        'blog:read',
        'users:read',
      ],
    },
  });

  console.log('✅ Roles created:', {
    admin: adminRole.id,
    user: userRole.id,
    agent: agentRole.id,
  });

  // Create Admin User
  console.log('Creating admin user...');
  
  const hashedPassword = await bcrypt.hash('Admin123!@#', 12);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@buckalewfinancialservices.com' },
    update: {},
    create: {
      email: 'admin@buckalewfinancialservices.com',
      name: 'Admin User',
      password: hashedPassword,
      hashedPassword: hashedPassword,
      phone: '(844) 779-7600',
      roleId: adminRole.id,
      isActive: true,
      preferences: {
        notifications: true,
        theme: 'light',
      },
    },
  });

  console.log('✅ Admin user created:', {
    id: adminUser.id,
    email: adminUser.email,
    name: adminUser.name,
  });

  // Create Larry's user account
  console.log('Creating Larry\'s user account...');
  
  const larryPassword = await bcrypt.hash('Larry123!@#', 12);

  const larryUser = await prisma.user.upsert({
    where: { email: 'larry@buckalewfinancialservices.com' },
    update: {},
    create: {
      email: 'larry@buckalewfinancialservices.com',
      name: 'Larry Buckalew',
      password: larryPassword,
      hashedPassword: larryPassword,
      phone: '(844) 779-7600',
      roleId: adminRole.id,
      isActive: true,
      preferences: {
        notifications: true,
        theme: 'light',
      },
    },
  });

  console.log('✅ Larry\'s user created:', {
    id: larryUser.id,
    email: larryUser.email,
    name: larryUser.name,
  });

  // Create System Settings
  console.log('Creating system settings...');
  
  const settings = await prisma.systemSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      contactEmail: 'larry@buckalewfinancialservices.com',
      emailSettings: {
        smtpHost: 'smtp.ionos.com',
        smtpPort: 587,
        smtpUser: 'larry@buckalewfinancialservices.com',
        smtpPassword: '', // Will be set from env
        senderName: 'Buckalew Financial Services',
        senderEmail: 'larry@buckalewfinancialservices.com',
      },
    },
  });

  console.log('✅ System settings created');

  // Create some sample quotes (optional)
  console.log('Creating sample quotes...');
  
  await prisma.quote.createMany({
    data: [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567',
        zipCode: '75001',
        insuranceType: 'Life Insurance',
        status: 'PENDING',
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '(555) 987-6543',
        zipCode: '75002',
        insuranceType: 'Health Insurance',
        status: 'CONTACTED',
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Sample quotes created');

  console.log('\n🎉 Database seeded successfully!');
  console.log('\n📋 Login Credentials:');
  console.log('━'.repeat(50));
  console.log('Admin Account:');
  console.log('  Email: admin@buckalewfinancialservices.com');
  console.log('  Password: Admin123!@#');
  console.log('');
  console.log('Larry\'s Account:');
  console.log('  Email: larry@buckalewfinancialservices.com');
  console.log('  Password: Larry123!@#');
  console.log('━'.repeat(50));
  console.log('\n⚠️  IMPORTANT: Change these passwords after first login!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
