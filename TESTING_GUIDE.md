# 회원가입/로그인 테스트 완벽 가이드

## 준비 사항

✅ Supabase 프로젝트 생성 완료
✅ .env 파일에 URL/anon key 입력 완료
✅ database/schema.sql 실행 완료
✅ database/rls.sql 실행 완료
✅ npm run dev로 로컬 서버 실행 중

---

## 테스트 1: 회원가입 (Sign Up)

### 1.1) 랜딩 페이지 접속
```
http://localhost:5173/
```

페이지 확인:
- 🐱 냥집사 모임 로고
- "고양이를 사랑하는 사람들이 모이는 공간" 문구
- "입장하기", "회원가입", "로그인" 버튼
- 서비스 특징 아이콘

### 1.2) "회원가입" 버튼 클릭
```
http://localhost:5173/signup
```

페이지 확인:
- 회원가입 제목
- 닉네임 입력창
- 이메일 입력창
- 비밀번호 입력창
- 비밀번호 확인 입력창
- "회원가입" 버튼
- "이미 계정이 있으신가요? 로그인" 링크

### 1.3) 테스트 데이터 입력

#### 첫 번째 시도: 정상 가입
```
닉네임: 냥집사김철수
이메일: test1@example.com
비밀번호: password123
비밀번호 확인: password123
```

예상 동작:
- "회원가입" 버튼이 "가입 중..."으로 변경
- 2-3초 후 로그인 페이지로 자동 이동
- http://localhost:5173/login

#### 확인 방법 1: Supabase 대시보드
- https://supabase.com 대시보드 접속
- 프로젝트 > "Authentication" > "Users" 탭
- test1@example.com 사용자 생성 확인

#### 확인 방법 2: Profiles 테이블 확인
- 대시고 > "SQL Editor"
- 새 쿼리:
```sql
select id, email, nickname from public.profiles
order by created_at desc limit 10;
```
- 실행하면 생성된 프로필 확인

### 1.4) 입력 검증 테스트

#### 테스트 2: 닉네임 공백
```
닉네임: (공백)
이메일: test2@example.com
비밀번호: password123
비밀번호 확인: password123
```

예상 결과:
```
에러 메시지: "닉네임을 입력해주세요."
버튼: "회원가입" (로딩 상태 없음)
```

#### 테스트 3: 비밀번호 짧음
```
닉네임: 냥집사이순신
이메일: test3@example.com
비밀번호: 1234
비밀번호 확인: 1234
```

예상 결과:
```
에러 메시지: "비밀번호는 6자 이상이어야 합니다."
```

#### 테스트 4: 비밀번호 불일치
```
닉네임: 냥집사이순신
이메일: test4@example.com
비밀번호: password123
비밀번호 확인: password456
```

예상 결과:
```
에러 메시지: "비밀번호가 일치하지 않습니다."
```

#### 테스트 5: 닉네임 중복
```
닉네임: 냥집사김철수 (이미 가입한 닉네임)
이메일: test5@example.com
비밀번호: password123
비밀번호 확인: password123
```

예상 결과:
```
에러 메시지: "이미 사용 중인 닉네임입니다."
```

---

## 테스트 2: 로그인 (Sign In)

### 2.1) 로그인 페이지 접속
```
http://localhost:5173/login
```

페이지 확인:
- 로그인 제목
- 이메일 입력창
- 비밀번호 입력창
- "자동 로그인" 체크박스 (체크됨)
- "로그인" 버튼
- "회원가입", "비밀번호 재설정" 링크

### 2.2) 정상 로그인
```
이메일: test1@example.com
비밀번호: password123
자동 로그인: 체크됨
```

예상 동작:
- "로그인" 버튼이 "로그인 중..."으로 변경
- 2-3초 후 홈 페이지로 자동 이동
- http://localhost:5173/home

### 2.3) 홈 페이지 확인
```
http://localhost:5173/home
```

페이지 확인:
- 🐱 냥집사 모임 헤더
- 검색 버튼, 알림 버튼
- "📢 공지사항", "🔥 인기 게시글" 등 섹션
- 하단 네비게이션 (🏠 홈, 📝 게시판, ➕ 작성, 🔔 알림, 👤 프로필)

### 2.4) 로그인 오류 테스트

#### 테스트 1: 잘못된 비밀번호
```
이메일: test1@example.com
비밀번호: wrongpassword
```

예상 결과:
```
에러 메시지: "Invalid login credentials" (또는 "로그인 정보가 올바르지 않습니다.")
```

#### 테스트 2: 없는 이메일
```
이메일: nonexistent@example.com
비밀번호: password123
```

예상 결과:
```
에러 메시지: "Invalid login credentials"
```

---

## 테스트 3: 자동 로그인 (Remember Me)

### 3.1) 자동 로그인 OFF로 로그인
```
이메일: test1@example.com
비밀번호: password123
자동 로그인: 체크 해제
```

예상 동작:
- 로그인 성공 후 홈으로 이동
- 브라우저 새로고침 후 로그인 페이지로 돌아감

### 3.2) 자동 로그인 ON으로 로그인
```
이메일: test1@example.com
비밀번호: password123
자동 로그인: 체크됨
```

예상 동작:
- 로그인 성공 후 홈으로 이동
- 브라우저 새로고침 후 홈 페이지 유지
- (localStorage에 세션 저장)

---

## 테스트 4: 보호 라우트 (Protected Route)

### 4.1) 로그인 없이 /home 직접 접근
```
http://localhost:5173/home
```

예상 동작:
- 로그인 상태 확인 중 메시지 표시
- 1초 후 자동으로 홈 페이지로 이동 또는 / 로 리다이렉트

### 4.2) 로그인 후 /home 접근
```
1. 로그인
2. http://localhost:5173/home 접속
```

예상 동작:
- 홈 페이지 정상 표시

---

## 테스트 5: 비밀번호 재설정 (Forgot Password)

### 5.1) 비밀번호 재설정 페이지 접속
```
http://localhost:5173/forgot-password
```

페이지 확인:
- "비밀번호 재설정" 제목
- "가입하신 이메일을 입력해주세요" 설명
- 이메일 입력창
- "재설정 링크 보내기" 버튼
- "로그인으로 돌아가기" 링크

### 5.2) 이메일 입력
```
이메일: test1@example.com
```

예상 동작:
- "재설정 링크 보내기" 버튼이 "전송 중..."으로 변경
- 2초 후 성공 메시지 표시
- 1초 후 자동으로 로그인 페이지로 이동

#### 실제 이메일 수신
- 개발 단계에서는 실제 이메일이 발송될 수 있습니다.
- Supabase 대시고 > "Logs" 탭에서 요청 기록 확인 가능

---

## 테스트 6: 로그아웃

### 6.1) 홈 페이지에서 로그아웃 버튼 추가 필요
현재는 로그아웃 버튼이 없으므로, 다음 단계에서 구현:

```tsx
// HomePage.tsx에 추가
import { useAuth } from '../../hooks/useAuth';

const { signOut } = useAuth();

const handleLogOut = async () => {
  try {
    await signOut();
    navigate('/');
  } catch (err) {
    alert('로그아웃 실패');
  }
};
```

### 6.2) 예상 동작
- 로그아웃 버튼 클릭
- 세션 제거
- 자동으로 랜딩 페이지로 이동
- 이후 /home 접근 불가

---

## 브라우저 개발자 도구 디버깅

### F12 열기 > Console 탭

#### 정상 로그
```
[Supabase] 환경 설정 완료
user logged in: (UUID)
profile created: (UUID)
```

#### 에러 로그
```
[Supabase] 환경 설정 누락!
[Auth] 사용자 조회 실패: ...
Supabase error: ...
```

#### Network 탭
- POST /auth/v1/signup → 201 (성공)
- POST /auth/v1/token?grant_type=password → 200 (성공)
- GET /rest/v1/profiles → 200 (성공)

---

## 문제 해결

### Q: 회원가입은 되지만 profiles가 안 만들어짐
**원인**: RLS 정책 또는 권한 문제

**해결**:
1. Supabase > SQL Editor
2. 실행:
```sql
select * from public.profiles;
```
3. 데이터 없으면 RLS 정책 확인
4. rls.sql 재실행

### Q: "Supabase 설정이 필요합니다" 계속 표시
**원인**: .env 파일 미설정 또는 개발 서버 미재시작

**해결**:
1. .env 파일 확인
2. npm run dev 재시작
3. 브라우저 캐시 삭제 (Ctrl+Shift+Delete)
4. 페이지 새로고침 (Ctrl+F5)

### Q: 로그인 후 /home으로 안 넘어감
**원인**: 세션 로드 지연

**해결**:
1. F12 Console 확인
2. 에러 메시지 찾기
3. Network 탭에서 요청 상태 확인
4. Supabase 대시고 > Logs 확인

### Q: CORS 에러
**해결**: 로컬 개발에서는 무시, 프로덕션 배포 시 처리

---

## 다음 단계

✅ 회원가입/로그인 성공 후:
1. 프로필 페이지 구현
2. 게시판 CRUD 구현
3. 댓글 및 좋아요 기능
4. 실시간 업데이트 (Realtime)
5. 이미지 업로드 (Storage)

---

## 참고

- [Supabase Auth 공식 문서](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Database Triggers](https://supabase.com/docs/guides/database/postgres/triggers)
