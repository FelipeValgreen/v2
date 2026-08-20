import { getReferencePhotos } from "@/lib/visuals";

export function ProductReferenceGallery({slug}:{slug:string}){
  const visuals=getReferencePhotos(slug);
  if(!visuals.length)return null;
  const [primary,...rest]=visuals;
  return <div className="v2-product-gallery" aria-label="Referencias actuales de producto">
    <figure className="v2-product-gallery-main"><img src={primary.src} alt={primary.alt}/><figcaption><span>PRODUCTO / REFERENCIA ACTUAL</span><b>{primary.label}</b><small>{primary.note||"Configuración, medidas y elementos incluidos se confirman en la cotización vigente."}</small></figcaption></figure>
    <div className="v2-product-gallery-side">{rest.slice(0,2).map((item)=><figure key={item.src}><img src={item.src} alt={item.alt}/><figcaption><span>REFERENCIA</span><b>{item.label}</b></figcaption></figure>)}<div className="v2-product-gallery-guide"><span>ANTES DE COTIZAR</span><b>Medidas · cantidad · destino</b><p>Una referencia visual ayuda a elegir el punto de partida; el alcance final queda definido por escrito.</p></div></div>
  </div>
}
