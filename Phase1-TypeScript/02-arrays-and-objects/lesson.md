# 02 — Arrays and objects

In this topic you'll learn the two ways to group values together: **arrays** (lists) and **objects** (named fields), and how to search, filter and add up lists.

Same as before: write the inside of each function in `exercises.ts` so it **returns** the answer, then run the tests.

## Arrays: lists of values

An **array** is a list, written in square brackets:

```ts
const products = ['Backpack', 'Bike Light', 'T-Shirt'];
```

Each item has a numbered position called an **index**. Counting starts at **0**, not 1:

```ts
products[0]; // 'Backpack'   (the first item)
products[1]; // 'Bike Light'
products[2]; // 'T-Shirt'
```

`.length` tells you how many items there are:

```ts
products.length; // 3
```

Because counting starts at 0, the last item is always at `length - 1`. This works whatever the length of the list:

```ts
products[products.length - 1]; // products[2], which is 'T-Shirt'
```

Other useful bits:

```ts
products.includes('Bike Light'); // true: is it in the list?
[]; // an empty array
```

## Making a new array with something added

The `...` (called **spread**) means "all the items from this array". Put it inside new square brackets, followed by the new item:

```ts
const more = [...products, 'Jacket'];
// more is ['Backpack', 'Bike Light', 'T-Shirt', 'Jacket']
// products is unchanged: ['Backpack', 'Bike Light', 'T-Shirt']
```

There's also `products.push('Jacket')`, but that **changes the original array**. If other code (or another test) is using that array, it suddenly changes underneath it, which causes confusing bugs. When a function is asked to give back a **new** array, use spread.

## Objects: values with names

An **object** groups related values under names, called **fields** or properties. It's written in curly brackets:

```ts
const order = { id: 12, customer: 'Sam Jones', items: 2, paid: false };
```

Read a field with a dot:

```ts
order.customer; // 'Sam Jones'
order.items; // 2
```

### Copying an object with one field changed

Spread works on objects too. This copies every field, then sets `paid` to `true` in the copy. The original is left alone:

```ts
const paidOrder = { ...order, paid: true };
// paidOrder is { id: 12, customer: 'Sam Jones', items: 2, paid: true }
// order.paid is still false
```

### Destructuring: pulling fields out into variables

```ts
const { id, customer } = order;
// exactly the same as:
// const id = order.id;
// const customer = order.customer;
```

This is handy when you're about to use several fields, for example in a template literal:

```ts
const { id, items } = order;
return `#${id} has ${items} items`; // '#12 has 2 items'
```

## Lists of objects

You'll often have an array where each item is an object:

```ts
const orders = [
  { id: 12, customer: 'Sam Jones', items: 2, paid: false },
  { id: 13, customer: 'Priya Patel', items: 5, paid: true },
];
```

`orders[0].customer` is `'Sam Jones'`.

## Going through a list one item at a time

A `for...of` loop runs its body once for each item. Each time round, `order` holds the next item:

```ts
for (const order of orders) {
  console.log(order.customer); // prints 'Sam Jones', then 'Priya Patel'
}
```

### Adding up as you go

To total something, start a `let` variable at 0 and add to it each time round the loop. (`Order[]` means "an array of orders". `Order` is the order shape defined at the top of `exercises.ts`.)

```ts
export function countPaid(orders: Order[]): number {
  let count = 0;
  for (const order of orders) {
    if (order.paid) {
      count = count + 1;
    }
  }
  return count; // after the loop has finished
}
```

**Common mistake:** putting the `return` **inside** the loop. The function would stop after the first item.

## Shortcuts for lists: filter, map, find

These three do common jobs in one line. Each takes a small function that's run on every item.

That small function is written like `(o) => o.paid`. Read it as: "given an item, which we'll call `o`, give back `o.paid`". (Topic 03 explains this syntax properly. For now, the bit after `=>` is what you get back for each item.)

**`filter`** keeps only the items where your function gives back `true`:

```ts
orders.filter((o) => o.paid); // only the paid orders
orders.filter((o) => o.items > 3); // only orders with more than 3 items
orders.filter((o) => !o.paid); // ! means NOT, so only the unpaid orders
```

**`map`** turns each item into something else, and gives back a new list of the results:

```ts
orders.map((o) => o.customer); // ['Sam Jones', 'Priya Patel']
orders.map((o) => o.items * 2); // [4, 10]
```

**`find`** gives back the **first** item that matches, or `undefined` (meaning "nothing") if none does:

```ts
orders.find((o) => o.customer === 'Priya Patel'); // the Priya Patel order
orders.find((o) => o.customer === 'Nobody'); // undefined
```

All three leave the original list unchanged.

## Where you'll see this in Playwright

```ts
const { username, password } = testUser; // destructuring
const names = await page.getByRole('cell').allTextContents(); // an array of strings
expect(names).toContain('Sam Jones');
```

## Exercise guide

| Exercise          | Lesson sections you need                                   |
| ----------------- | ---------------------------------------------------------- |
| 1 `lastProduct`   | Arrays (the last item)                                     |
| 2 `addProduct`    | Making a new array with something added                    |
| 3 `unpaidOrders`  | filter (and `!` for NOT)                                   |
| 4 `orderIds`      | map                                                        |
| 5 `findOrder`     | find                                                       |
| 6 `totalItems`    | Adding up as you go                                        |
| 7 `markPaid`      | Copying an object with one field changed                   |
| 8 `describeOrder` | Destructuring, plus Joining strings together from topic 01 |

```
npx playwright test 02
```
