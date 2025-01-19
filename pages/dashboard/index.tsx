import DashboardLayout from '@/components/layout/DashboardLayout';
import Head from 'next/head';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard - Buckalew Financial</title>
      </Head>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome, {user?.name || 'User'}!</h1>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Dashboard cards will go here */}
        </div>
      </div>
    </DashboardLayout>
  );
}