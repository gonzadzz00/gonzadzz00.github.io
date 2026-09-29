import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://gonzadzz00.github.io',
  output: 'static',
  vite: {
    // model-viewer ships debug console.log calls; drop them from the production bundle
    esbuild: { pure: ['console.log'] },
  },
});
