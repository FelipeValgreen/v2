type VisualBase = {
  src: string;
  alt: string;
  kind: "photo" | "conceptual" | "render";
  label: string;
  note?: string;
  sourceWidth?: number;
  sourceHeight?: number;
  /** Human-auditable origin for the asset. Never use a vague label such as "internal". */
  sourceRef: string;
};

type VerifiedRinonVisual = VisualBase & {
  provenance: "verified-rinon";
  /** Required before an image can be presented as verified RINON evidence. */
  verificationRef: string;
};

type ReferenceVisual = VisualBase & {
  provenance: "current-site-approved" | "user-drive-reference" | "conceptual";
  verificationRef?: never;
};

export type VisualAsset = VerifiedRinonVisual | ReferenceVisual;

/**
 * Production cutover is blocked while these release-level visual requirements remain.
 * Remove an ID only after the replacement asset is integrated, provenance-registered,
 * dimension-gated and visually accepted on desktop/tablet/mobile.
 */
export const VISUAL_CUTOVER_BLOCKERS=[
  "home-hero-final-master",
  "structures-residential-final-master",
] as const;

const referenceBase = "/visuals/reference-current";

/**
 * Visual provenance is intentionally conservative:
 * - verified-rinon: only when RINON ownership/project attribution is independently verified;
 *   TypeScript requires an explicit verificationRef before that provenance can be used.
 * - user-drive-reference: product or architectural reference imagery found in the user's archive;
 *   never attributed to a client/project without further evidence.
 * - current-site-approved: reference imagery inherited from the current public site.
 * - conceptual: art-direction imagery, always labelled as conceptual.
 *
 * sourceRef is required for every asset so provenance can be audited without relying on memory.
 */
const archiveReferenceAssets: Record<string, VisualAsset[]> = {
  "/camarotes": [
    {
      src: "/visuals/archive/camarote-product-reference.webp",
      alt: "Camarote metálico negro de una plaza en referencia de producto",
      kind: "photo",
      provenance: "user-drive-reference",
      label: "Referencia de producto · archivo",
      note: "Fotografía de producto proveniente del archivo del usuario. No se atribuye a un cliente o proyecto específico.",
      sourceRef: "Google Drive archive · promoted under RINON-VIS-P1-BUNK-ARCHIVE",
      sourceWidth: 1200,
      sourceHeight: 900,
    },
  ],
  "/estructuras-metalicas": [
    {
      src: "/visuals/archive/structures-residential-reference.webp",
      alt: "Render de referencia de un espacio residencial cubierto para orientar una solución de cobertizo o pérgola",
      kind: "render",
      provenance: "user-drive-reference",
      label: "Referencia arquitectónica · render aportado",
      note: "Render de referencia proveniente del archivo del usuario. Ayuda a explicar contexto e integración espacial; no corresponde a una obra ejecutada por RINON ni define la solución estructural final.",
      sourceRef: "User archive · COBERTIZO SALA.jpg · derived RINON-VIS-P0-STRUCTURE-RESIDENTIAL-REFERENCE",
      sourceWidth: 1200,
      sourceHeight: 510,
    },
  ],
};

const conceptualAssets: Record<string, VisualAsset[]> = {
  "/camarotes": [
    {
      src: "/visuals/product-theatre/camarote-conceptual.webp",
      alt: "Visual conceptual de camarote metálico",
      kind: "conceptual",
      provenance: "conceptual",
      label: "Visual conceptual de producto",
      note: "Dirección de producto para explicar configuración y proporción. No corresponde a un proyecto ejecutado por RINON.",
      sourceRef: "RINON conceptual art direction · RINON-VIS-P1-BUNK",
      sourceWidth: 900,
      sourceHeight: 534,
    },
  ],
  "/cierres-perimetrales": [
    {
      src: "/visuals/product-theatre/cierre-conceptual.webp",
      alt: "Visual conceptual de cierre metálico modular",
      kind: "conceptual",
      provenance: "conceptual",
      label: "Visual conceptual de sistema",
      note: "Dirección de producto para explicar modulación y proporción. No corresponde a un proyecto ejecutado por RINON.",
      sourceRef: "RINON conceptual art direction · RINON-VIS-P1-FENCE",
      sourceWidth: 900,
      sourceHeight: 537,
    },
  ],
  "/estructuras-metalicas": [
    {
      src: "/visuals/product-theatre/estructura-conceptual.webp",
      alt: "Visual conceptual de estructura metálica modular",
      kind: "conceptual",
      provenance: "conceptual",
      label: "Visual conceptual de estructura",
      note: "Referencia de dirección visual; no corresponde a una obra ejecutada por RINON. Geometría y solución final se definen según el requerimiento real.",
      sourceRef: "RINON conceptual art direction · RINON-VIS-P0-HOME-STRUCTURE-TEMP · replacement brief docs/STRUCTURES_VISUAL_BRIEF.md",
      sourceWidth: 900,
      sourceHeight: 500,
    },
  ],
};

const legacyReferenceAssets: Record<string, VisualAsset[]> = {
  "/camarotes": [
    {
      src: `${referenceBase}/cama-institucional-gris-individual-y-camarote.jpg`,
      alt: "Cama metálica individual y camarote en configuración institucional",
      kind: "photo",
      provenance: "current-site-approved",
      label: "Producto / referencia actual",
      note: "Imagen del sitio RINON actual. No se atribuye a un cliente o proyecto específico.",
      sourceRef: "Current public rinon.cl reference library",
    },
    {
      src: `${referenceBase}/camarote-desmontable-dormitorio-compartido.jpg`,
      alt: "Camarote metálico desmontable en dormitorio compartido",
      kind: "photo",
      provenance: "current-site-approved",
      label: "Producto / referencia actual",
      sourceRef: "Current public rinon.cl reference library",
    },
  ],
  "/camarote-con-escritorio": [],
};

export function allowLegacyReferenceImages() {
  return process.env.RINON_ALLOW_LEGACY_REFERENCE_IMAGES === "true";
}

export function getArchiveReferenceVisuals(slug: string): VisualAsset[] {
  return archiveReferenceAssets[slug] ?? [];
}

export function getConceptualVisuals(slug: string): VisualAsset[] {
  return conceptualAssets[slug] ?? [];
}

export function getLegacyReferenceVisuals(slug: string): VisualAsset[] {
  if (!allowLegacyReferenceImages()) return [];
  return legacyReferenceAssets[slug] ?? [];
}

export function getVisuals(slug: string): VisualAsset[] {
  return [...getArchiveReferenceVisuals(slug), ...getLegacyReferenceVisuals(slug), ...getConceptualVisuals(slug)];
}

export function getReferencePhotos(slug: string): VisualAsset[] {
  return [...getArchiveReferenceVisuals(slug), ...getLegacyReferenceVisuals(slug)].filter((asset) => asset.kind === "photo");
}
