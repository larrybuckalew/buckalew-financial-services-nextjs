export function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Total Quotes</h3>
        <p className="text-2xl font-semibold mt-2">1,234</p>
        <span className="text-green-600 text-sm">↑ 12% from last month</span>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Active Policies</h3>
        <p className="text-2xl font-semibold mt-2">856</p>
        <span className="text-green-600 text-sm">↑ 8% from last month</span>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Monthly Revenue</h3>
        <p className="text-2xl font-semibold mt-2">$45,678</p>
        <span className="text-green-600 text-sm">↑ 15% from last month</span>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Pending Tasks</h3>
        <p className="text-2xl font-semibold mt-2">23</p>
        <span className="text-red-600 text-sm">↑ 4 new tasks</span>
      </div>
    </div>
  )
}