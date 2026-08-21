import Link from "next/link";
import {routeMetadata} from "@/lib/seo";
import {WhatsAppCTA} from "@/components/WhatsAppCTA";
import {buildCommercialServiceJsonLd,type CommercialFaq} from "@/lib/commercial-jsonld";

const description="Proyectos y fabricación metálica a medida desde foto, plano, croquis, muestra o medidas con RINON en San Bernardo.";
export const metadata=routeMetadata("/fabricacion-metalica","Fabricación metálica a medida en San Bernardo",description);

const starts=[
 ["Foto o referencia","Muéstranos algo parecido a lo que necesitas."],
 ["Plano o croquis","Puede ser técnico o simplemente un dibujo con medidas."],
 ["Muestra o pieza","Útil cuando necesitas replicar, adaptar o reparar."],
 ["Medidas y problema","Si no tienes nada más, explica qué debe resolver."],
] as const;

const projectTypes=[
 ["Estructuras","Cobertizos, pérgolas, escaleras, plataformas, soportes y otros conjuntos fabricables."],
 ["Piezas y soportes","Bases, marcos, bastidores y componentes para una función específica."],
 ["Equipamiento","Racks, mobiliario, protecciones y soluciones para espacios de trabajo."],
 ["Series y lotes","Piezas o conjuntos repetibles cuando cantidad y geometría están definidas."],
] as const;

const faqs:readonly CommercialFaq[]=[
 {q:"¿Necesito un plano técnico para cotizar fabricación metálica?",a:"No necesariamente. Puedes comenzar con una foto, croquis, muestra, medidas o una explicación de lo que necesitas resolver. Si hace falta información adicional para fabricar, se define antes de confirmar el alcance."},
 {q:"¿Qué materiales pueden evaluar?",a:"RINON puede evaluar trabajos en acero estructural, acero inoxidable y aluminio estructural según el requerimiento, geometría y proceso necesario. El material definitivo se confirma en la propuesta."},
 {q:"¿La instalación está incluida en todos los proyectos?",a:"No. La instalación o montaje se evalúa cuando corresponde al proyecto y se incluye solo si queda expresamente incorporada en la cotización vigente."},
];
const jsonLd=buildCommercialServiceJsonLd({path:"/fabricacion-metalica",name:"Fabricación metálica a medida en San Bernardo",description,faqs});

export default function Page(){return <main className="v5-editorial-page rinon-custom-projects" data-sgeo-owner="fabricacion-metalica">
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/>
 <section className="v2-solution-hero rinon-custom-hero"><div className="container rinon-custom-hero-grid"><div><div className="v2-eyebrow">PROYECTOS A MEDIDA · SAN BERNARDO</div><h1>Tu proyecto en metal, hecho a medida.</h1><p>No necesitas llegar con todo resuelto. Una foto, plano, croquis, muestra o algunas medidas pueden ser suficientes para empezar.</p><div className="v2-actions"><Link className="v2-btn orange" data-event="quote_start" data-cta-location="custom_project_hero" href="/cotizar?category=fabricacion">Cotizar proyecto</Link><WhatsAppCTA category="fabricacion" location="custom_project_hero" label="Enviar referencia por WhatsApp" className="v2-btn outline"/></div></div><aside className="rinon-custom-start"><span>PUEDES PARTIR CON</span>{starts.map(([title,body],index)=><div key={title}><b>0{index+1}</b><strong>{title}</strong><p>{body}</p></div>)}</aside></div></section>

 <section className="v2-solution-section"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">QUÉ PODEMOS EVALUAR</div><h2>Primero entendemos qué necesitas resolver.</h2></div><p>La categoría importa menos que el uso, las medidas, la cantidad y los antecedentes disponibles. Con eso definimos si el trabajo está dentro de nuestras capacidades y qué falta confirmar.</p></div><div className="card-grid">{projectTypes.map(([title,body],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>

 <section className="v2-solution-section soft"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">CÓMO AVANZA</div><h2>De una idea a algo fabricable.</h2></div><p>Separar lo que ya está definido de lo que todavía necesita revisión evita fabricar sobre supuestos.</p></div><div className="v2-step-grid"><article><span>01 · CUÉNTANOS</span><h3>Qué necesitas</h3><p>Uso, referencia, medidas, cantidad y ubicación.</p></article><article><span>02 · DEFINIMOS</span><h3>Qué falta confirmar</h3><p>Material, geometría, terminación, montaje u otros datos necesarios.</p></article><article><span>03 · COTIZAMOS</span><h3>Alcance claro</h3><p>La propuesta separa lo incluido de lo que queda fuera.</p></article><article><span>04 · FABRICAMOS</span><h3>Con el alcance acordado</h3><p>Producción, terminación y entrega según el trabajo confirmado.</p></article></div></div></section>

 <section id="faq" className="v2-solution-section"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">PREGUNTAS FRECUENTES</div><h2>Qué necesitas tener claro para empezar.</h2></div><p>La web orienta la conversación. Materiales, dimensiones, procesos e instalación se confirman únicamente después de revisar el requerimiento.</p></div><div className="faq-grid">{faqs.map(faq=><details key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}</div></div></section>

 <section className="v2-final-cta"><div className="container"><div><div className="v2-eyebrow">PROYECTOS A MEDIDA</div><h2>¿Tienes una foto, plano o idea?</h2><p>Envíala junto con medidas aproximadas, cantidad y ubicación. Si falta algo importante, te indicaremos qué necesitamos para evaluar.</p></div><div className="v2-final-actions"><Link className="v2-btn orange" data-event="quote_start" data-cta-location="custom_project_footer" href="/cotizar?category=fabricacion">Cotizar proyecto</Link><WhatsAppCTA category="fabricacion" location="custom_project_footer" label="WhatsApp" className="v2-btn outline"/></div></div></section>
 </main>}
