import { createClient, type User } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] 환경 설정 누락!\n' +
    '1. .env.example을 .env로 복사\n' +
    '2. VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY 입력\n' +
    '3. 개발 서버 재시작 (npm run dev)',
  );
}

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export async function getCurrentUser(): Promise<User | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('[Auth] 사용자 조회 실패:', error.message);
    return null;
  }
  return data.user ?? null;
}
