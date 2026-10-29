# 07 — Write your own test

No TODOs this time, and no tests already written for you. You decide what the test does and how. This is what the job actually looks like.

## The task

On Sauce Demo's products page there's a sort dropdown ("Name (A to Z)", "Price (low to high)" and so on). Write tests that check sorting works:

- **Sort by price, low to high:** the cheapest product comes first and the most expensive comes last.
- **Sort by name, Z to A:** the product that's last alphabetically comes first.

## How to go about it

1. **Try it by hand first.** Open Sauce Demo, log in, and use the dropdown. Note what changes, and which products end up first and last.
2. **Plan the test** in plain English before you write any code: what are the steps, and what are the checks?
3. **Add what you need to `InventoryPage`:** a locator for the dropdown, a locator for the product names, and a `sortBy()` action. Use [codegen](01-first-test.md#locators-how-you-point-at-things-on-the-page) or Inspect to find them. Tip: a dropdown is a `combobox`, and `locator.selectOption('...')` picks an option.
4. **Create the spec:** `SauceDemo/Tests/Inventory/SortProducts.spec.ts`.
5. **Run it until it passes.**

## Before you call it done

Go through this checklist. It's what a reviewer will check on your real work:

- [ ] Locators are role-based where possible, with a test id or CSS only when nothing else fits (and a comment saying why for CSS)
- [ ] Locators and actions are in the page object, and `expect` is only in the spec
- [ ] Each test sets up what it needs, and passes when run on its own
- [ ] Titles start with the feature and action, in sentence case
- [ ] Every action and `expect` is awaited
- [ ] No `waitForTimeout`, no `force: true`
- [ ] `npm run lint` and `npm run typecheck` report nothing for your files
- [ ] It passes 5 times in a row: `npx playwright test SortProducts --repeat-each=5`

Then compare with the model answer: [solutions/SauceDemo/Tests/Inventory/SortProducts.spec.ts](../solutions/SauceDemo/Tests/Inventory/SortProducts.spec.ts) and the `sortBy` part of [solutions/SauceDemo/Pages/Inventory/InventoryPage.ts](../solutions/SauceDemo/Pages/Inventory/InventoryPage.ts). Yours can be different and still be right.

## Want more?

Some ideas to practise on, with no model answers, so ask someone to review them:

- **Log out:** open the menu, click Logout, and check you're back on the login page.
- **Product details:** click a product's name, and check its details page shows the right name and price.
- **Remove from the products page:** add a product, click Remove on the same card, and check the cart badge disappears.
