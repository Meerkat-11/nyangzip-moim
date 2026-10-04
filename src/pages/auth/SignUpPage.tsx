import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [form, setForm] = useState({
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signUp({
        email: form.email,
        password: form.password,
        nickname: form.nickname,
        passwordConfirm: form.passwordConfirm,
      });
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell auth-shell">
      <div className="auth-card">
        <h2>회원가입</h2>
        <p className="auth-subtitle">냥집사 모임에 오신 것을 환영합니다.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            <span>닉네임</span>
            <input
              value={form.nickname}
              onChange={(e) => setForm((prev) => ({ ...prev, nickname: e.target.value }))}
              placeholder="고양이집사"
            />
          </label>

          <label>
            <span>이메일</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="hello@cat.com"
            />
          </label>

          <label>
            <span>비밀번호</span>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
              placeholder="비밀번호를 입력해주세요"
            />
          </label>

          <label>
            <span>비밀번호 확인</span>
            <input
              type="password"
              value={form.passwordConfirm}
              onChange={(e) => setForm((prev) => ({ ...prev, passwordConfirm: e.target.value }))}
              placeholder="비밀번호를 다시 입력해주세요"
            />
          </label>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="primary-button full-width" disabled={loading}>
            {loading ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <p className="auth-footer">
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </div>
    </div>
  );
}
