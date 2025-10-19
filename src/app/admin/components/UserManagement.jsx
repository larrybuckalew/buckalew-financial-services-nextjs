'use client';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        email: '',
        roleId: '',
        status: ''
    });
    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);
    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users', {
                headers: {
                    'Authorization': `Bearer ${document.cookie.match(/auth-token=([^;]+)/)?.[1]}`
                }
            });
            if (!response.ok)
                throw new Error('Failed to fetch users');
            const data = await response.json();
            setUsers(data);
        }
        catch (error) {
            console.error('Error fetching users:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const fetchRoles = async () => {
        try {
            const response = await fetch('/api/users/roles', {
                headers: {
                    'Authorization': `Bearer ${document.cookie.match(/auth-token=([^;]+)/)?.[1]}`
                }
            });
            if (!response.ok)
                throw new Error('Failed to fetch roles');
            const data = await response.json();
            setRoles(data);
        }
        catch (error) {
            console.error('Error fetching roles:', error);
        }
    };
    const handleEditUser = (user) => {
        setSelectedUser(user);
        setEditForm({
            name: user.name,
            email: user.email,
            roleId: user.role.id,
            status: user.status
        });
        setShowEditDialog(true);
    };
    const handleUpdateUser = async () => {
        if (!selectedUser)
            return;
        try {
            const response = await fetch(`/api/users/${selectedUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${document.cookie.match(/auth-token=([^;]+)/)?.[1]}`
                },
                body: JSON.stringify(editForm)
            });
            if (!response.ok)
                throw new Error('Failed to update user');
            const updatedUser = await response.json();
            setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
            setShowEditDialog(false);
        }
        catch (error) {
            console.error('Error updating user:', error);
        }
    };
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()));
    if (loading) {
        return (<div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (<div key={i} className="h-12 bg-gray-200 rounded"></div>))}
        </div>
      </div>);
    }
    return (<div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="max-w-sm"/>
        <Button onClick={() => { }}>
          Add User
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (<TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role.name}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded text-sm ${user.status === 'active' ? 'bg-green-100 text-green-800' :
                user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'}`}>
                  {user.status}
                </span>
              </TableCell>
              <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button variant="ghost" onClick={() => handleEditUser(user)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>))}
        </TableBody>
      </Table>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}/>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}/>
            </div>
            <div>
              <label className="text-sm font-medium">Role</label>
              <Select value={editForm.roleId} onValueChange={(value) => setEditForm({ ...editForm, roleId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role"/>
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (<SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select value={editForm.status} onValueChange={(value) => setEditForm({ ...editForm, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateUser}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>);
}
