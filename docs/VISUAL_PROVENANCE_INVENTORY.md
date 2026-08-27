# RINON RC.7 — Visual Provenance Inventory

This inventory is the release-control layer between source imagery and commercial UI.

## Status vocabulary
- **ACTIVE**: currently referenced in staging.
- **TEMPORARY**: safe for its current bounded placement but must be replaced before final visual acceptance.
- **CANDIDATE**: audited source available for art direction/reference but not yet promoted into the production asset registry.
- **DISABLED**: code/reference exists but the asset is not enabled in the current staging configuration.
- **REPLACE**: must not be promoted to a larger placement.
- **PENDING**: required production asset does not yet exist or has not yet passed acceptance.

## Release-level visual blockers

The machine-readable source of truth is `VISUAL_CUTOVER_BLOCKERS` in `lib/visuals.ts`.

| Blocker ID | Requirement | Current state |
|---|---|---|
| `home-hero-final-master` | Replace the constrained 720×730 Home welding master with an accepted high-resolution master or an equally strong approved composition. | PENDING |
| `structures-residential-final-master` | Replace the generic industrial structures visual with the accepted premium residential cobertizo/pergola direction. | PENDING |

Production preflight must fail in AUTHORIZED CUTOVER mode while either blocker remains.

## Active measured assets

| Asset ID | Source | Provenance | Measured source | Current placement | Status | Rule |
| --- | --- | --- | ---: | --- | --- | --- |
| `RINON-VIS-P0-HOME-WELDING` | `/visuals/home-hero-conceptual-welding.webp` | `conceptual-context` | **720×730** | Home hero, contained editorial visual | TEMPORARY | Never full bleed. Desktop rendered width must remain ≤620 px. Replace before final visual acceptance. |
| `RINON-VIS-P1-BUNK` | `/visuals/product-theatre/camarote-conceptual.webp` | `conceptual-context` | **900×534** | Home / Camarotes theatre | ACTIVE | Keep rendered width ≤ source width. Always label as conceptual. |
| `RINON-VIS-P1-FENCE` | `/visuals/product-theatre/cierre-conceptual.webp` | `conceptual-context` | **900×537** | Home / Cierres theatre | ACTIVE | Keep rendered width ≤ source width. Always label as conceptual. |
| `RINON-VIS-P0-HOME-STRUCTURE-TEMP` | `/visuals/product-theatre/estructura-conceptual.webp` | `conceptual-context` | **900×500** | Home / Estructuras theatre | TEMPORARY | Keep rendered width ≤ source width. Replace with accepted residential structure master. |

Dimensions above are read from reconstructed WebP binaries during Vercel `prebuild`; they are not inferred from file names or CSS.

## User-provided cobertizo references audited 2026-08-21

These files were supplied directly in the project conversation. They are **reference renders only**. None may be described as a completed RINON project, a named client project or a real Chicureo installation without independent verification.

| Source file | Dimensions | SHA-256 | Classification | Assessment | Status |
|---|---:|---|---|---|---|
| `COBERTIZO SALA.jpg` | **2212×941** | `b3a043c6ba87a6b05f88597fc2712a6cd95d33b99977661f9ce1d5881c19c915` | `user-provided-reference-render` | Best current candidate. Warm covered terrace/dining context, clean architectural presentation and closer to the requested premium residential story than the generic industrial master. It is primarily an interior/under-cover view rather than the ideal exterior house hero. | CANDIDATE |
| `cobertizo (1).jpg` | **2212×941** | `1da4493bc6727a5443bc7913995208fbf0cc24a9912151c3d5722470bf7ee01c` | `user-provided-reference-render` | Long covered living/patio corridor. Useful as supporting residential reference but weaker focal hierarchy for the Home theatre. | CANDIDATE |
| `cobertizo (2).jpg` | **2212×941** | `03331cc4cd61bec9c67bdd96737e466a1e19335d9269e2972837484272393575` | `user-provided-reference-render` | Covered multipurpose interior. Useful for material/context reference; not preferred for hero placement. | CANDIDATE |
| `espinoza estructuras metalicas.jpeg.jpg` | **760×796** | `1c2164cec466006b75d0df16de80e594a539a06504c917235211f1695dcbd977` | third-party/logo reference | Logo/identity reference, not useful as project evidence or commercial hero photography. | DISABLED |

### Candidate promotion rule
If `COBERTIZO SALA.jpg` is promoted before a stronger exterior master exists:
1. convert to an optimized web asset without upscaling;
2. register its exact derived-file SHA and dimensions;
3. expose it as `kind: "render"` / reference imagery;
4. visible label must say **“Render de referencia”** or equivalent;
5. caption must explicitly state that it does not correspond to an executed RINON project;
6. do not use “Proyecto Chicureo” or any named client/location attribution;
7. validate desktop/mobile crop before removing the structures visual blocker.

## Existing non-primary references

| Asset | Provenance | Status | Commercial constraint |
| --- | --- | --- | --- |
| `/visuals/reference-current/cama-institucional-gris-individual-y-camarote.jpg` | `current-site-approved` | DISABLED by default | Product/reference evidence only. Do not claim a named client/project. |
| `/visuals/reference-current/camarote-desmontable-dormitorio-compartido.jpg` | `current-site-approved` | DISABLED by default | Product/reference evidence only. Do not claim a named client/project. |
| `/visuals/structures/pergola-mediterranea-conceptual.svg` | `explanatory` | REMOVED / known-bad | Was an SVG wrapper around a low-resolution raster and must not return as primary commercial proof or final Home structures visual. |

Legacy reference imagery remains behind `RINON_ALLOW_LEGACY_REFERENCE_IMAGES=true` and is not part of the default RC.7 visual surface.

## Other desirable production photography

These improve trust but are not release-blocking when the page uses an honest evidence-panel fallback:

| Intended route | Preferred provenance | Preferred master |
|---|---|---:|
| Nosotros / workshop | `verified-rinon` | 2400×1600 |
| Empresas / batch production | `verified-rinon` preferred | 2400×1600 |
| Soldadura MIG | `verified-rinon` preferred | 1800×1200 |
| Pintura electrostática | `verified-rinon` preferred | 1800×1200 |

## Placement rules
1. No source may be rendered wider than its intrinsic pixel width on a standard-density viewport unless explicitly approved after review.
2. Full-width/full-bleed photographic heroes require a source master of at least 2200 px wide.
3. A conceptual image or render capable of being mistaken for an executed RINON project must display a visible conceptual/reference label.
4. `verified-rinon` is the only class that may be presented unqualified as workshop/project execution evidence.
5. `current-site-approved` and user-provided references are reference evidence, not automatic project provenance.
6. Explanatory visuals can support understanding but cannot be the primary proof in a commercial hero.
7. Missing photography falls back to `CommercialEvidencePanel`; it does not trigger invented project evidence.

## Release gate
Before an asset changes state to ACTIVE:
- provenance is known;
- source dimensions and SHA are recorded;
- target placement is defined;
- conceptual/reference/project labels are correct;
- desktop and mobile crops are validated;
- browser QA confirms no horizontal overflow or accidental upscaling;
- the asset is registered in `lib/visuals.ts` where applicable and, when reconstructed, SHA-locked in `scripts/reconstruct-visual-assets.mjs`.

Before production cutover, `VISUAL_CUTOVER_BLOCKERS` must be empty and the production preflight must confirm zero unresolved final visual blockers.
