// Model answers for 01 — Basics. Try the exercises first!

export function fullName(first: string, last: string): string {
  return `${first} ${last}`;
}

export function orderUrl(baseUrl: string, orderId: number): string {
  return `${baseUrl}/orders/${orderId}`;
}

export function isBulkOrder(quantity: number): boolean {
  return quantity >= 50;
}

export function parcelLabel(items: number): string {
  if (items === 0) {
    return 'Nothing to ship';
  } else if (items < 5) {
    return 'Small parcel';
  }
  return 'Large parcel';
}

export function formatPrice(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}

export function normaliseEmail(email: string): string {
  return email.trim().toLowerCase();
}
