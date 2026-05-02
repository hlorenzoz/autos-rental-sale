import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/tests/setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      all: true,
      thresholds: {
        statements: 85,
        branches: 85,
        functions: 85,
        lines: 85,
      },
      exclude: [
        'node_modules/**',
        '.agents/**',
        'src/tests/**',
        'src/env.d.ts',
        '**/*.config.*',
        'dist/**',
        '.astro/**',
        '**/*.astro',
        'tests/**',
        'public/**',
        'src/components/ui/HeroSearchIsland.tsx',
        'src/components/ui/SearchPill.tsx',
      ],
    },
  },
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**', '**/coverage/**'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
