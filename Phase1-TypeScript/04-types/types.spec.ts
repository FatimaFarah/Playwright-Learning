// Don't edit this file — make these tests pass by editing exercises.ts.
import { test, expect } from '@playwright/test';
import {
  type TestUser,
  type DeliveryStatus,
  welcomeMessage,
  productName,
  parseQuantity,
  nextStatus,
} from './exercises';

test.describe('04 Types', () => {
  test('1. welcomeMessage prefers the display name', () => {
    const withName: TestUser = { username: 'qa1@example.com', password: 'x', displayName: 'Sam' };
    const withoutName: TestUser = { username: 'qa2@example.com', password: 'x' };
    expect(welcomeMessage(withName)).toBe('Welcome, Sam');
    expect(welcomeMessage(withoutName)).toBe('Welcome, qa2@example.com');
  });

  test('2. productName gives each shop section its display name', () => {
    expect(productName('books')).toBe('Books');
    expect(productName('games')).toBe('Video Games');
    expect(productName('music')).toBe('Music');
  });

  test('3. parseQuantity reads numbers and rejects everything else', () => {
    expect(parseQuantity('500')).toBe(500);
    expect(parseQuantity('12')).toBe(12);
    expect(parseQuantity('abc')).toBeUndefined();
    expect(parseQuantity('')).toBeUndefined();
  });

  test('4. nextStatus moves a delivery along', () => {
    expect(nextStatus('pending')).toBe('out-for-delivery');
    expect(nextStatus('out-for-delivery')).toBe('delivered');
    expect(nextStatus('delivered')).toBe('delivered');
  });

  test('4. DeliveryStatus only allows the three statuses (checked by npm run typecheck)', () => {
    // `npm run typecheck` reports "Unused '@ts-expect-error' directive" on this line until
    // DeliveryStatus is narrowed to the three statuses.
    // @ts-expect-error 'lost' is not a DeliveryStatus
    const invalid: DeliveryStatus = 'lost';
    expect(invalid).toBe('lost');
  });
});
