import Link from "next/link";
import {routeMetadata} from "@/lib/seo";
import {publicAddressDisplay} from "@/lib/contact";
import {MapPanel} from "@/components/MapPanel";

export const metadata=routeMetadata("/nosotros","RINON: fabricación metálica en San Bernardo","Conoce RINON, fabricante de productos y soluciones metálicas desde San Bernardo para particulares, empresas e instituciones.");

const process=[
 ["01","Cuéntanos","Qué necesitas, cantidad, uso, ubicación y el mejor antecedente disponible."],
 ["02","Definimos","Separamos lo confirmado de lo que todavía necesita medidas, material o contexto."],
 ["03","Fabricamos","El trabajo pasa a taller con una definición clara de lo que se debe producir."],
 ["04","Entregamos","Despacho, armado o instalación se coordinan cuando forman parte del alcance."],
] as const;

const workshopFacts=[
 ["TALLER","Portezuelo 1506, San Bernardo"],
 ["FABRICACIÓN","Productos, estructuras y piezas a medida"],
 ["PROCESOS","Corte, dimensionado, doblez, soldadura MIG y armado"],
 ["CLIENTES","Particulares, empresas e instituciones"],
] as const;

export default function Page(){return <main className="v5-editorial-page rinon-about">
 <section className="v2-solution-hero rinon-about-hero rinon-trust-hero"><div className="container rinon-trust-hero-grid"><div><div className="v2-eyebrow">RINON · SAN BERNARDO</div><h1>Fabricamos en San Bernardo.</h1><p>RINON fabrica productos, estructuras y soluciones metálicas para particulares, empresas e instituciones. Nuestro taller es el punto de partida: desde ahí evaluamos, fabricamos y coordinamos cada trabajo.</p><div className="v2-actions"><Link className="v2-btn orange" href="/cotizar">Cotizar</Link><Link className="v2-btn outline" href="#ubicacion">Cómo llegar</Link></div><div className="v2-kickers"><span>Fabricación directa</span><span>Unidad o volumen</span><span>{publicAddressDisplay()}</span></div></div><aside className="rinon-proof-panel rinon-workshop-proof" aria-label="Datos del taller RINON"><span>RINON EN CONCRETO</span>{workshopFacts.map(([title,body],index)=><div key={title}><b>0{index+1}</b><strong>{title}</strong><p>{body}</p></div>)}<small>La evidencia fotográfica del taller se incorpora únicamente con material RINON aprobado.</small></aside></div></section>

 <section className="v2-solution-section"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">QUÉ HACEMOS</div><h2>Productos cuando existe una configuración. A medida cuando necesitas otra respuesta.</h2></div><p>No necesitas hablar en términos técnicos para consultar. Una foto, plano, croquis, muestra o medidas pueden ser suficientes para ubicar el trabajo en la línea correcta.</p></div><div className="card-grid rinon-about-lines"><article><span>01</span><h3>Productos</h3><p>Camas, camarotes, mobiliario y equipamiento dentro de configuraciones evaluables.</p></article><article><span>02</span><h3>Cierres</h3><p>Rejas, portones, mallas y soluciones perimetrales según lugar y uso.</p></article><article><span>03</span><h3>Estructuras</h3><p>Cobertizos, soportes, escaleras, plataformas y proyectos especiales según requerimiento.</p></article><article><span>04</span><h3>Servicios</h3><p>Soldadura MIG, corte, pintura electrostática, instalación y reparaciones según alcance.</p></article></div></div></section>

 <section className="v2-capabilities rinon-workshop"><div className="container v2-capabilities-grid"><div><div className="v2-eyebrow">TALLER</div><h2>Capacidad práctica para convertir una necesidad en algo fabricable.</h2><p>Trabajamos principalmente con acero y podemos evaluar acero inoxidable y aluminio estructural según geometría y proceso. No publicamos límites de máquina, cargas o certificaciones que no estén respaldados para el trabajo específico.</p></div><div className="v2-capability-list"><div><span>01</span><strong>Corte y dimensionado</strong><em>PREPARACIÓN</em></div><div><span>02</span><strong>Soldadura MIG</strong><em>UNIÓN</em></div><div><span>03</span><strong>Proyectos a medida</strong><em>FABRICACIÓN</em></div><div><span>04</span><strong>Reparación y recuperación</strong><em>SERVICIO</em></div></div></div></section>

 <section className="v2-solution-section soft"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">CÓMO TRABAJAMOS</div><h2>Un proceso simple antes de entrar a taller.</h2></div><p>Primero entendemos qué necesitas. Después pedimos solo la información que realmente cambia la fabricación o la cotización.</p></div><ol className="rinon-about-process">{process.map(([n,title,body])=><li key={n}><span>{n}</span><strong>{title}</strong><p>{body}</p></li>)}</ol></div></section>

 <div className="container rinon-map-wrap" id="ubicacion"><MapPanel/></div>

 <section className="v2-solution-section"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">COBERTURA</div><h2>Desde San Bernardo hacia el proyecto.</h2></div><p>La Región Metropolitana es nuestra base operativa. Despachos, proyectos regionales e instalación se evalúan de acuerdo con el tipo de trabajo, destino y alcance requerido.</p></div><div className="v2-actions"><Link className="v2-btn orange" href="/cotizar">Cuéntanos qué necesitas</Link><Link className="v2-btn outline" href="/contacto">Contacto</Link></div></div></section>
 </main>}
