import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    if (req.method === 'GET') {
      // Get investment summary
      const summary = await prisma.investment.groupBy({
        by: ['type'],
        where: { userId: session.user.id },
        _sum: { amount: true },
        _count: { id: true }
      });

      // Calculate total investment
      const totalInvestment = await prisma.investment.aggregate({
        where: { userId: session.user.id },
        _sum: { amount: true }
      });

      // Performance tracking
      const performance = await prisma.investment.findMany({
        where: { userId: session.user.id },
        orderBy: { date: 'asc' }
      });

      // Calculate year-to-date and all-time performance
      const currentYear = new Date().getFullYear();
      const yearToDateInvestments = performance.filter(
        inv => new Date(inv.date).getFullYear() === currentYear
      );

      const reportData = {
        summary: summary.map(item => ({
          type: item.type,
          totalAmount: item._sum.amount || 0,
          count: item._count.id
        })),
        totalInvestment: totalInvestment._sum.amount || 0,
        yearToDateInvestment: yearToDateInvestments.reduce((sum, inv) => sum + inv.amount, 0),
        performance: performance.map(inv => ({
          date: inv.date,
          amount: inv.amount,
          type: inv.type
        }))
      };

      return res.status(200).json(reportData);
    } else {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Investment Summary API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};