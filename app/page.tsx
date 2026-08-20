import Image from "next/image";
import Link from "next/link";
import { routeMetadata } from "@/lib/seo";
import { publicAddressDisplay } from "@/lib/contact";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { VisualEvidence } from "@/components/VisualEvidence";

export const metadata = routeMetadata(
  "/",
  "Fabricación metálica a medida en Santiago",
  "Camarotes, cierres, estructuras, equipamiento y fabricación metálica a medida con RINON en San Bernardo.",
);

const process = [
  ["01", "Requerimiento", "Qué necesitas, para qué se usará y qué antecedentes ya tienes."],
  ["02", "Evaluación", "Revisamos medidas, cantidad, alcance y factibilidad."],
  ["03", "Fabricación", "Definimos la solución fabricable antes de pasar a producción."],
  ["04", "Entrega", "Coordinamos despacho o instalación cuando corresponda al proyecto."],
] as const;

const moreSolutions = [
  ["Equipamiento", "/equipamiento-metalico"],
  ["Rejas", "/rejas-metalicas"],
  ["Portones", "/portones-metalicos"],
  ["Especiales", "/fabricaciones-especiales"],
  ["Camarote con escritorio", "/camarote-con-escritorio"],
] as const;

export default function Home() {
  return <main className="s7-home">
    <section className="s7-hero">
      <div className="s7-hero-image" aria-hidden="true">
        <Image src="/visuals/home-hero-conceptual-welding.webp" alt="" fill sizes="100vw" priority />
      </div>
      <div className="s7-hero-vignette" />
      <span className="s7-concept-note">Visual conceptual</span>
      <div className="container s7-hero-inner">
        <div className="s7-hero-copy">
          <span className="s7-kicker">FABRICACIÓN METÁLICA · SAN BERNARDO</span>
          <h1>Lo necesitas<br/>en metal.<br/><em>Lo fabricamos.</em></h1>
          <p>Productos, proyectos y soluciones a medida para empresas y particulares.</p>
          <div className="s7-actions">
            <Link className="s7-cta" data-event="quote_start" data-cta-location="hero" href="/cotizar">Cotizar proyecto <span>↗</span></Link>
            <Link className="s7-text-link" href="#soluciones">Ver soluciones <span>↓</span></Link>
          </div>
        </div>
        <div className="s7-hero-note" aria-label="Información operativa">
          <span>Fabricación directa</span>
          <span>Plano · foto · referencia</span>
          <span>{publicAddressDisplay()}</span>
        </div>
      </div>
    </section>

    <section className="s7-solutions" id="soluciones">
      <div className="container s7-solutions-head" data-reveal>
        <span className="s7-kicker ink">QUÉ FABRICAMOS</span>
        <h2>Tres mundos.<br/>Una misma fabricación.</h2>
      </div>

      <article className="s7-chapter s7-chapter-dark" data-reveal>
        <div className="container s7-chapter-grid">
          <div className="s7-chapter-media s7-rhino-cut">
            <VisualEvidence slug="/camarotes" fallback={["producto completo", "detalle constructivo", "cantidad"]} mode="theatre"/>
          </div>
          <div className="s7-chapter-copy">
            <span className="s7-index">01</span>
            <small>PRODUCTO / VOLUMEN</small>
            <h3>Camas y<br/>camarotes.</h3>
            <p>Configuraciones metálicas para instituciones, faenas, alojamientos y proyectos por cantidad.</p>
            <Link href="/camarotes">Explorar camarotes <span>↗</span></Link>
          </div>
        </div>
      </article>

      <article className="s7-chapter s7-chapter-light" data-reveal>
        <div className="container s7-chapter-grid reverse">
          <div className="s7-chapter-media s7-rhino-cut mirror">
            <VisualEvidence slug="/cierres-perimetrales" fallback={["sistema completo", "postes y paños", "contexto"]} mode="theatre"/>
          </div>
          <div className="s7-chapter-copy">
            <span className="s7-index">02</span>
            <small>PERÍMETRO / ACCESO</small>
            <h3>Cierres y<br/>protecciones.</h3>
            <p>Rejas, portones y sistemas perimetrales definidos según medidas, accesos y contexto de uso.</p>
            <Link href="/cierres-perimetrales">Explorar cierres <span>↗</span></Link>
          </div>
        </div>
      </article>

      <article className="s7-chapter s7-chapter-graphite" data-reveal>
        <div className="container s7-chapter-grid">
          <div className="s7-chapter-media s7-rhino-cut">
            <VisualEvidence slug="/estructuras-metalicas" fallback={["estructura completa", "nodos", "geometría"]} mode="theatre"/>
          </div>
          <div className="s7-chapter-copy">
            <span className="s7-index">03</span>
            <small>PROYECTO / A MEDIDA</small>
            <h3>Estructuras<br/>metálicas.</h3>
            <p>Fabricación desde una referencia o una definición técnica validada, con el alcance acordado antes de producir.</p>
            <Link href="/estructuras-metalicas">Explorar estructuras <span>↗</span></Link>
          </div>
        </div>
      </article>

      <nav className="container s7-more" aria-label="Más soluciones">
        <span>Más soluciones</span>
        {moreSolutions.map(([label,href]) => <Link key={href} href={href}>{label} <b>↗</b></Link>)}
      </nav>
    </section>

    <section className="s7-process" data-reveal>
      <div className="container">
        <div className="s7-process-heading">
          <span className="s7-kicker">CÓMO TRABAJAMOS</span>
          <h2>Un proceso simple.</h2>
        </div>
        <ol className="s7-process-list">
          {process.map(([n,title,body]) => <li key={n}>
            <span>{n}</span>
            <strong>{title}</strong>
            <p>{body}</p>
          </li>)}
        </ol>
      </div>
    </section>

    <section className="s7-custom" data-reveal>
      <div className="s7-custom-mark" aria-hidden="true"><Image src="/brand/isotipo-rinoceronte-transparent.webp" alt="" fill sizes="45vw"/></div>
      <div className="container s7-custom-inner">
        <span className="s7-kicker">FABRICACIÓN A MEDIDA</span>
        <h2>Cuando no existe<br/>en un catálogo.</h2>
        <p>Puedes partir con una foto, un plano, una muestra, medidas o simplemente explicar el problema. Ordenamos el requerimiento antes de cotizar.</p>
        <Link className="s7-text-link light" href="/fabricacion-metalica">Ver fabricación a medida <span>↗</span></Link>
      </div>
    </section>

    <section className="s7-enterprise" data-reveal>
      <div className="container s7-enterprise-inner">
        <div>
          <span className="s7-kicker ink">EMPRESAS / VOLUMEN</span>
          <h2>Primero entendemos<br/>qué necesitas fabricar.</h2>
        </div>
        <div className="s7-enterprise-copy">
          <p>Cantidad, uso, ubicación, antecedentes y plazo objetivo: lo necesario para evaluar compras por volumen y proyectos especiales.</p>
          <Link href="/empresas">Soluciones para empresas <span>↗</span></Link>
        </div>
      </div>
    </section>

    <section className="s7-final" data-reveal>
      <div className="container s7-final-inner">
        <div><span className="s7-kicker">TU PROYECTO</span><h2>¿Qué necesitas fabricar?</h2></div>
        <div className="s7-final-actions">
          <Link className="s7-cta" data-event="quote_start" data-cta-location="home_footer" href="/cotizar">Cotizar proyecto <span>↗</span></Link>
          <WhatsAppCTA location="home_footer" label="WhatsApp" className="s7-text-link dark"/>
        </div>
      </div>
    </section>
  </main>;
}
