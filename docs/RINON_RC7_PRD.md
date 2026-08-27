# RINON 2.0 — PRD RC.7

**Status:** SAFE PRE-CUTOVER  
**Product owner:** ChatGPT/user collaboration  
**Technical co-reviewer:** Claude  
**Repository:** `FelipeValgreen/v2`  
**Staging:** `https://rinon-v2.vercel.app`  
**Production:** `https://rinon.cl` — DO NOT TOUCH WITHOUT EXPLICIT CUTOVER AUTHORIZATION

---

# 1. Product goal

Build a RINON website that is simultaneously:

- commercially understandable;
- credible as a real metal manufacturer;
- high-converting for consumer and B2B traffic;
- SEO migration-safe;
- structured for SGEO/AI search;
- responsive and accessible;
- operationally connected to quote intake, private attachments and CRM qualification;
- fail-closed until production authorization.

North-star formula:

`Organic visibility × commercial intent × conversion × trust`

A release is not successful because it compiles. It is successful when a real user can understand what RINON does, find the relevant solution, trust the company and start the correct commercial action without friction.

---

# 2. Business context

RINON / Tolipoli SpA is a metal manufacturer located at Portezuelo 1506, San Bernardo, Región Metropolitana, Chile.

Contact / WhatsApp: +56 9 7589 3742.

RINON serves:

- individuals;
- companies;
- institutions;
- contractors;
- industrial buyers;
- warehouses;
- condominiums;
- construction/faena requirements;
- one-off fabrication;
- volume/recurrent fabrication.

Confirmed/accepted commercial categories include the following.

## Products

### Camas y descanso
- camarotes;
- camas metálicas;
- camas balinesas.

### Mobiliario y equipamiento
- mesas;
- escritorios;
- equipamiento / racks / institutional metal furniture where applicable.

### Cierres y accesos
- cierres perimetrales;
- rejas;
- portones;
- malla 3D;
- mallas/divisiones.

### Estructuras
- estructuras metálicas;
- cobertizos/pérgolas when within project scope;
- escaleras/plataformas;
- soportes/bastidores;
- fabricaciones especiales.

## Services
- proyectos / fabricación a medida;
- soldadura MIG;
- corte y dimensionado;
- pintura electrostática;
- instalación/montaje according to scope;
- reparaciones/recuperación.

No unsupported certification, load, engineering, warranty, price, delivery-time or technical coating claim may be introduced without evidence.

---

# 3. Primary user jobs

The architecture must support these journeys in at most approximately two navigation decisions:

1. “Necesito un portón para mi casa.”
2. “Necesito cotizar 120 camarotes para una faena.”
3. “Tengo una foto/plano y quiero fabricar algo.”
4. “Quiero una pérgola o cobertizo metálico.”
5. “Necesito reparar una reja/estructura.”
6. “Necesito pintar piezas con pintura electrostática.”
7. “Necesito fabricar piezas/soportes desde plano.”
8. “Soy de compras y quiero saber si trabajan por volumen.”
9. “Quiero saber dónde está el taller.”
10. “Quiero comprobar qué productos/proyectos pueden fabricar realmente.”

---

# 4. Information architecture

Human-facing header target:

`Productos ↓ | Proyectos a medida | Empresas | Servicios ↓ | Nosotros | [Cotizar]`

## Productos dropdown

### Camas y descanso
- Camarotes → `/camarotes`
- Camas metálicas → `/camas-metalicas`
- Camas balinesas → `/camas-balinesas`

### Mobiliario y equipamiento
- Mesas → `/mesas-metalicas`
- Escritorios → `/escritorios-metalicos`
- Equipamiento → `/equipamiento-metalico`

### Cierres y accesos
- Cierres → `/cierres-perimetrales`
- Rejas → `/rejas-metalicas`
- Portones → `/portones-metalicos`
- Malla 3D → `/mallas-3d`
- Divisiones → `/mallas-separadoras`

### Estructuras
- Estructuras metálicas → `/estructuras-metalicas`
- Fabricaciones especiales → `/fabricaciones-especiales`

## Servicios dropdown
- Soldadura MIG → `/soldadura-mig`
- Corte y dimensionado → `/corte-metalico`
- Pintura electrostática → `/pintura-electrostatica`
- Instalación y montaje → `/instalacion`
- Reparaciones → `/reparaciones-metalicas`

`/fabricacion-metalica` remains the SEO URL owner for the transversal custom-fabrication intent, but the human navigation label is **Proyectos a medida**.

Do not reintroduce a duplicate “Fabricación a medida” item under Services.

---

# 5. UX principles

## 5.1 First viewport
Every commercial landing must answer:

- what is offered;
- who/what it is for;
- what the next commercial action is.

## 5.2 Language
Use customer language before internal process language.

Prefer:
- “Cuéntanos qué necesitas”;
- “Envíanos una foto, plano o medidas”;
- “Cotizar”;
- “Hablar por WhatsApp”.

Avoid overusing:
- requerimiento;
- alcance;
- factibilidad;
- evaluación;
- fabricación metálica as generic filler.

## 5.3 CTA model
Primary: category-specific quote / `Cotizar`.
Secondary: WhatsApp when appropriate.

Desktop: header CTA is primary; avoid redundant persistent dock.
Mobile/tablet: sticky commercial actions may remain if usable and non-obstructive.

---

# 6. Quote flow

`/cotizar` is a true progressive wizard.

## Step 1 — Requerimiento
Identify intent:
- Producto;
- Proyecto a medida;
- Empresa / volumen.

Then identify relevant product/service/category.

## Step 2 — Contexto
Reveal only fields relevant to the selected intent, e.g.:
- quantity;
- dimensions;
- location;
- target date;
- installation requirement;
- whether a plan/reference exists;
- use/context;
- company details when applicable.

Allow up to 3 private attachments (approved MIME/size contract): image or PDF references.

## Step 3 — Contacto
- name;
- WhatsApp/phone;
- email where applicable;
- company if applicable;
- consent/privacy.

Tracking must preserve `quote_start`, `quote_step`, `quote_submit` and contextual CTA attribution.

Structured CRM fields are canonical for qualification; `mensaje` remains a readable fallback.

---

# 7. Visual system

Brand direction:

- industrial premium;
- graphite / black / white;
- RINON orange accent;
- Raleway;
- modular geometry;
- real metal/product/taller evidence before abstract diagrams.

Evidence hierarchy:

1. verified RINON photography;
2. user/archive reference photography with explicit non-attribution;
3. approved current-site reference;
4. conceptual/render with clear label;
5. technical diagram only as explanatory support.

Never imply a render/reference is a completed RINON project.

Every governed asset requires `sourceRef`. `verified-rinon` additionally requires `verificationRef`.

Large hero imagery must have sufficient intrinsic resolution for the rendered DPR. Low-resolution raster stretching is a release defect.

## Structures visual direction
The desired residential concept is a premium metal pergola/carport integrated into a contemporary Mediterranean-style house plausible for Chicureo / central Chile. It must look technically buildable, not like generic AI architecture.

Until verified execution photography exists, any such asset must be labelled conceptual/reference/render.

---

# 8. SEO migration

This is a zero-loss migration.

Existing organic baseline from the user-provided Search Console screenshot:

- ~125 clicks;
- ~6.13k impressions;
- ~2% CTR;
- ~14.7 average position;
- approximate user-described window: ~3 months.

The baseline is a starting point, not the target.

## Migration actions
- KEEP 200
- REBUILD
- 301
- REVIEW / GSC-PENDING
- 410 only if explicitly justified

No blanket redirects to Home or generic hubs.

A live/indexable/currently linked URL with potentially distinct query equity must remain quarantined until Search Console landing-page/query evidence is reviewed.

Current machine-readable GSC-pending protection set: **36 live-observed URLs**.

Production cutover must fail while pending count is not zero.

Source of truth:
- `docs/URL-MIGRATION-INVENTORY.md`
- `docs/SEO_MIGRATION_MATRIX.csv`
- `lib/migration.ts`
- `scripts/check-migration-contract.mjs`

---

# 9. SEO / SGEO page requirements

Commercial owners should have, where appropriate:

- unique title;
- unique description;
- exactly one meaningful H1;
- canonical;
- staging noindex until cutover;
- coherent H2 structure;
- internal links to adjacent intent owners;
- visible factual FAQ where useful;
- matching FAQ schema if FAQ schema is emitted;
- BreadcrumbList;
- correct Product/Service/Collection semantics;
- no schema-only invisible claims;
- descriptive image alt text;
- explicit location/entity context where genuinely relevant.

Do not create thin location doorway pages solely for keyword coverage.

---

# 10. Local trust

`/nosotros` and `/contacto` must clearly expose:

- RINON location;
- Portezuelo 1506, San Bernardo;
- Maps access;
- Waze access;
- phone/WhatsApp;
- workshop/manufacturer positioning;
- real evidence where available.

The purpose of `Nosotros` is primarily trust and existence proof, not another generic sales template.

---

# 11. B2B requirements

`/empresas` must support purchasing and operational users.

It should make clear:

- volume/recurrent requirements can be evaluated;
- plans/specifications/references can be supplied;
- category-specific paths are available;
- quote/WhatsApp are accessible;
- no unsupported capacity/certification claim is used.

B2B language should be precise without sounding like an internal procurement procedure.

---

# 12. Security / data

## Quote attachments
- private Supabase bucket;
- not publicly addressable;
- admin-authenticated access only;
- lead created before attachment storage;
- association validated by lead + attachment ID;
- rollback on partial upload failure;
- allowed MIME/count/size enforced client + server;
- randomized object name;
- no service role credential sent to browser.

## Admin
Do not weaken authentication, caching restrictions, same-origin behavior or IDOR protection.

---

# 13. Responsive / accessibility

Review at minimum:

320, 375, 430, 768, 1024, 1366, 1440, 1600, 1920 px.

Acceptance includes:

- no horizontal overflow;
- readable typography;
- correct image crop/density;
- working desktop dropdowns;
- working mobile accordions/dialog;
- keyboard navigation;
- focus visibility;
- Escape/focus trap where relevant;
- usable forms;
- accessible map/direction controls;
- non-obstructive sticky mobile CTA.

---

# 14. Analytics

Important commercial events include:

- page_view;
- view_product;
- view_service;
- quote_start;
- quote_step;
- quote_submit;
- contact_whatsapp;
- contact_phone;
- maps_click;
- waze_click;
- menu_product_click;
- menu_service_click;
- resource_view;
- cta_click.

Production tracking remains fail-closed until authorized.

---

# 15. Release contract

A release is not ready until the relevant gates pass.

Expected chain includes:

- migration contract;
- SEO/CRO contract;
- visual provenance contract;
- attachment contract;
- structured CRM contract;
- production preflight;
- Next build;
- served build QA;
- browser/Playwright QA;
- remote deployment verification;
- runtime log review.

Never weaken a release gate simply to obtain green status.

---

# 16. Production hard blockers

No agent may bypass these:

1. Search Console / URL migration reconciliation unresolved;
2. required legal approval not complete;
3. final visual acceptance not complete;
4. explicit production cutover authorization not given.

Production-sensitive ambiguity always resolves to fail-closed.

---

# 17. Claude contribution target

Claude should add the most value by independently challenging and improving:

- React/Next architecture;
- CSS/layout quality;
- responsive behavior;
- accessibility;
- runtime/performance;
- image delivery and LCP/CLS;
- quote state/validation edge cases;
- upload/admin security;
- testing blind spots;
- maintainability and duplication;
- browser reality vs static assumptions.

Claude should not spend its first pass rewriting strategy that already has explicit product/SEO evidence. Challenge it when code/user impact proves it wrong.

---

# 18. Definition of Done

RINON 2.0 is complete for cutover review when a real person can:

1. understand that RINON manufactures metal products/solutions;
2. understand the major product families;
3. find the relevant category quickly;
4. distinguish product, custom project, B2B and service intents;
5. see credible evidence appropriate to the category;
6. navigate desktop/mobile without confusion;
7. start a quote in approximately two decisions;
8. attach useful reference material securely;
9. trust contact/location information;
10. encounter no broken logo/image/layout/navigation behavior;
11. enter through preserved organic URLs without loss-producing migration mistakes;
12. be measured correctly once authorized production analytics is enabled.

The final cutover itself still requires the explicit authorization and evidence described in `docs/RELEASE_CUTOVER_RUNBOOK.md`.
