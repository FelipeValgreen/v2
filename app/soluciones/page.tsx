import Link from "next/link";
import {routeMetadata} from "@/lib/seo";
import {productNavGroups,serviceNavItems} from "@/lib/navigation";

export const metadata=routeMetadata("/soluciones","Productos y soluciones metálicas en Santiago","Explora productos y servicios de RINON: camarotes, camas, camas balinesas, mesas, escritorios, cierres, rejas, portones, mallas, estructuras y fabricación metálica a medida.");

const groupCopy:Record<string,{kicker:string;body:string}>={
 "Camas y descanso":{kicker:"CAMAS Y DESCANSO",body:"Camarotes, camas metálicas y camas balinesas para hogar, instituciones, exterior y compras por volumen."},
 "Mobiliario y equipamiento":{kicker:"MOBILIARIO",body:"Mesas, escritorios, racks, soportes y equipamiento para hogar, empresa e instituciones."},
 "Cierres y accesos":{kicker:"CIERRES Y ACCESOS",body:"Cierres, rejas, mallas y portones definidos según medidas, accesos, terreno y uso."},
 "Estructuras":{kicker:"ESTRUCTURAS",body:"Estructuras y fabricaciones especiales desde plano, foto, croquis, muestra o medidas."},
};

export default function SolutionsPage(){return <main className="v5-editorial-page rinon-product-finder">
 <section className="rinon-finder-hero"><div className="container"><div className="v2-eyebrow">PRODUCTOS RINON</div><h1>¿Qué necesitas?</h1><p>Busca primero por el producto o resultado. Si no encuentras algo que se parezca a tu idea, puedes pasar directamente a Proyectos a medida.</p><div className="v2-actions"><Link className="v2-btn orange" href="/fabricacion-metalica">Proyectos a medida</Link><Link className="v2-btn outline" href="/cotizar">Cotizar</Link></div></div></section>

 <section className="v2-solution-section"><div className="container"><div className="rinon-finder-grid">{productNavGroups.map((group,index)=>{const copy=groupCopy[group.label];return <section className="rinon-finder-family" key={group.label}><header><span>0{index+1} · {copy?.kicker??group.label}</span><h2>{group.label}</h2><p>{copy?.body}</p></header><div>{group.items.map(item=><Link key={item.href} href={item.href}><strong>{item.label}</strong><small>{item.description}</small><b>↗</b></Link>)}</div></section>})}</div></div></section>

 <section className="v2-solution-section soft"><div className="container"><div className="section-head"><div><div className="v2-eyebrow">SERVICIOS</div><h2>Cuando lo que necesitas es un trabajo del taller.</h2></div><p>Soldadura, corte, pintura, instalación y reparación tienen rutas propias. La fabricación a medida vive en Proyectos a medida para no duplicar conceptos.</p></div><div className="v2-resource-grid rinon-service-cards">{serviceNavItems.map(item=><Link className="resource-card" key={item.href} href={item.href}><span>SERVICIO</span><h3>{item.label}</h3><p>{item.description}</p><b>Ver servicio →</b></Link>)}</div></div></section>

 <section className="v2-final-cta"><div className="container"><div><div className="v2-eyebrow">NO APARECE LO QUE BUSCAS</div><h2>Podemos partir por una foto o una idea.</h2><p>Una referencia, croquis, muestra, medidas o explicación del problema pueden ser suficientes para iniciar la evaluación.</p></div><div className="v2-final-actions"><Link className="v2-btn orange" href="/fabricacion-metalica">Ver Proyectos a medida</Link><Link className="v2-btn outline" href="/cotizar">Cotizar</Link></div></div></section>
 </main>}
