import prisma from '@/lib/prisma';

export async function getUserDashboardData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      financialProfile: true,
      calculations: {
        orderBy: { createdAt: 'desc' },
        take: 5
      }
    }
  });

  return user;
}