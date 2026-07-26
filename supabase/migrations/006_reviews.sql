-- Client review system. Architecture only — no seed data. Reviews are only
-- ever real: entered by the authenticated admin after collecting them
-- manually, or submitted publicly and held as 'pending' until approved.
-- Public read is restricted to approved rows only.

create type review_status as enum ('pending', 'approved', 'rejected');

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  client_name text not null,
  company text,
  business_logo_url text,   -- Supabase Storage public URL
  profile_photo_url text,   -- Supabase Storage public URL
  star_rating smallint not null check (star_rating between 1 and 5),
  written_review text not null,
  review_date date not null default current_date,
  project_slug text references public.case_studies (slug) on delete set null,
  approval_status review_status not null default 'pending'
);

alter table public.reviews enable row level security;

-- Public can read only approved reviews.
create policy "Anyone can read approved reviews"
  on public.reviews for select
  to anon
  using (approval_status = 'approved');

-- Public can submit a review, but it always lands as 'pending' — insert is
-- allowed, but the row-level default plus this check policy prevent a
-- public submission from ever inserting itself as already-approved.
create policy "Anyone can submit a pending review"
  on public.reviews for insert
  to anon
  with check (approval_status = 'pending');

-- No public update/delete policies — RLS defaults to deny. Only the
-- authenticated admin (via the service-role key, server-side, or an
-- authenticated Supabase Auth session scoped to the site owner) can
-- approve, reject, or edit a review. Wire that up alongside the /admin
-- auth work from the v3 spec, not with a public policy here.
