import type { MetadataRoute } from "next";
import { SEO_BASE_URL, isIndexableSite } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexableSite()) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin", "/admin/"],
    },
    sitemap: `${SEO_BASE_URL}/sitemap.xml`,
    host: SEO_BASE_URL,
  };
}
