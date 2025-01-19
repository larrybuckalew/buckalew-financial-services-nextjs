import { withErrorHandler } from '@/middleware/errorHandler';
import { ValidationError } from '@/lib/errors';
import prisma from '@/lib/prisma';
import { hashPassword, generateToken } from '@/lib/auth';

async function validateRegistration(email: string, password: string) {
  if (!email.includes('@')) {
    throw new ValidationError('Invalid email format');
  }
  if (password.length < 8) {
    throw new ValidationError('Password must be at least 8 characters');
  }
}

export default withErrorHandler(async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { email, password, name } = req.body;
  await validateRegistration(email, password);

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name }
  });

  const token = generateToken(user.id);
  res.status(201).json({
    user: { id: user.id, email: user.email, name: user.name },
    token
  });
});