import { withErrorHandler } from '@/middleware/errorHandler';
import { AuthenticationError } from '@/lib/errors';
import prisma from '@/lib/prisma';
import { comparePasswords, generateToken } from '@/lib/auth';

export default withErrorHandler(async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AuthenticationError('Invalid credentials');
  }

  const isValid = await comparePasswords(password, user.password);
  if (!isValid) {
    throw new AuthenticationError('Invalid credentials');
  }

  const token = generateToken(user.id);
  await prisma.session.create({
    data: {
      userId: user.id,
      sessionToken: token,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }
  });

  res.status(200).json({
    user: { id: user.id, email: user.email, name: user.name },
    token
  });
});