import Link from "next/link";
import type { Solution } from "@/lib/site";
import { VisualEvidence } from "@/components/VisualEvidence";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { JsonLd } from "@/components/JsonLd";
import { solutionJsonLd } from "@/lib/seo";
import { getSolutionReleaseNotice, isSolutionLaunchEnabled } from "@/lib/capabilities";
import { CommercialEvidencePanel } from "@/components/CommercialEvidencePanel";
import { getVisuals, getReferencePhotos } from "@/lib/visuals";
import { ProductReferenceGallery } from "@/components/ProductReferenceGallery";
import { RequirementFlow } from "@/components/RequirementFlow";
import { SolutionFeatureBand } from "@/components/SolutionFeatureBand";
import { ScopeFitBand } from "@/components/ScopeFitBand";
import { XRayMetal } from "@/components/XRayMetal";
import { SolutionLocalNav } from "@/components/SolutionLocalNav";
import { SolutionStoryScene } from "@/components/SolutionStoryScene";

export function SolutionPage({ solution }: { solution: Solution }) {
  const releaseNotice = getSolutionReleaseNotice(solution.slug);
  const launchEnabled = isSolutionLaunchEnabled(solution.slug);
  const quoteHref = launchEnabled ? `/cotizar?category=${solution.quoteCategory}` : "/contacto";
  const quoteLabel = launchEnabled ? "Cotizar requerimiento" : "Consultar disponibilidad";
  const visuals = getVisuals(solution.slug);
  const hasVisual = visuals.length > 0;
  const primaryVisualIsConceptual = visuals[0]?.provenance === "conceptual";
  const hasXRay = ["/camarotes","/cierres-perimetrales","/estructuras-metalicas"].includes(solution.slug);
  const visualTheme = solution.slug === "/camarotes" ? "theme-product"
    : solution.slug.includes("cierre") || solution.slug.includes("reja") || solution.slug.includes("porton") ? "theme-perimeter"
    : solution.slug.includes("estructura") ? "theme-geometry"
    : solution.slug.includes("fabricacion") || solution.slug.includes("especial") ? "theme-transform"
    : "theme-equipment";
  const fallbackEvidence=solution.bullets.slice(0,4).map(item=>({label:item.title.toUpperCase(),body:item.body}));
  return <main className={`prd2-solution-page ${visualTheme}`}>
    {launchEnabled?<JsonLd data={solutionJsonLd({ pathname: solution.slug, name: solution.label, description: solution.description, faqs: solution.faqs })} />:null}

    <section id="resumen" className="prd2-solution-hero" data-reveal>
      <div className="container prd2-solution-hero-grid">
        <div className="prd2-solution-copy">
          <div className="prd2-kicker">{solution.eyebrow}</div>
          {releaseNotice?<aside className="prd2-capability-notice"><b>{releaseNotice.label}</b><strong>{releaseNotice.title}</strong><span>{releaseNotice.body}</span></aside>:null}
          <h1>{solution.title}</h1>
          <p>{solution.intro}</p>
          <div className="prd2-solution-actions">
            <Link className="prd2-btn primary" data-event={launchEnabled?"quote_start":undefined} data-cta-location="hero" href={quoteHref}>{quoteLabel} <span>↗</span></Link>
            <a className="prd2-btn ghost" href="#alcance">Ver alcance <span>↓</span></a>
            {launchEnabled?<WhatsAppCTA category={solution.quoteCategory} location="hero" label="WhatsApp" className="prd2-btn ghost" />:null}
          </div>
          <div className="solution-meta-line" aria-label="Principios de evaluación"><span>Requerimiento primero</span><span>Cantidad y uso importan</span><span>Alcance antes de fabricar</span></div>
        </div>
        <div className={`prd2-solution-media ${hasVisual?"has-photo":"evidence-panel-only"}`}>
          {hasVisual?<VisualEvidence slug={solution.slug} fallback={solution.evidence}/>:<CommercialEvidencePanel title="QUÉ PODEMOS EVALUAR" items={fallbackEvidence} note="La configuración, capacidad, plazo y alcance final se confirman para cada cotización."/>}
          {hasVisual?<div className="prd2-solution-media-caption"><span>{primaryVisualIsConceptual?"VISUAL CONCEPTUAL":"REFERENCIA DE PRODUCTO"}</span><b>{primaryVisualIsConceptual?"Dirección de producto · no obra ejecutada":"Producto · detalle · contexto"}</b></div>:null}
        </div>
      </div>
    </section>

    <SolutionLocalNav hasXRay={hasXRay} quoteHref={quoteHref} />
    {solution.related?.length?<section className="prd2-category-nav"><div className="container"><span>EXPLORA ESTA CATEGORÍA</span><div>{solution.related.map(item=><Link key={item.href} href={item.href}><b>{item.label}</b><em>Ver solución ↗</em></Link>)}</div></div></section>:null}
    <RequirementFlow solution={solution} />
    <div id="xray">{solution.slug==="/camarotes"?<XRayMetal kind="product" image="/visuals/product-theatre/camarote-conceptual.webp" eyebrow="X-RAY METAL" title="Mira la estructura antes de elegir la configuración." description="El visual separa producto y lógica constructiva para conversar sobre configuración, uniones y puntos que deben confirmarse al cotizar." />:null}
    {solution.slug==="/cierres-perimetrales"?<XRayMetal kind="perimeter" image="/visuals/product-theatre/cierre-conceptual.webp" eyebrow="X-RAY METAL" title="El cierre se entiende mejor cuando se ve el sistema." description="Postes, paños, altura y modulación se leen como un conjunto. Las medidas reales se confirman con el requerimiento y el contexto de instalación." />:null}
    {solution.slug==="/estructuras-metalicas"?<XRayMetal kind="geometry" image="/visuals/product-theatre/estructura-conceptual.webp" eyebrow="X-RAY METAL" title="La geometría define la conversación técnica." description="Columnas, vigas, nodos y arriostramientos se muestran como lenguaje visual. No sustituye cálculo ni ingeniería: ayuda a ordenar el requerimiento." />:null}</div>

    <SolutionStoryScene slug={solution.slug} />
    {solution.slug==="/camarotes" && getReferencePhotos(solution.slug).length>1?<section className="prd2-product-reference"><div className="container"><div className="prd2-section-head"><div><span className="prd2-kicker dark">REFERENCIAS DE PRODUCTO</span><h2>Configuraciones reales para partir la conversación.</h2></div><p>Las imágenes muestran referencias actuales de producto. La cotización confirma configuración, cantidad, medidas y modalidad de entrega aplicables al pedido.</p></div><ProductReferenceGallery slug={solution.slug}/></div></section>:null}

    <section id="alcance" className="prd2-solution-content" data-reveal><div className="container"><div className="prd2-section-head"><div><span className="prd2-kicker dark">QUÉ PODEMOS EVALUAR</span><h2>Partimos por el requerimiento, no por una solución genérica.</h2></div><p>Cada trabajo se confirma después de revisar dimensiones, cantidad, uso y antecedentes disponibles.</p></div><div className="prd2-scope-grid">{solution.bullets.map((item,i)=><article key={item.title}><span>0{i+1}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></div></section>
    <SolutionFeatureBand slug={solution.slug} />
    <ScopeFitBand slug={solution.slug} />
    <section id="aplicaciones" className="prd2-solution-content muted"><div className="container"><div className="prd2-section-head"><div><span className="prd2-kicker dark">DÓNDE SE UTILIZA</span><h2>El contexto cambia la forma de cotizar.</h2></div><p>El uso ayuda a definir cantidad, configuración, logística, montaje y nivel de detalle necesario para evaluar el trabajo.</p></div><div className="prd2-application-grid">{solution.applications.map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span><b>{x}</b><small>evaluación según requerimiento</small></div>)}</div></div></section>
    <section className="prd2-solution-evidence" data-reveal><div className="container prd2-solution-split"><div><span className="prd2-kicker">EVIDENCIA QUE IMPORTA</span><h2>Producto, proceso, detalle y contexto.</h2><p>La evidencia debe ayudar a entender el alcance. Una imagen conceptual nunca se presentará como un proyecto ejecutado.</p></div><ul>{solution.evidence.map((x,i)=><li key={x}><span>{String(i+1).padStart(2,"0")}</span><b>{x}</b></li>)}</ul></div></section>
    <section className="prd2-solution-content" data-reveal><div className="container prd2-solution-split"><div><span className="prd2-kicker dark">PARA COTIZAR</span><h2>Los antecedentes correctos reducen iteraciones.</h2><p>No necesitas tenerlos todos. Envía lo disponible y separamos lo confirmado de lo que todavía debe definirse.</p></div><ol className="prd2-quote-inputs">{solution.quoteInputs.map((item,i)=><li key={item}><span>{String(i+1).padStart(2,"0")}</span><b>{item}</b></li>)}</ol></div></section>
    <section id="faq" className="prd2-solution-faq" data-reveal><div className="container"><span className="prd2-kicker dark">PREGUNTAS FRECUENTES</span><h2>Antes de tomar una decisión.</h2><div className="prd2-faq-grid">{solution.faqs.map(item=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div>{solution.related?.length?<div className="prd2-related"><b>También puede servir:</b>{solution.related.map(item=><Link key={item.href} href={item.href}>{item.label} ↗</Link>)}</div>:null}</div></section>
    <section id="cotizar" className="prd2-final" data-reveal><div className="container"><div><span className="prd2-kicker">SIGUIENTE PASO</span><h2>{launchEnabled?"Cuéntanos qué necesitas fabricar.":"Consulta el estado de esta capacidad."}</h2><p>{launchEnabled?"Incluye cantidad, ubicación y el mejor antecedente disponible. Si faltan datos, pediremos solo los relevantes para evaluar.":"La ruta existe para revisión, pero el servicio no se publica como disponible hasta cerrar sus límites operativos."}</p></div><div className="prd2-final-actions"><Link className="prd2-btn primary" href={quoteHref}>{quoteLabel} ↗</Link>{launchEnabled?<WhatsAppCTA category={solution.quoteCategory} location="solution_footer" label="Hablar por WhatsApp" className="prd2-btn ghost" />:null}</div></div></section>
  </main>;
}
