import { useEffect, useState } from 'react';
import { useAuth } from '@/AuthContext';
import { withPermission } from '@/lib/rbac';

interface User {
  id: string;
  name: string;
  email: string;
  role: {
    id: string;
    name: string;
  };
}

interface Role {
  id: string;
  name: string;
}

function AdminPanel() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users and roles
        const [usersResponse, rolesResponse] = await Promise.all([
          fetch('/api/users', {
            headers: {
              'Authorization': `Bearer ${document.cookie.match(/auth-token=([^;]+)/)?.[1]}`
            }
          }),
          fetch('/api/users/roles', {
            headers: {
              'Authorization': `Bearer ${document.cookie.match(/auth-token=([^;]+)/)?.[1]}`
            }
          })
        ]);

        if (!usersResponse.ok || !rolesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const [usersData, rolesData] = await Promise.all([
          usersResponse.json(),
          rolesResponse.json()
        ]);

        setUsers(usersData);
        setRoles(rolesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRoleChange = async (userId: string, roleId: string) => {
    try {
      const response = await fetch('/api/users/roles', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${document.cookie.match(/auth-token=([^;]+)/)?.[1]}`
        },
        body: JSON.stringify({ userId, roleId })
      });

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      const updatedUser = await response.json();
      setUsers(users.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update role');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">User Management</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={user.role.id}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-blue-600 hover:text-blue-900"
                    onClick={() => {/* Add edit user handler */}}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Export with admin permission check
export default withPermission(AdminPanel, 'manage_users');