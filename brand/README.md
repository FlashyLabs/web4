# The Flashy brand kit — canonical copy

This directory is the source of the Flashy visual identity for every property
in the estate. Other repositories carry a **verbatim copy** of it and a test
that hashes the copy against the manifest it travels with. Nothing about the
identity is decided anywhere else.

`USAGE.md` holds the rules of the kit (accent assignments, the bolt, type,
motion). This file is about the mechanics: how a property takes the kit, what
it must copy, what pins it, and what it may never do to it.

## Taking the kit — one command

From the root of a consuming repository, with `flashy-group` checked out beside
it:

```bash
rm -rf brand && cp -R ../flashy-group/brand ./brand && (cd brand && sha256sum -c MANIFEST.sha256)
```

That is the whole vendoring step. It replaces the directory rather than merging
into it — a file the kit has retired must not survive downstream — and the
`sha256sum -c` at the end is the same check the drift test runs, so a copy that
would fail CI fails here first. `MANIFEST.sha256` lists paths relative to
`brand/`, which is why the check runs from inside it.

Re-vendor the same way whenever the canonical kit changes. There is no partial
update: the manifest covers every file, so taking one changed file and not the
manifest fails the test, and taking the manifest and not the file fails it too.

## What travels

Everything in this directory, byte-identical:

| Path | What it is |
|---|---|
| `tokens.css` | Every colour and type token, as CSS custom properties. Consumed as the variable block of a property's stylesheet |
| `assets/*.svg`, `assets/legacy-bolt.png` | The bolt in each permitted colour, the app icons, the avatars, one lockup per property |
| `USAGE.md` | The rules — accents, clear space, type scale, the one motion gesture |
| `MANIFEST.sha256` | A sha256 per file above, written by `sync.sh`, read by every drift test |
| `sync.sh` | Rewrites the manifest. **Run only here, in the canonical repository** |
| `README.md` | This file |

A property that needs only `tokens.css` still takes the whole directory. The
test is over the manifest, not over the files a property happens to use, and a
partial copy is a copy nobody can tell is current.

## What pins it

Each consuming repository carries one test that reads `brand/MANIFEST.sha256`,
recomputes the sha256 of every file it names, and fails on the first mismatch.
The same test, at the path each repository's suite expects:

| Repository | Test |
|---|---|
| flashy-group (canonical) | `tests/brand.test.ts` |
| flashy-network | `tests/brand.test.ts` |
| flashy-academy | `tests/brand.test.ts` |
| flashy-gold | `src/lib/brand.test.ts` |
| flashyid | `src/brand.test.ts` |

A new consumer copies any one of them, adjusts `BRAND_DIR` to point at its own
`brand/`, and is pinned.

**Be clear about what that test proves.** It proves the copy is internally
consistent — no file was edited without its manifest line, which is the edit
`USAGE.md` forbids and the one that forks the identity silently. It does **not**
prove the copy is *current*: a consumer holding last month's kit and last
month's manifest passes, because the two agree with each other. Currency is
established by re-vendoring, and by `tools/estate-hygiene.mjs` in flashyos where
it surveys vendored copies. A green brand test downstream means "unedited",
never "up to date".

## What must never change downstream

- **Any file the manifest names.** Not a token value, not a path in an SVG, not
  a line of `USAGE.md`. The test will fail, and it is right to.
- **The manifest itself.** Never run `sync.sh` in a consuming repository and
  never hand-edit `MANIFEST.sha256` there. A regenerated manifest downstream
  makes a local fork pass the drift test, which defeats the only check the kit
  has.
- **The bolt.** Not redrawn, re-angled, outlined, rounded, or given a second
  colour. Use the SVGs as shipped, at 14px or taller, with clear space of half
  its height on every side.
- **The accent assignment.** A property references its own accent as
  `--brand-accent: var(--flashy-<name>)` in its own stylesheet and never another
  property's accent directly. The table is in `USAGE.md`; the exceptions
  (flashynetwork.com's data-colour carve-out, Claim Your Gold's endorsed
  identity) are recorded there and nowhere else.
- **The token names.** A property adds its own variables in its own stylesheet.
  It does not add, rename or remove a `--flashy-*` token in the vendored
  `tokens.css`.

What a property *does* own is the stylesheet that consumes the tokens, the
`--brand-accent` line in it, and which of the assets it renders where. Those
are property decisions and live in the property.

## Changing the kit

1. Edit the canonical copy — this directory, in `flashy-group`.
2. Run `./sync.sh` from inside `brand/` to rewrite the manifest.
3. `npm test` here: `tests/brand.test.ts` recomputes every hash against the new
   manifest.
4. Re-vendor into each consuming repository with the one command above, in the
   same change where practical.

Any change to what a page renders ships in a commit that does **not** carry
`[skip ci]` or `[vercel skip]`.
