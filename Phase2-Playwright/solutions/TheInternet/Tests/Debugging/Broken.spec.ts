// Model answer for exercise 06. Try it yourself first!
import { test, expect } from '@playwright/test';
import { THE_INTERNET_URL } from '@support/config/environment';

test.describe('Debugging practice', () => {
  // Was: a fixed 2-second wait, then a one-off isVisible() check. Loading takes about 5.5 seconds,
  // so the check ran too early, and isVisible() doesn't wait or retry.
  test('Start loading shows Hello World', async ({ page }) => {
    await page.goto(`${THE_INTERNET_URL}/dynamic_loading/2`);
    await page.getByRole('button', { name: 'Start' }).click();

    // Loading takes about 5.5 seconds, longer than the 5-second default.
    await expect(page.getByText('Hello World!')).toBeVisible({ timeout: 10_000 });
  });

  // Was: getByRole('button') matched both the Remove and Enable buttons (a "strict mode violation").
  test('Remove the checkbox', async ({ page }) => {
    await page.goto(`${THE_INTERNET_URL}/dynamic_controls`);
    await page.getByRole('button', { name: 'Remove' }).click();

    await expect(page.getByRole('checkbox')).toBeHidden({ timeout: 10_000 });
  });

  // Was: no `await` on expect, so the test finished without waiting for the check ("Test ended."
  // in the call log). Lint's missing-playwright-await rule catches this before you even run it.
  test('Enable the text box', async ({ page }) => {
    await page.goto(`${THE_INTERNET_URL}/dynamic_controls`);
    await page.getByRole('button', { name: 'Enable' }).click();

    await expect(page.getByRole('textbox')).toBeEnabled({ timeout: 10_000 });
  });
});
