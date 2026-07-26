-- Adds everything the /admin dashboard needs that earlier migrations didn't
-- cover: (1) write access for a logged-in admin on case_studies, and
-- (2) a new site_settings table to hold the editable bio/tagline copy that
-- previously only existed as hardcoded JSX in components/sections/About.tsx.
--
-- Run this in the Supabase SQL Editor (or `supabase db push` if you use the
-- CLI) same as the other files in this folder.

-- ── 1. Let a logged-in admin write to case_studies ─────────────────────────
-- Migration 002 only granted the anon role SELECT on published rows. There
-- was no INSERT/UPDATE/DELETE policy for anyone, which is why the /admin
-- forms would silently fail (RLS defaults to deny) without this.
--
-- "authenticated" here means ANY Supabase Auth session, not a specific
-- person. That's fine ONLY because this project has no public sign-up page
-- — the one and only account is the one you create by hand in the Supabase
-- dashboard (Authentication → Users → Add user). If you ever add public
-- registration, tighten these policies (e.g. check auth.uid() against a
-- specific admin user id) before shipping it.

create policy "Authenticated admin can insert case studies"
  on public.case_studies for insert
  to authenticated
  with check (true);

create policy "Authenticated admin can update case studies"
  on public.case_studies for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated admin can delete case studies"
  on public.case_studies for delete
  to authenticated
  using (true);

-- Admin also needs to see unpublished drafts in the dashboard list, not
-- just the public-facing published ones.
create policy "Authenticated admin can read all case studies"
  on public.case_studies for select
  to authenticated
  using (true);

-- ── 2. Bio / site settings (single row) ─────────────────────────────────
-- The About section previously had its 3 paragraphs and tagline hardcoded
-- in components/sections/About.tsx. This table gives the /admin/bio form
-- somewhere real to write to. It's a "singleton" table — always exactly
-- one row, id fixed to 'main' so the app never has to guess which row to
-- fetch.

create table if not exists public.site_settings (
  id text primary key default 'main',
  tagline text not null default '',
  about_paragraph_1 text not null default '',
  about_paragraph_2 text not null default '',
  about_paragraph_3 text not null default '',
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "Public can read site settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

create policy "Authenticated admin can update site settings"
  on public.site_settings for update
  to authenticated
  using (id = 'main')
  with check (id = 'main');

-- Seed the single row with the current copy from lib/data.ts / About.tsx so
-- the public site keeps showing the same text the moment this migration
-- runs and app/page.tsx switches over to reading from Supabase.
insert into public.site_settings (id, tagline, about_paragraph_1, about_paragraph_2, about_paragraph_3)
values (
  'main',
  'Full-stack developer, Shopify expert & AI solutions engineer',
  'I''m Aitzaaz Hussain — a full-stack developer, Shopify specialist, and AI solutions engineer who builds for outcomes, not just features.',
  'I''ve built complete, production websites for real local businesses — including Al Madina Fast Food in Abbottabad, Al Baik Savour & BBQ, and Taj Mahal Banquet & Shadi Hall — handling everything from planning through launch and ongoing support.',
  'Every project starts the same way: understand your business model and what success looks like, then let that shape the architecture, the UX, and every integration decision that follows. Full-stack, Shopify, and AI — all under one accountable, communicative partner.'
)
on conflict (id) do nothing;
