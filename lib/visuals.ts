export type VisualAsset = {
  src: string;
  alt: string;
  kind: "photo" | "conceptual" | "render";
  provenance: "verified-rinon" | "current-site-approved" | "user-drive-reference" | "conceptual";
  label: string;
  note?: string;
  sourceWidth?: number;
  sourceHeight?: number;
};

const referenceBase = "/visuals/reference-current";

/**
 * Visual provenance is intentionally conservative:
 * - verified-rinon: only when RINON ownership/project attribution is independently verified.
 * - user-drive-reference: product imagery found in the user's connected archive; useful as a
 *   product reference, but never attributed to a client/project without further evidence.
 * - current-site-approved: reference imagery inherited from the current public site.
 * - conceptual: art-direction imagery, always labelled as conceptual.
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
      sourceWidth: 1200,
      sourceHeight: 900,
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
      note: "Visual de dirección técnica. Geometría y solución final se definen según el requerimiento real.",
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
    },
    {
      src: `${referenceBase}/camarote-desmontable-dormitorio-compartido.jpg`,
      alt: "Camarote metálico desmontable en dormitorio compartido",
      kind: "photo",
      provenance: "current-site-approved",
      label: "Producto / referencia actual",
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
