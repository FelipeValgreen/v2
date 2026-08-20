import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StagingTracking } from "@/components/StagingTracking";
import { ProductionTracking } from "@/components/ProductionTracking";
import { CookieConsent } from "@/components/CookieConsent";
import { JsonLd } from "@/components/JsonLd";
import { CommercialDock } from "@/components/CommercialDock";
import { MotionController } from "@/components/MotionController";
import { SEO_BASE_URL, isIndexableSite, organizationJsonLd } from "@/lib/seo";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-raleway",
});

const indexable = isIndexableSite();
const productionTracking = process.env.RINON_PRODUCTION_TRACKING_ENABLED === "true";

export const metadata: Metadata = {
  metadataBase: new URL(SEO_BASE_URL),
  title: { default: "RINON | Soluciones Metálicas", template: "%s | RINON" },
  description: "Fabricación y soluciones metálicas para particulares, empresas e instituciones.",
  applicationName: "RINON",
  category: "Fabricación metálica",
  icons: { icon: "/brand/favicon-64.png", apple: "/brand/apple-touch-icon-180.png" },
  verification: {
    google: "DG5fIXNQgMGRpHGC0RwK-R3QvIyx20qjrQQdMRqCymQ",
  },
  openGraph: {
    siteName: "RINON",
    locale: "es_CL",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "RINON Soluciones Metálicas" }],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
  robots: {
    index: indexable,
    follow: indexable,
    googleBot: { index: indexable, follow: indexable },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="es-CL" className={raleway.variable}><body>
    <a className="skip-link" href="#main-content">Saltar al contenido</a>
    <JsonLd data={organizationJsonLd} />
    <SiteHeader />
    <MotionController />
    {productionTracking ? <><ProductionTracking /><CookieConsent /></> : !indexable ? <StagingTracking /> : null}
    <div id="main-content">{children}</div>
    <SiteFooter />
    <CommercialDock />
  </body></html>;
}
