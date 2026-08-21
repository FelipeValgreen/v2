# RINON 2.0 — URL Migration Inventory

**Status:** cutover baseline · 2026-08-21.  
**Rule:** every known public URL needs an explicit migration decision. No listed decision changes without SEO review.  
**Completeness:** this inventory combines the existing migration contract, preserved commercial catalog and URLs discovered in the current public site/search crawl. It is deliberately **not marked complete** until a fresh full-site crawl is reconciled with exported Google Search Console landing-page/query data. Until then `RINON_URL_INVENTORY_COMPLETE=false` is mandatory.

## Decision legend

- **KEEP 200** — exact URL and intent remain live.
- **REBUILD** — dedicated RINON 2.0 intent owner.
- **301** — permanent redirect to the closest equivalent owner.
- **REVIEW** — no redirect decision until performance and/or claim risk is reviewed.
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

## 3. Camarotes — 301 to `/camarotes`

| Old URL | Destination | Rationale |
|---|---|---|
| `/camarotes-mineria` | `/camarotes` | Sector modifier; do not inherit unsupported mining claims. |
| `/camarotes-salmoneras` | `/camarotes` | Sector modifier. |
| `/camarotes-militares` | `/camarotes` | Sector modifier. |
| `/camarotes-para-hospitales` | `/camarotes` | Sector modifier; do not inherit sanitary claims. |
| `/camarotes-para-internados` | `/camarotes` | Sector modifier; do not inherit unsupported safety dimensions. |
| `/camarotes-al-por-mayor` | `/camarotes` | Volume modifier. |
| `/literas` | `/camarotes` | Synonym. |
| `/litera-metalica` | `/camarotes` | Synonym. |
| `/camarote-de-acero` | `/camarotes` | Material synonym. |
| `/literas-militares` | `/camarotes` | Sector synonym. |
| `/fabricante-camarotes-chile` | `/camarotes` | Generic commercial alias. |
| `/venta-mayor-camarotes-metalicos` | `/camarotes` | Volume alias. |

Family rule: `/camarotes-*` → `/camarotes`, except durable product URLs in section 1. `/camarote-con-escritorio-*` and `/camarotes-con-escritorio-*` → `/camarote-con-escritorio` unless final GSC review establishes a distinct owner.

## 4. Cierres / cercos — 301 to `/cierres-perimetrales`

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

## 5. Mallas

| Old URL | Decision | Destination |
|---|---|---|
| `/mallas-3d` | KEEP 200 | `/mallas-3d` |
| `/mallas-separadoras-industriales` | 301 | `/mallas-separadoras` |
| `/mallas-separadoras-bodegas` | 301 | `/mallas-separadoras` |
| `/mallas-separadoras-plantas` | 301 | `/mallas-separadoras` |

Family rule: `/mallas-separadoras-*` → `/mallas-separadoras`. Malla 3D remains an independent intent owner.

## 6. Rejas — 301 to `/rejas-metalicas`

`/reja-metalica-santiago`, `/rejas-metalicas-las-condes`, `/rejas-metalicas-providencia`, `/rejas-metalicas-nunoa`, `/rejas-metalicas-maipu`, `/rejas-metalicas-san-bernardo`, `/rejas-metalicas-pudahuel`, `/rejas-metalicas-cerrillos`, `/reja-tubular`, `/rejas-tubulares`, `/rejas-de-fierro`, `/rejas-galvanizadas`, `/rejas-de-seguridad`, `/rejas-decorativas`, `/rejas-para-exteriores`, `/instalacion-de-rejas`, `/reja-para-jardin`, `/rejas-para-ventanas`, `/rejas-para-puertas`, `/rejas-para-balcon`, `/rejas-para-terraza`, `/rejas-para-locales-comerciales`, `/rejas-para-galpones`, `/rejas-para-colegios`, `/fabricante-rejas-metalicas-chile`.

Family rule: `/rejas-metalicas-*` → `/rejas-metalicas`. Any future child page needs measurable distinct demand and materially distinct content.

## 7. Portones — 301 to `/portones-metalicos`

`/portones-industriales`, `/fabricante-portones-metalicos-chile`, `/puertas-peatonales`.

Family rule: `/portones-*` → `/portones-metalicos` unless a child owner is explicitly approved. Automation/motor claims are never inherited automatically.

## 8. Fabricación / estructuras / services

| Old URL | Decision | Destination |
|---|---|---|
| `/estructuras-metalicas-a-pedido` | 301 | `/estructuras-metalicas` |
| `/fabricante-estructuras-metalicas-chile` | 301 | `/estructuras-metalicas` |
| `/escaleras-metalicas` | 301 | `/estructuras-metalicas` |
| `/barandas-metalicas` | 301 | `/estructuras-metalicas` |
| `/soldadura-metalica-santiago` | 301 | `/soldadura-mig` |
| `/metalurgica-rinon` | 301 | `/fabricacion-metalica` |
| `/pintura-electrostatica-santiago` | 301 | `/pintura-electrostatica` |
| `/pintura-electrostatica-zona-sur-santiago` | 301 | `/pintura-electrostatica` |

Family rules: `/soldadura-mig-*` → `/soldadura-mig`; `/pintura-electrostatica-*` → `/pintura-electrostatica` unless final GSC review supports a differentiated owner.

## 9. Approved editorial redirects

These remain flag-gated until authorized cutover.

| Old URL | Decision | Destination |
|---|---|---|
| `/blog/como-cotizar-rejas-metalicas` | 301 | `/recursos/como-cotizar-rejas-metalicas` |
| `/blog/tipos-de-cierres-perimetrales` | 301 | `/recursos/tipos-de-cierres-perimetrales` |
| `/blog/porton-corredizo-vs-batiente` | 301 | `/recursos/porton-corredizo-vs-batiente` |
| `/blog/mezzanine-metalico-bodega-guia` | 301 | `/recursos/mezzanine-metalico-bodega-guia` |
| `/blog/proveedor-camarotes-empresas` | 301 | `/recursos/proveedor-camarotes-empresas` |
| `/blog/como-elegir-reja-metalica-frontis` | 301 | `/recursos/como-elegir-reja-metalica-frontis` |

## 10. Claim-risk editorial URLs — REVIEW, no broad redirect

`/blog/cuanto-cuesta-camarote-chile`, `/blog/cuanto-cuesta-cierre-perimetral-chile`, `/blog/cuanto-cuesta-porton-automatico-chile`, `/blog/altura-reja-casa-seguridad`, `/blog/camarote-nino-6-anos`, `/blog/camarote-para-adulto-mayor`, `/blog/pintura-electrostatica-que-es`, `/blog/camarotes-mineria-que-exige-cada-faena`.

These require individual review because price, safety, child/elderly use, technical or mining/compliance claims can be stale or unsupported. They are not sent to generic categories just to eliminate a 404.

## 11. Explicit commercial REVIEW

| URL | Candidate | Reason |
|---|---|---|
| `/barreras-peatonales` | `/cierres-perimetrales` | Potential independent commercial intent; validate offer and GSC before keep-vs-merge decision. |

## Cutover completion procedure

`RINON_URL_INVENTORY_COMPLETE=true` may only be set after all eight checks are complete:

1. Export Search Console landing pages and queries for the pre-migration comparison window.
2. Crawl the complete live `rinon.cl` site and collect every indexable/internal URL, status, canonical, title and inbound internal links.
3. Reconcile crawl + GSC + this inventory and add every missing URL.
4. Review every URL with clicks, impressions, backlinks or material commercial intent individually.
5. Resolve every `REVIEW` item to an approved release state or document why it remains 200/noindex.
6. Verify every approved 301 destination returns 200 and preserves or improves intent relevance.
7. Run migration, SEO/CRO, served-build and browser gates on the release candidate.
8. Authorize cutover/indexation separately.

**No `RINON_URL_INVENTORY_COMPLETE=true` means no authorized production cutover.**
