// Exercise 04. The checkout pages: your details, the order overview, and the confirmation.
// Run: npx playwright test Cart Checkout
import { type Page, type Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postcodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly errorMessage: Locator;
  readonly confirmationHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    // TODO: set up the seven locators above
  }

  async enterDetails(firstName: string, lastName: string, postcode: string) {
    // TODO: fill in the three boxes, then click Continue
  }

  async finish() {
    // TODO: click Finish
  }
}
