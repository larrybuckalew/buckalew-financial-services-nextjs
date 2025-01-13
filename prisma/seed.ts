import { PrismaClient, UserRole } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
  const hashedPassword = await hash(adminPassword, 12);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@buckalew.com' },
    update: {},
    create: {
      email: 'admin@buckalew.com',
      password: hashedPassword,
      name: 'Admin User',
      role: UserRole.ADMIN,
      emailVerified: true,
      profile: {
        create: {
          phone: '555-0100',
          address: '123 Admin Street',
          city: 'Adminville',
          state: 'CA',
          zip: '90210'
        }
      }
    }
  });

  // Create manager user
  const manager = await prisma.user.upsert({
    where: { email: 'manager@buckalew.com' },
    update: {},
    create: {
      email: 'manager@buckalew.com',
      password: hashedPassword,
      name: 'Manager User',
      role: UserRole.MANAGER,
      emailVerified: true,
      profile: {
        create: {
          phone: '555-0200',
          address: '456 Manager Avenue',
          city: 'Managerville',
          state: 'CA',
          zip: '90211'
        }
      }
    }
  });

  // Create demo user
  const user = await prisma.user.upsert({
    where: { email: 'user@buckalew.com' },
    update: {},
    create: {
      email: 'user@buckalew.com',
      password: hashedPassword,
      name: 'Demo User',
      role: UserRole.USER,
      emailVerified: true,
      profile: {
        create: {
          phone: '555-0300',
          address: '789 User Boulevard',
          city: 'Userville',
          state: 'CA',
          zip: '90212'
        }
      }
    }
  });

  console.log({ admin, manager, user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });