// Don't edit this file: make these tests pass by writing Pages/Auth/LoginPage.ts.
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/Auth/LoginPage';
import { standardUser, lockedOutUser } from '@support/test-data/users';
import { SAUCE_DEMO_INVENTORY_URL } from '@support/config/environment';

test.describe('Sauce Demo login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Login with valid details opens the products page', async ({ page }) => {
    await loginPage.login(standardUser.username, standardUser.password);

    await expect(page).toHaveURL(SAUCE_DEMO_INVENTORY_URL);
  });

  test('Login as a locked-out user is rejected', async () => {
    await loginPage.login(lockedOutUser.username, lockedOutUser.password);

    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('Login without a password shows an error', async () => {
    await loginPage.login(standardUser.username, '');

    await expect(loginPage.errorMessage).toContainText('Password is required');
  });
});
