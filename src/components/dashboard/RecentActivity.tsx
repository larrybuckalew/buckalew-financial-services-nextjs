interface Activity {
  id: string;
  type: string;
  description: string;
  date: string;
  amount?: number;
}

export default function RecentActivity() {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'calculation',
      description: 'Loan calculation performed',
      date: '2025-01-18',
      amount: 250000
    },
    {
      id: '2',
      type: 'investment',
      description: 'Investment projection updated',
      date: '2025-01-17',
      amount: 100000
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h3 className="text-lg font-medium">Recent Activity</h3>
        <div className="mt-6 space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex justify-between items-center border-b pb-4">
              <div>
                <p className="font-medium">{activity.description}</p>
                <p className="text-sm text-gray-500">{activity.date}</p>
              </div>
              {activity.amount && (
                <span className="text-gray-900 font-medium">
                  ${activity.amount.toLocaleString()}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}