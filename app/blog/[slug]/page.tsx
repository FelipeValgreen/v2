import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { approvedLegacyBlogRedirects, getLegacyBlogDecision, legacyBlogSlugs } from "@/lib/legacy-blog";
import { routeMetadata } from "@/lib/seo";

export function generateStaticParams(){return legacyBlogSlugs.map((slug)=>({slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const decision=getLegacyBlogDecision(slug);
  if(!decision)return {};
  return routeMetadata(`/blog/${slug}`, "Guía RINON en actualización", "Esta guía de RINON está siendo actualizada. Puedes continuar a la solución relacionada o revisar los recursos vigentes.", {indexable:false});
}

export default async function LegacyBlogPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const decision=getLegacyBlogDecision(slug);
  if(!decision)notFound();
  const approvedDestination=approvedLegacyBlogRedirects[slug];
  if(process.env.RINON_ENABLE_BLOG_REDIRECTS === "true" && approvedDestination){
    permanentRedirect(approvedDestination);
  }
  return <main>
    <section className="hero compact-hero"><div className="container article-narrow">
      <div className="eyebrow">RECURSO RINON</div>
      <h1>Estamos actualizando esta guía.</h1>
      <p className="lead">Parte de nuestro contenido anterior está siendo renovado para que las recomendaciones coincidan con la oferta, procesos y antecedentes vigentes. Mientras tanto, puedes ir directamente a la solución relacionada.</p>
      <div className="actions">
        <Link className="button primary" href={decision.suggestedDestination}>Ver solución relacionada</Link>
        <Link className="button secondary" href="/recursos">Ver recursos actuales</Link>
      </div>
    </div></section>
  </main>
}
