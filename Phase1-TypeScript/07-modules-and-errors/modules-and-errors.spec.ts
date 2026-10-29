// Don't edit this file — make these tests pass by editing exercises.ts.
import { test, expect } from '@playwright/test';
import { BASE_URL, requireEnv, safeParseJson, runCheck, practiceUser } from './exercises';

test.describe('07 Modules and errors', () => {
  test.afterEach(() => {
    delete process.env.PRACTICE_USERNAME;
    delete process.env.PRACTICE_PASSWORD;
    delete process.env.LEARNING_EXAMPLE;
  });

  test('1. BASE_URL is exported', () => {
    expect(BASE_URL).toBe('https://www.saucedemo.com');
  });

  test('2. requireEnv returns a variable that is set', () => {
    process.env.LEARNING_EXAMPLE = 'hello';
    expect(requireEnv('LEARNING_EXAMPLE')).toBe('hello');
  });

  test('2. requireEnv throws a helpful error when it is missing', () => {
    expect(() => requireEnv('LEARNING_EXAMPLE')).toThrow(
      'Missing required environment variable "LEARNING_EXAMPLE".'
    );
  });

  test('3. safeParseJson parses good JSON and returns undefined for bad JSON', () => {
    expect(safeParseJson('{"items": 3}')).toEqual({ items: 3 });
    expect(safeParseJson('[1, 2]')).toEqual([1, 2]);
    expect(safeParseJson('not json')).toBeUndefined();
  });

  test('4. runCheck reports a pass', () => {
    expect(runCheck('adds up', () => {})).toBe('PASS: adds up');
  });

  test('4. runCheck reports a failure with its message', () => {
    const body = () => {
      throw new Error('expected 2 but got 3');
    };
    expect(runCheck('adds up', body)).toBe('FAIL: adds up - expected 2 but got 3');
  });

  test('5. practiceUser reads the environment when used', () => {
    process.env.PRACTICE_USERNAME = 'qa@example.com';
    process.env.PRACTICE_PASSWORD = 'secret';
    expect(practiceUser.username).toBe('qa@example.com');
    expect(practiceUser.password).toBe('secret');
  });

  test('5. practiceUser throws when its variables are missing', () => {
    expect(() => practiceUser.username).toThrow('PRACTICE_USERNAME');
    expect(() => practiceUser.password).toThrow('PRACTICE_PASSWORD');
  });
});
