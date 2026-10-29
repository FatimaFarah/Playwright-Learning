export interface TestUser {
  username: string;
  password: string;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable "${name}". Copy .env.example to .env (see the README).`
    );
  }
  return value;
}

export const standardUser: TestUser = {
  get username() {
    return requireEnv('SAUCE_USERNAME');
  },
  get password() {
    return requireEnv('SAUCE_PASSWORD');
  },
};

export const lockedOutUser: TestUser = {
  get username() {
    return requireEnv('SAUCE_LOCKED_OUT_USERNAME');
  },
  get password() {
    return requireEnv('SAUCE_PASSWORD');
  },
};
