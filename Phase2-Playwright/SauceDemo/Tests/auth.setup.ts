// Exercise 03, part 1. This runs once, before the Sauce Demo tests: it logs in and saves the
// session to a file, so every test starts already logged in.
// Run: npx playwright test Inventory    (this setup runs first automatically)
import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../Pages/Auth/LoginPage';
import { standardUser } from '@support/test-data/users';
import { SAUCE_DEMO_AUTH_FILE } from '@support/config/auth-paths';
import { SAUCE_DEMO_INVENTORY_URL } from '@support/config/environment';

setup('Log in to Sauce Demo', async ({ page }) => {
  // TODO: log in as standardUser, using your LoginPage from exercise 02

  // Saving before the login completes would save a logged-out session.
  await expect(page).toHaveURL(SAUCE_DEMO_INVENTORY_URL);

  await page.context().storageState({ path: SAUCE_DEMO_AUTH_FILE });
});
