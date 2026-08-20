import type { Solution } from "@/lib/site";

function compact(items: string[], max = 2) {
  return items.slice(0, max).join(" · ");
}

export function RequirementFlow({ solution }: { solution: Solution }) {
  const steps = [
    ["01", "Lo que ya tienes", compact(solution.quoteInputs)],
    ["02", "Lo que definimos", "Uso · dimensiones · cantidad · material · factibilidad · condiciones del proyecto."],
    ["03", "Lo que queda claro", "Qué se fabrica · qué incluye la propuesta · condiciones relevantes para producir y coordinar."],
  ] as const;
  return <section className="v5-requirement-flow" aria-label="Flujo de evaluación del requerimiento">
    <div className="container v5-flow-shell">
      <div className="v5-flow-intro">
        <span className="v2-eyebrow">DE LA CONSULTA A UNA PROPUESTA CLARA</span>
        <strong>No necesitas resolver todo antes de escribirnos.</strong>
      </div>
      <ol className="v5-flow-list">
        {steps.map(([n,title,body])=><li key={n}><span>{n}</span><b>{title}</b><p>{body}</p></li>)}
      </ol>
    </div>
  </section>;
}

export function RequirementFlowSimple({ entry, review }: { entry: string; review: string }) {
  const steps = [
    ["01", "Lo que ya tienes", entry],
    ["02", "Lo que definimos", review],
    ["03", "Lo que queda claro", "Qué se fabrica · qué incluye la propuesta · condiciones relevantes para producir y coordinar."],
  ] as const;
  return <section className="v5-requirement-flow" aria-label="Flujo de evaluación del requerimiento">
    <div className="container v5-flow-shell">
      <div className="v5-flow-intro"><span className="v2-eyebrow">DE LA CONSULTA A UNA PROPUESTA CLARA</span><strong>No necesitas resolver todo antes de escribirnos.</strong></div>
      <ol className="v5-flow-list">{steps.map(([n,title,body])=><li key={n}><span>{n}</span><b>{title}</b><p>{body}</p></li>)}</ol>
    </div>
  </section>;
}
