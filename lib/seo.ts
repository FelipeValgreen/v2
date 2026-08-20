import type { Metadata } from "next";
import { DEFAULT_PUBLIC_CONTACT, publicAddressLine, publicLocality, publicPhoneDisplay } from "@/lib/contact";

export const SEO_BASE_URL = "https://rinon.cl";

/**
 * Fail-safe indexing gate.
 * Preview/staging stays noindex unless production explicitly opts in.
 */
export function isIndexableSite() {
  return process.env.RINON_INDEXABLE === "true";
}

export function canonicalUrl(pathname = "/") {
  const path = pathname === "/" ? "" : `/${pathname.replace(/^\/+|\/+$/g, "")}`;
  return `${SEO_BASE_URL}${path}`;
}

export function routeMetadata(
  pathname: string,
  title: string,
  description: string,
  options: { indexable?: boolean } = {},
): Metadata {
  const indexable = (options.indexable ?? true) && isIndexableSite();
  return {
    title,
    description,
    alternates: { canonical: canonicalUrl(pathname) },
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: { index: indexable, follow: indexable },
    },
    openGraph: {
      type: "website",
      locale: "es_CL",
      siteName: "RINON",
      title,
      description,
      url: canonicalUrl(pathname),
      images: [{ url: canonicalUrl("/opengraph-image"), width: 1200, height: 630, alt: `${title} | RINON` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [canonicalUrl("/opengraph-image")] },
  };
}

const organizationPhone = publicPhoneDisplay();

export const organizationJsonLd = [{
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SEO_BASE_URL}/#organization`,
  name: "RINON",
  legalName: "Tolipoli SpA",
  taxID: "77.795.508-K",
  url: SEO_BASE_URL,
  logo: `${SEO_BASE_URL}/brand/logo-rinon-horizontal-transparent.png`,
  ...(organizationPhone ? { telephone: organizationPhone } : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: publicAddressLine(),
    addressLocality: publicLocality(),
    addressRegion: DEFAULT_PUBLIC_CONTACT.region,
    addressCountry: "CL",
  },
  areaServed: { "@type": "AdministrativeArea", name: "Región Metropolitana de Santiago" },
  ...(organizationPhone ? { contactPoint: { "@type": "ContactPoint", telephone: organizationPhone, contactType: "sales", areaServed: "Región Metropolitana de Santiago", availableLanguage: ["es"] } } : {}),
  description: "Fabricación y soluciones metálicas para particulares, empresas e instituciones.",
}, {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SEO_BASE_URL}/#website`,
  url: SEO_BASE_URL,
  name: "RINON",
  inLanguage: "es-CL",
  publisher: { "@id": `${SEO_BASE_URL}/#organization` },
}];

export function solutionJsonLd(input: {
  pathname: string;
  name: string;
  description: string;
  faqs?: Array<{ q: string; a: string }>;
}) {
  const items: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonicalUrl(input.pathname)}#service`,
      name: input.name,
      description: input.description,
      url: canonicalUrl(input.pathname),
      provider: { "@id": `${SEO_BASE_URL}/#organization` },
      areaServed: { "@type": "AdministrativeArea", name: "Región Metropolitana de Santiago" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "RINON",
          item: SEO_BASE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: input.name,
          item: canonicalUrl(input.pathname),
        },
      ],
    },
  ];
  if (input.faqs?.length) {
    items.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: input.faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    });
  }
  return items;
}
