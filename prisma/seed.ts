import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@buckalew.com' },
    update: {},
    create: {
      email: 'admin@buckalew.com',
      name: 'Larry Buckalew',
      role: UserRole.ADMIN,
      emailVerified: new Date(),
      profile: {
        create: {
          phoneNumber: '+1-555-123-4567',
          address: '123 Financial Street, New York, NY 10001',
          occupation: 'Financial Services CEO'
        }
      }
    }
  });

  // Create sample investments for admin
  const sampleInvestments = [
    {
      type: 'STOCK',
      amount: 50000,
      date: new Date('2024-01-15')
    },
    {
      type: 'BOND',
      amount: 25000,
      date: new Date('2024-01-10')
    },
    {
      type: 'REAL_ESTATE',
      amount: 100000,
      date: new Date('2024-01-05')
    }
  ];

  for (const investment of sampleInvestments) {
    await prisma.investment.create({
      data: {
        ...investment,
        userId: adminUser.id
      }
    });
  }

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });