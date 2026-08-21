import Link from "next/link";
import { routeMetadata } from "@/lib/seo";
import { CommercialEvidencePanel } from "@/components/CommercialEvidencePanel";

export const metadata=routeMetadata(
  "/mallas-separadoras",
  "Mallas separadoras metálicas para bodegas e industria",
  "Divisiones metálicas y mallas separadoras para bodegas, galpones, plantas y espacios operacionales. Evaluación según metros, altura, accesos y soporte existente.",
);

const uses=[
  ["BODEGAS", "Separación de áreas de almacenamiento", "Paños y accesos para ordenar sectores interiores manteniendo visibilidad entre zonas."],
  ["GALPONES", "Divisiones interiores", "Separaciones metálicas para organizar recintos amplios sin convertir cada límite en un muro opaco."],
  ["OPERACIÓN", "Control físico de zonas", "Delimitación de espacios cuyo acceso, dimensiones y uso deben quedar definidos antes de fabricar."],
  ["EQUIPOS", "Perímetros interiores", "Divisiones alrededor de equipos o recintos cuando el proyecto ya ha definido la función y los requisitos aplicables."],
] as const;
const heroEvidence=[
 {label:"RECORRIDO",body:"Metros lineales y forma general del trazado muestran cuánto espacio se debe dividir."},
 {label:"ALTURA",body:"La altura objetivo y las restricciones del recinto condicionan la geometría del conjunto."},
 {label:"ACCESOS",body:"Puertas, pasos y operación diaria deben quedar ubicados desde el inicio."},
 {label:"SOPORTE",body:"Piso, muros, pilares y fotografías ayudan a revisar cómo podría fijarse la división."},
] as const;

export default function Page(){return <main className="v5-editorial-page theme-product">
  <section className="rinon-commercial-hero"><div className="container rinon-commercial-hero-grid"><div><div className="v2-eyebrow">MALLAS SEPARADORAS · DIVISIONES INTERIORES</div><h1>Divide el espacio sin perder lectura del recinto.</h1><p>Fabricamos divisiones y paños metálicos para bodegas, galpones y otros espacios interiores. El sistema se define según metros, altura, accesos, soporte existente y función del proyecto.</p><div className="v2-actions"><Link className="v2-btn orange" data-event="quote_start" data-cta-location="mallas_hero" href="/cotizar?category=cierres&detail=mallas_separadoras">Cotizar mallas separadoras</Link><Link className="v2-btn outline" href="/cierres-perimetrales">Ver cierres</Link></div><div className="v2-kickers"><span>Metros lineales</span><span>Altura</span><span>Puertas / accesos</span><span>Soporte existente</span></div></div><CommercialEvidencePanel title="PARA UBICAR LA DIVISIÓN" items={heroEvidence} note="Si la separación forma parte de un resguardo de maquinaria o requisito normativo, esas condiciones deben venir definidas y validadas por el proyecto."/></div></section>

  <section className="v2-solution-section"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">APLICACIONES</div><h2>Primero se define la función de la separación.</h2></div><p>Una misma geometría puede servir a usos distintos. Por eso evitamos asumir requisitos de seguridad, resistencia o normativa sin que estén definidos por el proyecto.</p></div><div className="card-grid">{uses.map(([tag,title,body])=><article key={tag}><span>{tag}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>

  <section className="v2-solution-section soft"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">PARA COTIZAR</div><h2>Un croquis del espacio puede ser suficiente para empezar.</h2></div><p>Si existe un layout, plano o requerimiento técnico, envíalo. Si no, bastan medidas aproximadas y fotografías para una primera revisión.</p></div><div className="v2-step-grid"><article><span>01 · RECORRIDO</span><h3>Cuánto hay que dividir</h3><p>Metros lineales aproximados y forma general del recorrido.</p></article><article><span>02 · ALTURA</span><h3>Qué altura necesitas</h3><p>Altura objetivo o restricciones del recinto.</p></article><article><span>03 · ACCESOS</span><h3>Dónde deben existir puertas</h3><p>Cantidad, posición y uso de accesos dentro de la división.</p></article><article><span>04 · SOPORTE</span><h3>Sobre qué se instalará</h3><p>Piso, muros, pilares y fotografías del lugar para revisar el alcance.</p></article></div></div></section>

  <section className="v2-capabilities"><div className="container v2-capabilities-grid"><div><div className="v2-eyebrow">LÍMITE TÉCNICO</div><h2>Una malla no reemplaza una especificación de seguridad.</h2><p>Cuando la división forma parte de un resguardo de maquinaria, zona restringida o requisito normativo, las condiciones aplicables deben estar definidas y validadas antes de fabricar. RINON no presenta una división genérica como certificación del sistema completo.</p></div><div className="v2-capability-list"><div><span>01</span><strong>Función</strong><em>REQUERIMIENTO</em></div><div><span>02</span><strong>Geometría</strong><em>MEDIDAS</em></div><div><span>03</span><strong>Accesos</strong><em>OPERACIÓN</em></div><div><span>04</span><strong>Fijación</strong><em>SOPORTE</em></div><div><span>05</span><strong>Alcance</strong><em>COTIZACIÓN</em></div></div></div></section>

  <section className="v2-solution-section"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">RELACIONADO</div><h2>¿Interior o perímetro exterior?</h2></div><p>Si la necesidad es cerrar el borde de un predio o controlar un acceso vehicular, conviene partir por la familia de cierres y portones.</p></div><div className="v2-resource-grid"><Link href="/cierres-perimetrales"><span>PERÍMETRO</span><h3>Cierres perimetrales</h3><p>Sistemas para delimitar predios, obras, instalaciones y terrenos.</p><b>Ver cierres →</b></Link><Link href="/rejas-metalicas"><span>REJAS</span><h3>Rejas metálicas</h3><p>Paños y protecciones metálicas definidos según vanos, tramos y soportes.</p><b>Ver rejas →</b></Link><Link href="/mallas-3d"><span>PANEL</span><h3>Malla 3D / panel electrosoldado</h3><p>Panel metálico rígido para evaluar como alternativa dentro de un cierre perimetral.</p><b>Ver panel →</b></Link></div></div></section>

  <section className="v2-final-cta"><div className="container"><div><div className="v2-eyebrow">TU ESPACIO</div><h2>¿Cuántos metros necesitas separar?</h2><p>Envía layout, croquis, fotos, altura y ubicación del proyecto.</p></div><Link className="v2-btn orange" href="/cotizar?category=cierres&detail=mallas_separadoras">Cotizar división</Link></div></section>
</main>}
