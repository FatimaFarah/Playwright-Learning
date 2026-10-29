// Don't edit this file — make these tests pass by editing exercises.ts.
import { test, expect } from '@playwright/test';
import {
  fullName,
  orderUrl,
  isBulkOrder,
  parcelLabel,
  formatPrice,
  normaliseEmail,
} from './exercises';

test.describe('01 Basics', () => {
  test('1. fullName joins first and last name with a space', () => {
    expect(fullName('Sam', 'Jones')).toBe('Sam Jones');
    expect(fullName('Ada', 'Lovelace')).toBe('Ada Lovelace');
  });

  test('2. orderUrl builds the order page URL', () => {
    expect(orderUrl('https://shop.example.com', 42)).toBe('https://shop.example.com/orders/42');
    expect(orderUrl('https://test.example.com', 7)).toBe('https://test.example.com/orders/7');
  });

  test('3. isBulkOrder is true from 50 items', () => {
    expect(isBulkOrder(49)).toBe(false);
    expect(isBulkOrder(50)).toBe(true);
    expect(isBulkOrder(120)).toBe(true);
  });

  test('4. parcelLabel picks the right label', () => {
    expect(parcelLabel(0)).toBe('Nothing to ship');
    expect(parcelLabel(1)).toBe('Small parcel');
    expect(parcelLabel(4)).toBe('Small parcel');
    expect(parcelLabel(5)).toBe('Large parcel');
  });

  test('5. formatPrice shows pence as pounds', () => {
    expect(formatPrice(1250)).toBe('£12.50');
    expect(formatPrice(99)).toBe('£0.99');
    expect(formatPrice(100000)).toBe('£1000.00');
  });

  test('6. normaliseEmail trims and lower-cases', () => {
    expect(normaliseEmail('  Sam.Jones@Example.COM ')).toBe('sam.jones@example.com');
    expect(normaliseEmail('qa@example.com')).toBe('qa@example.com');
  });
});
