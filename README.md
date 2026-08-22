# RINON 2.0 — isolated Next.js implementation

Current release candidate: `1.0.0-rc.7` / Product + Growth RC.  
Current mode: **SAFE PRE-CUTOVER**.

This repository is the single source of truth for the RINON 2.0 site. Production `rinon.cl` remains untouched until explicit cutover approval.

## Deployment contract — mandatory

RINON must be reviewed and released as the real Next.js application. Do not use HTML snapshots, Supabase page proxies, rewritten static exports or alternate asset origins as a substitute for staging.

A release is valid only when all of these are true:

1. `npm run build` succeeds from the exact commit being reviewed.
2. `npm run qa:served` succeeds against `next start` from that build.
3. `npm run qa:browser` validates the rendered application in Chromium.
4. The review URL serves HTML, CSS, JavaScript, fonts and images from the same deployment origin with correct MIME types.
5. Critical routes return HTTP 200; unknown routes return 404.
6. Preview remains `noindex, nofollow` and robots blocks crawling.
7. Migration, SEO/CRO, visual provenance, secure attachments, structured CRM and production preflight contracts pass.
8. The deployment contains no legacy preview proxy dependency.
9. The exact deployment that passes QA is the deployment promoted; do not rebuild through a different pipeline for production.

The CI workflow `.github/workflows/ci.yml` enforces build + served-build + Chromium gates on every push and pull request to `main`.

## Runtime safety defaults

- indexation OFF unless `RINON_INDEXABLE=true`;
- commercial migration 301s OFF unless `RINON_ENABLE_MIGRATION_REDIRECTS=true`;
- historical blog redirects OFF unless separately allowlisted and enabled;
- URL inventory completion OFF until live crawl + Search Console reconciliation;
- lead writes OFF unless `RINON_LEAD_WRITE_ENABLED=true` and release/controlled-preview gates allow them;
- production tracking OFF until configured, authorized and consented;
- current-site reference photography OFF unless `RINON_ALLOW_LEGACY_REFERENCE_IMAGES=true`;
- admin/revenue operations OFF unless explicitly configured;
- legal approval is required by production preflight before authorized cutover.

## Public quote intake

`/cotizar` is a three-step progressive quote flow. It can attach up to 3 JPEG/PNG/WebP/PDF files of 5 MB each.

Security contract:
- same-origin public write validation;
- actual multipart byte-size validation;
- file count/size/MIME allowlist on client and server;
- lead creation before attachment storage;
- private Supabase bucket, service-role server writes only;
- UUID object paths rather than user filenames;
- rollback of partial multi-file storage;
- authenticated, no-store admin reads only.

The public Supabase intake source is versioned under `supabase/functions/rinon-public-intake/index.ts`; it uses an explicit field whitelist, re-sanitizes CRM data and preserves persistent rate limiting.

## CRM / attribution

New quote submissions persist structured category, subcategory, quantity, location, target date, installation/plan state, use, surface state, client/company and consented attribution fields while retaining the readable legacy message. Admin displays these fields alongside pipeline state and private attachments.

## SEO migration safety

`docs/URL-MIGRATION-INVENTORY.md` is deliberately incomplete until a full live crawl is reconciled with exported Search Console landing-page/query data. Live-observed organic URLs are protected as `REVIEW / GSC-PENDING` before broad family redirect rules. No production cutover may set `RINON_URL_INVENTORY_COMPLETE=true` before that reconciliation.

## Current public baseline

- WhatsApp/phone: +56 9 7589 3742;
- operating address: Portezuelo 1506, San Bernardo, Región Metropolitana;
- canonical production base: `https://rinon.cl`.

## Admin

`/admin` is authenticated, noindex and contains analytics, pipeline status, structured lead qualification, campaign attribution and private attachment access. `ADMIN_PASSWORD` is mandatory whenever admin is enabled.

## QA

Normal release validation:

```bash
npm install
npm run check:release
```

The main gates are:

```bash
npm run qa:static
npm run build
npm run qa:served
npm run qa:browser
```

`qa:served` checks real HTTP responses including critical pages, CSS, JavaScript, images, fonts, UTF-8 integrity, robots and 404 behavior. A green `next build` alone is not release approval.
