// Exercise 01. The checks (the `expect` lines) are written for you. Write the steps above each one.
// Run: npx playwright test Todos
import { test, expect } from '@playwright/test';
import { TODOMVC_URL } from '@support/config/environment';

test.describe('TodoMVC todos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TODOMVC_URL);
  });

  test('Add a todo', async ({ page }) => {
    // TODO: type 'Buy milk' into the "What needs to be done?" box, then press Enter

    await expect(page.getByTestId('todo-title')).toHaveText(['Buy milk']);
  });

  test('Complete a todo', async ({ page }) => {
    // TODO: add two todos, 'Buy milk' and 'Walk the dog'
    // TODO: tick the checkbox next to 'Buy milk'

    await expect(page.getByTestId('todo-count')).toHaveText('1 item left');
  });

  test('Show only active todos', async ({ page }) => {
    // TODO: add 'Buy milk' and 'Walk the dog', tick 'Buy milk', then click the Active link

    await expect(page.getByTestId('todo-title')).toHaveText(['Walk the dog']);
  });
});
