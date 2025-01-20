import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';
import { UserRole } from '@prisma/client';
import prisma from '../../lib/prisma';

// Dashboard components
import InvestmentSummary from '../../components/dashboard/InvestmentSummary';
import QuickActions from '../../components/dashboard/QuickActions';
import RecentActivity from '../../components/dashboard/RecentActivity';

interface DashboardProps {
  investments: Array<{
    id: string;
    type: string;
    amount: number;
    date: string;
  }>;
  totalInvestmentValue: number;
  recentActivities: Array<{
    id: string;
    type: string;
    description: string;
    date: string;
  }>;
}

const Dashboard: React.FC<DashboardProps> = ({
  investments,
  totalInvestmentValue,
  recentActivities
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Financial Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InvestmentSummary 
          investments={investments}
          totalValue={totalInvestmentValue}
        />
        <QuickActions />
        <RecentActivity activities={recentActivities} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  // Fetch user investments and recent activities
  const investments = await prisma.investment.findMany({
    where: { userId: session.user.id },
    take: 5,
    orderBy: { date: 'desc' }
  });

  const totalInvestmentValue = await prisma.investment.aggregate({
    where: { userId: session.user.id },
    _sum: { amount: true }
  });

  const recentActivities = await prisma.userActivity.findMany({
    where: { userId: session.user.id },
    take: 5,
    orderBy: { createdAt: 'desc' }
  });

  return {
    props: {
      investments: investments.map(inv => ({
        ...inv,
        date: inv.date.toISOString()
      })),
      totalInvestmentValue: totalInvestmentValue._sum.amount?.toNumber() || 0,
      recentActivities: recentActivities.map(act => ({
        ...act,
        date: act.createdAt.toISOString()
      }))
    }
  };
};

export default Dashboard;