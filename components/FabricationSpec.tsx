import type { FabricationSpec } from "@/lib/fabrication-spec";

export function FabricationSpecPanel({ spec, mode = "default" }: { spec: FabricationSpec; mode?: "default" | "theatre" }) {
  return (
    <div className={`fabrication-spec ${mode === "theatre" ? "is-theatre" : ""}`} data-visual-kind="fabrication-spec">
      <div className="fabrication-spec-mark" aria-hidden="true" />
      <div className="fabrication-spec-body">
        <div className="fabrication-spec-head">
          <span>{spec.eyebrow}</span>
          <i aria-hidden="true" />
        </div>
        <ul className="fabrication-spec-grid">
          {spec.items.map((item, index) => (
            <li key={item.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <b>{item.name}</b>
              <small>{item.note}</small>
            </li>
          ))}
        </ul>
      </div>
      <p className="fabrication-spec-foot">{spec.footnote}</p>
    </div>
  );
}
