import Link from "next/link";
import {routeMetadata} from "@/lib/seo";
import {TechnicalVisual} from "@/components/TechnicalVisual";
import {productNavGroups,serviceNavItems} from "@/lib/navigation";

export const metadata=routeMetadata("/soluciones","Productos y soluciones metálicas en Santiago","Explora productos y servicios de RINON: camarotes, camas, camas balinesas, mesas, escritorios, cierres, rejas, portones, mallas, estructuras y fabricación metálica a medida.");

const groupCopy:Record<string,{kicker:string;body:string}>={
 Descanso:{kicker:"DESCANSO",body:"Camas, camarotes y soluciones para hogar, instituciones, alojamientos y compras por volumen."},
 Mobiliario:{kicker:"MOBILIARIO",body:"Mesas, escritorios y equipamiento metálico para hogar, empresa e instituciones."},
 Cierres:{kicker:"PERÍMETRO / ACCESO",body:"Cierres, rejas, mallas y portones definidos según medidas, terreno, accesos y uso."},
 Proyectos:{kicker:"PROYECTO / A MEDIDA",body:"Estructuras y fabricaciones especiales desde plano, foto, croquis, muestra o requerimiento."},
};

export default function SolutionsPage(){return <main className="v5-editorial-page">
 <section className="v2-solution-hero"><div className="container v2-solution-hero-grid"><div><div className="v2-eyebrow">PRODUCTOS Y SERVICIOS RINON</div><h1>Encuentra la línea correcta antes de cotizar.</h1><p>La navegación está organizada por lo que necesitas comprar o resolver, no por una lista interna de procesos del taller.</p><div className="v2-kickers"><span>Productos</span><span>Servicios</span><span>Empresas</span><span>A medida</span></div></div><TechnicalVisual kind="fabrication" label="Una entrada clara para cada requerimiento." detail="Producto · cierre · mobiliario · proyecto · servicio"/></div></section>

 <section className="v2-solution-section"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">PRODUCTOS</div><h2>Cuatro familias para navegar sin un catálogo infinito.</h2></div><p>Cada familia tiene una landing propietaria y conecta con las variantes que realmente justifican una página específica.</p></div><div className="v2-resource-grid">{productNavGroups.map(group=>{const copy=groupCopy[group.label];return <article key={group.label}><span>{copy?.kicker??group.label}</span><h3>{group.label}</h3><p>{copy?.body}</p><div className="v2-link-stack">{group.items.map(item=><Link key={item.href} href={item.href}>{item.label} →</Link>)}</div></article>})}</div></div></section>

 <section className="v2-solution-section soft"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">SERVICIOS</div><h2>Lo que puedes pedirle directamente al taller.</h2></div><p>Mantenemos los nombres cortos en navegación. Procesos internos como doblez, armado o revisión de antecedentes se explican dentro de las páginas correspondientes sin saturar el menú.</p></div><div className="v2-resource-grid rinon-service-cards">{serviceNavItems.map(item=><Link className="resource-card" key={item.href} href={item.href}><span>SERVICIO</span><h3>{item.label}</h3><p>{item.description}</p><b>Ver servicio →</b></Link>)}</div></div></section>

 <section className="v2-solution-section"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">NO SABES DÓNDE ENCAJA</div><h2>También puedes partir por el problema.</h2></div><p>Una foto, un croquis, medidas aproximadas y una explicación del uso suelen bastar para ubicar el requerimiento en la línea correcta.</p></div><div className="v2-actions"><Link className="v2-btn orange" href="/cotizar">Enviar requerimiento</Link><Link className="v2-btn outline" href="/recursos">Ver guías para cotizar</Link></div></div></section>

 <section className="v2-final-cta"><div className="container"><div><div className="v2-eyebrow">SIGUIENTE PASO</div><h2>¿Ya sabes qué necesitas?</h2><p>Cuéntanos cantidad, ubicación y el mejor antecedente disponible.</p></div><Link className="v2-btn orange" href="/cotizar">Cotizar proyecto</Link></div></section>
 </main>}
