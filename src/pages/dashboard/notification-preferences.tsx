import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface NotificationPreferences {
  email: {
    PROFILE_UPDATE: boolean;
    INVESTMENT_UPDATE: boolean;
    SECURITY_ALERT: boolean;
    SYSTEM_UPDATE: boolean;
    ADVISOR_MESSAGE: boolean;
    MEETING_REMINDER: boolean;
  };
  push: {
    PROFILE_UPDATE: boolean;
    INVESTMENT_UPDATE: boolean;
    SECURITY_ALERT: boolean;
    SYSTEM_UPDATE: boolean;
    ADVISOR_MESSAGE: boolean;
    MEETING_REMINDER: boolean;
  };
}

const NOTIFICATION_GROUPS = [
  {
    id: 'PROFILE_UPDATE',
    title: 'Profile Updates',
    description: 'Changes to your account and profile information'
  },
  {
    id: 'INVESTMENT_UPDATE',
    title: 'Investment Updates',
    description: 'Updates about your investments and portfolio changes'
  },
  {
    id: 'SECURITY_ALERT',
    title: 'Security Alerts',
    description: 'Important security notifications and alerts'
  },
  {
    id: 'SYSTEM_UPDATE',
    title: 'System Updates',
    description: 'System maintenance and feature updates'
  },
  {
    id: 'ADVISOR_MESSAGE',
    title: 'Advisor Messages',
    description: 'Messages from your financial advisor'
  },
  {
    id: 'MEETING_REMINDER',
    title: 'Meeting Reminders',
    description: 'Reminders about upcoming meetings'
  }
];

export default function NotificationPreferencesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await fetch('/api/user/notification-preferences');
        if (response.ok) {
          const data = await response.json();
          setPreferences(data.preferences);
        }
      } catch (error) {
        console.error('Error fetching preferences:', error);
        setError('Failed to load preferences');
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchPreferences();
    }
  }, [session]);

  const handleToggle = (channel: 'email' | 'push', type: string) => {
    if (!preferences) return;

    setPreferences(prev => ({
      ...prev!,
      [channel]: {
        ...prev![channel],
        [type]: !prev![channel][type as keyof typeof prev.email]
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/user/notification-preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences }),
      });

      if (!response.ok) {
        throw new Error('Failed to save preferences');
      }

      setSuccess(true);
    } catch (error) {
      console.error('Error saving preferences:', error);
      setError('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading' || loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6">
                <AlertDescription>Preferences saved successfully</AlertDescription>
              </Alert>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <h3 className="text-lg font-medium">Notification Channels</h3>
                    <p className="text-sm text-gray-500">
                      Choose how you want to receive different types of notifications
                    </p>
                  </div>
                </div>

                {NOTIFICATION_GROUPS.map((group) => (
                  <div key={group.id} className="space-y-4">
                    <div>
                      <h4 className="font-medium">{group.title}</h4>
                      <p className="text-sm text-gray-500">{group.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive updates via email</p>
                        </div>
                        <Switch
                          checked={preferences?.email[group.id as keyof typeof preferences.email] ?? false}
                          onCheckedChange={() => handleToggle('email', group.id)}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-gray-500">Receive browser notifications</p>
                        </div>
                        <Switch
                          checked={preferences?.push[group.id as keyof typeof preferences.push] ?? false}
                          onCheckedChange={() => handleToggle('push', group.id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => router.push('/dashboard')}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Preferences'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}