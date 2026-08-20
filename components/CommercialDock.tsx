"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/lib/whatsapp";

const excluded = ["/admin", "/cotizar", "/politica-de-privacidad", "/politica-de-cookies", "/terminos", "/contacto"];

export function CommercialDock() {
  const pathname = usePathname();
  if (pathname === "/" || excluded.some((prefix) => pathname.startsWith(prefix))) return null;
  const whatsapp = whatsappUrl();
  return <div className="commercial-dock" aria-label="Acciones rápidas">
    {whatsapp ? <a href={whatsapp} target="_blank" rel="noopener noreferrer" data-event="contact_whatsapp" data-cta-location="commercial_dock">WhatsApp ↗</a> : null}
    <Link href="/cotizar" data-event="quote_start" data-cta-location="commercial_dock">Cotizar proyecto ↗</Link>
  </div>;
}
