# 01 — Your first browser test

**Site:** [TodoMVC demo](https://demo.playwright.dev/todomvc/), a simple to-do list app. Open it in your browser and have a play first.

## What a test looks like

```ts
import { test, expect } from '@playwright/test';

test('Add a todo', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');
  await page.getByPlaceholder('What needs to be done?').fill('Buy milk');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  await expect(page.getByTestId('todo-title')).toHaveText(['Buy milk']);
});
```

- `page` is a browser tab that Playwright gives every test, fresh each time.
- A test has two halves: **steps** (do what a user would do) and **checks** (`expect`: did the right thing happen?).
- Every step and check starts with `await` (Phase 1, topic 05).

## Locators: how you point at things on the page

A **locator** describes how to find an element. Prefer the ones that describe the page the way a user sees it:

| Locator                                      | Finds                                        | Use it for                      |
| -------------------------------------------- | -------------------------------------------- | ------------------------------- |
| `getByRole('button', { name: 'Save' })`      | an element by its role and visible name      | **first choice**, nearly always |
| `getByPlaceholder('What needs to be done?')` | an input by its grey placeholder text        | inputs without a label          |
| `getByLabel('Email')`                        | an input by its label                        | form fields                     |
| `getByText('Welcome back')`                  | an element by its text                       | messages and plain text         |
| `getByTestId('todo-title')`                  | an element by a test id the developers added | when nothing above fits         |

Avoid CSS selectors like `.btn-primary` or `#submit` unless nothing else works. They break when the design changes, even though nothing a user sees has changed.

Common roles: `button`, `link`, `textbox`, `checkbox`, `heading`, `listitem`, `combobox` (a dropdown), `alert`.

**Narrowing down.** When there are several similar things (like one checkbox per todo), find the right row first, then look inside it:

```ts
page.getByTestId('todo-item').filter({ hasText: 'Buy milk' }).getByRole('checkbox');
```

**Finding locators for you.** Run `npx playwright codegen https://demo.playwright.dev/todomvc/`, click around the page, and Playwright writes the locators as you go.

## Actions

```ts
await locator.click();
await locator.fill('some text'); // replaces whatever is in the box
await locator.press('Enter');
await locator.check(); // ticks a checkbox
```

## Checks (assertions)

```ts
await expect(locator).toBeVisible();
await expect(locator).toHaveText('1 item left');
await expect(locator).toHaveText(['Buy milk', 'Walk the dog']); // a list: one entry per match
await expect(page).toHaveURL('https://...');
```

These **retry automatically** for up to 5 seconds until they pass. So you never need to add a "wait a moment" step before checking. Lesson 05 goes into this.

## beforeEach

```ts
test.beforeEach(async ({ page }) => {
  await page.goto(TODOMVC_URL);
});
```

This runs before **every** test in the `describe` block, so each test starts in the same place.

## Running tests

```
npx playwright test Todos             run the tests in files matching "Todos"
npx playwright test Todos --headed    the same, with the browser visible
npx playwright test --ui              Playwright's UI mode: pick tests, watch them run step by step
npm run report                        open the HTML report of the last run
```

UI mode is the best way to learn. You can see every step, what the page looked like at that moment, and which element each locator found.

## Now do the exercise

Open [TodoMVC/Tests/Todos.spec.ts](../TodoMVC/Tests/Todos.spec.ts). The checks are already written. Write the steps where it says `// TODO`, then run:

```
npx playwright test Todos
```

When all three pass, compare with [solutions/TodoMVC/Tests/Todos.spec.ts](../solutions/TodoMVC/Tests/Todos.spec.ts). Notice how the model answer puts repeated steps into small helper functions. Lesson 02 takes that idea further.
