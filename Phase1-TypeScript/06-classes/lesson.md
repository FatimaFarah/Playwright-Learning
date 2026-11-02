# 06 — Classes

Every **page object** in a Playwright suite is a class, so this topic is how you'll organise your Playwright code.

## What a class is

A **class** is a blueprint for making objects. It describes:

- the **fields** each object holds (its data, like a product's name and price), and
- the **methods** each object has (the things it can do).

From one blueprint you can build as many objects as you like, each with its own values.

## Building a class, step by step

```ts
export class Product {
  // 1. Fields: list what each object holds, and its type
  readonly name: string;
  readonly price: number;

  // 2. Constructor: runs once, when an object is built, to fill in the fields
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  // 3. Methods: functions that belong to the object
  label(): string {
    return `${this.name} (£${this.price.toFixed(2)})`;
  }
}
```

**1. Fields.** Each line names a field and its type. `readonly` means it's set once, in the constructor, and can never be changed afterwards.

**2. The constructor.** A special function that runs when an object is built. Its parameters are the values passed in. Its job is to copy them into the fields.

**`this`** means "the object being built", or later "the object this method was called on". `this.name = name` reads as: "set **this object's** `name` field to the `name` that was passed in". The two `name`s are different things: one is the field, the other is the parameter.

**3. Methods.** These are written like functions, but without the word `function`. Inside a method, use `this.` to reach the object's own fields.

### Using the class

`new` builds an object from the blueprint. It runs the constructor with the values you pass:

```ts
const bag = new Product('Backpack', 29.99);

bag.name; // 'Backpack'
bag.label(); // 'Backpack (£29.99)'
```

**Common mistakes:**

- Forgetting to list a field above the constructor. `this.name = name` gives a red underline if there's no `name` field listed.
- Forgetting `this.` inside a method. `return name` won't find the field. It has to be `this.name`.

## private: hiding the details

A `private` field can only be used by code **inside** the class. Code outside has to go through the class's methods:

```ts
export class Wishlist {
  private products: string[] = []; // starts as an empty list

  add(product: string): void {
    this.products.push(product);
  }
}

const list = new Wishlist();
list.add('Backpack'); // ✅
list.products; // ❌ red underline: products is private
```

Notice that the field is filled in where it's declared (`= []`), so this class doesn't need a constructor at all.

Topic 02 warned against `push`, because it changes the original array. Inside a class with a `private` list, that's fine: the class owns the list, and no other code can see it to be surprised by the change.

The list can hold objects, too. When you're building an object from variables that have the same names as the fields, there's a shorthand:

```ts
const name = 'Backpack';
const price = 29.99;
const item = { name, price }; // short for { name: name, price: price }
```

## Getters: a field that's worked out when you read it

A **getter** looks like a method with `get` in front. It's read like a field, without brackets:

```ts
export class Wishlist {
  private products: string[] = [];

  get size(): number {
    return this.products.length;
  }
}

list.size; // 1   (no brackets)
```

Use a getter for a value that's worked out from other fields, so it's always up to date.

## The page object pattern

This is the typical shape of a page object, here for a search page. (`Page` and `Locator` are Playwright's types, which you'll meet in Phase 2.)

```ts
export class SearchPage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.getByRole('searchbox', { name: 'Search' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  async searchFor(term: string) {
    await this.searchBox.fill(term);
    await this.searchButton.click();
  }
}
```

The pattern:

- The **fields** are the page, plus one **locator** (a way of finding an element) for each thing the tests need.
- The **constructor** receives the `page`, stores it, and sets up each locator by asking the page for it.
- **Methods** are the actions a user takes. They're `async`, and they `await` each step (topic 05).
- **No checks** (`expect`) go inside a page object. Checking results is the test's job.

## The exercise's pretend page

Exercise 3 uses a pretend page, `FakePage`, marked **Given** in `exercises.ts`. It works like the real thing, but just records what you do:

- `page.getByLabel('Email address')` gives back a `FakeLocator`.
- A `FakeLocator` has `fill(text)` and `click()`. Both are `async`, so `await` them.
- The test checks the page's record, to see that you filled in and clicked the right things, in the right order.

So your fields' types are `FakePage` and `FakeLocator`, where a real page object would use `Page` and `Locator`.

## Exercise guide

Each class in `exercises.ts` gives you the constructor and method lines. **You add the field lines yourself**, above the constructor.

| Exercise      | Lesson sections you need                                                                 |
| ------------- | ---------------------------------------------------------------------------------------- |
| 1 `Customer`  | Building a class, step by step                                                           |
| 2 `Basket`    | private, Getters, the `{ name, price }` shorthand, and Adding up as you go from topic 02 |
| 3 `LoginPage` | The page object pattern, and The exercise's pretend page                                 |

```
npx playwright test 06
```
