# 03 — Saved login and test ids

## Don't log in at the start of every test

Most tests aren't _about_ logging in. They test something that happens after login. Logging in through the login form in every one of them is slow, and if the login page breaks, every test fails at once, which hides where the real problem is.

Instead, log in **once**, save the browser's session to a file, and start every test with that session already loaded:

```ts
// SauceDemo/Tests/auth.setup.ts: runs once, before the other Sauce Demo tests
setup('Log in to Sauce Demo', async ({ page }) => {
  // ...log in using LoginPage...
  await expect(page).toHaveURL(SAUCE_DEMO_INVENTORY_URL); // make sure it really finished
  await page.context().storageState({ path: SAUCE_DEMO_AUTH_FILE }); // save the session
});
```

The session (cookies and local storage) is saved to `Phase2-Playwright/.auth/saucedemo.json`. That file holds a live login, so it's in `.gitignore` and never committed.

## How the tests pick it up

Look at [projects.ts](../projects.ts). It splits the tests into **projects**:

- `saucedemo-setup` runs `auth.setup.ts`.
- `saucedemo` **depends on** `saucedemo-setup`, so the setup always runs first, and it loads the saved session with `storageState`. Every test in it starts already logged in.
- `saucedemo-login` holds the login tests from exercise 02. They need to start **logged out**, so they're kept separate.

You don't run the setup yourself. When you run `npx playwright test Inventory`, Playwright sees that those tests depend on the setup and runs it first. If the setup fails, the tests that depend on it show as **did not run**.

## Test ids

Sauce Demo's developers added `data-test="..."` attributes to many elements, specifically so tests can find them:

```html
<div class="inventory_item" data-test="inventory-item"></div>
```

```ts
page.getByTestId('inventory-item');
```

(Playwright looks for `data-testid` by default. `projects.ts` tells it Sauce Demo uses `data-test` instead.)

A test id is a good choice when there's no sensible role and name, like a product card. Use role-based locators first, though. A test id is invisible to users, so a test using one can pass even when what the user sees is broken.

## Finding one product among many

Every product card has an "Add to cart" button, so `getByRole('button', { name: 'Add to cart' })` matches six of them. Find the right card first, then the button inside it:

```ts
productCard(name: string): Locator {
  return this.page.getByTestId('inventory-item').filter({ hasText: name });
}

await this.productCard('Sauce Labs Backpack').getByRole('button', { name: 'Add to cart' }).click();
```

## Names that change

The cart button's accessible name includes the count: "Cart, empty", or "Cart, 1 items". To match it whatever the count, use a regular expression. `/^Cart/` means "starts with Cart":

```ts
page.getByRole('button', { name: /^Cart/ });
```

## Now do the exercise

1. Finish [SauceDemo/Tests/auth.setup.ts](../SauceDemo/Tests/auth.setup.ts). It reuses your `LoginPage` from exercise 02.
2. Finish [SauceDemo/Pages/Inventory/InventoryPage.ts](../SauceDemo/Pages/Inventory/InventoryPage.ts).

```
npx playwright test Inventory
```

Tips: the page title ("Products") has the test id `title`, and the little number on the cart has `shopping-cart-badge`.
