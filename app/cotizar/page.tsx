import { Suspense } from "react";
import { QuoteForm } from "@/components/QuoteForm";
import { routeMetadata } from "@/lib/seo";
import { isLeadWriteConfigured } from "@/lib/leads";
import { isCapabilityLaunchEnabled } from "@/lib/capabilities";

export const metadata=routeMetadata("/cotizar", "Cotizar proyecto", "Envía una foto, plano, medidas o una descripción para que RINON pueda evaluar tu requerimiento.", { indexable: false });

const ways=[
 ["01","FOTO O REFERENCIA","Muéstranos algo parecido a lo que necesitas."],
 ["02","PLANO O CROQUIS","Puede ser técnico o simplemente una idea dibujada."],
 ["03","MEDIDAS","Aproximadas sirven para una primera revisión."],
 ["04","PROBLEMA","Explícanos qué necesitas resolver y para qué se usará."],
] as const;

export default function Page(){
 const leadWriteEnabled=isLeadWriteConfigured();
 const powderCoatingEnabled=isCapabilityLaunchEnabled("powder_coating");
 return <main className="v5-editorial-page rinon-quote-page">
  <section className="rinon-quote-hero">
   <div className="container rinon-quote-hero-grid">
    <div>
     <div className="v2-eyebrow">COTIZAR CON RINON</div>
     <h1>Cuéntanos qué necesitas fabricar.</h1>
     <p>No necesitas llegar con todo resuelto. Envíanos lo que ya tengas y te indicaremos qué falta para poder cotizar.</p>
     <div className="v2-kickers"><span>3 pasos</span><span>Sin tecnicismos innecesarios</span><span>Particular o empresa</span></div>
    </div>
    <aside className="rinon-proof-panel rinon-quote-proof" aria-label="Formas de iniciar una cotización">
     <span>PUEDES PARTIR CON</span>
     {ways.map(([n,title,body])=><div key={n}><b>{n}</b><strong>{title}</strong><p>{body}</p></div>)}
     <small>No prometemos plazo, precio ni factibilidad antes de revisar el caso.</small>
    </aside>
   </div>
  </section>

  <section className="v2-quote-section rinon-quote-section">
   <div className="container v2-quote-shell rinon-quote-shell">
    <aside className="rinon-quote-guide">
     <div className="v2-eyebrow">ANTES DE EMPEZAR</div>
     <h2>Con poco podemos empezar bien.</h2>
     <p>El formulario cambia según lo que selecciones. No te pediremos datos de cierres si estás cotizando una cama, ni datos de cama si necesitas una estructura.</p>
     <ul><li>Elige qué necesitas.</li><li>Agrega contexto útil.</li><li>Déjanos un canal de contacto.</li></ul>
     <small>En staging validamos el flujo sin guardar ni enviar tus datos.</small>
    </aside>
    <div className="rinon-quote-form-shell"><Suspense fallback={<p>Cargando formulario…</p>}><QuoteForm leadWriteEnabled={leadWriteEnabled} powderCoatingEnabled={powderCoatingEnabled}/></Suspense></div>
   </div>
  </section>
 </main>;
}
