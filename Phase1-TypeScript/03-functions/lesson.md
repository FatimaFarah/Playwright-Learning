# 03 — Functions

## Two ways to write a function

```ts
// A function declaration
function double(n: number): number {
  return n * 2;
}

// An arrow function stored in a const: same thing, shorter
const double = (n: number): number => n * 2;
```

When an arrow function has a body in `{ }`, it needs an explicit `return`:

```ts
const double = (n: number): number => {
  return n * 2;
};
```

## Default parameters

```ts
function greet(name: string, greeting = 'Hello'): string {
  return `${greeting}, ${name}!`;
}

greet('Sam'); // 'Hello, Sam!'
greet('Sam', 'Hi'); // 'Hi, Sam!'
```

## Functions are values

You can pass a function **into** another function. That's what `.filter((o) => o.paid)` was doing in topic 02. A function you pass in like this is called a **callback**.

```ts
function applyToAll(values: number[], fn: (n: number) => number): number[] {
  return values.map(fn);
}

applyToAll([1, 2, 3], (n) => n * 10); // [10, 20, 30]
```

The type `(n: number) => number` means "a function that takes a number and returns a number".

## Counting loops

When you need to repeat something a set number of times (exercise 5), use a counting `for` loop. `return` inside the loop exits the whole function straight away:

```ts
for (let i = 1; i <= 3; i++) {
  // runs with i = 1, then 2, then 3
}
```

## This is how every Playwright test works

```ts
test('Login with valid credentials', async ({ page }) => {
  // ...
});
```

`test` is a function. You give it two things: a **title** (a string) and a **callback** (an arrow function). Playwright calls your callback when it runs the test. The `async` part and `{ page }` are covered in topics 05 and 02 (destructuring).

## Now do the exercises

```
npx playwright test 03
```
