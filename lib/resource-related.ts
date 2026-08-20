import type { ResourceArticle } from "@/lib/resources";

function ownerFamily(href: string) {
  if (href.includes("reja") || href.includes("cierre") || href.includes("porton")) return "perimetro";
  if (href.includes("camarote") || href.includes("empresas")) return "alojamiento-b2b";
  if (href.includes("estructura") || href.includes("fabricacion") || href.includes("equipamiento")) return "fabricacion";
  if (href.includes("pintura")) return "terminacion";
  return href.split("/")[1] || "general";
}

export function getRelatedResourcesFromPool(article: ResourceArticle, pool: ResourceArticle[], limit = 3) {
  const family = ownerFamily(article.ownerHref);
  return pool
    .filter((item) => item.slug !== article.slug)
    .map((item) => ({
      item,
      score:
        (item.ownerHref === article.ownerHref ? 8 : 0) +
        (item.category === article.category ? 5 : 0) +
        (ownerFamily(item.ownerHref) === family ? 4 : 0),
    }))
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, "es"))
    .slice(0, limit)
    .map(({ item }) => item);
}
