# RINON 2.0 · Visual brief — Estructuras metálicas

Status: **P0 · replacement required before visual approval**  
Owner URL: `/estructuras-metalicas`  
Home placement: `03 · PROYECTO / A MEDIDA`  
Current asset: `/visuals/product-theatre/estructura-conceptual.webp`  
Current provenance: **conceptual** — never present as an executed RINON project.

## 1. Objective

Replace the current generic/dark industrial structure image with a premium contextual visual that makes the category immediately understandable to a Chilean user while preserving the broader commercial meaning of the landing.

The focal scene is a **high-quality metal carport / cobertizo integrated into a contemporary Mediterranean-style residence in the Chicureo visual context**. The image must communicate fabrication quality, clean geometry, proportion and architectural integration — not luxury for its own sake.

This is an art-direction visual. It does **not** prove that RINON executed the depicted project.

## 2. Required composition

- Horizontal composition suited to the existing Product Theatre crop.
- Target master ratio close to `16:9`; final production WebP must be at least `1200 × 675` and crop safely to the current theatre container.
- Residence visible enough to establish context, but the **metal structure is the subject**.
- One or two car bays; realistic Chilean residential proportions.
- Structure attached to or immediately beside the residence.
- Clean steel posts and beams, preferably charcoal / graphite / black finish.
- Roof/canopy solution visually plausible and restrained.
- Straight lines, credible junctions and consistent post spacing.
- Camera height near human eye level; architectural photography rather than drone/real-estate glamour framing.
- Warm natural daylight or late-afternoon light with realistic shadows.
- Landscaping and paving consistent with a high-quality central-Chile residence.

## 3. Architectural context

Use cues common to contemporary Mediterranean / modern Chilean houses in the north Santiago / Chicureo market:

- stucco or mineral-texture walls in warm white / sand / stone tones;
- simple rectangular volumes;
- dark aluminum window frames;
- restrained stone or timber accents when useful;
- drought-aware / central-Chile landscaping;
- paved or exposed-aggregate driveway;
- no tropical resort aesthetic;
- no North-American suburban garage vocabulary;
- no impossible mansion scale.

The brief uses **Chicureo as visual context only**. Do not imply the scene is a real Chicureo client or RINON project.

## 4. Metalwork quality cues

The visual must withstand inspection by someone who fabricates metalwork:

- posts are vertical and correctly seated;
- beams align and do not intersect impossibly;
- no floating steel members;
- no warped or melting profiles;
- joints are visually coherent;
- roof plane has credible drainage/slope logic;
- structure does not appear under-dimensioned in an obviously unsafe way;
- finish is uniform and professional;
- no decorative pseudo-engineering.

Do **not** infer or display certified loads, structural calculations, welding certification or regulatory compliance.

## 5. Negative constraints

Reject the image if it contains any of the following:

- generic warehouse or industrial shed as the main context;
- obvious AI artifacts, duplicate columns, bent beams or inconsistent geometry;
- text, logos, watermarks or signage;
- people posed as workers or clients;
- branded vehicles;
- visible welding sparks used only for drama;
- over-luxury mansion imagery that makes the service look inaccessible;
- tropical vegetation or architecture inconsistent with central Chile;
- fake technical annotations;
- exaggerated cantilevers or unsupported roof planes;
- a visual that could reasonably be interpreted as documented RINON project evidence.

## 6. Master generation direction

**Photorealistic architectural photograph of a premium custom metal carport / cobertizo integrated beside a contemporary Mediterranean-style Chilean residence, visual context similar to high-quality homes in Chicureo, Santiago. The metal structure is the hero: clean charcoal-black steel posts and beams, precise straight geometry, credible joints, refined uniform finish, realistic proportions, elegant but restrained canopy roof, one or two vehicle bays. Warm off-white stucco house, dark aluminum windows, subtle stone or timber accents, central-Chile landscaping, quality driveway paving, warm late-afternoon natural light, realistic shadows, professional architectural photography, eye-level three-quarter perspective, wide horizontal composition with safe crop area. Show excellent metal fabrication and architectural integration without looking extravagant. No people, no logo, no text, no watermark, no construction mess, no impossible engineering, no warped profiles, no duplicated columns, no floating beams, no American suburban garage styling, no tropical resort look. This is a conceptual context image, not project documentation.**

## 7. Web treatment

While provenance remains `conceptual`:

- `VisualEvidence` must render `VISUAL CONCEPTUAL`.
- Supporting wording must make clear that it is not executed-project evidence.
- Alt text should describe the concept, not claim ownership. Recommended: `Visual conceptual de cobertizo metálico integrado a vivienda contemporánea`.
- The Structures landing must retain a separate industrial/commercial section so the residential hero does not narrow the service definition.

## 8. Asset pipeline

The final visual cannot be added as an ad-hoc external URL. It must follow the repository's deterministic visual pipeline:

1. Generate and approve master visual.
2. Crop/encode final WebP.
3. Store base64 chunks under `.asset-chunks/estructura-conceptual.webp/`.
4. Update `RINON-VIS-P0-HOME-STRUCTURE-TEMP` in `scripts/reconstruct-visual-assets.mjs`:
   - rename ID from `TEMP` to final;
   - minimum dimensions at least `1200 × 675`;
   - update exact SHA-256.
5. Update `lib/visuals.ts` source dimensions, alt and note.
6. Build must reconstruct, measure and SHA-lock the binary successfully.
7. Verify the image in both:
   - Home Product Theatre `03 · PROYECTO / A MEDIDA`;
   - `/estructuras-metalicas` hero.
8. Browser QA at desktop and 390 px mobile width.

## 9. Acceptance criteria

Visual status becomes **APPROVED** only when all are true:

- scene reads immediately as a premium metal cobertizo / carport;
- context feels plausibly Chilean and appropriate to RINON's market;
- fabrication geometry is credible at normal viewing size;
- no AI artifact is visible at 100% inspection;
- crop works in Home and Structures landing without cutting the main structure;
- conceptual provenance remains explicit;
- Structures page still communicates residential **and** commercial/operational use;
- reconstructed asset passes minimum-size and SHA gates;
- production build, served QA and browser QA pass.
