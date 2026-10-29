// 07 — Modules and errors. Replace each `throw new Error('TODO ...')` with your answer.
// Run: npx playwright test 07

// 1. The spec file imports BASE_URL, but it can't see it yet. Fix that.
const BASE_URL = 'https://www.saucedemo.com';

// 2. Return the environment variable called `name`. If it isn't set (or is empty), throw:
//    Missing required environment variable "NAME_HERE".
export function requireEnv(name: string): string {
  throw new Error('TODO: write requireEnv');
}

// 3. Turn JSON text into a value. If the text isn't valid JSON, return undefined instead
//    of throwing. Hint: JSON.parse throws on bad input, so use try/catch.
export function safeParseJson(text: string): unknown {
  throw new Error('TODO: write safeParseJson');
}

// 4. A tiny test runner! Call `body`. If it finishes, return 'PASS: <title>'.
//    If it throws, return 'FAIL: <title> - <the error message>'.
export function runCheck(title: string, body: () => void): string {
  throw new Error('TODO: write runCheck');
}

// 5. Like the lesson's testUser: a user whose details come from the environment
//    variables PRACTICE_USERNAME and PRACTICE_PASSWORD, read with requireEnv.
//    Use getters (`get username() { ... }`) so nothing is read until it's used.
export interface TestUser {
  username: string;
  password: string;
}

export const practiceUser: TestUser = {
  username: 'TODO',
  password: 'TODO',
};
