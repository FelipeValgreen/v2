/**
 * PRELIMINARY migration resolver for RINON 2.0 staging.
 * Do not wire to production redirects until Search Console / analytics exceptions are joined.
 */

export type MigrationAction = "KEEP" | "REWRITE" | "MERGE_301" | "REVIEW";
export type MigrationDecision = { action: MigrationAction; destination: string; family: string; reason: string };

const durable = new Set([
  "/", "/camarotes", "/camarote-con-escritorio", "/cierres-perimetrales", "/rejas-metalicas", "/portones-metalicos", "/estructuras-metalicas", "/pintura-electrostatica", "/cotizar", "/contacto", "/preguntas-frecuentes", "/politica-de-privacidad", "/politica-de-cookies", "/blog", "/empresas",
]);
const protectedProductCandidates = new Set([
  "/camarote-nido", "/camarote-triple", "/camarote-doble", "/cama-alta", "/camarote-titanic", "/camarote-1-5-plazas", "/camarote-desmontable", "/cama-dos-plazas-con-cajon", "/cama-institucional-metalica", "/camarote-2-plazas", "/cama-loft-metalica", "/cama-loft-con-escritorio",
]);
function normalize(path: string) { const clean = path.split("?")[0].split("#")[0].trim(); if (!clean || clean === "/") return "/"; return `/${clean.replace(/^\/+|\/+$/g, "")}`.toLowerCase(); }
export function resolveMigration(inputPath: string): MigrationDecision {
  const path = normalize(inputPath);
  if (durable.has(path)) return { action: "REWRITE", destination: path, family: "durable", reason: "Existing route matches a durable RINON 2.0 intent." };
  if (protectedProductCandidates.has(path)) return { action: "REVIEW", destination: path, family: "product", reason: "Product route may have independent demand/equity; performance review required before consolidation." };
  if (path.startsWith("/camarote-con-escritorio-") || path.startsWith("/camarotes-con-escritorio-")) return { action: "MERGE_301", destination: "/camarote-con-escritorio", family: "camarote-escritorio", reason: "Geo/profile/use modifier should consolidate into the dominant product intent by default." };
  if (path.startsWith("/camarotes-") || ["/literas", "/litera-metalica", "/camarote-de-acero", "/literas-militares", "/fabricante-camarotes-chile", "/venta-mayor-camarotes-metalicos"].includes(path)) return { action: "MERGE_301", destination: "/camarotes", family: "camarotes", reason: "Commercial, sector or geographic bunk-bed alias consolidates into category hub unless performance creates an exception." };
  if (path.startsWith("/cercos-perimetrales-") || path.startsWith("/cercos-para-") || path.startsWith("/cierres-para-") || ["/cierre-de-terrenos", "/cierre-perimetral-industrial", "/cercos-metalicos", "/fabricante-cercos-metalicos", "/fabricante-cierres-perimetrales", "/proveedor-cierres-perimetrales", "/cierres-metalicos-industriales", "/cierres-perimetrales-por-mayor", "/cierres-perimetrales-para-empresas", "/presupuesto-cierre-perimetral", "/presupuesto-cerco-perimetral"].includes(path)) return { action: "MERGE_301", destination: "/cierres-perimetrales", family: "cierres", reason: "Geo/sector/commercial aliases consolidate into the perimeter-closure intent owner." };
  if (path.startsWith("/rejas-metalicas-") || ["/reja-metalica-santiago", "/reja-tubular", "/rejas-tubulares", "/rejas-de-fierro", "/rejas-galvanizadas", "/rejas-de-seguridad", "/rejas-decorativas", "/rejas-para-exteriores", "/instalacion-de-rejas", "/reja-para-jardin", "/rejas-para-ventanas", "/rejas-para-puertas", "/rejas-para-balcon", "/rejas-para-terraza", "/rejas-para-locales-comerciales", "/rejas-para-galpones", "/rejas-para-colegios", "/fabricante-rejas-metalicas-chile"].includes(path)) return { action: "MERGE_301", destination: "/rejas-metalicas", family: "rejas", reason: "Geo/use/material aliases consolidate into the dominant reja fabrication intent unless performance warrants a child page." };
  if (path.startsWith("/portones-") || ["/fabricante-portones-metalicos-chile", "/puertas-peatonales"].includes(path)) return { action: "MERGE_301", destination: "/portones-metalicos", family: "portones", reason: "Geo/model aliases consolidate into dominant portón intent; automation claims remain subject to capability validation." };
  if (path.startsWith("/pintura-electrostatica-")) return { action: "MERGE_301", destination: "/pintura-electrostatica", family: "pintura", reason: "Geographic service alias consolidates into the service owner unless differentiated operational evidence exists." };
  if (path === "/estructuras-metalicas-a-pedido" || path === "/fabricante-estructuras-metalicas-chile" || path === "/escaleras-metalicas" || path === "/barandas-metalicas") return { action: "MERGE_301", destination: "/estructuras-metalicas", family: "estructuras", reason: "Initial architecture treats these as structure typologies/aliases; independent performance can override." };
  if (path === "/soldadura-metalica-santiago" || path === "/metalurgica-rinon") return { action: "MERGE_301", destination: "/fabricacion-metalica", family: "fabricacion", reason: "Welding/fabricator intent is represented by the transversal fabrication page unless standalone service is validated." };
  if (path.startsWith("/mallas-separadoras") || path === "/mallas-3d" || path === "/barreras-peatonales") return { action: "REVIEW", destination: "/cierres-perimetrales", family: "protecciones", reason: "Potential independent commercial intent. Validate performance and offer before choosing keep vs merge." };
  return { action: "REVIEW", destination: path, family: "unclassified", reason: "No safe family rule. Requires explicit inventory/performance review." };
}
