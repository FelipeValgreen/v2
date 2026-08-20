import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { getLegacyBlogDecision, legacyBlogSlugs } from "@/lib/legacy-blog";
import { getApprovedLegacyBlogRedirect } from "@/lib/blog-migration";
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
  const approvedDestination=getApprovedLegacyBlogRedirect(slug);
  if(process.env.RINON_ENABLE_BLOG_REDIRECTS === "true" && approvedDestination){
    permanentRedirect(approvedDestination);
  }
  const destination=approvedDestination??decision.suggestedDestination;
  return <main>
    <section className="hero compact-hero"><div className="container article-narrow">
      <div className="eyebrow">RECURSO RINON</div>
      <h1>{approvedDestination?"Esta guía ya tiene una versión actualizada.":"Estamos actualizando esta guía."}</h1>
      <p className="lead">{approvedDestination?"Preparamos una versión nueva que conserva esta intención de búsqueda sin reutilizar precios, especificaciones o afirmaciones antiguas. En producción, esta URL podrá consolidarse cuando se active la migración controlada.":"Parte de nuestro contenido anterior está siendo renovado para que las recomendaciones coincidan con la oferta, procesos y antecedentes vigentes. Mientras tanto, puedes ir directamente a la solución relacionada."}</p>
      <div className="actions">
        <Link className="button primary" href={destination}>{approvedDestination?"Ver guía actualizada":"Ver solución relacionada"}</Link>
        <Link className="button secondary" href="/recursos">Ver recursos actuales</Link>
      </div>
    </div></section>
  </main>
}
