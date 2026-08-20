import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RINON Soluciones Metálicas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{
      width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden",
      background: "#111315", color: "#F7F7F5", fontFamily: "Arial, sans-serif",
      padding: "72px 76px", alignItems: "flex-end",
    }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", opacity: .18 }}>
        <div style={{ position: "absolute", width: 520, height: 520, right: -80, top: 40, border: "1px solid #CCCDD2", transform: "rotate(30deg)" }} />
        <div style={{ position: "absolute", width: 420, height: 420, right: 110, top: 120, border: "1px solid #384148", transform: "rotate(30deg)" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 900, position: "relative" }}>
        <div style={{ color: "#F58220", fontSize: 22, letterSpacing: 5, fontWeight: 700, marginBottom: 24 }}>RINON · SOLUCIONES METÁLICAS</div>
        <div style={{ fontSize: 74, lineHeight: .95, fontWeight: 800, letterSpacing: -3, maxWidth: 900 }}>Lo necesitas en metal.<br/>Lo fabricamos.</div>
        <div style={{ fontSize: 25, color: "#CCCDD2", marginTop: 32 }}>Fabricación metálica · San Bernardo · Santiago</div>
      </div>
      <div style={{ width: 18, height: 130, background: "#F58220", position: "absolute", left: 0, bottom: 72 }} />
    </div>,
    size,
  );
}
