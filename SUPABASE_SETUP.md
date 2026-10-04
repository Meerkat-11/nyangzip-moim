# Supabase 설정 완벽 가이드

## 1단계: Supabase 프로젝트 생성

### 1.1) Supabase 회원가입 및 로그인
- https://supabase.com 접속
- GitHub 또는 이메일로 로그인
- "New project" 클릭

### 1.2) 프로젝트 생성
- Organization: 원하는 조직명 선택 또는 생성
- Project name: `nyangzip-moim` (또는 원하는 이름)
- Database password: 강력한 비밀번호 설정 (저장해두기!)
- Region: 가장 가까운 지역 선택 (서울: ap-northeast-1)
- Pricing Plan: Free 선택
- "Create new project" 클릭

### 1.3) 프로젝트 준비 대기
약 2-3분 정도 대기하면 프로젝트가 준비됩니다.

---

## 2단계: API 키 복사

### 2.1) 프로젝트 대시보드 접속
- 프로젝트가 준비되면 자동으로 대시보드로 이동
- 왼쪽 사이드바에서 "Settings" > "API" 클릭

### 2.2) URL과 Key 확인
```
프로젝트 URL (Project URL)
supabase_url = https://[project-ref].supabase.co

공개 Key (anon/public)
supabase_key = eyJ...(긴 문자열)
```

이 두 값을 복사합니다.

---

## 3단계: .env 파일 생성

### 3.1) 로컬 프로젝트 폴더에서
```bash
cp .env.example .env
```

### 3.2) .env 파일 수정
```bash
vim .env
# 또는
code .env
# 또는
cat > .env << 'EOF'
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
EOF
```

복사한 값을 붙여넣습니다:

```
VITE_SUPABASE_URL=https://xyzabc123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3.3) 저장 확인
```bash
cat .env
```

---

## 4단계: Authentication 설정

### 4.1) Supabase 대시보드에서
- 왼쪽 사이드바: "Authentication" 클릭
- "Providers" 탭 확인
- "Email" 항목이 이미 활성화되어 있는지 확인 (보통 기본값)

### 4.2) Email 설정 확인
- "Settings" 탭 클릭
- "Email Auth" 섹션에서:
  - "Enable email signup" ✓ (체크)
  - "Confirm email" (선택사항 - 개발 중에는 OFF 권장)

### 4.3) Email Provider 설정 (선택사항)
- 프로덕션에서는 "Custom SMTP" 또는 "SendGrid" 설정
- 개발 단계에서는 기본값 유지

---

## 5단계: Database 스키마 실행

### 5.1) SQL Editor 열기
- Supabase 대시보드 왼쪽 사이드바
- "SQL Editor" 클릭
- "New Query" 버튼 클릭

### 5.2) schema.sql 내용 복사
- 로컬 폴더에서 `database/schema.sql` 열기
- 전체 내용 복사 (Ctrl+A, Ctrl+C)

### 5.3) Supabase SQL Editor에 붙여넣기
- 빈 쿼리 창에 붙여넣기 (Ctrl+V)
- 오른쪽 상단 "Run" 버튼 클릭
- 성공 메시지 확인

```
쿼리 결과:
Successfully created tables...
```

### 5.4) RLS 정책 실행
- "New Query" 클릭
- `database/rls.sql` 전체 내용 복사
- SQL Editor에 붙여넣기
- "Run" 클릭
- 성공 확인

---

## 6단계: Storage 설정

### 6.1) Storage 메뉴 접속
- 왼쪽 사이드바: "Storage" 클릭

### 6.2) 버킷 생성

#### avatars 버킷:
- "Create new bucket" 클릭
- Name: `avatars`
- Access settings: "Private" 선택
- "Create bucket" 클릭

#### posts 버킷:
- "Create new bucket" 클릭
- Name: `posts`
- Access settings: "Private" 선택
- "Create bucket" 클릭

### 6.3) CORS 설정 (나중에 필요할 때)
- Storage 설정에서 CORS 추가
- 프론트엔드 URL 추가

---

## 7단계: 로컬에서 앱 실행

### 7.1) 패키지 설치
```bash
cd nyangzip-moim
npm install
```

### 7.2) 개발 서버 실행
```bash
npm run dev
```

출력:
```
  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### 7.3) 브라우저에서 확인
- http://localhost:5173 접속
- 랜딩 페이지 로드 확인

---

## 8단계: 최종 검증

### 8.1) .env 값이 제대로 로드되는지 확인
- 브라우저 개발자 도구 (F12) 콘솔에 에러 없는지 확인
- "Supabase 설정이 필요합니다" 같은 메시지 없는지 확인

### 8.2) 테이블 생성 확인
- Supabase 대시보드 > "SQL Editor"
- 아래 쿼리 실행:
```sql
select table_name from information_schema.tables
where table_schema = 'public';
```

결과:
```
profiles
categories
posts
comments
likes
notifications
announcements
reports
user_blocks
moderation_logs
rate_limits
chat_rooms
chat_room_users
messages
```

### 8.3) RLS 정책 확인
- Supabase 대시보드 > "Table Editor"
- 각 테이블 클릭 > "RLS" 탭
- 정책이 활성화되었는지 확인

---

## 일반적인 문제 해결

### Q: "Supabase 설정이 필요합니다" 에러
- .env 파일이 프로젝트 루트에 있는지 확인
- VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY가 모두 입력되었는지 확인
- 개발 서버를 재시작 (npm run dev 다시 실행)

### Q: SQL 실행 오류
- Supabase 대시보드의 "Logs" 확인
- 테이블이 이미 존재하면 "IF NOT EXISTS" 때문에 무시됨
- 처음부터 다시 하려면 "Logs" 탭에서 현재 전체 날짜의 쿼리 기록 확인

### Q: CORS 에러
- 아직은 로컬 개발이므로 무시
- 프로덕션 배포 시 CORS 설정 필요

### Q: 회원가입은 되는데 profiles 테이블이 비어있음
- RLS 정책이 제대로 적용되었는지 확인
- auth.users 테이블에 실제로 사용자가 만들어졌는지 확인
- Supabase 대시고 > Authentication > Users 탭 확인

---

## 보안 주의사항

⚠️ **절대 하지 말 것:**
- .env 파일을 GitHub에 커밋하지 않기 (.gitignore 확인)
- anon key를 민감한 작업에 사용하지 않기
- Service Role Key를 브라우저 코드에 넣지 않기

✅ **해야 할 것:**
- .env.example 파일만 커밋
- 로컬 .env는 절대 버전 관리에 포함 금지
- 프로덕션은 환경변수로 관리

---

## 다음 단계

✅ 완료 후:
1. 로컬 회원가입 테스트
2. 로컬 로그인 테스트
3. 게시판 기능 구현
4. 실제 배포 준비

더 자세한 내용은 [Supabase 공식 문서](https://supabase.com/docs)를 참고하세요.
