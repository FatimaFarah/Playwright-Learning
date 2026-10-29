// Model answers for 07 — Modules and errors. Try the exercises first!

export const BASE_URL = 'https://www.saucedemo.com';

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable "${name}".`);
  }
  return value;
}

export function safeParseJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

export function runCheck(title: string, body: () => void): string {
  try {
    body();
    return `PASS: ${title}`;
  } catch (error) {
    return `FAIL: ${title} - ${(error as Error).message}`;
  }
}

export interface TestUser {
  username: string;
  password: string;
}

export const practiceUser: TestUser = {
  get username() {
    return requireEnv('PRACTICE_USERNAME');
  },
  get password() {
    return requireEnv('PRACTICE_PASSWORD');
  },
};
