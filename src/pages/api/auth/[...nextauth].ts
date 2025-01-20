<<<<<<< HEAD
﻿import NextAuth from 'next-auth';
=======
import NextAuth from 'next-auth';
>>>>>>> origin/feature/financial-calculators
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
<<<<<<< HEAD
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        if (!user) {
          throw new Error("Invalid email or password");
        }
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid email or password");
        }
        if (!user.emailVerified) {
          throw new Error("Please verify your email first");
        }
=======
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          throw new Error('Invalid email or password');
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Invalid email or password');
        }

        if (!user.emailVerified) {
          throw new Error('Please verify your email first');
        }

>>>>>>> origin/feature/financial-calculators
        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() }
        });
<<<<<<< HEAD
=======

>>>>>>> origin/feature/financial-calculators
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  session: {
<<<<<<< HEAD
    strategy: "jwt"
=======
    strategy: 'jwt'
>>>>>>> origin/feature/financial-calculators
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
<<<<<<< HEAD
    signIn: "/login",
    error: "/login"
  },
  secret: process.env.NEXTAUTH_SECRET
});
=======
    signIn: '/login',
    error: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET
});
>>>>>>> origin/feature/financial-calculators
