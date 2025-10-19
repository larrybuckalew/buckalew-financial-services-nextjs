import { generatePageMetadata } from '@/lib/seo';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
export const metadata = generatePageMetadata({
    title: 'Admin Dashboard',
    description: 'Administrative management and overview',
    keywords: ['admin', 'dashboard', 'management'],
    path: '/admin/dashboard'
});
export default function AdminDashboardPage() {
    return (<ProtectedRoute requiredRole="ADMIN">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-primary">
          Admin Dashboard
        </h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">User Management</h2>
            <p>Total Users: 150</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Policy Overview</h2>
            <p>Active Policies: 300</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Recent Quotes</h2>
            <p>Pending Quotes: 25</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>);
}
