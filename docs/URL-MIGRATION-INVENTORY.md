# RINON 2.0 — URL Migration Inventory

**Status:** cutover baseline · 2026-08-21.  
**Rule:** every known public URL needs an explicit migration decision. No listed decision changes without SEO review.  
**Completeness:** this inventory combines the existing migration contract, preserved commercial catalog and URLs discovered in the current public site/search crawl. It is deliberately **not marked complete** until a fresh full-site crawl is reconciled with exported Google Search Console landing-page/query data. Until then `RINON_URL_INVENTORY_COMPLETE=false` is mandatory.

## Decision legend

- **KEEP 200** — exact URL and intent remain live.
- **REBUILD** — dedicated RINON 2.0 intent owner.
- **301** — permanent redirect to the closest equivalent owner.
- **REVIEW / GSC-PENDING** — no redirect decision until Search Console landing-page/query performance and claim risk are reviewed.
- **410** — intentionally removed with no equivalent. None approved at this stage.

## 1. Durable commercial URLs — KEEP 200

| URL | Decision | Intent |
|---|---|---|
| `/` | KEEP 200 | Fabricación metálica / brand hub |
| `/camarotes` | KEEP 200 | Camarotes y camas |
| `/camarote-nido` | KEEP 200 | Camarote nido |
| `/camarote-triple` | KEEP 200 | Camarote triple |
| `/camarote-doble` | KEEP 200 | Camarote doble |
| `/cama-alta` | KEEP 200 | Cama alta |
| `/camarote-titanic` | KEEP 200 | Camarote reforzado / Titanic |
| `/camarote-1-5-plazas` | KEEP 200 | Camarote 1,5 plazas |
| `/camarote-desmontable` | KEEP 200 | Camarote desmontable |
| `/cama-dos-plazas-con-cajon` | KEEP 200 | Cama dos plazas con cajón |
| `/camarote-2-plazas` | KEEP 200 | Camarote con cama doble |
| `/cama-institucional-metalica` | KEEP 200 | Cama institucional |
| `/cama-loft-metalica` | KEEP 200 | Cama loft |
| `/cama-loft-con-escritorio` | KEEP 200 | Cama loft con escritorio |
| `/mobiliario-institucional` | KEEP 200 | Compra institucional |
| `/camarote-con-escritorio` | KEEP 200 | Camarote con escritorio |
| `/cierres-perimetrales` | KEEP 200 | Cierres perimetrales |
| `/mallas-3d` | KEEP 200 | Panel/malla 3D |
| `/rejas-metalicas` | KEEP 200 | Rejas metálicas |
| `/portones-metalicos` | KEEP 200 | Portones metálicos |
| `/estructuras-metalicas` | KEEP 200 | Estructuras a medida |
| `/fabricacion-metalica` | KEEP 200 | Fabricación a medida |
| `/pintura-electrostatica` | KEEP 200 | Pintura electrostática |

## 2. Dedicated RINON 2.0 intent owners — REBUILD

`/camas-metalicas`, `/camas-balinesas`, `/mesas-metalicas`, `/escritorios-metalicos`, `/mallas-separadoras`, `/soldadura-mig`, `/corte-metalico`, `/instalacion`, `/reparaciones-metalicas`.

These pages exist to own materially different product/service intent instead of sending all organic traffic into generic category hubs.

## 3. Live-observed commercial URLs — REVIEW / GSC-PENDING

The following URLs were directly observed as live/indexable or prominently linked from the current public site during the 2026-08-21 pre-cutover crawl. They are deliberately quarantined **before** broad family redirect rules in `lib/migration.ts`. No blanket 301 is allowed until their Google Search Console landing-page/query performance is reconciled.

| Current URL | Candidate owner | Why it is protected |
|---|---|---|
| `/literas` | `/camarotes` | Live synonym page with its own SERP-targeted content. |
| `/camarotes-baratos` | `/camarotes` | Live price/value intent; may own non-brand queries and carries claim-risk content. |
| `/camarotes-faenas` | `/camarotes` | Live B2B/use-case intent. |
| `/camarotes-salmoneras` | `/camarotes` | Live sector intent with technical/claim risk. |
| `/camarotes-mineria` | `/camarotes` | Prominent sector link; mining/compliance claims require separate review. |
| `/camarotes-providencia` | `/camarotes` | Current internally linked comuna landing. |
| `/camarotes-las-condes` | `/camarotes` | Current internally linked comuna landing. |
| `/camarotes-maipu` | `/camarotes` | Current internally linked comuna landing. |
| `/camarotes-nunoa` | `/camarotes` | Current internally linked comuna landing. |
| `/camarotes-la-florida` | `/camarotes` | Current internally linked comuna landing. |
| `/camarotes-pudahuel` | `/camarotes` | Current internally linked comuna landing. |
| `/camarotes-santiago-centro` | `/camarotes` | Live/indexable comuna landing. |
| `/camarotes-penalolen` | `/camarotes` | Current internally linked comuna landing. |
| `/camarotes-quilicura` | `/camarotes` | Current internally linked comuna landing. |
| `/camarotes-puente-alto` | `/camarotes` | Live/indexable comuna landing. |
| `/camarotes-san-bernardo` | `/camarotes` | Current internally linked comuna landing. |
| `/camarotes-renca` | `/camarotes` | Live/indexable comuna landing. |
| `/camarotes-estacion-central` | `/camarotes` | Current internally linked comuna landing. |
| `/camarotes-lo-barnechea` | `/camarotes` | Current internally linked comuna landing. |
| `/reja-metalica-santiago` | `/rejas-metalicas` | Live/indexable primary geographic reja intent. |
| `/rejas-metalicas-pudahuel` | `/rejas-metalicas` | Live/indexable industrial/geographic intent. |
| `/portones-industriales` | `/portones-metalicos` | Live industrial intent with materially different buyer context. |

**Release rule:** every row above must become an explicitly approved KEEP/REBUILD/301 decision before `RINON_URL_INVENTORY_COMPLETE=true`. If Search Console data is unavailable, default to preserving rather than deleting proven organic entry points.

## 4. Camarote aliases eligible for 301 only after protected exceptions

These lower-risk aliases can consolidate to `/camarotes` once the final GSC reconciliation confirms no independent equity:

`/camarotes-militares`, `/camarotes-para-hospitales`, `/camarotes-para-internados`, `/camarotes-al-por-mayor`, `/litera-metalica`, `/camarote-de-acero`, `/literas-militares`, `/fabricante-camarotes-chile`, `/venta-mayor-camarotes-metalicos`.

Family rule: `/camarotes-*` → `/camarotes` **only after** the live-observed exception set has been evaluated. `/camarote-con-escritorio-*` and `/camarotes-con-escritorio-*` → `/camarote-con-escritorio` unless final GSC review establishes a distinct owner.

## 5. Cierres / cercos — candidate 301 to `/cierres-perimetrales`

| Old URL | Destination |
|---|---|
| `/cierre-perimetral-industrial` | `/cierres-perimetrales` |
| `/cercos-para-empresas` | `/cierres-perimetrales` |
| `/cercos-para-parcelas` | `/cierres-perimetrales` |
| `/cercos-perimetrales-empresas` | `/cierres-perimetrales` |
| `/cercos-perimetrales-antofagasta` | `/cierres-perimetrales` |
| `/cercos-perimetrales-concepcion` | `/cierres-perimetrales` |
| `/cercos-metalicos-santiago` | `/cierres-perimetrales` |
| `/cercos-metalicos-valparaiso` | `/cierres-perimetrales` |
| `/cercos-metalicos-ohiggins` | `/cierres-perimetrales` |
| `/cercos-metalicos-maule` | `/cierres-perimetrales` |
| `/cercos-metalicos` | `/cierres-perimetrales` |
| `/cierre-de-terrenos` | `/cierres-perimetrales` |
| `/fabricante-cercos-metalicos` | `/cierres-perimetrales` |
| `/fabricante-cierres-perimetrales` | `/cierres-perimetrales` |
| `/proveedor-cierres-perimetrales` | `/cierres-perimetrales` |
| `/cierres-metalicos-industriales` | `/cierres-perimetrales` |
| `/cierres-perimetrales-por-mayor` | `/cierres-perimetrales` |
| `/cierres-perimetrales-para-empresas` | `/cierres-perimetrales` |
| `/presupuesto-cierre-perimetral` | `/cierres-perimetrales` |
| `/presupuesto-cerco-perimetral` | `/cierres-perimetrales` |

Family rules: `/cercos-perimetrales-*`, `/cercos-metalicos-*`, `/cercos-para-*` and `/cierres-para-*` → `/cierres-perimetrales`. Geographic pages are not recreated as thin doorway pages unless GSC + differentiated content justify them.

## 6. Mallas

| Old URL | Decision | Destination |
|---|---|---|
| `/mallas-3d` | KEEP 200 | `/mallas-3d` |
| `/mallas-separadoras-industriales` | 301 candidate | `/mallas-separadoras` |
| `/mallas-separadoras-bodegas` | 301 candidate | `/mallas-separadoras` |
| `/mallas-separadoras-plantas` | 301 candidate | `/mallas-separadoras` |

Family rule: `/mallas-separadoras-*` → `/mallas-separadoras`. Malla 3D remains an independent intent owner.

## 7. Rejas — candidate 301 to `/rejas-metalicas`

The broad family remains available for lower-risk aliases, but `/reja-metalica-santiago` and `/rejas-metalicas-pudahuel` are protected in section 3 pending GSC review.

Candidate aliases: `/rejas-metalicas-las-condes`, `/rejas-metalicas-providencia`, `/rejas-metalicas-nunoa`, `/rejas-metalicas-maipu`, `/rejas-metalicas-san-bernardo`, `/rejas-metalicas-cerrillos`, `/reja-tubular`, `/rejas-tubulares`, `/rejas-de-fierro`, `/rejas-galvanizadas`, `/rejas-de-seguridad`, `/rejas-decorativas`, `/rejas-para-exteriores`, `/instalacion-de-rejas`, `/reja-para-jardin`, `/rejas-para-ventanas`, `/rejas-para-puertas`, `/rejas-para-balcon`, `/rejas-para-terraza`, `/rejas-para-locales-comerciales`, `/rejas-para-galpones`, `/rejas-para-colegios`, `/fabricante-rejas-metalicas-chile`.

Family rule: `/rejas-metalicas-*` → `/rejas-metalicas` after all live-observed exceptions are resolved. Any future child page needs measurable distinct demand and materially distinct content.

## 8. Portones — candidate 301 to `/portones-metalicos`

`/portones-industriales` is protected in section 3. Lower-risk aliases `/fabricante-portones-metalicos-chile` and `/puertas-peatonales` may consolidate after final GSC review.

Family rule: `/portones-*` → `/portones-metalicos` unless a child owner is explicitly approved. Automation/motor claims are never inherited automatically.

## 9. Fabricación / estructuras / services

| Old URL | Decision | Destination |
|---|---|---|
| `/estructuras-metalicas-a-pedido` | 301 candidate | `/estructuras-metalicas` |
| `/fabricante-estructuras-metalicas-chile` | 301 candidate | `/estructuras-metalicas` |
| `/escaleras-metalicas` | 301 candidate | `/estructuras-metalicas` |
| `/barandas-metalicas` | 301 candidate | `/estructuras-metalicas` |
| `/soldadura-metalica-santiago` | 301 candidate | `/soldadura-mig` |
| `/metalurgica-rinon` | 301 candidate | `/fabricacion-metalica` |
| `/pintura-electrostatica-santiago` | 301 candidate | `/pintura-electrostatica` |
| `/pintura-electrostatica-zona-sur-santiago` | 301 candidate | `/pintura-electrostatica` |

Family rules: `/soldadura-mig-*` → `/soldadura-mig`; `/pintura-electrostatica-*` → `/pintura-electrostatica` unless final GSC review supports a differentiated owner.

## 10. Approved editorial redirects

These remain flag-gated until authorized cutover.

| Old URL | Decision | Destination |
|---|---|---|
| `/blog/como-cotizar-rejas-metalicas` | 301 | `/recursos/como-cotizar-rejas-metalicas` |
| `/blog/tipos-de-cierres-perimetrales` | 301 | `/recursos/tipos-de-cierres-perimetrales` |
| `/blog/porton-corredizo-vs-batiente` | 301 | `/recursos/porton-corredizo-vs-batiente` |
| `/blog/mezzanine-metalico-bodega-guia` | 301 | `/recursos/mezzanine-metalico-bodega-guia` |
| `/blog/proveedor-camarotes-empresas` | 301 | `/recursos/proveedor-camarotes-empresas` |
| `/blog/como-elegir-reja-metalica-frontis` | 301 | `/recursos/como-elegir-reja-metalica-frontis` |

## 11. Claim-risk editorial URLs — REVIEW, no broad redirect

`/blog/cuanto-cuesta-camarote-chile`, `/blog/cuanto-cuesta-cierre-perimetral-chile`, `/blog/cuanto-cuesta-porton-automatico-chile`, `/blog/altura-reja-casa-seguridad`, `/blog/camarote-nino-6-anos`, `/blog/camarote-para-adulto-mayor`, `/blog/pintura-electrostatica-que-es`, `/blog/camarotes-mineria-que-exige-cada-faena`.

These require individual review because price, safety, child/elderly use, technical or mining/compliance claims can be stale or unsupported. They are not sent to generic categories just to eliminate a 404.

## 12. Explicit commercial REVIEW

| URL | Candidate | Reason |
|---|---|---|
| `/barreras-peatonales` | `/cierres-perimetrales` | Potential independent commercial intent; validate offer and GSC before keep-vs-merge decision. |

## Cutover completion procedure

`RINON_URL_INVENTORY_COMPLETE=true` may only be set after all eight checks are complete:

1. Export Search Console landing pages and queries for the pre-migration comparison window.
2. Crawl the complete live `rinon.cl` site and collect every indexable/internal URL, status, canonical, title and inbound internal links.
3. Reconcile crawl + GSC + this inventory and add every missing URL.
4. Review every URL with clicks, impressions, backlinks or material commercial intent individually, including every section-3 URL.
5. Resolve every `REVIEW / GSC-PENDING` item to an approved release state or document why it remains 200/noindex.
6. Verify every approved 301 destination returns 200 and preserves or improves intent relevance.
7. Run migration, SEO/CRO, served-build and browser gates on the release candidate.
8. Authorize cutover/indexation separately.

**No `RINON_URL_INVENTORY_COMPLETE=true` means no authorized production cutover.**
