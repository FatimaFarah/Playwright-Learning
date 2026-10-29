// Don't edit this file — make these tests pass by editing exercises.ts.
import { test, expect } from '@playwright/test';
import {
  FakeBasket,
  shoutCustomerName,
  addTwoItems,
  placeOrder,
  customerSummary,
  addAllItems,
} from './exercises';

test.describe('05 async and await', () => {
  test('1. shoutCustomerName returns the name in capitals', async () => {
    expect(await shoutCustomerName()).toBe('ACME FUELS');
  });

  test('2. addTwoItems adds both items in order', async () => {
    const basket = new FakeBasket();
    await addTwoItems(basket, 'Diesel', 'AdBlue');
    expect(basket.items).toEqual(['Diesel', 'AdBlue']);
  });

  test('3. placeOrder waits for the submit to finish', async () => {
    const basket = new FakeBasket();
    expect(await placeOrder(basket)).toBe('submitted');
  });

  test('4. customerSummary combines both results', async () => {
    expect(await customerSummary()).toBe('Acme Fuels has 3 orders');
  });

  test('5. addAllItems has added everything, in order, when it returns', async () => {
    const basket = new FakeBasket();
    await addAllItems(basket, ['Diesel', 'Kerosene', 'AdBlue']);
    expect(basket.items).toEqual(['Diesel', 'Kerosene', 'AdBlue']);
  });
});
