export type UserProfile = {
  id: string;
  email?: string | null;
  nickname?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type AuthForm = {
  email: string;
  password: string;
};

export type SignUpForm = AuthForm & {
  nickname: string;
  passwordConfirm: string;
};
