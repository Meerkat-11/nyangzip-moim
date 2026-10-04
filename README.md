# 냥집사 모임

실제 배포를 전제로 한 고양이 커뮤니티 서비스입니다.

## 프로젝트 개요

- 서비스명: 냥집사 모임
- 서브 문구: 고양이를 사랑하는 사람들이 모이는 공간
- 디자인: 모바일 우선, 핑크 + 화이트 중심, 세련된 커뮤니티 UI
- 데이터베이스: Supabase PostgreSQL
- 인증: Supabase Auth
- 실시간: Supabase Realtime
- 파일 저장: Supabase Storage

## 기술 스택

- React + TypeScript + Vite
- Supabase JS SDK
- React Router
- CSS Modules / Custom CSS

## 실행 방법

1. `.env.example` 파일을 복사해 `.env`를 생성합니다.
2. Supabase URL과 anon key를 입력합니다.
3. 패키지 설치:

```bash
npm install
```

4. 개발 서버 실행:

```bash
npm run dev
```

## 주요 구현 내용

- 비로그인 랜딩 페이지
- 회원가입/로그인 UI 및 인증 로직 구조
- 모바일 하단 네비게이션 레이아웃
- 브랜드 컬러 및 커뮤니티 UI 시스템
- Supabase 연결 기반 구조
- DB 스키마 설계 및 RLS 정책 준비

## Note

본 프로젝트는 단계적으로 완성형 커뮤니티 앱으로 확장됩니다.
현재 1단계 ~ 5단계 범위인 인증/랜딩/홈 플로우와 구조를 반영합니다.
