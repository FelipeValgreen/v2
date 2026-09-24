# Claude → ChatGPT handoff — RINON 2.0

This file is Claude's mailbox back to ChatGPT.

Claude: replace the template below after each meaningful audit or implementation batch. Do not edit `docs/AI_HANDOFF_CHATGPT.md`.

## CURRENT STATE
- Branch: `claude/preparar-rinon-cl` (from `main` @ `17d4cc5`).
- Commit: see `git log claude/preparar-rinon-cl` (batch of small commits: legibility layer, OG image fix, legacy redirect map, Vercel region, CSP, quote copy, docs). Batch 2 (2026-09-24): `a13a0b7` legacy 301 map emitted in non-production builds, `53e7dca` redirect docs, plus the test/handoff commit that follows.
- Deployment/preview if applicable: `https://rinon-v2-5e8p7hab0-filipovalverde-5673s-projects.vercel.app` (Vercel project `rinon-v2`, commit `53e7dca`, READY; branch alias `rinon-v2-git-claude-prepar-a77a60-filipovalverde-5673s-projects.vercel.app`). Production not touched.
- Batch scope: (A) measured legibility layer `app/legibility.css`; (B) technical readiness for serving on `rinon.cl` (indexation gate, redirects, region, analytics CSP, quote backend, contact constants, sitemap/robots, schema, quality); (C) `docs/cutover-rinon-cl.md`, `docs/needs-data.md`; (D) **batch 2**: legacy rinon.cl 301 redirects live on the branch preview (Felipe reported `/rejas-metalicas-macul`, `/cercos-perimetrales-*`, `/camarotes-metalicos` → 404 on the previous preview).

## FINDINGS
### P0
- `/opengraph-image` crashed at runtime on every request (Satori: "Expected <div> to have explicit display:flex … if it has more than one child node" — the headline div had text + `<br/>` + text). Every page advertised an OG image that returned an empty 500. Fixed (`app/opengraph-image.tsx`).
- Legibility baseline measured on the served build (Chromium, reduced-motion, after scrolling): on the 8 core routes 58–95 visible texts per route were under 12px and axe `color-contrast` reported up to 45 violations per route (`/empresas`). Several were real invisibility bugs, not just small type: white `.v2-btn.outline` on light sections (`/nosotros`, preserved commercial landings) = 1.07:1; privacy-policy link in the quote consent `#161616` on `#17191a` = 1.02:1; `.prd2-solution-split p` `#b8bec1` on white = 1.9:1.
- Horizontal overflow at 1280px on `/camarotes`, `/cierres-perimetrales`, `/pintura-electrostatica`: `part-08.css` re-declares `.prd2-scope-grid` as 4 columns while `part-05.css` still makes each `article` an inner 3-column grid with ≈480px min-content. Fixed with one media-scoped rule in the legibility layer (article → block ≥ 901px).

- **Batch 2 root cause of the preview 404s:** the 398-entry map already existed but `next.config.ts` only emitted it with `RINON_ENABLE_MIGRATION_REDIRECTS=true` at build time, and the Vercel Preview environment does not carry that flag. Not a missing sitemap. Fixed by emitting the map in every non-production build while keeping the production gate (see CHANGES).

### P1
- 9 Playwright tests fail **identically on `main`** in this container (baseline run on the same commit without my changes): `navigation-context` (aria-current), `quote-keyboard` (strict-mode `getByLabel('Uso')`), `render.spec` ×5 (header logo `naturalWidth` never > 100, strict-mode duplicates), `seo-cro` ×2 (innerText expectations). Not introduced by this batch; likely test drift and/or the Playwright 1.63 ↔ preinstalled Chromium 1194 mismatch. Needs a separate pass.
- Primary buttons used white text on brand orange (`.prd2-btn.primary`, `.v2-btn.orange`, `.prd2-header-cta`, `.v2-tech-card`) = 2.6:1. Switched the text to ink, which is already the site's own convention (`.button.primary`, `.s7-cta`, `.mobile-nav-quote`, `.v5-editorial-page .v2-btn.orange`). Orange fill preserved.
- `RINON_ENABLE_MIGRATION_REDIRECTS` previously only enabled the runtime resolver in `proxy.ts`, which covers a subset of the old site by prefix rules. The old site has 425 static routes + product/blog slugs; 398 of them have no route in RINON 2.0. Without an explicit map they would 404 at cutover.

### P2
- The home title "Elige cómo empezar." inherited white on `#f7f7f5` (1.07:1). Forced to ink. If the design intended it over a photo/dark band, that section has no such background today.
- `.v5-editorial-page` quote inputs were 13px; now 14px. iOS Safari still auto-zooms inputs under 16px; not changed (visual-identity boundary).
- `vercel.json` region `gru1` only applies to the plan tier that allows choosing a region; confirm in the dashboard.

## CHANGES MADE
- `app/legibility.css` (new, imported right after `globals.css` in `app/layout.tsx`): the provided layer (sections 1–4) plus sections 5–6 with rules measured on client states and routes the previous audit did not cover (mobile menu open, mega-menus open, quote form steps 1–3, `/nosotros`, `/contacto`, `/soluciones`, `/fabricacion-metalica`, `/preguntas-frecuentes`, prd2 grids), the outline-button and consent-link contrast bugs, ink text on orange buttons, and the desktop scope-grid overflow fix. Same selectors as the original CSS; colours via `--rn-accent-text` / `--rn-muted-text`; never `#f58220` as text on light.
- `app/opengraph-image.tsx`: valid Satori layout (two-line headline as flex column).
- `lib/legacy-redirects.ts` (new): 398 explicit old-site URLs → closest RINON 2.0 owner, generated from the old repo (`enrique636/rinon`: app routes, `lib/products.ts`, `lib/blog.ts`, `app/sitemap.ts`, its own `next.config` redirects). Tiers: 340 `family`, 58 `gsc-pending` (exact parity with `observedLiveReviewPaths` / `docs/GSC_PENDING_URLS.csv`).
- `next.config.ts`: `redirects()` emits the map as **301** only when `RINON_ENABLE_MIGRATION_REDIRECTS=true` at build time; the `gsc-pending` tier additionally requires `RINON_REDIRECT_GSC_PENDING=true`. CSP `img-src`/`connect-src` widened to `https://*.google-analytics.com`, `https://*.analytics.google.com`, `https://www.googletagmanager.com` (GA4 regional collectors). `proxy.ts` untouched.
- `scripts/check-legacy-redirects.mjs` (new, wired as `qa:redirects` into `qa:static` and `build`): destinations exist, no chains/loops, no RINON 2.0 route shadowed, tier parity with the GSC quarantine, flags fail-closed.
- `scripts/audit-legibility.mjs` (new, `qa:legibility`): the Playwright + axe-core + font-size census used for the numbers below (supports `STATES=1`, `BEFORE=1`, `RINON_CHROMIUM_PATH`). `axe-core` added as devDependency.
- `vercel.json`: `"regions": ["gru1"]`.
- `app/cotizar/page.tsx`: the "En staging validamos el flujo…" note renders only while `isLeadWriteConfigured()` is false.
- `docs/cutover-rinon-cl.md`, `docs/needs-data.md` (new).
- **Batch 2 (2026-09-24):**
  - `next.config.ts`: `productionBuild = VERCEL_ENV === "production" || RINON_INDEXABLE === "true"`. Non-production builds (local, Vercel Preview) emit the whole 398-entry map as 301; production builds keep D-001 fail-closed (`RINON_ENABLE_MIGRATION_REDIRECTS` for the 340 family entries, plus `RINON_REDIRECT_GSC_PENDING` for the 58 GSC-pending entries). Destinations stay relative.
  - `lib/legacy-redirects.ts`: reconciled with Felipe's cutover list (420 old URLs, 29 already exist, 391 to redirect): all 391 present, 7 extra sources from the old repo inventory kept. `/instalacion-camarotes` and `/instalacion-de-rejas` → `/instalacion` (as listed). 6 con-escritorio variants keep `/camarote-con-escritorio` and `/camarote-dos-plazas-abajo` keeps `/camarote-2-plazas` (more specific than the listed `/camarotes`; one-line change each if Felipe prefers the list).
  - `scripts/check-legacy-redirects.mjs`: asserts the new gate shape and `statusCode: 301`.
  - `tests/seo-cro.spec.mjs`: the test "pre-cutover migration aliases remain disabled in staging" asserted 404 for 3 URLs that are in the map; replaced by "legacy rinon.cl aliases redirect once (301) to their intent owner and unmapped aliases stay 404": exact 301 + `location` (`maxRedirects: 0`) for 7 aliases across families, one-hop 200 landing, and 404 + noindex for 2 unmapped aliases (`/cercos-metalicos-santiago`, `/rejas-metalicas-comuna-inexistente`). Stronger signal than the previous 404 assertion; production fail-closed is covered by `qa:redirects` + preflight.
  - `.env.preview.example` comment; `docs/redirects-sitio-viejo.md` (new: coverage, per-family/per-destination counts, decisions, gate matrix, test evidence, 40-URL sample), `docs/redirects-sample-check.sh` (new), `docs/cutover-rinon-cl.md` (redirect row, preview check step, post-cutover "muestra de 40 redirects 301").

## VALIDATION ACTUALLY RUN
- `npm run typecheck` ✓, `npm run qa:static` ✓. `npm run lint` exits 2 on `main` and on this branch: the repo has no `eslint.config.js` (ESLint 9 flat config) — pre-existing, not fixed here (adding a config is a separate decision). (incl. new `qa:redirects`), `npm run build` ✓ (SAFE PRE-CUTOVER preflight), `npm run qa:served` ✓ (28 routes, 26 assets).
- `npm run qa:browser` (Playwright 1.63 with `/opt/pw-browsers/chromium` via a wrapper config): 42 passed / 9 failed — **same 9 on baseline `main`** (see P1).
- Legibility audit (3 widths × 8 core routes + 5 client states + 12 extra sitemap routes, reduced-motion, after scroll): 0 visible texts < 12px, 0 p/a/button/li < 14px, 0 `small` < 13px, 0 axe `color-contrast` violations, 0 horizontal scroll. Before/after per route in the REPORT section below (baseline = `main` @ `17d4cc5` built and measured with the same script).
- Redirects: separate build with both flags on, served locally: 398/398 sources → single-hop 301 → destination 200; 138 RINON 2.0 routes still 200; unknown URLs 404; query string preserved; trailing-slash variant goes through Next's 308 normaliser first (two hops, only for URLs the old sitemap never published). With flags off, legacy URLs return 404 (fail-closed confirmed on the final build).
- Served metadata over the 57-URL sitemap + 8 extra routes: canonical `https://rinon.cl<path>` on every page, unique titles/descriptions, OG image 200 (`image/png`, ~34 KB) after the fix, robots meta `noindex, nofollow` and `robots.txt` `Disallow: /` while `RINON_INDEXABLE` is unset.
- **Batch 2:** `npm run typecheck` ✓; `npm run build` ✓ (all qa:* gates + SAFE PRE-CUTOVER preflight + next build; `.next/routes-manifest.json` = 398 non-internal redirects, statusCode 301); served build on :3210: **398/398** legacy URLs → 301 one hop → destination 200, 20 v2 routes 200 without redirect, `/no-existe` 404, query string preserved; `npm run qa:served` ✓ (28 routes, 26 assets); real `next.config.ts` loaded with Next's config loader, one process per scenario: local/preview 398, `VERCEL_ENV=production` 0, `RINON_INDEXABLE=true` 0, production+`RINON_ENABLE_MIGRATION_REDIRECTS` 340, production+both flags 398. Playwright (preinstalled Chromium via a local wrapper config, not committed): 41 passed / 10 failed before the test rewrite = the same 9 baseline failures + the staging-404 test that the new contract invalidates; after the rewrite that test passes (run in isolation). `npm run lint` still exits 2 (no ESLint 9 flat config in the repo, pre-existing).
- **Batch 2, remote (Vercel MCP fetch, follows redirects, on preview `rinon-v2-5e8p7hab0…`):** `/rejas-metalicas-macul` → served `/rejas-metalicas` (200), `/camarotes-metalicos` → `/camarotes`, `/cercos-perimetrales-maipu` → `/cierres-perimetrales`, `/pintura-electrostatica-colina` (gsc-pending tier) → `/pintura-electrostatica`, `/instalacion-camarotes` → `/instalacion`, `/camarote-con-escritorio-gamer?utm_source=test` → `/camarote-con-escritorio`; `/ruta-inexistente-qa` → 404 via `/[legacy]`, noindex. The 301 status itself is not visible through that tool (it follows the redirect); the one-hop 301 was asserted on the local build and by the Playwright test.
- NOT run / not verifiable here: Vercel preview rendering (egress to `*.vercel.app` and `rinon.cl` blocked), `dig` on `rinon.cl`, the old site's live `sitemap.xml` (used the old repo's generator instead), any Supabase write, GA4/Clarity (no ids).

## OPEN RISKS
- 58 GSC-pending URLs: without `RINON_REDIRECT_GSC_PENDING=true` they 404 at cutover; with it they 301 to the family owner without Search Console evidence. `MIGRATION_GSC_REVIEW_PENDING_COUNT` stays 58, so an authorized-cutover preflight still fails by design.
- `/blog/*` (76 slugs) stays as noindex compatibility pages; only 6 approved redirects (`lib/blog-migration.ts`) activate with `RINON_ENABLE_BLOG_REDIRECTS=true`. The task's "blog/* → /recursos" was not applied wholesale because 19 slugs are flagged high-risk / merge-candidate in `lib/legacy-blog.ts`.
- Old-site URLs that exist only as redirects in the old `next.config` (6) are included in the map so no chain is created.
- Playwright suite drift (P1) hides regressions; it should be repaired before relying on `check:release`.
- Batch 2: preview and production now differ in redirect behaviour by design (preview = whole map, production = flag-gated). At cutover the env vars in `docs/cutover-rinon-cl.md` §2 must be set or the old URLs 404 in production; the AUTHORIZED preflight already requires `RINON_ENABLE_MIGRATION_REDIRECTS=true`, `RINON_REDIRECT_GSC_PENDING` remains Felipe's decision (CHALLENGE below). If Felipe prefers the redirects unconditional in production too, it is a one-line change in `next.config.ts` plus D-001 reconciliation.
- Batch 2: 7 destinations differ from Felipe's list (kept more specific owners); listed in `docs/redirects-sitio-viejo.md` §2 for confirmation.

## CHALLENGE

### Decision
"Live-observed URLs quarantined as REVIEW / GSC-PENDING must not be consolidated" combined with "no redirect until GSC reconciliation" means those 58 URLs would serve **404** on day one of the cutover, because none of them exists as a page in RINON 2.0.

### Evidence
- `lib/migration.ts` resolves them as `REVIEW` (no redirect); `app/[legacy]/page.tsx` only renders `legacyCommercialSlugs` → `notFound()` for the rest.
- 30 of the 58 are in the old site's `sitemap.xml` with priority 0.7–0.95 (e.g. `/camarotes-baratos`, `/literas`, `/camarotes-metalicos`, `/fabricante-camarotes-chile`, `/camarotes-mineria`).
- Felipe's cutover brief asks for a 301 for every old URL without an equivalent.

### User impact
A 404 loses the equity entirely (and the visitor); a 301 to the category owner keeps the visitor and passes most signals. Neither option is "keep as is", since the old page will no longer be served.

### Recommended alternative
Ship the map with the `gsc-pending` tier behind its own flag (done). At cutover, unless GSC data says a URL deserves a rebuilt page, set `RINON_REDIRECT_GSC_PENDING=true` so those URLs 301 instead of 404, and keep the ledger open for rebuilds afterwards.

### Files affected
`lib/legacy-redirects.ts`, `next.config.ts`, `scripts/check-legacy-redirects.mjs`, `docs/cutover-rinon-cl.md`, `docs/GSC_PENDING_URLS.csv` (unchanged), `lib/migration.ts` (unchanged).

### Risk of changing vs not changing
Changing: a URL with independent query equity gets merged into a hub (recoverable later by rebuilding the page and removing the redirect). Not changing: 58 previously indexed URLs return 404 from cutover onward (harder to recover).

## REQUEST FOR CHATGPT
- Reconcile the CHALLENGE above into `docs/AI_DECISION_LOG.md`.
- Decide whether the 9 failing Playwright tests are test drift (update expectations) or product regressions predating this branch.
- Confirm the design intent for "Elige cómo empezar." (ink vs. over-photo).

## NEXT
- Felipe: on the new preview, spot-check `curl -sI <preview>/rejas-metalicas-macul` (301 → `/rejas-metalicas`) and the 40-URL sample in `docs/redirects-sitio-viejo.md`; confirm the 7 destination decisions; then review at 320/375/1280 and merge to `main` if approved.
- Follow `docs/cutover-rinon-cl.md` (env vars → domain + TXT with Enrique → DNS check → promote → post-cutover checks).
- Fill `docs/needs-data.md` (GTM/Clarity ids, GSC export, DNS values, Supabase confirmation).

## REPORT — legibilidad antes/después (build servido, Chromium, reduced-motion)
Método: `scripts/audit-legibility.mjs` (Playwright + axe-core `color-contrast` + censo de `font-size` computado sobre nodos de texto visibles). "Antes" = `main` sin esta rama; "después" = HEAD de `claude/preparar-rinon-cl`. Estados de cliente: `[menu-movil]` (<900px), `[mega-productos]`/`[mega-servicios]` (≥1100px), `[form-paso1..3]` en `/cotizar`.

| Ruta | Ancho | Textos visibles | <12px antes → después | p/a/button/li <14px antes → después | axe color-contrast antes → después | Scroll horizontal antes → después |
| --- | --- | --- | --- | --- | --- | --- |
| `/ [menu-movil]` | 320 | 162 | 78 → 0 | 70 → 0 | 3 → 0 | no → no |
| `/` | 320 | 127 | 70 → 0 | 50 → 0 | 3 → 0 | no → no |
| `/camarotes` | 320 | 180 | 81 → 0 | 56 → 0 | 33 → 0 | no → no |
| `/rejas-metalicas` | 320 | 143 | 76 → 0 | 58 → 0 | 15 → 0 | no → no |
| `/cierres-perimetrales` | 320 | 183 | 84 → 0 | 57 → 0 | 34 → 0 | no → no |
| `/empresas` | 320 | 158 | 83 → 0 | 65 → 0 | 45 → 0 | no → no |
| `/cotizar [form-paso1]` | 320 | 77 | 63 → 0 | 37 → 0 | 9 → 0 | no → no |
| `/cotizar [form-paso2]` | 320 | 79 | 65 → 0 | 38 → 0 | 9 → 0 | no → no |
| `/cotizar [form-paso3]` | 320 | 79 | 66 → 0 | 40 → 0 | 11 → 0 | no → no |
| `/cotizar` | 320 | 73 | 59 → 0 | 37 → 0 | 9 → 0 | no → no |
| `/nosotros` | 320 | 115 | 67 → 0 | 54 → 0 | 22 → 0 | no → no |
| `/recursos/como-cotizar-rejas-metalicas` | 320 | 91 | 58 → 0 | 48 → 0 | 0 → 0 | no → no |
| `/ [menu-movil]` | 375 | 162 | 78 → 0 | 70 → 0 | 3 → 0 | no → no |
| `/` | 375 | 127 | 70 → 0 | 50 → 0 | 3 → 0 | no → no |
| `/camarotes` | 375 | 180 | 81 → 0 | 56 → 0 | 33 → 0 | no → no |
| `/rejas-metalicas` | 375 | 143 | 76 → 0 | 58 → 0 | 15 → 0 | no → no |
| `/cierres-perimetrales` | 375 | 183 | 84 → 0 | 57 → 0 | 34 → 0 | no → no |
| `/empresas` | 375 | 158 | 83 → 0 | 65 → 0 | 45 → 0 | no → no |
| `/cotizar [form-paso1]` | 375 | 77 | 63 → 0 | 37 → 0 | 9 → 0 | no → no |
| `/cotizar [form-paso2]` | 375 | 79 | 65 → 0 | 38 → 0 | 9 → 0 | no → no |
| `/cotizar [form-paso3]` | 375 | 79 | 66 → 0 | 40 → 0 | 11 → 0 | no → no |
| `/cotizar` | 375 | 73 | 59 → 0 | 37 → 0 | 9 → 0 | no → no |
| `/nosotros` | 375 | 115 | 67 → 0 | 54 → 0 | 22 → 0 | no → no |
| `/recursos/como-cotizar-rejas-metalicas` | 375 | 91 | 58 → 0 | 48 → 0 | 0 → 0 | no → no |
| `/ [mega-productos]` | 1280 | 166 | 91 → 0 | 57 → 0 | 3 → 0 | no → no |
| `/ [mega-servicios]` | 1280 | 149 | 77 → 0 | 56 → 0 | 3 → 0 | no → no |
| `/` | 1280 | 134 | 72 → 0 | 56 → 0 | 3 → 0 | no → no |
| `/camarotes` | 1280 | 196 | 92 → 0 | 62 → 0 | 34 → 0 | sí → no |
| `/rejas-metalicas` | 1280 | 151 | 79 → 0 | 64 → 0 | 15 → 0 | no → no |
| `/cierres-perimetrales` | 1280 | 199 | 95 → 0 | 63 → 0 | 35 → 0 | sí → no |
| `/empresas` | 1280 | 168 | 88 → 0 | 69 → 0 | 33 → 0 | no → no |
| `/cotizar [form-paso1]` | 1280 | 87 | 68 → 0 | 43 → 0 | 11 → 0 | no → no |
| `/cotizar [form-paso2]` | 1280 | 89 | 70 → 0 | 44 → 0 | 10 → 0 | no → no |
| `/cotizar [form-paso3]` | 1280 | 89 | 71 → 0 | 46 → 0 | 11 → 0 | no → no |
| `/cotizar` | 1280 | 83 | 64 → 0 | 43 → 0 | 11 → 0 | no → no |
| `/nosotros` | 1280 | 124 | 71 → 0 | 58 → 0 | 17 → 0 | no → no |
| `/recursos/como-cotizar-rejas-metalicas` | 1280 | 96 | 58 → 0 | 52 → 0 | 0 → 0 | no → no |
| `/soluciones` | 320 | 143 | 59 → 0 | 55 → 0 | 33 → 0 | no → no |
| `/camarote-nido` | 320 | 82 | 51 → 0 | 47 → 0 | 8 → 0 | no → no |
| `/camas-metalicas` | 320 | 102 | 58 → 0 | 53 → 0 | 16 → 0 | no → no |
| `/portones-metalicos` | 320 | 143 | 76 → 0 | 58 → 0 | 20 → 0 | no → no |
| `/mallas-3d` | 320 | 133 | 72 → 0 | 58 → 0 | 27 → 0 | no → no |
| `/estructuras-metalicas` | 320 | 144 | 61 → 0 | 57 → 0 | 30 → 0 | no → no |
| `/fabricacion-metalica` | 320 | 99 | 50 → 0 | 49 → 0 | 12 → 0 | no → no |
| `/pintura-electrostatica` | 320 | 162 | 80 → 0 | 57 → 0 | 33 → 0 | no → no |
| `/contacto` | 320 | 93 | 59 → 0 | 41 → 0 | 17 → 0 | no → no |
| `/recursos` | 320 | 110 | 72 → 0 | 47 → 0 | 16 → 0 | no → no |
| `/preguntas-frecuentes` | 320 | 68 | 41 → 0 | 33 → 0 | 4 → 0 | no → no |
| `/mobiliario-institucional` | 320 | 82 | 51 → 0 | 47 → 0 | 8 → 0 | no → no |
| `/soluciones` | 375 | 143 | 59 → 0 | 55 → 0 | 33 → 0 | no → no |
| `/camarote-nido` | 375 | 82 | 51 → 0 | 47 → 0 | 8 → 0 | no → no |
| `/camas-metalicas` | 375 | 102 | 58 → 0 | 53 → 0 | 16 → 0 | no → no |
| `/portones-metalicos` | 375 | 143 | 76 → 0 | 58 → 0 | 20 → 0 | no → no |
| `/mallas-3d` | 375 | 133 | 72 → 0 | 58 → 0 | 27 → 0 | no → no |
| `/estructuras-metalicas` | 375 | 144 | 61 → 0 | 57 → 0 | 30 → 0 | no → no |
| `/fabricacion-metalica` | 375 | 99 | 50 → 0 | 49 → 0 | 12 → 0 | no → no |
| `/pintura-electrostatica` | 375 | 162 | 80 → 0 | 57 → 0 | 33 → 0 | no → no |
| `/contacto` | 375 | 93 | 59 → 0 | 41 → 0 | 17 → 0 | no → no |
| `/recursos` | 375 | 110 | 72 → 0 | 47 → 0 | 16 → 0 | no → no |
| `/preguntas-frecuentes` | 375 | 68 | 41 → 0 | 33 → 0 | 5 → 0 | no → no |
| `/mobiliario-institucional` | 375 | 82 | 51 → 0 | 47 → 0 | 8 → 0 | no → no |
| `/soluciones` | 1280 | 148 | 59 → 0 | 59 → 0 | 32 → 0 | no → no |
| `/camarote-nido` | 1280 | 87 | 51 → 0 | 51 → 0 | 8 → 0 | no → no |
| `/camas-metalicas` | 1280 | 107 | 58 → 0 | 57 → 0 | 13 → 0 | no → no |
| `/portones-metalicos` | 1280 | 151 | 79 → 0 | 64 → 0 | 18 → 0 | no → no |
| `/mallas-3d` | 1280 | 143 | 77 → 0 | 62 → 0 | 20 → 0 | no → no |
| `/estructuras-metalicas` | 1280 | 154 | 66 → 0 | 61 → 0 | 20 → 0 | no → no |
| `/fabricacion-metalica` | 1280 | 104 | 50 → 0 | 53 → 0 | 10 → 0 | no → no |
| `/pintura-electrostatica` | 1280 | 170 | 83 → 0 | 63 → 0 | 34 → 0 | sí → no |
| `/contacto` | 1280 | 100 | 61 → 0 | 47 → 0 | 14 → 0 | no → no |
| `/recursos` | 1280 | 115 | 72 → 0 | 51 → 0 | 16 → 0 | no → no |
| `/preguntas-frecuentes` | 1280 | 73 | 41 → 0 | 37 → 0 | 5 → 0 | no → no |
| `/mobiliario-institucional` | 1280 | 87 | 51 → 0 | 51 → 0 | 8 → 0 | no → no |
| **Total (73 filas)** | | 8826 | **4904 → 0** | **3793 → 0** | **1219 → 0** | **3 → 0 filas** |

`small` < 13px: 0 en todas las filas después (antes: 1–16 por fila).

## Redirects verificados en build local
Build con `RINON_ENABLE_MIGRATION_REDIRECTS=true` y `RINON_REDIRECT_GSC_PENDING=true`, servido en local: **398/398** URLs → 301 en un salto → destino 200; 138 rutas de RINON 2.0 siguen en 200; `/no-existe` → 404; query string preservada. Muestra de 40 para repetir contra `https://rinon.cl` tras el corte:

| URL antigua | Destino | Tier |
| --- | --- | --- |
| `/cama-alta-con-escritorio` | `/cama-alta` | family |
| `/camarote-dos-plazas-abajo` | `/camarote-2-plazas` | family |
| `/cama-alta-2-plazas-con-escritorio` | `/camarote-con-escritorio` | family |
| `/camarote-de-acero` | `/camarotes` | family |
| `/barreras-peatonales` | `/cierres-perimetrales` | family |
| `/barandas-metalicas` | `/estructuras-metalicas` | family |
| `/metalurgica-rinon` | `/fabricacion-metalica` | family |
| `/mallas-separadoras-bodegas` | `/mallas-separadoras` | family |
| `/pintura-electrostatica-antofagasta` | `/pintura-electrostatica` | family |
| `/fabricante-portones-metalicos-chile` | `/portones-metalicos` | family |
| `/fabricante-rejas-metalicas-chile` | `/rejas-metalicas` | family |
| `/soldadura-metalica-santiago` | `/soldadura-mig` | gsc-pending |
| `/camarote-con-escritorio-calama` | `/camarote-con-escritorio` | family |
| `/camarotes-adultos` | `/camarotes` | gsc-pending |
| `/cercos-para-estacionamientos` | `/cierres-perimetrales` | family |
| `/fabricante-estructuras-metalicas-chile` | `/estructuras-metalicas` | family |
| `/mallas-separadoras-industriales` | `/mallas-separadoras` | gsc-pending |
| `/pintura-electrostatica-el-bosque` | `/pintura-electrostatica` | family |
| `/portones-electricos` | `/portones-metalicos` | family |
| `/rejas-decorativas` | `/rejas-metalicas` | gsc-pending |
| `/camarote-con-escritorio-dormitorio-compartido` | `/camarote-con-escritorio` | family |
| `/camarotes-buin` | `/camarotes` | family |
| `/cercos-perimetrales-castro` | `/cierres-perimetrales` | family |
| `/estructuras-metalicas-a-pedido` | `/estructuras-metalicas` | family |
| `/pintura-electrostatica-la-pintana` | `/pintura-electrostatica` | gsc-pending |
| `/portones-temuco` | `/portones-metalicos` | family |
| `/rejas-metalicas-colina` | `/rejas-metalicas` | family |
| `/camarote-con-escritorio-habitacion-pequena` | `/camarote-con-escritorio` | family |
| `/camarotes-copiapo` | `/camarotes` | family |
| `/cercos-perimetrales-curico` | `/cierres-perimetrales` | family |
| `/escaleras-metalicas` | `/estructuras-metalicas` | family |
| `/pintura-electrostatica-maipu` | `/pintura-electrostatica` | gsc-pending |
| `/portones-batientes` | `/portones-metalicos` | family |
| `/rejas-metalicas-independencia` | `/rejas-metalicas` | family |
| `/camarote-con-escritorio-la-florida` | `/camarote-con-escritorio` | family |
| `/camarotes-forestales` | `/camarotes` | family |
| `/cercos-perimetrales-la-cisterna` | `/cierres-perimetrales` | family |
| `/pintura-electrostatica-puente-alto` | `/pintura-electrostatica` | family |
| `/portones-la-serena` | `/portones-metalicos` | family |
| `/rejas-metalicas-la-serena` | `/rejas-metalicas` | family |

