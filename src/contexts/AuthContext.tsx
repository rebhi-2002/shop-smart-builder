
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

export interface User {
  id: string;
  name?: string;
  email: string;
  role: 'user' | 'admin' | 'customer';
  avatar?: string;
  phone?: string; // Added phone property
  bio?: string;   // Added bio property
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: User) => Promise<void>; // Added updateUser method
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

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
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to update user:', error);
      return Promise.reject(error);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo users
      if (email === 'admin@example.com' && password === 'admin123') {
        const adminUser = {
          id: 'admin-1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin' as const,
          avatar: 'https://i.pravatar.cc/150?u=admin',
          phone: '123-456-7890',
          bio: 'System administrator with full access rights'
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
        toast.success('Welcome back, Admin!');
        navigate('/admin');
        return;
      } 
      
      if (email === 'user@example.com' && password === 'user123') {
        const regularUser = {
          id: 'user-1',
          name: 'John Doe',
          email: 'user@example.com',
          role: 'user' as const,
          avatar: 'https://i.pravatar.cc/150?u=user',
          phone: '987-654-3210',
          bio: 'Regular customer'
        };
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
      
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: 'user' as const,
        avatar: `https://i.pravatar.cc/150?u=${email}`,
      };
      
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
