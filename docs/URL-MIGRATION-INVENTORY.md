# RINON 2.0 — URL Migration Inventory

**Status:** cutover baseline · 2026-08-21.  
**Rule:** every known public URL needs an explicit migration decision. No listed decision changes without SEO review.  
**Completeness:** this inventory combines the migration contract, preserved commercial catalog and URLs discovered in the current public site/search crawl. It is deliberately **not complete** until a full live crawl is reconciled with exported Google Search Console landing-page/query data. Until then `RINON_URL_INVENTORY_COMPLETE=false` is mandatory.

## Decision legend

- **KEEP 200** — exact URL and intent remain live.
- **REBUILD** — dedicated RINON 2.0 intent owner.
- **301 candidate** — permanent redirect is plausible, but must not activate before reconciliation.
- **REVIEW / GSC-PENDING** — no redirect decision until Search Console performance and claim risk are reviewed.
- **410** — intentionally removed with no equivalent. None approved.

## 1. Durable commercial URLs — KEEP 200

`/`, `/camarotes`, `/camarote-nido`, `/camarote-triple`, `/camarote-doble`, `/cama-alta`, `/camarote-titanic`, `/camarote-1-5-plazas`, `/camarote-desmontable`, `/cama-dos-plazas-con-cajon`, `/camarote-2-plazas`, `/cama-institucional-metalica`, `/cama-loft-metalica`, `/cama-loft-con-escritorio`, `/mobiliario-institucional`, `/camarote-con-escritorio`, `/cierres-perimetrales`, `/mallas-3d`, `/rejas-metalicas`, `/portones-metalicos`, `/estructuras-metalicas`, `/fabricacion-metalica`, `/pintura-electrostatica`.

## 2. Dedicated RINON 2.0 intent owners — REBUILD

`/camas-metalicas`, `/camas-balinesas`, `/mesas-metalicas`, `/escritorios-metalicos`, `/mallas-separadoras`, `/soldadura-mig`, `/corte-metalico`, `/instalacion`, `/reparaciones-metalicas`.

These routes own materially different product/service intent instead of sending all organic traffic into generic category hubs.

## 3. Live-observed commercial URLs — REVIEW / GSC-PENDING

The following **36 URLs** were directly observed as live/indexable or prominently linked from the current public site during the pre-cutover crawl. They are quarantined before broad family redirect rules in `lib/migration.ts`. No blanket 301 is allowed until their Search Console landing-page/query performance is reconciled.

| Current URL | Candidate owner | Protection reason |
|---|---|---|
| `/literas` | `/camarotes` | Live synonym page with its own search intent. |
| `/camarotes-baratos` | `/camarotes` | Price/value intent and claim-risk copy. |
| `/camarotes-precio` | `/camarotes` | Live price-intent page; historical prices must not be inherited blindly. |
| `/camarotes-faenas` | `/camarotes` | B2B/use-case intent. |
| `/camarotes-salmoneras` | `/camarotes` | Sector intent with technical claim risk. |
| `/camarotes-mineria` | `/camarotes` | Mining/compliance intent requires individual review. |
| `/camarotes-metalicos` | `/camarotes` | Strong generic transactional synonym. |
| `/fabricante-camarotes-chile` | `/camarotes` | Manufacturer/commercial intent. |
| `/camarotes-al-por-mayor` | `/camarotes` | Volume/B2B intent. |
| `/camarotes-para-internados` | `/camarotes` | Institutional intent plus safety-claim risk. |
| `/camarotes-para-hospitales` | `/camarotes` | Institutional/healthcare intent plus claim risk. |
| `/camarotes-providencia` | `/camarotes` | Current internally linked comuna landing. |
| `/camarotes-las-condes` | `/camarotes` | Current internally linked comuna landing. |
| `/camarotes-maipu` | `/camarotes` | Current internally linked comuna landing. |
| `/camarotes-nunoa` | `/camarotes` | Current internally linked comuna landing. |
| `/camarotes-la-florida` | `/camarotes` | Current internally linked comuna landing. |
| `/camarotes-pudahuel` | `/camarotes` | Current internally linked comuna landing. |
| `/camarotes-santiago-centro` | `/camarotes` | Current geographic landing. |
| `/camarotes-penalolen` | `/camarotes` | Current internally linked comuna landing. |
| `/camarotes-quilicura` | `/camarotes` | Current internally linked comuna landing. |
| `/camarotes-puente-alto` | `/camarotes` | Current geographic landing. |
| `/camarotes-san-bernardo` | `/camarotes` | Current local landing near the operating location. |
| `/camarotes-renca` | `/camarotes` | Current geographic landing. |
| `/camarotes-estacion-central` | `/camarotes` | Current internally linked comuna landing. |
| `/camarotes-lo-barnechea` | `/camarotes` | Current internally linked comuna landing. |
| `/reja-metalica-santiago` | `/rejas-metalicas` | Primary geographic reja intent. |
| `/rejas-metalicas-pudahuel` | `/rejas-metalicas` | Geographic/industrial intent. |
| `/rejas-decorativas` | `/rejas-metalicas` | Design-led use intent. |
| `/rejas-para-exteriores` | `/rejas-metalicas` | Exterior-use intent and durability-claim risk. |
| `/rejas-para-terraza` | `/rejas-metalicas` | Terrace/safety intent and claim risk. |
| `/rejas-para-balcon` | `/rejas-metalicas` | Balcony/safety intent. |
| `/portones-industriales` | `/portones-metalicos` | Industrial buyer intent differs materially from residential. |
| `/cercos-para-empresas` | `/cierres-perimetrales` | Explicit B2B intent. |
| `/cercos-para-parcelas` | `/cierres-perimetrales` | Parcel/residential-land intent. |
| `/cercos-perimetrales-concepcion` | `/cierres-perimetrales` | Live regional geographic intent. |
| `/mallas-separadoras-industriales` | `/mallas-separadoras` | Distinct industrial/interior separation intent. |

**Release rule:** every row above must become an explicitly approved KEEP/REBUILD/301 decision before `RINON_URL_INVENTORY_COMPLETE=true`. If Search Console data is unavailable, **default to preserving** rather than deleting proven organic entry points.

## 4. Camarote aliases eligible for 301 after protected exceptions

Candidate aliases: `/camarotes-militares`, `/litera-metalica`, `/camarote-de-acero`, `/literas-militares`, `/venta-mayor-camarotes-metalicos`.

Family rule: `/camarotes-*` → `/camarotes` only after the live-observed exception set has been evaluated. `/camarote-con-escritorio-*` and `/camarotes-con-escritorio-*` → `/camarote-con-escritorio` unless final GSC review establishes a distinct owner.

## 5. Cierres / cercos — 301 candidates

Protected in section 3: `/cercos-para-empresas`, `/cercos-para-parcelas`, `/cercos-perimetrales-concepcion`.

Other known candidates to `/cierres-perimetrales`:
`/cierre-perimetral-industrial`, `/cercos-perimetrales-empresas`, `/cercos-perimetrales-antofagasta`, `/cercos-metalicos-santiago`, `/cercos-metalicos-valparaiso`, `/cercos-metalicos-ohiggins`, `/cercos-metalicos-maule`, `/cercos-metalicos`, `/cierre-de-terrenos`, `/fabricante-cercos-metalicos`, `/fabricante-cierres-perimetrales`, `/proveedor-cierres-perimetrales`, `/cierres-metalicos-industriales`, `/cierres-perimetrales-por-mayor`, `/cierres-perimetrales-para-empresas`, `/presupuesto-cierre-perimetral`, `/presupuesto-cerco-perimetral`.

Geographic pages are not recreated as thin doorway pages unless GSC plus differentiated local content justify them.

## 6. Mallas

- `/mallas-3d` — KEEP 200.
- `/mallas-separadoras-industriales` — protected REVIEW / GSC-PENDING.
- `/mallas-separadoras-bodegas` — 301 candidate → `/mallas-separadoras`.
- `/mallas-separadoras-plantas` — 301 candidate → `/mallas-separadoras`.

## 7. Rejas — 301 candidates after protected exceptions

Protected in section 3: `/reja-metalica-santiago`, `/rejas-metalicas-pudahuel`, `/rejas-decorativas`, `/rejas-para-exteriores`, `/rejas-para-terraza`, `/rejas-para-balcon`.

Other known candidates to `/rejas-metalicas`:
`/rejas-metalicas-las-condes`, `/rejas-metalicas-providencia`, `/rejas-metalicas-nunoa`, `/rejas-metalicas-maipu`, `/rejas-metalicas-san-bernardo`, `/rejas-metalicas-cerrillos`, `/reja-tubular`, `/rejas-tubulares`, `/rejas-de-fierro`, `/rejas-galvanizadas`, `/rejas-de-seguridad`, `/instalacion-de-rejas`, `/reja-para-jardin`, `/rejas-para-ventanas`, `/rejas-para-puertas`, `/rejas-para-locales-comerciales`, `/rejas-para-galpones`, `/rejas-para-colegios`, `/fabricante-rejas-metalicas-chile`.

## 8. Portones

`/portones-industriales` is protected in section 3. Lower-risk candidates `/fabricante-portones-metalicos-chile` and `/puertas-peatonales` may consolidate to `/portones-metalicos` after final GSC review. Automation/motor claims are never inherited automatically.

## 9. Fabricación / estructuras / servicios — known candidates

| Old URL | Candidate destination |
|---|---|
| `/estructuras-metalicas-a-pedido` | `/estructuras-metalicas` |
| `/fabricante-estructuras-metalicas-chile` | `/estructuras-metalicas` |
| `/escaleras-metalicas` | `/estructuras-metalicas` |
| `/barandas-metalicas` | `/estructuras-metalicas` |
| `/soldadura-metalica-santiago` | `/soldadura-mig` |
| `/metalurgica-rinon` | `/fabricacion-metalica` |
| `/pintura-electrostatica-santiago` | `/pintura-electrostatica` |
| `/pintura-electrostatica-zona-sur-santiago` | `/pintura-electrostatica` |

## 10. Approved editorial redirects

These remain separately flag-gated until authorized cutover:

- `/blog/como-cotizar-rejas-metalicas` → `/recursos/como-cotizar-rejas-metalicas`
- `/blog/tipos-de-cierres-perimetrales` → `/recursos/tipos-de-cierres-perimetrales`
- `/blog/porton-corredizo-vs-batiente` → `/recursos/porton-corredizo-vs-batiente`
- `/blog/mezzanine-metalico-bodega-guia` → `/recursos/mezzanine-metalico-bodega-guia`
- `/blog/proveedor-camarotes-empresas` → `/recursos/proveedor-camarotes-empresas`
- `/blog/como-elegir-reja-metalica-frontis` → `/recursos/como-elegir-reja-metalica-frontis`

## 11. Claim-risk editorial URLs — REVIEW, no broad redirect

`/blog/cuanto-cuesta-camarote-chile`, `/blog/cuanto-cuesta-cierre-perimetral-chile`, `/blog/cuanto-cuesta-porton-automatico-chile`, `/blog/altura-reja-casa-seguridad`, `/blog/camarote-nino-6-anos`, `/blog/camarote-para-adulto-mayor`, `/blog/pintura-electrostatica-que-es`, `/blog/camarotes-mineria-que-exige-cada-faena`.

These require individual review because price, safety, child/elderly use, technical or mining/compliance claims can be stale or unsupported.

## 12. Explicit commercial REVIEW

`/barreras-peatonales` → candidate `/cierres-perimetrales`; validate actual offer and GSC before keep-vs-merge.

## Cutover completion procedure

`RINON_URL_INVENTORY_COMPLETE=true` may only be set after all checks are complete:

1. Export Search Console landing pages and queries for the pre-migration comparison window.
2. Crawl the complete live `rinon.cl` site and collect every indexable/internal URL, status, canonical, title and inbound internal links.
3. Reconcile crawl + GSC + this inventory and add every missing URL.
4. Review every URL with clicks, impressions, backlinks or material commercial intent individually, including all 36 section-3 URLs.
5. Resolve every `REVIEW / GSC-PENDING` item to an approved release state.
6. Verify every approved 301 destination returns 200 and preserves or improves intent relevance.
7. Run migration, SEO/CRO, served-build and browser gates on the exact release candidate.
8. Authorize cutover/indexation separately.

**No completed Search Console reconciliation + no `RINON_URL_INVENTORY_COMPLETE=true` means no authorized production cutover.**
