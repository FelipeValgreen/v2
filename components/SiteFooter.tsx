import Image from "next/image";
import Link from "next/link";
import { publicAddressDisplay, publicPhoneDisplay, publicPhoneHref } from "@/lib/contact";
import { whatsappUrl } from "@/lib/whatsapp";

export function SiteFooter(){
  const phoneHref=publicPhoneHref();
  const whatsapp=whatsappUrl();
  return <footer className="s6-footer">
    <div className="container s6-footer-main">
      <div className="s6-footer-brand">
        <Image src="/brand/logo-rinon-horizontal-white.png" alt="RINON Soluciones Metálicas" width={220} height={60}/>
        <p>Fabricación metálica para productos, proyectos y soluciones a medida.</p>
      </div>
      <nav className="s6-footer-nav" aria-label="Footer">
        <Link href="/#soluciones">Soluciones</Link>
        <Link href="/fabricacion-metalica">Fabricación</Link>
        <Link href="/empresas">Empresas</Link>
        <Link href="/proyectos">Proyectos</Link>
        <Link href="/contacto">Contacto</Link>
      </nav>
      <div className="s6-footer-contact">
        {whatsapp?<a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>:null}
        {phoneHref?<a href={phoneHref}>{publicPhoneDisplay()}</a>:null}
        <span>{publicAddressDisplay()}</span>
      </div>
    </div>
    <div className="container s6-footer-bottom">
      <span>© 2026 RINON · Tolipoli SpA · 77.795.508-K</span>
      <div><Link href="/politica-de-privacidad">Privacidad</Link><Link href="/politica-de-cookies">Cookies</Link><Link href="/solicitud-de-datos">Solicitar datos</Link></div>
      <span>Soluciones metálicas · San Bernardo</span>
    </div>
  </footer>;
}
