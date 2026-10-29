# 06 — Debugging a failing test

Tests fail. What matters is finding out **why**, and fixing the cause rather than hiding it.

## 1. Read the error properly

```
Error: expect(locator).toBeEnabled() failed

Locator:  getByRole('textbox')
Expected: enabled
Received: disabled

Call log:
  - Expect "toBeEnabled" getByRole('textbox') with timeout 10000ms
  - waiting for getByRole('textbox')
    2 × locator resolved to <input disabled type="text"/>
  ...
```

- **Locator:** what the test was looking for.
- **Expected / Received:** what it wanted, and what it actually found.
- **Call log:** what Playwright did, step by step. The last few lines usually say exactly what went wrong.

Some errors you'll see:

| Error says                                             | It usually means                                                   |
| ------------------------------------------------------ | ------------------------------------------------------------------ |
| `strict mode violation: ... resolved to 2 elements`    | your locator matches more than one thing, so make it more specific |
| `Timeout ... waiting for getByRole(...)`               | the element never appeared: wrong locator, or wrong page           |
| `element is not visible` / `intercepts pointer events` | something is in the way, such as a pop-up or a loading overlay     |
| `Test ended.` in the call log                          | something wasn't awaited, so the test finished before it ran       |

## 2. Look at the trace

Every failing test in this project saves a **trace**, a recording of the whole test: each step, a snapshot of the page at that moment, network calls and console errors.

```
npm run report
```

Click the failed test, then the **Trace** section. Step through it and watch what the page looked like when the step failed. This answers most "but it works when I do it by hand!" questions.

## 3. Watch it run

```
npx playwright test Broken --ui         UI mode: run, pause, inspect each step
npx playwright test Broken --headed     run with the browser visible
npx playwright test Broken --debug      step through one action at a time
```

## 4. Run lint

```
npm run lint
```

Lint reads your code without running it and points out known mistakes, such as a missing `await` or a `waitForTimeout`. It's the quickest check there is, so run it before you commit anything.

## Fix the cause, not the symptom

Some "fixes" make a test pass but leave it broken:

| Tempting "fix"                            | Why it's wrong                                                                     |
| ----------------------------------------- | ---------------------------------------------------------------------------------- |
| add `waitForTimeout(5000)`                | slow, and still fails on a slow day (lesson 05)                                    |
| add `.first()` to a strict mode violation | silently picks whichever element comes first, which might not be the one you meant |
| `click({ force: true })`                  | clicks even when a real user couldn't, so the test no longer tests what users see  |
| raise the timeout for every test          | hides slow pages instead of reporting them                                         |

## Now do the exercise

[TheInternet/Tests/Debugging/Broken.spec.ts](../TheInternet/Tests/Debugging/Broken.spec.ts) has three tests, each broken in a different way. For each one: run it, read the error, look at the trace, work out the real cause, and fix it properly.

```
npx playwright test Broken
npm run lint
```

You're done when all three pass **and** lint reports nothing for that file. Then compare with the [model answer](../solutions/TheInternet/Tests/Debugging/Broken.spec.ts), which explains each bug.
