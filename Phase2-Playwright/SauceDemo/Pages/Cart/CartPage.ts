// Exercise 04. The cart page.
// Run: npx playwright test Cart Checkout
import { type Page, type Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly items: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // TODO: set up the two locators above (`items` should find every product in the cart)
  }

  async remove(name: string) {
    // TODO: click 'Remove' on this product's row
  }

  async checkout() {
    // TODO: click Checkout
  }
}
