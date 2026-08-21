import Link from "next/link";
import { routeMetadata } from "@/lib/seo";
import { CommercialEvidencePanel } from "@/components/CommercialEvidencePanel";
import { VisualEvidence } from "@/components/VisualEvidence";

export const metadata=routeMetadata("/proyectos","Proyectos de fabricación metálica | RINON","Referencias, criterios de proyecto y líneas de fabricación RINON para estructuras, cierres, equipamiento y requerimientos institucionales.");

const projectTypes=[
  ["ESTRUCTURAS", "Estructuras y habilitaciones", "Mezzanines, escaleras, soportes, plataformas y conjuntos definidos desde requerimiento, geometría y condiciones de uso.", "/estructuras-metalicas"],
  ["PERÍMETRO", "Cierres y accesos", "Cierres, rejas y portones donde metros, altura, terreno y accesos forman parte del proyecto desde el inicio.", "/cierres-perimetrales"],
  ["EQUIPAMIENTO", "Equipamiento y series", "Bastidores, racks, soportes, mobiliario y piezas repetibles cuando cantidad y consistencia son parte del alcance.", "/equipamiento-metalico"],
  ["INSTITUCIONAL", "Alojamiento y compras por volumen", "Camas, camarotes y equipamiento para instituciones, faenas y compras donde especificación, destino y calendario importan tanto como la unidad.", "/mobiliario-institucional"],
] as const;

const projectEvidence=[
  {label:"Requerimiento",body:"Función, uso, cantidad y problema que el proyecto debe resolver."},
  {label:"Antecedentes",body:"Plano, croquis, fotos, muestra o medidas disponibles para iniciar la evaluación."},
  {label:"Alcance",body:"Fabricación y, cuando corresponda al requerimiento, coordinación de despacho o montaje."},
  {label:"Resultado",body:"Una solución fabricable cuyo alcance queda definido antes de producción."},
] as const;

export default function Page(){return <main className="v5-editorial-page">
  <section className="v2-solution-hero"><div className="container v2-solution-hero-grid"><div><div className="v2-eyebrow">PROYECTOS Y EVIDENCIA</div><h1>Fabricación que se puede explicar.</h1><p>Mostramos referencias y criterios de proyecto sin atribuir clientes, cargas, resultados o especificaciones que no estén respaldadas. Lo importante es entender qué se pidió, qué se fabricó y qué debe volver a validarse en un nuevo requerimiento.</p><div className="v2-actions"><Link className="v2-btn orange" href="/cotizar?client=project">Cotizar proyecto</Link><Link className="v2-btn outline" href="/soluciones">Ver soluciones</Link></div></div><CommercialEvidencePanel title="QUÉ DEFINE UN PROYECTO" items={projectEvidence} note="Los antecedentes técnicos definitivos se confirman según el requerimiento específico."/></div></section>

  <section className="v2-solution-section"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">TIPOS DE PROYECTO</div><h2>La fabricación cambia según lo que necesitas resolver.</h2></div><p>Estas líneas funcionan como punto de entrada. Cada una profundiza en antecedentes, alcance y forma de cotizar sin mezclar intenciones distintas.</p></div><div className="v2-resource-grid">{projectTypes.map(([tag,title,body,href])=><Link key={href} href={href}><span>{tag}</span><h3>{title}</h3><p>{body}</p><b>Ver línea →</b></Link>)}</div></div></section>

  <section className="v2-solution-section soft"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">ESTÁNDAR DE CASO</div><h2>La evidencia útil muestra contexto además del resultado.</h2></div><p>Cada caso documentado debe ayudar a entender qué se pidió, cómo se abordó la fabricación y qué resultado puede compararse con un nuevo requerimiento.</p></div><div className="card-grid"><article><span>01</span><h3>Requerimiento</h3><p>Qué problema debía resolver, para qué uso y bajo qué restricciones.</p></article><article><span>02</span><h3>Fabricación</h3><p>Proceso y decisiones que puedan comunicarse con respaldo.</p></article><article><span>03</span><h3>Escala</h3><p>Cantidad, metraje o dimensión contextual cuando sea publicable.</p></article><article><span>04</span><h3>Resultado</h3><p>Producto o instalación terminada sin atribuciones no validadas.</p></article></div></div></section>

  <section className="v2-solution-section"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">REFERENCIAS ACTUALES</div><h2>Producto real como punto de referencia.</h2></div><p>Las imágenes de producto ayudan a conversar sobre configuración, construcción y escala. Un cliente o proyecto se identifica solo cuando existe respaldo suficiente para hacerlo.</p></div><div className="v2-evidence-layout"><VisualEvidence slug="/camarotes" fallback={["producto completo","detalle constructivo","cantidad","contexto"]}/><div className="v2-evidence-copy"><span>REGLA DE PROCEDENCIA</span><h3>La evidencia comercial debe poder defenderse.</h3><p>Cuando un caso incluye nombre, ubicación o cliente, esos antecedentes se validan antes de publicarlo.</p><ul><li>Qué se fabricó</li><li>Qué alcance tuvo RINON</li><li>Qué dato puede publicarse</li><li>Qué imagen corresponde realmente</li></ul></div></div></div></section>

  <section className="v2-solution-section soft"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">ANTES DE ENVIAR</div><h2>Un buen proyecto empieza con antecedentes suficientes.</h2></div><p>No necesitas tener una ingeniería completa para iniciar una evaluación. Sí conviene distinguir lo confirmado de lo que todavía debe definirse.</p></div><div className="v2-step-grid"><article><span>01 · FUNCIÓN</span><h3>Qué debe resolver</h3><p>Uso, problema, operación o resultado esperado.</p></article><article><span>02 · GEOMETRÍA</span><h3>Qué espacio existe</h3><p>Plano, croquis, fotos y dimensiones principales cuando estén disponibles.</p></article><article><span>03 · ALCANCE</span><h3>Qué esperas de RINON</h3><p>Fabricación, despacho y montaje cuando corresponda al requerimiento.</p></article><article><span>04 · FECHA</span><h3>Cuándo lo necesitas</h3><p>Fecha objetivo sujeta a revisión de alcance, materiales y capacidad.</p></article></div></div></section>

  <section className="v2-final-cta"><div className="container"><div><div className="v2-eyebrow">TU PROYECTO</div><h2>¿Necesitas fabricar algo similar?</h2><p>Describe la función, cantidad, ubicación y el mejor antecedente que tengas.</p></div><div className="v2-final-actions"><Link className="v2-btn orange" href="/cotizar?client=project">Cotizar proyecto</Link><Link className="v2-btn outline" href="/recursos/como-cotizar-estructura-metalica">Preparar antecedentes</Link></div></div></section>
</main>}
