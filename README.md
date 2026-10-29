# Playwright Learning

A hands-on path into test automation with Playwright, in two phases:

1. **Phase 1: TypeScript.** Just enough of the language to read and write a Playwright test suite. No browser yet.
2. **Phase 2: Playwright.** Real browser tests against public practice sites, written to professional standards. _(Coming next.)_

This is a practice project, so you can't break anything here. Experiment freely.

## Setup (once)

1. Install **Node.js** (the LTS version) from [nodejs.org](https://nodejs.org).
2. Install **VS Code**, plus these extensions: **Playwright Test for VS Code** (Microsoft) and **Prettier**.
3. Open this folder in VS Code, open a terminal (**Terminal → New Terminal**) and run:
   ```
   npm install
   ```
4. Check it works:
   ```
   npm run phase1
   ```
   You should see a long list of **failing** tests. That's correct, because none of the exercises are done yet. Your job is to turn them green.

## How Phase 1 works

There are seven topics, each in its own folder under [Phase1-TypeScript/](Phase1-TypeScript/):

| #   | Topic                                                                   | Why it matters for Playwright                        |
| --- | ----------------------------------------------------------------------- | ---------------------------------------------------- |
| 01  | [Basics](Phase1-TypeScript/01-basics/lesson.md)                         | URLs, test titles, comparisons                       |
| 02  | [Arrays and objects](Phase1-TypeScript/02-arrays-and-objects/lesson.md) | Test data, lists of rows and cells                   |
| 03  | [Functions](Phase1-TypeScript/03-functions/lesson.md)                   | Every `test(...)` is a function call with a callback |
| 04  | [Types](Phase1-TypeScript/04-types/lesson.md)                           | Catching mistakes before you run anything            |
| 05  | [async and await](Phase1-TypeScript/05-async-await/lesson.md)           | **The big one.** Every Playwright action is async    |
| 06  | [Classes](Phase1-TypeScript/06-classes/lesson.md)                       | Page objects are classes                             |
| 07  | [Modules and errors](Phase1-TypeScript/07-modules-and-errors/lesson.md) | Imports, config, secrets in `.env`                   |

For each topic:

1. **Read** `lesson.md`.
2. **Open** `exercises.ts` and replace each `throw new Error('TODO ...')` with your code.
3. **Run** that topic's tests, for example `npx playwright test 01`, until they're all green. You can also click the ▶ buttons in VS Code's **Testing** panel (the flask icon).
4. **Run** `npm run typecheck`. Topic 04 onwards has some checks that only typecheck catches.
5. **Compare** your answers with [Phase1-TypeScript/solutions/](Phase1-TypeScript/solutions/). There's usually more than one right answer, so if yours works and reads clearly, it's fine.

Don't edit the `.spec.ts` files. They're the "answer checker".

**Already code in another language?** Skim the lessons and go straight to the exercises. Still do topic 05 properly, though.

### Reading a failing test

```
  1) 01 Basics › 2. orderUrl builds the order page URL

    Error: expect(received).toBe(expected)

    Expected: "https://dev.example.com/orders/42"
    Received: "https://dev.example.com/orders42"
```

**Expected** is what the test wanted, and **Received** is what your code gave. Here the `/` before the id is missing. Underneath the error there's a file and line number pointing at the failing check. Get used to reading these, because Playwright failures in Phase 2 look exactly the same.

If you see `Error: TODO: write orderUrl`, you just haven't done that exercise yet.

### Typecheck errors at the start are normal

Before you start, `npm run typecheck` reports a handful of errors in topics 04, 06 and 07. Those exercises deliberately start broken, and each error goes away when you finish that exercise. When all seven topics are done, typecheck should report nothing.

## When you're stuck

- Re-read the relevant part of the lesson. Each exercise is covered there.
- Add `console.log(someValue)` to your code and re-run the test to see what's actually happening. The output appears in the terminal.
- Ask. Being stuck for 20 minutes is fine. Being stuck for two hours means it's time to ask.

## For maintainers

`npm run check:solutions` copies Phase 1 into a scratch folder, swaps every exercise for its model answer, and runs the tests and typecheck. Run it after changing any exercise, spec or solution: everything should pass.
