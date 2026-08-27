# ChatGPT → Claude handoff — RINON 2.0

**Mode:** SAFE PRE-CUTOVER  
**Release:** 1.0.0-rc.7  
**Repository:** `FelipeValgreen/v2`  
**Current main HEAD at handoff:** `703d38db45bbd82f408438765e687ad64039d843` (collaboration/documentation update).  
**Last fully validated functional migration build before these docs-only commits:** `64a852c469625c6b0ea8634df443af4cab19ae79`, Vercel READY.  
**Staging alias:** `https://rinon-v2.vercel.app`.

## START HERE
For a fresh Claude session, read `docs/CLAUDE_BOOTSTRAP_PROMPT.md` and follow it.

The consolidated product contract is `docs/RINON_RC7_PRD.md`.

Do not rely on this handoff alone; inspect current `main` after reading the repository contracts.

## CURRENT STATE
RINON 2.0 is an isolated Next.js 16 / React 19 staging implementation. Production `rinon.cl` is intentionally untouched.

The current architecture includes:
- task-oriented header with Productos / Proyectos a medida / Empresas / Servicios / Nosotros / Cotizar;
- mobile navigation and responsive commercial dock behavior;
- commercial product/service owners and preserved legacy product pages;
- 3-step `/cotizar` wizard;
- secure private quote attachments through Supabase;
- authenticated admin attachment access;
- structured CRM qualification + consented attribution;
- local Contacto/Nosotros map, Maps and Waze;
- SEO/CRO/schema contracts;
- visual provenance contract;
- fail-closed production preflight;
- Vercel + Playwright/served-build QA architecture.

## SEO MIGRATION STATE
The public-site crawl/inventory work currently protects **36 live-observed URLs** as `REVIEW / GSC-PENDING` before broad family redirects. Production preflight must remain blocked until actual Search Console landing-page/query evidence resolves that set.

Do not collapse those URLs based only on architecture preference.

The migration source of truth is distributed deliberately across:
- `lib/migration.ts`;
- `docs/URL-MIGRATION-INVENTORY.md`;
- `docs/SEO_MIGRATION_MATRIX.csv`;
- `scripts/check-migration-contract.mjs`;
- production preflight.

If these disagree, treat it as a release defect and reconcile them rather than choosing one silently.

## VISUAL STATE
The design system direction is industrial premium: graphite/black/white + RINON orange, Raleway, photography/evidence first, technical visuals secondary.

Known limitation:
- `/estructuras-metalicas` and the corresponding Home chapter still use a governed conceptual structure visual pending a stronger contextual master.
- User-provided architectural render `COBERTIZO SALA.jpg` is 2212×941 and is potentially useful only as a **reference/render**, never as verified RINON project evidence unless separately verified.
- real workshop evidence must not be generated/faked.

The visual registry requires auditable provenance. Do not weaken `sourceRef` / `verificationRef` requirements.

## WHAT CHATGPT HAS BEEN OPTIMIZING FOR
`organic visibility × commercial intent × conversion × trust`

Key decisions already made:
- human navigation label `Proyectos a medida` while SEO owner remains `/fabricacion-metalica`;
- no duplicate `Fabricación a medida` under Services;
- portfolio `/proyectos` is not promoted as evidence unless cases are verifiable;
- diagrams cannot be the automatic hero fallback for commercial pages;
- CTA system uses quote + WhatsApp according to intent;
- quote attachments remain private and admin-authenticated;
- structured CRM fields are preferred over burying qualification only in `mensaje`;
- staging remains noindex and production flags fail closed.

## REQUEST FOR CLAUDE — FIRST PASS
Perform an independent technical review. Do not assume current implementation is correct because contracts exist.

Priority order:
1. **Browser reality / responsive:** inspect Home, mega menus, mobile navigation, `/soluciones`, `/fabricacion-metalica`, `/empresas`, `/estructuras-metalicas`, `/nosotros`, `/contacto`, `/cotizar`, footer at 320/375/430/768/1024/1366/1440+.
2. **Code architecture:** identify duplication, brittle CSS, component abstractions that are over/under-generalized, hydration/accessibility issues and maintainability risks.
3. **Assets:** verify logo delivery, image intrinsic/rendered size, Next image behavior and visual provenance implementation.
4. **Quote flow:** audit conditional validation, keyboard/Enter behavior, multipart upload limits, rollback, error states and mobile usability.
5. **Admin/security:** audit auth guard, attachment route, `leadId + attachmentId` validation, caching headers, service-role usage and any IDOR/CSRF risks.
6. **QA:** inspect whether `check:release`, Playwright and deployment smoke tests can still produce false positives. Add tests for systemic defects, not screenshots-only patches.
7. **Performance:** identify material LCP/CLS/bundle/image/CSS concerns.

## DO NOT CHANGE WITHOUT RECONCILIATION
- production flags/domain/DNS/indexation;
- GSC-pending migration outcomes;
- canonical intent ownership;
- unsupported business/technical claims;
- legal approval;
- visual provenance labels.

## EXPECTED CLAUDE OUTPUT
Update `docs/AI_HANDOFF_CLAUDE.md` with:
- severity-ranked findings;
- `CHALLENGE` sections for decisions you dispute;
- exact files/components involved;
- fixes implemented or proposed;
- commands/tests actually run;
- branch/commit/PR if you changed code;
- next actions for ChatGPT.

If implementing a broad refactor, use a `claude/<task>` branch + PR rather than changing many core files directly on main.

## CURRENT EXTERNAL BLOCKERS
These are not excuses for leaving code defects:
- final Search Console export/reconciliation;
- final verified workshop/project photography where required;
- explicit user authorization for production cutover.

Everything else should be challenged and improved until the release is genuinely ready.
