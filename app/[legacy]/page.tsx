import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CommercialEvidencePanel } from "@/components/CommercialEvidencePanel";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { routeMetadata } from "@/lib/seo";
import { getLegacyCommercialLanding, legacyCommercialSlugs } from "@/lib/legacy-commercial";

export function generateStaticParams() {
  return legacyCommercialSlugs.map((legacy) => ({ legacy }));
}

export async function generateMetadata({ params }: { params: Promise<{ legacy: string }> }): Promise<Metadata> {
  const { legacy } = await params;
  const landing = getLegacyCommercialLanding(legacy);
  return landing ? routeMetadata(`/${landing.slug}`, landing.title, landing.description) : {};
}

export default async function LegacyCommercialPage({ params }: { params: Promise<{ legacy: string }> }) {
  const { legacy } = await params;
  const landing = getLegacyCommercialLanding(legacy);
  if (!landing) notFound();
  const heroEvidence=landing.points.slice(0,4).map((point)=>({label:point.title,body:point.body}));
  const quoteCategory=new URL(landing.quoteHref,"https://rinon.cl").searchParams.get("category") ?? "general";

  return <main className="v5-editorial-page theme-product">
    <section className="v2-solution-hero">
      <div className="container v2-solution-hero-grid">
        <div>
          <div className="v2-eyebrow">{landing.eyebrow}</div>
          <h1>{landing.title}</h1>
          <p>{landing.intro}</p>
          <div className="v2-actions">
            <Link className="v2-btn orange" data-event="quote_start" data-cta-location="legacy_commercial_hero" href={landing.quoteHref}>{landing.quoteLabel}</Link>
            <WhatsAppCTA category={quoteCategory} location="legacy_commercial_hero" label="Hablar por WhatsApp" className="v2-btn outline"/>
            <Link className="v2-btn outline" href={landing.parentHref}>{landing.parentLabel}</Link>
          </div>
          <div className="solution-meta-line"><span>Configuración confirmada al cotizar</span><span>Cantidad y destino</span><span>Alcance vigente</span></div>
        </div>
        <CommercialEvidencePanel title="QUÉ CONVIENE CONFIRMAR" items={heroEvidence} note="Esta URL conserva una intención comercial histórica; medidas, precios y especificaciones se confirman con el requerimiento vigente."/>
      </div>
    </section>

    <section className="v2-solution-section">
      <div className="container">
        <div className="section-head">
          <div><div className="v2-eyebrow">ANTES DE COTIZAR</div><h2>La versión vigente se define con el requerimiento.</h2></div>
          <p>Conservamos esta página porque corresponde a una búsqueda comercial específica de RINON. No trasladamos automáticamente medidas, precios o especificaciones antiguas.</p>
        </div>
        <div className="card-grid">
          {landing.points.map((point, index) => <article key={point.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{point.title}</h3><p>{point.body}</p></article>)}
        </div>
      </div>
    </section>

    <section className="v2-solution-section soft">
      <div className="container">
        <div className="v2-eyebrow">PREGUNTAS FRECUENTES</div>
        <h2>Lo que conviene confirmar.</h2>
        <div className="faq-grid">{landing.faq.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div>
        <div className="v2-actions"><Link className="v2-btn outline" href="/soluciones">Ver todas las soluciones</Link><Link className="v2-btn outline" href="/recursos">Guías para cotizar</Link></div>
      </div>
    </section>

    <section className="v2-final-cta"><div className="container"><div><div className="v2-eyebrow">SIGUIENTE PASO</div><h2>Confirma el producto que necesitas hoy.</h2><p>Indica cantidad, ubicación y, si la tienes, una foto o referencia del modelo.</p></div><div className="v2-actions"><Link className="v2-btn orange" data-event="quote_start" data-cta-location="legacy_commercial_footer" href={landing.quoteHref}>{landing.quoteLabel}</Link><WhatsAppCTA category={quoteCategory} location="legacy_commercial_footer" label="Hablar por WhatsApp" className="v2-btn outline"/></div></div></section>
  </main>;
}
