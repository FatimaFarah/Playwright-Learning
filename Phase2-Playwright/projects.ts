import { devices, type Project } from '@playwright/test';
import path from 'path';
import { SAUCE_DEMO_AUTH_FILE } from '@support/config/auth-paths';

const chrome = devices['Desktop Chrome'];
// Sauce Demo's test ids are in data-test attributes, not Playwright's default data-testid.
const sauceDemo = { ...chrome, testIdAttribute: 'data-test' };

// One project per practice site, so an unfinished exercise on one site can't stop the others.
export const phase2Projects: Project[] = [
  { name: 'todomvc', testDir: path.join(__dirname, 'TodoMVC/Tests'), use: chrome },
  {
    // Kept apart from 'saucedemo' because these tests must start logged out.
    name: 'saucedemo-login',
    testDir: path.join(__dirname, 'SauceDemo/Tests/Auth'),
    use: sauceDemo,
  },
  {
    name: 'saucedemo-setup',
    testDir: path.join(__dirname, 'SauceDemo/Tests'),
    testMatch: 'auth.setup.ts',
    use: sauceDemo,
  },
  {
    name: 'saucedemo',
    testDir: path.join(__dirname, 'SauceDemo/Tests'),
    testIgnore: 'Auth/**',
    dependencies: ['saucedemo-setup'],
    use: { ...sauceDemo, storageState: SAUCE_DEMO_AUTH_FILE },
  },
  { name: 'the-internet', testDir: path.join(__dirname, 'TheInternet/Tests'), use: chrome },
];
