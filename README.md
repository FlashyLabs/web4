# Web 4 — start here

Web 4 is the agentic internet: a stack of open protocols through which software agents discover, identify, authorize, trust, transact with and audit one another, built by the Flashy / Gord estate — and this repository is its human front door, for anyone (engineer, counterparty, contributor, or the estate's own agents) who needs the whole thing legible in ninety seconds.

It holds no protocol code. It holds the map, the architecture, the principles, and the rule for how a new protocol joins. The machine-readable twin is [stack.json](https://github.com/FlashyLabs/stack.json), served at `/.well-known/stack.json`; this page renders the human table and links out, and never duplicates that file's data.

## The stack

The estate is roughly seven protocol businesses plus a universal graph, layered so one query travels the whole stack. Each layer answers one question. The standalone reference, with the invariant each layer enforces, is [stack.md](stack.md); the depth is [ARCHITECTURE.md](ARCHITECTURE.md).

| # | Layer | Question | Repos | Contract | Status |
|---|---|---|---|---|---|
| 1 | Identity | Who are you? | spec [flashyid-spec](https://github.com/FlashyLabs/flashyid-spec); implementation [flashyid](https://github.com/FlashyLabs/flashyid) | `delegation/1` | spec draft; implementation private |
| 2 | Graph | What exists? | [agentgraph](https://github.com/FlashyLabs/agentgraph), built out from the [therealm](https://github.com/FlashyLabs/therealm) `realm/1` registry | `graph/1` | draft |
| 3 | Discovery | Who can accomplish this intent? | spec [intent-spec](https://github.com/FlashyLabs/intent-spec), extracted from the live implementation [intentmesh](https://github.com/FlashyLabs/intentmesh) | `intent/1` | spec draft; implementation private |
| 4 | Trust | Should I deal with you? | routing [magician](https://github.com/FlashyLabs/magician); standing [Rites-Network](https://github.com/FlashyLabs/Rites-Network); portable attestation TrustGraph | `trust/1`, `ritual/1` | routing private; standing private; TrustGraph planned, not yet a repo |
| 5 | Gateway | How do I connect to the old web? | open specs [agent-wellknown](https://github.com/FlashyLabs/agent-wellknown) and [agent-dns](https://github.com/FlashyLabs/agent-dns); commercial service [bastion](https://github.com/FlashyLabs/bastion) | `agent/1`, `agent-dns/1` | specs draft; service private-intended |
| 6 | Representation | How is the org shown to machines? | [aao](https://github.com/FlashyLabs/aao) — the AAO manifest and seven-question conformance | `aao/0.1` | private |
| 7 | Execution | How does it operate? | [flashyos](https://github.com/FlashyLabs/flashyos), with [flashyos-spec](https://github.com/FlashyLabs/flashyos-spec), [flashyos-tools](https://github.com/FlashyLabs/flashyos-tools), [agentfile](https://github.com/FlashyLabs/agentfile) | `flashyos/1` | private |
| 8 | Commerce | How does value move? | spec [agentpay](https://github.com/FlashyLabs/agentpay) over the wallet stack [flashyos-wdk](https://github.com/FlashyLabs/flashyos-wdk) and the rails [flashy-rails](https://github.com/FlashyLabs/flashy-rails), [flashy-ledger](https://github.com/FlashyLabs/flashy-ledger), [flashy-contracts](https://github.com/FlashyLabs/flashy-contracts) | `pay-policy/1` | spec draft; wallet and rails private |
| 9 | Audit | What happened? | AgentLedger, generalizing the sealed-receipt pattern of [chronicle](https://github.com/FlashyLabs/chronicle); consumer is the notary log in [flashy-network](https://github.com/FlashyLabs/flashy-network) | `action-ledger/1` | planned |

**Spanning the layers:** [conformance-kit](https://github.com/FlashyLabs/conformance-kit) (conformance runner), [mesh-lint](https://github.com/FlashyLabs/mesh-lint) (interop lint), [flashy-infra](https://github.com/FlashyLabs/flashy-infra) (shared reusable CI). **Teaching:** [flashy-docs](https://github.com/FlashyLabs/flashy-docs), [flashy-examples](https://github.com/FlashyLabs/flashy-examples).

## One query, the whole stack

```
FlashyID          who am I
  → AgentGraph    what exists
  → IntentMesh    who can accomplish this
  → TrustGraph    should I deal with them
  → agent-dns / agent-wellknown / Bastion   how do I connect
  → AAO           how is the org represented
  → FlashyOS      how does it operate
  → AgentPay / WDK  how does value move
  → AgentLedger   what happened
```

Each arrow is a layer boundary, and each layer only ever answers its own question. Identity does not decide trust; discovery does not move money; the ledger does not edit.

## Principles, in brief

Expanded in [docs/principles.md](docs/principles.md).

- **Own the protocols, not the agents.** The estate owns the open protocols through which agents discover, identify, authorize, trust, transact with and audit one another — never the agents themselves.
- **Fewer businesses than brands.** Roughly seven businesses; more names than that, deliberately.
- **Spec-first.** Every protocol ships as a spec plus a dependency-free checker, is wired into mesh-lint and conformance-kit, proves one adopter, and only then becomes a business.
- **Open the protocols, keep the products.** Spec repos go public and open-licensed at each protocol's launch; implementations and services stay private. The rule is [docs/open-vs-private.md](docs/open-vs-private.md).
- **Structural enforcement over guidelines.** An agent cannot make an intent public (no parameter exists), cannot self-witness, cannot widen a grant, cannot self-approve a consented hop. The refusals are the product.

## How a new protocol joins

The ladder, step by step, is [docs/joining.md](docs/joining.md). In one line: **spec → dependency-free checker → wired into mesh-lint and conformance-kit → one independent adopter → business.** No rung is skipped, and nothing below the fourth rung is called launched.

## Links

- Machine-readable twin: [stack.json](https://github.com/FlashyLabs/stack.json) — served at `/.well-known/stack.json`
- Identity: [flashyid-spec](https://github.com/FlashyLabs/flashyid-spec) · [flashyid](https://github.com/FlashyLabs/flashyid)
- Graph: [agentgraph](https://github.com/FlashyLabs/agentgraph) · [therealm](https://github.com/FlashyLabs/therealm)
- Discovery: [intent-spec](https://github.com/FlashyLabs/intent-spec) · [intentmesh](https://github.com/FlashyLabs/intentmesh)
- Trust: [magician](https://github.com/FlashyLabs/magician) · [Rites-Network](https://github.com/FlashyLabs/Rites-Network)
- Gateway: [agent-wellknown](https://github.com/FlashyLabs/agent-wellknown) · [agent-dns](https://github.com/FlashyLabs/agent-dns) · [bastion](https://github.com/FlashyLabs/bastion)
- Representation: [aao](https://github.com/FlashyLabs/aao)
- Execution: [flashyos](https://github.com/FlashyLabs/flashyos) · [flashyos-spec](https://github.com/FlashyLabs/flashyos-spec) · [flashyos-tools](https://github.com/FlashyLabs/flashyos-tools) · [agentfile](https://github.com/FlashyLabs/agentfile)
- Commerce: [agentpay](https://github.com/FlashyLabs/agentpay) · [flashyos-wdk](https://github.com/FlashyLabs/flashyos-wdk) · [flashy-rails](https://github.com/FlashyLabs/flashy-rails) · [flashy-ledger](https://github.com/FlashyLabs/flashy-ledger) · [flashy-contracts](https://github.com/FlashyLabs/flashy-contracts)
- Audit: [chronicle](https://github.com/FlashyLabs/chronicle) · [flashy-network](https://github.com/FlashyLabs/flashy-network)
- Tooling: [conformance-kit](https://github.com/FlashyLabs/conformance-kit) · [mesh-lint](https://github.com/FlashyLabs/mesh-lint) · [flashy-infra](https://github.com/FlashyLabs/flashy-infra)
- Teaching: [flashy-docs](https://github.com/FlashyLabs/flashy-docs) · [flashy-examples](https://github.com/FlashyLabs/flashy-examples)

Repository names above are checked against a single allowlist by `npm test`; a typo in a repo name fails the build.

## Status

Status: the map is current as of 2026-09-28; statuses are per-repo and honest. A status here is a claim about the repo on that day, not a promise — when a repo's status moves, this table and [stack.json](https://github.com/FlashyLabs/stack.json) move with it, and a correction is filed as a [map correction](.github/ISSUE_TEMPLATE/map_correction.md).

Licence: to be declared at launch. The estate licence register in flashyos governs; this repository is not yet open-sourced.
