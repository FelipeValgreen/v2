# RINON 2.0 — Shared AI agent contract

This file applies to any coding/review agent operating on this repository.

## Source of truth
The repository is authoritative. Read `README.md` and `docs/AI_COLLABORATION_PROTOCOL.md` before changing code.

## Current mode
SAFE PRE-CUTOVER.

Production `rinon.cl`, DNS, indexation, production redirects, production tracking and production lead writes are off limits without explicit cutover authorization.

## Shared product objective
Optimize the system as:

`organic visibility × commercial intent × conversion × trust`

A technically valid build is insufficient if the real browser experience is broken, confusing or visually untrustworthy.

## Non-negotiables
- no broken logo/assets;
- no default browser-blue commercial links;
- no horizontal mobile overflow;
- no fake project evidence;
- no invented technical/commercial claims;
- no blanket SEO redirects for unresolved live URLs;
- no public quote attachments;
- no production cutover while GSC-pending URLs remain;
- no reporting a test as passed unless it actually ran.

## Multi-agent coordination
- ChatGPT writes `docs/AI_HANDOFF_CHATGPT.md`.
- Claude writes `docs/AI_HANDOFF_CLAUDE.md`.
- Decisions accepted after reconciliation go in `docs/AI_DECISION_LOG.md`.
- Do not edit another agent's handoff except to initialize a missing template.
- Read the other handoff before starting a new batch.
- Use explicit `CHALLENGE` blocks when disagreeing.

## Validation
Preserve all existing QA gates. Prefer adding regression tests when fixing systemic defects.
