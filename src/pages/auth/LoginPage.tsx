import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signIn({ email: form.email, password: form.password, rememberMe });
      navigate('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell auth-shell">
      <div className="auth-card">
        <h2>로그인</h2>
        <p className="auth-subtitle">다시 만나서 반가워요.</p>

        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="비밀번호 입력"
            />
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>자동 로그인</span>
          </label>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="primary-button full-width" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/signup">회원가입</Link>
          <Link to="/">비밀번호 재설정</Link>
        </div>
      </div>
    </div>
  );
}
