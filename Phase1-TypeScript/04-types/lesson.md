# 04 — Types

You've been seeing types since topic 01: the `: string` and `: number` labels. This topic explains what they're for, and how to describe your own.

## What types are for

TypeScript is JavaScript with **types** added. A type says what kind of value something is: text, a number, an order, and so on. Types don't change what your code does when it runs. They let VS Code and `npm run typecheck` spot mistakes **before** you run anything:

```ts
function isBulk(quantity: number): boolean {
  return quantity >= 50;
}

isBulk('lots'); // ❌ red underline: 'lots' is a string, but quantity must be a number
```

## Two checks: tests and typecheck

From this topic on, your work is checked in two ways:

- **Tests** (`npx playwright test 04`) run your code and check the answers.
- **Typecheck** (`npm run typecheck`) reads your code **without running it**, and reports type mistakes. It also checks the test files, so some exercises are only complete once typecheck is happy with them.

Typecheck errors look like this. Read them as **file(line,column): what's wrong**:

```
Phase1-TypeScript/04-types/types.spec.ts(14,80): error TS2353: Object literal may only
specify known properties, and 'displayName' does not exist in type 'TestUser'.
```

Typecheck lists every unfinished function in the whole project (Phase 2's too), so look for the lines that mention `04-types`.

### Try it: see a type error

1. Add `const oops: number = 'hello';` at the bottom of `exercises.ts`.
2. Run `npm run typecheck` and find the error for that line. It names the file and the line, and says what's wrong.
3. Delete the line again.

## Writing types

After a parameter, and after the brackets for what the function returns:

```ts
function label(name: string, price: number): string { ... }
```

After a variable name. This is optional, because TypeScript usually works it out for itself (that's called **inference**):

```ts
const quantity: number = 3; // annotated
const product = 'Backpack'; // inferred: TypeScript knows it's a string
```

You must give types for function parameters. For variables, leave them off unless TypeScript gets it wrong.

## Describing the shape of an object: interface

An **interface** lists the fields an object must have, and the type of each one:

```ts
interface Product {
  name: string;
  price: number;
  description?: string; // the ? means optional: it may be missing
}

const bag: Product = { name: 'Backpack', price: 29.99 }; // ✅ description can be left out
const bad: Product = { name: 'Backpack' }; // ❌ price is missing
const odd: Product = { name: 'Backpack', price: 29.99, colour: 'red' }; // ❌ colour isn't in Product
```

To allow a new field, add it to the interface. (`type Product = { ... }` does the same job, and you'll see both.)

### Optional fields, and fallbacks with ??

An optional field might be `undefined` (meaning "not there"). `??` means "use the left side, unless it's missing, in which case use the right side":

```ts
const text = bag.description ?? 'No description'; // 'No description', because bag has none
```

## "One of these": union types

A `|` between types means "either of these":

```ts
let id: number | undefined; // a number, or nothing yet
```

It also works with exact strings, to allow only a fixed set of values:

```ts
type Size = 'small' | 'medium' | 'large';

const s: Size = 'medium'; // ✅
const t: Size = 'meduim'; // ❌ caught straight away: not one of the three
```

This catches typos as you type, instead of as a confusing test failure later.

## switch: one branch per value

When you need a different answer for each possible value, `switch` is tidier than a long `if / else if`:

```ts
function sizeLabel(size: Size): string {
  switch (size) {
    case 'small':
      return 'S';
    case 'medium':
      return 'M';
    case 'large':
      return 'L';
  }
}
```

`switch (size)` compares `size` against each `case`, and runs the code under the one that matches. Each `case` here `return`s, so the function stops there.

## Turning text into a number

Text typed into a box is always a string, even when it looks like a number. `Number()` converts it:

```ts
Number('42'); // 42
Number('3.5'); // 3.5
Number('abc'); // NaN: "Not a Number", meaning it couldn't convert
Number(''); // 0 (surprisingly: empty text counts as zero)
```

To check whether the conversion failed, use `Number.isNaN()`. (Never `=== NaN`, which is always false, even for NaN.)

```ts
Number.isNaN(Number('abc')); // true: it failed
Number.isNaN(Number('42')); // false: it worked
```

## Avoid `any`

`any` switches type checking off for that value. If you're tempted to use it, ask for help, because there's nearly always a proper type available.

## Where you'll see this in Playwright

```ts
readonly emailInput: Locator; // in a page object: emailInput holds a Playwright Locator
export const testUser: TestUser = { ... };
```

## Exercise guide

These exercises are only done when **both** checks pass: `npx playwright test 04`, and no `04-types` lines in `npm run typecheck`.

| Exercise                         | Lesson sections you need                                                      |
| -------------------------------- | ----------------------------------------------------------------------------- |
| 1 `TestUser`, `welcomeMessage`   | Describing the shape of an object, and Optional fields, and fallbacks with ?? |
| 2 `productName`                  | switch                                                                        |
| 3 `parseQuantity`                | Turning text into a number (check for `''` first!)                            |
| 4 `DeliveryStatus`, `nextStatus` | "One of these": union types, plus if / else from topic 01                     |

```
npx playwright test 04
npm run typecheck
```
