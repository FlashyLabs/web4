// The brand kit is vendored whole, and the lock is a test: every file matches
// its own MANIFEST.sha256, and the directory is byte-identical to canon
// (flashy-group/brand) when that checkout is beside this one — UNKNOWN, never
// passed, when it is not. node: builtins only, no install.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BRAND = join(ROOT, 'brand');
const CANON = join(ROOT, '..', 'flashy-group', 'brand');

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');
const walk = (dir) =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const relPosix = (base, p) => relative(base, p).split(sep).join('/');

test('every brand file matches MANIFEST.sha256', () => {
  const manifest = readFileSync(join(BRAND, 'MANIFEST.sha256'), 'utf8');
  const rows = manifest.trim().split('\n').map((l) => {
    const [hash, file] = l.trim().split(/\s+/);
    return { hash, file: file.replace(/^\.\//, '') };
  });
  assert.ok(rows.length >= 20, 'manifest looks truncated');
  for (const { hash, file } of rows) {
    const p = join(BRAND, file);
    assert.ok(existsSync(p), `manifest names ${file}, which is missing`);
    assert.equal(sha256(readFileSync(p)), hash, `${file} does not match its manifest hash`);
  }
  // And nothing shipped that the manifest does not cover (bar the manifest and sync.sh).
  const covered = new Set(rows.map((r) => r.file));
  for (const f of walk(BRAND)) {
    const rel = relPosix(BRAND, f);
    if (rel === 'MANIFEST.sha256' || rel === 'sync.sh') continue;
    assert.ok(covered.has(rel), `${rel} is in brand/ but not in the manifest`);
  }
});

test('the gold bolt and the outline the site fills are present', () => {
  assert.ok(existsSync(join(BRAND, 'assets', 'bolt-gold.svg')));
  assert.ok(existsSync(join(BRAND, 'assets', 'bolt-white.svg')));
  assert.ok(existsSync(join(BRAND, 'tokens.css')));
});

test('brand/ is byte-identical to canon flashy-group/brand (or UNKNOWN)', () => {
  if (!existsSync(CANON)) {
    console.log('UNKNOWN: flashy-group checkout is absent; cannot verify brand/ is current');
    return;
  }
  for (const f of walk(CANON)) {
    const rel = relPosix(CANON, f);
    const here = join(BRAND, rel);
    assert.ok(existsSync(here), `canon has ${rel}, which the vendored copy is missing`);
    assert.equal(
      readFileSync(here).toString('binary'),
      readFileSync(f).toString('binary'),
      `brand/${rel} has drifted from canon — re-vendor with sync.sh, never edit`,
    );
  }
});
