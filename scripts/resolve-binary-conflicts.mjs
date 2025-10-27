#!/usr/bin/env node
import { execSync } from 'node:child_process';

function run(command) {
  try {
    return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }).trim();
  } catch (error) {
    if (error.status !== undefined) {
      throw new Error(`Command failed: ${command}`);
    }
    throw error;
  }
}

function hasBinaryAttribute(path) {
  try {
    const attrs = run(`git check-attr --all -- '${path}'`);
    return attrs.split('\n').some((line) => line.includes('binary: set'));
  } catch (error) {
    console.error(`Failed to inspect attributes for ${path}:`, error.message);
    return false;
  }
}

const conflictsRaw = run('git diff --name-only --diff-filter=U');
if (!conflictsRaw) {
  console.log('No merge conflicts detected.');
  process.exit(0);
}

const conflicts = conflictsRaw.split('\n').filter(Boolean);
const resolved = [];

for (const file of conflicts) {
  if (!hasBinaryAttribute(file)) {
    console.log(`Skipping ${file} (not marked as binary). Resolve manually.`);
    continue;
  }

  execSync(`git checkout --ours -- '${file}'`, { stdio: 'inherit' });
  execSync(`git add -- '${file}'`, { stdio: 'inherit' });
  resolved.push(file);
}

if (resolved.length === 0) {
  console.log('No binary conflicts were auto-resolved. Check the remaining files manually.');
  process.exit(1);
}

console.log('\nResolved binary conflicts (kept current branch version):');
for (const file of resolved) {
  console.log(`- ${file}`);
}

console.log('\nNext steps:');
console.log('  git commit -m "Resolve binary merge conflicts"');
console.log('  npm run check:binaries');
