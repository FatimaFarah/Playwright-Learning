// Don't edit this file: make this test pass by writing Pages/EntryAd/EntryAdPage.ts.
import { test, expect } from '@playwright/test';
import { EntryAdPage } from '../../Pages/EntryAd/EntryAdPage';

test.describe('The Internet entry ad', () => {
  test('Close the entry ad', async ({ page }) => {
    const entryAdPage = new EntryAdPage(page);
    await entryAdPage.goto();
    await expect(entryAdPage.adTitle).toBeVisible();

    await entryAdPage.closeAd();

    await expect(entryAdPage.adTitle).toBeHidden();
  });
});
