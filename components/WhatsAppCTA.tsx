"use client";
import Link from "next/link";
import { whatsappUrl } from "@/lib/whatsapp";

export function WhatsAppCTA({ category, location, label = "Hablar por WhatsApp", className = "button secondary" }: { category?: string; location: string; label?: string; className?: string }) {
  const href = whatsappUrl(category);
  if (!href) {
    return <Link className={className} href="/contacto" data-cta-location={location}>{label.replace("WhatsApp", "contacto")}</Link>;
  }
  return <a
    className={className}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    data-event="whatsapp_click"
    data-cta-location={location}
    data-quote-category={category ?? "general"}
  >{label}</a>;
}
