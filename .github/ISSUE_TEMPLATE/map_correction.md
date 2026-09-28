---
name: Map correction
about: The map says something that is not true — a status, a repo, a contract id, an invariant, a well-known surface
title: "map: "
labels: map-correction
---

<!-- A correction needs three things: what the map says, what is true, and how you know. A correction with the third part missing is an opinion, and the map does not move on opinions. -->

## What the map says

<!-- Quote the row or sentence, and name the file: README.md, stack.md, ARCHITECTURE.md, docs/*. -->

## What is true

<!-- One sentence. -->

## How you know

<!-- A link to the repository, a commit sha, a served URL and the date you fetched it, a conformance-kit run. If the claim is about visibility, you read the GitHub setting. If it is about licence, you read the estate register in flashyos. If it is about a well-known surface, you fetched it from the live domain, not a checkout. -->

## Does the machine twin agree?

<!-- Check FlashyLabs/stack.json. If it carries the same error, say so — both need the fix. If it is already right, this repository is the stale one. -->

- [ ] stack.json has the same error
- [ ] stack.json is already correct
- [ ] I could not read stack.json

## Status date

<!-- A correction that changes a status moves the date on the README's status line. Today's date, if you are opening a pull request with the fix: -->
