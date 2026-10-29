// Model answer for exercise 05. Try it yourself first!
import { type Page, type Locator } from '@playwright/test';
import { THE_INTERNET_URL } from '@support/config/environment';

export class EntryAdPage {
  readonly page: Page;
  readonly adTitle: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.adTitle = page.getByRole('heading', { name: 'This is a modal window' });
    // "Close" is a plain paragraph with no role, so it's scoped by the pop-up's container instead.
    this.closeButton = page.locator('#modal .modal-footer').getByText('Close');
  }

  async goto() {
    await this.page.goto(`${THE_INTERNET_URL}/entry_ad`);
  }

  async closeAd() {
    await this.closeButton.click();
  }
}
