import React, { useState } from 'react';
const NotificationCenter = () => {
    const [notifications, setNotifications] = useState([]);
    const addNotification = (notification) => {
        setNotifications(prev => [...prev, notification]);
    };
    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };
    return (<div className="notification-center">
      {notifications.map(notification => (<div key={notification.id} className={`notification notification-${notification.type}`} onClick={() => removeNotification(notification.id)}>
          {notification.message}
        </div>))}
    </div>);
};
export default NotificationCenter;
