import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password?: string) => Promise<{ error?: string }>;
  signUp: (email: string, password?: string, fullName?: string, organization?: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  toggleDemoAdmin: () => void;
  toggleDemoMember: () => void;
  isCloudSynced: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'cognisrin_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If Supabase is configured, use live auth
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          fetchSupabaseProfile(session.user.id, session.user.email || '');
        } else {
          loadStoredLocalUser();
        }
        setIsLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          fetchSupabaseProfile(session.user.id, session.user.email || '');
        } else {
          setUser(null);
          localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      loadStoredLocalUser();
      setIsLoading(false);
    }
  }, []);

  const loadStoredLocalUser = () => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        // By default initialize in visitor mode (not logged in)
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  const fetchSupabaseProfile = async (userId: string, email: string) => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data && !error) {
        const profile: UserProfile = {
          id: data.id,
          email: data.email,
          fullName: data.full_name || '',
          role: data.role as 'admin' | 'member',
          organization: data.organization || '',
          interests: data.interests || [],
          createdAt: data.created_at
        };
        setUser(profile);
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(profile));
      } else {
        // Fallback user
        const fallback: UserProfile = {
          id: userId,
          email: email,
          fullName: email.split('@')[0],
          role: 'member',
          createdAt: new Date().toISOString()
        };
        setUser(fallback);
      }
    } catch {
      // Ignore
    }
  };

  const signIn = async (email: string, password?: string): Promise<{ error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: password || 'Cognisrin123!'
      });
      if (error) return { error: error.message };
      if (data.user) {
        await fetchSupabaseProfile(data.user.id, data.user.email || '');
      }
      return {};
    }

    // Local / Offline Mode handling
    // If logging in with admin credentials or explicitly containing admin:
    const role: 'admin' | 'member' = (email.toLowerCase().includes('admin') || email.toLowerCase() === 'nikhilendra@cognisrin.in') 
      ? 'admin' 
      : 'member';

    const localUser: UserProfile = {
      id: 'local-' + Date.now(),
      email,
      fullName: role === 'admin' ? 'Nikhilendra Srinivas (Admin)' : email.split('@')[0],
      role,
      organization: 'Cognisrin Independent Research Network',
      interests: ['Quantum Physics', 'Deep Tech', 'Entrepreneurship'],
      createdAt: new Date().toISOString()
    };
    setUser(localUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(localUser));
    return {};
  };

  const signUp = async (email: string, password?: string, fullName?: string, organization?: string): Promise<{ error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: password || 'Cognisrin123!',
        options: {
          data: { full_name: fullName || '', organization: organization || '' }
        }
      });
      if (error) return { error: error.message };
      if (data.user) {
        await fetchSupabaseProfile(data.user.id, data.user.email || '');
      }
      return {};
    }

    const localUser: UserProfile = {
      id: 'local-' + Date.now(),
      email,
      fullName: fullName || email.split('@')[0],
      role: 'member',
      organization: organization || 'Independent Researcher / Member',
      interests: ['Science', 'Innovation'],
      createdAt: new Date().toISOString()
    };
    setUser(localUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(localUser));
    return {};
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  };

  const resetPassword = async (email: string): Promise<{ error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/auth/login'
      });
      if (error) return { error: error.message };
      return {};
    }
    // Local mock success
    return {};
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      await supabase
        .from('profiles')
        .update({
          full_name: updated.fullName,
          organization: updated.organization,
          interests: updated.interests
        })
        .eq('id', user.id);
    }
  };

  // Quick switchers for local testing
  const toggleDemoAdmin = () => {
    const adminUser: UserProfile = {
      id: 'admin-nikhilendra',
      email: 'founder@cognisrin.in',
      fullName: 'Nikhilendra Srinivas',
      role: 'admin',
      organization: 'Cognisrin',
      interests: ['Science', 'Innovation', 'Entrepreneurship'],
      createdAt: '2024-01-01T00:00:00Z'
    };
    setUser(adminUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(adminUser));
  };

  const toggleDemoMember = () => {
    const memberUser: UserProfile = {
      id: 'member-researcher',
      email: 'member@cognisrin.in',
      fullName: 'Dr. Research Fellow',
      role: 'member',
      organization: 'Academic Partner',
      interests: ['Quantum Physics', 'Nanotechnology'],
      createdAt: '2024-02-15T00:00:00Z'
    };
    setUser(memberUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(memberUser));
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isLoading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updateProfile,
        toggleDemoAdmin,
        toggleDemoMember,
        isCloudSynced: isSupabaseConfigured
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
