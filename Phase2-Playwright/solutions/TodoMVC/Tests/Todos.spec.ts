// Model answer for exercise 01. Try it yourself first!
// In a real suite these locators would live in a page object (exercise 02 does that).
import { test, expect, type Page } from '@playwright/test';
import { TODOMVC_URL } from '@support/config/environment';

async function addTodo(page: Page, title: string) {
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await newTodo.fill(title);
  await newTodo.press('Enter');
}

async function completeTodo(page: Page, title: string) {
  await page
    .getByTestId('todo-item')
    .filter({ hasText: title })
    .getByRole('checkbox', { name: 'Toggle Todo' })
    .check();
}

test.describe('TodoMVC todos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TODOMVC_URL);
  });

  test('Add a todo', async ({ page }) => {
    await addTodo(page, 'Buy milk');

    await expect(page.getByTestId('todo-title')).toHaveText(['Buy milk']);
  });

  test('Complete a todo', async ({ page }) => {
    await addTodo(page, 'Buy milk');
    await addTodo(page, 'Walk the dog');
    await completeTodo(page, 'Buy milk');

    await expect(page.getByTestId('todo-count')).toHaveText('1 item left');
  });

  test('Show only active todos', async ({ page }) => {
    await addTodo(page, 'Buy milk');
    await addTodo(page, 'Walk the dog');
    await completeTodo(page, 'Buy milk');
    await page.getByRole('link', { name: 'Active' }).click();

    await expect(page.getByTestId('todo-title')).toHaveText(['Walk the dog']);
  });
});
