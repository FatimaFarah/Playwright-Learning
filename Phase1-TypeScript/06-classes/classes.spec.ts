// Don't edit this file — make these tests pass by editing exercises.ts.
import { test, expect } from '@playwright/test';
import { Customer, Basket, FakePage, LoginPage } from './exercises';

test.describe('06 Classes', () => {
  test('1. Customer stores its details and labels itself', () => {
    const sam = new Customer('Sam Jones', 'sam@example.com');
    expect(sam.name).toBe('Sam Jones');
    expect(sam.email).toBe('sam@example.com');
    expect(sam.label()).toBe('Sam Jones <sam@example.com>');
  });

  test('2. Basket starts empty', () => {
    const basket = new Basket();
    expect(basket.isEmpty()).toBe(true);
    expect(basket.count).toBe(0);
  });

  test('2. Basket counts the total quantity', () => {
    const basket = new Basket();
    basket.add('Backpack', 2);
    basket.add('T-Shirt', 3);
    expect(basket.isEmpty()).toBe(false);
    expect(basket.count).toBe(5);
  });

  test('3. LoginPage fills the form and signs in, in that order', async () => {
    const page = new FakePage();
    const loginPage = new LoginPage(page);

    await loginPage.login('qa@example.com', 'secret');

    expect(page.history).toEqual([
      'fill Email address: qa@example.com',
      'fill Password: secret',
      'click Sign In',
    ]);
  });

  test('3. LoginPage exposes its locators', () => {
    const loginPage = new LoginPage(new FakePage());
    expect(loginPage.emailInput).toBeDefined();
    expect(loginPage.passwordInput).toBeDefined();
    expect(loginPage.signInButton).toBeDefined();
  });
});
