# RINON 2.0 — isolated Next.js implementation

Current release candidate: `1.0.0-rc.3` / Engineered Simplicity V5.5 remediation.

This is the current product source inside the Growth OS workspace. It is not connected to production and must not be deployed to `main` without release approval.

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
Run after dependencies are available:

```bash
npm run qa:static
npm run build
```

`qa:static` and `check:release` must both pass source-level checks. A successful `next build` is still required in a dependency-complete preview/CI environment before release.
