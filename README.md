# Foils For The Future landing page

SOHO Hair Academy salon foil-recycling program page. Built with [Astro](https://astro.build) as a static site.

## Run it

Needs Node 20 or newer.

```bash
npm install
npm run dev        # http://localhost:4871
npm run build      # writes the finished site to dist/
npm run preview    # serves dist/ at http://localhost:4871
```

The port is 4871 on purpose, and `strictPort` is on. If something else is already using it, Astro stops with an error
instead of moving to another port. To use a different port, change `server.port` in `astro.config.mjs`.

## Where to edit

| To change | Edit |
|---|---|
| Any wording, scholarship details, campus addresses and links | `src/data/site.ts` |
| Colors (palette) and spacing | `src/styles/global.css` (the `:root` block at the top) |
| Layout of a section | `src/components/*.astro` |
| Images | `public/images/` |
| Page title | `site.title` in `src/data/site.ts` |

Anything in `[brackets]` in `site.ts` is a placeholder that still needs a real answer, mainly the scholarship details.

## Rules for the copy

- No "tax-deductible", "donate", "eco-friendly" or "zero waste" claims.
- Say "a local metal recycler". Do not name the recycler.
- Do not name Green Circle in print.
- Do not mention FAFSA or federal aid for the Nebraska campus.

## The request form

The form posts to `/api/contact` (`functions/api/contact.js`, a Cloudflare Pages Function). It checks the origin, a hidden
honeypot field, the fields, and Cloudflare Turnstile, then emails the request through Resend with `reply_to` set to the
visitor. Under `npm run dev` there is no function, so submitting shows the error message; test the real thing on a
Cloudflare Pages preview URL.

Setup: put the public Turnstile Site Key in `TURNSTILE_PROD_KEY` in `src/data/site.ts` (the build stops until you do), and add
these Secrets in the Pages project (Production and Preview): `TURNSTILE_SECRET`, `RESEND_API_KEY`, `MAIL_TO`, `MAIL_FROM`,
`SITE_NAME`, `ALLOWED_HOSTS`. `ALLOWED_HOSTS` is comma-separated and accepts `*.foils-for-the-future.pages.dev` for previews.
Never commit keys. `.dev.vars.example` shows the names. Run the function tests with `node --test tests/contact.test.mjs`.

## Deploying

`npm run build` produces plain files in `dist/`. Any static host works (Cloudflare Pages, Netlify, GitHub Pages,
or your own server). Set the build command to `npm run build` and the output folder to `dist`.
