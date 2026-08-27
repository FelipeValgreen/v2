# RINON 2.0 — Claude operating instructions

This repository is the shared source of truth for ChatGPT + Claude collaboration on RINON 2.0.

## Mission
Finish RINON 2.0 as a production-ready manufacturer website while preserving SEO equity, improving conversion, maintaining factual claims, and keeping production fail-closed until explicit cutover authorization.

North-star formula:

`organic visibility × commercial intent × conversion × trust`

The goal is not merely a green build. The site must be credible, understandable, responsive, conversion-oriented, SEO-safe and verifiable in a real browser.

## Before doing any work
Read, in this order:
1. `README.md`
2. `docs/RINON_RC7_PRD.md`
3. `docs/AI_COLLABORATION_PROTOCOL.md`
4. `docs/AI_HANDOFF_CHATGPT.md`
5. `docs/AI_HANDOFF_CLAUDE.md`
6. `docs/AI_DECISION_LOG.md`
7. `docs/DESIGN_SYSTEM_UI_SPEC.md`
8. `docs/PAGE_CRO_AUDIT.md`
9. `docs/SEO-MIGRATION-CRO-CONTRACT.md`
10. `docs/SEO_KEYWORD_INTENT_MAP.csv`
11. `docs/SEO_MIGRATION_MATRIX.csv`
12. `docs/URL-MIGRATION-INVENTORY.md`
13. `docs/VISUAL_PROVENANCE_INVENTORY.md`
14. `docs/VISUAL_ASSET_PRODUCTION_BRIEF_RC7.md`
15. `docs/STRUCTURES_VISUAL_BRIEF.md`
16. `docs/RELEASE_CUTOVER_RUNBOOK.md`

For a new Claude session, `docs/CLAUDE_BOOTSTRAP_PROMPT.md` contains the recommended startup instruction.

After reading, inspect current `main`; documents never replace verification of the implementation.

## Product invariants
Human-facing top-level architecture is intentionally task-oriented:

`Productos ↓ | Proyectos a medida | Empresas | Servicios ↓ | Nosotros | Cotizar`

`/fabricacion-metalica` remains the SEO owner for transversal custom-fabrication intent while the human-facing concept is `Proyectos a medida`.

Do not silently reintroduce overlapping top-level concepts such as separate `A medida`, `Fabricación a medida`, `Fabricaciones especiales` and `Proyectos` entries.

Commercial evidence must prioritize real/verifiable manufacturing evidence. A render/reference may be used only with explicit provenance and must never be represented as an executed RINON project without verification.

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
- Reproduce browser problems before patching them when possible.
- Prefer evidence over preference.
- Fix systemic causes rather than isolated screenshots.
- Do not replace a working system just because another pattern is fashionable.
- Do not create mocks that look real.
- Do not invent clients, certifications, load ratings, delivery times, prices or project evidence.
- Preserve staging `noindex` and all production fail-closed flags.
- Never enable production redirects or write-paths without explicit cutover authorization.
- Keep user-visible UX in Spanish; code/docs may use English where useful.

If one instance of a defect is found, audit the shared system before concluding it is isolated. Examples: hero image density, link styling, mobile overflow, CTA tracking, migration-family rules or form validation.

## SEO migration safety
This is a zero-loss migration.

Live-observed URLs quarantined as `REVIEW / GSC-PENDING` must not be consolidated based on architecture preference alone. The machine-readable pending set remains production-blocking until actual Search Console landing-page/query evidence is reconciled.

Never:
- blanket redirect unresolved URLs to Home;
- recreate thin local doorway pages without differentiated value/evidence;
- reduce the pending count merely to satisfy preflight;
- weaken migration QA to permit cutover.

## Visual truth
Evidence hierarchy:
1. verified RINON photograph/evidence;
2. user/archive reference with explicit non-attribution;
3. approved current-site reference;
4. conceptual/render explicitly labelled;
5. technical diagram as explanatory support.

Every governed visual requires an auditable `sourceRef`; `verified-rinon` additionally requires `verificationRef`.

Image HTTP 200 is not enough. Audit actual rendering, intrinsic dimensions, displayed dimensions, DPR, crop and visual relevance.

## Quote / CRM / attachment safety
The quote funnel is progressive and commercial qualification should remain structured.

Private attachments must remain private. Do not:
- make the Supabase bucket public;
- expose service-role credentials;
- expose unrestricted storage URLs;
- bypass admin authentication;
- remove MIME/size/count checks;
- leave orphaned files after partial failure;
- weaken lead/attachment ownership validation.

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

No agent consensus can authorize production cutover. Explicit user authorization is required.

## Validation
For any code change, run as much of the release contract as the environment allows:
- `npm run typecheck`
- `npm run qa:static`
- `npm run build`
- `npm run qa:served`
- `npm run qa:browser`
- `npm run check:release`

Also verify the deployed Vercel behavior when possible; local success does not prove remote rendering.

If a command cannot run due to environment/network limitations, say exactly which validation is missing; do not report it as green.

Never weaken a test simply to make a release pass unless the previous assertion is demonstrably wrong and the replacement improves signal.

## Definition of done for Claude work
A batch is complete only when:
- the actual product/technical problem is addressed;
- code change is committed or clearly proposed;
- tests/gates actually run are recorded;
- deployed/browser behavior is checked when applicable;
- unresolved risks are listed;
- SEO intent ownership and visual truth are preserved;
- production remains fail-closed;
- `docs/AI_HANDOFF_CLAUDE.md` is updated with exact branch/commit and next recommended action.
