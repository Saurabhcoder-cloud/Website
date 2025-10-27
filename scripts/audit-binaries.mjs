#!/usr/bin/env node
import { execSync } from 'node:child_process';

const binaryExtensions = new Set([
  'png',
  'jpg',
  'jpeg',
  'gif',
  'bmp',
  'webp',
  'ico',
  'pdf',
  'zip',
  'gz',
  'tgz',
  'bz2',
  '7z',
  'rar',
  'exe',
  'dll',
  'mp4',
  'mov',
  'avi',
  'mp3',
  'wav',
  'flac',
  'psd',
  'ai',
  'eps',
  'ttf',
  'otf',
  'woff',
  'woff2'
]);

function run(command) {
  return execSync(command, { encoding: 'utf8' }).trim();
}

const revListOutput = run('git rev-list --objects HEAD');
const trackedFilesOutput = run('git ls-tree -r HEAD --name-only');

const trackedFiles = new Set(
  trackedFilesOutput
    .split('\n')
    .filter(Boolean)
);

const candidates = revListOutput
  .split('\n')
  .map((line) => {
    const [sha, ...pathParts] = line.split(/\s+/);
    const path = pathParts.join(' ');
    if (!path) return null;
    const ext = path.includes('.') ? path.split('.').pop().toLowerCase() : '';
    if (!binaryExtensions.has(ext)) return null;
    return { sha, path };
  })
  .filter(Boolean);

if (candidates.length === 0) {
  console.log('No binary assets detected in the current branch history.');
  process.exit(0);
}

const uniqueCandidates = new Map();
for (const candidate of candidates) {
  if (!uniqueCandidates.has(candidate.path)) {
    uniqueCandidates.set(candidate.path, candidate);
  }
}

console.log('Binary assets detected (including historical commits):\n');
for (const { path, sha } of uniqueCandidates.values()) {
  let size = 'unknown';
  try {
    size = run(`git cat-file -s ${sha}`);
  } catch {
    // ignore lookup issues
  }
  const status = trackedFiles.has(path) ? 'present in HEAD' : 'only in history';
  console.log(`- ${path} (sha: ${sha}, ${size} bytes, ${status})`);
}

if ([...uniqueCandidates.values()].some(({ path }) => trackedFiles.has(path))) {
  console.log('\n⚠️  Remove the files listed as "present in HEAD" before pushing.');
  process.exitCode = 1;
} else {
  console.log('\nℹ️  No binary assets are tracked in the current HEAD. Consider rewriting history if you need to purge historical binaries.');
}
