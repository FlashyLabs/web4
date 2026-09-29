// site.config.json is the contract the whole door is generated from, so its
// checker is held to its schema and to a set of failure shapes. node: builtins
// only, no install.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateConfig } from '../scripts/build-site.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const cfg = JSON.parse(read('site.config.json'));
const schema = JSON.parse(read('schema/site-config-1.json'));

const clone = () => JSON.parse(JSON.stringify(cfg));

test('the committed site.config.json validates', () => {
  const { valid, errors } = validateConfig(cfg);
  assert.ok(valid, `site.config.json is invalid: ${errors.map((e) => `${e.path} ${e.message}`).join('; ')}`);
});

test('the checker and the schema require the same top-level keys', () => {
  // The checker is the schema in code; the required set is the one place both
  // spell out, so a field added to one and not the other is caught here.
  const schemaRequired = [...schema.required].sort();
  const bad = clone();
  delete bad.property;
  const { valid } = validateConfig(bad);
  assert.equal(valid, false, 'the checker did not refuse a config missing a required key');
  // Every required key, dropped, must fail the checker.
  for (const k of schemaRequired) {
    const c = clone();
    delete c[k];
    assert.equal(validateConfig(c).valid, false, `dropping "${k}" should fail validation`);
  }
});

test('the config document declares site-config/1 as its schema id', () => {
  assert.ok(schema.$id.endsWith('site-config-1.json'));
  assert.equal(schema.title.startsWith('site-config/1'), true);
});

test('invalid configs are refused, each for its own reason', () => {
  const cases = [
    ['unknown key', (c) => (c.surprise = true)],
    ['bad accent notation', (c) => (c.accent = '#FFC93C')],
    ['accent not a flashy token', (c) => (c.accent = '--brand-accent')],
    ['domain is a URL not a host', (c) => (c.domain = 'https://web4.dev')],
    ['empty refusals', (c) => (c.refusals = [])],
    ['refusal missing body', (c) => (c.refusals[0] = { title: 'x' })],
    ['empty faq', (c) => (c.faq = [])],
    ['faq missing answer', (c) => (c.faq[0] = { q: 'x' })],
    ['contract without version', (c) => (c.contract = 'web4')],
    ['links missing repo', (c) => delete c.links.repo],
    ['link not https', (c) => (c.links.hub = 'http://x.dev')],
  ];
  for (const [name, mutate] of cases) {
    const c = clone();
    mutate(c);
    assert.equal(validateConfig(c).valid, false, `should have refused: ${name}`);
  }
});

test('domain: null is accepted (the property has no domain yet)', () => {
  const c = clone();
  c.domain = null;
  assert.equal(validateConfig(c).valid, true);
  c.domain = 'web4.dev';
  assert.equal(validateConfig(c).valid, true);
});
