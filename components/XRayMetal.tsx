"use client";

import { useState } from "react";
import Image from "next/image";

type XRayKind = "product" | "perimeter" | "geometry";
type Props = { kind: XRayKind; image: string; title: string; description: string; eyebrow: string };
const labels: Record<XRayKind, string[]> = {
  product: ["estructura principal", "zona de unión", "configuración", "apoyo"],
  perimeter: ["poste", "paño", "altura", "continuidad"],
  geometry: ["columna", "viga", "nodo", "arriostramiento"],
};

function Overlay({ kind }: { kind: XRayKind }) {
  if (kind === "perimeter") return <svg viewBox="0 0 1000 620" aria-hidden="true" className="xray-svg"><g className="xray-lines"><path d="M80 115H900M80 490H900" /><path d="M145 70V545M370 70V545M595 70V545M820 70V545" /><path d="M95 160H875M95 235H875M95 310H875M95 385H875M95 460H875" /><path className="xray-dim" d="M55 115V490M42 115H68M42 490H68" /><path className="xray-dim" d="M145 555H820M145 542V568M820 542V568" /></g><g className="xray-nodes"><circle cx="145" cy="310" r="8"/><circle cx="370" cy="310" r="8"/><circle cx="595" cy="310" r="8"/><circle cx="820" cy="310" r="8"/></g><text x="18" y="310">ALTURA</text><text x="430" y="600">MODULACIÓN</text></svg>;
  if (kind === "geometry") return <svg viewBox="0 0 1000 620" aria-hidden="true" className="xray-svg"><g className="xray-lines"><path d="M130 500V150L335 80V500M335 80L610 155V500M610 155L865 105V500" /><path d="M130 150L610 155M335 80L865 105M130 500H865" /><path d="M130 330H865M335 80L610 330M610 155L335 330" /><path className="xray-dim" d="M95 150V500M82 150H108M82 500H108" /></g><g className="xray-nodes"><circle cx="130" cy="150" r="8"/><circle cx="335" cy="80" r="8"/><circle cx="610" cy="155" r="8"/><circle cx="865" cy="105" r="8"/><circle cx="335" cy="330" r="8"/><circle cx="610" cy="330" r="8"/></g><text x="20" y="330">COTA</text><text x="684" y="82">NODOS</text></svg>;
  return <svg viewBox="0 0 1000 620" aria-hidden="true" className="xray-svg"><g className="xray-lines"><path d="M170 100V515M650 100V515M170 125H650M170 315H650M170 515H650" /><path d="M170 125L650 315M650 125L170 315" opacity=".35" /><path className="xray-dim" d="M125 125V515M112 125H138M112 515H138" /><path className="xray-dim" d="M170 555H650M170 542V568M650 542V568" /></g><g className="xray-nodes"><circle cx="170" cy="125" r="8"/><circle cx="650" cy="125" r="8"/><circle cx="170" cy="315" r="8"/><circle cx="650" cy="315" r="8"/><circle cx="170" cy="515" r="8"/><circle cx="650" cy="515" r="8"/></g><text x="50" y="320">ALTURA</text><text x="345" y="600">ANCHO</text><text x="685" y="130">UNIÓN</text></svg>;
}

export function XRayMetal({ kind, image, title, description, eyebrow }: Props) {
  const [active, setActive] = useState(false);
  return <section className={`xray-metal xray-${kind} ${active ? "is-active" : ""}`}><div className="container xray-shell"><div className="xray-copy"><span className="prd2-kicker">{eyebrow}</span><h2>{title}</h2><p>{description}</p><button type="button" className="xray-toggle" aria-pressed={active} onClick={() => setActive(v => !v)}><span>{active ? "Ocultar estructura" : "Ver estructura"}</span><b>{active ? "×" : "+"}</b></button><div className="xray-legend">{labels[kind].map((label, i) => <span key={label}><i>{String(i + 1).padStart(2,"0")}</i>{label}</span>)}</div></div><div className="xray-stage"><Image src={image} alt="" fill sizes="(max-width: 900px) 100vw, 58vw" aria-hidden="true" /><div className="xray-darken" /><Overlay kind={kind} /><div className="xray-scan" /><div className="xray-badge"><b>VISUAL CONCEPTUAL</b><span>No corresponde a una obra ejecutada.</span></div></div></div></section>;
}
