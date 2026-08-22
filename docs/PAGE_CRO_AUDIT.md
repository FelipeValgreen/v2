# RINON 2.0 — Page CRO Audit & Acceptance Matrix

**Release:** RC7  
**North Star:** `organic visibility × commercial intent × conversion × trust`.

## CRO minimum for every commercial landing

A commercial page is APPROVED only when it has:
- one explicit H1 matching the user task;
- clear offer + geography/scope where relevant above the fold;
- primary quote action;
- secondary WhatsApp action;
- evidence/trust content that does not invent proof;
- decision-support content before the final CTA;
- quote CTA carrying the correct category/detail context;
- semantic tracking on CTA interactions;
- mobile no-overflow and usable controls;
- canonical metadata, structured data where applicable and internal links to related intents.

## Tier 1 — revenue / migration critical

| Route | Primary intent | Current CRO state | Remaining before production |
|---|---|---|---|
| `/` | understand RINON + choose path | task-led hero, product/service chapters, quote paths | final high-res contextual structure master |
| `/cotizar` | submit qualified request | 3-step conditional wizard, WhatsApp fallback, secure private attachments | production write only after authorized cutover |
| `/camarotes` | compare/buy camarotes | dedicated category owner + product paths + quote | resolve GSC relationship with live sector/geo pages |
| `/camarote-con-escritorio` | product-specific purchase | dedicated owner + quote/WhatsApp | final verified/reference imagery as available |
| `/cierres-perimetrales` | quote perimeter closure | dedicated commercial owner + quote inputs | GSC review of current geo/sector aliases |
| `/rejas-metalicas` | quote rejas | dedicated owner + decision support + CTA | GSC review of Santiago/Pudahuel live pages |
| `/portones-metalicos` | quote portón | dedicated owner + CTA | GSC review of `/portones-industriales` |
| `/estructuras-metalicas` | custom structural fabrication | contextual/evidence-led page + quote | final premium cobertizo/pergola contextual master |
| `/fabricacion-metalica` | project to measure | human-first “Proyectos a medida” UX + SEO route retained | verified project photography when available |
| `/pintura-electrostatica` | powder-coating service | confirmed service + bounded claims + quote | verified process photography if available |
| `/empresas` | B2B/volume/project inquiry | B2B task path + evidence + quote | real RINON batch/project proof when available |
| `/nosotros` | establish manufacturer/local trust | San Bernardo proof structure + map + directions + CTA | real workshop photography only; never generated proof |
| `/contacto` | contact/visit/quote | task-first contact paths + map + phone/WA/quote | no structural blocker |

## Tier 2 — expanded commercial intent owners

| Route | Intent owner | Required CTA context |
|---|---|---|
| `/camas-metalicas` | camas metálicas | `category=camarotes&detail=camas-metalicas` or equivalent |
| `/camas-balinesas` | camas balinesas | product-specific detail |
| `/mesas-metalicas` | mesas | equipment/product detail |
| `/escritorios-metalicos` | escritorios | equipment/product detail |
| `/equipamiento-metalico` | equipment hub | category/detail preserved |
| `/mallas-3d` | malla/panel 3D | closures + malla 3D detail |
| `/mallas-separadoras` | separation mesh | closures + separation detail |
| `/soldadura-mig` | MIG welding | fabrication + welding detail |
| `/corte-metalico` | cutting/dimensioning | fabrication + cutting detail |
| `/instalacion` | installation/mounting | service detail; copy must say scope-dependent |
| `/reparaciones-metalicas` | repairs | fabrication/service detail |
| `/fabricaciones-especiales` | special metal fabrication | custom-project detail |

All Tier-2 pages must use full SEO titles inside metadata/H1 while navigation may use short commercial names.

## Tier 3 — preserved organic owners

These routes are preserved because a product URL may own independent demand:

`/camarote-nido`, `/camarote-triple`, `/camarote-doble`, `/cama-alta`, `/camarote-titanic`, `/camarote-1-5-plazas`, `/camarote-desmontable`, `/cama-dos-plazas-con-cajon`, `/camarote-2-plazas`, `/cama-institucional-metalica`, `/cama-loft-metalica`, `/cama-loft-con-escritorio`, `/mobiliario-institucional`.

CRO rule: preserve organic relevance while adding quote + WhatsApp paths; do not replace a product-specific H1 with a generic category H1.

## Informational / assistive routes

### `/soluciones`
Role: product/service finder, not a duplicate category page.  
CRO: route the user to a relevant intent owner quickly; avoid flat catalogs.

### `/proyectos`
Role: show project categories/capability, not invent project case studies.  
CRO: move high-intent visitors to quote with enough project context.

### `/recursos` + `/recursos/[slug]`
Role: support research/search intent and move qualified traffic into a related commercial page.  
CRO: contextual inline CTA + end CTA; no forced sales interruption above the answer.

### `/preguntas-frecuentes`
Role: remove purchase friction and strengthen entity/answer coverage.  
CRO: related links and quote path; answers must stay factual/bounded.

## Conversion paths by intent

### Product buyer
`landing → product detail/category → quote(category/detail prefilled) → qualified lead`.

### Custom project
`landing → project/fabrication page → quote(project context) → files/measurements → qualified lead`.

### Company/institution
`Empresas/product page → quote(client=b2b) → company/volume fields → qualified lead → opportunity`.

### Local/contact
`Contacto/Nosotros → phone/WhatsApp/maps or quote`.

## Funnel events

Required dataLayer semantics:
- `page_view`
- `view_product` / `view_service` where implemented
- `quote_start`
- `quote_step`
- `quote_file_added`
- `quote_submit`
- `generate_lead`
- `contact_whatsapp`
- `contact_phone`
- `maps_click`
- `waze_click`
- `menu_product_click`
- `menu_service_click`
- `cta_click`

Production analytics vendors remain consent-gated.

## Known blockers vs defects

Not defects:
- staging `noindex`;
- disabled lead persistence in normal staging;
- unresolved GSC migration review;
- evidence panels where no verified RINON image exists.

Release blockers:
- broken logo/assets;
- default browser link styles;
- horizontal overflow;
- inaccessible navigation/quote flow;
- false or unsupported trust/technical claims;
- missing canonical/SEO owner;
- migration of a protected live URL without GSC resolution;
- public or unauthenticated quote attachments;
- production cutover without explicit authorization.
