import Link from "next/link";
import { routeMetadata, solutionJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { VisualEvidence } from "@/components/VisualEvidence";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

const description = "Estructuras metálicas a medida para cobertizos, pérgolas, escaleras, plataformas, soportes y proyectos especiales desde San Bernardo.";

export const metadata = routeMetadata(
  "/estructuras-metalicas",
  "Estructuras metálicas a medida en Santiago",
  description,
);

const faqs = [
  {
    q: "¿Qué necesito para cotizar una estructura metálica?",
    a: "Puedes partir con un croquis, plano, fotografía o medidas aproximadas. También necesitamos conocer el uso, la ubicación y si esperas fabricación solamente o si el proyecto debe evaluar montaje.",
  },
  {
    q: "¿Fabrican cobertizos y pérgolas metálicas para casas?",
    a: "Sí, pueden evaluarse cobertizos y pérgolas residenciales. La geometría, apoyos, cubierta, terminación e integración con la vivienda se confirman para el espacio real antes de fabricar.",
  },
  {
    q: "¿También trabajan estructuras para empresas?",
    a: "Sí. Se pueden evaluar escaleras, plataformas, soportes, bastidores y otras estructuras para proyectos comerciales u operacionales cuando el requerimiento y sus condiciones técnicas están definidos.",
  },
  {
    q: "¿Incluyen cálculo estructural o memoria de cálculo?",
    a: "No por defecto. Si el proyecto requiere ingeniería, memoria de cálculo, cargas certificadas o responsabilidad profesional específica, ese alcance debe definirse expresamente antes de comprometer el trabajo.",
  },
];

const structureTypes = [
  ["01", "Cobertizos y pérgolas", "Estructuras para viviendas, terrazas, estacionamientos y espacios comerciales, evaluadas según dimensiones, apoyos, cubierta, terminación e integración arquitectónica."],
  ["02", "Escaleras y plataformas", "Elementos de acceso o trabajo fabricados a medida cuando dimensiones, uso, apoyos y requerimientos aplicables están suficientemente definidos."],
  ["03", "Soportes y bastidores", "Marcos, bases y conjuntos metálicos para habilitación, apoyo de equipos u otras funciones con geometría conocida."],
  ["04", "Estructuras especiales", "Conjuntos no estándar que se revisan desde su función, dimensiones, material, restricciones del lugar y forma de montaje."],
] as const;

const quoteInputs = [
  ["01", "Referencia", "Plano, croquis, fotografía o una explicación clara de lo que la estructura debe resolver."],
  ["02", "Dimensiones", "Ancho, largo, altura y cualquier restricción relevante del espacio."],
  ["03", "Uso", "Residencial, comercial u operacional; incluye cargas o condiciones técnicas solo cuando ya estén definidas."],
  ["04", "Ubicación", "Comuna, fotografías del lugar y si necesitas evaluar fabricación, despacho o montaje."],
] as const;

export default function Page() {
  return <main className="v5-editorial-page theme-geometry" data-sgeo-owner="estructuras-metalicas">
    <JsonLd data={solutionJsonLd({
      pathname: "/estructuras-metalicas",
      name: "Estructuras metálicas a medida",
      description,
      faqs,
    })} />

    <section className="prd2-solution-hero" data-reveal>
      <div className="container prd2-solution-hero-grid">
        <div className="prd2-solution-copy">
          <div className="prd2-kicker">ESTRUCTURAS METÁLICAS · SAN BERNARDO</div>
          <h1>Estructuras metálicas para el espacio y la función que necesitas.</h1>
          <p>Desde un cobertizo o pérgola para una vivienda hasta una escalera, plataforma o soporte para una empresa. Partimos por el uso, las dimensiones, los apoyos y el lugar real; después definimos qué es fabricable y qué antecedentes faltan.</p>
          <div className="prd2-solution-actions">
            <Link className="prd2-btn primary" data-event="quote_start" data-cta-location="structures_hero" href="/cotizar?category=estructuras">Cotizar estructura <span>↗</span></Link>
            <WhatsAppCTA category="estructuras" location="structures_hero" label="Enviar referencia por WhatsApp" className="prd2-btn ghost" />
            <a className="prd2-btn ghost" href="#tipos">Ver qué fabricamos <span>↓</span></a>
          </div>
          <div className="solution-meta-line" aria-label="Punto de partida"><span>Foto · plano · croquis</span><span>Residencial + empresa</span><span>Alcance antes de fabricar</span></div>
        </div>
        <div className="prd2-solution-media has-photo">
          <VisualEvidence slug="/estructuras-metalicas" fallback={["estructura completa", "detalle de unión", "contexto de uso"]} />
          <div className="prd2-solution-media-caption"><span>NO OBRA EJECUTADA</span><b>Referencia de contexto conceptual</b></div>
        </div>
      </div>
    </section>

    <section id="tipos" className="v2-solution-section">
      <div className="container">
        <div className="section-head">
          <div><div className="v2-eyebrow">QUÉ PODEMOS EVALUAR</div><h2>Una misma capacidad, cuatro tipos de necesidad.</h2></div>
          <p>Esta página es para quien ya sabe que necesita una estructura. Si lo que buscas es una pieza, réplica, componente o fabricación todavía abierta, conviene partir por fabricación metálica a medida.</p>
        </div>
        <div className="card-grid">{structureTypes.map(([n,title,body]) => <article key={title}><span>{n}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        <div className="v2-actions"><Link className="v2-btn outline" href="/fabricacion-metalica">Tengo otro proyecto a medida</Link></div>
      </div>
    </section>

    <section className="v2-solution-section soft">
      <div className="container">
        <div className="section-head">
          <div><div className="v2-eyebrow">RESIDENCIAL + COMERCIAL</div><h2>Un cobertizo debe integrarse al lugar, no parecer agregado después.</h2></div>
          <p>En viviendas y espacios de atención al público importan tanto la modulación y los apoyos como la proporción, la cubierta y la terminación. El objetivo es evaluar una estructura limpia y coherente con la arquitectura existente.</p>
        </div>
        <div className="card-grid">
          <article><span>01</span><h3>Implantación</h3><p>Se revisan medidas, circulación, muros, apoyos existentes y relación con puertas, ventanas o estacionamientos.</p></article>
          <article><span>02</span><h3>Geometría</h3><p>Altura, luces, modulación y encuentros deben responder al espacio real y al uso previsto.</p></article>
          <article><span>03</span><h3>Terminación</h3><p>Color, acabado y cubierta se confirman dentro del alcance aplicable al proyecto.</p></article>
          <article><span>04</span><h3>Montaje</h3><p>Accesos, apoyos, interferencias y condiciones del lugar se revisan antes de comprometer instalación.</p></article>
        </div>
      </div>
    </section>

    <section className="v2-capabilities">
      <div className="container v2-capabilities-grid">
        <div><div className="v2-eyebrow">EMPRESAS Y OPERACIÓN</div><h2>También fabricamos estructuras donde la función manda.</h2><p>Escaleras, plataformas, bastidores, soportes y conjuntos especiales requieren un requerimiento más explícito. Si existen cargas, normas, documentación o ingeniería exigida por el proyecto, deben informarse para separar fabricación de responsabilidades técnicas adicionales.</p></div>
        <div className="v2-capability-list">
          <div><span>01</span><strong>Escaleras</strong><em>ACCESO</em></div>
          <div><span>02</span><strong>Plataformas</strong><em>OPERACIÓN</em></div>
          <div><span>03</span><strong>Soportes</strong><em>HABILITACIÓN</em></div>
          <div><span>04</span><strong>Bastidores</strong><em>CONJUNTO</em></div>
          <div><span>05</span><strong>Especiales</strong><em>A MEDIDA</em></div>
        </div>
      </div>
    </section>

    <section className="v2-solution-section">
      <div className="container">
        <div className="section-head">
          <div><div className="v2-eyebrow">PARA COTIZAR</div><h2>Cuatro antecedentes reducen la mayor parte de los supuestos.</h2></div>
          <p>No necesitas tener un plano profesional para iniciar. Envía lo que tengas y separamos la información disponible de lo que realmente debe definirse antes de fabricar.</p>
        </div>
        <div className="v2-step-grid">{quoteInputs.map(([n,title,body]) => <article key={title}><span>{n}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </div>
    </section>

    <section className="v2-scope-fit">
      <div className="container">
        <div className="v2-scope-fit-head"><span className="v2-eyebrow">ALCANCE SIN LETRA CHICA</span><h2>Fabricar una estructura no equivale automáticamente a desarrollar su ingeniería.</h2></div>
        <div className="v2-scope-fit-grid">
          <article><small>BUEN PUNTO DE PARTIDA</small><div><span>✓</span><b>Tienes función, croquis, plano, foto o medidas</b></div><div><span>✓</span><b>Conoces ubicación y restricciones del lugar</b></div><div><span>✓</span><b>Puedes explicar el uso del conjunto</b></div></article>
          <article className="define"><small>SE CONFIRMA ANTES DE COMPROMETER</small><div><span>→</span><b>Cálculo o memoria cuando se requiera</b></div><div><span>→</span><b>Cargas o capacidades que exijan respaldo técnico</b></div><div><span>→</span><b>Montaje, documentación o responsabilidad profesional especial</b></div></article>
        </div>
      </div>
    </section>

    <section id="faq" className="v2-solution-section soft">
      <div className="container">
        <div className="section-head"><div><div className="v2-eyebrow">PREGUNTAS FRECUENTES</div><h2>Antes de definir geometría y precio.</h2></div><p>Las respuestas describen el proceso de evaluación. Materiales, medidas, montaje y terminación definitivos quedan en la cotización aplicable al proyecto.</p></div>
        <div className="faq-grid">{faqs.map(item => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div>
      </div>
    </section>

    <section className="v2-final-cta">
      <div className="container">
        <div><div className="v2-eyebrow">SIGUIENTE PASO</div><h2>Muéstranos el espacio o la estructura que necesitas.</h2><p>Una foto, croquis o plano junto con medidas aproximadas, ubicación y uso es suficiente para iniciar la revisión.</p></div>
        <div className="v2-actions"><Link className="v2-btn orange" data-event="quote_start" data-cta-location="structures_footer" href="/cotizar?category=estructuras">Cotizar estructura</Link><WhatsAppCTA category="estructuras" location="structures_footer" label="Hablar por WhatsApp" className="v2-btn outline" /></div>
      </div>
    </section>
  </main>;
}
