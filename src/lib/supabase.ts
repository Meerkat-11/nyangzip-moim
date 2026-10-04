import { createClient, type User } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export function getCurrentUser(): Promise<User | null> {
  if (!supabase) return Promise.resolve(null);
  return supabase.auth.getUser().then(({ data }) => data.user ?? null);
}
