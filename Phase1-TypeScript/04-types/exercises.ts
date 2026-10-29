// 04 — Types. Replace each `throw new Error('TODO ...')` with your answer.
// Run: npx playwright test 04   and   npm run typecheck

// 1. The tests create users with a `displayName`, but this interface doesn't allow one yet,
//    so typecheck complains. Add an OPTIONAL displayName string to the interface.
//    Then write welcomeMessage: use the displayName if there is one, otherwise the username.
//    Hint: ??
export interface TestUser {
  username: string;
  password: string;
}

export function welcomeMessage(user: TestUser): string {
  throw new Error('TODO: write welcomeMessage');
}

// 2. Give each shop section its display name using a switch:
//    'books' -> 'Books'   'games' -> 'Video Games'   'music' -> 'Music'
export type Product = 'books' | 'games' | 'music';

export function productName(product: Product): string {
  throw new Error('TODO: write productName');
}

// 3. Turn text from an input box into a number of items.
//    '500' -> 500   'abc' -> undefined   '' -> undefined
//    Hint: Number('abc') gives NaN; check with Number.isNaN(). Number('') gives 0, so check for '' first.
export function parseQuantity(input: string): number | undefined {
  throw new Error('TODO: write parseQuantity');
}

// 4. Fill in the type below so a delivery can only be 'pending', 'out-for-delivery' or 'delivered'
//    (replace `string`; typecheck stops complaining once it's right), then write nextStatus:
//    'pending' -> 'out-for-delivery'   'out-for-delivery' -> 'delivered'   'delivered' -> 'delivered'
export type DeliveryStatus = string;

export function nextStatus(status: DeliveryStatus): DeliveryStatus {
  throw new Error('TODO: write nextStatus');
}
