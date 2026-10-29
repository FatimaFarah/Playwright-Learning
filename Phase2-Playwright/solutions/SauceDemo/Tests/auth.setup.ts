// Model answer for exercise 03, part 1. Try it yourself first!
import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../Pages/Auth/LoginPage';
import { standardUser } from '@support/test-data/users';
import { SAUCE_DEMO_AUTH_FILE } from '@support/config/auth-paths';
import { SAUCE_DEMO_INVENTORY_URL } from '@support/config/environment';

setup('Log in to Sauce Demo', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(standardUser.username, standardUser.password);
  // Saving before the login completes would save a logged-out session.
  await expect(page).toHaveURL(SAUCE_DEMO_INVENTORY_URL);

  await page.context().storageState({ path: SAUCE_DEMO_AUTH_FILE });
});
