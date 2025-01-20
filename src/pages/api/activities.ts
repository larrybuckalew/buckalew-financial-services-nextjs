import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const activities = await prisma.investment.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          date: 'desc',
        },
        take: 5,
        select: {
          id: true,
          type: true,
          amount: true,
          date: true,
          description: true,
        },
      });

      return res.status(200).json(activities);
    } catch (error) {
      console.error('Error fetching activities:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}