// Cloudflare Pages Function: POST /api/contact
// Checks origin, honeypot, fields and Cloudflare Turnstile, then emails the request through Resend.
// Required Secrets: TURNSTILE_SECRET, RESEND_API_KEY, MAIL_TO, MAIL_FROM, SITE_NAME, ALLOWED_HOSTS

const NEEDS = ['A box for my salon', 'A box for my suite', 'Pickup Bags'];
const UPGRADES = ['Not right now', 'Add aluminum can box'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

const clean = (v, max) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max) : '');
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// ALLOWED_HOSTS is a comma list. "*.example.pages.dev" matches any subdomain (for branch previews).
export function hostAllowed(host, list) {
  const h = (host || '').toLowerCase();
  return (list || '')
    .split(',')
    .map((x) => x.trim().toLowerCase())
    .filter(Boolean)
    .some((a) => (a.startsWith('*.') ? h.endsWith(a.slice(1)) && h.length > a.length - 1 : h === a));
}

export async function onRequestPost({ request, env }) {
  const missing = ['TURNSTILE_SECRET', 'RESEND_API_KEY', 'MAIL_TO', 'MAIL_FROM', 'SITE_NAME', 'ALLOWED_HOSTS'].filter((k) => !env[k]);
  if (missing.length) {
    console.error('contact: missing secrets', missing.join(','));
    return json({ ok: false, error: 'server_config' }, 500);
  }

  let originHost = '';
  try {
    originHost = new URL(request.headers.get('origin') || '').host;
  } catch {}
  if (!hostAllowed(originHost, env.ALLOWED_HOSTS)) return json({ ok: false, error: 'origin' }, 403);

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid' }, 400);
  }
  if (!data || typeof data !== 'object') return json({ ok: false, error: 'invalid' }, 400);

  // Honeypot: real visitors never fill this. Pretend success so bots learn nothing.
  if (clean(data.website, 200)) return json({ ok: true });

  const need = clean(data.need, 60);
  const upgrade = clean(data.upgrade, 60) || UPGRADES[0];
  const name = clean(data.name, 120);
  const email = clean(data.email, 200);
  const phone = clean(data.phone, 40);
  const location = clean(data.location, 160);
  const address = clean(data.address, 240);
  const days = (Array.isArray(data.open_days) ? data.open_days : []).filter((d) => DAYS.includes(d));
  const token = clean(data.turnstile, 4096);

  const problems = [];
  if (!NEEDS.includes(need)) problems.push('need');
  if (!UPGRADES.includes(upgrade)) problems.push('upgrade');
  if (!name) problems.push('name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) problems.push('email');
  if (problems.length) return json({ ok: false, error: 'invalid', fields: problems }, 400);
  if (!token) return json({ ok: false, error: 'turnstile' }, 400);

  const form = new FormData();
  form.append('secret', env.TURNSTILE_SECRET);
  form.append('response', token);
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) form.append('remoteip', ip);
  let verified = false;
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    verified = !!(await r.json()).success;
  } catch (e) {
    console.error('contact: turnstile request failed', e);
    return json({ ok: false, error: 'send' }, 502);
  }
  if (!verified) return json({ ok: false, error: 'turnstile' }, 400);

  const rows = [
    ['What they need', need],
    ['Upgrade Your Impact', upgrade],
    ['Name', name],
    ['Email', email],
    ['Phone', phone || '(not given)'],
    ['Salon, suite or building', location || '(not given)'],
    ['Address', address || '(not given)'],
    ['Open days', days.length ? days.join(', ') : '(not given)'],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `<table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif">${rows
    .map(([k, v]) => `<tr><td><strong>${esc(k)}</strong></td><td>${esc(v)}</td></tr>`)
    .join('')}</table>`;

  let res;
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        from: env.MAIL_FROM,
        to: env.MAIL_TO.split(',').map((s) => s.trim()).filter(Boolean),
        reply_to: email,
        subject: `${env.SITE_NAME}: ${need} (${name})`,
        text,
        html,
      }),
    });
  } catch (e) {
    console.error('contact: resend request failed', e);
    return json({ ok: false, error: 'send' }, 502);
  }
  if (!res.ok) {
    console.error('contact: resend status', res.status, await res.text().catch(() => ''));
    return json({ ok: false, error: 'send' }, 502);
  }
  return json({ ok: true });
}

export const onRequest = () => json({ ok: false, error: 'method' }, 405);
