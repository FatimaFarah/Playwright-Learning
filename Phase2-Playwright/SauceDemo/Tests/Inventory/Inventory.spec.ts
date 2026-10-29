// Don't edit this file: make these tests pass by writing ../auth.setup.ts and
// Pages/Inventory/InventoryPage.ts.
import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../Pages/Inventory/InventoryPage';

test.describe('Sauce Demo products', () => {
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
  });

  test('Products page opens already logged in', async () => {
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('Add a product to the cart', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');

    await expect(inventoryPage.cartBadge).toHaveText('1');
    await expect(
      inventoryPage.productCard('Sauce Labs Backpack').getByRole('button', { name: 'Remove' })
    ).toBeVisible();
  });

  test('Add two products to the cart', async () => {
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.addToCart('Sauce Labs Bike Light');

    await expect(inventoryPage.cartBadge).toHaveText('2');
  });
});
