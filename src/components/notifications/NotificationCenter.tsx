import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const res = await fetch('/api/notifications');
    const data = await res.json();
    setNotifications(data);
  };

  const markAsRead = async (id: string) => {
    await fetch(`/api/notifications/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ read: true })
    });
    fetchNotifications();
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">Notifications</h3>
      </div>
      <div className="divide-y">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="flex justify-between">
              <span className="font-medium">{notification.title}</span>
              <span className="text-sm text-gray-500">
                {new Date(notification.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}