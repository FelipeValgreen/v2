export type VisualAsset = {
  src: string;
  alt: string;
  kind: "photo" | "conceptual" | "render";
  provenance: "verified-rinon" | "current-site-approved" | "conceptual";
  label: string;
  note?: string;
  sourceWidth?: number;
  sourceHeight?: number;
};

const referenceBase = "/visuals/reference-current";

/**
 * Conceptual visuals are local art-direction assets and can always render because they are
 * explicitly labelled as conceptual. Legacy/current-site photos remain opt-in: approval to
 * use a photo as reference does not mean it is a verified client project.
 */
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

export function getConceptualVisuals(slug: string): VisualAsset[] {
  return conceptualAssets[slug] ?? [];
}

export function getLegacyReferenceVisuals(slug: string): VisualAsset[] {
  if (!allowLegacyReferenceImages()) return [];
  return legacyReferenceAssets[slug] ?? [];
}

export function getVisuals(slug: string): VisualAsset[] {
  return [...getLegacyReferenceVisuals(slug), ...getConceptualVisuals(slug)];
}

export function getReferencePhotos(slug: string): VisualAsset[] {
  return getLegacyReferenceVisuals(slug).filter((asset) => asset.kind === "photo");
}
