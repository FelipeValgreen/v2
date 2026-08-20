import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "@/components/MobileNav";
import { DesktopMegaNav } from "@/components/DesktopMegaNav";

export function SiteHeader() {
  return <header className="prd2-header">
    <div className="container prd2-header-inner">
      <Link className="prd2-brand" href="/" aria-label="RINON inicio">
        <Image src="/brand/logo-rinon-horizontal-white.png" alt="RINON Soluciones Metálicas" width={205} height={56} priority />
      </Link>
      <DesktopMegaNav />
      <div className="prd2-header-actions">
        <Link className="prd2-header-cta" data-event="quote_start" data-cta-location="header" href="/cotizar">Cotizar proyecto <span>↗</span></Link>
      </div>
      <MobileNav />
    </div>
  </header>;
}
