// Model answer for exercises 03 and 07. Try them yourself first!
import { type Page, type Locator } from '@playwright/test';
import { SAUCE_DEMO_INVENTORY_URL } from '@support/config/environment';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartButton: Locator;
  readonly sortMenu: Locator;
  readonly productNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartButton = page.getByRole('button', { name: /^Cart/ });
    this.sortMenu = page.getByRole('combobox', { name: 'Sort products' });
    this.productNames = page.getByTestId('inventory-item-name');
  }

  async goto() {
    await this.page.goto(SAUCE_DEMO_INVENTORY_URL);
  }

  productCard(name: string): Locator {
    return this.page.getByTestId('inventory-item').filter({ hasText: name });
  }

  async addToCart(name: string) {
    await this.productCard(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart() {
    await this.cartButton.click();
  }

  // Exercise 07.
  async sortBy(option: string) {
    await this.sortMenu.selectOption(option);
  }
}
