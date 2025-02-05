import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface Activity {
  id: string;
  type: string;
  description: string;
  date: string;
  amount?: number;
}

export default function RecentActivity() {
  const { data: session } = useSession();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/activities');
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    if (session) {
      fetchActivities();
    }
  }, [session]);

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Recent Activity
        </h3>
        <div className="mt-5">
          <div className="flow-root">
            <ul className="-my-4 divide-y divide-gray-200">
              {activities.map((activity) => (
                <li key={activity.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.type}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(activity.date).toLocaleDateString()}
                      </p>
                    </div>
                    {activity.amount && (
                      <div className="flex-shrink-0">
                        <span className="text-sm font-medium text-gray-900">
                          ${activity.amount.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6">
        <div className="text-sm">
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            View all activity
          </a>
        </div>
      </div>
    </div>
  );
}