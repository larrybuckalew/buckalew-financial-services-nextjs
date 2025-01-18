import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function registerUser(name: string, email: string, password: string) {
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create user in database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    return { id: user.id, name: user.name, email: user.email };
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('User registration failed');
  }
}

export async function authenticateUser(email: string, password: string) {
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return { id: user.id, name: user.name, email: user.email };
  } catch (error) {
    console.error('Authentication error:', error);
    throw new Error('Authentication failed');
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    return user;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}