import { Home, Bell, PencilLine, Megaphone, UserCircle2, Search, LogIn, Sparkles, ShieldCheck, PawPrint } from 'lucide-react';

export const brand = {
  name: '🐱 냥집사 모임',
  subtitle: '고양이를 사랑하는 사람들이 모이는 공간',
  colors: {
    primary: '#FF8FB3',
    secondary: '#FFD6E3',
    background: '#FFF8FA',
    card: '#FFFFFF',
    text: '#29252A',
    subText: '#77727A',
    danger: '#EF5350',
    success: '#57B894',
    darkBackground: '#17151A',
  },
};

export const featureList = [
  '🐾 고양이 이야기',
  '📸 사진 공유',
  '💬 자유로운 소통',
  '💡 집사 정보 공유',
];

export const navItems = [
  { label: '홈', icon: Home, to: '/home' },
  { label: '게시판', icon: Megaphone, to: '/board' },
  { label: '작성', icon: PencilLine, to: '/write' },
  { label: '알림', icon: Bell, to: '/notifications' },
  { label: '프로필', icon: UserCircle2, to: '/profile' },
];

export const homeSections = [
  { title: '📢 공지사항', items: ['오늘의 냥이 미션', '신규 집사 환영 이벤트'] },
  { title: '🔥 인기 게시글', items: ['고양이의 깜찍한 하루', '우리 집 캣타워 리뷰'] },
  { title: '🆕 최신 게시글', items: ['고양이 사진 공유합니다', '캣휠 설치 후기'] },
  { title: '📸 인기 사진', items: ['아침 루틴', '캣닢 탐색기'] },
  { title: '👥 추천 집사', items: ['냥이덕후', '고양이연구소', '필수캣템'] },
];

export const authTips = [
  { icon: Search, label: '검색' },
  { icon: ShieldCheck, label: '보안' },
  { icon: Sparkles, label: '실시간' },
  { icon: PawPrint, label: '커뮤니티' },
];
