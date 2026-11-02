# 07 — Modules and errors

In this topic you'll learn how files share code with each other, how to stop with a helpful error when something's wrong, and how test code reads passwords without putting them in the code.

## Modules: sharing code between files

Each `.ts` file is a **module**. Anything inside it is private to that file, unless you **export** it:

```ts
// config.ts
export const SHOP_URL = 'https://shop.example.com'; // other files can use this
const SECRET_NUMBER = 42; // only this file can use this
```

Another file then **imports** it by name:

```ts
// a spec file in the same folder
import { SHOP_URL } from './config';
```

- The names in `{ }` must match the exported names exactly.
- The path is relative to the file doing the importing. `./` means "this folder", and `../` means "one folder up". Leave off the `.ts`.
- Packages installed in `node_modules` are imported by their name instead of a path: `import { test, expect } from '@playwright/test';`

You've been relying on this all along. Every exercise function starts with `export`, so that the spec file next to it can `import` it.

**Common mistake:** forgetting `export`. The importing file gets `undefined` (when tests run), or a red underline saying the name "is not exported" (in VS Code and typecheck).

## Throwing errors

Sometimes code reaches a point where it can't sensibly carry on, for example because a setting is missing. Then it should **throw** an error. Throwing stops the function immediately, and the message is shown to whoever ran the code:

```ts
export function requirePositive(amount: number): number {
  if (amount <= 0) {
    throw new Error(`Amount must be more than 0, but it was ${amount}.`);
  }
  return amount;
}

requirePositive(5); // 5
requirePositive(-1); // stops with: Error: Amount must be more than 0, but it was -1.
```

`new Error('message')` creates the error, and `throw` sets it off. Write messages that say what's wrong **and** how to fix it. The next person to read one is often you.

## Catching errors

`try` / `catch` lets you deal with an error instead of stopping. The code in `try` runs. If anything in it throws, the code jumps straight to `catch`:

```ts
export function safeDivide(a: number, b: number): string {
  try {
    const answer = divideOrThrow(a, b); // imagine this throws when b is 0
    return `Answer: ${answer}`; // only reached if nothing threw
  } catch (error) {
    return `Couldn't divide: ${(error as Error).message}`; // only reached if something threw
  }
}
```

- Each branch can `return` its own answer.
- In `catch`, `error` is whatever was thrown. `.message` is the text it was created with.
- `error as Error` tells TypeScript "treat this as an Error". TypeScript can't be sure what was thrown, so without it, `.message` gets a red underline.

**In tests, be careful with `catch`.** Catching an error and carrying on can hide a real failure, so the test passes when it shouldn't. You'll rarely write `try` / `catch` in a test. It's mostly used in support code.

## Reading JSON

**JSON** is a text format for data, and you'll see it a lot in web testing. `JSON.parse()` turns JSON text into a value. If the text isn't valid JSON, it **throws**:

```ts
JSON.parse('{"name": "Backpack"}'); // { name: 'Backpack' }
JSON.parse('[1, 2, 3]'); // [1, 2, 3]
JSON.parse('not json'); // throws an error
```

`unknown` as a return type means "this could be any kind of value", which suits JSON.

## Environment variables and secrets

Passwords and other secrets never go in code, because code gets shared and committed to git. They live in a file called `.env`, which git is told to ignore, and code reads them through `process.env`:

```ts
process.env.APP_USER_EMAIL; // the value from .env, or undefined if it isn't set
```

When the name is held in a variable, use square brackets instead of a dot:

```ts
const key = 'APP_USER_EMAIL';
process.env[key]; // the same as process.env.APP_USER_EMAIL
```

An empty or missing value counts as "not there". `!value` is true both when `value` is `undefined` and when it's `''`, so one check covers both:

```ts
const value = process.env[key];
if (!value) {
  // missing or empty
}
```

Test suites wrap this in a small helper that throws a clear error when a setting is missing. That's exercise 2.

## Getters on an object

In topic 06, getters belonged to a class. You can also put them straight into an object:

```ts
export const shopSettings = {
  get currency() {
    return lookUpCurrency(); // runs only when someone reads shopSettings.currency
  },
};

shopSettings.currency; // calls the getter now, and gives back its result
```

Why bother? A getter only runs **when it's read**. For logins, that means a missing password causes an error only in the tests that actually log in, and every other test can still run. If the password were read straight away, every test file that imports the user would fail before it started.

## Exercise guide

| Exercise          | Lesson sections you need                                                   |
| ----------------- | -------------------------------------------------------------------------- |
| 1 `BASE_URL`      | Modules (one word to add)                                                  |
| 2 `requireEnv`    | Environment variables and secrets, then Throwing errors                    |
| 3 `safeParseJson` | Reading JSON, and Catching errors                                          |
| 4 `runCheck`      | Catching errors. `body` is a callback, so call it with `body()` (topic 03) |
| 5 `practiceUser`  | Getters on an object, using your `requireEnv` from exercise 2              |

```
npx playwright test 07
```
