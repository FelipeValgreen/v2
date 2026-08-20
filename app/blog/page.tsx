import Link from "next/link";
import { resourceArticles } from "@/lib/resources";
import { routeMetadata } from "@/lib/seo";

// Legacy editorial landing preserved as a migration compatibility surface.
// Keep noindex until historical /blog/[slug] URLs have a performance-backed migration decision.
export const metadata = routeMetadata(
  "/blog",
  "Guías y recursos RINON",
  "Archivo editorial de RINON y acceso a las nuevas guías de fabricación metálica.",
  { indexable: false },
);

export default function BlogCompatibilityPage(){return <main>
  <section className="hero compact-hero"><div className="container"><div className="eyebrow">ARCHIVO EDITORIAL</div><h1>Guías para preparar mejor un requerimiento metálico.</h1><p className="lead">RINON está consolidando el contenido editorial en recursos útiles y conectados con cada solución comercial.</p><div className="actions"><Link className="button primary" href="/recursos">Ver todos los recursos</Link></div></div></section>
  <section className="section"><div className="container"><div className="resource-grid">{resourceArticles.slice(0,4).map((article)=><article className="resource-card" key={article.slug}><span>{article.category}</span><h2>{article.title}</h2><p>{article.description}</p><Link href={`/recursos/${article.slug}`}>Leer guía →</Link></article>)}</div></div></section>
</main>}
