# RINON 2.0 — isolated Next.js implementation

Current release candidate: `1.0.0-rc.3` / Engineered Simplicity V5.5 remediation.

This repository is the single source of truth for the RINON 2.0 site. Production `rinon.cl` remains untouched until explicit cutover approval.

## Deployment contract — mandatory

RINON must be reviewed and released as the real Next.js application. Do not use HTML snapshots, Supabase page proxies, rewritten static exports or alternate asset origins as a substitute for staging.

A release is valid only when all of these are true:

1. `npm run build` succeeds from the exact commit being reviewed.
2. `npm run qa:served` succeeds against `next start` from that build.
3. The review URL serves HTML, CSS, JavaScript, fonts and images from the same deployment origin with correct MIME types.
4. Critical routes return HTTP 200; unknown routes return 404.
5. Preview remains `noindex, nofollow`.
6. The rendered Home preserves the approved RINON visual-system markers and hero content.
7. The deployment contains no `rinon-preview`, Supabase proxy or `/functions/v1/` asset references.
8. The exact deployment that passes QA is the deployment promoted; do not rebuild through a different pipeline for production.

The CI workflow `.github/workflows/ci.yml` enforces the build + served-build gate on every push and pull request to `main`.

## Runtime safety defaults

- indexation OFF unless `RINON_INDEXABLE=true`;
- legacy migration 301s OFF unless `RINON_ENABLE_MIGRATION_REDIRECTS=true`;
- historical blog redirects OFF unless separately allowlisted and enabled;
- lead writes OFF unless `RINON_LEAD_WRITE_ENABLED=true`;
- production tracking OFF unless configured/consented;
- current-site reference photography OFF unless `RINON_ALLOW_LEGACY_REFERENCE_IMAGES=true`;
- powder-coating public launch OFF unless operationally approved;
- legal pages noindex until identity + `RINON_LEGAL_APPROVED=true`.

## Current public baseline

- WhatsApp/phone: current production contact, with environment overrides available;
- operating address: Portezuelo 1506, San Bernardo.

## Admin

`/admin` preserves the current operational dashboard pattern and adds pipeline status handling on the existing `leads.estado` field. `ADMIN_PASSWORD` is mandatory. Admin routes remain noindex.

## QA

Normal release validation:

```bash
npm install
npm run build
npm run qa:served
```

To validate a public staging URL with the same contract:

```bash
npm run qa:remote -- https://your-staging-host.example
```

`qa:served` starts the built application and checks the actual HTTP responses, including critical pages, CSS, JavaScript, images, fonts, UTF-8 integrity, robots and 404 behavior. A green `next build` alone is not release approval.
