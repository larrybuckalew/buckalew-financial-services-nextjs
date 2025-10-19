import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  try {
    // Create roles first
    console.log('📝 Creating roles...')
    const adminRole = await prisma.role.upsert({
      where: { name: 'ADMIN' },
      update: {},
      create: {
        name: 'ADMIN',
        permissions: [
          'manage_users',
          'manage_content',
          'view_dashboard',
          'manage_quotes',
          'view_analytics',
          'system_settings'
        ]
      }
    });

    const agentRole = await prisma.role.upsert({
      where: { name: 'AGENT' },
      update: {},
      create: {
        name: 'AGENT',
        permissions: [
          'view_dashboard',
          'manage_quotes',
          'view_clients',
          'manage_appointments'
        ]
      }
    });

    const userRole = await prisma.role.upsert({
      where: { name: 'USER' },
      update: {},
      create: {
        name: 'USER',
        permissions: [
          'view_profile',
          'submit_quotes',
          'view_policies'
        ]
      }
    });

    // Create admin user
    console.log('👤 Creating admin user...')
    const adminPassword = await hash('Admin123!', 12);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@buckalew-financial.com' },
      update: {},
      create: {
        email: 'admin@buckalew-financial.com',
        name: 'Larry Buckalew',
        password: adminPassword,
        phone: '(555) 123-4567',
        address: '123 Financial Ave, Insurance City, IC 12345',
        roleId: adminRole.id,
        preferences: {
          theme: 'light',
          notifications: true,
          dashboard_layout: 'default'
        }
      }
    });

    // Create sample agent user
    console.log('👨‍💼 Creating agent user...')
    const agentPassword = await hash('Agent123!', 12);
    const agent = await prisma.user.upsert({
      where: { email: 'agent@buckalew-financial.com' },
      update: {},
      create: {
        email: 'agent@buckalew-financial.com',
        name: 'Sarah Johnson',
        password: agentPassword,
        phone: '(555) 234-5678',
        roleId: agentRole.id,
        preferences: {
          theme: 'light',
          notifications: true
        }
      }
    });

    // Create system settings
    console.log('⚙️ Creating system settings...')
    await prisma.systemSettings.upsert({
      where: { id: 1 },
      update: {},
      create: {
        siteName: 'Buckalew Financial Services',
        contactEmail: 'info@buckalew-financial.com',
        maintenanceMode: false,
        theme: 'light',
        sessionTimeout: 30,
        maxLoginAttempts: 5,
        passwordPolicy: {
          minLength: 8,
          requireUppercase: true,
          requireNumbers: true,
          requireSpecialChars: true,
          expiryDays: 90
        },
        emailSettings: {
          smtpHost: '',
          smtpPort: 587,
          smtpUser: '',
          smtpPassword: '',
          senderName: 'Buckalew Financial Services',
          senderEmail: 'noreply@buckalew-financial.com'
        },
        notificationSettings: {
          emailNotifications: true,
          smsNotifications: false,
          pushNotifications: false
        },
        backupSettings: {
          autoBackup: true,
          backupFrequency: 'daily',
          retentionDays: 30
        }
      }
    });

    // Create sample quotes for testing
    console.log('💼 Creating sample quotes...')
    const sampleQuotes = [
      {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@example.com',
        phone: '(555) 345-6789',
        zipCode: '12345',
        insuranceType: 'Life Insurance',
        dateOfBirth: new Date('1985-06-15'),
        gender: 'Male',
        maritalStatus: 'Married',
        tobacco: 'No',
        coverageAmount: '$500,000',
        additionalNotes: 'Looking for term life insurance for family protection'
      },
      {
        firstName: 'Mary',
        lastName: 'Johnson',
        email: 'mary.johnson@example.com',
        phone: '(555) 456-7890',
        zipCode: '54321',
        insuranceType: 'Health Insurance',
        dateOfBirth: new Date('1992-03-22'),
        gender: 'Female',
        maritalStatus: 'Single',
        coverageAmount: 'Individual Plan',
        additionalNotes: 'Need comprehensive health coverage'
      },
      {
        firstName: 'Robert',
        lastName: 'Davis',
        email: 'robert.davis@example.com',
        phone: '(555) 567-8901',
        zipCode: '67890',
        insuranceType: 'Medicare',
        dateOfBirth: new Date('1958-11-08'),
        gender: 'Male',
        maritalStatus: 'Married',
        additionalNotes: 'Turning 65 next year, need Medicare guidance'
      }
    ];

    for (const quote of sampleQuotes) {
      await prisma.quote.create({
        data: quote
      });
    }

    // Log initial audit entry
    console.log('📊 Creating initial audit log...')
    await prisma.auditLog.create({
      data: {
        action: 'SYSTEM_SETUP',
        userId: admin.id,
        details: 'Initial database setup and seeding completed',
        ipAddress: '127.0.0.1',
        resourceType: 'SYSTEM',
        resourceId: 'setup',
        metadata: JSON.stringify({
          roles_created: 3,
          users_created: 2,
          quotes_created: sampleQuotes.length
        })
      }
    });

    console.log('✅ Database seeding completed successfully!')
    console.log('')
    console.log('📋 Created:')
    console.log('   • 3 Roles (ADMIN, AGENT, USER)')
    console.log('   • 2 Users (admin@buckalew-financial.com, agent@buckalew-financial.com)')
    console.log('   • System settings')
    console.log('   • 3 Sample quotes')
    console.log('   • Initial audit log')
    console.log('')
    console.log('🔑 Login credentials:')
    console.log('   Admin: admin@buckalew-financial.com / Admin123!')
    console.log('   Agent: agent@buckalew-financial.com / Agent123!')
    
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main().catch((e) => {
  console.error('❌ Seeding failed:', e)
  process.exit(1)
})