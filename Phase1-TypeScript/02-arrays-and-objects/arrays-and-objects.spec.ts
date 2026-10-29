// Don't edit this file — make these tests pass by editing exercises.ts.
import { test, expect } from '@playwright/test';
import {
  type Order,
  lastProduct,
  addProduct,
  unpaidOrders,
  orderIds,
  findOrder,
  totalLitres,
  markPaid,
  describeOrder,
} from './exercises';

const orders: Order[] = [
  { id: 12, customer: 'Acme', litres: 500, paid: false },
  { id: 13, customer: 'Bright Farms', litres: 2000, paid: true },
  { id: 14, customer: 'Coastal Haulage', litres: 7500, paid: false },
];

test.describe('02 Arrays and objects', () => {
  test('1. lastProduct returns the last item', () => {
    expect(lastProduct(['Diesel', 'Kerosene', 'AdBlue'])).toBe('AdBlue');
    expect(lastProduct(['Gas Oil'])).toBe('Gas Oil');
  });

  test('2. addProduct returns a new array and leaves the original alone', () => {
    const original = ['Diesel'];
    expect(addProduct(original, 'AdBlue')).toEqual(['Diesel', 'AdBlue']);
    expect(original).toEqual(['Diesel']);
  });

  test('3. unpaidOrders keeps only unpaid orders', () => {
    expect(unpaidOrders(orders).map((o) => o.id)).toEqual([12, 14]);
  });

  test('4. orderIds lists the ids in order', () => {
    expect(orderIds(orders)).toEqual([12, 13, 14]);
    expect(orderIds([])).toEqual([]);
  });

  test('5. findOrder finds by id, or returns undefined', () => {
    expect(findOrder(orders, 13)?.customer).toBe('Bright Farms');
    expect(findOrder(orders, 99)).toBeUndefined();
  });

  test('6. totalLitres adds up all the litres', () => {
    expect(totalLitres(orders)).toBe(10000);
    expect(totalLitres([])).toBe(0);
  });

  test('7. markPaid returns a paid copy and leaves the original alone', () => {
    const order = { ...orders[0] };
    expect(markPaid(order)).toEqual({ id: 12, customer: 'Acme', litres: 500, paid: true });
    expect(order.paid).toBe(false);
  });

  test('8. describeOrder describes an order', () => {
    expect(describeOrder(orders[0])).toBe('Order 12 for Acme: 500 litres');
    expect(describeOrder(orders[2])).toBe('Order 14 for Coastal Haulage: 7500 litres');
  });
});
