// Model answers for 01 — Basics. Try the exercises first!

export function fullName(first: string, last: string): string {
  return `${first} ${last}`;
}

export function orderUrl(baseUrl: string, orderId: number): string {
  return `${baseUrl}/orders/${orderId}`;
}

export function isLargeOrder(litres: number): boolean {
  return litres >= 5000;
}

export function deliveryLabel(litres: number): string {
  if (litres === 0) {
    return 'Nothing to deliver';
  } else if (litres < 1000) {
    return 'Small delivery';
  }
  return 'Bulk delivery';
}

export function formatPrice(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}

export function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}
