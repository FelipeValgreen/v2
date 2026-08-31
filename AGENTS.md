# AGENTS.md — RINON V2 / Codex

## Mission
Continue RINON 2.0 from the audited RC.6 baseline toward RC.7 without losing SEO, migration, CRO, brand, technical-veracity or release-safety work already completed.

Before changing code, read this file and `CODEX_HANDOFF.md` completely. Treat both as project-level operating instructions.

## Repository / branch
- Repository: `FelipeValgreen/v2`
- Production branch: `main`
- Codex working branch: `codex/rc7`
- Do not push implementation directly to `main` unless the owner explicitly requests it.
- Prefer feature branches/worktrees for parallel agents, then reconcile into `codex/rc7`.

## Production safety — absolute rules
The live site `rinon.cl` must remain untouched until explicit cutover authorization.

Never do any of the following without explicit owner authorization:
- connect or modify production domain/DNS;
- activate production redirects;
- activate indexation;
- enable real lead writes;
- enable production analytics/tracking;
- change legal text in a material way;
- delete or consolidate SEO URLs with uncertain organic value;
- publish unverified technical, safety, certification, capacity, warranty or performance claims;
- perform irreversible infrastructure actions.

Staging / preview must remain fail-closed and noindex.

## Current product objective
RINON must feel like a real, capable metal manufacturer — not a conceptual presentation about manufacturing.

Primary product formula:
`organic visibility × commercial intent × conversion × brand trust`

A page is not approved because it compiles or returns HTTP 200. It is approved when a real user can understand what RINON makes, trust that the company exists, find the correct category quickly, see relevant evidence, and reach a quote action without friction.

## Business truth
RINON / Tolipoli SpA operates from Portezuelo 1506, San Bernardo, Región Metropolitana, Chile.

Confirmed/usable commercial areas include:
- metal beds and bunk beds;
- beds, Balinese beds, tables and desks;
- perimeter closures, grilles, gates, 3D mesh and separator mesh;
- custom metal structures;
- metal equipment / racks / supports subject to scope;
- custom fabrication;
- MIG welding;
- cutting and dimensioning;
- powder coating subject to piece/dimension/preparation/color/quantity/scope evaluation;
- repairs/modifications/recovery;
- installation/dispatch only according to project and location scope.

Do not infer certified loads, welding certifications, structural engineering/memory calculations, universal dimensions, guarantees, machine capacities or durability without evidence.

## RC.7 navigation hypothesis
Evaluate and implement only after confirming the audit conclusions in `CODEX_HANDOFF.md`:

Desktop target:
- Productos ▼
- Proyectos a medida
- Empresas
- Servicios ▼
- Nosotros
- [Cotizar]

Products:
- Camas y descanso: Camarotes, Camas metálicas, Camas balinesas
- Mobiliario y equipamiento: Mesas, Escritorios, Equipamiento
- Cierres y accesos: Cierres, Rejas, Portones, Malla 3D, Divisiones
- Estructuras: Estructuras metálicas, Fabricaciones especiales

Services:
- Soldadura MIG
- Corte y dimensionado
- Pintura electrostática
- Instalación y montaje
- Reparaciones

Do not duplicate “Fabricación a medida” inside Services if `/fabricacion-metalica` is presented to users as “Proyectos a medida”. Preserve the URL for SEO unless migration evidence says otherwise.

`/proyectos` should not occupy primary navigation until it contains sufficient real/verifiable project evidence.

## Visual evidence rules
Priority order:
1. verified RINON photography;
2. approved current-site RINON photography;
3. high-quality, clearly labelled conceptual photorealistic imagery;
4. technical diagram/render only as supporting explanation.

Never use a technical drawing as the default commercial hero simply because no photo exists.

Hero/chapter image quality:
- target 2000–2400px wide for large desktop media;
- minimum about 1600px for large commercial imagery;
- WebP/AVIF preferred;
- no low-resolution raster hidden inside SVG;
- validate crop/object-position at desktop, tablet and mobile;
- validate rendered image against intrinsic resolution;
- conceptual imagery must not be presented as an executed RINON project.

The current `pergola-mediterranea-conceptual.svg` is known-bad: it embeds a 420×185 JPEG and must be replaced, not tuned with CSS.

### Assets de identidad
No commitear binarios de marca directo sin verificación. Dos vías admitidas: SVG vectorial oficial, o el mecanismo `.asset-chunks` + base64 + sha256 que ya usa `public/visuals`.

Causa histórica: `public/visuals` tiene reconstrucción por chunks precisamente porque el traspaso binario no era fiable. Los rasters de marca se saltaron ese camino y llegaron truncados — `logo-rinon-horizontal-white.png`, `logo-rinon-horizontal-transparent.png`, `apple-touch-icon-180.png` e `isotipo-rinoceronte-transparent.webp`. Todos pasaban HTTP 200 y `file`.

Riesgo de entorno confirmado en RC.7: el repo estaba bajo `~/Documents`, con `com.apple.CloudDocs.iCloudDriveFileProvider` activo, y aparecieron artefactos de conflicto tipo `* [0-9].*` en `.next`, `playwright-report` y `test-results`. Ese patrón es compatible con sincronización de iCloud Drive y puede repetir corrupción/truncado en binarios. No mover el repo automáticamente: recomendar al dueño trabajar fuera de `~/Documents` o desactivar sincronización de Escritorio y Documentos. Antes de integrar nuevos assets binarios, revisar `find . -name "* [0-9].*" -not -path "*/node_modules/*"` y `find . -name "*.icloud"`.

### Cuando falta un asset
Si un asset de marca o de evidencia falta o está dañado, se retira su uso. No se sustituye por una forma genérica inventada. Reponer un elemento de identidad es una decisión con dueño, no un efecto colateral de una limpieza.

## Brand
Keep the existing RINON identity direction:
- dark industrial/premium base;
- orange accent `#F58220`;
- Raleway;
- modular rhino geometry;
- cleaner, tangible manufacturing evidence.

The RC.7 visual direction is “industrial tangible”, not a new brand redesign.

## Logo rule
The header/footer logo is a critical brand asset. It must render reliably in the deployed browser. Avoid a fragile optimization path for this tiny identity asset if it can produce broken rendering. Acceptance requires actual browser rendering (`complete`, `naturalWidth`, visible bounding box), not merely HTTP 200.

## UX / copy rules
Use human problem language before internal production language.

Prefer:
- “Envíanos una foto, plano o medidas.”
- “¿Qué necesitas?”
- “Cotizar”
- “Proyecto a medida”

Avoid excessive repetition of:
- requerimiento;
- alcance;
- evaluación;
- factibilidad;
- fabricación metálica.

SEO labels and human navigation labels may differ. Preserve SEO owner URLs while making the interface understandable.

## Responsive rules
Validate at minimum:
320, 360, 375, 390, 430, 768, 1024, 1280, 1366, 1440, 1600 and 1920 px.

Do not equate “media query exists” with responsive approval.

Mobile first layer should be simple:
- Productos
- Proyectos a medida
- Empresas
- Servicios
- Nosotros
Then commercial actions:
- WhatsApp
- Cotizar

On desktop, avoid duplicating the header CTA with an intrusive floating dock. A mobile/tablet sticky CTA can remain if it improves conversion.

## CRO rules
Every commercial landing must have one obvious primary action and an appropriate secondary action.

Default global CTA should trend toward `Cotizar`, not always `Cotizar proyecto`, because many users are buying a product or repair rather than conceptualizing a “project”.

The quote experience should become genuinely progressive rather than visually pretending to be a 3-step wizard while rendering one long form.

Recommended flow:
1. What is needed / request type;
2. context-specific fields;
3. contact.

Prepare secure image/PDF upload UX for photos/plans, but do not enable production storage without the necessary privacy/storage implementation.

## SEO / SGEO rules
Protect the zero-loss migration strategy.

Do not remove or redirect an existing SEO owner just because a new UX label is cleaner.

Keep `/fabricacion-metalica` as an SEO owner unless evidence supports another migration decision, while the visible navigation may call it `Proyectos a medida`.

Use schema according to entity intent:
- Product for actual product pages;
- Service for service pages;
- CollectionPage / ItemList where appropriate;
- BreadcrumbList;
- FAQ only when visible FAQ content exists.

Do not manufacture price, availability, review or rating data.

## QA / release contract
Keep existing static, migration, served-build and browser QA. Strengthen it.

RC.7 must add remote browser validation against the actual Vercel deployment, not only localhost.

Required validation layers:
1. type/static QA;
2. migration/preflight;
3. local Next build;
4. local browser QA;
5. Vercel deploy;
6. remote HTTP smoke;
7. remote Chromium/browser QA;
8. responsive screenshots / viewport checks;
9. image-quality checks;
10. critical user journeys.

For large images, verify intrinsic resolution is appropriate relative to rendered size. `naturalWidth > 100` is not a quality criterion.

Always keep staging noindex.

### Contratos de assets de marca
- `qa:brand-assets` es estructural y NO usa navegador. Corre dentro de `npm run build`, por lo tanto también en Vercel. No moverlo a `qa:static` solamente: esa fue la configuración original y con ella un `npm run build` seguía publicando un asset corrupto.
- `qa:brand-assets:render` es el que usa Chromium real y corre en `qa:static`.
- `complete && naturalWidth > 100` NO es criterio de integridad. `naturalWidth` sale del IHDR, que sobrevive intacto aunque el stream IDAT esté truncado; Chromium reporta las dimensiones declaradas y pinta scanlines parciales. Un logotipo que renderiza basura pasa esa aserción. No borrar el comentario de `tests/render.spec.mjs` que lo explica.

### QA remoto
- Para validar un deployment remoto, usar `RINON_REMOTE_BASE_URL` como variable común. `qa:remote` también acepta argumento posicional y el alias legado `RINON_QA_BASE_URL`; `qa:browser:remote` acepta el alias legado `RINON_PLAYWRIGHT_BASE_URL`.
- `qa:browser:remote` exige URL explícita (guard: `scripts/check-remote-target.mjs`). No restaurar un default.
- `qa:remote` puede correr contra el build local servido, pero siempre debe imprimir el target efectivo antes de reportar PASS. Un PASS anónimo no es evidencia auditable.
- No usar `https://rinon-v2.vercel.app` como medición: ese alias sigue al target Production y queda stale hasta una promoción autorizada. Obtener la URL con `vercel ls rinon-v2`.
- La primera corrida contra un deployment recién `Ready` puede dar falsos rojos por propagación. Ocurrió en RC.7: 64 fallos HTTP y 4 de navegador en la primera pasada; verde contra el mismo deployment ya caliente. Repetir la corrida antes de abrir diagnóstico de producto.

## Parallel-agent working model
Codex supports parallel work; use isolated worktrees/branches when useful.

Suggested independent streams:
- IA/navigation;
- visual evidence/assets;
- responsive/header/mobile;
- commercial page templates/copy;
- quote/CRO;
- SEO/schema/migration QA;
- browser QA/release gates.

Do not merge contradictory agent outputs mechanically. One integrator must reconcile them against this file and `CODEX_HANDOFF.md`.

## Before every coding loop
1. `git status`
2. confirm current branch/worktree
3. read latest commit
4. read `AGENTS.md` + `CODEX_HANDOFF.md`
5. inspect the relevant source before editing
6. state the intended change and risk
7. implement in the smallest coherent batch
8. run appropriate QA
9. inspect the actual deployed result when a deploy occurs

## Current phase
Phases 0–5 (freeze, inventory, multidisciplinary audit, reconciliation, diagnosis, RC.7 proposal) are complete.

Next work begins at Phase 6: RC.7 implementation, starting with P0 issues defined in `CODEX_HANDOFF.md`.
