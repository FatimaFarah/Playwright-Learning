// Exercise 03, part 2. The products page you land on after logging in.
// Run: npx playwright test Inventory
import { type Page, type Locator } from '@playwright/test';
import { SAUCE_DEMO_INVENTORY_URL } from '@support/config/environment';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // TODO: set up the three locators above
  }

  async goto() {
    // TODO: open the products page directly (you're already logged in, thanks to auth.setup.ts)
  }

  productCard(name: string): Locator {
    // TODO: return the product card that contains this product name
  }

  async addToCart(name: string) {
    // TODO: click 'Add to cart' on this product's card
  }

  async openCart() {
    // TODO: click the cart button
  }
}
