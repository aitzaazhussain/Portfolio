create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  slug text not null unique,
  title text not null,
  category text not null,
  tags text[] not null default '{}',
  problem text not null,
  solution text not null,
  result text not null,
  img text,
  live_url text,
  github_url text,
  featured boolean not null default false,
  published boolean not null default true
);

alter table public.case_studies enable row level security;

create policy "Public can read published case studies"
  on public.case_studies for select
  to anon
  using (published = true);
