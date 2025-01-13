import { hash, compare } from 'bcryptjs';
import { PrismaClient, Role } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export interface RegistrationData {
  email: string;
  password: string;
  name?: string;
  role?: Role;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export const SALT_ROUNDS = 12;

export async function registerUser(data: RegistrationData) {
  const { email, password, name, role = Role.USER } = data;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await hash(password, SALT_ROUNDS);

  // Generate email verification token
  const emailVerifyToken = crypto.randomBytes(32).toString('hex');

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role,
      emailVerifyToken,
      profile: {
        create: {} // Create empty profile
      }
    },
  });

  // Remove password from returned user object
  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, emailVerifyToken };
}

export async function verifyEmail(token: string) {
  const user = await prisma.user.findUnique({
    where: { emailVerifyToken: token },
  });

  if (!user) {
    throw new Error('Invalid verification token');
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      emailVerifyToken: null,
    },
  });

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function initiatePasswordReset(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    // Return silently to prevent email enumeration
    return null;
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken,
      resetTokenExpiry,
    },
  });

  return resetToken;
}

export async function validatePassword(password: string): Promise<boolean> {
  // Password requirements:
  // - At least 8 characters
  // - At least one uppercase letter
  // - At least one lowercase letter
  // - At least one number
  // - At least one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}