create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  slug text not null unique,
  title text not null,
  category text not null,
  read_time text,
  published_at date not null default current_date,
  img text,
  excerpt text,
  content text,
  published boolean not null default true
);

alter table public.blog_posts enable row level security;

create policy "Public can read published blog posts"
  on public.blog_posts for select
  to anon
  using (published = true);
