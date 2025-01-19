export default function RecentActivity() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow transition-colors duration-200">
      <div className="p-6">
        <h3 className="text-lg font-medium dark:text-white">Recent Activity</h3>
        <div className="mt-6 space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex justify-between items-center border-b dark:border-slate-700 pb-4"
            >
              <div>
                <p className="font-medium dark:text-white">{activity.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</p>
              </div>
              {activity.amount && (
                <span className="text-gray-900 dark:text-gray-100 font-medium">
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