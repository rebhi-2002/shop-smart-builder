
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Filter, Search, MoreVertical, Users, UserPlus, Lock, Mail, Ban, CheckCircle, Star } from 'lucide-react';

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2025-05-12T14:32:21',
    orderCount: 12,
    totalSpent: 1245.50,
    createdAt: '2024-03-10T09:15:00',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'customer',
    status: 'active',
    lastLogin: '2025-05-11T09:45:12',
    orderCount: 8,
    totalSpent: 650.75,
    createdAt: '2024-04-05T14:22:00',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.j@example.com',
    role: 'customer',
    status: 'inactive',
    lastLogin: '2025-04-25T16:10:33',
    orderCount: 2,
    totalSpent: 175.25,
    createdAt: '2025-01-15T11:40:00',
    avatar: 'https://ui-avatars.com/api/?name=Robert+Johnson'
  },
  {
    id: '4',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    role: 'manager',
    status: 'active',
    lastLogin: '2025-05-10T13:22:45',
    orderCount: 0,
    totalSpent: 0,
    createdAt: '2025-05-01T09:30:00',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Brown'
  },
  {
    id: '5',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'customer',
    status: 'banned',
    lastLogin: '2025-03-15T10:05:17',
    orderCount: 1,
    totalSpent: 49.99,
    createdAt: '2024-12-12T16:50:00',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Davis'
  }
];

const UserManagement: React.FC = () => {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isViewUserOpen, setIsViewUserOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would be implemented here
    toast.info(`Searching for "${searchTerm}"`);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchTerm || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || user.status === statusFilter;
    const matchesRole = !roleFilter || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleStatusChange = (userId: string, newStatus: string) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? {...user, status: newStatus} : user
    );
    setUsers(updatedUsers);
    toast.success(`User status updated to ${newStatus}`);
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? {...user, role: newRole} : user
    );
    setUsers(updatedUsers);
    toast.success(`User role updated to ${newRole}`);
  };

  const handleDeleteUser = (userId: string) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    toast.success("User deleted successfully");
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsViewUserOpen(true);
  };

  // Format date to a readable format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">Inactive</Badge>;
      case 'banned':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Banned</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'admin':
        return <Badge className="bg-purple-500">Admin</Badge>;
      case 'manager':
        return <Badge className="bg-blue-500">Manager</Badge>;
      case 'customer':
        return <Badge variant="outline">Customer</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="p-6">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground">Manage your users and their permissions</p>
          </div>
          <Button onClick={() => setIsAddUserOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" /> Add New User
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">+5% increase</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">-2 compared to last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$85.45</div>
            <p className="text-xs text-muted-foreground">Per active user</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-md shadow mb-8">
        <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <form onSubmit={handleSearch} className="flex w-full sm:w-auto">
            <Input
              type="search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-80 rounded-r-none"
            />
            <Button type="submit" className="rounded-l-none">
              <Search className="h-4 w-4 mr-2" /> Search
            </Button>
          </form>
          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={statusFilter || ''} onValueChange={(val) => setStatusFilter(val || null)}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter || ''} onValueChange={(val) => setRoleFilter(val || null)}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Role Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Last Login</TableHead>
              <TableHead className="hidden lg:table-cell">Orders</TableHead>
              <TableHead className="hidden lg:table-cell">Total Spent</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center">
                    <Users className="h-12 w-12 text-muted-foreground mb-4" strokeWidth={1} />
                    <p className="text-lg font-semibold mb-1">No users found</p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(user.lastLogin)}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{user.orderCount}</TableCell>
                  <TableCell className="hidden lg:table-cell">${user.totalSpent.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleViewUser(user)}>
                          <Users className="h-4 w-4 mr-2" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleRoleChange(user.id, 'admin')}>
                          <Star className="h-4 w-4 mr-2" /> Make Admin
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRoleChange(user.id, 'customer')}>
                          <CheckCircle className="h-4 w-4 mr-2" /> Set as Customer
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'active')}>
                          <CheckCircle className="h-4 w-4 mr-2" /> Set Active
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'inactive')}>
                          <Lock className="h-4 w-4 mr-2" /> Set Inactive
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'banned')}>
                          <Ban className="h-4 w-4 mr-2" /> Ban User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500" onClick={() => handleDeleteUser(user.id)}>
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account with custom permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">Full Name</label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="john.doe@example.com" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm font-medium">Temporary Password</label>
              <Input id="password" type="password" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="role" className="text-sm font-medium">Role</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              toast.success("User created successfully");
              setIsAddUserOpen(false);
            }}>Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View User Dialog */}
      {selectedUser && (
        <Dialog open={isViewUserOpen} onOpenChange={setIsViewUserOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-6 py-4">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                  <AvatarFallback>{selectedUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                <div className="flex gap-2 mt-2">
                  {getRoleBadge(selectedUser.role)}
                  {getStatusBadge(selectedUser.status)}
                </div>
                <p className="text-xs mt-2">Member since: {formatDate(selectedUser.createdAt)}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Activity</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Last Login</span>
                    <span>{formatDate(selectedUser.lastLogin)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Orders Placed</span>
                    <span>{selectedUser.orderCount}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Total Spent</span>
                    <span>${selectedUser.totalSpent.toFixed(2)}</span>
                  </li>
                </ul>
                
                <h4 className="font-semibold mt-6 mb-2">Quick Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => {}}>
                    <Mail className="h-4 w-4 mr-1" /> Send Email
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => {
                    handleRoleChange(selectedUser.id, selectedUser.role === 'admin' ? 'customer' : 'admin');
                    setSelectedUser({...selectedUser, role: selectedUser.role === 'admin' ? 'customer' : 'admin'});
                  }}>
                    <Star className="h-4 w-4 mr-1" /> {selectedUser.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-500 border-red-200" onClick={() => {
                    handleDeleteUser(selectedUser.id);
                    setIsViewUserOpen(false);
                  }}>
                    Delete User
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewUserOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default UserManagement;
