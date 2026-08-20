import Link from "next/link";
import { routeMetadata, solutionJsonLd } from "@/lib/seo";
import { VisualEvidence } from "@/components/VisualEvidence";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { JsonLd } from "@/components/JsonLd";
import { ProductReferenceGallery } from "@/components/ProductReferenceGallery";
import { RequirementFlowSimple } from "@/components/RequirementFlow";
import { SolutionFeatureBand } from "@/components/SolutionFeatureBand";
import { SolutionCrossNav } from "@/components/SolutionCrossNav";
import { ScopeFitBand } from "@/components/ScopeFitBand";
import { SolutionLocalNav } from "@/components/SolutionLocalNav";
import { SolutionStoryScene } from "@/components/SolutionStoryScene";
import { getReferencePhotos } from "@/lib/visuals";
export const metadata=routeMetadata("/camarote-con-escritorio", "Camarote metálico con escritorio", "Camarote metálico con escritorio integrado para aprovechar el espacio vertical. Consulta configuración y cotización con RINON.");
const faqs=[
  {q:"¿Qué medidas tiene el camarote con escritorio?",a:"Las dimensiones y elementos incluidos deben confirmarse para la configuración vigente que se esté cotizando; no se trasladan medidas de modelos antiguos sin validación."},
  {q:"¿Se puede pedir por volumen?",a:"Sí, se pueden evaluar pedidos por volumen indicando cantidad, destino y fecha objetivo."},
  {q:"¿Puedo enviar las medidas de mi pieza?",a:"Sí. Ancho, largo y altura disponible ayudan a revisar si la configuración es adecuada antes de avanzar."},
];
export default function Page(){const hasReferences=getReferencePhotos("/camarote-con-escritorio").length>0;return <main className="v5-editorial-page theme-product"><JsonLd data={solutionJsonLd({pathname:"/camarote-con-escritorio",name:"Camarote metálico con escritorio",description:"Camarote metálico con escritorio integrado para aprovechar el espacio vertical.",faqs})}/>
<section id="resumen" className="v2-solution-hero"><div className="container v2-solution-hero-grid"><div><div className="v2-eyebrow">CAMAROTE CON ESCRITORIO</div><h1>Camarote metálico con escritorio.</h1><p>Dormir arriba y trabajar abajo solo funciona cuando altura, escritorio, escalera y circulación se piensan como un sistema de espacio.</p><div className="v2-actions"><Link className="v2-btn orange" data-event="quote_start" data-cta-location="hero" href="/cotizar?category=camarotes&detail=camarote_escritorio">Cotizar modelo</Link><Link className="v2-btn outline" href="/camarotes">Ver camarotes</Link><WhatsAppCTA category="camarotes" location="hero" label="WhatsApp" className="v2-btn outline" /></div><div className="solution-meta-line"><span>Espacio disponible</span><span>Zona de trabajo</span><span>Cantidad y destino</span></div></div><VisualEvidence slug="/camarote-con-escritorio" fallback={["vista completa","escritorio","escalera y barandas","terminación"]}/></div></section>
<SolutionLocalNav quoteHref="/cotizar?category=camarotes&detail=camarote_escritorio" />
<SolutionCrossNav slug="/camarote-con-escritorio" />
<RequirementFlowSimple entry="Medidas del espacio · cantidad · destino" review="Configuración · circulación · elementos incluidos · entrega" />
<SolutionStoryScene slug="/camarote-con-escritorio" />
<SolutionFeatureBand slug="/camarote-con-escritorio" />
<ScopeFitBand slug="/camarote-con-escritorio" />
{hasReferences?<section className="v2-product-proof"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">REFERENCIAS DE PRODUCTO</div><h2>Primero mira la configuración. Después confirma el alcance.</h2></div><p>Estas imágenes sirven como referencia actual de producto. Medidas, accesorios y condiciones se vuelven a confirmar en cada cotización.</p></div><ProductReferenceGallery slug="/camarote-con-escritorio" /></div></section>:null}
<section id="alcance" className="v2-solution-section"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">QUÉ REVISAR</div><h2>La configuración completa importa más que el nombre del modelo.</h2></div><p>Medidas, estructura, escritorio y circulación deben confirmarse para el espacio donde se utilizará.</p></div><div className="card-grid"><article><span>01</span><h3>Espacio disponible</h3><p>Mide ancho, largo y altura del dormitorio.</p></article><article><span>02</span><h3>Zona de escritorio</h3><p>Define si se usará para estudio, computador, teletrabajo u otro uso.</p></article><article><span>03</span><h3>Acceso a la cama</h3><p>Revisa escalera, circulación y relación con muros, puertas y ventanas.</p></article><article><span>04</span><h3>Configuración vigente</h3><p>Antes de comprar se confirman dimensiones, terminación y elementos incluidos.</p></article></div></div></section>
<section id="faq" className="v2-solution-section soft"><div className="container"><div className="v2-eyebrow">PREGUNTAS FRECUENTES</div><h2>Antes de elegir configuración.</h2><div className="faq-grid">{faqs.map(item=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></div></section>
<section id="cotizar" className="v2-final-cta"><div className="container"><div><div className="v2-eyebrow">PARA COTIZAR</div><h2>Indica espacio, cantidad y comuna de destino.</h2><p>Si tienes una fotografía del dormitorio o medidas aproximadas, también sirven para partir.</p></div><div className="v2-final-actions"><Link className="v2-btn orange" href="/cotizar?category=camarotes&detail=camarote_escritorio">Cotizar camarote</Link><WhatsAppCTA category="camarotes" location="product_footer" label="Consultar por WhatsApp" className="v2-btn outline" /></div></div></section>
</main>}
