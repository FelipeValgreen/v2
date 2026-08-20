import Link from "next/link";
import { routeMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { TechnicalVisual } from "@/components/TechnicalVisual";

const faqs=[
  {q:"¿Fabrican a medida?",a:"Sí se evalúan trabajos a medida cuando están dentro de la capacidad de fabricación. Puedes partir por plano, croquis, foto, muestra o medidas."},
  {q:"¿Puedo enviar un plano o foto?",a:"Sí. Son antecedentes muy útiles para entender dimensiones, geometría y contexto del trabajo."},
  {q:"¿Atienden empresas y particulares?",a:"Sí. Para compras por volumen o proyectos de empresa conviene indicar cantidad, destino y fecha objetivo desde el inicio."},
  {q:"¿Puedo cotizar sin conocer el nombre técnico?",a:"Sí. Describe qué necesitas resolver, dónde se usa y qué medidas o referencias tienes."},
  {q:"¿Hacen instalación?",a:"Se evalúa según tipo de proyecto y ubicación. Indica la comuna o región para revisar el alcance correctamente."},
  {q:"¿Cuánto demora una cotización?",a:"Depende de la información y complejidad del requerimiento. Un plano, fotos, medidas y cantidad reducen preguntas adicionales antes de cotizar."},
  {q:"¿Puedo comprar por volumen?",a:"Sí. Para una compra por volumen indica cantidad, referencia, destino y fecha objetivo. Eso permite revisar fabricación y logística desde el inicio."},
  {q:"¿Los precios son estándar?",a:"No se publica un precio universal cuando el alcance depende de medidas, cantidad, material, terminación, despacho o instalación. La cotización define qué está incluido para el requerimiento evaluado."},
];
export const metadata=routeMetadata("/preguntas-frecuentes", "Preguntas frecuentes", "Preguntas frecuentes sobre fabricación a medida, cotizaciones, planos, cantidades, despacho e instalación con RINON.");
export default function Page(){return <main><JsonLd data={{"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(item=>({"@type":"Question",name:item.q,acceptedAnswer:{"@type":"Answer",text:item.a}}))}}/>
<section className="v2-solution-hero"><div className="container v2-solution-hero-grid"><div><div className="v2-eyebrow">PREGUNTAS FRECUENTES</div><h1>Preguntas frecuentes.</h1><p>Si tu consulta es específica sobre camarotes, cierres, estructuras o fabricación a medida, cada solución incluye además sus propias preguntas técnicas.</p><div className="v2-actions"><Link className="v2-btn orange" href="/cotizar">Cotizar proyecto</Link><Link className="v2-btn outline" href="/contacto">Contacto</Link></div></div><TechnicalVisual kind="fabrication" label="Pregunta primero. Define después." detail="Uso · medidas · cantidad · ubicación · alcance" /></div></section>
<section className="v2-solution-section soft"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">RESPUESTAS RÁPIDAS</div><h2>Menos supuestos antes de cotizar.</h2></div><p>Si una condición es crítica para tu proyecto, debe quedar confirmada expresamente en la cotización aplicable.</p></div><div className="faq-grid v2-faq-wide">{faqs.map(item=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></div></section>
<section className="v2-final-cta"><div className="container"><div><div className="v2-eyebrow">¿NO ESTÁ TU PREGUNTA?</div><h2>Muéstranos el requerimiento.</h2><p>No necesitas conocer el nombre técnico exacto. Una fotografía, croquis o medida puede bastar para iniciar.</p></div><Link className="v2-btn orange" href="/cotizar">Enviar antecedentes</Link></div></section>
</main>}
