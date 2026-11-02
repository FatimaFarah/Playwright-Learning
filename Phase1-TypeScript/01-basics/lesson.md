# 01 — Basics: values, strings and decisions

In this topic you'll learn how the exercises work, then the building blocks every program uses: values, joining text together, simple maths, comparisons and decisions.

**Already code in another language?** Read "How the exercises work", skim the rest, then go straight to the exercises.

## How the exercises work (read this first)

### You return the answer. You don't print it, and you don't write a test.

Each exercise is a **function**: a named piece of code that takes some input and hands back an answer. Your job is to write the inside of the function so it hands back the right answer.

The tests are already written, in the `.spec.ts` file next to the exercise. A test **calls** your function with some input and checks what comes back. For example, this line from `basics.spec.ts`:

```ts
expect(fullName('Sam', 'Jones')).toBe('Sam Jones');
```

means: "call `fullName` with `'Sam'` and `'Jones'`, and expect the answer to be `'Sam Jones'`".

So you never print the answer, and you never write tests in Phase 1. You make the function **return** the right thing, and the tests tell you whether it did.

### Taking a function apart

Here's a small function, piece by piece:

```ts
export function shout(word: string): string {
  return word.toUpperCase();
}
```

| Part                         | What it means                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| `export`                     | other files can use this function (the test file needs to). Topic 07 explains more   |
| `function shout`             | this is a function called `shout`                                                    |
| `(word: string)`             | it takes one input, called a **parameter**, named `word`. `: string` means it's text |
| `: string` after the `)`     | the answer it hands back will be text                                                |
| `{ ... }`                    | the **body**: the code that runs when the function is called                         |
| `return word.toUpperCase();` | `return` hands the answer back. The function stops as soon as it reaches a `return`  |

When a test calls `shout('hello')`, the parameter `word` holds `'hello'` while the body runs, so the function returns `'HELLO'`.

A parameter is just a name for "whatever value the caller passed in". You use it in the body like any other value.

In the exercises, the first line of each function is written for you. You replace `// TODO: write your code here` with code that ends in a `return`.

### Doing an exercise, start to finish

1. Open `exercises.ts` in this folder. Each function has a comment above it saying what it should do, with examples.
2. Replace the `// TODO` line with your code. Save the file (**Ctrl+S**).
3. In the terminal, run:
   ```
   npx playwright test 01
   ```
4. Read the results (shortened here, because the real lines also show the file name and line number). A passing test shows **ok**, or a green tick in VS Code's Testing panel:
   ```
   ok 1 › 01 Basics › 1. fullName joins first and last name with a space
   ```
   A failing one shows what was expected and what your function actually returned:
   ```
   1) 01 Basics › 1. fullName joins first and last name with a space
      Expected: "Sam Jones"
      Received: "SamJones"
   ```
   Here the space is missing. Fix the code, save, and run the tests again.
5. Repeat until every test for this topic passes.

You don't have to do all the exercises before running the tests. Do one, run, check, then move on to the next. The tests for exercises you haven't started will keep failing until you get to them, and that's fine.

### Common mistakes

- **`Received: undefined`** means your function didn't return anything. Check there's a `return`.
- **A red underline under a function name** means that function doesn't return anything yet. It disappears once you add a `return`.
- **The test still fails after a fix?** Make sure you saved the file.

### What console.log is for

`console.log(something)` prints a value in the terminal while the tests run. It's useful for **peeking** when you're stuck:

```ts
export function shout(word: string): string {
  console.log('word is', word); // prints: word is hello
  return word.toUpperCase();
}
```

It's only for investigating. It doesn't count as an answer, so take it out once you've worked out the problem.

## Values and variables

A **value** is a piece of data. The three basic kinds are:

```ts
'Backpack'; // a string: text, written in quotes
3; // a number
true; // a boolean: either true or false
```

A **variable** is a name for a value, so you can use it later:

```ts
const product = 'Backpack';
const quantity = 3;
const paid = true;
```

`const` means the name always holds the same value. If you need to change it later, use `let` instead:

```ts
let attempts = 0;
attempts = attempts + 1; // now 1
```

Use `const` unless you really need `let`. Test code almost never does.

`//` starts a **comment**: a note for humans, which the computer ignores.

## Joining strings together

There are two ways to join strings.

**With `+`:**

```ts
const town = 'Leeds';
const postcode = 'LS1 4AP';

town + ', ' + postcode; // 'Leeds, LS1 4AP'
```

Everything between quotes is used exactly as written, including spaces. Without the `', '` in the middle you'd get `'LeedsLS1 4AP'`.

**With a template literal (usually easier):** wrap the whole thing in **backticks** (`` ` ``, the key under Esc on most UK keyboards), and put each value inside `${ }`:

```ts
`${town}, ${postcode}`; // 'Leeds, LS1 4AP'
```

Read it as "the value of `town`, then a comma and a space, then the value of `postcode`". Numbers work too:

```ts
const orderId = 42;
`Order number ${orderId}`; // 'Order number 42'
```

A complete example, a function that builds an address line:

```ts
export function addressLine(town: string, postcode: string): string {
  return `${town}, ${postcode}`;
}

// addressLine('Leeds', 'LS1 4AP') returns 'Leeds, LS1 4AP'
```

**Common mistake:** using ordinary quotes instead of backticks. `'${town}'` gives you the text `${town}`, dollar sign and all.

## Doing maths

```ts
10 + 5; // 15
10 - 5; // 5
10 * 5; // 50   (* means multiply)
10 / 4; // 2.5  (/ means divide)
(2 + 3) * 4; // 20   (brackets work as in normal maths)
```

To show a number with exactly two decimal places, use `.toFixed(2)`. Note that it gives you back **text**, not a number:

```ts
const total = 2.5;
total.toFixed(2); // '2.50'
`Total: £${total.toFixed(2)}`; // 'Total: £2.50'
```

## Methods: things a value can do

A **method** is a function that belongs to a value. You call it with a dot and brackets. Strings have lots of them:

```ts
'  Hello  '.trim(); // 'Hello'   (removes spaces from both ends)
'Hello'.toLowerCase(); // 'hello'
'Hello'.toUpperCase(); // 'HELLO'
'Hello'.includes('ell'); // true
```

You can **chain** methods. They run left to right, each one working on the result of the one before:

```ts
'  Hello  '.trim().toUpperCase(); // 'HELLO'
```

**Common mistake:** methods don't change the original string. They hand back a new one, so you need to use or `return` the result:

```ts
name.trim(); // ❌ the trimmed version is thrown away
return name.trim(); // ✅
```

## Comparing values

A comparison asks a question, and the answer is always a boolean, `true` or `false`:

```ts
quantity === 3; // is it equal to 3?
quantity !== 0; // is it NOT equal to 0?
quantity > 10; // greater than
quantity >= 10; // greater than or equal to
quantity < 10; // less than
quantity <= 10; // less than or equal to
paid && quantity > 0; // AND: true only if both are true
paid || quantity > 0; // OR: true if either is true
!paid; // NOT: flips true to false and false to true
```

Because a comparison already **is** `true` or `false`, you can return it directly:

```ts
export function isInStock(stock: number): boolean {
  return stock > 0;
}
// isInStock(4) returns true, and isInStock(0) returns false
```

**Common mistakes:**

- One `=` **sets** a value, while `===` **compares**. Always compare with three: `===` and `!==`. (The two-character `==` and `!=` behave in surprising ways.)
- "At least 10" includes 10 itself, so it's `>= 10`, not `> 10`.

## Making decisions: if / else

`if` runs code only when a condition is true. `else if` checks another condition, and `else` catches everything left over:

```ts
export function stockLabel(stock: number): string {
  if (stock === 0) {
    return 'Out of stock';
  } else if (stock < 5) {
    return 'Only a few left';
  } else {
    return 'In stock';
  }
}

// stockLabel(0) returns 'Out of stock'
// stockLabel(3) returns 'Only a few left'
// stockLabel(20) returns 'In stock'
```

The checks run **from top to bottom**, and the first one that's true wins. Because each branch `return`s, the function stops there.

**Common mistake:** putting the checks in the wrong order. If `stock < 5` came first, then `stockLabel(0)` would return `'Only a few left'`, because 0 is less than 5 and that check would win before `=== 0` was ever looked at. Put the most specific check first.

For a quick either/or, there's a one-line version called the **ternary**: `condition ? valueIfTrue : valueIfFalse`.

```ts
const label = paid ? 'Paid' : 'Unpaid';
```

## Where you'll see this in Playwright

```ts
await page.goto(`${BASE_URL}/products`); // joining a URL together
test('Login with valid credentials', async () => { ... }); // test titles are strings
```

## Exercise guide

Open `exercises.ts`. If you get stuck, this table says which part of the lesson each exercise needs:

| Exercise           | Lesson sections you need                                |
| ------------------ | ------------------------------------------------------- |
| 1 `fullName`       | How the exercises work, Joining strings together        |
| 2 `orderUrl`       | Joining strings together (numbers work too)             |
| 3 `isBulkOrder`    | Comparing values (you can return a comparison directly) |
| 4 `parcelLabel`    | Making decisions (watch the order of your checks)       |
| 5 `formatPrice`    | Doing maths, then Joining strings together              |
| 6 `normaliseEmail` | Methods (chain two of them)                             |

Run the tests with:

```
npx playwright test 01
```
