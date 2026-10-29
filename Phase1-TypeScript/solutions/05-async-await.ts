// Model answers for 05 — async and await. Try the exercises first!

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
    await wait(50 - this.items.length * 10);
    this.items.push(item);
  }

  async submit(): Promise<void> {
    await wait(20);
    this.status = 'submitted';
  }
}

export async function shoutCustomerName(): Promise<string> {
  const name = await loadCustomerName();
  return name.toUpperCase();
}

export async function addTwoItems(
  basket: FakeBasket,
  first: string,
  second: string
): Promise<void> {
  await basket.addItem(first);
  await basket.addItem(second);
}

export async function placeOrder(basket: FakeBasket): Promise<string> {
  // The bug: submit() returns a Promise, and without await we read the status before it changes.
  await basket.submit();
  return basket.status;
}

export async function customerSummary(): Promise<string> {
  const [name, count] = await Promise.all([loadCustomerName(), loadOrderCount()]);
  return `${name} has ${count} orders`;
}

export async function addAllItems(basket: FakeBasket, items: string[]): Promise<void> {
  // The bug: forEach doesn't wait for async callbacks, so the function returned before any item
  // was added. for...of with await adds them one at a time.
  for (const item of items) {
    await basket.addItem(item);
  }
}
