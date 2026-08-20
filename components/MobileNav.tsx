"use client";

import Image from "next/image";
import Link from "next/link";
import { KeyboardEvent as ReactKeyboardEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const primaryNav = [
  ["Productos", "/#soluciones"],
  ["A medida", "/fabricacion-metalica"],
  ["Empresas", "/empresas"],
  ["Proyectos", "/proyectos"],
  ["Contacto", "/contacto"],
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a,button");
    window.requestAnimationFrame(() => first?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        window.requestAnimationFrame(() => toggleRef.current?.focus());
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = previousOverflow; };
  }, [open]);

  function trapFocus(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const focusable = Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a,button,[tabindex]:not([tabindex="-1"])') ?? []).filter((node) => !node.hasAttribute("disabled"));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  return <div className="mobile-nav-wrap prd2-mobile-nav">
    <button ref={toggleRef} type="button" className="mobile-nav-toggle" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(true)}>
      <span className="sr-only">Abrir menú</span><span aria-hidden="true">Menú</span>
    </button>
    {open && <div ref={panelRef} role="dialog" aria-modal="true" aria-label="Navegación" className="mobile-nav-panel" id="mobile-navigation" onKeyDown={trapFocus}>
      <div className="mobile-nav-top">
        <Link href="/" onClick={() => setOpen(false)} aria-label="RINON inicio"><Image src="/brand/logo-rinon-horizontal-white.png" alt="RINON Soluciones Metálicas" width={174} height={48}/></Link>
        <button type="button" className="mobile-nav-close" onClick={() => { setOpen(false); window.requestAnimationFrame(() => toggleRef.current?.focus()); }} aria-label="Cerrar menú">×</button>
      </div>
      <nav aria-label="Navegación móvil">
        {primaryNav.map(([label,href],index) => <Link key={href} href={href} onClick={() => setOpen(false)}><span>0{index+1}</span>{label}</Link>)}
      </nav>
      <Link className="mobile-nav-quote" href="/cotizar" data-event="quote_start" data-cta-location="mobile_menu" onClick={() => setOpen(false)}>Cotizar proyecto ↗</Link>
    </div>}
  </div>;
}
