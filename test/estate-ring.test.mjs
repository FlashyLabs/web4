// The footer's estate ring is a vendored copy of flashyos's live estate ring.
// It is pinned against that source when the sibling checkout is beside this one,
// and reported UNKNOWN — never passed — when it is not. node: builtins only.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const RING = JSON.parse(readFileSync(join(ROOT, 'estate-ring.json'), 'utf8'));
const SRC = join(ROOT, '..', 'flashyos', 'apps', 'marketing', 'src', 'lib', 'estateRing.ts');

/** Parse the ESTATE_RING array literal out of the TypeScript source. */
function parseSource(ts) {
  const start = ts.indexOf('ESTATE_RING');
  const open = ts.indexOf('[', start);
  const close = ts.indexOf('] as const', open);
  const body = ts.slice(open + 1, close);
  const re = /\{\s*domain:\s*'([^']+)',\s*name:\s*'([^']+)',\s*role:\s*'((?:[^'\\]|\\.)*)',\s*vertical:\s*'([^']+)'\s*\}/g;
  const rows = [];
  let m;
  while ((m = re.exec(body))) {
    rows.push({ domain: m[1], name: m[2], role: m[3].replace(/\\(.)/g, '$1'), vertical: m[4] });
  }
  return rows;
}

test('the ring has properties, each with a unique domain', () => {
  assert.ok(Array.isArray(RING.properties) && RING.properties.length > 0);
  const domains = RING.properties.map((p) => p.domain);
  assert.equal(new Set(domains).size, domains.length, 'a domain is listed twice');
  for (const p of RING.properties) {
    assert.ok(p.domain && p.name && p.role && p.vertical, `an entry is missing a field: ${JSON.stringify(p)}`);
  }
});

test('estate-ring.json matches flashyos estateRing.ts (or UNKNOWN)', () => {
  if (!existsSync(SRC)) {
    console.log('UNKNOWN: flashyos checkout is absent; cannot verify the estate ring is current');
    return;
  }
  const source = parseSource(readFileSync(SRC, 'utf8'));
  assert.ok(source.length > 0, 'could not parse ESTATE_RING from the source');
  assert.deepEqual(RING.properties, source, 'estate-ring.json has drifted from estateRing.ts — re-vendor');
});
