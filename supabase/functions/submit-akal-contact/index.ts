// submit-akal-contact
// Public-callable Deno edge function that handles contact-form submissions
// from www.akalds.com. Validates input, persists to akal_contacts via the
// service role (bypasses RLS), and fires an internal email notification via
// Resend if RESEND_API_KEY is configured.
//
// Env (set via `supabase secrets set ... --project-ref qpnhuexkrhculbiayfgf`):
//   SUPABASE_URL             — auto-injected by Supabase runtime
//   SUPABASE_SERVICE_ROLE_KEY — auto-injected by Supabase runtime
//   RESEND_API_KEY           — optional; if unset, skips email step
//   RESEND_FROM              — e.g. "Akal Digital Services <leads@raccordement-connect.com>"
//   NOTIFY_TO                — e.g. "ryanaoufal@gmail.com"

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const RESEND_FROM = Deno.env.get('RESEND_FROM') ?? 'Akal Digital Services <leads@raccordement-connect.com>';
const NOTIFY_TO = Deno.env.get('NOTIFY_TO') ?? 'ryanaoufal@gmail.com';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type ContactPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string | null;
  service?: string;
  message?: string;
};

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function validate(input: ContactPayload): { ok: true; data: Required<Omit<ContactPayload, 'phone'>> & { phone: string | null } } | { ok: false; error: string } {
  const firstName = (input.firstName ?? '').trim();
  const lastName = (input.lastName ?? '').trim();
  const email = (input.email ?? '').trim().toLowerCase();
  const phone = input.phone ? input.phone.toString().trim() : null;
  const service = (input.service ?? '').trim();
  const message = (input.message ?? '').trim();

  if (!firstName || firstName.length > 100) return { ok: false, error: 'invalid firstName' };
  if (!lastName || lastName.length > 100) return { ok: false, error: 'invalid lastName' };
  if (!email || !isEmail(email) || email.length > 320) return { ok: false, error: 'invalid email' };
  if (!service || service.length > 100) return { ok: false, error: 'invalid service' };
  if (!message || message.length > 5000) return { ok: false, error: 'invalid message' };
  if (phone && phone.length > 50) return { ok: false, error: 'invalid phone' };

  return { ok: true, data: { firstName, lastName, email, phone, service, message } };
}

async function sendNotification(record: { id: string; firstName: string; lastName: string; email: string; phone: string | null; service: string; message: string; }) {
  if (!RESEND_API_KEY) return { skipped: true as const };

  const subject = `[akalds.com] New contact: ${record.firstName} ${record.lastName} — ${record.service}`;
  const text = [
    `A new contact form was submitted on www.akalds.com.`,
    ``,
    `Name:    ${record.firstName} ${record.lastName}`,
    `Email:   ${record.email}`,
    `Phone:   ${record.phone ?? '—'}`,
    `Service: ${record.service}`,
    ``,
    `Message:`,
    record.message,
    ``,
    `—`,
    `Submission ID: ${record.id}`,
  ].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [NOTIFY_TO],
      reply_to: record.email,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error('resend error', res.status, detail);
    return { skipped: false as const, ok: false, status: res.status, detail };
  }
  return { skipped: false as const, ok: true };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method not allowed' }), {
      status: 405,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid json' }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  const v = validate(body);
  if (!v.ok) {
    return new Response(JSON.stringify({ error: v.error }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }
  const { firstName, lastName, email, phone, service, message } = v.data;

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const userAgent = req.headers.get('user-agent');
  const ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;

  const { data, error } = await supabase
    .from('akal_contacts')
    .insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      service,
      message,
      source: 'website',
      user_agent: userAgent,
      ip_address: ipAddress,
    })
    .select('id')
    .single();

  if (error || !data) {
    console.error('insert error', error);
    return new Response(JSON.stringify({ error: 'persistence failed' }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  const notifyResult = await sendNotification({
    id: data.id,
    firstName, lastName, email, phone, service, message,
  }).catch((err) => {
    console.error('notification threw', err);
    return { skipped: false as const, ok: false, error: String(err) };
  });

  return new Response(
    JSON.stringify({
      ok: true,
      id: data.id,
      notified: 'ok' in notifyResult ? notifyResult.ok : false,
    }),
    { status: 200, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
  );
});
