import {legacyCommercialSlugs} from "@/lib/legacy-commercial";

/** PRELIMINARY migration resolver. Production redirects remain flag-gated and GSC-dependent. */
export type MigrationAction="KEEP"|"REWRITE"|"MERGE_301"|"REVIEW";
export type MigrationDecision={action:MigrationAction;destination:string;family:string;reason:string};

const durable=new Set([
 "/","/soluciones","/camarotes","/camas-metalicas","/camas-balinesas","/mesas-metalicas","/escritorios-metalicos","/camarote-con-escritorio","/cierres-perimetrales","/mallas-3d","/mallas-separadoras","/rejas-metalicas","/portones-metalicos","/estructuras-metalicas","/fabricacion-metalica","/fabricaciones-especiales","/equipamiento-metalico","/soldadura-mig","/corte-metalico","/pintura-electrostatica","/instalacion","/reparaciones-metalicas","/cotizar","/contacto","/preguntas-frecuentes","/politica-de-privacidad","/politica-de-cookies","/blog","/empresas","/proyectos","/nosotros","/recursos",
 ...legacyCommercialSlugs.map(slug=>`/${slug}`),
]);
const protectedProductCandidates=new Set(["/camarote-nido","/camarote-triple","/camarote-doble","/cama-alta","/camarote-titanic","/camarote-1-5-plazas","/camarote-desmontable","/cama-dos-plazas-con-cajon","/cama-institucional-metalica","/camarote-2-plazas","/cama-loft-metalica","/cama-loft-con-escritorio"]);

/**
 * Pages directly observed as live/indexable or prominently internally linked on rinon.cl
 * during the pre-cutover crawl. They may have independent query/landing-page equity, so a
 * broad family redirect is unsafe until the Search Console export is reconciled.
 */
export const observedLiveReviewPaths=new Set([
 "/literas","/camarotes-baratos","/camarotes-precio","/camarotes-faenas","/camarotes-salmoneras","/camarotes-mineria","/camarotes-metalicos","/fabricante-camarotes-chile","/camarotes-al-por-mayor","/camarotes-para-internados","/camarotes-para-hospitales","/camarotes-militares",
 "/camarotes-providencia","/camarotes-las-condes","/camarotes-maipu","/camarotes-nunoa","/camarotes-la-florida","/camarotes-pudahuel","/camarotes-santiago-centro","/camarotes-penalolen","/camarotes-quilicura","/camarotes-puente-alto","/camarotes-san-bernardo","/camarotes-renca","/camarotes-estacion-central","/camarotes-lo-barnechea",
 "/camarote-con-escritorio-economico","/camarote-con-escritorio-full","/camarote-con-escritorio-full-2-plazas",
 "/reja-metalica-santiago","/rejas-metalicas-pudahuel","/rejas-metalicas-maipu","/rejas-metalicas-cerrillos","/rejas-metalicas-precio","/rejas-metalicas-para-casas","/rejas-decorativas","/rejas-para-exteriores","/rejas-para-terraza","/rejas-para-balcon",
 "/portones-industriales","/cercos-para-empresas","/cercos-para-parcelas","/cercos-perimetrales-concepcion","/cercos-perimetrales-antofagasta","/mallas-separadoras-industriales",
 "/soldadura-metalica-santiago",
 "/pintura-electrostatica-zona-sur-santiago","/pintura-electrostatica-colina","/pintura-electrostatica-las-condes","/pintura-electrostatica-providencia","/pintura-electrostatica-santiago-centro","/pintura-electrostatica-maipu","/pintura-electrostatica-talagante",
]);
export const MIGRATION_GSC_REVIEW_PENDING_COUNT=53;
function normalize(path:string){const clean=path.split("?")[0].split("#")[0].trim();if(!clean||clean==="/")return "/";return `/${clean.replace(/^\/+|\/+$/g,"")}`.toLowerCase()}

export function resolveMigration(inputPath:string):MigrationDecision{
 const path=normalize(inputPath);
 if(durable.has(path))return {action:"REWRITE",destination:path,family:"durable",reason:"Existing route matches a durable RINON 2.0 intent."};
 if(protectedProductCandidates.has(path))return {action:"REVIEW",destination:path,family:"product",reason:"Product route may have independent demand/equity; performance review required before consolidation."};
 if(observedLiveReviewPaths.has(path))return {action:"REVIEW",destination:path,family:"live-observed",reason:"Live/indexable or prominently linked pre-cutover URL. Search Console landing-page/query data is required before KEEP vs 301 is approved."};
 if(path.startsWith("/camarote-con-escritorio-")||path.startsWith("/camarotes-con-escritorio-"))return {action:"MERGE_301",destination:"/camarote-con-escritorio",family:"camarote-escritorio",reason:"Geo/profile/use modifier consolidates into the product owner unless performance creates an exception."};
 if(path.startsWith("/camarotes-")||["/camarotes-metalicos","/literas","/litera-metalica","/camarote-de-acero","/literas-militares","/fabricante-camarotes-chile","/venta-mayor-camarotes-metalicos"].includes(path))return {action:"MERGE_301",destination:"/camarotes",family:"camarotes",reason:"Commercial, sector or geographic bunk-bed alias consolidates into category hub only after live-observed/GSC exceptions are resolved."};
 if(path.startsWith("/camas-metalicas-")||path==="/fabricante-camas-metalicas")return {action:"MERGE_301",destination:"/camas-metalicas",family:"camas",reason:"Generic/geo metal-bed aliases consolidate into the dedicated bed intent owner."};
 if(path.startsWith("/cercos-perimetrales-")||path.startsWith("/cercos-metalicos-")||path.startsWith("/cercos-para-")||path.startsWith("/cierres-para-")||["/cierre-de-terrenos","/cierre-perimetral-industrial","/cercos-metalicos","/fabricante-cercos-metalicos","/fabricante-cierres-perimetrales","/proveedor-cierres-perimetrales","/cierres-metalicos-industriales","/cierres-perimetrales-por-mayor","/cierres-perimetrales-para-empresas","/presupuesto-cierre-perimetral","/presupuesto-cerco-perimetral"].includes(path))return {action:"MERGE_301",destination:"/cierres-perimetrales",family:"cierres",reason:"Geo/sector/commercial aliases consolidate into the perimeter-closure intent owner after performance review."};
 if(path.startsWith("/mallas-separadoras-"))return {action:"MERGE_301",destination:"/mallas-separadoras",family:"mallas-separadoras",reason:"Legacy industrial or use-specific aliases consolidate into the dedicated interior separation intent owner."};
 if(path.startsWith("/rejas-metalicas-")||["/reja-metalica-santiago","/reja-tubular","/rejas-tubulares","/rejas-de-fierro","/rejas-galvanizadas","/rejas-de-seguridad","/rejas-decorativas","/rejas-para-exteriores","/instalacion-de-rejas","/reja-para-jardin","/rejas-para-ventanas","/rejas-para-puertas","/rejas-para-balcon","/rejas-para-terraza","/rejas-para-locales-comerciales","/rejas-para-galpones","/rejas-para-colegios","/fabricante-rejas-metalicas-chile"].includes(path))return {action:"MERGE_301",destination:"/rejas-metalicas",family:"rejas",reason:"Geo/use/material aliases consolidate into the dominant reja intent only after live-observed/GSC exceptions are resolved."};
 if(path.startsWith("/portones-")||["/fabricante-portones-metalicos-chile","/puertas-peatonales"].includes(path))return {action:"MERGE_301",destination:"/portones-metalicos",family:"portones",reason:"Geo/model aliases consolidate into dominant portón intent after live-observed/GSC exceptions are resolved; automation claims remain separately validated."};
 if(path.startsWith("/pintura-electrostatica-"))return {action:"MERGE_301",destination:"/pintura-electrostatica",family:"pintura",reason:"Geographic service alias consolidates into the confirmed service owner unless GSC supports a differentiated page."};
 if(path==="/estructuras-metalicas-a-pedido"||path==="/fabricante-estructuras-metalicas-chile"||path==="/escaleras-metalicas"||path==="/barandas-metalicas")return {action:"MERGE_301",destination:"/estructuras-metalicas",family:"estructuras",reason:"Initial architecture treats these as structure typologies/aliases; independent performance can override."};
 if(path==="/soldadura-metalica-santiago"||path.startsWith("/soldadura-mig-"))return {action:"MERGE_301",destination:"/soldadura-mig",family:"soldadura",reason:"Legacy or geo welding intent consolidates into the dedicated MIG welding service owner unless GSC supports a child landing."};
 if(path==="/metalurgica-rinon")return {action:"MERGE_301",destination:"/fabricacion-metalica",family:"fabricacion",reason:"General metal-fabricator intent is represented by the transversal fabrication owner."};
 if(path==="/barreras-peatonales")return {action:"REVIEW",destination:"/cierres-perimetrales",family:"protecciones",reason:"Potential independent commercial intent. Validate performance and offer before choosing keep vs merge."};
 return {action:"REVIEW",destination:path,family:"unclassified",reason:"No safe family rule. Requires explicit inventory/performance review."};
}
