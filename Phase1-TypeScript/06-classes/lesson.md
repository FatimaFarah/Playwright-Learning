# 06 — Classes

Every **page object** in a Playwright suite is a class, so this topic is how you'll organise your Playwright code.

## A class is a blueprint

```ts
class Customer {
  readonly name: string; // readonly: set once in the constructor, never changed
  readonly email: string;

  constructor(name: string, email: string) {
    this.name = name; // `this` means "the object being built"
    this.email = email;
  }

  label(): string {
    // a method: a function that belongs to the object
    return `${this.name} <${this.email}>`;
  }
}

const acme = new Customer('Acme', 'orders@acme.test'); // `new` builds an object from the blueprint
acme.label(); // 'Acme <orders@acme.test>'
```

## private: hide the details

```ts
class Basket {
  private items: string[] = []; // only code inside the class can touch this

  add(item: string): void {
    this.items.push(item);
  }
}
```

Code outside can only use `add`, so it can't put the basket into a strange state.

## Getters: a property that's worked out when you read it

```ts
class Basket {
  private items: string[] = [];

  get count(): number {
    return this.items.length;
  }
}

basket.count; // no brackets: it reads like a property
```

## The page object pattern

This is the typical shape of a page object, here for a search page:

```ts
export class SearchPage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly results: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.getByRole('searchbox', { name: 'Search' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.results = page.getByRole('listitem');
  }

  async searchFor(term: string) {
    await this.searchBox.fill(term);
    await this.searchButton.click();
  }
}
```

The pattern is:

- The **constructor** receives the `page` and sets up the **locators** (how to find each element).
- **Methods** are the actions a user takes, and they `await` each step.
- **No assertions** (`expect`) go inside a page object. Checking results is the test's job.

Exercise 3 has you build one of these against a pretend page, so you can practise the pattern before there's a real browser involved.

## Now do the exercises

```
npx playwright test 06
```
