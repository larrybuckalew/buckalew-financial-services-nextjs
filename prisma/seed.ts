import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  try {
    // Create admin role
    const adminRole = await prisma.role.upsert({
      where: { name: 'ADMIN' },
      update: {},
      create: {
        name: 'ADMIN',
        permissions: [
          'manage_users',
          'view_dashboard',
          'manage_content'
        ]
      }
    });

    // Create admin user
    const adminPassword = await hash('admin123', 12);
    await prisma.user.upsert({
      where: { email: 'admin@buckalew.com' },
      update: {},
      create: {
        email: 'admin@buckalew.com',
        name: 'Admin User',
        password: adminPassword,
        roleId: adminRole.id
      }
    });

    console.log('Seed data created successfully')
  } catch (error) {
    console.error('Error creating seed data:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(console.error);