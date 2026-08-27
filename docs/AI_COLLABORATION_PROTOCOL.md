# RINON 2.0 — ChatGPT ↔ Claude collaboration protocol

## Purpose
Use ChatGPT and Claude as complementary senior agents working against one repository and one release contract. The objective is not consensus for its own sake; it is to reduce blind spots and finish RINON 2.0 with higher product, technical and migration quality.

## Role split

### ChatGPT — primary owner
- Product Owner / scope control
- UX and information architecture
- SEO migration / URL ownership / SGEO
- CRO and conversion paths
- business capability/claim governance
- Supabase/CRM integration contract
- release/cutover governance
- final reconciliation between disciplines

### Claude — primary owner
- code architecture and refactor review
- React/Next.js implementation quality
- CSS/responsive/accessibility review
- performance/runtime/browser issues
- security/code-level edge cases
- automated test quality
- independent technical challenge of ChatGPT decisions

### Joint decisions
Require both perspectives before final acceptance when they affect:
- header/navigation architecture;
- core templates;
- quote funnel;
- visual system/evidence implementation;
- schema/component abstractions;
- migration behavior;
- production release candidate.

## Communication mechanism
There is no direct Claude transport exposed inside the current ChatGPT environment. GitHub is the shared mailbox.

Files:
- `docs/AI_HANDOFF_CHATGPT.md` — ChatGPT → Claude
- `docs/AI_HANDOFF_CLAUDE.md` — Claude → ChatGPT
- `docs/AI_DECISION_LOG.md` — reconciled decisions

Each agent reads the other's latest handoff before starting work.

## Handoff format
Every handoff should contain:

### CURRENT STATE
Exact branch/commit/deployment if known.

### CHANGES MADE
Files and behavior changed.

### VALIDATION
Commands/checks actually run and their result.

### OPEN RISKS
What is still uncertain.

### REQUEST FOR OTHER AGENT
Specific audit or implementation tasks.

### CHALLENGE
Optional. Used when disagreeing with an existing decision.

### NEXT
What should happen after the other agent responds.

## Challenge/reconciliation method
1. Agent A records the challenged decision and evidence.
2. Agent B verifies against code, browser behavior, product/SEO contracts and user impact.
3. If one position is clearly superior, record the accepted result in `AI_DECISION_LOG.md`.
4. If evidence is insufficient, keep the safer/fail-closed behavior and mark it unresolved.
5. Production-sensitive uncertainty always resolves toward no cutover/no redirect/no unsupported claim.

## File ownership to avoid collisions
ChatGPT should primarily own:
- `docs/AI_HANDOFF_CHATGPT.md`
- `docs/AI_DECISION_LOG.md`
- migration/product/SEO/CRO governance docs

Claude should primarily own:
- `docs/AI_HANDOFF_CLAUDE.md`
- implementation branches/PRs for substantial refactors

Shared source files may be edited by either agent, but never concurrently without reading the latest main commit.

## Branch strategy
Routine, low-risk fixes may land on `main` when explicitly authorized by the ongoing user instruction and all fail-closed production constraints remain intact.

For broad refactors or changes touching several core systems, Claude should prefer a branch such as:
`claude/<short-task>`
and open a PR. ChatGPT then reviews the diff against SEO/CRO/product/release contracts before merge.

## Release invariants
Never change these through agent consensus alone:
- `rinon.cl` connection/DNS
- production indexation
- production migration redirects
- production blog redirects
- production lead writes
- production analytics/tracking
- legal approval
- GSC-pending URL decisions without actual Search Console evidence

Those require the evidence/authorization defined by the release runbook.

## Evidence hierarchy
When agents disagree:
1. real browser/rendered behavior;
2. automated release gates;
3. actual code/runtime response;
4. Search Console / analytics data;
5. verified business information;
6. design/product heuristic;
7. personal stylistic preference.

Higher evidence wins.

## Working loop
`inspect → challenge → implement → test → deploy → remote verify → handoff → reconcile → repeat`

The loop ends only when the Definition of Done is satisfied or the only remaining blockers require external evidence/explicit user authorization.
