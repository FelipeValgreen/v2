# CODEX_HANDOFF.md — RINON V2

Cut date: 2026-08-27

## 1. Purpose
This document transfers the complete working context required to continue RINON V2 safely from the ChatGPT project into Codex on a local Mac.

Use together with root `AGENTS.md`.

## 2. Repository / environments
- GitHub: `FelipeValgreen/v2`
- Production branch: `main`
- Codex branch: `codex/rc7`
- Vercel project: `rinon-v2`
- Staging/review alias: `https://rinon-v2.vercel.app`
- Live production: `https://rinon.cl`

Production must not be modified until explicit cutover approval.

## 3. Current release baseline
Current main baseline before this handoff:
- release label: `1.0.0-rc.6`
- main commit at audit time: `32f544052dd00d772a57527b1be113c2ca3b713e`

RC.6 includes:
- Products + Services mega navigation;
- mobile navigation;
- four-column footer;
- Home entry paths Product / A medida / Empresa;
- Nosotros + map + Google Maps + Waze;
- Contact page restructuring;
- expanded catalog owner routes;
- quote form grouped into requirement/context/contact;
- migration and production preflight gates;
- Playwright browser QA;
- staging noindex/fail-closed release flags.

RC.6 is NOT visually approved for production.

## 4. Business context
RINON / Tolipoli SpA is a direct metal manufacturer in San Bernardo, Santiago.

Public address:
Portezuelo 1506, San Bernardo, Región Metropolitana, Chile.

Commercial audience:
- individuals;
- companies;
- institutions;
- construction;
- industry;
- warehouses/logistics;
- condominiums;
- work sites/faenas;
- unit and volume purchasing.

Main commercial families:
- beds and bunk beds;
- Balinese beds;
- tables/desks/equipment;
- perimeter closures;
- grilles;
- gates;
- 3D mesh;
- separator mesh;
- custom structures;
- special fabrications;
- MIG welding;
- cutting/dimensioning;
- powder coating;
- installation according to scope;
- repairs/recovery.

## 5. Critical audit result
The multidisciplinary audit concluded that RC.6 has a strong technical/SEO foundation but a weak user-facing evidence layer.

High-level assessment at audit time:
- SEO / technical architecture: strong;
- technical-veracity controls: strong;
- messaging/CRO: medium;
- responsive/navigation: medium-low;
- visual evidence/brand trust: weak;
- remote deployment visual QA: weak.

Core product diagnosis:
> The system is organized technically, but it still looks too much like a conceptual presentation about metal fabrication instead of a real manufacturer showing what it makes.

RC.7 direction:
> industrial tangible.

Keep the brand, improve evidence and usability.

## 6. Confirmed P0 defects

### P0.1 Header/footer logo rendering
User screenshots show the RINON logo as broken in the deployed browser.

Root cause update from RC.7 diagnostics:
`public/brand/logo-rinon-horizontal-white.png` was a corrupt PNG. It could return HTTP 200 and expose an IHDR that file-type tools read as `880 x 168`, but Chromium could not decode it: `complete:true`, `naturalWidth:0`, and `createImageBitmap` failed with `InvalidStateError`.

The fix that switched `SiteHeader.tsx`, `SiteFooter.tsx` and mobile navigation to `/brand/logo-rinon-horizontal-transparent.png` was directionally right — this was never a `next/image` optimization bug — but it did **not** resolve P0.1.

**P0.1 remains open.** `logo-rinon-horizontal-transparent.png` is also damaged. Its `IDAT` chunk declares 19181 bytes while only 14544 are present, so the zlib stream is incomplete and `inflateSync` fails with `unexpected end of file`. Chromium is permissive: it reports the intact `IHDR` dimensions (880×168) and renders whatever scanlines it can, which is visual garbage. `apple-touch-icon-180.png` has the same defect (8599 declared vs 8532 present). Only `favicon-64.png` is intact.

Consequence: the assertion `complete && naturalWidth > 100` cannot detect this class of damage, because `naturalWidth` is read from `IHDR`, which survives. Every build since RC.6 has been publishing a broken wordmark.

The repository currently has **no valid horizontal RINON logo**. This needs an original asset from the owner; it cannot be reconstructed from what is committed. Registered as `brand-logo-final-master` and `brand-isotype-final-master` in `VISUAL_CUTOVER_BLOCKERS`.

The stale public alias `https://rinon-v2.vercel.app` also served an older build during diagnostics, which explained remote failures where the HTML still referenced the white logo or old mobile-nav CSS.

Required RC.7 outcome:
- use a robust direct/unoptimized identity path where appropriate;
- remove corrupt identity assets that are no longer referenced;
- confirm actual painting in the remote browser;
- test image `complete`, `naturalWidth`, visible dimensions and absence of failed requests.

Do not consider HTTP 200 sufficient.

### P0.2 Broken structure/pergola visual quality
Known bad asset:
`public/visuals/structures/pergola-mediterranea-conceptual.svg`

It is an SVG wrapper around an embedded raster JPEG of only 420×185 px.

It is enlarged into a large chapter block and appears heavily blurred/pixelated.

Do not repair with filters/CSS.
Delete/replace the commercial use of this asset with a proper high-resolution visual.

Target concept:
- premium metal cobertizo/pergola;
- contemporary Mediterranean-style Chilean/Chicureo-type home;
- structure clearly legible;
- craftsmanship/finish visible;
- believable residential context;
- not a generic impossible AI building;
- label as conceptual if it is not an executed RINON project.

### P0.3 Visual evidence coverage
Current central visual registry (`lib/visuals.ts`) explicitly supports only a small subset of solution families, especially camarotes, cierres and estructuras.

Many commercial pages therefore fall back to `TechnicalVisual`.

`CommercialExpansionPage` currently uses a technical illustration as its hero visual for new product/service pages.

This is the primary systemic visual problem.

Required RC.7 outcome:
Create a real visual-evidence system with per-page asset inventory, provenance and quality gates.

### P0.4 Navigation collision
Current menu logic mixes user models:
- Productos;
- Servicios;
- A medida;
- Empresas;
- Proyectos;
- Contacto.

At the same time Services includes `Fabricación a medida`, and Products includes a group called `Proyectos` containing structures/special fabrication.

This creates semantic collisions between:
- A medida;
- Fabricación a medida;
- Fabricaciones especiales;
- Proyectos;
- Estructuras.

RC.7 target hypothesis:
`Productos ▼ | Proyectos a medida | Empresas | Servicios ▼ | Nosotros | [Cotizar]`

Remove `Proyectos` from primary navigation until it has enough real/verifiable portfolio evidence.
Keep `/proyectos` available internally/SEO.

Remove `Contacto` from the primary header if testing confirms Footer/WhatsApp/Cotizar/Nosotros cover the task sufficiently.
Keep `/contacto` available.

### P0.5 Remote browser QA gap
Local Playwright is good but the actual deployment receives only remote HTTP smoke validation.

Therefore localhost can pass while Vercel rendering fails.

Required RC.7 outcome:
Run a browser/render gate against the actual deployed Vercel URL before declaring a release candidate approved.

### P0.6 Responsive navigation
Current CSS switches to mobile navigation below about 1100px and also hides the header CTA.

The mobile dialog itself includes good focus/escape/scroll-lock mechanics, but the information architecture remains too dense.

RC.7 first layer:
- Productos
- Proyectos a medida
- Empresas
- Servicios
- Nosotros

Commercial actions after navigation:
- WhatsApp
- Cotizar

## 7. RC.7 target IA

### Desktop header
1. Productos ▼
2. Proyectos a medida
3. Empresas
4. Servicios ▼
5. Nosotros
6. CTA: Cotizar

### Products mega menu
Camas y descanso:
- Camarotes
- Camas metálicas
- Camas balinesas

Mobiliario y equipamiento:
- Mesas
- Escritorios
- Equipamiento

Cierres y accesos:
- Cierres
- Rejas
- Portones
- Malla 3D
- Divisiones / mallas separadoras

Estructuras:
- Estructuras metálicas
- Fabricaciones especiales

### Services menu
- Soldadura MIG
- Corte y dimensionado
- Pintura electrostática
- Instalación y montaje
- Reparaciones

No duplicate Fabricación a medida here.

## 8. `/fabricacion-metalica` strategy
Do not delete or casually redirect this URL.
It is an important SEO owner.

Visible navigation label:
`Proyectos a medida`

SEO title can remain oriented to:
`Fabricación metálica a medida en Santiago`

Recommended user-facing content direction:
Eyebrow: `PROYECTOS A MEDIDA`

H1:
`Tu proyecto en metal, hecho a medida.`

Body direction:
`Envíanos una foto, plano, croquis, muestra o medidas. Revisamos qué necesitas resolver y definimos contigo la forma de fabricarlo.`

Primary CTA:
`Cotizar proyecto a medida`

Secondary:
`Enviar referencia por WhatsApp`

SEO labels and human labels do not have to be identical.

## 9. `/proyectos` strategy
Current page is more of an evidence/documentation framework than a mature portfolio.

Do not fabricate portfolio cases.

RC.7:
- remove from primary header;
- keep route alive;
- keep contextual/internal links;
- rebuild later as `Proyectos realizados` or `Casos` only when there is enough verified evidence.

## 10. Visual system target
Every commercial landing must answer visually within ~3 seconds:
`What does RINON actually make here?`

Recommended hero evidence by page:
- Home: real/conceptual high-quality manufacturing/welding scene;
- Soluciones: visual category finder/mosaic;
- Camarotes: actual/reference bunk product;
- Camas: actual metal bed;
- Balinesas: contextual exterior structure;
- Mesas: finished metal-base table;
- Escritorios: finished product;
- Cierres: installed perimeter system;
- Rejas: finished/installed grille;
- Portones: finished gate;
- Malla 3D: installed panel;
- Estructuras: premium pergola/cobertizo or relevant structure;
- Equipamiento: rack/locker/equipment;
- Proyectos a medida: reference → fabrication → result;
- Soldadura: real process/detail;
- Corte: real process;
- Pintura electrostática: pieces/process/finish;
- Instalación: site assembly;
- Reparaciones: before/process/after;
- Empresas: lot/series/taller/production evidence;
- Nosotros: real workshop;
- Contacto: workshop/contact/map; no abstract illustration required;
- Cotizar: form is the protagonist.

Technical drawings become secondary explanatory modules.

## 11. Home direction
Keep the current strategic headline:
`Lo necesitas en metal. Lo fabricamos.`

Keep the three-path concept but rename:
- Producto
- Proyecto a medida
- Empresa

Simplify process language where useful:
- Cuéntanos
- Definimos
- Fabricamos
- Entregamos

Preserve deeper technical explanation below.

## 12. Soluciones direction
Rebuild as a visual product finder.

Top question:
`¿Qué necesitas?`

Prioritize visual recognition over taxonomy explanation.

Example top-level tiles:
- Camarotes
- Camas
- Mobiliario
- Cierres
- Rejas
- Portones
- Estructuras
- Equipamiento

Then:
`¿No aparece lo que buscas? → Proyectos a medida`

## 13. Empresas direction
The current B2B logic is useful, but the first screen must prove capability.

Recommended H1 direction:
`Fabricación para empresas, obras e instituciones.`

Recommended body direction:
`Desde una serie de camarotes hasta cierres, estructuras, soportes o piezas bajo plano. Cuéntanos cantidad, destino y fecha objetivo.`

Hero visual should show real/credible production, series, structures or workshop context — not only the technical rack illustration.

Reduce excessive administrative language while preserving procurement usefulness.

## 14. Nosotros direction
Current `Fabricamos en San Bernardo.` direction is good.

Hero should be the strongest real trust evidence available:
- workshop;
- people;
- machinery/process;
- recognizable metal work.

Then capabilities, process, location, map, directions.

The page’s job is to prove RINON exists and manufactures.

## 15. Contact direction
Keep quote/WhatsApp/company pathways but simplify.

Technical visual is not necessary in the hero.

Address/phone/WhatsApp/map must be readable on narrow screens without awkward wrapping.

## 16. Quote/CRO direction
Current `QuoteForm` visually has 3 stages but renders all stages in one long form.

RC.7 should become a true progressive flow.

Step 1 — What do you need?
- Product
- Project/custom
- Company/volume
- category

Step 2 — Context
Render only fields relevant to the selected category.

Step 3 — Contact
- name
- WhatsApp
- optional email
- organization if applicable
- privacy consent

Preserve source/category/detail attribution.

Important missing capability:
Users need to provide photos/plans/croquis. Prepare secure attachment UX for JPG/PNG/PDF, but do not activate production uploads until storage/privacy/security implementation is explicitly ready.

## 17. CTA direction
Global header CTA:
`Cotizar`

Contextual landing CTAs can be specific:
- Cotizar camarotes
- Cotizar cierre
- Cotizar estructura
- Cotizar pintura
- Cotizar proyecto a medida

Reason: not every visitor perceives a bed, repair or cut as a “project”.

## 18. Desktop/mobile commercial dock
Current `CommercialDock` repeats WhatsApp/Cotizar on most internal pages.

Recommendation:
- desktop: remove/hide dock; header CTA is enough;
- tablet/mobile: retain a well-designed bottom action bar if it improves conversion.

Test rather than blindly applying the same behavior to all widths.

## 19. Copy direction
Reduce procedural repetition such as:
- requerimiento;
- alcance;
- evaluación;
- factibilidad;
- fabricación metálica.

Use customer language first.

Example:
Instead of:
`Evaluamos el requerimiento y alcance antes de fabricar.`

Prefer:
`Envíanos una foto, plano o medidas. Revisamos qué se puede fabricar y qué necesitamos para cotizar.`

Do not sacrifice technical accuracy.

## 20. Page-template strategy
Do not force every landing into the exact same long `SolutionPage` sequence.

Current solution template tends to repeat:
- requirement flow;
- story;
- scope;
- feature band;
- fit;
- applications;
- evidence;
- quote inputs;
- FAQ;
- final CTA.

RC.7 should modularize by intent.

Examples:

Camarotes:
product → configurations → construction/detail → volume → FAQ → quote.

Repairs:
problem → what is repairable → process → when replacement is better → photos → quote.

Structures:
contexts/types → evidence → process → inputs → installation → FAQ → quote.

## 21. SEO / migration protection
Preserve existing zero-loss migration work.

Do not blanket redirect.

Do not change important legacy targets without Search Console / evidence.

Existing production migration remains fail-closed until cutover authorization.

Historical/current public URL families have been explicitly protected in migration contracts.

Important architectural caution:
Past planning proposed changing `/soldadura-metalica-santiago` toward `/soldadura-mig`; older locked code routed it to `/fabricacion-metalica`. Any migration target change must be evidence-led, not silently modified.

## 22. Search baseline
User-provided Search Console screenshot baseline for approximately three months:
- 125 clicks
- 6.13k impressions
- 2% CTR
- average position 14.7

Treat this only as a global screenshot baseline until URL/query-level Search Console data is joined.

Migration objective:
zero loss + organic growth + conversion growth.

## 23. Schema / SGEO
CommercialExpansion pages already distinguish Product vs Service.

Core SolutionPage schema architecture historically treated solution entities too generically as Service.

RC.7 should centralize entity typing.

Do not add fake:
- prices;
- stock;
- reviews;
- ratings;
- guarantees;
- certifications.

## 24. Existing capability truth registry
Read `lib/capabilities.ts` before changing technical claims.

Important rules:
- installation is conditional by project/location;
- powder coating can be offered with bounded claims only;
- granallado/sandblasting remains not publicly operational until enabled/validated;
- structural engineering is not included by default;
- welding certifications are not claimable without evidence;
- certified loads are not claimable without engineering/evidence.

## 25. Responsive acceptance
Validate at:
320 / 360 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1366 / 1440 / 1600 / 1920.

Check:
- header/logo;
- navigation;
- menu depth;
- hero text;
- image crop and quality;
- CTA visibility;
- sticky elements;
- local solution nav;
- form fields;
- maps;
- phone wrapping;
- footer;
- horizontal overflow.

## 26. QA gap and target pipeline
Existing local browser QA includes useful checks like logo naturalWidth and no overflow.

Problem:
remote deployment smoke currently validates HTTP/assets but not the fully rendered Vercel page in Chromium.

RC.7 target pipeline:
`static/type → migration/preflight → local build → local browser → Vercel deployment → remote HTTP → remote Chromium → responsive viewport suite → image quality → critical journeys`

Do not declare success from a 200 response alone.

## 27. Critical user journeys
All should reach an understandable destination in <= 2 navigation decisions:

1. “Necesito un portón corredizo para mi casa.”
2. “Necesito cotizar 120 camarotes para una faena.”
3. “Tengo una foto de una estructura y quiero que la fabriquen.”
4. “Necesito hacer una pérgola metálica en mi terraza.”
5. “Se me rompió una reja y quiero repararla.”
6. “Necesito pintar 40 piezas con pintura electrostática.”
7. “Necesito una serie de soportes fabricados desde un plano.”
8. “Soy de compras y necesito saber si trabajan por volumen.”
9. “Quiero saber dónde está el taller.”
10. “Quiero comprobar qué cosas han fabricado realmente.”

RC.7 target: 10/10 clear.

## 28. Priority backlog

### P0
- robust logo rendering;
- replace 420×185 pergola visual;
- build visual evidence registry/system;
- simplify navigation IA;
- reframe `/fabricacion-metalica` as Proyectos a medida in UX;
- remove primary-nav collision;
- remote Vercel browser QA;
- real responsive QA.

### P1
- rebuild Soluciones as visual finder;
- rebuild Empresas hero/evidence;
- rebuild Nosotros hero with workshop evidence;
- restructure `/fabricacion-metalica` content;
- demote `/proyectos` from primary nav;
- true progressive quote wizard;
- prepare photo/PDF attachment path;
- reduce repetitive procedural copy;
- modularize commercial templates;
- normalize Product/Service schema;
- desktop/mobile commercial dock behavior.

### P2
- verified project portfolio;
- richer real RINON photo bank;
- B2B cases;
- verifiable social proof;
- B2B capability dossier;
- post-launch CTR/CRO tests.

## 29. What must be preserved
Do not throw away the good foundation:
- Home strategic message;
- dark/graphite/orange/Raleway brand system;
- existing SEO owner URLs;
- migration allowlists/contracts;
- staging noindex;
- production preflight;
- capability truth registry;
- contextual quote attribution;
- Maps/Waze location work;
- accessibility/focus work already implemented;
- conservative technical copy policy.

## 30. Recommended Codex agent orchestration
When starting implementation, use isolated agents/worktrees where valuable:

A. IA/navigation agent
- navigation.ts
- desktop/mobile header
- footer
- breadcrumbs/local nav

B. Visual evidence agent
- image inventory
- visual registry
- hero/media modules
- resolution/provenance checks

C. Responsive agent
- viewport matrix
- header/mobile/sticky/local-nav/footer

D. Commercial/CRO agent
- page hierarchy/copy
- Empresas/Nosotros/Soluciones/custom-project flow

E. Quote agent
- true wizard
- conditional fields
- attribution
- attachment architecture (non-production until approved)

F. SEO/SGEO agent
- owner URLs
- schema types
- metadata/internal linking
- migration protection

G. QA/release agent
- local browser
- remote deployment browser
- visual/image gates
- critical journeys

Integration owner must reconcile all outputs. Do not merge independently contradictory redesigns.

## 31. First Codex task
Do NOT start with broad refactoring.

First run a verification loop on branch `codex/rc7`:
1. inspect `git status`, branch and latest commits;
2. read `AGENTS.md` and this file;
3. inspect current source paths referenced by the P0 list;
4. run existing test/build baseline locally;
5. open the current staging deployment and reproduce the logo + pergola/evidence problems;
6. write a short implementation plan mapped to P0 files;
7. then begin the smallest safe P0 batch.

Suggested first implementation batch after verification:
- identity asset rendering;
- navigation IA data model;
- remote QA support scaffolding;
- visual-evidence data model;
- replace/remove known broken pergola asset use.

Do not activate production.

## 32. Definition of done for RC.7
RC.7 is not approved merely because CI is green.

A real user must be able to:
1. recognize RINON as a manufacturer;
2. understand what it makes;
3. select the correct category quickly;
4. trust that the company exists;
5. see evidence relevant to the page;
6. navigate desktop/mobile without ambiguity;
7. reach quote flow quickly;
8. complete the flow without broken layout;
9. distinguish products/custom projects/services;
10. always see the brand correctly;
11. never encounter blurred/broken hero imagery;
12. understand the site without metalworking expertise.

All critical claims, SEO contracts and production-safety gates must remain intact.
