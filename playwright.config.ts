import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { phase2Projects } from './Phase2-Playwright/projects';

dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

export default defineConfig({
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    // Kept for every failure, so there's always a trace to open while you're learning.
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      // No browser here: Phase 1 tests only check your TypeScript, so they finish in seconds.
      name: 'phase1',
      testDir: './Phase1-TypeScript',
    },
    ...phase2Projects,
  ],
});
