import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
  };
  dashboardLayout: any;
}

export default function UserPreferences() {
  const { data: session } = useSession();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      const response = await fetch('/api/users/preferences');
      const data = await response.json();
      setPreferences(data);
    } catch (error) {
      console.error('Failed to fetch preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (newPreferences: Partial<UserPreferences>) => {
    try {
      const response = await fetch('/api/users/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPreferences),
      });
      const data = await response.json();
      setPreferences(data);
    } catch (error) {
      console.error('Failed to update preferences:', error);
    }
  };

  if (loading) return <div>Loading preferences...</div>;
  if (!preferences) return <div>No preferences found</div>;

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold">User Preferences</h2>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Theme</h3>
        <select
          value={preferences.theme}
          onChange={(e) => updatePreferences({ theme: e.target.value as 'light' | 'dark' })}
          className="w-full p-2 border rounded"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Language</h3>
        <select
          value={preferences.language}
          onChange={(e) => updatePreferences({ language: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Notifications</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.notifications.email}
              onChange={(e) => updatePreferences({
                notifications: {
                  ...preferences.notifications,
                  email: e.target.checked,
                },
              })}
              className="mr-2"
            />
            Email Notifications
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.notifications.push}
              onChange={(e) => updatePreferences({
                notifications: {
                  ...preferences.notifications,
                  push: e.target.checked,
                },
              })}
              className="mr-2"
            />
            Push Notifications
          </label>
        </div>
      </div>
    </div>
  );
}