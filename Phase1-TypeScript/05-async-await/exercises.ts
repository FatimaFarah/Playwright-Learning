// 05 — async and await. Replace each `throw new Error('TODO ...')`, and fix the two bugs.
// Run: npx playwright test 05

// ---- Given — don't change this section. It pretends to be a slow website. ----

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function loadCustomerName(): Promise<string> {
  await wait(20);
  return 'Acme Fuels';
}

export async function loadOrderCount(): Promise<number> {
  await wait(20);
  return 3;
}

export class FakeBasket {
  status = 'open';
  items: string[] = [];

  async addItem(item: string): Promise<void> {
    // Earlier items take longer, so items added without waiting end up in the wrong order.
    await wait(50 - this.items.length * 10);
    this.items.push(item);
  }

  async submit(): Promise<void> {
    await wait(20);
    this.status = 'submitted';
  }
}

// ---- Exercises ----

// 1. Load the customer name and return it in capitals, e.g. 'ACME FUELS'.
export async function shoutCustomerName(): Promise<string> {
  throw new Error('TODO: write shoutCustomerName');
}

// 2. Add `first` to the basket, THEN `second`, waiting for each.
export async function addTwoItems(
  basket: FakeBasket,
  first: string,
  second: string
): Promise<void> {
  throw new Error('TODO: write addTwoItems');
}

// 3. FIND THE BUG: this should submit the basket and return its status, 'submitted'.
export async function placeOrder(basket: FakeBasket): Promise<string> {
  basket.submit();
  return basket.status;
}

// 4. Load the customer name and the order count AT THE SAME TIME, and return
//    e.g. 'Acme Fuels has 3 orders'. Hint: Promise.all
export async function customerSummary(): Promise<string> {
  throw new Error('TODO: write customerSummary');
}

// 5. FIND THE BUG: this should add every item, in order, before returning.
export async function addAllItems(basket: FakeBasket, items: string[]): Promise<void> {
  items.forEach(async (item) => {
    await basket.addItem(item);
  });
}
