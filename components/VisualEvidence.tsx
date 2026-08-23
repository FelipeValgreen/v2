import Image from "next/image";
import { getVisuals } from "@/lib/visuals";

export function VisualEvidence({ slug, fallback, mode="default" }: { slug: string; fallback: string[]; mode?:"default"|"theatre" }) {
  const visuals = getVisuals(slug);
  if (!visuals.length) {
    return <div className="evidence-guide" data-visual-kind="technical-guide">
      <div className="evidence-grid-mark" aria-hidden="true"><span/><span/><span/><span/><span/><span/></div>
      <div className="evidence-guide-copy">
        <span>QUÉ CONVIENE REVISAR</span>
        <b>{fallback[0]}</b>
        <ul>{fallback.slice(1).map((item)=><li key={item}>{item}</li>)}</ul>
        <small>La cotización confirma configuración, alcance y antecedentes aplicables al trabajo específico.</small>
      </div>
    </div>;
  }

  const hero = visuals[0];
  const verified = hero.provenance === "verified-rinon";
  const conceptual = hero.provenance === "conceptual";
  const archiveReference = hero.provenance === "user-drive-reference";
  const archiveRender = archiveReference && hero.kind === "render";
  const provenanceLabel = verified
    ? "EVIDENCIA RINON VERIFICADA"
    : archiveRender
      ? "REFERENCIA ARQUITECTÓNICA · RENDER"
      : archiveReference
        ? "REFERENCIA DE PRODUCTO · ARCHIVO"
        : conceptual
          ? "VISUAL CONCEPTUAL"
          : "PRODUCTO / REFERENCIA ACTUAL";
  return <figure
    className={`evidence-photo ${conceptual ? "is-conceptual" : ""} ${archiveReference ? "is-archive-reference" : ""} ${archiveRender ? "is-archive-render" : ""} ${mode === "theatre" ? "is-theatre" : ""}`}
    data-visual-kind={hero.kind}
    data-visual-provenance={hero.provenance}
    data-source-width={hero.sourceWidth}
    data-source-height={hero.sourceHeight}
  >
    <Image
      src={hero.src}
      alt={hero.alt}
      fill
      sizes={mode === "theatre" ? "(max-width: 900px) 100vw, 58vw" : "(max-width: 900px) 100vw, 52vw"}
      priority={mode === "theatre"}
      unoptimized={Boolean(hero.sourceWidth && hero.sourceHeight)}
    />
    <figcaption>
      <span>{provenanceLabel}</span>
      {mode === "default" ? <><b>{hero.label}</b>{hero.note ? <small>{hero.note}</small> : null}</> : null}
    </figcaption>
  </figure>;
}
