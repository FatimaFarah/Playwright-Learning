// 01 — Basics. Replace each `throw new Error('TODO ...')` with your answer.
// Run: npx playwright test 01

// 1. Join a first and last name with a space, e.g. ('Sam', 'Jones') -> 'Sam Jones'.
//    Use a template literal (backticks).
export function fullName(first: string, last: string): string {
  throw new Error('TODO: write fullName');
}

// 2. Build an order page URL, e.g. ('https://dev.example.com', 42) -> 'https://dev.example.com/orders/42'.
export function orderUrl(baseUrl: string, orderId: number): string {
  throw new Error('TODO: write orderUrl');
}

// 3. An order is "large" when it is 5000 litres or more.
export function isLargeOrder(litres: number): boolean {
  throw new Error('TODO: write isLargeOrder');
}

// 4. Return a label for a delivery:
//    0 litres            -> 'Nothing to deliver'
//    less than 1000      -> 'Small delivery'
//    1000 or more        -> 'Bulk delivery'
export function deliveryLabel(litres: number): string {
  throw new Error('TODO: write deliveryLabel');
}

// 5. Turn a price in pence into pounds text, e.g. 1250 -> '£12.50', 99 -> '£0.99'.
//    Hint: .toFixed(2)
export function formatPrice(pence: number): string {
  throw new Error('TODO: write formatPrice');
}

// 6. Tidy up an email someone typed: remove spaces at either end and make it lower case.
//    e.g. '  Sam.Jones@Example.COM ' -> 'sam.jones@example.com'
export function normaliseEmail(email: string): string {
  throw new Error('TODO: write normaliseEmail');
}
