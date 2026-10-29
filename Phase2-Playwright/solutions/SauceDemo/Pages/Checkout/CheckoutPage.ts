// Model answer for exercise 04. Try it yourself first!
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
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.postcodeInput = page.getByRole('textbox', { name: 'Zip/Postal Code' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.errorMessage = page.getByRole('alert');
    this.confirmationHeading = page.getByRole('heading', { name: 'Thank you for your order!' });
  }

  async enterDetails(firstName: string, lastName: string, postcode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postcodeInput.fill(postcode);
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }
}
