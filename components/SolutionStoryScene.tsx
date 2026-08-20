import Link from "next/link";

const stories: Record<string, { kicker:string; title:string; body:string; note:string; href?:string; link?:string; className:string; }> = {
  "/camarotes": { kicker:"PRODUCT THEATRE", title:"Una unidad. O un lote completo.", body:"La conversación cambia cuando cambia la escala. Modelo, cantidad, destino y forma de entrega deben leerse como un solo requerimiento.", note:"Configuración → cantidad → destino", href:"/cotizar?category=camarotes", link:"Cotizar camarotes", className:"story-product" },
  "/cierres-perimetrales": { kicker:"PERIMETER SYSTEM", title:"El perímetro se entiende completo.", body:"Longitud, altura, apoyos y accesos forman un sistema. Cotizar solo metros lineales deja fuera decisiones que cambian el trabajo.", note:"Perímetro → accesos → apoyos", href:"/cotizar?category=cierres&detail=cierre", link:"Cotizar cierre", className:"story-perimeter" },
  "/estructuras-metalicas": { kicker:"GEOMETRY", title:"Primero función. Después geometría.", body:"Una estructura no empieza por elegir perfiles. Empieza por entender qué debe resolver, qué restricciones existen y qué antecedentes técnicos acompañan el proyecto.", note:"Función → geometría → alcance", href:"/cotizar?category=estructuras", link:"Cotizar estructura", className:"story-geometry" },
  "/fabricacion-metalica": { kicker:"TRANSFORMATION", title:"De referencia a pieza fabricable.", body:"Plano, foto, muestra o medidas pueden ser el inicio. La fabricación comienza cuando lo ambiguo queda convertido en una definición clara.", note:"Referencia → definición → metal", href:"/cotizar?category=fabricacion", link:"Cotizar fabricación", className:"story-transform" },
  "/fabricaciones-especiales": { kicker:"TRANSFORMATION", title:"Lo especial no necesita partir perfecto.", body:"Una muestra, una fotografía o un croquis pueden bastar para iniciar la conversación y descubrir qué información falta antes de fabricar.", note:"Idea → medidas → factibilidad", href:"/cotizar?category=especiales", link:"Cotizar pieza especial", className:"story-transform" },
  "/equipamiento-metalico": { kicker:"OPERATION", title:"El equipamiento se diseña alrededor del uso.", body:"Qué se almacena, cómo se accede, cuánto espacio existe y cuántas unidades se necesitan define mejor la solución que el nombre del mueble.", note:"Uso → espacio → cantidad", href:"/cotizar?category=equipamiento", link:"Cotizar equipamiento", className:"story-equipment" },
  "/rejas-metalicas": { kicker:"PERIMETER DETAIL", title:"La protección también forma parte del lugar.", body:"Vano, apoyos, acceso y separación definen una reja mejor que una medida aislada. La solución se conversa desde el contexto completo.", note:"Vano → apoyos → acceso", href:"/cotizar?category=cierres&detail=reja", link:"Cotizar reja", className:"story-perimeter" },
  "/portones-metalicos": { kicker:"ACCESS IN MOTION", title:"El movimiento importa tanto como el vano.", body:"Un portón necesita espacio para existir abierto, cerrado y en uso. La apertura se define junto con recorrido, apoyos y circulación.", note:"Vano → recorrido → uso", href:"/cotizar?category=cierres&detail=porton", link:"Cotizar portón", className:"story-perimeter" },
  "/camarote-con-escritorio": { kicker:"SPACE SYSTEM", title:"Dormir arriba. Trabajar abajo.", body:"La solución funciona cuando cama, escritorio, escalera y circulación se leen como una sola pieza de espacio, no como muebles separados.", note:"Altura → trabajo → circulación", href:"/cotizar?category=camarotes&detail=camarote_escritorio", link:"Cotizar configuración", className:"story-product" },
};

function Visual({ className }: { className:string }) {
  return <div className={`solution-story-visual ${className}`} aria-hidden="true"><div className="story-axis axis-a" /><div className="story-axis axis-b" /><div className="story-axis axis-c" /><div className="story-object object-a" /><div className="story-object object-b" /><div className="story-node node-a" /><div className="story-node node-b" /><div className="story-node node-c" /></div>;
}

export function SolutionStoryScene({ slug }: { slug:string }) {
  const story=stories[slug];
  if(!story)return null;
  return <section className={`solution-story ${story.className}`} data-reveal><div className="container solution-story-grid"><div className="solution-story-copy"><span>{story.kicker}</span><h2>{story.title}</h2><p>{story.body}</p><small>{story.note}</small>{story.href && story.link ? <Link href={story.href}>{story.link} <b>↗</b></Link> : null}</div><Visual className={story.className}/></div></section>;
}
