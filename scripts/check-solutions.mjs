// Maintainer check: copies both phases into .solutions-check/, swaps every exercise for its model
// answer, then runs the tests, the type checker and lint. Everything should pass.
// Phase 2 runs against the live practice sites, so it needs an internet connection.
import { cpSync, rmSync, writeFileSync, readdirSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const work = join(root, '.solutions-check');
const phase1 = join(work, 'Phase1-TypeScript');
const phase2 = join(work, 'Phase2-Playwright');

rmSync(work, { recursive: true, force: true });
cpSync(join(root, 'Phase1-TypeScript'), phase1, { recursive: true });
cpSync(join(root, 'Phase2-Playwright'), phase2, {
  recursive: true,
  filter: (src) => !src.includes('.auth'),
});

// Phase 1: solutions/<topic>.ts replaces <topic>/exercises.ts.
for (const file of readdirSync(join(phase1, 'solutions'))) {
  const topic = file.replace(/\.ts$/, '');
  cpSync(join(phase1, 'solutions', file), join(phase1, topic, 'exercises.ts'));
}

// Phase 2: solutions/ mirrors the folders, so each file replaces the one at the same path.
cpSync(join(phase2, 'solutions'), phase2, { recursive: true });

writeFileSync(
  join(work, 'playwright.config.ts'),
  `import { defineConfig } from '@playwright/test';
import { phase2Projects } from './Phase2-Playwright/projects';
export default defineConfig({
  reporter: 'list',
  projects: [{ name: 'phase1', testDir: './Phase1-TypeScript' }, ...phase2Projects],
});
`
);
writeFileSync(
  join(work, 'tsconfig.json'),
  JSON.stringify({ extends: '../tsconfig.json', include: ['**/*.ts'], exclude: [] }, null, 2)
);

// The practice logins are public, so the example file doubles as the real settings here.
const env = { ...process.env };
for (const line of readFileSync(join(root, '.env.example'), 'utf8').split(/\r?\n/)) {
  const match = line.match(/^([A-Z_]+)=(.*)$/);
  if (match) env[match[1]] = match[2];
}

const run = (cmd) => execSync(cmd, { cwd: root, stdio: 'inherit', env });
run('npx playwright test --config=.solutions-check/playwright.config.ts');
run('npx tsc --noEmit -p .solutions-check/tsconfig.json');
run('npx eslint .solutions-check/Phase2-Playwright');
console.log('\nAll model answers pass.');
