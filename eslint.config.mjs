import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'scripts/**',
      // Phase 1 exercises start unfinished on purpose; typecheck covers them instead.
      '**/Phase1-TypeScript/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/Phase2-Playwright/**/*.ts'],
    ...playwright.configs['flat/recommended'],
  },
  prettierConfig,
  {
    files: ['**/Phase2-Playwright/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      // Fixed waits make tests slow and flaky; wait for something specific instead (lesson 05).
      'playwright/no-wait-for-timeout': 'error',
      'playwright/no-networkidle': 'error',
    },
  }
);
