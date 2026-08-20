import Link from "next/link";
import {routeMetadata} from "@/lib/seo";
import {publicAddressDisplay} from "@/lib/contact";
import {MapPanel} from "@/components/MapPanel";
import {TechnicalVisual} from "@/components/TechnicalVisual";

export const metadata=routeMetadata("/nosotros","RINON: fabricación metálica en San Bernardo","Conoce RINON, fabricante de productos y soluciones metálicas desde San Bernardo para particulares, empresas e instituciones.");

const process=[
 ["01","Requerimiento","Partimos por qué necesitas, cantidad, uso, ubicación y los antecedentes que ya tienes."],
 ["02","Evaluación","Ordenamos medidas, materiales, alcance, logística y cualquier dato que falte confirmar."],
 ["03","Fabricación","El trabajo pasa a taller con una definición clara de lo que se debe fabricar."],
 ["04","Entrega","Despacho, armado o instalación se coordinan cuando formen parte del alcance acordado."],
] as const;

export default function Page(){return <main className="v5-editorial-page rinon-about">
 <section className="v2-solution-hero rinon-about-hero"><div className="container v2-solution-hero-grid"><div><div className="v2-eyebrow">RINON · SAN BERNARDO</div><h1>Fabricamos en San Bernardo.</h1><p>RINON fabrica productos, estructuras y soluciones metálicas para particulares, empresas e instituciones. Lo estándar se identifica; lo especial se evalúa antes de producir.</p><div className="v2-actions"><Link className="v2-btn orange" href="/cotizar">Cotizar proyecto</Link><Link className="v2-btn outline" href="#ubicacion">Cómo llegar</Link></div><div className="v2-kickers"><span>Fabricación directa</span><span>Unidad o volumen</span><span>{publicAddressDisplay()}</span></div></div><TechnicalVisual kind="fabrication" label="Taller RINON" detail="Corte · fabricación · soldadura MIG · reparación"/></div></section>

 <section className="v2-solution-section"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">QUÉ HACEMOS</div><h2>Productos cuando existe una configuración. A medida cuando el proyecto pide otra respuesta.</h2></div><p>Nuestro trabajo parte por entender la función antes de prometer una solución. Así podemos separar lo confirmado de lo que todavía requiere medidas, fotos, plano o una revisión adicional.</p></div><div className="card-grid rinon-about-lines"><article><span>01</span><h3>Productos</h3><p>Camas, camarotes, mobiliario y equipamiento dentro de configuraciones evaluables.</p></article><article><span>02</span><h3>Cierres</h3><p>Rejas, portones, mallas y soluciones perimetrales según lugar y uso.</p></article><article><span>03</span><h3>Estructuras</h3><p>Cobertizos, soportes, escaleras, plataformas y proyectos especiales según requerimiento.</p></article><article><span>04</span><h3>Servicios</h3><p>Fabricación a medida, soldadura MIG, corte, pintura electrostática, instalación y reparaciones según alcance.</p></article></div></div></section>

 <section className="v2-capabilities rinon-workshop"><div className="container v2-capabilities-grid"><div><div className="v2-eyebrow">TALLER</div><h2>Capacidad práctica para convertir un requerimiento en una pieza o conjunto fabricable.</h2><p>Trabajamos con acero estructural y podemos evaluar acero inoxidable y aluminio estructural según geometría y proceso. Corte, dimensionado, doblez, soldadura MIG y armado forman parte del flujo interno cuando corresponde.</p></div><div className="v2-capability-list"><div><span>01</span><strong>Corte y dimensionado</strong><em>PREPARACIÓN</em></div><div><span>02</span><strong>Soldadura MIG</strong><em>UNIÓN</em></div><div><span>03</span><strong>Fabricación a medida</strong><em>PROYECTO</em></div><div><span>04</span><strong>Reparación y recuperación</strong><em>SERVICIO</em></div></div></div></section>

 <section className="v2-solution-section soft"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">CÓMO TRABAJAMOS</div><h2>Un proceso claro antes de entrar a taller.</h2></div><p>No necesitas llegar con toda la ingeniería resuelta para consultar. Sí necesitamos identificar qué se sabe y qué falta definir antes de fabricar.</p></div><ol className="rinon-about-process">{process.map(([n,title,body])=><li key={n}><span>{n}</span><strong>{title}</strong><p>{body}</p></li>)}</ol></div></section>

 <div className="container rinon-map-wrap"><MapPanel/></div>

 <section className="v2-solution-section"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">COBERTURA</div><h2>Desde San Bernardo hacia el proyecto.</h2></div><p>La Región Metropolitana es nuestra base operativa. Despachos, proyectos regionales e instalación se evalúan de acuerdo con el tipo de trabajo, destino y alcance requerido.</p></div><div className="v2-actions"><Link className="v2-btn orange" href="/cotizar">Cuéntanos qué necesitas fabricar</Link><Link className="v2-btn outline" href="/contacto">Contacto</Link></div></div></section>
 </main>}
