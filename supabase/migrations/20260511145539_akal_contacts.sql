-- Akal Digital Services — initial schema.
--
-- Restructures the qpnhuexkrhculbiayfgf project after it was paused/unused.
-- The previous tables (craftsmen, orders, products, admin_users) were leftover
-- scaffolding from how this project was originally created; we drop them.
--
-- The new schema is purpose-built for Akal:
--   * akal_contacts — contact-form submissions from www.akalds.com
--   * akal_subscribers — newsletter / interest signups (future)
--   * akal_events — lightweight event log (future analytics + audit)

-- ── Drop legacy scaffold ────────────────────────────────────────────────────

drop function if exists public.rls_auto_enable() cascade;

drop table if exists public.orders cascade;
drop table if exists public.products cascade;
drop table if exists public.craftsmen cascade;
drop table if exists public.admin_users cascade;

-- ── akal_contacts ──────────────────────────────────────────────────────────

create table public.akal_contacts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  service text not null,
  message text not null,
  status text not null default 'new',
  source text default 'website',
  ip_address inet,
  user_agent text
);

create index akal_contacts_created_at_idx
  on public.akal_contacts (created_at desc);

create index akal_contacts_status_idx
  on public.akal_contacts (status);

alter table public.akal_contacts enable row level security;

-- Public form submissions via anon key.
create policy "anon can insert contacts"
  on public.akal_contacts
  for insert
  to anon
  with check (true);

-- ── akal_subscribers ───────────────────────────────────────────────────────

create table public.akal_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique,
  source text default 'website',
  consented_at timestamptz,
  unsubscribed_at timestamptz
);

alter table public.akal_subscribers enable row level security;

create policy "anon can insert subscribers"
  on public.akal_subscribers
  for insert
  to anon
  with check (true);

-- ── akal_events ────────────────────────────────────────────────────────────

create table public.akal_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_type text not null,
  entity_type text,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  ip_address inet,
  user_agent text
);

create index akal_events_created_at_idx
  on public.akal_events (created_at desc);

create index akal_events_event_type_idx
  on public.akal_events (event_type);

alter table public.akal_events enable row level security;

create policy "anon can insert events"
  on public.akal_events
  for insert
  to anon
  with check (true);
