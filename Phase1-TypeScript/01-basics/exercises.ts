// 01 — Basics. Fill in each function marked TODO.
// Run: npx playwright test 01

// 1. Join a first and last name with a space, e.g. ('Sam', 'Jones') -> 'Sam Jones'.
//    Use a template literal (backticks).
export function fullName(first: string, last: string): string {
  // TODO: write your code here
}

// 2. Build an order page URL, e.g. ('https://shop.example.com', 42) -> 'https://shop.example.com/orders/42'.
export function orderUrl(baseUrl: string, orderId: number): string {
  // TODO: write your code here
}

// 3. An order is a "bulk" order when it has 50 or more items.
export function isBulkOrder(quantity: number): boolean {
  // TODO: write your code here
}

// 4. Return a label for a parcel:
//    0 items             -> 'Nothing to ship'
//    fewer than 5        -> 'Small parcel'
//    5 or more           -> 'Large parcel'
export function parcelLabel(items: number): string {
  // TODO: write your code here
}

// 5. Turn a price in pence into pounds text, e.g. 1250 -> '£12.50', 99 -> '£0.99'.
//    Hint: .toFixed(2)
export function formatPrice(pence: number): string {
  // TODO: write your code here
}

// 6. Tidy up an email someone typed: remove spaces at either end and make it lower case.
//    e.g. '  Sam.Jones@Example.COM ' -> 'sam.jones@example.com'
export function normaliseEmail(email: string): string {
  // TODO: write your code here
}
