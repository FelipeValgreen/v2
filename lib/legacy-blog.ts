export type LegacyBlogAction =
  | "KEEP_REWRITE_CANDIDATE"
  | "MERGE_CANDIDATE"
  | "REVIEW_HIGH_RISK"
  | "REVIEW_PERFORMANCE";

export type LegacyBlogDecision = {
  slug: string;
  action: LegacyBlogAction;
  suggestedDestination: string;
  risk: string;
};

/**
 * Inventory extracted from the current RINON repository on 2026-08-19.
 * This is a migration control list, NOT permission to redirect.
 */
export const legacyBlogSlugs = [
  "camarote-con-escritorio-guia-completa","camarote-nido-que-es","cama-alta-vs-camarote","mejores-camarotes-chile","camarote-dos-plazas","camarote-plaza-y-media","litera-metalica-chile","camarote-gamer-setup","donde-comprar-camarote-santiago","colchon-para-camarote","camarote-para-ninos","camarote-matrimonial-chile","armar-camarote-metalico","camarote-adultos","medidas-camarote-estandar","camarote-segunda-mano-vs-nuevo","como-elegir-camarote","cuanto-cuesta-camarote-chile","camarote-para-departamento","camarote-vs-cama-individual","camarote-para-hostal","mantenimiento-camarote-metalico","camarote-regalo","camarote-nino-6-anos","decorar-habitacion-camarote","camarote-segunda-mano-donde-comprar","pieza-compartida-hermanos","camarote-universitario","camarote-vs-cucheta","camarote-para-adulto-mayor","camarote-armado-paso-a-paso","camarote-con-cajones","camarote-metalico-vs-madera","pago-contra-entrega-camarote","camarote-para-pieza-pequena","como-equipar-campamento-minero","diferencias-camarotes-industriales-residenciales","camarotes-para-temporeros","proveedor-camarotes-empresas","mejor-camarote-con-escritorio-chile","camarote-escritorio-vs-escritorio-aparte","como-crear-zona-de-estudio-dormitorio","pintura-electrostatica-muebles-metalicos","camarotes-metalicos-vs-madera","cuanto-cuesta-cierre-perimetral-chile","tipos-de-cierres-perimetrales","mallas-separadoras-para-bodegas","cierre-perimetral-obra-chile","como-separar-peatones-vehiculos-empresa","como-elegir-reja-metalica-frontis","cerco-para-parcela-de-agrado","cuanto-cuesta-porton-automatico-chile","galvanizado-vs-pintado-cuando-elegir","como-medir-metros-lineales-reja","mezzanine-metalico-bodega-guia","porton-corredizo-vs-batiente","como-cotizar-rejas-metalicas","altura-reja-casa-seguridad","cuanto-dura-una-reja-metalica","mantenimiento-rejas-metalicas","rejas-para-departamentos","como-elegir-color-reja-metalica","cuanto-cuesta-cerco-perimetral-metro-lineal","camarotes-militares-caracteristicas-tecnicas","literas-metalicas-vs-madera","mallas-3d-que-son-y-cuando-usarlas","como-elegir-camarotes-para-internado","camarotes-mineria-que-exige-cada-faena","cama-loft-vs-camarote-diferencia","como-instalar-camarote-metalico","pintura-electrostatica-que-es","camarotes-para-hostal-guia-completa","camarotes-agricolas-temporada-cosecha","como-elegir-camarote-con-escritorio","camarote-con-escritorio-pieza-pequena","cama-alta-con-escritorio-para-estudiantes"
] as const;

const highRisk = new Set<string>(["altura-reja-casa-seguridad","camarote-nino-6-anos","camarote-para-adulto-mayor","camarote-para-ninos","camarotes-agricolas-temporada-cosecha","camarotes-militares-caracteristicas-tecnicas","camarotes-mineria-que-exige-cada-faena","camarotes-para-temporeros","cierre-perimetral-obra-chile","como-elegir-camarotes-para-internado","como-equipar-campamento-minero","cuanto-cuesta-camarote-chile","cuanto-cuesta-cerco-perimetral-metro-lineal","cuanto-cuesta-cierre-perimetral-chile","cuanto-cuesta-porton-automatico-chile","cuanto-dura-una-reja-metalica","galvanizado-vs-pintado-cuando-elegir","pago-contra-entrega-camarote","pintura-electrostatica-que-es"]);
const mergeCandidates = new Set<string>(["camarote-armado-paso-a-paso","camarote-escritorio-vs-escritorio-aparte","camarote-gamer-setup","camarote-metalico-vs-madera","camarote-para-departamento","camarote-para-pieza-pequena","camarote-regalo","camarote-segunda-mano-donde-comprar","camarote-segunda-mano-vs-nuevo","camarote-universitario","camarote-vs-cucheta","camarotes-metalicos-vs-madera","como-crear-zona-de-estudio-dormitorio","decorar-habitacion-camarote","donde-comprar-camarote-santiago","literas-metalicas-vs-madera","mejor-camarote-con-escritorio-chile","mejores-camarotes-chile","pieza-compartida-hermanos"]);
const keepRewriteCandidates = new Set<string>(["cama-alta-con-escritorio-para-estudiantes","cama-loft-vs-camarote-diferencia","camarote-con-escritorio-pieza-pequena","camarotes-para-hostal-guia-completa","cerco-para-parcela-de-agrado","como-cotizar-rejas-metalicas","como-elegir-camarote","como-elegir-camarote-con-escritorio","como-elegir-color-reja-metalica","como-elegir-reja-metalica-frontis","como-instalar-camarote-metalico","como-medir-metros-lineales-reja","como-separar-peatones-vehiculos-empresa","diferencias-camarotes-industriales-residenciales","mallas-3d-que-son-y-cuando-usarlas","mallas-separadoras-para-bodegas","mantenimiento-camarote-metalico","mantenimiento-rejas-metalicas","mezzanine-metalico-bodega-guia","pintura-electrostatica-muebles-metalicos","porton-corredizo-vs-batiente","proveedor-camarotes-empresas","rejas-para-departamentos","tipos-de-cierres-perimetrales"]);

export const approvedLegacyBlogRedirects: Readonly<Record<string, string>> = {};
function suggestedDestination(slug: string) {
  if (slug.includes("porton")) return "/portones-metalicos";
  if (slug.includes("reja") || slug.includes("galvanizado")) return "/rejas-metalicas";
  if (slug.includes("cierre") || slug.includes("cerco") || slug.includes("malla") || slug.includes("peatones-vehiculos")) return "/cierres-perimetrales";
  if (slug.includes("mezzanine")) return "/estructuras-metalicas";
  if (slug.includes("pintura")) return "/pintura-electrostatica";
  if (slug.includes("escritorio") || slug.includes("zona-de-estudio")) return "/camarote-con-escritorio";
  return "/camarotes";
}
export function getLegacyBlogDecision(slug: string): LegacyBlogDecision | undefined {
  if (!(legacyBlogSlugs as readonly string[]).includes(slug)) return undefined;
  const suggested = suggestedDestination(slug);
  if (highRisk.has(slug)) return { slug, action: "REVIEW_HIGH_RISK", suggestedDestination: suggested, risk: "Contains pricing, payment, safety, legal, regulatory or technical assertions that need factual review before reuse." };
  if (keepRewriteCandidates.has(slug)) return { slug, action: "KEEP_REWRITE_CANDIDATE", suggestedDestination: suggested, risk: "Intent aligns with RINON 2.0, but URL equity and content claims must be reviewed before choosing keep-vs-move." };
  if (mergeCandidates.has(slug)) return { slug, action: "MERGE_CANDIDATE", suggestedDestination: suggested, risk: "Legacy B2C or overlapping intent. Do not 301 until performance/backlink evidence confirms consolidation is safe." };
  return { slug, action: "REVIEW_PERFORMANCE", suggestedDestination: suggested, risk: "Potential long-tail equity or product-specific intent; performance evidence required." };
}
