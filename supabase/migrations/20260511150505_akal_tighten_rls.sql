-- Tighten RLS + clean up debug artifacts.
--
-- Decision: front-end inserts will go through edge functions (which use the
-- service_role and bypass RLS), not direct PostgREST calls with the anon key.
-- This is both more secure (no public table privileges) and what we need to
-- attach side-effects to a submission (email notification on contact form).

-- 1) Drop debug artifacts left over from RLS investigation.

drop table if exists public.policy_test cascade;
drop function if exists public.whoami() cascade;

-- 2) Drop anon policies & grants on akal_* tables. Service role bypasses RLS,
--    so the edge function will work without these. If we ever need direct
--    anon access from the browser, we'll add policies back deliberately.

drop policy if exists "public insert v3" on public.akal_contacts;
drop policy if exists "anon insert v2" on public.akal_contacts;
drop policy if exists "anon can insert contacts" on public.akal_contacts;
drop policy if exists "anon can insert subscribers" on public.akal_subscribers;
drop policy if exists "anon can insert events" on public.akal_events;

revoke insert on table public.akal_contacts from anon;
revoke insert on table public.akal_subscribers from anon;
revoke insert on table public.akal_events from anon;

-- RLS stays enabled; with no policies and no grants, anon role has no access.
-- All writes must come from service_role (i.e. from a trusted edge function).
