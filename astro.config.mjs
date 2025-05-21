// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],

  vite: {
    envPrefix: ['TMDB_', 'API_'],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5002',
          changeOrigin: true,
          secure: false
        }
      }
    }
  },

  output: 'server',

  server: {
    port: 4321,
    host: true
  },

  adapter: netlify()
});