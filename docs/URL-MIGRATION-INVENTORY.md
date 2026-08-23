# RINON 2.0 — URL Migration Inventory

**Status:** cutover baseline · 2026-08-23.  
**Rule:** every known public URL requires an explicit migration decision.  
**Completeness:** deliberately incomplete until a full live crawl is reconciled with exported Google Search Console landing-page + query data. Until then `RINON_URL_INVENTORY_COMPLETE=false` is mandatory.

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

## 3. Live-observed commercial URLs — REVIEW / GSC-PENDING

The following **53 URLs** were directly observed as live/indexable or prominently linked from the current public site. They are quarantined before all broad redirect families in `lib/migration.ts`.

### Camarotes / camas — 29

| Current URL | Candidate owner | Protection reason |
|---|---|---|
| `/literas` | `/camarotes` | Live synonym intent. |
| `/camarotes-baratos` | `/camarotes` | Price/value intent and claim risk. |
| `/camarotes-precio` | `/camarotes` | Price-intent page. |
| `/camarotes-faenas` | `/camarotes` | B2B/use-case intent. |
| `/camarotes-salmoneras` | `/camarotes` | Sector intent with technical claim risk. |
| `/camarotes-mineria` | `/camarotes` | Mining/compliance intent. |
| `/camarotes-metalicos` | `/camarotes` | Strong generic transactional synonym. |
| `/fabricante-camarotes-chile` | `/camarotes` | Manufacturer/commercial intent. |
| `/camarotes-al-por-mayor` | `/camarotes` | Volume/B2B intent. |
| `/camarotes-para-internados` | `/camarotes` | Institutional + safety intent. |
| `/camarotes-para-hospitales` | `/camarotes` | Healthcare/institutional intent. |
| `/camarotes-militares` | `/camarotes` | Live institutional/military intent with unsupported certification/technical claims on the current page. |
| `/camarotes-providencia` | `/camarotes` | Geographic landing. |
| `/camarotes-las-condes` | `/camarotes` | Geographic landing. |
| `/camarotes-maipu` | `/camarotes` | Geographic landing. |
| `/camarotes-nunoa` | `/camarotes` | Geographic landing. |
| `/camarotes-la-florida` | `/camarotes` | Geographic landing. |
| `/camarotes-pudahuel` | `/camarotes` | Geographic landing. |
| `/camarotes-santiago-centro` | `/camarotes` | Geographic landing. |
| `/camarotes-penalolen` | `/camarotes` | Geographic landing. |
| `/camarotes-quilicura` | `/camarotes` | Geographic landing. |
| `/camarotes-puente-alto` | `/camarotes` | Geographic landing. |
| `/camarotes-san-bernardo` | `/camarotes` | Local landing near operating location. |
| `/camarotes-renca` | `/camarotes` | Geographic landing. |
| `/camarotes-estacion-central` | `/camarotes` | Geographic landing. |
| `/camarotes-lo-barnechea` | `/camarotes` | Geographic landing. |
| `/camarote-con-escritorio-economico` | `/camarote-con-escritorio` | Product variant. |
| `/camarote-con-escritorio-full` | `/camarote-con-escritorio` | Premium product variant. |
| `/camarote-con-escritorio-full-2-plazas` | `/camarote-con-escritorio` | Distinct product/model intent and strong claims. |

### Rejas / cierres / mallas / portones — 16

| Current URL | Candidate owner | Protection reason |
|---|---|---|
| `/reja-metalica-santiago` | `/rejas-metalicas` | Primary geographic intent. |
| `/rejas-metalicas-pudahuel` | `/rejas-metalicas` | Geographic/industrial intent. |
| `/rejas-metalicas-maipu` | `/rejas-metalicas` | Geographic intent. |
| `/rejas-metalicas-cerrillos` | `/rejas-metalicas` | Geographic/industrial intent. |
| `/rejas-metalicas-precio` | `/rejas-metalicas` | Price intent. |
| `/rejas-metalicas-para-casas` | `/rejas-metalicas` | Live residential/frontis intent with safety-height content. |
| `/rejas-decorativas` | `/rejas-metalicas` | Design-led intent. |
| `/rejas-para-exteriores` | `/rejas-metalicas` | Exterior/durability intent. |
| `/rejas-para-terraza` | `/rejas-metalicas` | Terrace/safety intent. |
| `/rejas-para-balcon` | `/rejas-metalicas` | Balcony/safety intent. |
| `/portones-industriales` | `/portones-metalicos` | Industrial buyer intent. |
| `/cercos-para-empresas` | `/cierres-perimetrales` | Explicit B2B intent. |
| `/cercos-para-parcelas` | `/cierres-perimetrales` | Parcel/residential-land intent. |
| `/cercos-perimetrales-concepcion` | `/cierres-perimetrales` | Regional intent. |
| `/cercos-perimetrales-antofagasta` | `/cierres-perimetrales` | Live north/mining geographic intent and high claim risk. |
| `/mallas-separadoras-industriales` | `/mallas-separadoras` | Industrial/interior separation intent. |

### Soldadura / pintura electrostática — 8

`/soldadura-metalica-santiago`, `/pintura-electrostatica-zona-sur-santiago`, `/pintura-electrostatica-colina`, `/pintura-electrostatica-las-condes`, `/pintura-electrostatica-providencia`, `/pintura-electrostatica-santiago-centro`, `/pintura-electrostatica-maipu`, `/pintura-electrostatica-talagante`.

**Release rule:** all 53 rows must become approved KEEP/REBUILD/301 decisions before `RINON_URL_INVENTORY_COMPLETE=true`.

## 4. Known 301 candidates after protected exceptions

### Camarotes
`/litera-metalica`, `/camarote-de-acero`, `/literas-militares`, `/venta-mayor-camarotes-metalicos` → candidate `/camarotes`.

### Cierres / cercos
`/cierre-perimetral-industrial`, `/cercos-perimetrales-empresas`, `/cercos-metalicos-santiago`, `/cercos-metalicos-valparaiso`, `/cercos-metalicos-ohiggins`, `/cercos-metalicos-maule`, `/cercos-metalicos`, `/cierre-de-terrenos`, `/fabricante-cercos-metalicos`, `/fabricante-cierres-perimetrales`, `/proveedor-cierres-perimetrales`, `/cierres-metalicos-industriales`, `/cierres-perimetrales-por-mayor`, `/cierres-perimetrales-para-empresas`, `/presupuesto-cierre-perimetral`, `/presupuesto-cerco-perimetral` → candidate `/cierres-perimetrales`.

### Mallas
`/mallas-separadoras-bodegas`, `/mallas-separadoras-plantas` → candidate `/mallas-separadoras`; `/mallas-3d` stays KEEP 200.

### Rejas
After protected exceptions: `/rejas-metalicas-las-condes`, `/rejas-metalicas-providencia`, `/rejas-metalicas-nunoa`, `/rejas-metalicas-san-bernardo`, `/reja-tubular`, `/rejas-tubulares`, `/rejas-de-fierro`, `/rejas-galvanizadas`, `/rejas-de-seguridad`, `/instalacion-de-rejas`, `/reja-para-jardin`, `/rejas-para-ventanas`, `/rejas-para-puertas`, `/rejas-para-locales-comerciales`, `/rejas-para-galpones`, `/rejas-para-colegios`, `/fabricante-rejas-metalicas-chile` → candidate `/rejas-metalicas`.

### Portones
`/fabricante-portones-metalicos-chile`, `/puertas-peatonales` → candidate `/portones-metalicos`; `/portones-industriales` remains protected.

### Fabricación / estructuras / servicios
`/estructuras-metalicas-a-pedido`, `/fabricante-estructuras-metalicas-chile`, `/escaleras-metalicas`, `/barandas-metalicas` → candidate `/estructuras-metalicas`; `/metalurgica-rinon` → candidate `/fabricacion-metalica`; `/pintura-electrostatica-santiago` → candidate `/pintura-electrostatica`.

`/barreras-peatonales` remains explicit REVIEW → candidate `/cierres-perimetrales`.

## 5. Approved editorial redirects — flag gated

- `/blog/como-cotizar-rejas-metalicas` → `/recursos/como-cotizar-rejas-metalicas`
- `/blog/tipos-de-cierres-perimetrales` → `/recursos/tipos-de-cierres-perimetrales`
- `/blog/porton-corredizo-vs-batiente` → `/recursos/porton-corredizo-vs-batiente`
- `/blog/mezzanine-metalico-bodega-guia` → `/recursos/mezzanine-metalico-bodega-guia`
- `/blog/proveedor-camarotes-empresas` → `/recursos/proveedor-camarotes-empresas`
- `/blog/como-elegir-reja-metalica-frontis` → `/recursos/como-elegir-reja-metalica-frontis`

## 6. Claim-risk editorial URLs — REVIEW

`/blog/cuanto-cuesta-camarote-chile`, `/blog/cuanto-cuesta-cierre-perimetral-chile`, `/blog/cuanto-cuesta-porton-automatico-chile`, `/blog/altura-reja-casa-seguridad`, `/blog/camarote-nino-6-anos`, `/blog/camarote-para-adulto-mayor`, `/blog/pintura-electrostatica-que-es`, `/blog/camarotes-mineria-que-exige-cada-faena`.

No broad redirect is approved for these pages.

## Cutover completion procedure

1. Export Google Search Console landing pages + queries for the pre-migration comparison window.
2. Crawl complete live `rinon.cl`: URL, status, canonical, title, H1 and internal inlinks.
3. Reconcile crawl + GSC + this inventory.
4. Review every URL with clicks, impressions, backlinks or material commercial intent, including all 53 protected URLs.
5. Resolve every `REVIEW / GSC-PENDING` item.
6. Verify each approved 301 destination is a 200 intent-equivalent owner.
7. Run migration, SEO/CRO, visual, served-build and browser gates on the exact release candidate.
8. Authorize cutover/indexation separately.

**No completed Search Console reconciliation + no `RINON_URL_INVENTORY_COMPLETE=true` means no authorized production cutover.**
