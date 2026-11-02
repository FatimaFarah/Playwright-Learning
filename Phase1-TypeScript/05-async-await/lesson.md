# 05 — async and await

**This is the most important topic for Playwright.** Nearly every line of a Playwright test is asynchronous, and a missing `await` is the most common beginner bug. Take your time on this one.

## Why some things take time

So far, every line of code finished instantly. But clicking a button, loading a page or asking a server for data all take time, sometimes seconds.

JavaScript doesn't stop and wait for slow things. Instead, a slow function immediately hands back a **Promise**: an IOU that says "the result will be ready later". The Promise isn't the result. It's a ticket you can wait on.

## await: wait for the result

Put `await` in front of a call to wait for the result. The code pauses on that line until the slow thing has finished, then carries on with the actual result:

```ts
const name = await loadCustomerName(); // pauses until loading finishes
// name is now 'Sam Jones'
```

Without `await`, you get the IOU instead of the answer:

```ts
const name = loadCustomerName(); // ❌ name is a Promise, not 'Sam Jones'
name.toUpperCase(); // ❌ fails: a Promise doesn't have toUpperCase
```

## async: functions that wait

You can only use `await` inside a function marked `async`:

```ts
export async function greetCustomer(): Promise<string> {
  const name = await loadCustomerName();
  return `Hello, ${name}`;
}
```

- `async` goes before `function`.
- The return type is wrapped in `Promise<...>`, because the caller has to wait for it. `Promise<string>` means "you'll get a string, eventually".
- `Promise<void>` means "you'll get nothing back, but you can wait for it to finish".

Because an `async` function is itself slow, **whoever calls it has to `await` it too**. That's why `async` and `await` appear all the way through a Playwright test.

## The exercise's pretend website

The top of `exercises.ts` has some code marked **Given**, which pretends to be a slow website so you can practise:

- `loadCustomerName()` and `loadOrderCount()` take a moment, then give back `'Sam Jones'` and `3`.
- `FakeBasket` is a pretend shopping basket. It's a **class**, which topic 06 explains. For now you only need to know how to use one. The tests create a basket and pass it into your function as the `basket` parameter. You then:
  - **call its methods** with a dot, like string methods: `await basket.addItem('Backpack')` and `await basket.submit()`. Both are slow, so both need `await`.
  - **read its fields** with a dot: `basket.status` (`'open'`, then `'submitted'` once submitted) and `basket.items` (the list of items added so far).

## Doing slow things one after another

Each `await` finishes before the next line starts, so this adds the items in order:

```ts
await basket.addItem('Backpack');
await basket.addItem('Bike Light'); // only starts once Backpack has been added
```

## The missing-await bug

```ts
async function checkout(basket: FakeBasket): Promise<string> {
  basket.submit(); // ❌ no await: we move straight on, before submit has finished
  return basket.status; // so this is still 'open'
}
```

**There's no error message.** The code just carries on too early and gets the wrong answer. In a real test, this shows up as a test that fails randomly (a "flaky" test), or worse, one that passes when it shouldn't.

The rule: **if something returns a Promise, `await` it.** When you're not sure, hover over the function name in VS Code. If the type mentions `Promise`, it needs `await`.

## Loops: for...of works, forEach doesn't

To do a slow thing for every item in a list, use a `for...of` loop (topic 02) with `await` inside:

```ts
for (const item of items) {
  await basket.addItem(item); // ✅ waits for each one before starting the next
}
```

There's also a `forEach` method that looks like it should work, but it doesn't wait:

```ts
items.forEach(async (item) => {
  await basket.addItem(item); // ❌ forEach starts them all and moves straight on
});
// at this point, nothing has actually been added yet
```

## Doing two slow things at the same time: Promise.all

If two slow things don't depend on each other, start them both at once and wait for both. Pass `Promise.all` a list of the calls, **without** `await` in front of each one:

```ts
const [name, count] = await Promise.all([loadCustomerName(), loadOrderCount()]);
// name is 'Sam Jones', count is 3
```

`Promise.all` gives back a list of the results, in the same order as the calls. `const [name, count] = ...` is **array destructuring**: the same idea as object destructuring in topic 02, but it takes items from a list by position. The first result goes into `name`, and the second into `count`.

## Where you'll see this in Playwright

Everywhere:

```ts
test('Login with valid credentials', async ({ page }) => {
  await loginPage.goto();
  await loginPage.login(user.username, user.password);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
```

Every action and every check waits on the browser, so every line starts with `await`.

## Exercise guide

Exercises 3 and 5 are **find the bug** exercises. The code is already written and nearly right. Work out what's wrong and fix it.

| Exercise              | Lesson sections you need                                                |
| --------------------- | ----------------------------------------------------------------------- |
| 1 `shoutCustomerName` | await, plus `.toUpperCase()` from topic 01                              |
| 2 `addTwoItems`       | The exercise's pretend website, and Doing slow things one after another |
| 3 `placeOrder`        | The missing-await bug                                                   |
| 4 `customerSummary`   | Doing two slow things at the same time                                  |
| 5 `addAllItems`       | Loops: for...of works, forEach doesn't                                  |

```
npx playwright test 05
```
