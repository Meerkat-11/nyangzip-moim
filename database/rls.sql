-- RLS 활성화
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.likes enable row level security;
alter table public.notifications enable row level security;
alter table public.announcements enable row level security;
alter table public.reports enable row level security;
alter table public.user_blocks enable row level security;
alter table public.moderation_logs enable row level security;
alter table public.rate_limits enable row level security;
alter table public.chat_rooms enable row level security;
alter table public.chat_room_users enable row level security;
alter table public.messages enable row level security;

-- 관리자 역할 체크용 함수
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select coalesce(
    (select true from public.profiles where id = auth.uid() and nickname = 'admin'),
    false
  );
$$;

-- 공개 읽기 정책
create policy "Profiles are viewable by anyone"
on public.profiles
for select
using (true);

create policy "Categories are viewable by anyone"
on public.categories
for select
using (true);

create policy "Posts are viewable by anyone"
on public.posts
for select
using (true);

create policy "Comments are viewable by anyone"
on public.comments
for select
using (true);

create policy "Announcements are viewable by anyone"
on public.announcements
for select
using (true);

-- 자신의 프로필 관리
create policy "Users can insert their own profile"
on public.profiles
for insert
with check (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

-- 게시글 및 댓글 권한
create policy "Users can insert their own posts"
on public.posts
for insert
with check (auth.uid() = user_id);

create policy "Users can update their own posts"
on public.posts
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own posts"
on public.posts
for delete
using (auth.uid() = user_id or public.is_admin());

create policy "Users can insert comments on posts"
on public.comments
for insert
with check (auth.uid() = user_id);

create policy "Users can update their own comments"
on public.comments
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own comments"
on public.comments
for delete
using (auth.uid() = user_id or public.is_admin());

-- 좋아요
create policy "Users can manage their own likes"
on public.likes
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- 알림
create policy "Users can view their own notifications"
on public.notifications
for select
using (auth.uid() = user_id);

create policy "Users can update their own notifications"
on public.notifications
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- 채팅
create policy "Users can access chat rooms they belong to"
on public.chat_rooms
for select
using (exists (
  select 1 from public.chat_room_users where room_id = chat_rooms.id and user_id = auth.uid()
));

create policy "Users can insert chat rooms they create"
on public.chat_rooms
for insert
with check (auth.uid() = created_by);

create policy "Users can manage their own room membership"
on public.chat_room_users
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can manage messages in their rooms"
on public.messages
for all
using (
  exists (
    select 1 from public.chat_room_users
    where room_id = messages.room_id and user_id = auth.uid()
  )
)
with check (
  auth.uid() = sender_id and exists (
    select 1 from public.chat_room_users
    where room_id = messages.room_id and user_id = auth.uid()
  )
);

-- 신고 내역은 관리자만 보기
create policy "Reports visible to admin only"
on public.reports
for all
using (public.is_admin())
with check (public.is_admin() or auth.uid() = reporter_id);

-- moderation_logs는 관리자만 접근
create policy "Moderation logs admin only"
on public.moderation_logs
for all
using (public.is_admin());

-- 관리자 전용 기능 예시
create policy "Admins can manage categories"
on public.categories
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can manage announcements"
on public.announcements
for all
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can manage rate limits"
on public.rate_limits
for all
using (public.is_admin())
with check (public.is_admin());
