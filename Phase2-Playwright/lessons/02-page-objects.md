# 02 — Page objects

**Site:** [Sauce Demo](https://www.saucedemo.com/), a practice online shop.

## The problem

In lesson 01, every test had its own copy of `getByPlaceholder('What needs to be done?')`. Imagine 50 tests doing that, and then the developers change the placeholder text. You'd have to fix 50 tests.

## The answer: one class per page

A **page object** is a class (Phase 1, topic 06) that knows how to find things on one page and how to do things there. Tests use the page object instead of finding elements themselves:

```ts
// Pages/Auth/LoginPage.ts
export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    // ...
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    // ...
  }
}
```

```ts
// Tests/Auth/Login.spec.ts
const loginPage = new LoginPage(page);
await loginPage.login(standardUser.username, standardUser.password);
await expect(page).toHaveURL(SAUCE_DEMO_INVENTORY_URL);
```

Now when the page changes, you fix one locator in one place.

## The rules

1. **Locators and actions only, never `expect`.** The page object says _how_ to use the page. Deciding what counts as right is the test's job. That keeps the page object reusable by tests that check different things.
2. **One page object per page** (or per part of a page), named after what it is: `LoginPage`, `CartPage`.
3. **Mirror the folders.** `Pages/Auth/LoginPage.ts` goes with `Tests/Auth/Login.spec.ts`, so it's obvious which tests use which page.
4. **Name actions after what a user is trying to do:** `login()`, `addToCart()`, not `clickButton2()`.

## Passwords live in .env, never in code

The tests get their logins from `standardUser` and `lockedOutUser` in [support/test-data/users.ts](../support/test-data/users.ts). These read the `.env` file (Phase 1, topic 07). Sauce Demo's passwords are public practice ones, but you handle them exactly like real ones, so it's a habit by the time it matters.

If you haven't yet, copy `.env.example` to `.env` (see the README).

## The `@support/` shortcut

```ts
import { standardUser } from '@support/test-data/users';
```

`@support/` is a shortcut to the `Phase2-Playwright/support/` folder, set up in `tsconfig.json`. It saves writing `../../../support/...` and counting the dots.

## Now do the exercise

Open [SauceDemo/Pages/Auth/LoginPage.ts](../SauceDemo/Pages/Auth/LoginPage.ts) and fill in the TODOs. The tests in [SauceDemo/Tests/Auth/Login.spec.ts](../SauceDemo/Tests/Auth/Login.spec.ts) check your work. Don't edit them.

```
npx playwright test Login
```

Tips:

- Open Sauce Demo in your browser, right-click an element and choose **Inspect** to see what it is. Or use `npx playwright codegen https://www.saucedemo.com/`.
- The error message after a failed login has the role `alert`.
- `Cannot read properties of undefined` in an error means a locator hasn't been set up in the constructor yet.
