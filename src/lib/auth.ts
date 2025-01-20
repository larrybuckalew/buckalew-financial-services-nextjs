import { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from './prisma';
import { UserRole } from '@prisma/client';

// Multi-Factor Authentication Configuration
const mfaConfig = {
  enabled: process.env.ENABLE_MULTI_FACTOR_AUTH === 'true',
  providers: [
    // TOTP (Time-Based One-Time Password)
    {
      type: 'totp',
      issuer: 'Buckalew Financial',
      requiredFields: ['email']
    },
    // Backup Codes
    {
      type: 'backup-codes',
      generateCodes: () => {
        // Generate 5 unique backup codes
        return Array.from({ length: 5 }, () => 
          Math.random().toString(36).substring(2, 10).toUpperCase()
        );
      }
    }
  ]
};

// Role-Based Access Control Middleware
const roleBasedAccessControl = {
  async authorize(user) {
    // Default to USER role if not specified
    const userRecord = await prisma.user.findUnique({
      where: { email: user.email || undefined },
      select: { role: true }
    });
    
    return userRecord?.role || UserRole.USER;
  },
  
  // Access control rules
  rules: {
    [UserRole.USER]: {
      canAccessDashboard: true,
      canTrackInvestments: true,
      canUseCalculators: true
    },
    [UserRole.MANAGER]: {
      canAccessDashboard: true,
      canTrackInvestments: true,
      canUseCalculators: true,
      canManageTeam: true
    },
    [UserRole.ADMIN]: {
      canAccessDashboard: true,
      canTrackInvestments: true,
      canUseCalculators: true,
      canManageTeam: true,
      canManageUsers: true,
      canAccessAdminPanel: true
    }
  }
};

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          scope: 'openid email profile'
        }
      }
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Additional sign-in validation
      if (account?.provider === 'google') {
        // Optional: Verify domain for corporate accounts
        const allowedDomains = ['buckalew.com', 'example.com'];
        const email = profile?.email as string;
        const domain = email.split('@')[1];
        
        if (!allowedDomains.includes(domain)) {
          return false; // Block sign-in
        }
      }
      
      return true;
    },
    async session({ session, user }) {
      // Attach role and additional user info to session
      session.user.id = user.id;
      session.user.role = user.role;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Ensure redirects are safe
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  events: {
    async signIn(message) {
      // Log successful sign-ins
      console.log('User signed in:', message.user.email);
    },
    async createUser({ user }) {
      // Optional: Send welcome email or perform initial setup
      await prisma.userProfile.create({
        data: { userId: user.id }
      });
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request'
  },
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  debug: process.env.NODE_ENV !== 'production'
};

// Export role-based access control for use in middleware/components
export const { authorize, rules } = roleBasedAccessControl;

export default authConfig;