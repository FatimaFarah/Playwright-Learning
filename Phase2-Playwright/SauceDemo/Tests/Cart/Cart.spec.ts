// Don't edit this file: make these tests pass by writing Pages/Cart/CartPage.ts.
import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../Pages/Inventory/InventoryPage';
import { CartPage } from '../../Pages/Cart/CartPage';

test.describe('Sauce Demo cart', () => {
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    cartPage = new CartPage(page);
  });

  test('Cart shows the added product', async () => {
    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.items).toContainText('Sauce Labs Backpack');
  });

  test('Remove a product from the cart', async () => {
    await cartPage.remove('Sauce Labs Backpack');

    await expect(cartPage.items).toHaveCount(0);
  });
});
