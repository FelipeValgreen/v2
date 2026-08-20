export const PIPELINE_GROUPS = [
  { key: "entrada", label: "Entrada", statuses: ["nuevo", "contactado"] },
  { key: "calificacion", label: "Calificación", statuses: ["calificado", "requerimiento_completo"] },
  { key: "cotizacion", label: "Cotización", statuses: ["cotizando", "cotizado", "seguimiento", "negociacion"] },
  { key: "ganados", label: "Ganados", statuses: ["ganado", "produccion", "entregado"] },
  { key: "perdidos", label: "Perdidos", statuses: ["perdido"] },
] as const;

export type PipelineGroupKey = (typeof PIPELINE_GROUPS)[number]["key"];

export function commercialCategoryLabel(raw: string) {
  const value = raw.toLowerCase();
  if (value.includes("camar")) return "Camas / camarotes";
  if (value.includes("cierre") || value.includes("reja") || value.includes("porton")) return "Cierres / rejas / portones";
  if (value.includes("estructura")) return "Estructuras";
  if (value.includes("equip")) return "Equipamiento";
  if (value.includes("especial")) return "Fabricación especial";
  if (value.includes("pintura")) return "Pintura electrostática";
  if (value.includes("fabric")) return "Fabricación metálica";
  return raw || "Sin clasificar";
}

export function pipelineGroupForStatus(status: string) {
  return PIPELINE_GROUPS.find((group) => (group.statuses as readonly string[]).includes(status))?.key ?? "entrada";
}
