import { useState, useEffect } from 'react';
import { WebSocketClient } from '@/lib/websocket';

const wsClient = new WebSocketClient(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001');

export function useNotifications() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
    wsClient.connect();

    wsClient.on('notification', (notification) => {
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
    });

    return () => {
      wsClient.off('notification', () => {});
    };
  }, []);

  const fetchNotifications = async () => {
    const res = await fetch('/api/notifications');
    const data = await res.json();
    setNotifications(data);
    setUnreadCount(data.filter(n => !n.read).length);
  };

  return { unreadCount, notifications, refetch: fetchNotifications };
}