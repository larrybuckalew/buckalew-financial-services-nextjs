import { useState, useCallback } from 'react';
export function useNotifications() {
    const [notifications, setNotifications] = useState([]);
    const addNotification = useCallback((message, type = 'info') => {
        const id = Math.random().toString(36).substr(2, 9);
        setNotifications(prev => [...prev, { id, message, type }]);
    }, []);
    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, []);
    return {
        notifications,
        addNotification,
        removeNotification,
    };
}
