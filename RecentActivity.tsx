interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: Date;
}

export default function RecentActivity() {
  const activities: Activity[] = [
    // Sample activity data
    {
      id: '1',
      type: 'transaction',
      description: 'Deposit of $500',
      timestamp: new Date()
    }
  ];

  return (
    <div>
      {activities.map((activity) => (
        <div key={activity.id}>
          {activity.description}
        </div>
      ))}
    </div>
  );
}