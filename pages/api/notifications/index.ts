import { withErrorHandler } from '@/middleware/errorHandler';
import prisma from '@/lib/prisma';
import { authenticateUser } from '@/lib/auth';

export default withErrorHandler(async (req, res) => {
  const user = await authenticateUser(req, res);
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  if (req.method === 'GET') {
    const notifications = await prisma.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });
    return res.json(notifications);
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
});