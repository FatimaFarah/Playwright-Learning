# 02 — Arrays and objects

## Arrays: lists of things

```ts
const products = ['Diesel', 'Kerosene', 'AdBlue'];

products[0]; // 'Diesel' (counting starts at 0)
products.length; // 3
products[products.length - 1]; // 'AdBlue' (the last item)
products.includes('Kerosene'); // true
```

To make a **new** array with an extra item, use the spread operator `...`:

```ts
const more = [...products, 'Gas Oil']; // products itself is unchanged
```

Prefer this over `products.push(...)`, which **changes** the original array. Changing data that other code shares is a common source of confusing bugs, and in tests it can make one test affect another.

## Objects: named values grouped together

```ts
const order = { id: 12, customer: 'Acme', litres: 500, paid: false };

order.customer; // 'Acme'
const updated = { ...order, paid: true }; // copy with one field changed
```

**Destructuring** pulls fields out into variables:

```ts
const { id, customer } = order; // same as: const id = order.id; const customer = order.customer;
```

## Looping

```ts
for (const product of products) {
  console.log(product);
}
```

## The big three: filter, map, find

These take a **function** and apply it to each item. `o => o.paid` is a short function that takes `o` and returns `o.paid` (topic 03 covers this syntax).

```ts
const orders = [order1, order2, order3];

orders.filter((o) => o.paid); // new array: only the paid orders
orders.map((o) => o.id); // new array: just the ids, e.g. [12, 13, 14]
orders.find((o) => o.id === 13); // the first match, or undefined if nothing matches
```

## Where you'll see this in Playwright

```ts
const { username, password } = testUser;
const rows = await page.getByRole('row').all();
const names = await page.getByRole('cell').allTextContents(); // an array of strings
expect(names).toContain('Acme');
```

## Now do the exercises

```
npx playwright test 02
```
