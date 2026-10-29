# 04 — Types

TypeScript is JavaScript with **types** added. Types don't change what your code does when it runs. Instead, they let your editor and `npm run typecheck` catch mistakes **before** you run anything.

## Annotations and inference

```ts
const litres: number = 500; // annotation: you say what the type is
const product = 'Diesel'; // inference: TypeScript works out it's a string

function isLarge(litres: number): boolean { ... } // parameter type, then return type
```

You must annotate function parameters. For most variables you can let TypeScript infer the type.

## Describing the shape of an object

```ts
interface TestUser {
  username: string;
  password: string;
  displayName?: string; // the ? means optional: it may be missing
}
```

`type` does a similar job and can also name other kinds of types:

```ts
type Order = { id: number; customer: string };
```

Either works for describing an object, and you'll see both in real test suites.

## Union types: "one of these"

```ts
type Product = 'ordering' | 'routing' | 'reporting'; // only these three strings are allowed
let id: number | undefined; // a number, or nothing yet
```

Union types catch typos. `const p: Product = 'orderign'` is an error straight away, rather than a confusing test failure later.

If something might be `undefined`, check before you use it, or give it a fallback with `??`:

```ts
const name = user.displayName ?? user.username; // use username if displayName is missing
```

## switch: one branch per case

```ts
switch (product) {
  case 'ordering':
    return 'Online Ordering';
  case 'routing':
    return 'Route Planner';
  // ...
}
```

## Avoid `any`

`any` switches type checking off for that value. If you're tempted to use it, ask for help, because there's nearly always a proper type available.

## Try it: see a type error

1. Add `const oops: number = 'hello';` to the bottom of `exercises.ts`.
2. Run `npm run typecheck` and read the error. It gives the file, the line and what's wrong.
3. Delete the line again.

VS Code also underlines type errors in red as you type. Hover over the underline to read the error.

## Where you'll see this in Playwright

```ts
readonly emailInput: Locator; // in a page object: emailInput holds a Playwright Locator
export const testUser: TestUser = { ... };
```

## Now do the exercises

These exercises are checked twice. Run the tests, **and** run `npm run typecheck`, because some mistakes only show up as type errors.

```
npx playwright test 04
npm run typecheck
```
