// Model answer for exercise 07. Yours can look different and still be right. Compare the ideas,
// not the exact wording.
import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../Pages/Inventory/InventoryPage';

test.describe('Sauce Demo product sorting', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
  });

  test('Sort products by price, low to high', async () => {
    await inventoryPage.sortBy('Price (low to high)');

    await expect(inventoryPage.productNames.first()).toHaveText('Sauce Labs Onesie');
    await expect(inventoryPage.productNames.last()).toHaveText('Sauce Labs Fleece Jacket');
  });

  test('Sort products by name, Z to A', async () => {
    await inventoryPage.sortBy('Name (Z to A)');

    await expect(inventoryPage.productNames.first()).toHaveText(
      'Test.allTheThings() T-Shirt (Red)'
    );
  });
});
