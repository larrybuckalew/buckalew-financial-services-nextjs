import DashboardLayout from '@/components/layout/DashboardLayout';
import NotificationCenter from '@/components/notifications/NotificationCenter';

export default function Notifications() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Notifications</h1>
        <NotificationCenter />
      </div>
    </DashboardLayout>
  );
}