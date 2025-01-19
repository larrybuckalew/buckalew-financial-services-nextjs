import DashboardLayout from '@/components/layout/DashboardLayout';
import OverviewCard from '@/components/dashboard/OverviewCard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  const metrics = [
    { title: 'Total Assets', value: '$450,000', change: 12.5 },
    { title: 'Monthly Savings', value: '$2,500', change: 5.2 },
    { title: 'Loan Progress', value: '45%', change: 2.1 },
    { title: 'Investment Return', value: '8.5%', change: -0.3 }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <OverviewCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          {/* Add more dashboard widgets here */}
        </div>
      </div>
    </DashboardLayout>
  );
}