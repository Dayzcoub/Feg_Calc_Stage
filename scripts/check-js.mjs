import { spawnSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const root = process.cwd();
const ignoredDirs = new Set(['.git', 'node_modules', 'playwright-report', 'test-results']);
const files = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (ignoredDirs.has(entry)) continue;
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (extname(entry) === '.js' || extname(entry) === '.mjs') {
      files.push(fullPath);
    }
  }
}

walk(root);

const failures = [];
for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], {
    cwd: root,
    encoding: 'utf8'
  });
  if (result.status !== 0) {
    failures.push({
      file,
      output: `${result.stdout || ''}${result.stderr || ''}`.trim()
    });
  }
}

if (failures.length) {
  console.error(`JS syntax check failed for ${failures.length} file(s):`);
  for (const failure of failures) {
    console.error(`\n${failure.file}`);
    console.error(failure.output);
  }
  process.exit(1);
}

console.log(`JS syntax OK (${files.length} files)`);
