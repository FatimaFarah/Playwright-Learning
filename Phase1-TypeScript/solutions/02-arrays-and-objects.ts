// Model answers for 02 — Arrays and objects. Try the exercises first!

export type Order = { id: number; customer: string; items: number; paid: boolean };

export function lastProduct(products: string[]): string {
  return products[products.length - 1];
}

export function addProduct(products: string[], product: string): string[] {
  return [...products, product];
}

export function unpaidOrders(orders: Order[]): Order[] {
  return orders.filter((o) => !o.paid);
}

export function orderIds(orders: Order[]): number[] {
  return orders.map((o) => o.id);
}

export function findOrder(orders: Order[], id: number): Order | undefined {
  return orders.find((o) => o.id === id);
}

export function totalItems(orders: Order[]): number {
  let total = 0;
  for (const order of orders) {
    total = total + order.items;
  }
  return total;
}

export function markPaid(order: Order): Order {
  return { ...order, paid: true };
}

export function describeOrder(order: Order): string {
  const { id, customer, items } = order;
  return `Order ${id} for ${customer}: ${items} items`;
}
