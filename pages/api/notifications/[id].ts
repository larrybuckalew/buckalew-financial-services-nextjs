import { withErrorHandler } from '@/middleware/errorHandler';
import prisma from '@/lib/prisma';
import { authenticateUser } from '@/lib/auth';

export default withErrorHandler(async (req, res) => {
  const user = await authenticateUser(req, res);
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  const { id } = req.query;

  if (req.method === 'PUT') {
    const notification = await prisma.notification.update({
      where: { id: String(id) },
      data: { read: true }
    });
    return res.json(notification);
  }

  res.setHeader('Allow', ['PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
});