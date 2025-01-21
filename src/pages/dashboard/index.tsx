import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function Dashboard() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Insurance Overview</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Active Policies</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Coverage</p>
                  <p className="text-2xl font-bold">$750,000</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Recent Activity</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="border-b pb-2">
                  <p className="text-sm text-gray-600">Premium Payment</p>
                  <p className="font-medium">Term Life Insurance</p>
                  <p className="text-sm text-gray-500">Jan 15, 2025</p>
                </li>
                <li className="border-b pb-2">
                  <p className="text-sm text-gray-600">Policy Review</p>
                  <p className="font-medium">Health Insurance</p>
                  <p className="text-sm text-gray-500">Jan 10, 2025</p>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Quick Actions</h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Get New Quote
                </button>
                <button className="w-full bg-white text-blue-600 border border-blue-600 py-2 px-4 rounded hover:bg-blue-50">
                  File Claim
                </button>
                <button className="w-full bg-white text-blue-600 border border-blue-600 py-2 px-4 rounded hover:bg-blue-50">
                  Contact Agent
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session
    }
  };
};