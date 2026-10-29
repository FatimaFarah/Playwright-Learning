// Model answers for 04 — Types. Try the exercises first!

export interface TestUser {
  username: string;
  password: string;
  displayName?: string;
}

export function welcomeMessage(user: TestUser): string {
  return `Welcome, ${user.displayName ?? user.username}`;
}

export type Product = 'ordering' | 'routing' | 'reporting';

export function productName(product: Product): string {
  switch (product) {
    case 'ordering':
      return 'Online Ordering';
    case 'routing':
      return 'Route Planner';
    case 'reporting':
      return 'Reports';
  }
}

export function parseLitres(input: string): number | undefined {
  if (input === '') {
    return undefined;
  }
  const litres = Number(input);
  return Number.isNaN(litres) ? undefined : litres;
}

export type DeliveryStatus = 'pending' | 'out-for-delivery' | 'delivered';

export function nextStatus(status: DeliveryStatus): DeliveryStatus {
  if (status === 'pending') {
    return 'out-for-delivery';
  }
  return 'delivered';
}
