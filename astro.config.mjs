import { defineConfig } from 'astro/config';

// Dev and preview use uncommon, fixed ports on purpose.
// strictPort makes Astro stop with an error if the port is taken,
// instead of quietly hopping to another port that a different project may use.
export default defineConfig({
  server: { host: 'localhost', port: 4871, strictPort: true },
  devToolbar: { enabled: false },
});
