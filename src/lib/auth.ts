import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePasswords(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function generateToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });
}

export async function validateToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function authenticateUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return null;

    const decoded = await validateToken(token);
    if (!decoded) return null;

    const user = await prisma.user.findUnique({
      where: { id: (decoded as any).userId },
    });

    return user;
  } catch (error) {
    return null;
  }
}