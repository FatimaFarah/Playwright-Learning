// Don't edit this file — make these tests pass by editing exercises.ts.
import { test, expect } from '@playwright/test';
import {
  fullName,
  orderUrl,
  isLargeOrder,
  deliveryLabel,
  formatPrice,
  normaliseEmail,
} from './exercises';

test.describe('01 Basics', () => {
  test('1. fullName joins first and last name with a space', () => {
    expect(fullName('Sam', 'Jones')).toBe('Sam Jones');
    expect(fullName('Ada', 'Lovelace')).toBe('Ada Lovelace');
  });

  test('2. orderUrl builds the order page URL', () => {
    expect(orderUrl('https://dev.example.com', 42)).toBe('https://dev.example.com/orders/42');
    expect(orderUrl('https://test.example.com', 7)).toBe('https://test.example.com/orders/7');
  });

  test('3. isLargeOrder is true from 5000 litres', () => {
    expect(isLargeOrder(4999)).toBe(false);
    expect(isLargeOrder(5000)).toBe(true);
    expect(isLargeOrder(12000)).toBe(true);
  });

  test('4. deliveryLabel picks the right label', () => {
    expect(deliveryLabel(0)).toBe('Nothing to deliver');
    expect(deliveryLabel(500)).toBe('Small delivery');
    expect(deliveryLabel(999)).toBe('Small delivery');
    expect(deliveryLabel(1000)).toBe('Bulk delivery');
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
