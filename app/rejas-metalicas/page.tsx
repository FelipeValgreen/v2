import Link from "next/link";
import { routeMetadata, solutionJsonLd } from "@/lib/seo";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { JsonLd } from "@/components/JsonLd";
import { CommercialEvidencePanel } from "@/components/CommercialEvidencePanel";
import { RequirementFlowSimple } from "@/components/RequirementFlow";
import { SolutionFeatureBand } from "@/components/SolutionFeatureBand";
import { SolutionCrossNav } from "@/components/SolutionCrossNav";
import { ScopeFitBand } from "@/components/ScopeFitBand";
import { SolutionLocalNav } from "@/components/SolutionLocalNav";
import { SolutionStoryScene } from "@/components/SolutionStoryScene";
export const metadata=routeMetadata("/rejas-metalicas", "Rejas metálicas a medida", "Fabricación de rejas metálicas según medidas, uso, acceso y terminación en Santiago.");
const faqs=[
  {q:"¿Qué necesitan para cotizar una reja?",a:"Medidas aproximadas, una fotografía del lugar, ubicación y una descripción del uso permiten iniciar la evaluación."},
  {q:"¿Pueden integrar un portón?",a:"Puede evaluarse como parte del conjunto cuando el vano, apertura y alcance del proyecto estén definidos."},
  {q:"¿La instalación está incluida?",a:"No se asume por defecto. Se revisa según ubicación, tipo de anclaje y condiciones del lugar."},
];
const heroEvidence=[
 {label:"MEDIDAS",body:"Ancho, alto y longitud aproximados permiten dimensionar la primera revisión."},
 {label:"FOTO DEL LUGAR",body:"Una vista general y los puntos de apoyo muestran condiciones que una cifra no explica."},
 {label:"USO",body:"Frontis, perímetro, vano o protección cambian la forma de plantear la solución."},
 {label:"ACCESOS",body:"Puertas y portones deben considerarse junto con los tramos de reja cuando correspondan."},
] as const;
export default function Page(){return <main className="v5-editorial-page theme-perimeter"><JsonLd data={solutionJsonLd({pathname:"/rejas-metalicas",name:"Rejas metálicas a medida",description:"Fabricación de rejas metálicas según medidas, uso, acceso y terminación.",faqs})}/>
<section id="resumen" className="rinon-commercial-hero"><div className="container rinon-commercial-hero-grid"><div><div className="v2-eyebrow">REJAS METÁLICAS</div><h1>Rejas metálicas a medida.</h1><p>Protección, acceso y lenguaje del lugar deben resolverse juntos. Una fotografía y medidas aproximadas suelen ser suficientes para iniciar la evaluación.</p><div className="v2-actions"><Link className="v2-btn orange" data-event="quote_start" data-cta-location="hero" href="/cotizar?category=cierres&detail=reja">Cotizar reja</Link><WhatsAppCTA category="cierres" location="hero" label="WhatsApp" className="v2-btn outline" /></div><div className="solution-meta-line"><span>Medidas aproximadas</span><span>Foto del lugar</span><span>Ubicación</span></div></div><CommercialEvidencePanel title="PARA UNA PRIMERA REVISIÓN" items={heroEvidence} note="Perfiles, separación, anclajes, terminación e instalación se confirman en la cotización aplicable al proyecto."/></div></section>
<SolutionLocalNav quoteHref="/cotizar?category=cierres&detail=reja" />
<SolutionCrossNav slug="/rejas-metalicas" />
<RequirementFlowSimple entry="Medidas aproximadas · foto del lugar · ubicación" review="Uso · puntos de apoyo · accesos · terminación" />
<SolutionStoryScene slug="/rejas-metalicas" />
<SolutionFeatureBand slug="/rejas-metalicas" />
<ScopeFitBand slug="/rejas-metalicas" />
<section id="alcance" className="v2-solution-section"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">CONFIGURACIÓN</div><h2>La reja se define alrededor del espacio y el uso.</h2></div><p>Perfiles, separación, anclajes y terminación deben corresponder al proyecto; no se asume una solución universal.</p></div><div className="card-grid"><article><span>01</span><h3>Frontis</h3><p>Delimitar el frente e integrar accesos cuando corresponda.</p></article><article><span>02</span><h3>Perímetro</h3><p>Tramos y divisiones para terrenos, condominios, estacionamientos y recintos.</p></article><article><span>03</span><h3>Protecciones</h3><p>Soluciones para vanos y sectores que necesiten una barrera metálica a medida.</p></article><article><span>04</span><h3>Integración con portón</h3><p>El acceso puede revisarse junto con la reja para mantener continuidad de medidas.</p></article></div></div></section>
<section id="faq" className="v2-solution-section soft"><div className="container"><div className="v2-eyebrow">PREGUNTAS FRECUENTES</div><h2>Antes de definir la reja.</h2><div className="faq-grid">{faqs.map(item=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></div></section>
<section id="cotizar" className="v2-final-cta"><div className="container"><div><div className="v2-eyebrow">COTIZACIÓN</div><h2>Una buena foto evita muchas suposiciones.</h2><p>Si puedes, envía una vista general y otra de los puntos donde debería apoyar o anclarse la reja.</p></div><Link className="v2-btn orange" href="/cotizar?category=cierres&detail=reja">Enviar requerimiento</Link></div></section>
</main>}
