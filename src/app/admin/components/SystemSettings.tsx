'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';

interface SystemSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  supportEmail: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  notificationSettings: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    adminAlerts: boolean;
  };
  backupSettings: {
    autoBackup: boolean;
    backupFrequency: string;
    retentionDays: number;
  };
}

export default function SystemSettings() {
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: 'Buckalew Financial Services',
    siteDescription: 'Professional Financial & Insurance Services',
    contactEmail: 'contact@buckalewfinancial.com',
    supportEmail: 'support@buckalewfinancial.com',
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    notificationSettings: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      adminAlerts: true,
    },
    backupSettings: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionDays: 30,
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings', {
        headers: {
          'Authorization': `Bearer ${document.cookie.match(/auth-token=([^;]+)/)?.[1]}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch settings');
      
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.match(/auth-token=([^;]+)/)?.[1]}`
        },
        body: JSON.stringify(settings)
      });

      if (!response.ok) throw new Error('Failed to save settings');
      
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-20 bg-gray-200 rounded"></div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">General Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Site Name</label>
            <Input
              value={settings.siteName}
              onChange={(e) => setSettings({...settings, siteName: e.target.value})}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Site Description</label>
            <Input
              value={settings.siteDescription}
              onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Contact Email</label>
              <Input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Support Email</label>
              <Input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
            />
            <label className="text-sm font-medium">Maintenance Mode</label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={settings.allowRegistration}
              onCheckedChange={(checked) => setSettings({...settings, allowRegistration: checked})}
            />
            <label className="text-sm font-medium">Allow User Registration</label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={settings.requireEmailVerification}
              onCheckedChange={(checked) => setSettings({...settings, requireEmailVerification: checked})}
            />
            <label className="text-sm font-medium">Require Email Verification</label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Session Timeout (minutes)</label>
              <Input
                type="number"
                min="5"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Max Login Attempts</label>
              <Input
                type="number"
                min="1"
                value={settings.maxLoginAttempts}
                onChange={(e) => setSettings({...settings, maxLoginAttempts: parseInt(e.target.value)})}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={settings.notificationSettings.emailNotifications}
              onCheckedChange={(checked) => setSettings({
                ...settings,
                notificationSettings: {
                  ...settings.notificationSettings,
                  emailNotifications: checked
                }
              })}
            />
            <label className="text-sm font-medium">Email Notifications</label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={settings.notificationSettings.smsNotifications}
              onCheckedChange={(checked) => setSettings({
                ...settings,
                notificationSettings: {
                  ...settings.notificationSettings,
                  smsNotifications: checked
                }
              })}
            />
            <label className="text-sm font-medium">SMS Notifications</label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={settings.notificationSettings.pushNotifications}
              onCheckedChange={(checked) => setSettings({
                ...settings,
                notificationSettings: {
                  ...settings.notificationSettings,
                  pushNotifications: checked
                }
              })}
            />
            <label className="text-sm font-medium">Push Notifications</label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={settings.notificationSettings.adminAlerts}
              onCheckedChange={(checked) => setSettings({
                ...settings,
                notificationSettings: {
                  ...settings.notificationSettings,
                  adminAlerts: checked
                }
              })}
            />
            <label className="text-sm font-medium">Admin Alerts</label>
          </div>
        </div>
      </Card>

      {/* Backup Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Backup Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={settings.backupSettings.autoBackup}
              onCheckedChange={(checked) => setSettings({
                ...settings,
                backupSettings: {
                  ...settings.backupSettings,
                  autoBackup: checked
                }
              })}
            />
            <label className="text-sm font-medium">Automatic Backups</label>
          </div>
          
          <div>
            <label className="text-sm font-medium">Backup Frequency</label>
            <Select
              value={settings.backupSettings.backupFrequency}
              onValueChange={(value) => setSettings({
                ...settings,
                backupSettings: {
                  ...settings.backupSettings,
                  backupFrequency: value
                }
              })}
              disabled={!settings.backupSettings.autoBackup}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Retention Period (days)</label>
            <Input
              type="number"
              min="1"
              value={settings.backupSettings.retentionDays}
              onChange={(e) => setSettings({
                ...settings,
                backupSettings: {
                  ...settings.backupSettings,
                  retentionDays: parseInt(e.target.value)
                }
              })}
              disabled={!settings.backupSettings.autoBackup}
            />
          </div>
          
          <div className="pt-4">
            <Button
              variant="outline"
              onClick={() => {/* Handle manual backup */}}
            >
              Create Manual Backup
            </Button>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end space-x-4">
        <Button
          variant="outline"
          onClick={() => fetchSettings()}
        >
          Reset Changes
        </Button>
        <Button
          onClick={handleSaveSettings}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  );
}