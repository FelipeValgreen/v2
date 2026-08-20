import type { MetadataRoute } from "next";
import { publicSolutions } from "@/lib/site";
import { publicResourceArticles } from "@/lib/resources";
import { canonicalUrl } from "@/lib/seo";

const durableRoutes = [
  "/",
  "/camarote-con-escritorio",
  "/rejas-metalicas",
  "/portones-metalicos",
  "/recursos",
  "/preguntas-frecuentes",
  "/contacto",
  "/nosotros",
  "/empresas",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const solutionRoutes = publicSolutions.map((solution) => solution.slug);
  const resourceRoutes = publicResourceArticles.map((article) => `/recursos/${article.slug}`);
  const routes = [...new Set([...durableRoutes, ...solutionRoutes, ...resourceRoutes])];

  return routes.map((pathname) => ({
    url: canonicalUrl(pathname),
    changeFrequency: pathname.startsWith("/recursos/") ? "monthly" : "weekly",
    priority: pathname === "/" ? 1 : pathname.startsWith("/recursos/") ? 0.6 : 0.8,
  }));
}
