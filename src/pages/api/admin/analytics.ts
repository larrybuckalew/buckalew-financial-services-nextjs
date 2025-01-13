import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      // Get user growth data (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const userGrowth = await prisma.$queryRaw`
        SELECT 
          DATE("createdAt") as date,
          COUNT(*) as count
        FROM "User"
        WHERE "createdAt" >= ${sevenDaysAgo}
        GROUP BY DATE("createdAt")
        ORDER BY date ASC
      `;

      // Get users by role
      const usersByRole = await prisma.user.groupBy({
        by: ['role'],
        _count: {
          role: true,
        },
      });

      const formattedUsersByRole = usersByRole.map(item => ({
        role: item.role,
        count: item._count.role,
      }));

      // Get activity metrics
      const totalUsers = await prisma.user.count();
      const verifiedUsers = await prisma.user.count({
        where: { emailVerified: true },
      });
      const activeProfiles = await prisma.profile.count({
        where: {
          OR: [
            { phoneNumber: { not: null } },
            { address: { not: null } },
            { investmentGoals: { not: null } },
          ],
        },
      });

      const activityMetrics = [
        { metric: 'Total Users', value: totalUsers },
        { metric: 'Verified Users', value: verifiedUsers },
        { metric: 'Complete Profiles', value: activeProfiles },
      ];

      return res.status(200).json({
        userGrowth,
        usersByRole: formattedUsersByRole,
        activityMetrics,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}