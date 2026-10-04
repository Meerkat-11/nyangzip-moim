import { createContext, useEffect, useMemo, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { AuthContext } from '../hooks/useAuth';
import { getCurrentUser, supabase } from '../lib/supabase';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const currentUser = await getCurrentUser();
      if (mounted) {
        setUser(currentUser);
        setLoading(false);
      }
    };

    initialize();

    const { data: authSubscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      authSubscription.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      signUp: async ({ email, password, nickname, passwordConfirm }) => {
        if (!supabase) {
          throw new Error('Supabase 설정이 필요합니다. .env를 확인해주세요.');
        }

        if (!email || !password || !nickname) {
          throw new Error('필수 입력값을 모두 입력해주세요.');
        }

        const trimmedNickname = nickname.trim();
        if (!trimmedNickname) {
          throw new Error('닉네임을 입력해주세요.');
        }

        if (password.trim().length < 6) {
          throw new Error('비밀번호는 6자 이상이어야 합니다.');
        }

        if (password !== passwordConfirm) {
          throw new Error('비밀번호가 일치하지 않습니다.');
        }

        const { data: existingProfile, error: lookupError } = await supabase
          .from('profiles')
          .select('id')
          .eq('nickname', trimmedNickname)
          .maybeSingle();

        if (lookupError && lookupError.code !== 'PGRST116') {
          throw lookupError;
        }

        if (existingProfile) {
          throw new Error('이미 사용 중인 닉네임입니다.');
        }

        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });

        if (error) throw error;

        if (data.user) {
          const { error: profileError } = await supabase.from('profiles').upsert(
            {
              id: data.user.id,
              email: data.user.email,
              nickname: trimmedNickname,
            },
            { onConflict: 'id' },
          );

          if (profileError) {
            throw profileError;
          }
        }
      },
      signIn: async ({ email, password, rememberMe = true }) => {
        if (!supabase) {
          throw new Error('Supabase 설정이 필요합니다. .env를 확인해주세요.');
        }

        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) throw error;

        if (!rememberMe) {
          await supabase.auth.setSession({
            access_token: '',
            refresh_token: '',
          } as any);
        }
      },
      signOut: async () => {
        if (!supabase) return;
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      },
      resetPassword: async (email) => {
        if (!supabase) {
          throw new Error('Supabase 설정이 필요합니다. .env를 확인해주세요.');
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
        if (error) throw error;
      },
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
