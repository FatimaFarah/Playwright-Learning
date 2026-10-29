// Exercise 05. A page where things change a few seconds after you click.
// Run: npx playwright test DynamicControls EntryAd
import { type Page, type Locator } from '@playwright/test';
import { THE_INTERNET_URL } from '@support/config/environment';

export class DynamicControlsPage {
  readonly page: Page;
  readonly checkbox: Locator;
  readonly removeButton: Locator;
  readonly textBox: Locator;
  readonly enableButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // TODO: set up the four locators above
  }

  async goto() {
    // TODO: open `${THE_INTERNET_URL}/dynamic_controls`
  }

  async removeCheckbox() {
    // TODO: click Remove
  }

  async enableTextBox() {
    // TODO: click Enable
  }
}
