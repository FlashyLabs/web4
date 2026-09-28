# Security

This repository holds no code that runs in production, serves no surface, and stores no data: it is a map of the Web 4 stack. A security issue here is one of two things, and each goes to a different place.

## A vulnerability in a protocol or product on the map

Report it to that repository's owners, not here. The map names the repo for every layer (`stack.md`); the protocol's own `SECURITY.md` says how to reach them. If a repo is private and you cannot see its policy, use the address below and say which layer you mean — we will route it.

## A problem with this repository

A map can mislead. If the map claims a repo is public, launched, or conformant when it is not — or names a well-known surface that is not served — that is a correctness issue, and a `map correction` issue is the right form for it. Nothing in this repository is secret, so a correction can be filed in the open.

If you believe something here leaks information it should not (a credential, an internal hostname, a person's contact that was not meant to be published), do not file it in the open. Email the address below.

## Contact

**security@flashylabs** — to be confirmed. This address is written down as the estate's intended security contact and has not yet been verified as monitored from this repository. Until it is confirmed here, a report that receives no acknowledgement within seven days should be re-sent to the accountable contact named in the estate's mesh handshake (`/.well-known/flashyos.json` on any live estate property carries an `accountableTo`).

## What we will do

Acknowledge within seven days. Fix a map error by correcting the map and moving the status date. Fix a leak by removing the content and treating anything that was a credential as burned — removal is not rotation, and the estate's rule is that a committed secret stays burned after the file is deleted.

## Scope of this repository's own tests

`npm test` guards repo-name drift and the licence line. It is not a security control and does not scan for secrets; the estate's shared secret-scanning workflow in `flashy-infra` is what does that, and wiring this repository to it is a `ci.yml` change, not a `SECURITY.md` one.
