import { createContext, useContext } from 'react';
import type { User } from '@supabase/supabase-js';

export type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signUp: (input: { email: string; password: string; nickname: string; passwordConfirm: string }) => Promise<void>;
  signIn: (input: { email: string; password: string; rememberMe?: boolean }) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
