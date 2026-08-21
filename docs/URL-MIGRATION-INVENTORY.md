# RINON 2.0 — URL Migration Inventory

**Status:** cutover baseline, 2026-08-21.  
**Rule:** this file is a release contract, not a suggestion. No listed URL may change migration decision without SEO review.  
**Completeness:** this captures all URLs currently known from the migration contract, current public crawl/search discovery and preserved commercial catalog. Before production cutover it must be reconciled against a fresh full-site crawl and exported Google Search Console landing-page/query data. Until that reconciliation is explicitly completed, `RINON_URL_INVENTORY_COMPLETE` must remain `false`.

## Decision legend

- **KEEP 200** — preserve the exact URL and intent.
- **301** — permanent redirect to the closest equivalent owner.
- **REBUILD** — preserve/recreate the intent as a dedicated RINON 2.0 owner.
- **MERGE** — content may be consolidated, but only through the stated destination and 301 where the old URL existed publicly.
- **REVIEW** — no production redirect decision until performance/claim risk is reviewed.
- **410** — intentionally removed with no equivalent; none approved at this stage.

## A. Durable commercial URLs — KEEP 200

| Old/current URL | Decision | RINON 2.0 destination | Intent |
|---|---|---|---|
| `/` | KEEP 200 | `/` | Fabricación metálica / brand hub |
| `/camarotes` | KEEP 200 | `/camarotes` | Camarotes y camas |
| `/camarote-nido` | KEEP 200 | `/camarote-nido` | Camarote nido |
| `/camarote-triple` | KEEP 200 | `/camarote-triple` | Camarote triple |
| `/camarote-doble` | KEEP 200 | `/camarote-doble` | Camarote doble |
| `/cama-alta` | KEEP 200 | `/cama-alta` | Cama alta |
| `/camarote-titanic` | KEEP 200 | `/camarote-titanic` | Camarote reforzado / Titanic |
| `/camarote-1-5-plazas` | KEEP 200 | `/camarote-1-5-plazas` | Camarote 1,5 plazas |
| `/camarote-desmontable` | KEEP 200 | `/camarote-desmontable` | Camarote desmontable |
| `/cama-dos-plazas-con-cajon` | KEEP 200 | `/cama-dos-plazas-con-cajon` | Cama dos plazas con cajón |
| `/camarote-2-plazas` | KEEP 200 | `/camarote-2-plazas` | Camarote con cama doble |
| `/cama-institucional-metalica` | KEEP 200 | `/cama-institucional-metalica` | Cama institucional |
| `/cama-loft-metalica` | KEEP 200 | `/cama-loft-metalica` | Cama loft |
| `/cama-loft-con-escritorio` | KEEP 200 | `/cama-loft-con-escritorio` | Cama loft con escritorio |
| `/mobiliario-institucional` | KEEP 200 | `/mobiliario-institucional` | Compra institucional |
| `/camarote-con-escritorio` | KEEP 200 | `/camarote-con-escritorio` | Camarote con escritorio |
| `/cierres-perimetrales` | KEEP 200 | `/cierres-perimetrales` | Cierres perimetrales |
| `/mallas-3d` | KEEP 200 | `/mallas-3d` | Panel/malla 3D |
| `/rejas-metalicas` | KEEP 200 | `/rejas-metalicas` | Rejas metálicas |
| `/portones-metalicos` | KEEP 200 | `/portones-metalicos` | Portones metálicos |
| `/estructuras-metalicas` | KEEP 200 | `/estructuras-metalicas` | Estructuras a medida |
| `/fabricacion-metalica` | KEEP 200 | `/fabricacion-metalica` | Fabricación a medida |
| `/pintura-electrostatica` | KEEP 200 | `/pintura-electrostatica` | Pintura electrostática |

## B. New dedicated owners — REBUILD / KEEP at launch

These routes exist to separate search intent rather than collapse everything into generic hubs.

| RINON 2.0 URL | Decision | Intent owner |
|---|---|---|
| `/camas-metalicas` | REBUILD | Camas metálicas |
| `/camas-balinesas` | REBUILD | Camas balinesas |
| `/mesas-metalicas` | REBUILD | Mesas metálicas |
| `/escritorios-metalicos` | REBUILD | Escritorios metálicos |
| `/mallas-separadoras` | REBUILD | Separación interior / industrial |
| `/soldadura-mig` | REBUILD | Soldadura MIG |
| `/corte-metalico` | REBUILD | Corte y dimensionado |
| `/instalacion` | REBUILD | Instalación y montaje |
| `/reparaciones-metalicas` | REBUILD | Reparaciones metálicas |

## C. Camarotes — aliases / sector pages

| Old URL | Decision | Destination | Reason |
|---|---|---|---|
| `/camarotes-mineria` | 301 | `/camarotes` | Sector modifier; category owner preserves commercial intent without unsupported mining-specific claims. |
| `/camarotes-salmoneras` | 301 | `/camarotes` | Sector modifier. |
| `/camarotes-militares` | 301 | `/camarotes` | Sector modifier. |
| `/camarotes-para-hospitales` | 301 | `/camarotes` | Sector modifier; avoids migrating unsupported sanitary claims. |
| `/camarotes-para-internados` | 301 | `/camarotes` | Sector modifier; avoids migrating unsupported safety dimensions. |
| `/camarotes-al-por-mayor` | 301 | `/camarotes` | Volume modifier. |
| `/literas` | 301 | `/camarotes` | Synonym. |
| `/litera-metalica` | 301 | `/camarotes` | Synonym. |
| `/camarote-de-acero` | 301 | `/camarotes` | Material synonym. |
| `/literas-militares` | 301 | `/camarotes` | Sector synonym. |
| `/fabricante-camarotes-chile` | 301 | `/camarotes` | Generic commercial alias. |
| `/venta-mayor-camarotes-metalicos` | 301 | `/camarotes` | Volume alias. |

Family rule: `/camarotes-*` consolidates to `/camarotes` **except durable product URLs explicitly listed in section A**. `/camarote-con-escritorio-*` and `/camarotes-con-escritorio-*` consolidate to `/camarote-con-escritorio` unless Search Console proves a distinct owner is justified.

## D. Cierres / cercos

| Old URL | Decision | Destination | Reason |
|---|---|---|---|
| `/cierre-perimetral-industrial` | 301 | `/cierres-perimetrales` | Industrial modifier. |
| `/cercos-para-empresas` | 301 | `/cierres-perimetrales` | Company/use modifier. |
| `/cercos-para-parcelas` | 301 | `/cierres-perimetrales` | Use modifier. |
| `/cercos-perimetrales-empresas` | 301 | `/cierres-perimetrales` | Company modifier. |
| `/cercos-perimetrales-antofagasta` | 301 | `/cierres-perimetrales` | Geographic modifier; no thin regional doorway migration. |
| `/cercos-perimetrales-concepcion` | 301 | `/cierres-perimetrales` | Geographic modifier; no thin regional doorway migration. |
| `/cercos-metalicos-santiago` | 301 | `/cierres-perimetrales` | Geographic alias. |
| `/cercos-metalicos-valparaiso` | 301 | `/cierres-perimetrales` | Geographic alias. |
| `/cercos-metalicos-ohiggins` | 301 | `/cierres-perimetrales` | Geographic alias. |
| `/cercos-metalicos-maule` | 301 | `/cierres-perimetrales` | Geographic alias. |
| `/cercos-metalicos` | 301 | `/cierres-perimetrales` | Generic synonym. |
| `/cierre-de-terrenos` | 301 | `/cierres-perimetrales` | Use synonym. |
| `/fabricante-cercos-metalicos` | 301 | `/cierres-perimetrales` | Commercial alias. |
| `/fabricante-cierres-perimetrales` | 301 | `/cierres-perimetrales` | Commercial alias. |
| `/proveedor-cierres-perimetrales` | 301 | `/cierres-perimetrales` | Commercial alias. |
| `/cierres-metalicos-industriales` | 301 | `/cierres-perimetrales` | Industrial alias. |
| `/cierres-perimetrales-por-mayor` | 301 | `/cierres-perimetrales` | Volume alias. |
| `/cierres-perimetrales-para-empresas` | 301 | `/cierres-perimetrales` | B2B alias. |
| `/presupuesto-cierre-perimetral` | 301 | `/cierres-perimetrales` | Quote intent. |
| `/presupuesto-cerco-perimetral` | 301 | `/cierres-perimetrales` | Quote intent. |

Family rules: `/cercos-perimetrales-*`, `/cercos-metalicos-*`, `/cercos-para-*` and `/cierres-para-*` consolidate to `/cierres-perimetrales`, subject to final GSC exception review.

## E. Mallas

| Old URL | Decision | Destination | Reason |
|---|---|---|---|
| `/mallas-separadoras-industriales` | 301 | `/mallas-separadoras` | Dedicated interior/industrial owner. |
| `/mallas-separadoras-bodegas` | 301 | `/mallas-separadoras` | Use modifier. |
| `/mallas-separadoras-plantas` | 301 | `/mallas-separadoras` | Use modifier. |

Family rule: `/mallas-separadoras-*` consolidates to `/mallas-separadoras`. `/mallas-3d` remains its own durable owner.

## F. Rejas

| Old URL | Decision | Destination |
|---|---|---|
| `/reja-metalica-santiago` | 301 | `/rejas-metalicas` |
| `/rejas-metalicas-las-condes` | 301 | `/rejas-metalicas` |
| `/rejas-metalicas-providencia` | 301 | `/rejas-metalicas` |
| `/rejas-metalicas-nunoa` | 301 | `/rejas-metalicas` |
| `/rejas-metalicas-maipu` | 301 | `/rejas-metalicas` |
| `/rejas-metalicas-san-bernardo` | 301 | `/rejas-metalicas` |
| `/rejas-metalicas-pudahuel` | 301 | `/rejas-metalicas` |
| `/rejas-metalicas-cerrillos` | 301 | `/rejas-metalicas` |
| `/reja-tubular` | 301 | `/rejas-metalicas` |
| `/rejas-tubulares` | 301 | `/rejas-metalicas` |
| `/rejas-de-fierro` | 301 | `/rejas-metalicas` |
| `/rejas-galvanizadas` | 301 | `/rejas-metalicas` |
| `/rejas-de-seguridad` | 301 | `/rejas-metalicas` |
| `/rejas-decorativas` | 301 | `/rejas-metalicas` |
| `/rejas-para-exteriores` | 301 | `/rejas-metalicas` |
| `/instalacion-de-rejas` | 301 | `/rejas-metalicas` |
| `/reja-para-jardin` | 301 | `/rejas-metalicas` |
| `/rejas-para-ventanas` | 301 | `/rejas-metalicas` |
| `/rejas-para-puertas` | 301 | `/rejas-metalicas` |
| `/rejas-para-balcon` | 301 | `/rejas-metalicas` |
| `/rejas-para-terraza` | 301 | `/rejas-metalicas` |
| `/rejas-para-locales-comerciales` | 301 | `/rejas-metalicas` |
| `/rejas-para-galpones` | 301 | `/rejas-metalicas` |
| `/rejas-para-colegios` | 301 | `/rejas-metalicas` |
| `/fabricante-rejas-metalicas-chile` | 301 | `/rejas-metalicas` |

Family rule: `/rejas-metalicas-*` consolidates to `/rejas-metalicas`; any future distinct child page requires GSC evidence and materially differentiated content.

## G. Portones

| Old URL | Decision | Destination |
|---|---|---|
| `/portones-industriales` | 301 | `/portones-metalicos` |
| `/fabricante-portones-metalicos-chile` | 301 | `/portones-metalicos` |
| `/puertas-peatonales` | 301 | `/portones-metalicos` |

Family rule: `/portones-*` consolidates to `/portones-metalicos` unless an explicitly approved owner is added. Automation/motor claims are not inherited automatically.

## H. Fabricación / estructuras / servicios

| Old URL | Decision | Destination | Note |
|---|---|---|---|
| `/estructuras-metalicas-a-pedido` | 301 | `/estructuras-metalicas` | Custom-structure alias. |
| `/fabricante-estructuras-metalicas-chile` | 301 | `/estructuras-metalicas` | Commercial alias. |
| `/escaleras-metalicas` | 301 | `/estructuras-metalicas` | Typology currently consolidated. |
| `/barandas-metalicas` | 301 | `/estructuras-metallicas` | **REVIEW spelling/destination before cutover; intended owner is `/estructuras-metalicas`.** |
| `/soldadura-metalica-santiago` | 301 | `/soldadura-mig` | Dedicated welding owner. |
| `/metalurgica-rinon` | 301 | `/fabricacion-metalica` | General fabricator alias. |
| `/pintura-electrostatica-santiago` | 301 | `/pintura-electrostatica` | Geographic alias. |
| `/pintura-electrostatica-zona-sur-santiago` | 301 | `/pintura-electrostatica` | Geographic hub; avoid thin doorway migration. |

Family rules: `/soldadura-mig-*` → `/soldadura-mig`; `/pintura-electrostatica-*` → `/pintura-electrostatica` unless GSC supports a materially differentiated child page.

## I. Editorial redirects approved

These are the only legacy blog redirects currently allowlisted. They remain disabled until the production redirect flag is explicitly enabled during authorized cutover.

| Old URL | Decision | Destination |
|---|---|---|
| `/blog/como-cotizar-rejas-metalicas` | 301 | `/recursos/como-cotizar-rejas-metalicas` |
| `/blog/tipos-de-cierres-perimetrales` | 301 | `/recursos/tipos-de-cierres-perimetrales` |
| `/blog/porton-corredizo-vs-batiente` | 301 | `/recursos/porton-corredizo-vs-batiente` |
| `/blog/mezzanine-metalico-bodega-guia` | 301 | `/recursos/mezzanine-metalico-bodega-guia` |
| `/blog/proveedor-camarotes-empresas` | 301 | `/recursos/proveedor-camarotes-empresas` |
| `/blog/como-elegir-reja-metalica-frontis` | 301 | `/recursos/como-elegir-reja-metalica-frontis` |

## J. Editorial / claim-risk URLs — REVIEW, no broad redirect

| Old URL | Decision | Reason |
|---|---|---|
| `/blog/cuanto-cuesta-camarote-chile` | REVIEW | Price content can become stale/misleading. |
| `/blog/cuanto-cuesta-cierre-perimetral-chile` | REVIEW | Price content can become stale/misleading. |
| `/blog/cuanto-cuesta-porton-automatico-chile` | REVIEW | Price + automation capability risk. |
| `/blog/altura-reja-casa-seguridad` | REVIEW | Safety/legal implications. |
| `/blog/camarote-nino-6-anos` | REVIEW | Child-safety claim risk. |
| `/blog/camarote-para-adulto-mayor` | REVIEW | Safety/health-adjacent claim risk. |
| `/blog/pintura-electrostatica-que-es` | REVIEW | Technical/capability statements require validation. |
| `/blog/camarotes-mineria-que-exige-cada-faena` | REVIEW | Mining/compliance claims require evidence. |

## K. URLs requiring explicit commercial review

| URL | Decision | Candidate destination | Reason |
|---|---|---|---|
| `/barreras-peatonales` | REVIEW | `/cierres-perimetrales` | Could represent independent commercial intent. |

## Cutover completion procedure

`RINON_URL_INVENTORY_COMPLETE=true` may only be set after all of the following are true:

1. Export Search Console landing pages and queries for the pre-migration comparison window.
2. Crawl the complete live `rinon.cl` site and collect every indexable/internal URL plus status, canonical, title and inbound internal links.
3. Reconcile crawl + GSC + this inventory and add every missing URL.
4. Review URLs with clicks, impressions, external links or meaningful commercial intent individually.
5. Resolve every `REVIEW` row to an approved release state or explicitly document why it remains 200/noindex.
6. Verify every approved 301 destination returns 200 and has equal-or-better intent relevance.
7. Run migration, SEO/CRO, served-build and browser gates on the release candidate.
8. Only then authorize cutover/indexation separately.

**No `RINON_URL_INVENTORY_COMPLETE=true` means no authorized production cutover.**
