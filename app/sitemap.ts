import type { MetadataRoute } from "next";
import { publicSolutions } from "@/lib/site";
import { publicResourceArticles } from "@/lib/resources";
import { migrationResourceArticles } from "@/lib/migration-resources";
import { legacyCommercialSlugs } from "@/lib/legacy-commercial";
import { canonicalUrl } from "@/lib/seo";

const durableRoutes = [
  "/",
  "/soluciones",
  "/camarote-con-escritorio",
  "/rejas-metalicas",
  "/portones-metalicos",
  "/recursos",
  "/preguntas-frecuentes",
  "/contacto",
  "/nosotros",
  "/empresas",
  "/proyectos",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const solutionRoutes = publicSolutions.map((solution) => solution.slug);
  const resourceRoutes = [...publicResourceArticles, ...migrationResourceArticles].map((article) => `/recursos/${article.slug}`);
  const preservedCommercialRoutes = legacyCommercialSlugs.map((slug) => `/${slug}`);
  const routes = [...new Set([...durableRoutes, ...solutionRoutes, ...preservedCommercialRoutes, ...resourceRoutes])];

  return routes.map((pathname) => ({
    url: canonicalUrl(pathname),
    changeFrequency: pathname.startsWith("/recursos/") ? "monthly" : "weekly",
    priority: pathname === "/" ? 1 : pathname === "/soluciones" ? 0.9 : pathname.startsWith("/recursos/") ? 0.6 : 0.8,
  }));
}
