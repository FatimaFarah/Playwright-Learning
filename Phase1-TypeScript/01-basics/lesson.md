# 01 — Basics: values, strings and decisions

**Already code in another language?** Skim the headings, then go straight to the exercises.

## Values and variables

```ts
const product = 'Backpack'; // a string (text)
const quantity = 3; // a number
const paid = true; // a boolean (true or false)

let attempts = 0; // let = this variable can change later
attempts = attempts + 1;
```

Use `const` by default. Only use `let` when you really need to reassign the variable. Test code almost never needs `let`.

You'll also see things like `: string` after a name, for example `function greet(name: string)`. That's a **type**: it tells TypeScript what kind of value goes there. Topic 04 covers types properly. For now, read it as a label.

## Strings and template literals

Backticks (`` ` ``) let you put values inside a string with `${...}`:

```ts
const baseUrl = 'https://shop.example.com';
const productId = 42;
const url = `${baseUrl}/products/${productId}`; // 'https://shop.example.com/products/42'
```

You'll use this all the time for URLs and test titles. Some handy string methods:

```ts
'  Hello '.trim(); // 'Hello'
'Hello'.toLowerCase(); // 'hello'
'Hello'.includes('ell'); // true
(1250 / 100).toFixed(2); // '12.50' (a number turned into text with 2 decimal places)
```

## Comparing values

```ts
quantity === 3; // equal
quantity !== 0; // not equal
quantity >= 10; // greater than or equal
paid && quantity > 0; // AND: both must be true
!paid; // NOT: flips true/false
```

Always use `===` and `!==`, never `==` or `!=`. The two-character versions convert types in surprising ways, for example `0 == ''` is `true`.

## Making decisions

```ts
if (stock === 0) {
  return 'Out of stock';
} else if (stock < 5) {
  return 'Only a few left';
} else {
  return 'In stock';
}
```

For a quick either/or there's the **ternary**, `condition ? valueIfTrue : valueIfFalse`:

```ts
const label = paid ? 'Paid' : 'Unpaid';
```

## Where you'll see this in Playwright

```ts
await page.goto(`${BASE_URL}/products`);
test('Login with valid credentials', async () => { ... });
```

## Now do the exercises

Open `exercises.ts`, replace each `throw new Error('TODO ...')` with your code, and run:

```
npx playwright test 01
```
