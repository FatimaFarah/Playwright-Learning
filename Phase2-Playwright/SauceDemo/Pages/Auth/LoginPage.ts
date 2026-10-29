// Exercise 02. Set up the locators and write the two actions.
// Run: npx playwright test Login
import { type Page, type Locator } from '@playwright/test';
import { SAUCE_DEMO_URL } from '@support/config/environment';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    // TODO: set up the four locators above
  }

  async goto() {
    // TODO: open the Sauce Demo login page
  }

  async login(username: string, password: string) {
    // TODO: fill in the username and password, then click Login
  }
}
