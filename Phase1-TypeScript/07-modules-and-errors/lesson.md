# 07 — Modules and errors

## Modules: sharing code between files

Each `.ts` file is a **module**. Anything you want other files to use, you must `export`:

```ts
// config.ts
export const BASE_URL = 'https://shop.example.com';
```

```ts
// a spec file
import { BASE_URL } from '../config';
```

- The names in `{ }` must match the exported names exactly.
- The path is relative to the file doing the importing. `./` means the same folder and `../` means one folder up. Leave off the `.ts`.
- Packages from `node_modules` are imported by name: `import { test, expect } from '@playwright/test';`

You've been doing this all along: every spec file in this course imports from `./exercises`.

## Throwing errors

When something is wrong and the code can't sensibly continue, **throw** an error with a message that says how to fix it:

```ts
throw new Error(
  'Missing required environment variable "APP_USER_EMAIL". Copy .env.example to .env.'
);
```

A clear error message saves the next person (often you) a lot of time.

## Catching errors

```ts
try {
  riskyThing();
} catch (error) {
  // runs only if riskyThing threw
  console.log((error as Error).message);
}
```

**In tests, be careful with `catch`.** Catching an error and carrying on can hide a real failure, and the test passes when it shouldn't. You'll rarely write `try`/`catch` in a test. It's mostly used in support code.

## Environment variables and secrets

Passwords never go in code. They live in a `.env` file that isn't committed to git, and code reads them with `process.env`:

```ts
process.env.APP_USER_EMAIL; // a string, or undefined if it isn't set
```

Test suites usually wrap this in a small helper, so a missing value fails with a clear message:

```ts
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable "${name}". Add it to your .env file.`);
  }
  return value;
}

export const testUser: TestUser = {
  get username() {
    return requireEnv('APP_USER_EMAIL');
  },
  // ...
};
```

Why the `get`? A getter only runs when it's read. So a missing password only causes an error in the tests that actually log in, and every other test can still run. Exercise 5 has you build the same thing.

## Now do the exercises

```
npx playwright test 07
```
