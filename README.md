# Playwright Learning

A hands-on path into test automation with Playwright, in two phases:

1. **Phase 1: TypeScript.** Just enough of the language to read and write a Playwright test suite. No browser yet.
2. **Phase 2: Playwright.** Real browser tests against public practice sites, written to professional standards.

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
2. **Open** `exercises.ts` and write your code wherever it says `// TODO: write your code here`.
3. **Run** that topic's tests, for example `npx playwright test 01`, until they're all green. You can also click the ▶ buttons in VS Code's **Testing** panel (the flask icon).
4. **Run** `npm run typecheck`. Topic 04 onwards has some checks that only typecheck catches.
5. **Compare** your answers with [Phase1-TypeScript/solutions/](Phase1-TypeScript/solutions/). There's usually more than one right answer, so if yours works and reads clearly, it's fine.

Don't edit the `.spec.ts` files. They're the "answer checker".

**Already code in another language?** Skim the lessons and go straight to the exercises. Still do topic 05 properly, though.

### Reading a failing test

```
  1) 01 Basics › 2. orderUrl builds the order page URL

    Error: expect(received).toBe(expected)

    Expected: "https://shop.example.com/orders/42"
    Received: "https://shop.example.com/orders42"
```

**Expected** is what the test wanted, and **Received** is what your code gave. Here the `/` before the id is missing. Underneath the error there's a file and line number pointing at the failing check. Get used to reading these, because Playwright failures in Phase 2 look exactly the same.

If you see `Received: undefined`, you most likely haven't written that function yet, or you forgot to `return` the answer.

### Red underlines and typecheck errors at the start are normal

Every function you haven't written yet has a red underline in VS Code, and `npm run typecheck` lists them all. That's because each function promises to return something (for example `: string`) but doesn't yet. A few exercises in topics 04, 06 and 07 also start deliberately broken. Every one of these errors disappears as you finish the exercises. When all seven topics are done, typecheck should report nothing for the `Phase1-TypeScript` files. (Phase 2's unfinished exercises show up there too, until you do them.)

## Phase 2: Playwright

Now the real thing: tests that drive a browser around three public practice websites, organised the way a professional test suite is.

### Extra setup (once)

1. Download the browser Playwright uses:
   ```
   npx playwright install chromium
   ```
2. Copy `.env.example` to a new file called `.env` in the same folder. It holds the practice site's logins. `.env` is never committed to git, which is how real passwords are kept out of code.

### The exercises

Each lesson is in [Phase2-Playwright/lessons/](Phase2-Playwright/lessons/) and ends by telling you which files to finish.

| #   | Lesson                                                                             | Site         | You write                                  | Run                                           |
| --- | ---------------------------------------------------------------------------------- | ------------ | ------------------------------------------ | --------------------------------------------- |
| 01  | [Your first browser test](Phase2-Playwright/lessons/01-first-test.md)              | TodoMVC      | the steps in a test (the checks are given) | `npx playwright test Todos`                   |
| 02  | [Page objects](Phase2-Playwright/lessons/02-page-objects.md)                       | Sauce Demo   | `LoginPage`                                | `npx playwright test Login`                   |
| 03  | [Saved login and test ids](Phase2-Playwright/lessons/03-saved-login.md)            | Sauce Demo   | the login setup, `InventoryPage`           | `npx playwright test Inventory`               |
| 04  | [Tests that stand on their own](Phase2-Playwright/lessons/04-independent-tests.md) | Sauce Demo   | `CartPage`, `CheckoutPage`                 | `npx playwright test Cart Checkout`           |
| 05  | [Waiting properly, and pop-ups](Phase2-Playwright/lessons/05-waiting.md)           | The Internet | `DynamicControlsPage`, `EntryAdPage`       | `npx playwright test DynamicControls EntryAd` |
| 06  | [Debugging a failing test](Phase2-Playwright/lessons/06-debugging.md)              | The Internet | fixes for three broken tests               | `npx playwright test Broken`                  |
| 07  | [Write your own test](Phase2-Playwright/lessons/07-your-own-test.md)               | Sauce Demo   | a whole test, from scratch                 | your choice                                   |

Same idea as Phase 1: the `.spec.ts` files check your work (don't edit them, except in 06 and 07), and model answers are in [Phase2-Playwright/solutions/](Phase2-Playwright/solutions/), in the same folders as the files you're finishing.

When you've finished an exercise, also run `npm run lint`. It catches mistakes the tests can't, like a missing `await`.

### How it's organised

```
Phase2-Playwright/
  SauceDemo/
    Pages/      page objects: how to find and use each page (locators and actions)
    Tests/      specs: what to check (the tests themselves)
  TheInternet/  same layout
  TodoMVC/      tests only (lesson 01 comes before page objects)
  support/      shared settings: site addresses, logins
  projects.ts   which tests run on which site, and in what order
```

`Pages/` and `Tests/` mirror each other: `Pages/Auth/LoginPage.ts` goes with `Tests/Auth/Login.spec.ts`.

### Handy tools

- `npx playwright test --ui`: **UI mode**. Pick a test, watch it run, and step back through every action with a snapshot of the page. The best way to learn.
- `npm run report`: the report from your last run, including a **trace** (a step-by-step recording) of every failed test.
- `npx playwright codegen <url>`: click around a website and Playwright writes the locators for you.
- The **Testing** panel in VS Code (flask icon) runs any test with one click.

## When you're stuck

- Re-read the relevant part of the lesson. Each exercise is covered there.
- Add `console.log(someValue)` to your code and re-run the test to see what's actually happening. The output appears in the terminal.
- Ask. Being stuck for 20 minutes is fine. Being stuck for two hours means it's time to ask.

## For maintainers

`npm run check:solutions` copies both phases into a scratch folder, swaps every exercise for its model answer, and runs the tests, typecheck and lint. Run it after changing any exercise, spec or solution: everything should pass. Phase 2 runs against the live practice sites, so it needs an internet connection, and a failure there can occasionally be the site being down.
