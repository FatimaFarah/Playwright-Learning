// Model answers for 06 — Classes. Try the exercises first!

export class Customer {
  readonly name: string;
  readonly email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  label(): string {
    return `${this.name} <${this.email}>`;
  }
}

interface BasketLine {
  product: string;
  quantity: number;
}

export class Basket {
  private lines: BasketLine[] = [];

  add(product: string, quantity: number): void {
    this.lines.push({ product, quantity });
  }

  get count(): number {
    let total = 0;
    for (const line of this.lines) {
      total = total + line.quantity;
    }
    return total;
  }

  isEmpty(): boolean {
    return this.lines.length === 0;
  }
}

export class FakeLocator {
  constructor(
    private readonly name: string,
    private readonly history: string[]
  ) {}

  async fill(value: string): Promise<void> {
    this.history.push(`fill ${this.name}: ${value}`);
  }

  async click(): Promise<void> {
    this.history.push(`click ${this.name}`);
  }
}

export class FakePage {
  readonly history: string[] = [];

  getByLabel(name: string): FakeLocator {
    return new FakeLocator(name, this.history);
  }
}

export class LoginPage {
  readonly page: FakePage;
  readonly emailInput: FakeLocator;
  readonly passwordInput: FakeLocator;
  readonly signInButton: FakeLocator;

  constructor(page: FakePage) {
    this.page = page;
    this.emailInput = page.getByLabel('Email address');
    this.passwordInput = page.getByLabel('Password');
    this.signInButton = page.getByLabel('Sign In');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}
