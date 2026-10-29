import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequestPost, hostAllowed } from '../functions/api/contact.js';

const env = {
  TURNSTILE_SECRET: 's', RESEND_API_KEY: 're_x', MAIL_TO: 'a@x.com, b@x.com',
  MAIL_FROM: 'Site <forms@x.com>', SITE_NAME: 'Foils', ALLOWED_HOSTS: 'x.com,*.foils.pages.dev',
};
const good = { need: 'Pickup Bags', upgrade: 'Add aluminum can box', name: 'Pat <b>', email: 'pat@salon.com', phone: '555', location: 'Salon', address: '1 Main', open_days: ['Monday', 'Bogus'], website: '', turnstile: 'tok' };
const req = (body, origin = 'https://x.com') =>
  new Request('https://x.com/api/contact', { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: typeof body === 'string' ? body : JSON.stringify(body) });

function mockFetch({ ts = true, resend = 200 } = {}) {
  const calls = [];
  globalThis.fetch = async (url, opts) => {
    calls.push({ url: String(url), opts });
    if (String(url).includes('turnstile')) return new Response(JSON.stringify({ success: ts }));
    return new Response('{}', { status: resend });
  };
  return calls;
}

test('hostAllowed', () => {
  assert.ok(hostAllowed('x.com', env.ALLOWED_HOSTS));
  assert.ok(hostAllowed('feat.foils.pages.dev', env.ALLOWED_HOSTS));
  assert.ok(!hostAllowed('foils.pages.dev', env.ALLOWED_HOSTS));
  assert.ok(!hostAllowed('evilfoils.pages.dev', env.ALLOWED_HOSTS));
  assert.ok(!hostAllowed('', env.ALLOWED_HOSTS));
});

test('happy path sends one email with reply_to and escaped html', async () => {
  const calls = mockFetch();
  const r = await onRequestPost({ request: req(good), env });
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), { ok: true });
  const mail = calls.find((c) => c.url.includes('resend'));
  const b = JSON.parse(mail.opts.body);
  assert.equal(b.reply_to, 'pat@salon.com');
  assert.deepEqual(b.to, ['a@x.com', 'b@x.com']);
  assert.ok(b.html.includes('Pat &lt;b&gt;'));
  assert.ok(b.text.includes('Open days: Monday'));
  assert.ok(!b.text.includes('Bogus'));
  assert.equal(calls.filter((c) => c.url.includes('resend')).length, 1);
});

test('bad origin is rejected before any network call', async () => {
  const calls = mockFetch();
  const r = await onRequestPost({ request: req(good, 'https://evil.com'), env });
  assert.equal(r.status, 403);
  assert.equal(calls.length, 0);
});

test('honeypot returns ok without emailing', async () => {
  const calls = mockFetch();
  const r = await onRequestPost({ request: req({ ...good, website: 'spam' }), env });
  assert.equal(r.status, 200);
  assert.equal(calls.length, 0);
});

test('invalid fields', async () => {
  mockFetch();
  for (const bad of [{ name: '' }, { email: 'nope' }, { need: 'Other' }, { upgrade: 'x' }]) {
    const r = await onRequestPost({ request: req({ ...good, ...bad }), env });
    assert.equal(r.status, 400);
    assert.equal((await r.json()).error, 'invalid');
  }
  const r = await onRequestPost({ request: req('not json'), env });
  assert.equal(r.status, 400);
});

test('turnstile failure or missing token blocks email', async () => {
  let calls = mockFetch({ ts: false });
  let r = await onRequestPost({ request: req(good), env });
  assert.equal(r.status, 400);
  assert.equal((await r.json()).error, 'turnstile');
  assert.ok(!calls.some((c) => c.url.includes('resend')));
  calls = mockFetch();
  r = await onRequestPost({ request: req({ ...good, turnstile: '' }), env });
  assert.equal(r.status, 400);
  assert.equal(calls.length, 0);
});

test('resend failure returns 502; missing secret returns 500', async () => {
  mockFetch({ resend: 422 });
  let r = await onRequestPost({ request: req(good), env });
  assert.equal(r.status, 502);
  r = await onRequestPost({ request: req(good), env: { ...env, RESEND_API_KEY: '' } });
  assert.equal(r.status, 500);
});
