import { Search, Bell, User, House, Pencil, MessageSquareMore } from 'lucide-react';
import { navItems, homeSections } from '../../constants/site';

export default function HomePage() {
  return (
    <div className="page-shell home-shell">
      <header className="topbar">
        <div>
          <h1>🐱 냥집사 모임</h1>
        </div>
        <div className="topbar-actions">
          <button aria-label="검색" className="icon-button">
            <Search size={18} />
          </button>
          <button aria-label="알림" className="icon-button">
            <Bell size={18} />
          </button>
        </div>
      </header>

      <main className="home-main">
        {homeSections.map((section) => (
          <section key={section.title} className="home-section">
            <h3>{section.title}</h3>
            <div className="pill-list">
              {section.items.map((label) => (
                <div key={label} className="chip-item">{label}</div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <nav className="bottom-nav" aria-label="메인 네비게이션">
        {navItems.map(({ label, icon: Icon, to }) => (
          <button key={label} className="nav-button" aria-label={label}>
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
