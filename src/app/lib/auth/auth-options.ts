import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { authenticator } from 'otplib';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        code: { label: 'Two-factor code', type: 'text' },
        isBackupCode: { label: 'Is backup code', type: 'boolean' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            sessions: true,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isValid) {
          throw new Error('Invalid credentials');
        }

        // Check email verification
        if (!user.isEmailVerified) {
          throw new Error('EMAIL_NOT_VERIFIED');
        }

        // If 2FA is enabled, verify the code
        if (user.twoFactorEnabled) {
          if (!credentials.code) {
            throw new Error('2FA_REQUIRED');
          }

          // Check if using backup code
          if (credentials.isBackupCode === 'true') {
            const backupCodes = user.backupCodes || [];
            const codeIndex = backupCodes.indexOf(credentials.code);
            
            if (codeIndex === -1) {
              throw new Error('Invalid backup code');
            }

            // Remove used backup code
            const updatedBackupCodes = [
              ...backupCodes.slice(0, codeIndex),
              ...backupCodes.slice(codeIndex + 1),
            ];

            await prisma.user.update({
              where: { id: user.id },
              data: { backupCodes: updatedBackupCodes },
            });
          } else {
            // Verify 2FA code
            const isValidCode = authenticator.verify({
              token: credentials.code,
              secret: user.twoFactorSecret!,
            });

            if (!isValidCode) {
              throw new Error('Invalid 2FA code');
            }
          }
        }

        // Update last login timestamp
        await prisma.user.update({
          where: { id: user.id },
          data: { 
            lastLoginAt: new Date(),
            sessions: {
              create: {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
                lastAccessAt: new Date(),
              }
            }
          },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          emailVerified: user.isEmailVerified,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/auth/error',
    verifyRequest: '/auth/verify-email',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.emailVerified = user.emailVerified;
      }

      // Check token expiration
      if (Date.now() < (token.exp as number * 1000)) {
        // Update last access time in session
        await prisma.session.updateMany({
          where: {
            userId: token.id as string,
            lastAccessAt: {
              lt: new Date(Date.now() - 5 * 60 * 1000), // Only update if last access was more than 5 minutes ago
            },
          },
          data: {
            lastAccessAt: new Date(),
          },
        });
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.emailVerified = token.emailVerified as boolean;

        // Add active session info
        const activeSession = await prisma.session.findFirst({
          where: {
            userId: token.id as string,
            expires: { gt: new Date() },
          },
          orderBy: { lastAccessAt: 'desc' },
        });

        if (activeSession) {
          session.sessionId = activeSession.id;
          session.lastAccess = activeSession.lastAccessAt;
        }
      }
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      // Clean up sessions on sign out
      if (token?.id) {
        await prisma.session.deleteMany({
          where: { userId: token.id as string },
        });
      }
    },
  },
};
