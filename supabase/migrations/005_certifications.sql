create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  issuer text not null,
  issue_date text not null,
  verify_url text not null,
  sort_order int not null default 0
);

alter table public.certifications enable row level security;

create policy "Public can read certifications"
  on public.certifications for select
  to anon
  using (true);
