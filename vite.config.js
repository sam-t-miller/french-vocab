import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  base: '/french/',
  plugins: [svelte()],
  test: {
    include: ['src/**/*.test.ts'],
  },
});
