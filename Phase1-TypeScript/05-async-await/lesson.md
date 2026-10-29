# 05 — async and await

**This is the most important topic for Playwright.** Nearly every line of a Playwright test is asynchronous, and a missing `await` is the most common beginner bug. Take your time on this one.

## Why things are asynchronous

Clicking a button, loading a page or waiting for a server all take time. JavaScript doesn't stop and wait for them. Instead, it immediately hands you a **Promise**: an IOU that says "the result will be ready later".

```ts
const result = saveButton.click(); // result is a Promise, and the click may not have happened yet!
```

## await: wait for the IOU to be paid

```ts
await saveButton.click(); // execution pauses here until the click has finished
```

You can only use `await` inside a function marked `async`:

```ts
async function saveOrder(page: Page): Promise<void> {
  await page.getByRole('button', { name: 'Save' }).click();
}
```

An `async` function always returns a Promise. `Promise<string>` means "a Promise that eventually gives a string", and `Promise<void>` means "a Promise that gives nothing, it just finishes". So whoever calls an `async` function has to `await` it too. That's why `async`/`await` spreads through a whole test.

## The missing-await bug

```ts
async function placeOrder(basket: Basket) {
  basket.submit(); // ❌ no await: we move on before the submit finishes
  return basket.status; // still 'open'!
}
```

There's no error message. The code just carries on too early. In a real test, this shows up as a test that fails randomly (a "flaky" test), or worse, one that passes when it shouldn't. **If you call something that returns a Promise, await it.**

## Loops: for...of, not forEach

```ts
for (const item of items) {
  await basket.addItem(item); // ✅ waits for each one in turn
}

items.forEach(async (item) => {
  await basket.addItem(item); // ❌ forEach doesn't wait: the loop finishes immediately
});
```

## Doing two things at once: Promise.all

```ts
const [orders, customers] = await Promise.all([loadOrders(), loadCustomers()]);
```

Both start together, and `await` waits until **both** are done. You'll see this in Playwright when a test needs to wait for a network response that a click triggers:

```ts
await Promise.all([
  page.waitForResponse('**/api/orders'),
  page.getByRole('button', { name: 'Save' }).click(),
]);
```

## Where you'll see this in Playwright

Everywhere:

```ts
test('Login with valid credentials', async ({ page }) => {
  await loginPage.goto();
  await loginPage.login(user.username, user.password);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
```

## Now do the exercises

Exercises 3 and 5 are "find the bug" exercises. The code is nearly right but has a bug.

```
npx playwright test 05
```
