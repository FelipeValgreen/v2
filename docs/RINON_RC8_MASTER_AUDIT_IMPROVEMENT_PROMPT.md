# RINON RC.8 — MASTER AUDIT, POSITIONING & IMPROVEMENT PROMPT

## 0. ROLE AND EXECUTION MODE

Act as the PRODUCT DIRECTOR + UX/IA LEAD + ART DIRECTOR + METAL FABRICATION SME + CRO LEAD + SEO/GEO LEAD + FRONTEND/QA LEAD for RINON 2.0.

This is not a greenfield website. A substantial amount of work already exists and MUST be read before changing anything.

Operate in autonomous loop mode:

AUDIT → IDENTIFY GAP → PROPOSE → IMPLEMENT → VERIFY → REVIEW AGAIN → CORRECT → VERIFY AGAIN

Do not stop after recommendations if the change is reversible and inside staging scope.
Do not mark anything DONE without evidence.

Claude / Codex division of labor when both are available:
- Claude: architecture, product/UX direction, implementation of cohesive changes.
- Codex: independent code review, debugging, tests, browser/QA review, regression hunting.
- Stitch: visual exploration only; it does not redefine URLs, SEO architecture, capabilities or business truth.
- Product Director: reconciles conflicting outputs and chooses the final implementation.

Do not simulate agent communication that did not happen. Use repository docs/handoffs as the source of truth between agents.

## 1. CURRENT PROJECT STATE — READ BEFORE EDITING

Repository:
FelipeValgreen/v2
branch: main

Staging:
https://rinon-v2.vercel.app

Production:
https://rinon.cl

Production is NOT authorized for cutover.

Hard constraints:
- Do not change rinon.cl, DNS, production domain attachment or production indexability.
- Do not enable production redirects.
- Do not enable production tracking.
- Do not enable production lead writes.
- Do not remove noindex from staging.
- Do not weaken migration guards.
- Do not invent business capabilities, certifications, tolerances, load ratings, machine limits, engineering responsibility, project attribution, prices or delivery times.

Current staging architecture is advanced:
- Next.js / Vercel
- Supabase intake/storage/admin
- private quote attachments
- structured CRM fields
- Product/Service schema
- CRO instrumentation
- responsive/mobile navigation
- migration contracts
- visual provenance contracts
- release gates
- pre-cutover fail-closed flags

The current build has approximately 150 generated routes and is in SAFE PRE-CUTOVER.

There are currently 36 live-observed URLs protected as GSC-PENDING.
They MUST NOT be blanket redirected until Search Console landing-page/query data is reconciled.

## 2. EXISTING DOCUMENTATION — MUST READ

Before proposing changes, read at minimum:

docs/DESIGN_SYSTEM_UI_SPEC.md
docs/PAGE_CRO_AUDIT.md
docs/SEO-MIGRATION-CRO-CONTRACT.md
docs/SEO_KEYWORD_INTENT_MAP.csv
docs/SEO_MIGRATION_MATRIX.csv
docs/URL-MIGRATION-INVENTORY.md
docs/RELEASE_CUTOVER_RUNBOOK.md
docs/VISUAL_PROVENANCE_INVENTORY.md
docs/VISUAL_ASSET_PRODUCTION_BRIEF_RC7.md
docs/STRUCTURES_VISUAL_BRIEF.md
docs/STITCH_RC7_MASTER_PROMPT.md
lib/capabilities.ts
lib/navigation.ts
lib/migration.ts
lib/visuals.ts

Do not overwrite decisions that are already correct simply to create a different design.

## 3. BRAND TRUTH

Brand:
RINON · Soluciones Metálicas

Business:
direct metal fabrication from San Bernardo, Santiago.

Commercial model:
UNIDAD / VOLUMEN / PROYECTO

Core positioning:
RINON must be perceived as a REAL METAL FABRICATOR and a SPECIALIST IN METAL STRUCTURES AND CUSTOM FABRICATION.

The website must communicate:
- workshop;
- metal transformation;
- real manufacturing process;
- structures;
- products;
- repeatable production;
- custom jobs;
- industrial capability;
- residential/commercial applications;
- B2B purchasing capability.

The visitor should not think:
"this is a generic contractor website".

They should think:
"these people actually work metal, have a workshop, understand fabrication, and can turn a drawing/photo/need into a finished piece or structure."

Brand system:
- rhino modular identity;
- Raleway;
- #161616;
- #384148;
- #CCCDD2;
- #F58220;
- #F7F7F5;
- industrial / geometric / premium;
- do not use SaaS aesthetics, blue links, glassmorphism, neon or generic AI-tech visuals.

## 4. CRITICAL POSITIONING CHANGE

Structures and workshop capability must become much more visible.

RINON should visually demonstrate a fabrication chain such as:

IDEA / PHOTO / DRAWING
→ REVIEW
→ CUTTING / CNC WHEN VERIFIED
→ BENDING / FORMING
→ MIG WELDING
→ ASSEMBLY
→ SURFACE FINISH
→ DELIVERY / INSTALLATION WHEN APPLICABLE

The process must feel real, physical and industrial.

Important:
CNC is now a PRIORITY capability to audit and surface.

However:
the current capability registry does NOT yet define CNC separately.
The existing confirmed capability is "cutting and dimensioning".

Therefore:
- verify exactly what CNC process RINON performs;
- determine whether it is plasma, laser, router, machining, another CNC process, or more than one;
- verify machine ownership vs outsourced processing;
- verify materials handled;
- verify whether it is production-ready and commercially offerable;
- DO NOT invent machine brand, table size, power, maximum thickness, tolerance or production speed.

Once generic CNC work is owner/business verified, create a conservative public capability:
"CNC work / CNC cutting according to geometry, material and scope evaluated."

Exact technical specs stay VALIDATION_REQUIRED until documented.

## 5. CURRENT SITE ISSUES ALREADY CONFIRMED

These are not hypotheses. They are known audit findings.

### A. Internal implementation language is visible to customers

Examples currently visible:
- "Las imágenes reales o conceptuales se incorporan solo cuando exista un activo aprobado..."
- "La evidencia fotográfica del taller se incorpora únicamente con material RINON aprobado."
- visual source dimensions such as "720 × 730 fuente"
- internal evidence-management wording

This MUST NOT remain visible in public commercial pages.

These sentences are development notes, not customer communication.

Replace with either:
- real content;
- an honest commercial composition without image;
- a correctly labelled conceptual reference;
- or remove the block.

Never expose implementation notes to customers.

### B. The site explains too much and proves too little

Many pages are semantically strong but visually underpowered.

Current weakness:
TEXT → PROCESS EXPLANATION → DISCLAIMERS

Desired hierarchy:
EVIDENCE → RESULT → CAPABILITY → PROCESS → TECHNICAL DETAIL

### C. Workshop/manufacturing credibility is not strong enough

The site currently mentions:
- cutting;
- dimensioning;
- bending;
- MIG;
- assembly;
- powder coating;

but it does not make these capabilities feel like the backbone of the company.

### D. Structures need stronger dominance

/estructuras-metalicas is significantly improved but should become one of the strongest commercial pages in the entire site.

It should demonstrate:
- residential structures;
- industrial structures;
- canopies/pergolas;
- stairs;
- platforms;
- frames;
- supports;
- equipment bases;
- mezzanine/secondary structural applications only when valid;
- special structures.

Do not imply structural engineering or signed calculations unless separately contracted and verified.

### E. The site still overuses conservative/administrative language

Words repeated too often:
- requerimiento;
- alcance;
- evaluación;
- factibilidad;
- se confirma;
- antes de fabricar.

Keep precision, but write like a capable manufacturer speaking to a customer.

Example:
BAD:
"Se evalúa el requerimiento según alcance y factibilidad."

BETTER:
"Envíanos una foto, plano o medidas. Revisamos cómo fabricarlo y qué información falta para cotizar."

## 6. REQUIRED FULL-SITE AUDIT

Audit the website page by page, not just templates.

Minimum pages:

/
 /soluciones
 /camarotes
 /camas-metalicas
 /camas-balinesas
 /mesas-metalicas
 /escritorios-metalicos
 /equipamiento-metalico
 /cierres-perimetrales
 /rejas-metalicas
 /portones-metalicos
 /mallas-3d
 /mallas-separadoras
 /estructuras-metalicas
 /fabricaciones-especiales
 /fabricacion-metalica
 /corte-metalico
 /soldadura-mig
 /pintura-electrostatica
 /instalacion
 /reparaciones-metalicas
 /empresas
 /proyectos
 /nosotros
 /contacto
 /cotizar
 /recursos
 /blog
 /preguntas-frecuentes

Also audit all 13 preserved legacy commercial routes and the protected migration URLs.

For every page output an internal audit record:

PAGE
PRIMARY INTENT
SECONDARY INTENT
USER TYPE
WHAT IS CLEAR
WHAT IS CONFUSING
WHAT IS MISSING
VISUAL QUALITY
EVIDENCE QUALITY
PROCESS CREDIBILITY
CTA QUALITY
SEO OWNER
SCHEMA
MOBILE RISK
ACTION
PRIORITY

## 7. USER SIMULATION — REAL PEOPLE

Simulate these users independently.

### User 1 — homeowner
"I need a metal canopy/pergola for my house."

### User 2 — B2B buyer
"I need 120 bunks for a project."

### User 3 — industrial maintenance
"I have a broken frame/support and need it repaired or replicated."

### User 4 — constructor
"I have drawings for steel pieces and need them fabricated."

### User 5 — architect
"I need a clean metal structure integrated with an existing house."

### User 6 — workshop customer
"I need parts cut and bent."

### User 7 — CNC customer
"I have a drawing/DXF and need CNC work."

### User 8 — powder-coating customer
"I have 40 metal pieces that need finishing."

### User 9 — institutional buyer
"I need to verify that this is a real manufacturer and visit the workshop."

### User 10 — nontechnical customer
"I only have a photo of what I want."

For each journey:
- starting page;
- click 1;
- click 2;
- comprehension;
- missing information;
- visual trust;
- CTA;
- whether the visitor would contact RINON.

Target:
important commercial intent should reach the correct conversion path in <=2 meaningful decisions.

## 8. INFORMATION ARCHITECTURE

Current primary architecture to preserve unless audit evidence shows a real problem:

PRODUCTOS ↓
PROYECTOS A MEDIDA
EMPRESAS
SERVICIOS ↓
NOSOTROS
[COTIZAR]

Products:
Camas y descanso
- Camarotes
- Camas metálicas
- Camas balinesas

Mobiliario y equipamiento
- Mesas
- Escritorios
- Equipamiento

Cierres y accesos
- Cierres
- Rejas
- Portones
- Malla 3D
- Divisiones

Estructuras
- Estructuras metálicas
- Fabricaciones especiales

Services:
- Soldadura MIG
- Corte y dimensionado
- Pintura electrostática
- Instalación y montaje
- Reparaciones

Audit whether a verified CNC service needs:
A. its own landing;
B. a child section of cutting;
C. both an SEO service owner and navigation label.

Do not add a CNC URL until keyword intent + capability truth justify it.

## 9. NEW WORKSHOP / CAPABILITY EXPERIENCE

Design a major "CAPACIDAD DE TALLER" system across Home, Nosotros, Empresas and A medida.

It should visually show real steps.

Recommended modules:

### 01 Corte / CNC
Close-up of machine/process/finished cut piece.

### 02 Doblez / conformado
Sheet/profile being bent or formed.

### 03 Soldadura MIG
Welder/process/joint/detail.

### 04 Armado
Jig, frame or structure being assembled.

### 05 Terminación
Powder coating / finished surface when verified.

### 06 Control / entrega
Finished piece/lot/structure ready for dispatch.

Do not show six generic icons.
Use photography/process footage/details.

Where real RINON evidence does not yet exist:
create a SHOT LIST.
Do not fill the gap with unrelated stock photography.

## 10. VISUAL EVIDENCE SYSTEM

Every commercial page should contain at least one visually credible answer to:
"What does RINON actually make or do here?"

Evidence priority:

1. VERIFIED RINON PHOTO
2. USER ARCHIVE REFERENCE, clearly labelled
3. CURRENT-SITE APPROVED REFERENCE
4. HIGH-QUALITY CONCEPTUAL / RENDER, clearly labelled
5. TECHNICAL DIAGRAM as explanatory support

A diagram must not be the only hero evidence for a commercial service.

Never label conceptual work as completed RINON work.

Every visual must have:
- sourceRef;
- provenance;
- adequate resolution;
- correct crop;
- mobile crop;
- alt text;
- role in the page;
- whether project attribution is allowed.

## 11. REQUIRED PHOTO / VIDEO SHOT LIST

Create an explicit acquisition plan for missing evidence.

Priority P0:
- workshop exterior/interior;
- team working;
- CNC machine/process, once exact process confirmed;
- cutting;
- bending;
- MIG welding;
- assembly of a frame/structure;
- powder-coating process/finished series;
- structure in workshop;
- completed residential metal structure;
- completed industrial structure;
- repeated production / lot;
- finished bunks;
- gates/rejas/cerramientos;
- details of welds and finish;
- loading / dispatch.

For each missing shot specify:
SHOT
ORIENTATION
MIN RESOLUTION
WHAT MUST BE VISIBLE
WHAT TO AVOID
PAGES THAT WILL USE IT

Use photography as business evidence, not decoration.

## 12. HOME — TARGET EXPERIENCE

Keep:
"Lo necesitas en metal. Lo fabricamos."

But strengthen manufacturing authority immediately below the hero.

Within the first viewport + first scroll the user should understand:

RINON HAS A WORKSHOP.
RINON BUILDS METAL STRUCTURES.
RINON CAN MAKE SERIES OR ONE-OFF PROJECTS.
RINON HAS REAL FABRICATION PROCESSES.

Proposed Home narrative:

HERO
→ 3 ENTRY PATHS
→ WORKSHOP CAPABILITIES
→ WHAT WE BUILD
→ FEATURED STRUCTURES
→ B2B / VOLUME
→ PROJECTS / EVIDENCE
→ HOW TO START
→ CTA

"Workshop capabilities" should appear earlier than today.

## 13. STRUCTURES PAGE — FLAGSHIP PAGE

/estructuras-metalicas should become a flagship.

Hero:
strong real or high-quality contextual structure visual.

Then:
1. What we fabricate.
2. Residential structures.
3. Industrial/commercial structures.
4. Workshop process.
5. From reference/drawing to fabrication.
6. Installation considerations.
7. Evidence/projects.
8. FAQ.
9. Quote.

Show structural categories visually.

Do not let the page read primarily as a legal disclaimer.

Keep engineering boundaries precise but secondary.

## 14. CUSTOM FABRICATION PAGE

/fabricacion-metalica remains the SEO URL.
Visible UX label: PROYECTOS A MEDIDA.

Reframe it as:

FROM IDEA / DRAWING / SAMPLE
TO FABRICABLE METAL SOLUTION.

Visual workflow:
REFERENCE
→ DEFINE
→ CUT/CNC
→ BEND
→ WELD
→ ASSEMBLE
→ FINISH
→ DELIVER

Only show CNC in this chain once generic CNC capability is verified.

## 15. CORTE / CNC PAGE

The current /corte-metalico page is too abstract and currently exposes an implementation placeholder about future images.

Fix immediately.

The page must answer:
- what kind of input the customer can send;
- drawings / DXF if applicable and verified;
- materials;
- one-offs vs series;
- cutting as part of larger fabrication;
- CNC capability if verified;
- what determines feasibility;
- next step.

The hero must show a real process or finished cut detail once available.

Never publish universal max thickness/tolerance without evidence.

## 16. SOLDADURA MIG

Remove development-placeholder copy.

Show:
- joint/process;
- fabrication;
- repairs/modifications;
- repeated assemblies;
- preparation;
- finished joint/structure.

Do not imply certified welding unless documentation exists.

## 17. PINTURA ELECTROSTÁTICA

Current page is too repetitive.

Rewrite to a cleaner story:

WHAT IT IS
→ WHAT WE CAN RECEIVE
→ PREPARATION
→ APPLICATION / CURING
→ FINISH / LOT
→ WHAT TO SEND FOR QUOTE

Use real evidence when available.

Do not repeat the same four qualifying inputs in three different sections.

## 18. NOSOTROS

Current line:
"Fabricamos en San Bernardo."
is strong.

But the page currently tells customers that workshop photography will be added later.

Remove that immediately.

Nosotros must prove:
- real workshop;
- real address;
- manufacturing capability;
- people/process;
- metals worked;
- how jobs move through the workshop;
- Maps/Waze;
- direct manufacturing identity.

This is a TRUST page, not another generic process page.

## 19. EMPRESAS

Keep the B2B logic already developed.

Strengthen with:
- workshop capacity evidence;
- series / lot visual;
- drawing-to-production workflow;
- project handoff clarity;
- purchasing inputs;
- delivery/installation scope;
- quality/documentation expectations where verified.

The page should make a procurement manager comfortable sending RFQ documentation.

## 20. SOLUCIONES

Keep as product finder, but reduce taxonomy-only feel.

Cards should become more visual.

Group by what the user needs, not only by internal catalog organization.

The page should quickly distinguish:
PRODUCT
STRUCTURE
WORKSHOP SERVICE
CUSTOM PROJECT
B2B VOLUME

## 21. CRO RULES

Every commercial page:
- clear H1;
- value proposition above fold;
- primary CTA;
- WhatsApp alternative;
- at least one CTA after evidence;
- final CTA;
- contextual quote parameters;
- no generic "contact us" dead ends.

CTA language should match intent:
Cotizar estructura
Cotizar camarotes
Enviar plano
Enviar foto
Cotizar lote
Hablar por WhatsApp

Avoid using "Cotizar proyecto" for every single user.

## 22. RESPONSIVE AUDIT

Mandatory visual review:
320
360
375
390
430
768
1024
1280
1366
1440
1600
1920

Check:
- logo;
- menu;
- dropdown/accordion;
- hero;
- image crop;
- H1 wraps;
- CTA sizes;
- sticky mobile actions;
- forms;
- file upload;
- product grids;
- cards;
- map;
- footer;
- no horizontal overflow;
- no text collisions;
- no broken images.

A page is not responsive merely because CSS uses media queries.

## 23. SEO / SGEO / MIGRATION

Do not destroy the migration work already done.

Preserve:
- intent owners;
- canonicals;
- schemas;
- sitemap;
- legacy durable 200 pages;
- migration guard;
- current GSC-pending quarantine.

Current migration state includes 36 protected live-observed URLs pending GSC reconciliation.

No blanket redirects.

UX label may differ from SEO URL.

Example:
navigation label = Proyectos a medida
SEO URL = /fabricacion-metalica

For every meaningful new capability section, evaluate:
- search demand;
- entity relevance;
- cannibalization;
- whether it deserves its own owner URL;
- internal linking;
- Service/Product schema.

Do not create thin SEO pages.

## 24. COPY STANDARD

Customer-facing copy must never expose:
- asset approval status;
- implementation notes;
- image resolution;
- internal registry wording;
- TODO language;
- QA notes;
- developer terminology.

Voice:
direct
technical when useful
clear
confident
non-exaggerated
manufacturer-first

Prefer:
"Hacemos..."
"Fabricamos..."
"Trabajamos desde..."
"Envíanos..."
"Para cotizar necesitamos..."

Avoid excessive:
"se evalúa..."
"alcance..."
"factibilidad..."
"cuando corresponda..."
in every paragraph.

Use these caveats only where they materially protect accuracy.

## 25. DESIGN DIRECTION

The visual language should move from:
INDUSTRIAL CONCEPTUAL

to:
INDUSTRIAL TANGIBLE

Show:
steel;
cuts;
edges;
sparks;
jigs;
welds;
profiles;
sheet;
frames;
finished structures;
powder-coated parts;
palletized/series production;
real workshop context.

Use orange as navigation/interaction signal, not decoration everywhere.

Maintain strong whitespace, editorial scale and premium typography.

Do not make the site noisy or look like a hardware store.

## 26. STITCH TASK

When using Google Stitch, do NOT tell Stitch:
"redesign RINON."

Give it this role:

"You are a Senior Industrial Product Designer improving a design system that already exists. Preserve the RINON logo, Raleway, palette, information architecture and SEO owner model. Your task is to make each screen feel like a premium real metal-fabrication company. Prioritize evidence of workshop, structure, fabrication and physical process. Do not invent services or projects."

Ask Stitch to produce:
- Home 1440 + 390
- Structures 1440 + 390
- Custom fabrication 1440 + 390
- Workshop capability section
- CNC/cutting capability module
- Empresas
- Nosotros
- Services template
- Product template
- Case/project card system
- Mega menu
- mobile navigation
- quote wizard
- footer

For each screen ask Stitch to identify:
IMAGE REQUIRED
IMAGE TYPE
CROP
MINIMUM RESOLUTION
CONTENT ROLE

Stitch output is a design proposal, not business truth.

## 27. MULTI-AGENT AUDIT ROLES

Run independent audits:

A1 Customer/homeowner
A2 B2B procurement
A3 Architect/constructor
A4 Industrial maintenance
A5 UX/IA
A6 Art direction
A7 Metal fabrication SME
A8 SEO/SGEO
A9 CRO
A10 Responsive/accessibility
A11 Frontend/performance
A12 Browser QA
A13 Product Director reconciliation

A7 must specifically review whether the site adequately represents:
- CNC;
- cutting;
- bending;
- MIG;
- assembly;
- powder coating;
- structural fabrication;
- one-off vs series production.

## 28. IMPLEMENTATION PRIORITY

P0
- remove all internal/meta placeholder copy visible to customers;
- verify header/logo on real deployment;
- workshop capability positioning;
- Structures flagship;
- real/process imagery plan;
- Corte/CNC treatment;
- Soldadura imagery/copy;
- Nosotros trust evidence;
- responsive critical paths;
- no broken/low-res hero;
- preserve SEO guards.

P1
- Empresas evidence;
- Soluciones visual product finder;
- Pintura simplification;
- product/service template differentiation;
- real project/evidence system;
- case-study module;
- workshop/process video-ready sections.

P2
- richer portfolio;
- industry-specific cases;
- downloadable B2B capability dossier;
- deeper local SEO;
- CTR testing;
- CRO experiments;
- structured project library.

## 29. RELEASE / QA LOOP

For every logical batch:

1. inspect current source;
2. explain diagnosis internally;
3. implement smallest coherent fix;
4. typecheck;
5. migration QA;
6. SEO/CRO QA;
7. visual provenance QA;
8. attachment/CRM QA where relevant;
9. build;
10. served QA;
11. browser QA;
12. responsive screenshots;
13. inspect Vercel deployment;
14. runtime errors;
15. re-audit affected page as a real user.

Do not use HTTP 200 as proof of visual correctness.

Check:
- img.complete;
- naturalWidth;
- master resolution vs rendered size/DPR;
- computed styles;
- actual logo visibility;
- text overflow;
- image crop;
- keyboard;
- mobile menu;
- CTA actions;
- form steps.

## 30. STOP CONDITIONS

Stop and request owner input only for:
- production cutover;
- DNS/domain;
- indexability;
- production redirects;
- irreversible data operations;
- legal approval;
- unverified claim that materially changes offer;
- unknown CNC machine/process details that would require a technical claim;
- deletion/consolidation of a GSC-protected URL;
- project/client attribution without evidence.

Everything else:
continue autonomously in loop.

## 31. REQUIRED OUTPUT

Maintain a living audit with:

### EXECUTIVE STATUS
Current score /10 by:
Brand
Visual evidence
Structures positioning
Workshop capability
UX/IA
CRO
SEO
SGEO
Responsive
Technical QA
Trust

### PAGE MATRIX
Page
Issue
Why it matters
Fix
Evidence needed
Priority
Status

### VISUAL DEBT MATRIX
Page
Missing visual
Source available?
Needs photo shoot?
Can conceptual be used?
Exact shot brief

### CAPABILITY MATRIX
Capability
Confirmed?
Shown on site?
Has evidence?
Has landing?
SEO owner?
Action

### RELEASE BLOCKERS
Only actual blockers.

### CHANGELOG
Commit
Change
QA evidence
Deployment

## 32. FINAL ACCEPTANCE CRITERIA

RINON is ready for owner review only when a real visitor can conclude within 10 seconds:

"Son fabricantes."
"Tienen taller."
"Saben trabajar estructuras metálicas."
"Pueden tomar una idea, plano o pieza y fabricarla."
"Entiendo qué procesos manejan."
"Veo evidencia real o referencias honestamente etiquetadas."
"Sé cómo cotizar."

A B2B visitor should additionally conclude:

"Puedo enviarles un plano o RFQ."
"Pueden fabricar series o proyectos."
"Entiendo qué información necesitan."
"Veo suficiente capacidad operativa para considerarlos proveedor."

The final website must feel like a metal fabrication specialist, not a generic brochure.

Do not stop at a prettier UI.
Build credibility through manufacturing evidence.
