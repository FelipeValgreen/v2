export type TechnicalVisualKind = "structure" | "fence" | "grille" | "gate" | "fabrication" | "special" | "equipment" | "surface";

function Drawing({ kind }: { kind: TechnicalVisualKind }) {
  if (kind === "fence") return <svg viewBox="0 0 600 420" aria-hidden="true"><g fill="none" stroke="currentColor"><path d="M70 325h460M90 80v245M510 80v245M90 102h420M90 305h420" strokeWidth="7"/><path d="M120 105v197M155 105v197M190 105v197M225 105v197M260 105v197M295 105v197M330 105v197M365 105v197M400 105v197M435 105v197M470 105v197" strokeWidth="3"/><path d="M90 204h420" strokeWidth="2"/><circle cx="90" cy="80" r="9" fill="currentColor"/><circle cx="510" cy="80" r="9" fill="currentColor"/></g></svg>;
  if (kind === "grille") return <svg viewBox="0 0 600 420" aria-hidden="true"><g fill="none" stroke="currentColor"><path d="M118 88h364v244H118z" strokeWidth="7"/><path d="M158 88v244M205 88v244M252 88v244M299 88v244M346 88v244M393 88v244M440 88v244" strokeWidth="4"/><path d="M118 154h364M118 265h364" strokeWidth="3"/><path d="M82 350h436M118 345v22M482 345v22M118 357h364" strokeWidth="2" strokeDasharray="7 7"/><path d="M110 357l8-5v10zM490 357l-8-5v10z" fill="currentColor" stroke="none"/></g></svg>;
  if (kind === "gate") return <svg viewBox="0 0 600 420" aria-hidden="true"><g fill="none" stroke="currentColor"><path d="M95 88v245M505 88v245M95 110h410M95 330h410" strokeWidth="7"/><path d="M125 118h330v204H125z" strokeWidth="5"/><path d="M165 118v204M205 118v204M245 118v204M285 118v204M325 118v204M365 118v204M405 118v204" strokeWidth="3"/><path d="M455 220h45M470 207l18 13-18 13" strokeWidth="3"/><path d="M125 354h330M125 345v18M455 345v18" strokeWidth="2" strokeDasharray="8 7"/></g></svg>;
  if (kind === "fabrication") return <svg viewBox="0 0 600 420" aria-hidden="true"><g fill="none" stroke="currentColor"><path d="M116 98h274l94 94v130H116z" strokeWidth="7"/><path d="M390 98v94h94" strokeWidth="7"/><path d="M165 255l95-95 42 42-95 95z" strokeWidth="5"/><path d="M222 198l42 42M335 254h100M335 284h75" strokeWidth="3"/><path d="M125 344h350" strokeWidth="2" strokeDasharray="9 9"/></g></svg>;
  if (kind === "special") return <svg viewBox="0 0 600 420" aria-hidden="true"><g fill="none" stroke="currentColor"><path d="M112 290l86-152h130l66 72h96v112H112z" strokeWidth="7"/><path d="M198 138l65 72-65 80M328 138v72h66M263 210h131" strokeWidth="4"/><circle cx="190" cy="322" r="18" strokeWidth="5"/><circle cx="416" cy="322" r="18" strokeWidth="5"/><path d="M90 354h420M150 84h210" strokeWidth="2" strokeDasharray="8 8"/><path d="M150 73v22M360 73v22" strokeWidth="2"/></g></svg>;
  if (kind === "equipment") return <svg viewBox="0 0 600 420" aria-hidden="true"><g fill="none" stroke="currentColor"><path d="M110 90h380v245H110zM110 165h380M110 245h380M195 90v245M405 90v245" strokeWidth="7"/><path d="M130 135h45M425 135h45M130 215h45M425 215h45M130 295h45M425 295h45" strokeWidth="3"/></g></svg>;
  if (kind === "surface") return <svg viewBox="0 0 600 420" aria-hidden="true"><g fill="none" stroke="currentColor"><rect x="105" y="108" width="180" height="190" rx="4" strokeWidth="7"/><rect x="315" y="108" width="180" height="190" rx="4" strokeWidth="7"/><path d="M145 145h100M145 180h100M145 215h100M145 250h100" strokeWidth="3" strokeDasharray="8 8"/><path d="M355 145h100M355 180h100M355 215h100M355 250h100" strokeWidth="5"/><path d="M285 203h30M300 188l15 15-15 15" strokeWidth="3"/><path d="M105 330h390" strokeWidth="2" strokeDasharray="9 9"/></g></svg>;
  return <svg viewBox="0 0 600 420" aria-hidden="true"><g fill="none" stroke="currentColor"><path d="M95 335V105h410v230M95 105l205-58 205 58M95 335h410M160 105v230M440 105v230M160 160h280M160 280h280" strokeWidth="7"/><path d="M115 320L280 115M320 115l165 205" strokeWidth="2" strokeDasharray="8 9"/><path d="M70 360h460" strokeWidth="2"/></g></svg>;
}

export function TechnicalVisual({ kind = "structure", label = "DEL REQUERIMIENTO A FABRICACIÓN", detail = "Corte · dimensionado · doblado · soldadura MIG · armado" }: { kind?: TechnicalVisualKind; label?: string; detail?: string }) {
  return <div className="v2-tech-stage" data-visual-kind="technical-render"><div className="v2-tech-grid" aria-hidden="true" /><div className="v2-tech-orange" aria-hidden="true" /><div className="v2-tech-drawing"><Drawing kind={kind} /></div><span className="v2-tech-code">RINON · SAN BERNARDO</span><div className="v2-tech-card"><strong>{label}</strong><small>{detail}</small></div></div>;
}

export function technicalKindForSlug(slug: string): TechnicalVisualKind {
  if (slug.includes("porton")) return "gate";
  if (slug.includes("reja")) return "grille";
  if (slug.includes("cierre")) return "fence";
  if (slug.includes("equipamiento")) return "equipment";
  if (slug.includes("pintura") || slug.includes("superficie")) return "surface";
  if (slug.includes("especial")) return "special";
  if (slug.includes("fabricacion")) return "fabrication";
  return "structure";
}
