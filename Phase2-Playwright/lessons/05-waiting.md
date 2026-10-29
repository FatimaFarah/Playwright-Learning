# 05 — Waiting properly, and pop-ups

**Site:** [The Internet](https://the-internet.herokuapp.com/), a collection of awkward web pages built for practising automation.

Most flaky tests (tests that pass sometimes and fail other times) are caused by waiting badly. This lesson is the one that will save you the most time.

## Playwright waits for you

Before every action, Playwright waits until the element exists, is visible, isn't moving and isn't covered by something else. Every `expect` keeps retrying until it passes. Both give up after a timeout: 5 seconds for an `expect`.

So this is all you need, even if "It's gone!" takes 3 seconds to appear:

```ts
await removeButton.click();
await expect(page.getByText("It's gone!")).toBeVisible();
```

## Never wait a fixed time

```ts
await page.waitForTimeout(3000); // ❌
```

A fixed wait is **too long** when the site is fast, which makes every run slower. It's **too short** when the site is slow, so the test fails randomly. There's always something specific to wait for instead: an element appearing, a button becoming enabled, a URL changing. Lint (`npm run lint`) treats `waitForTimeout` as an error.

The same goes for `page.waitForLoadState('networkidle')`, "wait until the network goes quiet". It's a guess, not proof that the thing you need has finished.

## When something is genuinely slow

If the site really takes longer than 5 seconds, give **that one check** a longer timeout, and say why in a comment:

```ts
// The site takes about 3.5 seconds, too close to the 5-second default to be reliable.
await expect(dynamicControlsPage.checkbox).toBeHidden({ timeout: 10_000 });
```

Don't raise the timeout for every test to "make them pass". A slow page is useful information, and hiding it everywhere hides real problems.

## Checks that don't wait

```ts
expect(await locator.isVisible()).toBe(true); // ❌ checks once, right now
await expect(locator).toBeVisible(); // ✅ keeps checking until it's true
```

`isVisible()`, `textContent()` and friends give an answer **at that instant**. Use the `await expect(locator)...` form for checks.

## Pop-ups

The [Entry Ad page](https://the-internet.herokuapp.com/entry_ad) shows an advert pop-up half a second after it loads. While it's showing, nothing behind it can be clicked.

**When you know it will appear,** just click its Close button. Playwright waits for the button to appear, the same as any click:

```ts
async closeAd() {
  await this.closeButton.click();
}
```

**When there's no role to use.** The pop-up's "Close" is a plain `<p>` paragraph with no role, so `getByRole('button', { name: 'Close' })` finds nothing. This is when a CSS selector is acceptable. Keep it narrow: scope it to the pop-up's container, and add a comment so nobody "fixes" it back:

```ts
// "Close" is a plain paragraph with no role, so it's scoped by the pop-up's container instead.
this.closeButton = page.locator('#modal .modal-footer').getByText('Close');
```

(Right-click the pop-up, choose **Inspect**, and you'll see `<div id="modal">` and `<div class="modal-footer">`.)

**When it might appear at any moment,** like a cookie banner or a "rate our app" survey, you can't put a click in the right place in your test, because you don't know where that is. Playwright's `addLocatorHandler` deals with it automatically whenever it appears:

```ts
await page.addLocatorHandler(cookieBanner.getByRole('button', { name: 'Accept' }), async () => {
  await cookieBanner.getByRole('button', { name: 'Accept' }).click();
});
```

Register it once (for example in your page object's `goto()`), and Playwright clicks Accept whenever the banner gets in the way. You won't need one in this exercise, because you know exactly when the advert appears. Remember it for real-world sites, though.

## Now do the exercise

Finish [TheInternet/Pages/DynamicControls/DynamicControlsPage.ts](../TheInternet/Pages/DynamicControls/DynamicControlsPage.ts) and [TheInternet/Pages/EntryAd/EntryAdPage.ts](../TheInternet/Pages/EntryAd/EntryAdPage.ts).

```
npx playwright test DynamicControls EntryAd
```

Tip: the advert's title is a heading, "This is a modal window".
