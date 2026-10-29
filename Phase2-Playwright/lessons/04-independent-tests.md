# 04 — Tests that stand on their own

## Every test must work alone, and in any order

Playwright runs test files **in parallel**, and you'll often run a single test on its own while fixing it. So a test must never rely on something an earlier test did.

❌ Test A adds the backpack to the cart, and test B checks out "the backpack that's in the cart". B fails whenever it runs without A, or before A.

✅ Each test sets up exactly what it needs:

```ts
test.beforeEach(async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.goto();
  await inventoryPage.addToCart('Sauce Labs Backpack');
  await inventoryPage.openCart();
  // ...
});
```

Playwright helps here. Each test gets a **brand new browser context**, which is like a fresh private window. It starts with no cookies and an empty cart, apart from the saved login from lesson 03.

## One reason to fail

Give each test **one job**. "Place an order" checks the order went through. "Checkout without a postcode shows an error" checks the error. If one test did both, a failure wouldn't tell you which part broke.

## Naming tests

A test's title is how people find it in a report of hundreds. Good titles:

- **start with the feature and action** someone would search for: `'Remove a product from the cart'`, `'Checkout without a postcode shows an error'`
- **add an outcome only when it tells you something:** `'Login as a locked-out user is rejected'`
- **use sentence case:** `'Place an order'`, not `'Place An Order'`
- **leave out details that change,** such as exact prices, messages or product names. The test code holds those.

`describe` blocks name the area (`'Sauce Demo checkout'`), and the report shows it in front of each title.

## A page object can cover more than one screen

Checkout on Sauce Demo is three screens: your details, an overview and a confirmation. They're small and always used together, so one `CheckoutPage` covers all three. If a screen grew big or was used on its own, it would get its own page object.

## Now do the exercise

Finish [SauceDemo/Pages/Cart/CartPage.ts](../SauceDemo/Pages/Cart/CartPage.ts) and [SauceDemo/Pages/Checkout/CheckoutPage.ts](../SauceDemo/Pages/Checkout/CheckoutPage.ts). The tests are in `SauceDemo/Tests/Cart/` and `SauceDemo/Tests/Checkout/`.

```
npx playwright test Cart Checkout
```

Tips:

- Each product in the cart has the same test id as on the products page: `inventory-item`.
- Read each test's `beforeEach` and notice how every test builds its own starting point.
- To prove a test really stands on its own, run just that one. `-g` picks tests whose title matches: `npx playwright test Checkout -g "postcode"`
