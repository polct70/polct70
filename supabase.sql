-- profiles 扩展表（关联 auth.users）
create table profiles (
  id uuid primary key references auth.users(uid),
  display_name text,
  bio text,
  avatar_url text,
  updated_at timestamptz default now()
);

-- 通用内容表（type: 'note'|'work'|'interest')
create table items (
  id uuid primary key default gen_random_uuid(),
  owner uuid references auth.users(uid),
  type text not null, -- 'note' | 'work' | 'interest'
  title text,
  content text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- （可选）允许公开读取 items（视需求）
grant select on items to public;
