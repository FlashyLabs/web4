# Principles

Five principles govern what the estate builds and what it refuses to build. They are doctrine, not aspiration: each one is enforced somewhere by a test, a gate or the absence of a parameter, and the enforcement is named beside it.

## 1. Own the protocols, not the agents

The estate owns the open protocols through which agents discover, identify, authorize, trust, transact with and audit one another — and not the agents themselves.

An agent is a product somebody else will build better, cheaper and more often. The protocol an agent has to speak to be discovered, to prove who it is, to be trusted, to move money and to leave a record is where the value sits, and it sits there for as long as the protocol is the one people conform to. So every layer on the map is a protocol first (`delegation/1`, `graph/1`, `intent/1`, `trust/1`, `ritual/1`, `agent/1`, `agent-dns/1`, `aao/0.1`, `flashyos/1`, `pay-policy/1`, `action-ledger/1`), and the products — flashyid, intentmesh, magician, bastion, the rails — are one implementation each, held privately.

**Enforced by:** the map itself. A row on [stack.md](../stack.md) has a contract or it is tooling; there is no row for "an agent".

## 2. Fewer businesses than brands

Roughly seven protocol businesses plus a universal graph, under more names than that.

A name is cheap and a business is not. A brand can be a domain, a spec, a page and a shard of an easter egg; a business is a licence entry, a hygiene row, a CI budget, a support obligation and a person accountable for it. The estate deliberately runs many brands over few businesses, and the map says which is which: a layer is a business, a repo is a name.

**Enforced by:** the estate's licence register, which holds one entry per repository with a copyright holder, and the surveys that count repositories against it. A brand with no register entry is a name and not a business.

## 3. Spec-first

Every protocol ships as a spec plus a dependency-free checker, is wired into mesh-lint and conformance-kit, proves one adopter, and only then becomes a business.

The order matters and each rung exists because the previous one was skipped once. A spec with no checker is prose that drifts from what anyone implements. A checker with dependencies is a check that can quietly not run. A protocol nobody else adopts is an internal format wearing a version number. And a business built before the adopter exists sells a promise the estate has not yet kept to anybody. The ladder is [joining.md](joining.md), and the gate at the top — no `*-spec` repo is called a standard before an independent adopter — is stated publicly on the estate's own roadmap pages.

**Enforced by:** the ladder in [joining.md](joining.md), conformance-kit (which only runs checkers with no install step) and the rule that a contract's status on the map is `draft` until the adopter is named.

## 4. Open the protocols, keep the products

`*-spec` repos become public and open-licensed at each protocol's launch; implementations and services stay private.

A protocol is only worth owning if others can conform to it, and they cannot conform to a spec they cannot read. A product is only worth running if it is the best implementation, and the estate's edge in implementing is what it keeps. The two are separated by repository so the line is a fact about a repo and not a judgement made per file. The full rule — and why visibility, licence and interoperability are three different things — is [open-vs-private.md](open-vs-private.md).

**Enforced by:** the estate licence register (one declaration per repository, made in flashyos and never inside the repository), and the status column on the map, which never reads `public` for a repo the register has not opened.

## 5. Structural enforcement over guidelines

An agent cannot make an intent public, because no parameter exists. It cannot self-witness, because a witness is by definition someone else. It cannot widen a grant, because attenuation refuses a superset. It cannot self-approve a consented hop, because only the edge's owner consents and the requester is never the owner. The refusals are the product.

A guideline is a sentence an agent can be prompted past. A missing parameter is not. Every invariant on the map is written as what a caller *cannot do*, and the test for each invariant is a call that must be refused — the test whose whole job is proving that unilateral activity moves nothing, the test that compares a declined introduction to one that never existed and asserts deep equality, the test that a grant carrying one scope its parent lacks throws before anything mints. When an invariant can be stated as "an agent should not", it is rewritten until it can be stated as "there is no way to".

**Enforced by:** the tests named above in their own repos, and the map's convention that every layer's invariant is phrased as a refusal.

## The principle behind the principles

Report what happened, including when it is worse than expected. Every number on the map is a status somebody measured on a named day, never a number somebody assumed. A status that reads `draft` when a spec has a checker and an adopter is stale and should be corrected; a status that reads `launched` before the adopter exists is a lie and should never have been written. Between the two, the map errs toward the first.
