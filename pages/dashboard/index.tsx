import DashboardLayout from '@/components/layout/DashboardLayout';
import OverviewCard from '@/components/dashboard/OverviewCard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import MetricsChart from '@/components/dashboard/MetricsChart';
import GoalsProgress from '@/components/dashboard/GoalsProgress';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [metricsData, setMetricsData] = useState([]);

  useEffect(() => {
    fetch('/api/dashboard/metrics')
      .then(res => res.json())
      .then(data => setMetricsData(data));
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Overview cards */}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MetricsChart data={metricsData} />
          <GoalsProgress />
        </div>
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
}