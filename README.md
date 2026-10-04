# 🐱 냥집사 모임

고양이를 사랑하는 사람들이 모이는 공간.

## 프로젝트 소개

- 서비스 이름: 냥집사 모임
- 서브 문구: 고양이를 사랑하는 사람들이 모이는 공간
- 목표: 실제로 사용 가능한 모바일 우선 커뮤니티 서비스
- 인증: Supabase Auth
- 데이터베이스: Supabase PostgreSQL
- 실시간: Supabase Realtime
- 저장소: Supabase Storage

## 기술 스택

- React + TypeScript + Vite
- React Router
- Supabase JS SDK
- CSS로 구성된 모바일 우선 UI

## 로컬 실행

1. Supabase 프로젝트를 생성합니다.
2. `.env.example` 내용을 복사해 `.env` 파일을 만듭니다.
3. 아래 값들을 실제 값으로 채웁니다.

```bash
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

4. 설치 및 실행

```bash
npm install
npm run dev
```

## Supabase 설정 순서

### 1) Auth 활성화

- Supabase 대시보드 > Authentication > Settings
- Email sign-in 활성화
- 비밀번호 재설정 기능 사용 가능하도록 설정
- 이메일 확인 옵션은 필요에 따라 구성

### 2) Database 스키마 적용

`database/schema.sql` 파일을 Supabase SQL Editor에 붙여 넣어 실행합니다.

### 3) RLS 정책 적용

`database/rls.sql` 파일을 SQL Editor에 붙여 넣어 실행합니다.

### 4) Storage 설정

- `avatars` 버킷 생성
- `posts` 버킷 생성
- Public access는 필요한 경우 제한
- 업로드는 서버/DB 정책 기준으로 허용

## 중요한 보안 원칙

- Service Role Key는 절대 브라우저 코드에 넣지 않습니다.
- 관리자 권한은 프론트엔드에서 검사하지 않고 DB/RLS로 검증합니다.
- 비밀번호는 Supabase Auth가 관리합니다.
- 민감한 인증 정보는 로그에 남기지 않습니다.

## 현재 구현 상태

완료된 단계:
- 브랜드/디자인 시스템
- 모바일 우선 레이아웃
- 랜딩 페이지
- 회원가입
- 로그인
- 자동 로그인 구조
- 비밀번호 재설정 구조
- 보호 라우트
- 홈 화면

다음 단계:
- 게시판 CRUD
- 댓글/좋아요
- 검색
- 채팅
- 알림
- 관리자 대시보드
- RLS 고도화
- Supabase Storage 이미지 업로드

## 프로젝트 구조

```text
src/
  components/
  pages/
  layouts/
  hooks/
  lib/
  services/
  types/
  utils/
  styles/
  supabase/
  database/
```
