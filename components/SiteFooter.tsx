import Image from "next/image";
import Link from "next/link";
import {publicAddressDisplay,publicPhoneDisplay,publicPhoneHref} from "@/lib/contact";
import {whatsappUrl} from "@/lib/whatsapp";
import {footerProductItems,serviceNavItems} from "@/lib/navigation";

export function SiteFooter(){
 const phoneHref=publicPhoneHref(); const whatsapp=whatsappUrl();
 return <footer className="s6-footer">
  <div className="container s6-footer-main s6-footer-main-v2">
   <div className="s6-footer-brand">
    <Image src="/brand/logo-rinon-horizontal-white.png" alt="RINON Soluciones Metálicas" width={220} height={60}/>
    <p>Fabricación metálica para productos, proyectos y soluciones a medida.</p>
    <Link className="s6-footer-quote" href="/cotizar" data-event="quote_start" data-cta-location="footer">Cotizar proyecto ↗</Link>
   </div>
   <nav className="s6-footer-column" aria-label="Productos"><strong>Productos</strong>{footerProductItems.map(item=><Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
   <nav className="s6-footer-column" aria-label="Servicios"><strong>Servicios</strong>{serviceNavItems.map(item=><Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
   <div className="s6-footer-column s6-footer-contact"><strong>Contacto</strong>{whatsapp?<a href={whatsapp} target="_blank" rel="noopener noreferrer" data-event="contact_whatsapp" data-cta-location="footer">WhatsApp ↗</a>:null}{phoneHref?<a href={phoneHref} data-event="contact_phone" data-cta-location="footer">{publicPhoneDisplay()}</a>:null}<span>{publicAddressDisplay()}</span><Link href="/nosotros#ubicacion">Cómo llegar ↗</Link><Link href="/contacto">Contacto</Link></div>
  </div>
  <div className="container s6-footer-bottom">
   <span>© 2026 RINON · Tolipoli SpA · 77.795.508-K</span>
   <div><Link href="/politica-de-privacidad">Privacidad</Link><Link href="/politica-de-cookies">Cookies</Link><Link href="/solicitud-de-datos">Solicitar datos</Link></div>
   <span>Fabricación metálica · San Bernardo</span>
  </div>
 </footer>
}
