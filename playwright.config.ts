import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: 'list',
  projects: [
    {
      // No browser here: Phase 1 tests only check your TypeScript, so they finish in seconds.
      name: 'phase1',
      testDir: './Phase1-TypeScript',
    },
  ],
});
