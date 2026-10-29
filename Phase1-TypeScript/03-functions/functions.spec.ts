// Don't edit this file — make these tests pass by editing exercises.ts.
import { test, expect } from '@playwright/test';
import { double, greet, applyToAll, countMatching, retry } from './exercises';

test.describe('03 Functions', () => {
  test('1. double multiplies by 2', () => {
    expect(double(4)).toBe(8);
    expect(double(0)).toBe(0);
  });

  test('2. greet uses Hello unless told otherwise', () => {
    expect(greet('Sam')).toBe('Hello, Sam!');
    expect(greet('Sam', 'Hi')).toBe('Hi, Sam!');
  });

  test('3. applyToAll calls the function on every value', () => {
    expect(applyToAll([1, 2, 3], (n) => n * 10)).toEqual([10, 20, 30]);
    expect(applyToAll([5], (n) => n - 1)).toEqual([4]);
  });

  test('4. countMatching counts the matches', () => {
    expect(countMatching(['Diesel', 'AdBlue', 'Gas Oil'], (p) => p.includes(' '))).toBe(1);
    expect(countMatching(['Diesel', 'AdBlue'], (p) => p.length > 0)).toBe(2);
    expect(countMatching([], () => true)).toBe(0);
  });

  test('5. retry stops at the first success', () => {
    let calls = 0;
    const succeedsOnThird = () => {
      calls = calls + 1;
      return calls === 3;
    };
    expect(retry(succeedsOnThird, 5)).toBe(3);
    expect(calls).toBe(3);
  });

  test('5. retry gives up after maxTries', () => {
    let calls = 0;
    const neverSucceeds = () => {
      calls = calls + 1;
      return false;
    };
    expect(retry(neverSucceeds, 4)).toBe(-1);
    expect(calls).toBe(4);
  });
});
