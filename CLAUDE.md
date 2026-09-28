# web4 — the human front door to the stack

A hub, not code. This repository holds the map of the Web 4 stack (`README.md`, `stack.md`, `ARCHITECTURE.md`), the estate's doctrine (`docs/`), and the rule for how a protocol joins (`docs/joining.md`). It holds no protocol code, no checker, no surface of its own.

## What makes this repository different

**The map is the product.** Nothing here runs; everything here is read. A change to this repository is a change to what a stranger believes the estate has built, so the bar for a sentence is the bar other repositories hold for a line of code.

**Statuses are honest and per-repo.** Every row in the stack table carries the status of that repo on the date in the README's status line — `draft`, `private`, `private-intended` or `planned`. No repo on the map is public or launched today, and the map never says one is until the estate licence register in flashyos has opened it and an independent adopter is named (`docs/joining.md`). "Nearly" is not a status. When a status moves, change the date on the status line in the same commit.

**The machine twin is stack.json, and it lives elsewhere.** `FlashyLabs/stack.json`, served at `/.well-known/stack.json`, is the machine-readable form of the table. This repository links to it and renders the human table; it does not duplicate that file's data beyond the table, and it never grows a second JSON copy. When the two disagree, one of them is stale, and a map correction is filed against that one.

**Repo names are a test, not a habit.** `test/links.test.mjs` holds the single allowlist of every repository the map names, checks every `github.com/FlashyLabs/<name>` link and every backticked repo token in `README.md` and `stack.md` against it, and checks the README ends on the exact licence line. Adding a repo to the map means adding it to the allowlist in the same commit; a typo fails `npm test`.

**No fabricated numbers.** No adoption claims, no counts of organisations or agents, no "millions". A figure appears here only when a named repository measures it and this file can say which.

## Commands

```bash
npm test    # node --test "test/**/*.test.mjs" — dependency-free, Node 22, no install step
```

There is no build. There is no dependency. `package.json` has no `dependencies` key and must stay that way.

## Editing the map

- A new layer or repo: add the row to `README.md` and `stack.md`, the depth to `ARCHITECTURE.md`, the name to the allowlist in `test/links.test.mjs`, and bump the date on the status line. Then file the same change against `FlashyLabs/stack.json`.
- A status change: same date bump, same twin update. Never `public` or `launched` unless the register and the adopter exist.
- A correction: `.github/ISSUE_TEMPLATE/map_correction.md` is the form. It asks what the map says, what is true, and how you know.

## House rules — true in every repository in this estate

**`main` is not necessarily the default branch.** Ask, every time: `git symbolic-ref --short refs/remotes/origin/HEAD`.

**Say which branch you measured.** Reading the working tree tells you about your checkout, not the repository.

**Re-vendor before you trust a vendored change.** Files named `vendor-*.mjs` are byte-identical copies; a stale copy disagrees silently.

**No secret in a file, a repo, or an artifact.** Secret Manager only.

**The licence is declared once**, in `tools/estate-licences.mjs` in flashyos. Do not decide this repository's licence inside it.

**A generated file is regenerated, never hand-edited.**

**Report what happened, including when it is worse than expected.**
