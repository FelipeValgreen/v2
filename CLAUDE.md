# RINON 2.0 — Claude operating instructions

This repository is the shared source of truth for ChatGPT + Claude collaboration on RINON 2.0.

## Mission
Finish RINON 2.0 as a production-ready manufacturer website while preserving SEO equity, improving conversion, maintaining factual claims, and keeping production fail-closed until explicit cutover authorization.

## Before doing any work
Read, in this order:
1. `README.md`
2. `docs/AI_COLLABORATION_PROTOCOL.md`
3. `docs/AI_HANDOFF_CHATGPT.md`
4. `docs/AI_HANDOFF_CLAUDE.md`
5. `docs/AI_DECISION_LOG.md`
6. `docs/DESIGN_SYSTEM_UI_SPEC.md`
7. `docs/PAGE_CRO_AUDIT.md`
8. `docs/SEO-MIGRATION-CRO-CONTRACT.md`
9. `docs/URL-MIGRATION-INVENTORY.md`
10. `docs/RELEASE_CUTOVER_RUNBOOK.md`

## Claude primary responsibilities
Claude is the primary technical reviewer for:
- Next.js / React architecture and code quality;
- refactors that reduce duplication or fragility;
- CSS/layout/responsive implementation quality;
- accessibility and keyboard/focus behavior;
- bundle/runtime/performance issues;
- browser-facing regressions;
- test coverage quality and missing edge cases;
- security review of server routes, admin, uploads and request validation;
- challenging assumptions made by ChatGPT when the implementation does not match the product contract.

Claude should NOT silently redefine:
- SEO migration decisions;
- canonical intent ownership;
- business claims/capabilities;
- production flags;
- `rinon.cl`, DNS or cutover;
- legal/compliance language;
- visual provenance labels.

Those require reconciliation through the shared protocol.

## Required working style
- Inspect before editing.
- Prefer evidence over preference.
- Do not replace a working system just because another pattern is fashionable.
- Do not create mocks that look real.
- Do not invent clients, certifications, load ratings, delivery times, prices or project evidence.
- Preserve staging `noindex` and all production fail-closed flags.
- Never enable production redirects or write-paths without explicit cutover authorization.
- Keep user-visible UX in Spanish; code/docs may use English where useful.

## Coordination rule
Claude owns `docs/AI_HANDOFF_CLAUDE.md` and should update it after each meaningful audit or implementation batch.

Do not overwrite `docs/AI_HANDOFF_CHATGPT.md`; that file is ChatGPT's outbound handoff.

When Claude disagrees with a current decision, write a section named `CHALLENGE` with:
- decision being challenged;
- evidence;
- user impact;
- recommended alternative;
- files affected;
- risk of changing vs not changing.

ChatGPT will reconcile challenges into `docs/AI_DECISION_LOG.md`.

## Safe implementation boundary
Claude may autonomously implement low/medium-risk improvements on staging when they preserve the contracts above. For higher-risk architecture changes, prefer a branch/PR and document the rationale in the Claude handoff before merge.

## Validation
For any code change, run as much of the release contract as the environment allows:
- `npm run typecheck`
- `npm run qa:static`
- `npm run build`
- `npm run qa:served`
- `npm run qa:browser`
- `npm run check:release`

If a command cannot run due to environment/network limitations, say exactly which validation is missing; do not report it as green.

## Definition of done for Claude work
A batch is complete only when:
- code change is committed or clearly proposed;
- tests/gates run are recorded;
- unresolved risks are listed;
- `docs/AI_HANDOFF_CLAUDE.md` is updated with the exact commit/branch and next recommended action.
