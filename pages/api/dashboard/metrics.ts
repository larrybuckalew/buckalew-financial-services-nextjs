import { withErrorHandler } from '@/middleware/errorHandler';
import prisma from '@/lib/prisma';
import { authenticateUser } from '@/lib/auth';

export default withErrorHandler(async (req, res) => {
  const user = await authenticateUser(req, res);
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  // Get user's financial data points
  const metrics = await prisma.financialMetric.findMany({
    where: { userId: user.id },
    orderBy: { date: 'asc' },
    take: 12 // Last 12 months
  });

  // Format data for the chart
  const formattedData = metrics.map(metric => ({
    date: metric.date.toISOString().split('T')[0],
    assets: metric.totalAssets,
    savings: metric.monthlySavings,
    returns: metric.investmentReturns
  }));

  res.json(formattedData);
});