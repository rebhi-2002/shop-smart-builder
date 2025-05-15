
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, Edit, Trash2, UserCog } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  status: 'active' | 'inactive';
  joinDate: string;
  phone?: string;
  address?: string;
  bio?: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active', joinDate: '2025-01-15', phone: '123-456-7890', bio: 'System Administrator' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'customer', status: 'active', joinDate: '2025-02-20', phone: '234-567-8901', bio: 'Regular customer' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'customer', status: 'inactive', joinDate: '2025-03-10', phone: '345-678-9012', bio: 'Occasional buyer' },
  { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: 'customer', status: 'active', joinDate: '2025-03-15', phone: '456-789-0123', bio: 'Frequent shopper' },
  { id: '5', name: 'Alex Brown', email: 'alex@example.com', role: 'admin', status: 'active', joinDate: '2025-04-01', phone: '567-890-1234', bio: 'Content Manager' },
];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'customer'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<Partial<User>>({});
  const [permissionsData, setPermissionsData] = useState({
    viewDashboard: false,
    manageProducts: false,
    manageOrders: false,
    manageUsers: false,
    viewReports: false,
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
      toast.success('User deleted successfully');
    }
  };
  
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({...user});
    setIsEditDialogOpen(true);
  };
  
  const handleAddUser = () => {
    setFormData({
      role: 'customer',
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0]
    });
    setIsAddDialogOpen(true);
  };
  
  const handleManagePermissions = (user: User) => {
    setSelectedUser(user);
    setPermissionsData({
      viewDashboard: user.role === 'admin',
      manageProducts: user.role === 'admin',
      manageOrders: user.role === 'admin',
      manageUsers: user.role === 'admin',
      viewReports: user.role === 'admin',
    });
    setIsPermissionsDialogOpen(true);
  };
  
  const handleSaveEdit = () => {
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }
    
    setUsers(prevUsers => prevUsers.map(user => 
      user.id === selectedUser?.id ? { ...user, ...formData as User } : user
    ));
    
    setIsEditDialogOpen(false);
    toast.success('User updated successfully');
  };
  
  const handleSaveNewUser = () => {
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: formData.name || '',
      email: formData.email || '',
      role: formData.role as 'admin' | 'customer' || 'customer',
      status: formData.status as 'active' | 'inactive' || 'active',
      joinDate: formData.joinDate || new Date().toISOString().split('T')[0],
      phone: formData.phone,
      bio: formData.bio
    };
    
    setUsers([...users, newUser]);
    setIsAddDialogOpen(false);
    toast.success('New user added successfully');
  };
  
  const handleSavePermissions = () => {
    if (!selectedUser) return;
    
    // In a real app, this would update permissions in the database
    const hasAdminPermissions = Object.values(permissionsData).some(value => value);
    
    setUsers(prevUsers => prevUsers.map(user => 
      user.id === selectedUser.id 
        ? { ...user, role: hasAdminPermissions ? 'admin' : 'customer' } 
        : user
    ));
    
    setIsPermissionsDialogOpen(false);
    toast.success('User permissions updated successfully');
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const toggleUserStatus = (id: string) => {
    setUsers(prevUsers => prevUsers.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } 
        : user
    ));
    
    toast.success('User status updated');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-500">Manage all users and their permissions</p>
        </div>
        <Button onClick={handleAddUser}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users by name or email"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Role Filter */}
          <select
            className="px-3 py-2 rounded-md border border-gray-200"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as 'all' | 'admin' | 'customer')}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>

          {/* Status Filter */}
          <select
            className="px-3 py-2 rounded-md border border-gray-200"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === 'active' ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleManagePermissions(user)}>
                        <UserCog className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Make changes to the user account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">Email</label>
              <Input
                id="email"
                name="email"
                value={formData.email || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="phone" className="text-right">Phone</label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="role" className="text-right">Role</label>
              <select 
                id="role" 
                name="role"
                value={formData.role || 'customer'} 
                onChange={handleInputChange}
                className="col-span-3 px-3 py-2 rounded-md border border-gray-200"
              >
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right">Status</label>
              <select 
                id="status" 
                name="status"
                value={formData.status || 'active'} 
                onChange={handleInputChange}
                className="col-span-3 px-3 py-2 rounded-md border border-gray-200"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="bio" className="text-right">Bio</label>
              <Input
                id="bio"
                name="bio"
                value={formData.bio || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">Email</label>
              <Input
                id="email"
                name="email"
                value={formData.email || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="phone" className="text-right">Phone</label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="role" className="text-right">Role</label>
              <select 
                id="role" 
                name="role"
                value={formData.role || 'customer'} 
                onChange={handleInputChange}
                className="col-span-3 px-3 py-2 rounded-md border border-gray-200"
              >
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right">Status</label>
              <select 
                id="status" 
                name="status"
                value={formData.status || 'active'} 
                onChange={handleInputChange}
                className="col-span-3 px-3 py-2 rounded-md border border-gray-200"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="bio" className="text-right">Bio</label>
              <Input
                id="bio"
                name="bio"
                value={formData.bio || ''}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveNewUser}>Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Permissions Dialog */}
      <Dialog open={isPermissionsDialogOpen} onOpenChange={setIsPermissionsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Permissions</DialogTitle>
            <DialogDescription>
              Set permissions for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="viewDashboard" 
                checked={permissionsData.viewDashboard} 
                onCheckedChange={(checked) => 
                  setPermissionsData({...permissionsData, viewDashboard: !!checked})
                }
              />
              <label htmlFor="viewDashboard">Access Dashboard</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="manageProducts" 
                checked={permissionsData.manageProducts} 
                onCheckedChange={(checked) => 
                  setPermissionsData({...permissionsData, manageProducts: !!checked})
                }
              />
              <label htmlFor="manageProducts">Manage Products</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="manageOrders" 
                checked={permissionsData.manageOrders} 
                onCheckedChange={(checked) => 
                  setPermissionsData({...permissionsData, manageOrders: !!checked})
                }
              />
              <label htmlFor="manageOrders">Manage Orders</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="manageUsers" 
                checked={permissionsData.manageUsers} 
                onCheckedChange={(checked) => 
                  setPermissionsData({...permissionsData, manageUsers: !!checked})
                }
              />
              <label htmlFor="manageUsers">Manage Users</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="viewReports" 
                checked={permissionsData.viewReports} 
                onCheckedChange={(checked) => 
                  setPermissionsData({...permissionsData, viewReports: !!checked})
                }
              />
              <label htmlFor="viewReports">View Reports</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPermissionsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSavePermissions}>Save Permissions</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">User Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold">{users.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Admins</p>
              <p className="text-2xl font-bold">{users.filter(u => u.role === 'admin').length}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Customers</p>
              <p className="text-2xl font-bold">{users.filter(u => u.role === 'customer').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <UserCog className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Role updated for Jane Smith</p>
                <p className="text-sm text-gray-500">Changed from Customer to Admin</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-4 border-b">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">New user registered</p>
                <p className="text-sm text-gray-500">Sarah Williams joined as Customer</p>
                <p className="text-xs text-gray-400 mt-1">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="font-medium">User account deleted</p>
                <p className="text-sm text-gray-500">Tom Wilson's account was removed</p>
                <p className="text-xs text-gray-400 mt-1">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
