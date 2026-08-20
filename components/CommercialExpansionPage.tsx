import Link from "next/link";
import {notFound} from "next/navigation";
import {canonicalUrl,routeMetadata,SEO_BASE_URL} from "@/lib/seo";
import {getCommercialExpansion} from "@/lib/commercial-expansion";
import {TechnicalVisual} from "@/components/TechnicalVisual";

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
 return <main className="v5-editorial-page theme-product">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/>
  <section className="v2-solution-hero"><div className="container v2-solution-hero-grid"><div><div className="v2-eyebrow">{item.eyebrow}</div><h1>{item.title}</h1><p>{item.intro}</p><div className="v2-actions"><Link className="v2-btn orange" data-event="quote_start" data-cta-location="commercial_expansion_hero" data-quote-category={item.quoteCategory} href={`/cotizar?category=${encodeURIComponent(item.quoteCategory)}&detail=${encodeURIComponent(item.slug.slice(1))}`}>Cotizar {item.kind==="service"?"servicio":"producto"}</Link><Link className="v2-btn outline" href={item.parentHref}>{item.parentLabel}</Link></div><div className="v2-kickers"><span>Fabricación directa</span><span>San Bernardo</span><span>Unidad o volumen</span></div></div><TechnicalVisual kind={item.kind==="service"?"fabrication":"equipment"} label={item.label} detail="Medidas · cantidad · uso · ubicación"/></div></section>
  <section className="v2-solution-section"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">QUÉ PUEDES EVALUAR</div><h2>Parte por la función y el contexto.</h2></div><p>{item.description}</p></div><div className="card-grid">{item.points.map((point,index)=><article key={point.title}><span>{String(index+1).padStart(2,"0")}</span><h3>{point.title}</h3><p>{point.body}</p></article>)}</div></div></section>
  <section className="v2-solution-section soft"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">PARA COTIZAR</div><h2>Cuatro antecedentes reducen supuestos.</h2></div><p>Envía lo que tengas. Si falta información relevante, se solicita antes de cerrar fabricación o alcance.</p></div><div className="v2-step-grid">{item.quoteInputs.map((input,index)=><article key={input}><span>{String(index+1).padStart(2,"0")}</span><h3>{input}</h3><p>Inclúyelo en el requerimiento si ya está definido.</p></article>)}</div></div></section>
  <section className="v2-solution-section"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">PREGUNTAS FRECUENTES</div><h2>Lo importante antes de decidir.</h2></div><p>Las medidas, materiales y elementos incluidos que cambian por proyecto se confirman en la cotización vigente.</p></div><div className="faq-grid">{item.faqs.map(faq=><details key={faq.q}><summary>{faq.q}</summary><p>{faq.a}</p></details>)}</div></div></section>
  <section className="v2-final-cta"><div className="container"><div><div className="v2-eyebrow">SIGUIENTE PASO</div><h2>¿Quieres que evaluemos tu requerimiento?</h2><p>Comparte cantidad, ubicación y el mejor antecedente disponible.</p></div><Link className="v2-btn orange" data-event="quote_start" data-cta-location="commercial_expansion_footer" href={`/cotizar?category=${encodeURIComponent(item.quoteCategory)}&detail=${encodeURIComponent(item.slug.slice(1))}`}>Cotizar ahora</Link></div></section>
 </main>
}
