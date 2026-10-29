// Model answer for exercise 04. Try it yourself first!
import { type Page, type Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly items: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.getByTestId('inventory-item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async remove(name: string) {
    await this.items.filter({ hasText: name }).getByRole('button', { name: 'Remove' }).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}
