// Model answers for 03 — Functions. Try the exercises first!

export const double = (n: number): number => n * 2;

export function greet(name: string, greeting = 'Hello'): string {
  return `${greeting}, ${name}!`;
}

export function applyToAll(values: number[], fn: (n: number) => number): number[] {
  return values.map(fn);
}

export function countMatching(items: string[], matches: (item: string) => boolean): number {
  return items.filter(matches).length;
}

export function retry(attempt: () => boolean, maxTries: number): number {
  for (let tries = 1; tries <= maxTries; tries++) {
    if (attempt()) {
      return tries;
    }
  }
  return -1;
}
