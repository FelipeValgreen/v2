import {publicAddressDisplay} from "@/lib/contact";

const encodedAddress=encodeURIComponent("Portezuelo 1506, San Bernardo, Región Metropolitana, Chile");
const googleDirections=`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
const wazeDirections=`https://www.waze.com/ul?q=${encodedAddress}&navigate=yes`;
const embedUrl=`https://www.google.com/maps?q=${encodedAddress}&output=embed`;

export function MapPanel({compact=false}:{compact?:boolean}){
 return <section className={compact?"rinon-map-panel compact":"rinon-map-panel"} id="ubicacion" aria-labelledby="ubicacion-title">
  <div className="rinon-map-frame"><iframe title="Ubicación de RINON en San Bernardo" src={embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div>
  <div className="rinon-map-copy">
   <span className="v2-eyebrow">TALLER · SAN BERNARDO</span>
   <h2 id="ubicacion-title">Ven a RINON.</h2>
   <p>{publicAddressDisplay()}<br/>Región Metropolitana</p>
   <p className="rinon-map-note">Antes de visitar, coordina tu requerimiento para que podamos orientarte con el contexto correcto.</p>
   <div className="rinon-map-actions">
    <a href={googleDirections} target="_blank" rel="noopener noreferrer" data-event="maps_click" data-cta-location="location">Cómo llegar en Google Maps <span>↗</span></a>
    <a href={wazeDirections} target="_blank" rel="noopener noreferrer" data-event="waze_click" data-cta-location="location">Cómo llegar en Waze <span>↗</span></a>
   </div>
  </div>
 </section>
}
