# RINON 2.0 — URL Migration Inventory

**Status:** cutover baseline · 2026-08-27.  
**Rule:** every known public URL requires an explicit migration decision.  
**Completeness:** deliberately incomplete until a full live crawl is reconciled with exported Google Search Console landing-page + query data. Until then `RINON_URL_INVENTORY_COMPLETE=false` is mandatory.

## Sources of truth

- `lib/migration.ts` — executable migration resolver and quarantine set.
- `docs/GSC_PENDING_URLS.csv` — **canonical ledger of every live-observed URL that still requires Search Console reconciliation**.
- `docs/SEO_MIGRATION_MATRIX.csv` — broader planning matrix for durable owners, rebuilds and candidate consolidations.
- this document — policy, intent families and cutover procedure.

Build QA requires exact parity between the live-observed quarantine in `lib/migration.ts` and every row of `docs/GSC_PENDING_URLS.csv`. Do not duplicate that complete list manually in this document.

## Decision legend

- **KEEP 200** — exact URL and intent remain live.
- **REBUILD** — dedicated RINON 2.0 intent owner.
- **301 candidate** — plausible consolidation, never enabled before reconciliation.
- **REVIEW / GSC-PENDING** — no redirect until organic performance and claim risk are reviewed.
- **410** — none approved.

When Search Console evidence is unavailable, **default to preserving** a proven organic entry point rather than deleting or broadly redirecting it.

## 1. Durable commercial URLs — KEEP 200

`/`, `/camarotes`, `/camarote-nido`, `/camarote-triple`, `/camarote-doble`, `/cama-alta`, `/camarote-titanic`, `/camarote-1-5-plazas`, `/camarote-desmontable`, `/cama-dos-plazas-con-cajon`, `/camarote-2-plazas`, `/cama-institucional-metalica`, `/cama-loft-metalica`, `/cama-loft-con-escritorio`, `/mobiliario-institucional`, `/camarote-con-escritorio`, `/cierres-perimetrales`, `/mallas-3d`, `/rejas-metalicas`, `/portones-metalicos`, `/estructuras-metalicas`, `/fabricacion-metalica`, `/pintura-electrostatica`.

## 2. Dedicated RINON 2.0 intent owners — REBUILD

`/camas-metalicas`, `/camas-balinesas`, `/mesas-metalicas`, `/escritorios-metalicos`, `/mallas-separadoras`, `/soldadura-mig`, `/corte-metalico`, `/instalacion`, `/reparaciones-metalicas`.

## 3. Live-observed URLs — REVIEW / GSC-PENDING

Current protected count: **58**.

The complete canonical list and candidate owner for each route lives in:

`docs/GSC_PENDING_URLS.csv`

The quarantine currently covers these intent groups:

- generic, price, B2B, institutional and geographic camarote/litera pages;
- three live camarote-con-escritorio variants;
- geographic, price, residential and use-specific reja pages;
- industrial portón intent;
- B2B/parcel/regional cercos;
- industrial mallas separadoras;
- Santiago welding intent;
- multiple local powder-coating pages.

Every one of these routes executes through the `REVIEW` guard **before** any broad family redirect. No wildcard 301 may override the ledger.

### Critical audit anchors

These representative URLs remain written explicitly here because production preflight uses them as audit anchors in addition to the canonical ledger:

- `/portones-industriales`
- `/mallas-separadoras-industriales`
- `/cierre-perimetral-industrial`
- `/cercos-metalicos-santiago`
- `/reja-metalica-santiago`
- `/soldadura-metalica-santiago`
- `/pintura-electrostatica-zona-sur-santiago`

Their presence here is **not** approval for a redirect. Live-observed anchors remain governed by `docs/GSC_PENDING_URLS.csv`; non-ledger aliases remain candidate-only until reconciliation.

**Release rule:** all rows in `docs/GSC_PENDING_URLS.csv` must become explicitly approved KEEP/REBUILD/301 decisions before `MIGRATION_GSC_REVIEW_PENDING_COUNT=0` and before `RINON_URL_INVENTORY_COMPLETE=true` can be justified.

## 4. Lower-risk 301 candidates after protected exceptions

The resolver still contains candidate family mappings for lower-risk aliases. These are not approval to redirect in production; they become actionable only after final reconciliation.

### Camarotes

Generic synonyms and unprotected modifiers may consolidate to `/camarotes` only after the quarantine has been resolved.

### Cierres / cercos

Unprotected `cercos-perimetrales-*`, `cercos-metalicos-*`, `cercos-para-*` and related commercial aliases may consolidate to `/cierres-perimetrales` when intent equivalence is confirmed.

### Mallas

Unprotected `/mallas-separadoras-*` aliases may consolidate to `/mallas-separadoras`; `/mallas-3d` remains an independent owner.

### Rejas

Unprotected geographic/material/use aliases may consolidate to `/rejas-metalicas` only after live-observed exceptions are resolved.

### Portones

Unprotected model/sector aliases may consolidate to `/portones-metalicos`; automation/motor claims are never inherited automatically.

### Fabricación / estructuras / servicios

- structures aliases → candidate `/estructuras-metalicas`
- `/metalurgica-rinon` → candidate `/fabricacion-metalica`
- welding aliases → candidate `/soldadura-mig`
- powder-coating geographic aliases → candidate `/pintura-electrostatica`

`/barreras-peatonales` remains explicit REVIEW until offer + GSC evidence support a decision.

## 5. Approved editorial redirects — flag gated

- `/blog/como-cotizar-rejas-metalicas` → `/recursos/como-cotizar-rejas-metalicas`
- `/blog/tipos-de-cierres-perimetrales` → `/recursos/tipos-de-cierres-perimetrales`
- `/blog/porton-corredizo-vs-batiente` → `/recursos/porton-corredizo-vs-batiente`
- `/blog/mezzanine-metalico-bodega-guia` → `/recursos/mezzanine-metalico-bodega-guia`
- `/blog/proveedor-camarotes-empresas` → `/recursos/proveedor-camarotes-empresas`
- `/blog/como-elegir-reja-metalica-frontis` → `/recursos/como-elegir-reja-metalica-frontis`

These remain disabled until authorized cutover.

## 6. Claim-risk editorial URLs — REVIEW

`/blog/cuanto-cuesta-camarote-chile`, `/blog/cuanto-cuesta-cierre-perimetral-chile`, `/blog/cuanto-cuesta-porton-automatico-chile`, `/blog/altura-reja-casa-seguridad`, `/blog/camarote-nino-6-anos`, `/blog/camarote-para-adulto-mayor`, `/blog/pintura-electrostatica-que-es`, `/blog/camarotes-mineria-que-exige-cada-faena`.

No broad redirect is approved for these pages because price, safety, technical or compliance claims may be stale or unsupported.

## Cutover completion procedure

1. Export Google Search Console landing pages + queries for the pre-migration comparison window.
2. Crawl complete live `rinon.cl`: URL, status, canonical, title, H1 and internal inlinks.
3. Reconcile crawl + GSC + `docs/GSC_PENDING_URLS.csv` + this inventory.
4. Review every URL with clicks, impressions, backlinks or material commercial intent.
5. Resolve every row in `docs/GSC_PENDING_URLS.csv` to an approved release decision and update `lib/migration.ts` accordingly.
6. Require `MIGRATION_GSC_REVIEW_PENDING_COUNT=0` and exact ledger parity.
7. Verify each approved 301 destination is a 200 intent-equivalent owner and produces no chain/loop.
8. Run migration, SEO/CRO, visual, attachment, CRM, served-build and browser gates on the exact release candidate.
9. Only then may `RINON_URL_INVENTORY_COMPLETE=true` be considered.
10. Authorize cutover/indexation separately.

**No completed Search Console reconciliation + no zero pending count + no `RINON_URL_INVENTORY_COMPLETE=true` means no authorized production cutover.**
