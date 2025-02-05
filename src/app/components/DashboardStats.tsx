interface StatsCardProps {
  title: string;
  value: number;
  description: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function StatsCard({ title, value, description, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-3xl font-semibold text-gray-900">{value}</p>
        {trend && (
          <span className={`ml-2 text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}%
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}

export function DashboardStats({ data }) {
  const { users, posts, publishedPosts, verifiedUsers } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Users"
        value={users.total}
        description="Total registered users"
        trend={{ value: users.growth, isPositive: users.growth > 0 }}
      />
      <StatsCard
        title="Verified Users"
        value={verifiedUsers}
        description="Email verified users"
      />
      <StatsCard
        title="Total Posts"
        value={posts.total}
        description="All blog posts"
        trend={{ value: posts.growth, isPositive: posts.growth > 0 }}
      />
      <StatsCard
        title="Published Posts"
        value={publishedPosts}
        description="Active published posts"
      />
    </div>
  );
}