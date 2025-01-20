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
      const investments = await prisma.investment.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          date: 'desc',
        },
        select: {
          id: true,
          type: true,
          amount: true,
          date: true,
          description: true,
        },
      });

      return res.status(200).json(investments);
    } catch (error) {
      console.error('Error fetching investments:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    const { type, amount, description } = req.body;

    try {
      const investment = await prisma.investment.create({
        data: {
          type,
          amount,
          description,
          date: new Date(),
          userId: session.user.id,
        },
      });

      return res.status(201).json(investment);
    } catch (error) {
      console.error('Error creating investment:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}