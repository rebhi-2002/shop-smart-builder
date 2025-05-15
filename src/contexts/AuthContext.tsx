
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

export interface User {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: 'user' | 'admin' | 'customer';
  avatar?: string;
  phone?: string;
  bio?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  profilePicture?: string;
  createdAt?: string;
  lastLogin?: string;
  status?: 'active' | 'inactive' | 'suspended';
  orders?: number;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: User) => Promise<void>;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  requireAuth: (role?: 'user' | 'admin' | 'customer') => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users database
const mockUsers: User[] = [
  {
    id: 'admin-1',
    firstName: 'Admin',
    lastName: 'User',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=admin',
    phone: '123-456-7890',
    bio: 'System administrator with full access rights',
    street: '123 Admin St',
    city: 'Adminville',
    state: 'California',
    zip: '90210',
    country: 'United States',
    profilePicture: 'https://i.pravatar.cc/150?u=admin',
    createdAt: '2023-01-15',
    lastLogin: '2025-05-12',
    status: 'active',
    orders: 0
  },
  {
    id: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    name: 'John Doe',
    email: 'user@example.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?u=user',
    phone: '987-654-3210',
    bio: 'Regular customer',
    street: '456 User Ave',
    city: 'Usertown',
    state: 'New York',
    zip: '10001',
    country: 'United States',
    profilePicture: 'https://i.pravatar.cc/150?u=user',
    createdAt: '2023-02-20',
    lastLogin: '2025-05-10',
    status: 'active',
    orders: 5
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?u=jane',
    phone: '555-123-4567',
    bio: 'Frequent shopper',
    createdAt: '2023-03-10',
    lastLogin: '2025-05-05',
    status: 'active',
    orders: 12
  },
  {
    id: 'user-3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'user',
    avatar: 'https://i.pravatar.cc/150?u=bob',
    phone: '444-333-2222',
    bio: 'New customer',
    createdAt: '2024-01-05',
    lastLogin: '2025-04-28',
    status: 'active',
    orders: 1
  },
  {
    id: 'customer-1',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    role: 'customer',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    phone: '222-555-8888',
    bio: 'VIP customer',
    createdAt: '2023-05-18',
    lastLogin: '2025-05-01',
    status: 'active',
    orders: 25
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  
  // Make mockUsers available through window for admin functions
  useEffect(() => {
    // @ts-ignore
    window.mockUsers = mockUsers;
  }, []);

  // Check for existing user session on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Add updateUser method
  const updateUser = async (updatedUser: User): Promise<void> => {
    try {
      // In a real app, this would call an API to update user data
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success("Profile updated successfully");
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to update user:', error);
      toast.error("Failed to update profile");
      return Promise.reject(error);
    }
  };

  // Add updateUserProfile method
  const updateUserProfile = async (userData: Partial<User>): Promise<void> => {
    try {
      if (!user) {
        throw new Error('No user logged in');
      }
      
      const updatedUser = {
        ...user,
        ...userData
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success("Profile updated successfully");
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to update user profile:', error);
      toast.error("Failed to update profile");
      return Promise.reject(error);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check existing users
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (email === 'admin@example.com' && password === 'admin123') {
        const adminUser = mockUsers.find(u => u.id === 'admin-1')!;
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        toast.success('Welcome back, Admin!');
        navigate('/admin');
        return;
      } 
      
      if (email === 'user@example.com' && password === 'user123') {
        const regularUser = mockUsers.find(u => u.id === 'user-1')!;
        setUser(regularUser);
        localStorage.setItem('user', JSON.stringify(regularUser));
        toast.success('Login successful!');
        navigate('/');
        return;
      }
      
      throw new Error('Invalid credentials');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (mockUsers.some(user => user.email === email)) {
        toast.error('Email already registered');
        setIsLoading(false);
        return;
      }
      
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: 'user',
        avatar: `https://i.pravatar.cc/150?u=${email}`,
        createdAt: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString().split('T')[0],
        status: 'active',
        orders: 0
      };
      
      // Add user to mock database
      mockUsers.push(newUser);
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('You have been logged out');
    navigate('/');
  };

  // Function to require authentication with optional role check
  const requireAuth = (role?: 'user' | 'admin' | 'customer') => {
    if (!user) {
      toast.error('Please login to continue');
      navigate('/login');
      return false;
    }
    
    if (role && user.role !== role) {
      toast.error('You do not have permission to access this page');
      navigate('/');
      return false;
    }
    
    return true;
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        register, 
        logout,
        updateUser,
        updateUserProfile,
        isAuthenticated, 
        isAdmin,
        isLoading,
        requireAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
