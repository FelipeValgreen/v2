import Link from "next/link";

export function SolutionLocalNav({ hasXRay = false, quoteHref = "/cotizar" }: { hasXRay?: boolean; quoteHref?: string }) {
  const items = [
    ["Resumen", "#resumen"],
    ...(hasXRay ? [["X-Ray", "#xray"]] : []),
    ["Alcance", "#alcance"],
    ["Aplicaciones", "#aplicaciones"],
    ["FAQ", "#faq"],
  ] as const;
  return <nav className="solution-local-nav" aria-label="Navegación de la solución">
    <div className="container solution-local-nav-inner">
      <span>RINON</span>
      <div className="solution-local-links">
        {items.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </div>
      <Link href={quoteHref}>Cotizar <b>↗</b></Link>
    </div>
  </nav>;
}
