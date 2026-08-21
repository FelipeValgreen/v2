# RINON RC.7 — Visual Provenance Inventory

This inventory is the release-control layer between source imagery and commercial UI.

## Status vocabulary
- **ACTIVE**: currently referenced in staging.
- **TEMPORARY**: safe for its current bounded placement but must be replaced before final visual acceptance if a higher-priority asset is specified.
- **DISABLED**: code/reference exists but the asset is not enabled in the current staging configuration.
- **REPLACE**: must not be promoted to a larger placement.
- **PENDING**: required production asset does not yet exist.

## Active measured assets

| Asset ID | Source | Provenance | Measured source | Current placement | Status | Rule |
| --- | --- | --- | ---: | --- | --- | --- |
| `RINON-VIS-P0-HOME-WELDING` | `/visuals/home-hero-conceptual-welding.webp` | `conceptual-context` | **720×730** | Home hero, contained editorial visual | TEMPORARY | Never full bleed. Desktop rendered width must remain ≤620 px. Replace with a ≥2200 px master for a future full-width treatment. |
| `RINON-VIS-P1-BUNK` | `/visuals/product-theatre/camarote-conceptual.webp` | `conceptual-context` | **900×534** | Home / Camarotes theatre | ACTIVE | Keep rendered width ≤ source width. Always label as conceptual. |
| `RINON-VIS-P1-FENCE` | `/visuals/product-theatre/cierre-conceptual.webp` | `conceptual-context` | **900×537** | Home / Cierres theatre | ACTIVE | Keep rendered width ≤ source width. Always label as conceptual. |
| `RINON-VIS-P0-HOME-STRUCTURE-TEMP` | `/visuals/product-theatre/estructura-conceptual.webp` | `conceptual-context` | **900×500** | Home / Estructuras theatre | TEMPORARY | Keep rendered width ≤ source width. Replace with approved residential structure master. |

Dimensions above are read from the reconstructed WebP binaries during Vercel `prebuild`; they are not inferred from file names or CSS.

## Existing non-primary references

| Asset | Provenance | Status | Commercial constraint |
| --- | --- | --- | --- |
| `/visuals/reference-current/cama-institucional-gris-individual-y-camarote.jpg` | `current-site-approved` | DISABLED by default | May be used as product/reference evidence only. Do not claim a named client/project. |
| `/visuals/reference-current/camarote-desmontable-dormitorio-compartido.jpg` | `current-site-approved` | DISABLED by default | May be used as product/reference evidence only. Do not claim a named client/project. |
| `/visuals/structures/pergola-mediterranea-conceptual.svg` | `explanatory` | REPLACE / not referenced | Not acceptable as primary commercial proof or as the final Home structures visual. |

Legacy reference imagery remains behind `RINON_ALLOW_LEGACY_REFERENCE_IMAGES=true` and is not part of the default RC.7 visual surface.

## P0 pending production assets

| Placeholder ID | Intended route | Required provenance | Minimum master | Status |
| --- | --- | --- | ---: | --- |
| `RINON-VIS-P0-HOME-STRUCTURE` | Home + Estructuras | `real-rinon` preferred; otherwise `conceptual-context` | 2400×1600 | PENDING |
| `RINON-VIS-P0-WORKSHOP` | Nosotros | `real-rinon` only | 2400×1600 | PENDING |
| `RINON-VIS-P0-B2B-BATCH` | Empresas | `real-rinon` preferred | 2400×1600 | PENDING |
| `RINON-VIS-P0-WELDING` | Soldadura MIG | `real-rinon` preferred | 1800×1200 | PENDING |
| `RINON-VIS-P0-POWDER` | Pintura electrostática | `real-rinon` preferred | 1800×1200 | PENDING |

See `docs/VISUAL_ASSET_PRODUCTION_BRIEF_RC7.md` for shot direction and acceptance criteria.

## Placement rules
1. **No source may be rendered wider than its intrinsic pixel width** on a standard-density viewport unless it has been explicitly approved for that use after visual review.
2. Full-width / full-bleed photographic heroes require a source master of at least **2200 px wide**.
3. A conceptual image capable of being mistaken for an executed RINON project must display a visible conceptual label.
4. `real-rinon` is the only class that may be presented unqualified as workshop/project execution evidence.
5. `current-site-approved` is product/reference evidence, not automatic project provenance.
6. `explanatory` visuals can support understanding but cannot be the primary proof in a commercial hero.
7. Missing photography falls back to `CommercialEvidencePanel`; it does not trigger an invented project visual.

## Current Home resolution remediation
The original Home hero source is only 720×730. RC.7 therefore **must not** use it as a 100vw background. It is intentionally constrained to a maximum desktop width of 620 px in `.s7-hero-contained`. This is a temporary art-direction treatment until the final P0 master is approved.

## Release gate
Before an asset changes state to ACTIVE:
- provenance is known;
- source dimensions are recorded;
- target placement is defined;
- conceptual/project labels are correct;
- desktop and mobile crops are validated;
- browser QA confirms no horizontal overflow or accidental upscaling;
- the asset is listed here and, when reconstructed, SHA-locked in `scripts/reconstruct-visual-assets.mjs`.
