import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "@/components/MobileNav";

const primaryNav = [
  ["Productos", "/#soluciones"],
  ["A medida", "/fabricacion-metalica"],
  ["Empresas", "/empresas"],
  ["Proyectos", "/proyectos"],
  ["Contacto", "/contacto"],
] as const;

export function SiteHeader() {
  return <>
    <header className="prd2-header">
      <div className="container prd2-header-inner">
        <Link className="prd2-brand" href="/" aria-label="RINON inicio">
          <Image src="/brand/logo-rinon-horizontal-white.png" alt="RINON Soluciones Metálicas" width={205} height={56} priority />
        </Link>
        <nav className="prd2-desktop-nav" aria-label="Principal">
          {primaryNav.map(([label,href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="prd2-header-actions">
          <Link className="prd2-header-cta" data-event="quote_start" data-cta-location="header" href="/cotizar">Cotizar proyecto <span>↗</span></Link>
        </div>
        <MobileNav />
      </div>
    </header>
  </>;
}
