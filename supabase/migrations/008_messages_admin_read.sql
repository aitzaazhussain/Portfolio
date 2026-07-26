-- Allow authenticated admin users to read contact form messages in the dashboard.
-- Public anon role remains insert-only (see 001_messages.sql).

create policy "Authenticated admin can read messages"
  on public.messages for select
  to authenticated
  using (true);
