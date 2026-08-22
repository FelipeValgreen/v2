# RINON 2.0 — Release / Cutover Runbook

**Current state:** SAFE PRE-CUTOVER.  
**Production domain:** `https://rinon.cl`.  
**Rule:** no domain, DNS, indexation, migration redirect, production lead-write or production tracking change without explicit cutover authorization.

## 1. Hard prerequisites

All must be true before a cutover can be scheduled:

- [ ] explicit production cutover authorization has been given;
- [ ] `MIGRATION_GSC_REVIEW_PENDING_COUNT=0`;
- [ ] full current-site crawl reconciled with Search Console landing-page/query export;
- [ ] `RINON_URL_INVENTORY_COMPLETE=true` is justified by the completed inventory, not set to bypass a gate;
- [ ] every approved 301 has a 200 destination and intent-preserving content;
- [ ] legal identity/content approved (`RINON_LEGAL_APPROVED=true`);
- [ ] final visual acceptance completed at desktop/tablet/mobile;
- [ ] no known broken assets, duplicate IDs, inaccessible navigation or form defects;
- [ ] Supabase lead intake/storage contract verified;
- [ ] analytics/consent configuration verified;
- [ ] latest exact Git commit has green Vercel build and release gates;
- [ ] rollback target/previous production state recorded.

If any prerequisite is false: **do not cut over.**

## 2. T-7 to T-3 days — SEO and content lock

1. Export Search Console pages + queries for the agreed pre-migration comparison window.
2. Save baseline totals and top landing/query owners.
3. Crawl live `rinon.cl` and record URL, status, canonical, title, H1 and internal inlinks.
4. Resolve every `REVIEW / GSC-PENDING` migration row.
5. Rebuild/keep any page whose distinct organic intent warrants preservation.
6. Verify final title/description/H1/canonical/schema/internal links.
7. Freeze structural URL changes unless a release blocker is found.

## 3. T-3 to T-1 days — release candidate

Run against the exact candidate commit:

```bash
npm install
npm run check:release
```

Confirm:
- migration contract green;
- SEO/CRO contract green;
- visual provenance green;
- secure attachment contract green;
- structured CRM contract green;
- production preflight green in SAFE PRE-CUTOVER;
- Next build green;
- served-build green;
- Chromium green;
- staging `robots.txt` blocks crawling;
- staging pages remain `noindex, nofollow`;
- no fatal/error runtime logs.

Manually review at minimum:
`/`, `/camarotes`, `/cierres-perimetrales`, `/rejas-metalicas`, `/portones-metalicos`, `/estructuras-metalicas`, `/fabricacion-metalica`, `/pintura-electrostatica`, `/empresas`, `/nosotros`, `/contacto`, `/cotizar`.

## 4. T-1 day — production configuration rehearsal

Do **not** change production yet. Prepare the exact authorized values:

- `RINON_CUTOVER_AUTHORIZED=true`
- `RINON_INDEXABLE=true`
- `RINON_ENABLE_MIGRATION_REDIRECTS=true`
- `RINON_ENABLE_BLOG_REDIRECTS=true`
- `RINON_LEAD_WRITE_ENABLED=true`
- `RINON_PRODUCTION_TRACKING_ENABLED=true`
- `RINON_URL_INVENTORY_COMPLETE=true`
- `RINON_LEGAL_APPROVED=true`
- required Supabase server variables
- authorized admin/revenue flags only if intentionally launching them

The production preflight must fail if GSC reviews remain or any required flag/configuration is missing.

## 5. T0 — authorized cutover

Only after explicit authorization:

1. Record current production destination/configuration for rollback.
2. Apply the approved production environment values.
3. Build/deploy the **same reviewed commit**; do not introduce code changes during domain switch.
4. Attach/switch `rinon.cl` only through the authorized hosting/domain procedure.
5. Verify TLS and canonical host.
6. Check `https://rinon.cl/robots.txt` allows intended crawling.
7. Check production pages emit indexable robots/canonical metadata.
8. Test representative approved legacy redirects with real HTTP requests; verify one-hop 301 to a 200 owner.
9. Test unknown URL = true 404.
10. Submit one controlled quote including an allowed private attachment; verify lead, structured fields and admin-only attachment access.
11. Verify phone/WhatsApp/maps/Waze links.
12. Verify consent behavior before analytics vendor load.
13. Verify production analytics events after consent.

## 6. Immediate smoke set

HTTP 200 expected:
- `/`
- `/soluciones`
- `/camarotes`
- `/camas-metalicas`
- `/camas-balinesas`
- `/cierres-perimetrales`
- `/rejas-metalicas`
- `/portones-metalicos`
- `/mallas-3d`
- `/mallas-separadoras`
- `/estructuras-metalicas`
- `/fabricacion-metalica`
- `/soldadura-mig`
- `/corte-metalico`
- `/pintura-electrostatica`
- `/instalacion`
- `/reparaciones-metalicas`
- `/empresas`
- `/nosotros`
- `/contacto`
- `/cotizar`

Also verify all preserved legacy product URLs in the migration contract remain 200.

## 7. Rollback triggers

Rollback/disable risky flags immediately if any occurs:

- widespread 5xx;
- CSS/JS/assets fail on production;
- canonical points to wrong host;
- indexable pages accidentally `noindex` or robots blocks production;
- material set of legacy URLs 404 or redirect incorrectly;
- redirect loop/chain;
- quote writes fail or expose private files;
- consent gate fails and tracking loads before authorization;
- severe mobile navigation/form regression;
- domain/TLS instability.

SEO ranking movement alone is not an instant rollback trigger unless caused by an identifiable technical migration defect.

## 8. Rollback method

1. Route domain back to the recorded previous production target or last known-good deployment.
2. Disable migration/blog redirects if they are implicated.
3. If write path is implicated, set `RINON_LEAD_WRITE_ENABLED=false` while keeping contact alternatives available.
4. If analytics consent/tracking is implicated, set `RINON_PRODUCTION_TRACKING_ENABLED=false`.
5. Preserve logs/evidence before rebuilding.
6. Fix on staging and repeat all release gates before attempting another cutover.

Do not delete Search Console properties, analytics history, old deployment evidence or Supabase lead records during rollback.

## 9. T+1 / T+3 / T+7

Daily checks:
- crawl errors / 404s;
- redirect correctness;
- index coverage;
- sitemap processing;
- organic landing pages and queries;
- clicks/impressions/CTR/average position vs baseline;
- quote submissions;
- WhatsApp/phone events;
- conversion rate by landing/category;
- file-upload failures;
- runtime 4xx/5xx/errors.

Investigate losses by URL/query before making broad content changes.

## 10. T+30 / T+60 / T+90

Compare against pre-migration baseline:
- indexed commercial owner count;
- Top 3 / Top 10 / Top 20 query distribution;
- non-brand clicks and impressions;
- CTR by key page/query;
- local/commercial visibility;
- qualified organic leads;
- organic quote conversion rate;
- assisted WhatsApp/phone conversions;
- lead-to-quote and quote-to-win progression when CRM data is mature.

Success is **not** merely “traffic did not fall”. Success is protection of existing equity plus increased qualified organic conversion.
