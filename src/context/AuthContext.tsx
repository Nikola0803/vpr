import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export type Role = 'customer' | 'vendor';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  company?: string;
  vendorSlug: string | null;
  joined: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  ready: boolean;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signUp: (payload: { name: string; email: string; password: string; role: Role; company?: string }) => Promise<AuthUser>;
  signOut: () => Promise<void>;
  claimVendor: (slug: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function toAuthUser(user: User): AuthUser {
  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const email = user.email ?? '';
  const fallbackName = email.split('@')[0]?.replace(/[._-]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()).trim() || 'Member';
  return {
    id: user.id,
    name: (meta.name as string | undefined) || fallbackName,
    email,
    role: ((meta.role as Role | undefined) || 'customer') as Role,
    company: meta.company as string | undefined,
    vendorSlug: (meta.vendor_slug as string | null | undefined) ?? null,
    joined: user.created_at,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ? toAuthUser(session.user) : null);
      setReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? toAuthUser(session.user) : null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<AuthUser> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (!data.user) throw new Error('Sign in failed');
    return toAuthUser(data.user);
  }, []);

  const signUp = useCallback(
    async (payload: { name: string; email: string; password: string; role: Role; company?: string }): Promise<AuthUser> => {
      const { data, error } = await supabase.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            name: payload.name,
            role: payload.role,
            company: payload.company ?? null,
            vendor_slug: null,
          },
        },
      });
      if (error) throw error;
      if (!data.user) throw new Error('Sign up failed');
      return toAuthUser(data.user);
    },
    [],
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const claimVendor = useCallback(async (slug: string) => {
    const { error } = await supabase.auth.updateUser({
      data: { vendor_slug: slug, role: 'vendor' },
    });
    if (error) throw error;
    setUser((prev) => (prev ? { ...prev, vendorSlug: slug, role: 'vendor' } : prev));
  }, []);

  const value = useMemo(
    () => ({ user, ready, signIn, signUp, signOut, claimVendor }),
    [user, ready, signIn, signUp, signOut, claimVendor],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
