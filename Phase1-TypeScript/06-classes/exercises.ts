// 06 — Classes. Fill in each class where it says TODO.
// Run: npx playwright test 06

// 1. A Customer has a readonly `name` and `email`, set in the constructor,
//    and a label() method returning e.g. 'Sam Jones <sam@example.com>'.
export class Customer {
  constructor(name: string, email: string) {
    // TODO: write your code here
  }

  label(): string {
    // TODO: write your code here
  }
}

// 2. A Basket keeps a PRIVATE list of { product, quantity } lines.
//    - add(product, quantity) adds a line
//    - the `count` getter returns the total quantity across all lines
//    - isEmpty() returns true when there are no lines
export class Basket {
  add(product: string, quantity: number): void {
    // TODO: write your code here
  }

  get count(): number {
    // TODO: write your code here
  }

  isEmpty(): boolean {
    // TODO: write your code here
  }
}

// ---- Given for exercise 3 — don't change this. A pretend browser page that records what you do. ----

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

// 3. Write a page object in the same shape as the lesson's SearchPage.
//    - constructor(page) stores the page, and sets up three readonly locators:
//        emailInput     = page.getByLabel('Email address')
//        passwordInput  = page.getByLabel('Password')
//        signInButton   = page.getByLabel('Sign In')
//    - async login(email, password) fills the email, then the password, then clicks Sign In.
export class LoginPage {
  constructor(page: FakePage) {
    // TODO: write your code here
  }

  async login(email: string, password: string): Promise<void> {
    // TODO: write your code here
  }
}
