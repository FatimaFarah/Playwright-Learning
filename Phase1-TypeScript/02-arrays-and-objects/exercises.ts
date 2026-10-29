// 02 — Arrays and objects. Replace each `throw new Error('TODO ...')` with your answer.
// Run: npx playwright test 02

// Given — don't change this. It describes what an order looks like (see topic 04).
export type Order = { id: number; customer: string; items: number; paid: boolean };

// 1. Return the last product in the list, e.g. ['Backpack', 'T-Shirt'] -> 'T-Shirt'.
export function lastProduct(products: string[]): string {
  throw new Error('TODO: write lastProduct');
}

// 2. Return a NEW array with the product added on the end. Don't change the original array.
export function addProduct(products: string[], product: string): string[] {
  throw new Error('TODO: write addProduct');
}

// 3. Return only the orders that have not been paid. Hint: .filter
export function unpaidOrders(orders: Order[]): Order[] {
  throw new Error('TODO: write unpaidOrders');
}

// 4. Return just the ids of the orders, in the same order. Hint: .map
export function orderIds(orders: Order[]): number[] {
  throw new Error('TODO: write orderIds');
}

// 5. Return the order with this id, or undefined if there isn't one. Hint: .find
export function findOrder(orders: Order[], id: number): Order | undefined {
  throw new Error('TODO: write findOrder');
}

// 6. Add up the items in all the orders. Hint: a for...of loop and a `let` total.
export function totalItems(orders: Order[]): number {
  throw new Error('TODO: write totalItems');
}

// 7. Return a COPY of the order with paid set to true. Don't change the original.
export function markPaid(order: Order): Order {
  throw new Error('TODO: write markPaid');
}

// 8. Describe an order, e.g. 'Order 12 for Sam Jones: 2 items'. Try destructuring the order.
export function describeOrder(order: Order): string {
  throw new Error('TODO: write describeOrder');
}
