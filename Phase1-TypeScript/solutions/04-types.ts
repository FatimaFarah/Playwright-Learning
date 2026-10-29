// Model answers for 04 — Types. Try the exercises first!

export interface TestUser {
  username: string;
  password: string;
  displayName?: string;
}

export function welcomeMessage(user: TestUser): string {
  return `Welcome, ${user.displayName ?? user.username}`;
}

export type Product = 'books' | 'games' | 'music';

export function productName(product: Product): string {
  switch (product) {
    case 'books':
      return 'Books';
    case 'games':
      return 'Video Games';
    case 'music':
      return 'Music';
  }
}

export function parseQuantity(input: string): number | undefined {
  if (input === '') {
    return undefined;
  }
  const quantity = Number(input);
  return Number.isNaN(quantity) ? undefined : quantity;
}

export type DeliveryStatus = 'pending' | 'out-for-delivery' | 'delivered';

export function nextStatus(status: DeliveryStatus): DeliveryStatus {
  if (status === 'pending') {
    return 'out-for-delivery';
  }
  return 'delivered';
}
