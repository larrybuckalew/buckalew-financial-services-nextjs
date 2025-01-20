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
      // Get all investments for the user
      const investments = await prisma.investment.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          date: 'desc',
        },
      });

      // Calculate total investments
      const totalInvestments = investments.reduce(
        (sum, investment) => sum + investment.amount,
        0
      );

      // Calculate monthly growth
      const currentMonth = new Date().getMonth();
      const lastMonthInvestments = investments.filter(
        (inv) => new Date(inv.date).getMonth() === currentMonth - 1
      );
      const currentMonthInvestments = investments.filter(
        (inv) => new Date(inv.date).getMonth() === currentMonth
      );

      const lastMonthTotal = lastMonthInvestments.reduce(
        (sum, inv) => sum + inv.amount,
        0
      );
      const currentMonthTotal = currentMonthInvestments.reduce(
        (sum, inv) => sum + inv.amount,
        0
      );

      const monthlyGrowth =
        lastMonthTotal > 0
          ? ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100
          : 0;

      // Calculate yearly growth
      const currentYear = new Date().getFullYear();
      const lastYearInvestments = investments.filter(
        (inv) => new Date(inv.date).getFullYear() === currentYear - 1
      );
      const currentYearInvestments = investments.filter(
        (inv) => new Date(inv.date).getFullYear() === currentYear
      );

      const lastYearTotal = lastYearInvestments.reduce(
        (sum, inv) => sum + inv.amount,
        0
      );
      const currentYearTotal = currentYearInvestments.reduce(
        (sum, inv) => sum + inv.amount,
        0
      );

      const yearlyGrowth =
        lastYearTotal > 0
          ? ((currentYearTotal - lastYearTotal) / lastYearTotal) * 100
          : 0;

      return res.status(200).json({
        totalInvestments,
        monthlyGrowth: parseFloat(monthlyGrowth.toFixed(2)),
        yearlyGrowth: parseFloat(yearlyGrowth.toFixed(2)),
      });
    } catch (error) {
      console.error('Error fetching financial overview:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}