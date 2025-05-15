
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { User, Edit, Filter, Check, X, Loader2, Search, User as UserIcon, Plus } from 'lucide-react';

interface UserFilters {
  status: 'all' | 'active' | 'inactive' | 'suspended';
  role: 'all' | 'user' | 'admin' | 'customer';
  search: string;
}

const UserManagement = () => {
  const { user, requireAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [filters, setFilters] = useState<UserFilters>({
    status: 'all',
    role: 'all',
    search: '',
  });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  // Check if admin
  useEffect(() => {
    requireAuth('admin');
  }, [requireAuth]);

  // Get mock users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Get users from mock data in window.mockUsers
        // @ts-ignore
        const mockUsers = window.mockUsers || [];
        setUsers(mockUsers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on filters
  const filteredUsers = users.filter(user => {
    // Status filter
    if (filters.status !== 'all' && user.status !== filters.status) {
      return false;
    }

    // Role filter
    if (filters.role !== 'all' && user.role !== filters.role) {
      return false;
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const nameMatch = user.name?.toLowerCase().includes(searchLower);
      const emailMatch = user.email?.toLowerCase().includes(searchLower);
      if (!nameMatch && !emailMatch) {
        return false;
      }
    }

    return true;
  });

  const handleFilterChange = (key: keyof UserFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleEditUser = (user: any) => {
    setCurrentUser({ ...user });
    setIsEditDialogOpen(true);
  };

  const handleSaveUser = () => {
    if (!currentUser) return;

    // Update user in the list
    setUsers(prevUsers =>
      prevUsers.map(u => (u.id === currentUser.id ? currentUser : u))
    );

    // Also update in window.mockUsers
    // @ts-ignore
    if (window.mockUsers) {
      // @ts-ignore
      window.mockUsers = window.mockUsers.map(u => (u.id === currentUser.id ? currentUser : u));
    }

    setIsEditDialogOpen(false);
    toast.success('User updated successfully');
  };

  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;

    // Remove user from the list
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete));

    // Also remove from window.mockUsers
    // @ts-ignore
    if (window.mockUsers) {
      // @ts-ignore
      window.mockUsers = window.mockUsers.filter(u => u.id !== userToDelete);
    }

    setIsDeleteDialogOpen(false);
    setUserToDelete(null);
    toast.success('User deleted successfully');
  };

  const handleCreateUser = () => {
    const newUser = {
      id: `user-${Date.now()}`,
      name: 'New User',
      email: 'newuser@example.com',
      role: 'user',
      avatar: 'https://i.pravatar.cc/150?u=new',
      status: 'active',
      orders: 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, newUser]);

    // Also add to window.mockUsers
    // @ts-ignore
    if (window.mockUsers) {
      // @ts-ignore
      window.mockUsers = [...window.mockUsers, newUser];
    }

    toast.success('New user created');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button onClick={handleCreateUser}>
          <Plus className="h-4 w-4 mr-2" /> Add User
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-md flex items-center">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name or email"
                value={filters.search}
                onChange={handleSearchChange}
                className="w-full"
                icon={<Search className="h-4 w-4 mr-2" />}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                value={filters.role}
                onValueChange={value => handleFilterChange('role', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-48">
              <Select
                value={filters.status}
                onValueChange={value => handleFilterChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              onClick={() =>
                setFilters({
                  status: 'all',
                  role: 'all',
                  search: '',
                })
              }
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">ID</TableHead>
                  <TableHead className="w-[250px]">Name/Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id.split('-')[1]}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden">
                            <img
                              src={user.avatar || `https://i.pravatar.cc/150?u=${user.id}`}
                              alt={user.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://i.pravatar.cc/150";
                              }}
                            />
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.role === 'admin'
                              ? 'default'
                              : user.role === 'customer'
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              user.status === 'active'
                                ? 'bg-green-500'
                                : user.status === 'inactive'
                                ? 'bg-gray-400'
                                : 'bg-red-500'
                            }`}
                          />
                          <span className="capitalize">{user.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.lastLogin || 'Never'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(user.id)}
                            disabled={user.id === 'admin-1'} // Prevent deleting main admin
                            className={user.id === 'admin-1' ? 'opacity-50 cursor-not-allowed' : ''}
                          >
                            <X className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <div>
              Showing {filteredUsers.length} of {users.length} users
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      {currentUser && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>Make changes to user details below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  value={currentUser.name || ''}
                  onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  value={currentUser.email || ''}
                  onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Role
                  </label>
                  <Select
                    value={currentUser.role}
                    onValueChange={(value) => setCurrentUser({ ...currentUser, role: value })}
                    disabled={currentUser.id === 'admin-1'} // Prevent changing main admin role
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="status" className="text-sm font-medium">
                    Status
                  </label>
                  <Select
                    value={currentUser.status}
                    onValueChange={(value) => setCurrentUser({ ...currentUser, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </label>
                <Input
                  id="phone"
                  value={currentUser.phone || ''}
                  onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveUser}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete User Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
