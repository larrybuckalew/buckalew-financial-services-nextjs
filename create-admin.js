// Create Admin User
// Run this with: node create-admin.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log('Creating admin user...');
    
    // First, ensure 'admin' role exists
    let adminRole = await prisma.role.findUnique({
      where: { name: 'admin' }
    });
    
    if (!adminRole) {
      console.log('Creating admin role...');
      adminRole = await prisma.role.create({
        data: {
          name: 'admin',
          description: 'Administrator role with full access'
        }
      });
    }
    
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@buckalewfinancialservices.com' }
    });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@buckalewfinancialservices.com');
      console.log('Password: Admin123!');
      return;
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('Admin123!', 10);
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@buckalewfinancialservices.com',
        name: 'Admin User',
        password: hashedPassword,
        roleId: adminRole.id,
        isActive: true
      }
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@buckalewfinancialservices.com');
    console.log('🔑 Password: Admin123!');
    console.log('');
    console.log('You can now login at: http://localhost:3000/login');
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
