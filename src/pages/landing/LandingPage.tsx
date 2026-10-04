import { Search, Bell, UserRound, LogIn, UserPlus, PawPrint } from 'lucide-react';
import { brand, featureList } from '../../constants/site';

const landingFeatureItems = [
  { icon: PawPrint, label: '고양이 이야기' },
  { icon: Search, label: '사진 공유' },
  { icon: UserRound, label: '자유로운 소통' },
  { icon: Bell, label: '집사 정보 공유' },
];

export default function LandingPage() {
  return (
    <div className="page-shell landing-shell">
      <header className="brand-header">
        <div className="brand-mark">🐱</div>
        <div>
          <h1>{brand.name}</h1>
          <p>{brand.subtitle}</p>
        </div>
      </header>

      <main className="landing-main">
        <div className="hero-card">
          <p className="eyebrow">우리 모두의 고양이 커뮤니티</p>
          <h2>{brand.subtitle}</h2>
          <div className="cta-row">
            <a href="/signup" className="primary-button">
              <UserPlus size={18} />
              입장하기
            </a>
            <a href="/signup" className="secondary-button">
              회원가입
            </a>
            <a href="/login" className="ghost-button">
              <LogIn size={18} />
              로그인
            </a>
          </div>
        </div>

        <div className="feature-box">
          <h3>서비스 특징</h3>
          <div className="feature-grid">
            {landingFeatureItems.map(({ icon: Icon, label }) => (
              <div key={label} className="feature-item">
                <Icon size={18} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
