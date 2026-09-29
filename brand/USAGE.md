# Flashy brand — usage rules for this directory

Canonical copy lives in **flashy-group/brand/**. Every other Flashy repo
vendors this directory verbatim and carries a drift test that hashes the
files against `MANIFEST.sha256`. To change anything: edit the canonical
copy, run `./sync.sh` to rewrite the manifest, and copy the directory into
each consuming repo in the same change. Never edit a vendored copy in place
— the drift test exists to catch exactly that.

Source of truth for the rules: the Flashy Brand & Press Kit, Rev 01,
published at flashygroup.com/flashy-brand-kit.

## The assignment table

| Property | Repo | Accent | Token | Suffix |
|---|---|---|---|---|
| Flashy Group (parent) | flashy-group | none — monochrome | — | — |
| Flashy OS | flashyos | Volt Mint `#12E29B` | `--flashy-mint` | `OS` lozenge |
| Flashy ID | flashyid | Signal Blue `#5B8CFF` | `--flashy-blue` | `ID` lozenge |
| Flashy Mind | (no UI yet) | Deep Violet `#B084FF` | `--flashy-violet` | word `MIND` |
| Flashy Academy | flashy-academy | Ember `#FF8A4C` | `--flashy-ember` | word `ACADEMY` |
| Flashy Gold | flashy-gold | Flashy Gold `#FFC93C` | `--flashy-gold` | word `GOLD` |
| Flashy Network | flashy-network | Wire Cyan `#3ED8F0` | `--flashy-cyan` | word `NETWORK` |
| Claim Your Gold | ClaimYour.Gold | **endorsed brand — do not rebrand** | — | — |

A property references its own accent as `--brand-accent` in its own
stylesheet (`--brand-accent: var(--flashy-cyan)`) and never another
property's accent directly.

## Hard rules (from the kit, enforced by review)

- Ink on Paper or Paper on Ink. An accent is never a page background,
  never a gradient, never two at once inside a lockup.
- The bolt is never redrawn, re-angled, outlined, rounded, or given a
  second colour. Use the SVGs in `assets/` as shipped. Min 14px tall.
- Clear space around the mark = half its height on all four sides.
- Archivo Black only at or above 40px; Plus Jakarta Sans below; JetBrains
  Mono for domains, tokens, tickers, addresses, timestamps, eyebrows.
- One motion gesture: strike (90ms, steps(2)) then settle (240ms). No
  rotation, no bounce, no morph. Always behind `prefers-reduced-motion`.
- **flashynetwork.com carve-out (Decision A, approved 2026-08-24):** the
  property chrome is Wire Cyan; `#FFC93C`-family gold remains available
  there strictly as the *data colour of the FG asset* (amounts, asset
  chips) — brand colour and data colour are different jobs.
- **Claim Your Gold** keeps its mascot identity unchanged. Its only brand
  touchpoint is an "A Flashy Group property" endorsement line.

## Fonts

Load through `next/font/google` (Archivo Black; Plus Jakarta Sans
400/500/600/700; JetBrains Mono 400/500). next/font downloads at build
time and serves the files from the site's own origin, which satisfies
flashy-network's `font-src 'self'` CSP — no font CDN at runtime anywhere.
