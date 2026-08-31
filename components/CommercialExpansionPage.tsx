import Link from "next/link";
import {notFound} from "next/navigation";
import {canonicalUrl,routeMetadata,SEO_BASE_URL} from "@/lib/seo";
import {getCommercialExpansion} from "@/lib/commercial-expansion";
import {getFabricationSpec} from "@/lib/fabrication-spec";
import {FabricationSpecPanel} from "@/components/FabricationSpec";
import {VisualEvidence} from "@/components/VisualEvidence";
import {hasPhotographicEvidence} from "@/lib/visuals";
import {WhatsAppCTA} from "@/components/WhatsAppCTA";

export function getCommercialExpansionMetadata(slug:string){const item=getCommercialExpansion(slug);return item?routeMetadata(item.slug,item.seoTitle,item.description):{}}

function commercialJsonLd(item:NonNullable<ReturnType<typeof getCommercialExpansion>>){
 const entity=item.kind==="product"?{
  "@context":"https://schema.org","@type":"Product","@id":`${canonicalUrl(item.slug)}#product`,name:item.label,description:item.description,url:canonicalUrl(item.slug),brand:{"@id":`${SEO_BASE_URL}/#organization`},manufacturer:{"@id":`${SEO_BASE_URL}/#organization`},category:item.label,
 }:{
  "@context":"https://schema.org","@type":"Service","@id":`${canonicalUrl(item.slug)}#service`,name:item.label,description:item.description,url:canonicalUrl(item.slug),provider:{"@id":`${SEO_BASE_URL}/#organization`},areaServed:{"@type":"AdministrativeArea",name:"Región Metropolitana de Santiago"},
 };
 return [entity,{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"RINON",item:SEO_BASE_URL},{"@type":"ListItem",position:2,name:item.label,item:canonicalUrl(item.slug)}]},{"@context":"https://schema.org","@type":"FAQPage",mainEntity:item.faqs.map(faq=>({"@type":"Question",name:faq.q,acceptedAnswer:{"@type":"Answer",text:faq.a}}))}];
}

export function CommercialExpansionPage({slug}:{slug:string}){
 const item=getCommercialExpansion(slug);if(!item)notFound();const jsonLd=commercialJsonLd(item);
 const fabricationSpec=getFabricationSpec(item.slug);
 const quoteHref=`/cotizar?category=${encodeURIComponent(item.quoteCategory)}&detail=${encodeURIComponent(item.slug.slice(1))}`;
 return <main className={`v5-editorial-page rinon-commercial-expansion ${item.kind==="product"?"theme-product":"theme-service"}`}>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/>
  <section className="v2-solution-hero rinon-commercial-hero"><div className="container rinon-commercial-hero-grid"><div><div className="v2-eyebrow">{item.eyebrow}</div><h1>{item.title}</h1><p>{item.intro}</p><div className="v2-actions"><Link className="v2-btn orange" data-event="quote_start" data-cta-location="commercial_expansion_hero" data-quote-category={item.quoteCategory} href={quoteHref}>Cotizar {item.kind==="service"?"servicio":"producto"}</Link><WhatsAppCTA category={item.quoteCategory} location="commercial_expansion_hero" label="Hablar por WhatsApp" className="v2-btn outline"/><Link className="v2-btn outline" href={item.parentHref}>{item.parentLabel}</Link></div><div className="v2-kickers"><span>San Bernardo</span><span>{item.kind==="product"?"Unidad o volumen":"Según alcance"}</span><span>Foto · medidas · referencia</span></div></div>{hasPhotographicEvidence(slug)?<VisualEvidence slug={slug} fallback={item.quoteInputs}/>:fabricationSpec?<FabricationSpecPanel spec={fabricationSpec}/>:<aside className="rinon-proof-panel rinon-commercial-context" aria-label={`Información para cotizar ${item.label}`}><span>{item.kind==="product"?"PARA ELEGIR BIEN":"PARA EVALUAR EL SERVICIO"}</span>{item.quoteInputs.map((input,index)=><div key={input}><b>0{index+1}</b><strong>{input}</strong><p>{index===0?"Es el mejor punto de partida para entender lo que necesitas.":"Inclúyelo si ya está definido; si falta, lo revisamos antes de cerrar alcance."}</p></div>)}<small>Las imágenes reales o conceptuales se incorporan solo cuando exista un activo aprobado para esta categoría.</small></aside>}</div></section>
  <section className="v2-solution-section"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">QUÉ PUEDES EVALUAR</div><h2>{item.kind==="product"?"Parte por el uso, las medidas y la cantidad.":"Parte por la pieza, el estado y lo que necesitas resolver."}</h2></div><p>{item.description}</p></div><div className="card-grid">{item.points.map((point,index)=><article key={point.title}><span>{String(index+1).padStart(2,"0")}</span><h3>{point.title}</h3><p>{point.body}</p></article>)}</div></div></section>
  <section className="v2-solution-section soft"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">PARA COTIZAR</div><h2>La información correcta evita supuestos.</h2></div><p>Envía lo que tengas. Si falta información relevante, te indicamos qué necesitamos antes de confirmar fabricación o servicio.</p></div><div className="v2-step-grid">{item.quoteInputs.map((input,index)=><article key={input}><span>{String(index+1).padStart(2,"0")}</span><h3>{input}</h3><p>Inclúyelo en el requerimiento si ya está definido.</p></article>)}</div></div></section>
  <section className="v2-solution-section"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">PREGUNTAS FRECUENTES</div><h2>Lo importante antes de decidir.</h2></div><p>Las medidas, materiales y elementos incluidos que cambian por proyecto se confirman en la cotización vigente.</p></div><div className="faq-grid">{item.faqs.map(faq=><details key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}</div></div></section>
  <section className="v2-final-cta"><div className="container"><div><div className="v2-eyebrow">SIGUIENTE PASO</div><h2>¿Quieres que evaluemos lo que necesitas?</h2><p>Comparte cantidad, ubicación y el mejor antecedente disponible.</p></div><div className="v2-actions"><Link className="v2-btn orange" data-event="quote_start" data-cta-location="commercial_expansion_footer" data-quote-category={item.quoteCategory} href={quoteHref}>Cotizar ahora</Link><WhatsAppCTA category={item.quoteCategory} location="commercial_expansion_footer" label="Hablar por WhatsApp" className="v2-btn outline"/></div></div></section>
 </main>
}
