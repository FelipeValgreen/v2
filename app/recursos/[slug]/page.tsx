import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getResource, resourceArticles, isResourceLaunchEnabled, quoteCategoryForOwner, resourceQuickAnswer, getRelatedResources } from "@/lib/resources";
import { JsonLd } from "@/components/JsonLd";
import { SEO_BASE_URL, canonicalUrl, routeMetadata } from "@/lib/seo";
import { TechnicalVisual, technicalKindForSlug } from "@/components/TechnicalVisual";

export function generateStaticParams(){return resourceArticles.map(({slug})=>({slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const article=getResource(slug);
  if(!article)return {};
  return routeMetadata(`/recursos/${article.slug}`, article.title, article.description, { indexable: isResourceLaunchEnabled(article) });
}

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const article=getResource(slug);
  if(!article)notFound();
  const launchEnabled=isResourceLaunchEnabled(article);
  const articleUrl=canonicalUrl(`/recursos/${article.slug}`);
  const quoteCategory=quoteCategoryForOwner(article.ownerHref);
  const quickAnswer=resourceQuickAnswer(article);
  const related=getRelatedResources(article);
  const schema=[{
    "@context":"https://schema.org",
    "@type":"Article",
    headline:article.title,
    description:article.description,
    mainEntityOfPage:articleUrl,
    inLanguage:"es-CL",
    about:article.category,
    author:{"@id":`${SEO_BASE_URL}/#organization`},
    publisher:{"@id":`${SEO_BASE_URL}/#organization`},
  },{
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    itemListElement:[
      {"@type":"ListItem",position:1,name:"RINON",item:SEO_BASE_URL},
      {"@type":"ListItem",position:2,name:"Recursos",item:canonicalUrl("/recursos")},
      {"@type":"ListItem",position:3,name:article.title,item:articleUrl},
    ],
  }];
  const quoteHref=`/cotizar?category=${quoteCategory}&from=resource`;
  return <main className="v5-editorial-page">
    <JsonLd data={schema}/>
    <article>
      <header className="v2-solution-hero"><div className="container v2-solution-hero-grid"><div><div className="v2-eyebrow">{article.category.toUpperCase()} · GUÍA RINON</div>{!launchEnabled?<aside className="capability-notice"><b>CONTENIDO EN VALIDACIÓN</b><strong>Esta guía se publicará cuando el servicio asociado y su alcance hayan sido validados.</strong><span>Mientras tanto, puedes consultar directamente la disponibilidad y el alcance aplicable.</span></aside>:null}<h1>{article.title}</h1><p>{article.intro}</p><div className="v2-actions"><Link className="v2-btn orange" href={launchEnabled?quoteHref:"/contacto"}>{launchEnabled?article.ownerLabel:"Consultar disponibilidad"}</Link><Link className="v2-btn outline" href="/recursos">Ver recursos</Link></div></div><TechnicalVisual kind={technicalKindForSlug(article.ownerHref)} label="Preparar antes de cotizar." detail="Medidas · cantidad · uso · ubicación · antecedentes" /></div></header>
      <section className="resource-answer" aria-labelledby="respuesta-corta"><div className="container resource-answer-grid"><div><span>RESPUESTA CORTA</span><h2 id="respuesta-corta">Qué preparar antes de cotizar.</h2></div><div><p>{quickAnswer}</p><ul>{article.checklist.slice(0,5).map(item=><li key={item}>{item}</li>)}</ul></div></div></section>
      <section className="v2-article-section"><div className="container v2-article-layout"><div className="v2-article-body">{article.sections.map((section,i)=><section key={section.heading}><span>{String(i+1).padStart(2,"0")}</span><h2>{section.heading}</h2><p>{section.body}</p>{section.bullets&&<ul>{section.bullets.map((item)=><li key={item}>{item}</li>)}</ul>}</section>)}</div><aside className="v2-article-checklist"><div className="v2-eyebrow">CHECKLIST</div><h2>Ten esto a mano</h2><ol>{article.checklist.map((item)=><li key={item}>{item}</li>)}</ol>{launchEnabled?<Link className="v2-btn orange full" data-event="quote_start" data-cta-location="resource_sidebar" href={quoteHref}>{article.ownerLabel}</Link>:<Link className="v2-btn orange full" href="/contacto">Consultar estado del servicio</Link>}</aside></div></section>
      {related.length?<section className="resource-related"><div className="container"><div className="resource-related-head"><span>SEGUIR PREPARANDO</span><h2>Guías relacionadas.</h2></div><div className="resource-related-links">{related.map((item,index)=><Link key={item.slug} href={`/recursos/${item.slug}`}><small>{String(index+1).padStart(2,"0")} · {item.category}</small><b>{item.title}</b><em>Leer guía ↗</em></Link>)}</div></div></section>:null}
      <section className="v2-final-cta"><div className="container"><div><div className="v2-eyebrow">SIGUIENTE PASO</div><h2>¿Ya tienes parte de estos antecedentes?</h2><p>No necesitas completar todo antes de conversar. Envía lo que tengas y separaremos lo confirmado de lo que aún debe definirse.</p></div><div className="v2-final-actions">{launchEnabled?<Link className="v2-btn orange" data-event="quote_start" data-cta-location="resource_end" href={quoteHref}>Iniciar cotización</Link>:<Link className="v2-btn orange" href="/contacto">Consultar disponibilidad futura</Link>}</div></div></section>
    </article>
  </main>;
}
