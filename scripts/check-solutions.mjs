// Maintainer check: copies Phase 1 into .solutions-check/, swaps each exercises.ts for its
// model answer, then runs the tests and the type checker. Everything should pass.
import { cpSync, rmSync, writeFileSync, readdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const work = join(root, '.solutions-check');
const phase1 = join(work, 'Phase1-TypeScript');

rmSync(work, { recursive: true, force: true });
cpSync(join(root, 'Phase1-TypeScript'), phase1, { recursive: true });

for (const file of readdirSync(join(phase1, 'solutions'))) {
  const topic = file.replace(/\.ts$/, '');
  cpSync(join(phase1, 'solutions', file), join(phase1, topic, 'exercises.ts'));
}

writeFileSync(
  join(work, 'playwright.config.ts'),
  "import { defineConfig } from '@playwright/test';\n" +
    "export default defineConfig({ testDir: './Phase1-TypeScript', reporter: 'list' });\n"
);
writeFileSync(
  join(work, 'tsconfig.json'),
  JSON.stringify({ extends: '../tsconfig.json', include: ['**/*.ts'], exclude: [] }, null, 2)
);

const run = (cmd) => execSync(cmd, { cwd: root, stdio: 'inherit' });
run('npx playwright test --config=.solutions-check/playwright.config.ts');
run('npx tsc --noEmit -p .solutions-check/tsconfig.json');
console.log('\nAll model answers pass.');
