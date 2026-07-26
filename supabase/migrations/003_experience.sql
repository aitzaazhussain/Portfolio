create table if not exists public.experience (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  company text not null,
  role text not null,
  period text not null,
  description text not null,
  achievements text[] not null default '{}',
  sort_order int not null default 0
);

alter table public.experience enable row level security;

create policy "Public can read experience"
  on public.experience for select
  to anon
  using (true);
