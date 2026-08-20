import Link from "next/link";
import { routeMetadata } from "@/lib/seo";
import { TechnicalVisual } from "@/components/TechnicalVisual";
import { isSolutionLaunchEnabled } from "@/lib/capabilities";

export const metadata = routeMetadata(
  "/soluciones",
  "Soluciones metálicas en Santiago",
  "Explora las principales líneas de fabricación de RINON: camarotes, cierres, rejas, portones, estructuras, equipamiento y trabajos a medida.",
);

const groups = [
  {
    kicker: "PRODUCTO / ALOJAMIENTO",
    title: "Camas y camarotes metálicos",
    body: "Configuraciones para hogar, instituciones, faenas, residencias y compras por volumen.",
    links: [
      ["Camas y camarotes", "/camarotes"],
      ["Camarote con escritorio", "/camarote-con-escritorio"],
    ],
  },
  {
    kicker: "PERÍMETRO / ACCESO",
    title: "Cierres, rejas y portones",
    body: "Soluciones para delimitar, proteger y ordenar accesos según medidas, terreno y contexto de uso.",
    links: [
      ["Cierres perimetrales", "/cierres-perimetrales"],
      ["Rejas metálicas", "/rejas-metalicas"],
      ["Portones metálicos", "/portones-metalicos"],
    ],
  },
  {
    kicker: "PROYECTO / A MEDIDA",
    title: "Estructuras y fabricación metálica",
    body: "Estructuras, piezas, soportes y conjuntos que parten desde un requerimiento, plano, croquis, muestra o referencia.",
    links: [
      ["Estructuras metálicas", "/estructuras-metalicas"],
      ["Fabricación metálica", "/fabricacion-metalica"],
      ["Fabricaciones especiales", "/fabricaciones-especiales"],
      ["Equipamiento metálico", "/equipamiento-metalico"],
    ],
  },
] as const;

export default function SolutionsPage() {
  const powderCoatingEnabled = isSolutionLaunchEnabled("/pintura-electrostatica");
  return <main className="v5-editorial-page">
    <section className="v2-solution-hero">
      <div className="container v2-solution-hero-grid">
        <div>
          <div className="v2-eyebrow">SOLUCIONES RINON</div>
          <h1>Primero define qué necesitas resolver.</h1>
          <p>Organizamos la oferta por intención de proyecto para que puedas llegar rápido a la línea correcta sin navegar un catálogo infinito.</p>
          <div className="v2-kickers"><span>Producto</span><span>Perímetro</span><span>Estructura</span><span>A medida</span></div>
        </div>
        <TechnicalVisual kind="fabrication" label="Una entrada clara para cada requerimiento." detail="Producto · acceso · estructura · fabricación" />
      </div>
    </section>

    <section className="v2-solution-section">
      <div className="container">
        <div className="section-head">
          <div><div className="v2-eyebrow">ARQUITECTURA DE SOLUCIONES</div><h2>Tres silos comerciales. Una misma capacidad de fabricación.</h2></div>
          <p>Cada página profundiza únicamente en el alcance que le corresponde y conecta con recursos para preparar mejor la cotización.</p>
        </div>
        <div className="v2-resource-grid">
          {groups.map((group) => <article key={group.title}>
            <span>{group.kicker}</span>
            <h3>{group.title}</h3>
            <p>{group.body}</p>
            <div className="v2-link-stack">
              {group.links.map(([label, href]) => <Link key={href} href={href}>{label} →</Link>)}
            </div>
          </article>)}
          {powderCoatingEnabled ? <article>
            <span>TERMINACIÓN</span>
            <h3>Pintura electrostática</h3>
            <p>Servicio de terminación para piezas y conjuntos metálicos dentro de los límites operativos confirmados.</p>
            <div className="v2-link-stack"><Link href="/pintura-electrostatica">Ver pintura electrostática →</Link></div>
          </article> : null}
        </div>
      </div>
    </section>

    <section className="v2-solution-section soft">
      <div className="container">
        <div className="section-head">
          <div><div className="v2-eyebrow">NO SABES DÓNDE ENCAJA</div><h2>También puedes partir por el problema.</h2></div>
          <p>Una foto, un croquis, medidas aproximadas y una explicación del uso suelen bastar para ubicar el requerimiento en la línea correcta.</p>
        </div>
        <div className="v2-actions"><Link className="v2-btn orange" href="/cotizar">Enviar requerimiento</Link><Link className="v2-btn outline" href="/recursos">Ver guías para cotizar</Link></div>
      </div>
    </section>

    <section className="v2-final-cta"><div className="container"><div><div className="v2-eyebrow">SIGUIENTE PASO</div><h2>¿Ya sabes qué necesitas fabricar?</h2><p>Cuéntanos cantidad, ubicación y el mejor antecedente disponible.</p></div><Link className="v2-btn orange" href="/cotizar">Cotizar proyecto</Link></div></section>
  </main>;
}
