// Don't edit this file — make these tests pass by editing exercises.ts.
import { test, expect } from '@playwright/test';
import {
  type Order,
  lastProduct,
  addProduct,
  unpaidOrders,
  orderIds,
  findOrder,
  totalItems,
  markPaid,
  describeOrder,
} from './exercises';

const orders: Order[] = [
  { id: 12, customer: 'Sam Jones', items: 2, paid: false },
  { id: 13, customer: 'Priya Patel', items: 5, paid: true },
  { id: 14, customer: 'Leo Martins', items: 13, paid: false },
];

test.describe('02 Arrays and objects', () => {
  test('1. lastProduct returns the last item', () => {
    expect(lastProduct(['Backpack', 'Bike Light', 'T-Shirt'])).toBe('T-Shirt');
    expect(lastProduct(['Jacket'])).toBe('Jacket');
  });

  test('2. addProduct returns a new array and leaves the original alone', () => {
    const original = ['Backpack'];
    expect(addProduct(original, 'T-Shirt')).toEqual(['Backpack', 'T-Shirt']);
    expect(original).toEqual(['Backpack']);
  });

  test('3. unpaidOrders keeps only unpaid orders', () => {
    expect(unpaidOrders(orders).map((o) => o.id)).toEqual([12, 14]);
  });

  test('4. orderIds lists the ids in order', () => {
    expect(orderIds(orders)).toEqual([12, 13, 14]);
    expect(orderIds([])).toEqual([]);
  });

  test('5. findOrder finds by id, or returns undefined', () => {
    expect(findOrder(orders, 13)?.customer).toBe('Priya Patel');
    expect(findOrder(orders, 99)).toBeUndefined();
  });

  test('6. totalItems adds up all the items', () => {
    expect(totalItems(orders)).toBe(20);
    expect(totalItems([])).toBe(0);
  });

  test('7. markPaid returns a paid copy and leaves the original alone', () => {
    const order = { ...orders[0] };
    expect(markPaid(order)).toEqual({ id: 12, customer: 'Sam Jones', items: 2, paid: true });
    expect(order.paid).toBe(false);
  });

  test('8. describeOrder describes an order', () => {
    expect(describeOrder(orders[0])).toBe('Order 12 for Sam Jones: 2 items');
    expect(describeOrder(orders[2])).toBe('Order 14 for Leo Martins: 13 items');
  });
});
