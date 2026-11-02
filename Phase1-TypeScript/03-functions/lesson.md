# 03 — Functions

You've been writing functions since topic 01. This topic covers the other ways to write them, and the idea that matters most for Playwright: **passing a function into another function**.

## Two ways to write a function

The way you already know, a **function declaration**:

```ts
function triple(n: number): number {
  return n * 3;
}
```

An **arrow function**, stored in a `const`. It does exactly the same job:

```ts
const triple = (n: number): number => {
  return n * 3;
};
```

When the body is just one `return`, you can drop the curly brackets **and** the word `return`. Whatever comes after `=>` is returned automatically:

```ts
const triple = (n: number): number => n * 3;
```

All three are called the same way: `triple(4)` returns `12`.

**Common mistake:** keeping the curly brackets but dropping `return`. `(n) => { n * 3 }` returns nothing, because with curly brackets you need an explicit `return`.

## Default values for parameters

Give a parameter a default with `=`. If the caller leaves that parameter out, the default is used:

```ts
function welcome(name: string, punctuation = '.'): string {
  return `Welcome, ${name}${punctuation}`;
}

welcome('Sam'); // 'Welcome, Sam.'   (punctuation was left out, so '.' is used)
welcome('Sam', '!'); // 'Welcome, Sam!'
```

In the exercise file, `greeting?: string` means "this parameter may be left out". Swap the `?` for a default value: `greeting = 'Hello'`.

## Functions are values: passing one in

A function can be stored in a variable, so it can also be **passed into another function as a parameter**. A function passed in like this is called a **callback**.

You've already done this. In topic 02, `orders.filter((o) => o.paid)` passed the small function `(o) => o.paid` into `filter`, and `filter` called it once for each item.

Here's a function that accepts a callback:

```ts
function doTwice(action: () => void) {
  action();
  action();
}

doTwice(() => console.log('hi')); // prints 'hi' twice
```

- `action: () => void` is the parameter's type: "a function that takes nothing and returns nothing".
- `action()` **calls** the function that was passed in. The brackets are what make it run.

A callback can take inputs and return an answer, too:

```ts
function applyDiscount(prices: number[], discount: (price: number) => number): number[] {
  return prices.map(discount);
}

applyDiscount([10, 20], (price) => price - 1); // [9, 19]
```

- `discount: (price: number) => number` means "a function that takes a number and returns a number".
- `prices.map(discount)` hands that function straight to `map`, which calls it on every price.
- You can also call it yourself: `discount(10)` returns `9` here.

**Common mistake:** writing `action` without brackets when you mean to call it. `action` on its own is the function itself. `action()` runs it.

## Counting loops

Sometimes you need to repeat something a set number of times rather than once per item in a list. That's a counting `for` loop:

```ts
for (let i = 1; i <= 3; i++) {
  console.log(i); // prints 1, then 2, then 3
}
```

Read the first line as: start `i` at 1, keep going while `i <= 3`, and add 1 to `i` after each time round (`i++` is short for `i = i + 1`).

### Stopping early with return

`return` inside a loop stops the **whole function** straight away, even mid-loop. Code after the loop only runs if the loop finished without returning:

```ts
function firstFreeSlot(isFree: (slot: number) => boolean, slots: number): number {
  for (let slot = 1; slot <= slots; slot++) {
    if (isFree(slot)) {
      return slot; // found one: stop here
    }
  }
  return 0; // only reached if no slot was free
}
```

## This is how every Playwright test works

```ts
test('Login with valid credentials', async ({ page }) => {
  // ...
});
```

`test` is a function, and you're calling it with two things: a **title** (a string) and a **callback** (an arrow function). Playwright calls your callback when it runs the test. (`async` is topic 05, and `{ page }` is destructuring from topic 02.)

## Exercise guide

| Exercise          | Lesson sections you need                                                         |
| ----------------- | -------------------------------------------------------------------------------- |
| 1 `double`        | Two ways to write a function (the one-line arrow version)                        |
| 2 `greet`         | Default values for parameters                                                    |
| 3 `applyToAll`    | Passing one in (the `applyDiscount` example)                                     |
| 4 `countMatching` | Passing one in, plus `filter` and `.length` from topic 02                        |
| 5 `retry`         | Counting loops, Stopping early with return, and calling the callback `attempt()` |

```
npx playwright test 03
```
