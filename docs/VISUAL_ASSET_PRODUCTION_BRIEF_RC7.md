# RINON RC.7 — Visual Asset Production Brief

## Objective
Build a controlled visual library that makes RINON look like a real Chilean metal manufacturer without inventing executed projects, clients, certifications or technical claims.

This brief is the production companion to `docs/STITCH_RC7_MASTER_PROMPT.md`.

## Provenance classes
Every integrated visual must be tagged internally as one of these four classes:

1. `real-rinon`
   - Photograph captured by RINON or its team.
   - May be presented as workshop, product, process or executed work only when that provenance is known.

2. `product-reference`
   - Real photograph of a product/configuration RINON can use as a commercial reference.
   - Must not imply that the surrounding architecture or project was executed by RINON unless verified.

3. `conceptual-context`
   - Photorealistic contextual image produced for art direction or visualization.
   - Must be labelled `Visual conceptual` where a user could reasonably interpret it as executed work.

4. `explanatory`
   - Diagram, x-ray, technical composition or process graphic.
   - Never primary commercial proof on a money page.

## Global quality gate
- Minimum useful source width for full-width hero: 2200 px.
- Minimum useful source width for 50–60% desktop editorial image: 1400 px.
- Minimum useful source width for product card: 1000 px.
- Prefer WebP/AVIF delivery after preserving the original master.
- No visible AI artifacts, warped profiles, impossible joints, floating metal, duplicated objects or unreadable labels.
- No stock watermarks.
- No fake RINON signage added to a third-party workshop.
- Avoid depth-of-field so aggressive that the fabricated object loses legibility.
- Preserve plausible Chilean architecture, vehicles, vegetation, PPE and industrial context when location matters.

## P0 — Required before visual acceptance

### 01. Home / Structures residential story
**Route:** `/`
**Use:** chapter 03, Structures
**Target:** `conceptual-context` unless an authentic RINON project exists.
**Master:** 2400 × 1600 px, landscape 3:2.
**Crop-safe:** central 75% horizontally; allow right-side copy crop variant.

Scene direction:
- contemporary Mediterranean-style home plausible for Chicureo / north Santiago;
- black or dark anthracite steel pergola/cobertizo integrated into the house;
- technically plausible columns, beams, roof and anchoring logic;
- premium but not ostentatious;
- central-Chile vegetation and daylight;
- architectural photography, not obvious CGI;
- no people required;
- no impossible cantilevers or decorative steel that could not be fabricated.

Interface label: `VISUAL CONCEPTUAL` until provenance is real RINON.

### 02. Nosotros / Workshop proof
**Route:** `/nosotros`
**Target:** `real-rinon` only.
**Master:** 2400 × 1600 px.

Shot list:
- wide workshop establishing shot;
- MIG welding close-medium shot with correct PPE;
- cutting/dimensioning workbench;
- assembled metal frame/product in workshop;
- one clean material/detail shot.

Do not fabricate this evidence with AI. If unavailable, keep the existing evidence panel.

### 03. Empresas / Batch-production proof
**Route:** `/empresas`
**Target:** `real-rinon` preferred; `product-reference` accepted when provenance is clear.
**Master:** 2400 × 1600 px.

Preferred subject:
- repeated units ready for dispatch;
- series of bunk beds, frames, barriers, supports or equipment;
- composition must communicate volume and production capability, not an empty warehouse.

Do not show client logos unless approved.

### 04. Welding
**Route:** `/soldadura-mig`
**Target:** `real-rinon` preferred.
**Master:** 1800 × 1200 px.

Need:
- actual MIG process;
- welder with appropriate PPE;
- readable joint/metal context;
- sparks controlled, not cinematic excess.

### 05. Powder coating
**Route:** `/pintura-electrostatica`
**Target:** `real-rinon` preferred.
**Master:** 1800 × 1200 px.

Need one or more:
- coated pieces before/after oven process;
- application environment if genuinely RINON;
- finished metal surface detail;
- batch of finished pieces.

Never depict equipment or oven capacity RINON does not actually operate.

## P1 — Product recognition

### Camarotes
**Routes:** `/camarotes` + variants
**Master:** 1800 × 1800 px and 1800 × 1200 px.
Need:
- isolated/clean product view;
- 3/4 view;
- ladder/joint/detail;
- optional contextual room view only if truthful or clearly conceptual.

### Camas metálicas
**Route:** `/camas-metalicas`
**Master:** 1800 × 1400 px.
Need one full product + one structural detail.

### Camas balinesas
**Route:** `/camas-balinesas`
**Master:** 2000 × 1500 px.
If conceptual:
- Chilean terrace/garden;
- fabricated metal frame is the hero;
- no resort/tropical visual language unless that is the actual intended use.

### Mesas metálicas
**Route:** `/mesas-metalicas`
**Master:** 1800 × 1400 px.
Need table structure to remain visible; avoid hiding steel under styling.

### Escritorios metálicos
**Route:** `/escritorios-metalicos`
**Master:** 1800 × 1400 px.
Need clean product recognition; restrained office context.

### Cierres / Rejas / Portones
**Routes:** `/cierres-perimetrales`, `/rejas-metalicas`, `/portones-metalicos`
**Master:** 2200 × 1500 px.
Preferred real evidence:
- full span/access view;
- detail of posts/hinge/rail/anchoring;
- context showing how the element meets the site.

If contextual conceptual imagery is produced, do not present it as an executed RINON project.

### Malla 3D / Divisiones
**Routes:** `/mallas-3d`, `/mallas-separadoras`
**Master:** 1800 × 1400 px.
Need the system, not just a close-up mesh texture: panel + post + fixing + context.

## P2 — Editorial supporting evidence

### Cut / dimensioning
**Route:** `/corte-metalico`
Real process/detail preferred.

### Installation / mounting
**Route:** `/instalacion`
Only use actual RINON field work if presenting it as evidence. Otherwise remain editorial/text-led.

### Repairs
**Route:** `/reparaciones-metalicas`
Best format: before / intervention / after sequence with the same piece.

### Custom projects
**Route:** `/fabricacion-metalica`
Best proof sequence:
- source reference / sketch;
- fabrication stage;
- completed piece.
If no authentic case exists, keep the current evidence panel instead of inventing a case study.

## Stitch output requirements
When Google Stitch is used for screen composition:
- it may use neutral placeholders labelled with these asset IDs;
- it must not invent a client or executed-project claim;
- it must preserve the copy and SEO route architecture;
- it must show desktop 1440 and mobile 390 crops for each P0 asset placement;
- it should explicitly flag any crop that requires a different master composition.

Suggested placeholder IDs:
- `RINON-VIS-P0-HOME-STRUCTURE`
- `RINON-VIS-P0-WORKSHOP`
- `RINON-VIS-P0-B2B-BATCH`
- `RINON-VIS-P0-WELDING`
- `RINON-VIS-P0-POWDER`
- `RINON-VIS-P1-BUNK`
- `RINON-VIS-P1-BED`
- `RINON-VIS-P1-BALINESE`
- `RINON-VIS-P1-TABLE`
- `RINON-VIS-P1-DESK`
- `RINON-VIS-P1-FENCE`
- `RINON-VIS-P1-GRILLE`
- `RINON-VIS-P1-GATE`
- `RINON-VIS-P1-MESH3D`
- `RINON-VIS-P1-DIVISION`

## Acceptance checklist per asset
Before integration, verify:
- provenance class is known;
- source resolution passes the target placement;
- object geometry is plausible;
- no fake brand/client claim;
- crop works at 1440 and 390;
- compression preserves metal edges and weld/detail legibility;
- alt text describes the image without inventing provenance;
- conceptual imagery is labelled where needed;
- asset is registered in the visual inventory before code references it.

## Release principle
A missing photograph is not a reason to lower the evidence standard. Until an asset passes this brief, the interface should use the current honest evidence panel rather than a weak placeholder or an invented project image.
