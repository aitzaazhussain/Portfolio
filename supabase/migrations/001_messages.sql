-- Contact form submissions. Insert-only from the client (anon role):
-- no public read, update, or delete. Only accessible via the Supabase
-- dashboard / service-role key (server-side, never shipped to the client).

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  budget text,
  project_type text,
  message text not null
);

alter table public.messages enable row level security;

create policy "Anyone can submit a message"
  on public.messages for insert
  to anon
  with check (true);

-- Explicitly no select/update/delete policies for anon — RLS defaults to
-- deny, but this comment documents the intent so it isn't "fixed" later.
