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

## Connecting the form

The request form is a preview. It shows a "not connected" note and sends nothing. To connect it, replace the script
at the bottom of `src/components/RequestForm.astro` with a submit to your form service (for example Formspree,
Netlify Forms, or your own endpoint), then update `request.previewNote` in `site.ts`.

## Deploying

`npm run build` produces plain files in `dist/`. Any static host works (Cloudflare Pages, Netlify, GitHub Pages,
or your own server). Set the build command to `npm run build` and the output folder to `dist`.
