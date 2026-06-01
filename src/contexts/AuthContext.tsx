import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import type { Session, User as SupabaseUser } from '@supabase/supabase-js';

export interface User {
  id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  profilePicture?: string;
  phone?: string;
  role: 'admin' | 'customer' | 'user';
  // legacy compatibility (no real data backing these now)
  bio?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  createdAt?: string;
  lastLogin?: string;
  status?: 'active' | 'inactive' | 'suspended';
  orders?: number;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (updated: Partial<User>) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  requireAuth: (role?: 'admin' | 'customer' | 'user') => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

async function buildUser(sUser: SupabaseUser): Promise<User> {
  const [{ data: profile }, { data: roles }] = await Promise.all([
    supabase.from('profiles').select('full_name, avatar_url, phone').eq('id', sUser.id).maybeSingle(),
    supabase.from('user_roles').select('role').eq('user_id', sUser.id),
  ]);
  const isAdmin = (roles ?? []).some((r: any) => r.role === 'admin');
  const name = profile?.full_name || sUser.user_metadata?.full_name || sUser.email?.split('@')[0] || '';
  const [firstName, ...rest] = name.split(' ');
  return {
    id: sUser.id,
    email: sUser.email || '',
    name,
    firstName,
    lastName: rest.join(' '),
    avatar: profile?.avatar_url || sUser.user_metadata?.avatar_url,
    profilePicture: profile?.avatar_url || sUser.user_metadata?.avatar_url,
    phone: profile?.phone || undefined,
    role: isAdmin ? 'admin' : 'customer',
    status: 'active',
    createdAt: sUser.created_at,
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Listener first
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        // defer heavy work to avoid deadlocks
        setTimeout(() => {
          buildUser(newSession.user).then(setUser);
        }, 0);
      } else {
        setUser(null);
      }
    });

    // Then hydrate
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      if (s?.user) {
        buildUser(s.user).then((u) => { setUser(u); setIsLoading(false); });
      } else {
        setIsLoading(false);
      }
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      return false;
    }
    toast.success('Welcome back!');
    return true;
  };

  const register = async (name: string, email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl, data: { full_name: name } },
    });
    if (error) {
      toast.error(error.message);
      return false;
    }
    toast.success('Account created! Check your email to verify.');
    return true;
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/` },
    });
    if (error) toast.error(error.message);
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) toast.error(error.message);
    else toast.success('Password reset email sent.');
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) { toast.error(error.message); return false; }
    toast.success('Password updated.');
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    toast.info('Signed out');
    navigate('/');
  };

  const updateUserProfile = async (data: Partial<User>) => {
    if (!user) return;
    const { error } = await supabase.from('profiles').update({
      full_name: data.name ?? (data.firstName ? `${data.firstName} ${data.lastName ?? ''}`.trim() : undefined),
      avatar_url: data.avatar ?? data.profilePicture,
      phone: data.phone,
    }).eq('id', user.id);
    if (error) { toast.error(error.message); return; }
    setUser({ ...user, ...data });
    toast.success('Profile updated');
  };

  const updateUser = updateUserProfile;

  const requireAuth = (role?: 'admin' | 'customer' | 'user') => {
    if (!user) { toast.error('Please sign in'); navigate('/login'); return false; }
    if (role === 'admin' && user.role !== 'admin') { toast.error('Admin access required'); navigate('/'); return false; }
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user, session, login, register, loginWithGoogle, resetPassword, updatePassword,
      logout, updateUser, updateUserProfile,
      isAuthenticated: !!user, isAdmin: user?.role === 'admin', isLoading, requireAuth,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
