import Link from "next/link";
import { routeMetadata, solutionJsonLd } from "@/lib/seo";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { JsonLd } from "@/components/JsonLd";
import { TechnicalVisual } from "@/components/TechnicalVisual";
import { RequirementFlowSimple } from "@/components/RequirementFlow";
import { SolutionFeatureBand } from "@/components/SolutionFeatureBand";
import { SolutionCrossNav } from "@/components/SolutionCrossNav";
import { ScopeFitBand } from "@/components/ScopeFitBand";
import { SolutionLocalNav } from "@/components/SolutionLocalNav";
import { SolutionStoryScene } from "@/components/SolutionStoryScene";
export const metadata=routeMetadata("/portones-metalicos", "Portones metálicos a medida", "Portones metálicos fabricados según vano, tipo de apertura, uso y terminación.");
const faqs=[
  {q:"¿Qué medidas necesitan para cotizar un portón?",a:"Ancho y alto aproximados del vano, fotos del acceso y el espacio disponible para apertura permiten una primera evaluación."},
  {q:"¿Fabrican portones corredizos y batientes?",a:"Ambas configuraciones pueden evaluarse según el espacio, apoyos y condiciones del acceso."},
  {q:"¿Incluyen automatización?",a:"La automatización no se asume. Si la necesitas debe indicarse expresamente y solo se incorpora cuando ese alcance esté confirmado."},
];
export default function Page(){return <main className="v5-editorial-page theme-perimeter"><JsonLd data={solutionJsonLd({pathname:"/portones-metalicos",name:"Portones metálicos a medida",description:"Portones metálicos fabricados según vano, tipo de apertura, uso y terminación.",faqs})}/>
<section id="resumen" className="v2-solution-hero"><div className="container v2-solution-hero-grid"><div><div className="v2-eyebrow">PORTONES METÁLICOS</div><h1>Portones metálicos a medida.</h1><p>El vano es solo el inicio. Recorrido, tipo de apertura, apoyos y uso diario definen si una solución funciona realmente en el acceso.</p><div className="v2-actions"><Link className="v2-btn orange" data-event="quote_start" data-cta-location="hero" href="/cotizar?category=cierres&detail=porton">Cotizar portón</Link><WhatsAppCTA category="cierres" location="hero" label="WhatsApp" className="v2-btn outline" /></div><div className="solution-meta-line"><span>Ancho y alto</span><span>Espacio de apertura</span><span>Uso del acceso</span></div></div><TechnicalVisual kind="gate" label="Mide el vano y envía una foto." detail="Apertura · apoyos · uso · terminación" /></div></section>
<SolutionLocalNav quoteHref="/cotizar?category=cierres&detail=porton" />
<SolutionCrossNav slug="/portones-metalicos" />
<RequirementFlowSimple entry="Ancho y alto del vano · fotografías · uso esperado" review="Tipo de apertura · recorrido · apoyos · terminación" />
<SolutionStoryScene slug="/portones-metalicos" />
<SolutionFeatureBand slug="/portones-metalicos" />
<ScopeFitBand slug="/portones-metalicos" />
<section id="alcance" className="v2-solution-section soft"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">TIPO DE APERTURA</div><h2>Corredizo o batiente depende del espacio disponible.</h2></div><p>La elección se revisa contra el vano, el recorrido disponible, los apoyos y la forma en que se utilizará el acceso.</p></div><div className="card-grid"><article><span>01</span><h3>Corredizo</h3><p>Requiere recorrido lateral suficiente y condiciones adecuadas para desplazar la hoja.</p></article><article><span>02</span><h3>Batiente</h3><p>Necesita espacio de giro y apoyos compatibles con el tamaño de las hojas.</p></article><article><span>03</span><h3>Peatonal</h3><p>Puede evaluarse un acceso peatonal integrado o relacionado con el cierre.</p></article><article><span>04</span><h3>Terminación</h3><p>Se define según material, entorno y alcance confirmado.</p></article></div></div></section>
<section id="faq" className="v2-solution-section"><div className="container"><div className="v2-eyebrow">PREGUNTAS FRECUENTES</div><h2>Lo que conviene definir antes de fabricar.</h2><div className="faq-grid">{faqs.map(item=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></div></section>
<section id="cotizar" className="v2-final-cta"><div className="container"><div><div className="v2-eyebrow">ALCANCE</div><h2>Automatización solo si forma parte del requerimiento confirmado.</h2><p>No asumimos un sistema automático por el solo hecho de fabricar el portón.</p></div><Link className="v2-btn orange" href="/cotizar?category=cierres&detail=porton">Enviar medidas y fotos</Link></div></section>
</main>}
