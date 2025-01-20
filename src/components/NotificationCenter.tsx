import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react';

// Notification type icons
const NotificationIcons = {
  INVESTMENT: Bell,
  ACCOUNT: CheckCircle,
  WARNING: AlertTriangle,
  INFO: Info
};

// Color mapping for notification types
const NotificationColors = {
  INVESTMENT: 'text-blue-500',
  ACCOUNT: 'text-green-500',
  WARNING: 'text-yellow-500',
  INFO: 'text-gray-500'
};

interface Notification {
  id: string;
  type: keyof typeof NotificationIcons;
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/notifications');
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId: string) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId })
      });

      if (!response.ok) {
        throw new Error('Failed to mark notification as read');
      }

      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, isRead: true } 
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100"
      >
        <Bell className="h-6 w-6 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={() => notifications.forEach(n => !n.isRead && markAsRead(n.id))}
                className="text-sm text-blue-500 hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No notifications</div>
          ) : (
            <ul className="divide-y">
              {notifications.map(notification => {
                const Icon = NotificationIcons[notification.type];
                const iconColor = NotificationColors[notification.type];

                return (
                  <li 
                    key={notification.id} 
                    className={`p-4 flex items-start hover:bg-gray-50 cursor-pointer
                      ${!notification.isRead ? 'bg-blue-50' : ''}
                    `}
                    onClick={() => {
                      if (!notification.isRead) {
                        markAsRead(notification.id);
                      }
                    }}
                  >
                    <div className="mr-3">
                      <Icon className={`h-6 w-6 ${iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{notification.title}</h4>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <span className="text-xs text-gray-500 mt-1 block">
                        {new Date(notification.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;