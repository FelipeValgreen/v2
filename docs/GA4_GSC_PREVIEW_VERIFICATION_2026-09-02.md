# GA4 fail-closed + GSC env support verification

Date: 2026-09-02  
Branch: `codex/rc7`  
Repo used: `/Users/valgreen/code/rinon-v2`  
Previous handoff path discrepancy: `/Users/valgreen/Documents/CLIENTES/RINON/rinon-v2` does not exist on this machine.

## Scope

- GA4 wired only through `NEXT_PUBLIC_GA_ID`.
- Runtime gate is affirmative and fail-closed: load only when `NEXT_PUBLIC_GA_ID` is defined and `VERCEL_ENV === "production"`.
- Preview/local keep GA4 dark because the variable is absent there.
- GSC supports `NEXT_PUBLIC_GSC_VERIFICATION`, but when absent it serves the current token:
  `DG5fIXNQgMGRpHGC0RwK-R3QvIyx20qjrQQdMRqCymQ`.
- No GSC env var was defined in preview or local.
- No `LocalBusiness` enrichment was added because repo evidence for `image`, `geo`, `openingHoursSpecification` and `sameAs` is still missing.

## Commits

- `f9c5a28` `feat: add fail-closed GA4 gate`
- `a840a45` `feat: add GSC env fallback support`

## Local QA

- `npm run qa:static` → PASS
- `npm run build` → PASS
- `npm run qa:browser` → PASS (`63 passed`)

## Preview deployment used for acceptance

- Created: 2026-09-02 17:10:54 CLT
- URL: `https://rinon-v2-fpdvu66wr-filipovalverde-5673s-projects.vercel.app`
- `vercel inspect` status: `Ready`
- `npm run qa:browser:remote` with `RINON_REMOTE_BASE_URL` set to the exact deployment URL → PASS (`63 passed`)

## GSC verification served by preview

- `/` → `DG5fIXNQgMGRpHGC0RwK-R3QvIyx20qjrQQdMRqCymQ`
- `/cotizar` → `DG5fIXNQgMGRpHGC0RwK-R3QvIyx20qjrQQdMRqCymQ`
- `/rejas-metalicas` → `DG5fIXNQgMGRpHGC0RwK-R3QvIyx20qjrQQdMRqCymQ`

The new token `lCFMIIVsso0tKtwMRjnZWQs1l2FbYnlJPWpqxsqjj_Y` is not served anywhere in preview.

## Network acceptance evidence

Filter applied literally:

```text
hostname === googletagmanager.com OR hostname === google-analytics.com OR hostname === region1.google-analytics.com OR hostname endsWith .google-analytics.com
```

Counts:

```text
ROUTE /
DOCUMENT 200 x-vercel-cache=HIT age=142
MATCH_COUNT 0

ROUTE /cotizar
DOCUMENT 200 x-vercel-cache=HIT age=144
MATCH_COUNT 0

ROUTE /rejas-metalicas
DOCUMENT 200 x-vercel-cache=HIT age=146
MATCH_COUNT 0
```

The complete captured network logs for those three routes contained no requests to:

- `google-analytics.com`
- `*.google-analytics.com`
- `region1.google-analytics.com`
- `googletagmanager.com`

## SEO/AEO signals rechecked before migration

Live `rinon.cl` still serves indexable canonical pages for the key money routes:

- `/rejas-metalicas`
- `/estructuras-metalicas`
- `/cotizar`

The preview stayed pre-cutover:

- no indexation activation
- no redirect activation
- no lead activation
- no DNS or production-domain changes

## Blocked by

- Repo path discrepancy documented above; work proceeded only from the verified path `/Users/valgreen/code/rinon-v2`.
- GSC token replacement remains blocked until the owner identifies which Search Console property uses each token and which property contains the **58** `GSC-pending` URLs.
- `LocalBusiness` enrichment remains blocked until exact Google Business Profile values are provided for `image`, `geo` (lat/lng), `openingHoursSpecification` and `sameAs`.
- Vercel preview warned that `package.json` declares `node: "24.x"` while the platform asked for Node 22; this did not block the preview, but it is a platform follow-up item.
