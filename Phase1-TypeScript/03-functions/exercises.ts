// 03 — Functions. Replace each `throw new Error('TODO ...')` with your answer.
// Run: npx playwright test 03

// 1. Rewrite this as a one-line arrow function that returns n multiplied by 2.
export const double = (n: number): number => {
  throw new Error('TODO: write double');
};

// 2. Greet someone. If no greeting is given, use 'Hello'.
//    ('Sam') -> 'Hello, Sam!'    ('Sam', 'Hi') -> 'Hi, Sam!'
//    Hint: give `greeting` a default value.
export function greet(name: string, greeting?: string): string {
  throw new Error('TODO: write greet');
}

// 3. Call `fn` on every value and return the results as a new array.
export function applyToAll(values: number[], fn: (n: number) => number): number[] {
  throw new Error('TODO: write applyToAll');
}

// 4. Count how many items `matches` returns true for.
//    (['Backpack', 'T-Shirt', 'Bike Light'], (p) => p.includes(' ')) -> 1
export function countMatching(items: string[], matches: (item: string) => boolean): number {
  throw new Error('TODO: write countMatching');
}

// 5. Call `attempt` up to `maxTries` times, stopping as soon as it returns true.
//    Return how many tries it took, or -1 if it never returned true.
//    (Playwright retries things like this when it waits for the page.)
export function retry(attempt: () => boolean, maxTries: number): number {
  throw new Error('TODO: write retry');
}
