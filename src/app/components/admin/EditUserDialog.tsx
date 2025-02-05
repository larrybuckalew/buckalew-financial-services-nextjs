import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  isEmailVerified: boolean;
  twoFactorEnabled: boolean;
}

interface EditUserDialogProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
}

export function EditUserDialog({
  user,
  isOpen,
  onClose,
  onUserUpdated,
}: EditUserDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    twoFactorEnabled: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        role: user.role,
        twoFactorEnabled: user.twoFactorEnabled,
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update user');
      }

      onUserUpdated();
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | boolean,
    field = ''
  ) => {
    if (typeof e === 'boolean') {
      setFormData(prev => ({ ...prev, [field]: e }));
    } else {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setError('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              value={user?.email || ''}
              disabled
              className="mt-1 bg-gray-50"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-1"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <Select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1"
            >
              <option value="ADMIN">Admin</option>
              <option value="AGENT">Agent</option>
              <option value="STAFF">Staff</option>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="twoFactorEnabled" className="text-sm font-medium text-gray-700">
              Two-Factor Authentication
            </label>
            <Switch
              id="twoFactorEnabled"
              checked={formData.twoFactorEnabled}
              onCheckedChange={(checked) => handleChange(checked, 'twoFactorEnabled')}
            />
          </div>

          {error && (
            <div className="text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}