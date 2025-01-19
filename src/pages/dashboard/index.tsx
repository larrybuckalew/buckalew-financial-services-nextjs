import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MortgageCalculator } from '@/components/MortgageCalculator';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {session.user.name || 'User'}
          </h1>
          <Button
            onClick={() => router.push('/dashboard/profile')}
            variant="outline"
          >
            Profile Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Email: {session.user.email}</p>
              <p className="text-gray-600">Role: {session.user.role}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                onClick={() => router.push('/dashboard/mortgage-calculator')}
                className="w-full"
              >
                Mortgage Calculator
              </Button>
              <Button
                onClick={() => router.push('/dashboard/investment-planner')}
                className="w-full"
              >
                Investment Planner
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">No recent activity</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <MortgageCalculator />
        </div>
      </div>
    </div>
  );
}