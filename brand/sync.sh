#!/usr/bin/env bash
# Rewrites MANIFEST.sha256 over every brand file. Run from brand/ in the
# CANONICAL repo (flashy-group) after any change, then copy the whole
# directory into each consuming repo in the same change.
set -euo pipefail
cd "$(dirname "$0")"
find . -type f ! -name MANIFEST.sha256 ! -name sync.sh | LC_ALL=C sort | xargs sha256sum > MANIFEST.sha256
echo "manifest rewritten: $(wc -l < MANIFEST.sha256) files"
