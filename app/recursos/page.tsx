import Link from "next/link";
import { publicResourceArticles } from "@/lib/resources";
import { migrationResourceArticles } from "@/lib/migration-resources";
import { routeMetadata } from "@/lib/seo";
import { TechnicalVisual } from "@/components/TechnicalVisual";

export const metadata = routeMetadata("/recursos","Recursos de fabricación metálica","Guías prácticas para preparar cotizaciones y requerimientos de fabricación metálica, estructuras, cierres, rejas, portones y camarotes.");

const allPublicResources=[...publicResourceArticles,...migrationResourceArticles];

export default function Page(){return <main className="v5-editorial-page">
  <section className="v2-solution-hero"><div className="container v2-solution-hero-grid"><div><div className="v2-eyebrow">RECURSOS RINON</div><h1>Guías para cotizar mejor.</h1><p>Guías pensadas para ayudarte a explicar un requerimiento sin rellenar formularios técnicos innecesarios.</p></div><TechnicalVisual kind="fabrication" label="Preparar antes de cotizar." detail="Medidas · cantidad · uso · ubicación · antecedentes" /></div></section>
  <section className="v2-solution-section"><div className="container"><div className="v2-resource-grid">{allPublicResources.map((article)=><Link key={article.slug} href={`/recursos/${article.slug}`}><span>{article.category}</span><h3>{article.title}</h3><p>{article.description}</p><b>Leer guía →</b></Link>)}</div></div></section>
  <section className="v2-final-cta"><div className="container"><div><div className="v2-eyebrow">¿YA TIENES ANTECEDENTES?</div><h2>Pasemos a cotizar.</h2></div><Link className="v2-btn orange" href="/cotizar">Cotizar proyecto</Link></div></section>
</main>}
