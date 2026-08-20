import Link from "next/link";
import {routeMetadata} from "@/lib/seo";
import {publicAddressDisplay,publicPhoneDisplay,publicPhoneHref} from "@/lib/contact";
import {whatsappUrl} from "@/lib/whatsapp";
import {TechnicalVisual} from "@/components/TechnicalVisual";
import {MapPanel} from "@/components/MapPanel";

export const metadata=routeMetadata("/contacto","Contacto y cotizaciones","Contacta a RINON para evaluar fabricación metálica, estructuras, cierres, camarotes, mobiliario y proyectos a medida desde San Bernardo.");

export default function Page(){
 const whatsapp=whatsappUrl(); const phone=publicPhoneHref();
 return <main className="v5-editorial-page rinon-contact">
  <section className="v2-solution-hero"><div className="container v2-solution-hero-grid"><div><div className="v2-eyebrow">CONTACTO · SAN BERNARDO</div><h1>Cuéntanos qué necesitas fabricar.</h1><p>Si tienes una foto, plano, croquis, cantidad o medidas aproximadas, envíalas. Si todavía estás definiendo el proyecto, parte por lo que ya sabes.</p><div className="v2-actions"><Link className="v2-btn orange" data-event="quote_start" data-cta-location="contact_hero" href="/cotizar">Cotizar proyecto</Link>{whatsapp?<a className="v2-btn outline" data-event="contact_whatsapp" data-cta-location="contact_hero" href={whatsapp} target="_blank" rel="noopener noreferrer">Hablar por WhatsApp</a>:null}</div><div className="v2-kickers"><span>Particulares</span><span>Empresas</span><span>Unidad o volumen</span><span>{publicAddressDisplay()}</span></div></div><TechnicalVisual kind="fabrication" label="Un requerimiento claro acelera la evaluación." detail="Foto · plano · cantidad · ubicación"/></div></section>

  <section className="v2-solution-section soft"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">ELIGE EL CAMINO</div><h2>Tres formas de empezar.</h2></div><p>La cotización guiada es el camino principal. WhatsApp sirve cuando primero necesitas confirmar si el requerimiento se puede evaluar.</p></div><div className="v2-contact-paths rinon-contact-paths"><Link href="/cotizar"><span>01 · COTIZAR</span><h3>Tengo una idea, producto, foto o medidas.</h3><p>Ordena la información y envía el requerimiento con el contexto necesario.</p><b>Iniciar cotización →</b></Link>{whatsapp?<a href={whatsapp} target="_blank" rel="noopener noreferrer" data-event="contact_whatsapp" data-cta-location="contact_paths"><span>02 · WHATSAPP</span><h3>Necesito conversar antes de cotizar.</h3><p>Úsalo para aclarar rápidamente si RINON puede evaluar el trabajo.</p><b>Abrir WhatsApp →</b></a>:null}<Link href="/cotizar?client=b2b"><span>03 · EMPRESAS</span><h3>Necesito volumen o fabricación bajo requerimiento.</h3><p>Parte con cantidad, destino, fecha objetivo y modalidad de compra.</p><b>Cotizar para empresa →</b></Link></div></div></section>

  <section className="v2-solution-section"><div className="container"><div className="rinon-contact-direct"><div><span>WHATSAPP</span><strong>{publicPhoneDisplay()}</strong>{whatsapp?<a href={whatsapp} target="_blank" rel="noopener noreferrer" data-event="contact_whatsapp" data-cta-location="contact_direct">Escribir ahora ↗</a>:null}</div><div><span>TELÉFONO</span><strong>{publicPhoneDisplay()}</strong>{phone?<a href={phone} data-event="contact_phone" data-cta-location="contact_direct">Llamar ↗</a>:null}</div><div><span>TALLER</span><strong>San Bernardo</strong><p>{publicAddressDisplay()}<br/>Región Metropolitana</p></div></div></div></section>

  <div className="container rinon-map-wrap"><MapPanel compact/></div>

  <section className="v2-solution-section soft"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">PARA AVANZAR MÁS RÁPIDO</div><h2>Cuatro antecedentes que ayudan.</h2></div><p>No todos aplican a todos los trabajos. Envía lo que tengas y completa el resto durante la evaluación.</p></div><div className="card-grid"><article><span>01</span><h3>Qué necesitas</h3><p>Producto, estructura, cierre, reparación o descripción del problema.</p></article><article><span>02</span><h3>Referencia</h3><p>Plano, foto, croquis, muestra o dimensiones aproximadas.</p></article><article><span>03</span><h3>Cantidad</h3><p>Una unidad, un lote o un volumen estimado.</p></article><article><span>04</span><h3>Ubicación</h3><p>Comuna o región para evaluar logística e instalación cuando corresponda.</p></article></div></div></section>
 </main>
}
