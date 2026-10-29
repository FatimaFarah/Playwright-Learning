// Exercise 06. Someone wrote these tests in a hurry, and each one is broken in a different way.
// Use the error message, the trace and `npm run lint` to find out why, then fix each one properly.
// Run: npx playwright test Broken    and    npm run lint
import { test, expect } from '@playwright/test';
import { THE_INTERNET_URL } from '@support/config/environment';

test.describe('Debugging practice', () => {
  test('Start loading shows Hello World', async ({ page }) => {
    await page.goto(`${THE_INTERNET_URL}/dynamic_loading/2`);
    await page.getByRole('button', { name: 'Start' }).click();
    await page.waitForTimeout(2000);

    expect(await page.getByText('Hello World!').isVisible()).toBe(true);
  });

  test('Remove the checkbox', async ({ page }) => {
    await page.goto(`${THE_INTERNET_URL}/dynamic_controls`);
    await page.getByRole('button').click();

    await expect(page.getByRole('checkbox')).toBeHidden({ timeout: 10_000 });
  });

  // Hint: read the last line of the call log in the error. Why did the test end so early?
  test('Enable the text box', async ({ page }) => {
    await page.goto(`${THE_INTERNET_URL}/dynamic_controls`);
    await page.getByRole('button', { name: 'Enable' }).click();

    expect(page.getByRole('textbox')).toBeEnabled({ timeout: 10_000 });
  });
});
