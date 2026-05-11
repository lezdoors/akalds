-- Grant the anon role the table-level privileges it needs.
-- RLS policies only filter *which* rows are accessible — the role still needs
-- a base GRANT to reach the table at all.

grant insert on table public.akal_contacts to anon;
grant insert on table public.akal_subscribers to anon;
grant insert on table public.akal_events to anon;

-- Service role bypasses RLS and already has full access by default; no grants
-- needed there. Authenticated role has no access (no use case yet).
