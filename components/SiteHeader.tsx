import Link from "next/link";
import { MobileNav } from "@/components/MobileNav";
import { DesktopMegaNav } from "@/components/DesktopMegaNav";

export function SiteHeader() {
  return <header className="prd2-header">
    <div className="container prd2-header-inner">
      <Link className="prd2-brand" href="/" aria-label="RINON inicio">
        <img src="/brand/rinon-lockup-horizontal-inverse.svg" alt="RINON Soluciones Metálicas" width="176" height="42" fetchPriority="high" />
      </Link>
      <DesktopMegaNav />
      <div className="prd2-header-actions">
        <Link className="prd2-header-cta" data-event="quote_start" data-cta-location="header" href="/cotizar">Cotizar <span>↗</span></Link>
      </div>
      <MobileNav />
    </div>
  </header>;
}
