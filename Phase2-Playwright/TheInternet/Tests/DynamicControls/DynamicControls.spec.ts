// Don't edit this file: make these tests pass by writing Pages/DynamicControls/DynamicControlsPage.ts.
import { test, expect } from '@playwright/test';
import { DynamicControlsPage } from '../../Pages/DynamicControls/DynamicControlsPage';

test.describe('The Internet dynamic controls', () => {
  let dynamicControlsPage: DynamicControlsPage;

  test.beforeEach(async ({ page }) => {
    dynamicControlsPage = new DynamicControlsPage(page);
    await dynamicControlsPage.goto();
  });

  test('Remove the checkbox', async () => {
    await dynamicControlsPage.removeCheckbox();

    // The site takes about 3.5 seconds, too close to the 5-second default to be reliable.
    await expect(dynamicControlsPage.checkbox).toBeHidden({ timeout: 10_000 });
  });

  test('Enable the text box and type in it', async () => {
    await dynamicControlsPage.enableTextBox();
    // Same 3.5-second delay as removing the checkbox.
    await expect(dynamicControlsPage.textBox).toBeEnabled({ timeout: 10_000 });

    await dynamicControlsPage.textBox.fill('Hello');

    await expect(dynamicControlsPage.textBox).toHaveValue('Hello');
  });
});
