
import React, { createContext, useState, useEffect } from 'react';

// Define user types
export interface User {
  id: string;
  name?: string;
  email: string;
  role: 'user' | 'admin';
}

// Define auth context
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  register: (name: string, email: string, password: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded admin credentials (in a real application, this would be in a secure database)
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';

// Mock user database (in a real app, this would be stored in a database)
const MOCK_USERS: Record<string, { id: string, name: string, email: string, password: string, role: 'user' | 'admin' }> = {
  'admin@example.com': {
    id: 'admin-1',
    name: 'Admin User',
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    role: 'admin'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Check for saved auth on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        setIsAdmin(parsedUser.role === 'admin');
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('auth_user');
      }
    }
  }, []);
  
  // Login function
  const login = (email: string, password: string): boolean => {
    // Check if email exists in our mock database
    const foundUser = MOCK_USERS[email];
    
    // Special case for admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = {
        id: 'admin-1',
        name: 'Admin User',
        email: ADMIN_EMAIL,
        role: 'admin' as const
      };
      
      setUser(adminUser);
      setIsAuthenticated(true);
      setIsAdmin(true);
      localStorage.setItem('auth_user', JSON.stringify(adminUser));
      return true;
    }
    
    // For regular users
    if (foundUser && foundUser.password === password) {
      const authenticatedUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
      };
      
      setUser(authenticatedUser);
      setIsAuthenticated(true);
      setIsAdmin(foundUser.role === 'admin');
      localStorage.setItem('auth_user', JSON.stringify(authenticatedUser));
      return true;
    }
    
    return false;
  };
  
  // Register function
  const register = (name: string, email: string, password: string): boolean => {
    // Check if email already exists
    if (MOCK_USERS[email]) {
      return false;
    }
    
    // Create new user
    const newUserId = `user-${Object.keys(MOCK_USERS).length + 1}`;
    const newUser = {
      id: newUserId,
      name,
      email,
      password,
      role: 'user' as const
    };
    
    // Add to mock database
    MOCK_USERS[email] = newUser;
    
    // Auto-login after registration
    setUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    });
    setIsAuthenticated(true);
    setIsAdmin(false);
    
    // Save to localStorage for persistence
    localStorage.setItem('auth_user', JSON.stringify({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }));
    
    return true;
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('auth_user');
  };
  
  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    register
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
