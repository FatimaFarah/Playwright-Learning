// Model answer for exercise 05. Try it yourself first!
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
    this.checkbox = page.getByRole('checkbox');
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.textBox = page.getByRole('textbox');
    this.enableButton = page.getByRole('button', { name: 'Enable' });
  }

  async goto() {
    await this.page.goto(`${THE_INTERNET_URL}/dynamic_controls`);
  }

  async removeCheckbox() {
    await this.removeButton.click();
  }

  async enableTextBox() {
    await this.enableButton.click();
  }
}
