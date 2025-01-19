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
      // Get user growth data (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const userGrowth = await prisma.$queryRaw`
        SELECT 
          DATE("createdAt") as date,
          COUNT(*) as count
        FROM "User"
        WHERE "createdAt" >= ${thirtyDaysAgo}
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

      // Get user engagement metrics
      const activeUsersLast7Days = await prisma.user.count({
        where: {
          lastLogin: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      });

      const activeUsersLast30Days = await prisma.user.count({
        where: {
          lastLogin: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        }
      });

      // Get risk profile distribution
      const riskProfiles = await prisma.profile.groupBy({
        by: ['riskProfile'],
        _count: true,
        where: {
          riskProfile: { not: null }
        }
      });

      // Get profile completion rate
      const totalUsers = await prisma.user.count();
      const usersWithCompleteProfiles = await prisma.profile.count({
        where: {
          AND: [
            { phoneNumber: { not: null } },
            { address: { not: null } },
            { riskProfile: { not: null } },
            { investmentGoals: { not: null } }
          ]
        }
      });

      const profileCompletionRate = (usersWithCompleteProfiles / totalUsers) * 100;

      // Get geographical distribution
      const usersByState = await prisma.profile.groupBy({
        by: ['state'],
        _count: true,
        where: {
          state: { not: null }
        }
      });

      // Get notification engagement
      const notificationStats = await prisma.$queryRaw`
        SELECT 
          type,
          COUNT(*) as total,
          SUM(CASE WHEN read = true THEN 1 ELSE 0 END) as read_count
        FROM "Notification"
        GROUP BY type
      `;

      // Format the response data
      const activityMetrics = [
        { metric: 'Total Users', value: totalUsers },
        { metric: 'Active Users (7 Days)', value: activeUsersLast7Days },
        { metric: 'Active Users (30 Days)', value: activeUsersLast30Days },
        { metric: 'Profile Completion Rate', value: `${profileCompletionRate.toFixed(1)}%` },
        { metric: 'Complete Profiles', value: usersWithCompleteProfiles },
      ];

      return res.status(200).json({
        userGrowth,
        usersByRole: usersByRole.map(item => ({
          role: item.role,
          count: item._count.role,
        })),
        activityMetrics,
        riskProfiles,
        usersByState,
        notificationStats,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}