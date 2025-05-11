
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from "@/components/ui/sonner";

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration (in a real app, this would come from a database)
const MOCK_USERS = [
  { 
    id: '1', 
    email: 'admin@example.com', 
    password: 'admin123', 
    name: 'Admin User', 
    role: 'admin' as const 
  },
  { 
    id: '2', 
    email: 'user@example.com', 
    password: 'user123', 
    name: 'Regular User', 
    role: 'user' as const 
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = MOCK_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (foundUser) {
        // Remove password before storing in state/localStorage
        const { password: _, ...safeUser } = foundUser;
        setUser(safeUser);
        localStorage.setItem('currentUser', JSON.stringify(safeUser));
        toast.success(`Welcome back, ${safeUser.name}!`);
      } else {
        toast.error("Invalid email or password");
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    toast.success("Logged out successfully");
  };
  
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const userExists = MOCK_USERS.some(
        u => u.email.toLowerCase() === email.toLowerCase()
      );
      
      if (userExists) {
        toast.error("Email already in use");
        throw new Error('Email already in use');
      }
      
      // In a real app, this would make an API call to create a user
      // For demo, we'll just create a simulated user
      const newUser = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        name,
        role: 'user' as const
      };
      
      // Add the user to mock database (this would persist only until page refresh)
      MOCK_USERS.push({ ...newUser, password });
      
      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAdmin: user?.role === 'admin',
      login, 
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
