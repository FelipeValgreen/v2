import Link from "next/link";
import {publicAddressDisplay,publicPhoneDisplay,publicPhoneHref} from "@/lib/contact";
import {whatsappUrl} from "@/lib/whatsapp";
import {footerProductItems,serviceNavItems,projectNavItem,aboutNavItem} from "@/lib/navigation";

export function SiteFooter(){
 const phoneHref=publicPhoneHref(); const whatsapp=whatsappUrl();
 return <footer className="s6-footer">
  <div className="container s6-footer-main s6-footer-main-v2">
   <div className="s6-footer-brand">
    <img src="/brand/rinon-lockup-horizontal-inverse.svg" alt="RINON Soluciones Metálicas" width="176" height="42"/>
    <p>Productos, proyectos a medida y servicios metálicos desde San Bernardo.</p>
    <Link className="s6-footer-quote" href="/cotizar" data-event="quote_start" data-cta-location="footer">Cotizar ↗</Link>
   </div>
   <nav className="s6-footer-column s6-footer-products" aria-label="Productos"><strong>Productos</strong>{footerProductItems.map(item=><Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
   <nav className="s6-footer-column" aria-label="Servicios"><strong>Servicios</strong>{serviceNavItems.map(item=><Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
   <div className="s6-footer-column s6-footer-contact"><strong>RINON</strong><Link href={projectNavItem.href}>{projectNavItem.label}</Link><Link href={aboutNavItem.href}>{aboutNavItem.label}</Link><Link href="/empresas">Empresas</Link><Link href="/proyectos">Proyectos</Link><Link href="/recursos">Guías y recursos</Link><Link href="/blog">Blog</Link>{whatsapp?<a href={whatsapp} target="_blank" rel="noopener noreferrer" data-event="contact_whatsapp" data-cta-location="footer">WhatsApp ↗</a>:null}{phoneHref?<a href={phoneHref} data-event="contact_phone" data-cta-location="footer">{publicPhoneDisplay()}</a>:null}<span>{publicAddressDisplay()}</span><Link href="/nosotros#ubicacion">Cómo llegar ↗</Link><Link href="/contacto">Contacto</Link></div>
  </div>
  <div className="container s6-footer-bottom">
   <span>© 2026 RINON · Tolipoli SpA · 77.795.508-K</span>
   <div><Link href="/politica-de-privacidad">Privacidad</Link><Link href="/politica-de-cookies">Cookies</Link><Link href="/solicitud-de-datos">Solicitar datos</Link></div>
   <span>San Bernardo · Región Metropolitana</span>
  </div>
 </footer>
}
