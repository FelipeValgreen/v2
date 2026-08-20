import { Suspense } from "react";
import { QuoteForm } from "@/components/QuoteForm";
import { routeMetadata } from "@/lib/seo";
import { isLeadWriteConfigured } from "@/lib/leads";
import { isCapabilityLaunchEnabled } from "@/lib/capabilities";
import { TechnicalVisual } from "@/components/TechnicalVisual";

export const metadata=routeMetadata("/cotizar", "Cotizar proyecto", "Envía antecedentes para que RINON pueda evaluar tu requerimiento.", { indexable: false });
export default function Page(){
  const leadWriteEnabled=isLeadWriteConfigured(); const powderCoatingEnabled=isCapabilityLaunchEnabled("powder_coating");
  return <main className="v5-editorial-page"><section className="v2-solution-hero"><div className="container v2-solution-hero-grid"><div><div className="v2-eyebrow">COTIZAR CON RINON</div><h1>Cuéntanos lo suficiente para poder evaluar.</h1><p>Plano, foto, croquis, cantidad, medidas aproximadas o una descripción del problema pueden ser un buen punto de partida.</p><div className="v2-kickers"><span>Cantidad</span><span>Medidas</span><span>Ubicación</span><span>Antecedentes</span></div></div><TechnicalVisual kind="fabrication" label="Menos supuestos. Mejor cotización." detail="Requerimiento · factibilidad · alcance · seguimiento" /></div></section><section className="v2-quote-section"><div className="container v2-quote-shell"><aside><div className="v2-eyebrow">ANTES DE ENVIAR</div><h2>Mientras más concreto el requerimiento, mejor.</h2><p>No necesitas tener todo resuelto. Lo importante es separar lo que ya sabes de lo que todavía debemos definir.</p><ul><li>Cantidad aproximada</li><li>Medidas o dimensiones relevantes</li><li>Foto, plano, croquis o muestra</li><li>Ubicación del proyecto</li><li>Fecha objetivo</li></ul></aside><div><Suspense fallback={<p>Cargando formulario…</p>}><QuoteForm leadWriteEnabled={leadWriteEnabled} powderCoatingEnabled={powderCoatingEnabled}/></Suspense></div></div></section></main>;
}
