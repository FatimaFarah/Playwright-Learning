// Don't edit this file: make these tests pass by writing Pages/Checkout/CheckoutPage.ts.
import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../Pages/Inventory/InventoryPage';
import { CartPage } from '../../Pages/Cart/CartPage';
import { CheckoutPage } from '../../Pages/Checkout/CheckoutPage';

test.describe('Sauce Demo checkout', () => {
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
    await inventoryPage.addToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await new CartPage(page).checkout();
    checkoutPage = new CheckoutPage(page);
  });

  test('Place an order', async () => {
    await checkoutPage.enterDetails('Sam', 'Jones', 'AB1 2CD');
    await checkoutPage.finish();

    await expect(checkoutPage.confirmationHeading).toBeVisible();
  });

  test('Checkout without a postcode shows an error', async () => {
    await checkoutPage.enterDetails('Sam', 'Jones', '');

    await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
  });
});
