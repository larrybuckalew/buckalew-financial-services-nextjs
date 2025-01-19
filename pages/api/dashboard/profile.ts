import { withErrorHandler } from '@/middleware/errorHandler';
import prisma from '@/lib/prisma';
import { authenticateUser } from '@/lib/auth';

export default withErrorHandler(async (req, res) => {
  const user = await authenticateUser(req, res);
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  if (req.method === 'GET') {
    const profile = await prisma.financialProfile.findUnique({
      where: { userId: user.id }
    });
    return res.json(profile);
  }

  if (req.method === 'PUT') {
    const profile = await prisma.financialProfile.upsert({
      where: { userId: user.id },
      update: req.body,
      create: { ...req.body, userId: user.id }
    });
    return res.json(profile);
  }

  res.setHeader('Allow', ['GET', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
});