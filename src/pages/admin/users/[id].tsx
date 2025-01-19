import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  emailVerified: boolean;
  active: boolean;
  profile: {
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
}

export default function UserEditPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (id) {
          const response = await fetch(`/api/admin/users/${id}`);
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.role === 'ADMIN' && id) {
      fetchUser();
    }
  }, [session, id]);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: user?.role,
          emailVerified: user?.emailVerified,
          active: user?.active,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      setSuccess(true);
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user');
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading' || loading) {
    return <div>Loading...</div>;
  }

  if (!session || session.user.role !== 'ADMIN') {
    router.push('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Edit User</CardTitle>
              <Button
                variant="outline"
                onClick={() => router.push('/admin/users')}
              >
                Back to Users
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6">
                <AlertDescription>User updated successfully</AlertDescription>
              </Alert>
            )}

            {user && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <p className="mt-1 text-sm text-gray-900">{user.name || 'N/A'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <Select
                      value={user.role}
                      onValueChange={(value) =>
                        setUser((prev) => ({ ...prev!, role: value }))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USER">User</SelectItem>
                        <SelectItem value="ADVISOR">Advisor</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <Select
                      value={user.active ? 'active' : 'inactive'}
                      onValueChange={(value) =>
                        setUser((prev) => ({
                          ...prev!,
                          active: value === 'active',
                        }))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email Verification
                    </label>
                    <Select
                      value={user.emailVerified ? 'verified' : 'unverified'}
                      onValueChange={(value) =>
                        setUser((prev) => ({
                          ...prev!,
                          emailVerified: value === 'verified',
                        }))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="unverified">Unverified</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {user.profile?.phoneNumber || 'N/A'}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {user.profile?.address || 'N/A'}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {user.profile?.city || 'N/A'}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {user.profile?.state || 'N/A'}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        ZIP Code
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {user.profile?.zip || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => router.push('/admin/users')}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}