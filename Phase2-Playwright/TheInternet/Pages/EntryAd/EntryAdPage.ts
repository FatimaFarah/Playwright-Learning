// Exercise 05. A page that shows an advert pop-up shortly after it loads.
// Run: npx playwright test DynamicControls EntryAd
import { type Page, type Locator } from '@playwright/test';
import { THE_INTERNET_URL } from '@support/config/environment';

export class EntryAdPage {
  readonly page: Page;
  readonly adTitle: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // TODO: set up the two locators above. The lesson explains why closeButton is the tricky one.
  }

  async goto() {
    // TODO: open `${THE_INTERNET_URL}/entry_ad`
  }

  async closeAd() {
    // TODO: click the pop-up's Close button
  }
}
