export type CapabilityStatus =
  | "confirmed"
  | "conditional"
  | "validation_required"
  | "in_enablement"
  | "not_claimable";

export type Capability = {
  key: string;
  label: string;
  status: CapabilityStatus;
  publicClaim: string;
  internalNote: string;
  launchEnv?: string;
};

/**
 * Release truth registry.
 * "confirmed" means the offer itself can be communicated, not that every
 * dimension, material, delivery model or certification is automatically true.
 * Specific technical limits still require their own evidence.
 */
export const capabilities: Capability[] = [
  { key: "metal_beds", label: "Camas metálicas", status: "confirmed", publicClaim: "Fabricación de camas metálicas.", internalNote: "Modelos/dimensiones vigentes still require product-level validation." },
  { key: "metal_bunks", label: "Camarotes metálicos", status: "confirmed", publicClaim: "Fabricación de camarotes metálicos.", internalNote: "Do not infer safety ratings or load capacities." },
  { key: "volume_fabrication", label: "Fabricación por volumen", status: "confirmed", publicClaim: "Se pueden evaluar compras y fabricaciones por volumen.", internalNote: "No numeric production capacity until measured." },
  { key: "perimeter_closures", label: "Cierres perimetrales", status: "confirmed", publicClaim: "Fabricación de soluciones de cierre perimetral.", internalNote: "Installation scope remains project-dependent." },
  { key: "metal_grilles", label: "Rejas metálicas", status: "confirmed", publicClaim: "Fabricación de rejas metálicas.", internalNote: "No universal profile/height/security rating claims." },
  { key: "metal_gates", label: "Portones metálicos", status: "confirmed", publicClaim: "Fabricación de portones metálicos.", internalNote: "Automation and hot-dip galvanizing require separate confirmation." },
  { key: "custom_structures", label: "Estructuras metálicas a medida", status: "confirmed", publicClaim: "Fabricación de estructuras metálicas a medida dentro del alcance evaluado.", internalNote: "Engineering/calculation is not implied." },
  { key: "metal_equipment", label: "Equipamiento metálico", status: "confirmed", publicClaim: "Fabricación de equipamiento metálico sujeto a requerimiento.", internalNote: "Certified rack loads are not implied." },
  { key: "cut_dimension", label: "Corte y dimensionado", status: "confirmed", publicClaim: "Corte y dimensionado forman parte del flujo de fabricación cuando corresponde.", internalNote: "Machine list and maximum sizes not published yet." },
  { key: "bending", label: "Doblez / plegado", status: "confirmed", publicClaim: "Doblez y conformado pueden formar parte del flujo de fabricación según pieza y requerimiento.", internalNote: "No publicar tonelaje, largo útil, espesores ni máquina sin respaldo específico." },
  { key: "mig_welding", label: "Soldadura MIG", status: "confirmed", publicClaim: "Soldadura MIG dentro del flujo de fabricación aplicable.", internalNote: "No WPS/PQR or welder certification claims without evidence." },
  { key: "assembly", label: "Armado", status: "confirmed", publicClaim: "Armado de conjuntos y estructuras dentro del alcance evaluado.", internalNote: "Do not imply structural certification." },
  { key: "drawing_review", label: "Revisión y generación de planos de fabricación", status: "conditional", publicClaim: "Los antecedentes y planos de fabricación pueden revisarse o desarrollarse como parte del alcance cuando corresponde.", internalNote: "No confundir con ingeniería estructural, memoria de cálculo, firma profesional o certificación." },
  { key: "installation", label: "Despacho / instalación", status: "conditional", publicClaim: "Despacho e instalación se evalúan por proyecto y ubicación.", internalNote: "Never convert dispatch coverage into installation coverage." },
  { key: "repairs", label: "Reparaciones metálicas", status: "confirmed", publicClaim: "Se pueden evaluar reparaciones, modificaciones y recuperación de piezas y conjuntos metálicos.", internalNote: "Repair viability depends on material, damage, geometry and function; never guarantee repair before evaluation." },
  { key: "structural_steel", label: "Acero estructural", status: "confirmed", publicClaim: "Fabricación en acero dentro de las especificaciones verificadas del proyecto.", internalNote: "Grade/profile availability must be confirmed per quote." },
  { key: "stainless", label: "Acero inoxidable", status: "confirmed", publicClaim: "Se pueden evaluar fabricaciones en acero inoxidable según geometría, proceso y requerimiento.", internalNote: "No publicar grados, espesores, terminaciones ni soldadura especializada sin cotización/evidencia específica." },
  { key: "aluminium", label: "Aluminio estructural", status: "confirmed", publicClaim: "Se pueden evaluar fabricaciones en aluminio estructural según geometría, proceso y requerimiento.", internalNote: "No publicar aleaciones, espesores, procesos de unión ni cargas sin respaldo específico." },
  {
    key: "powder_coating",
    label: "Pintura electrostática al horno",
    status: "confirmed",
    publicClaim: "Servicio de pintura electrostática al horno sujeto a evaluación de piezas, dimensiones, preparación, color, cantidad y alcance.",
    internalNote: "Service offer confirmed by owner. Do not publish useful oven dimensions, universal colors, preparation grade, capacity, warranty or durability without separate evidence.",
  },
  {
    key: "sandblasting",
    label: "Granallado / sandblasting",
    status: "in_enablement",
    publicClaim: "No se comercializa como servicio operativo hasta completar habilitación y validación.",
    internalNote: "Confirm own vs subcontracted, equipment limits, media and guaranteed preparation grades.",
    launchEnv: "RINON_GRANALLADO_LAUNCH_ENABLED",
  },
  { key: "structural_engineering", label: "Ingeniería / memoria de cálculo", status: "not_claimable", publicClaim: "No incluida por defecto.", internalNote: "Only publish if scope and professional responsibility are explicitly validated." },
  { key: "welding_certification", label: "Certificaciones de soldadura", status: "not_claimable", publicClaim: "No se comunica certificación sin respaldo específico.", internalNote: "No WPS/PQR/welder qualification claims without evidence." },
  { key: "certified_loads", label: "Cargas certificadas", status: "not_claimable", publicClaim: "No se comunican capacidades certificadas sin ingeniería y respaldo específico.", internalNote: "Applies especially to racks/platforms." },
];

export function getCapability(key: string) {
  return capabilities.find((capability) => capability.key === key);
}

export function isCapabilityLaunchEnabled(key: string) {
  const capability = getCapability(key);
  if (!capability) return false;
  if (capability.status === "confirmed" || capability.status === "conditional") return true;
  if (!capability.launchEnv) return false;
  return process.env[capability.launchEnv] === "true";
}

const solutionCapabilityGate: Record<string, string> = {
  "/pintura-electrostatica": "powder_coating",
  "/tratamiento-superficies": "powder_coating",
};

export function getSolutionCapabilityKey(pathname: string) {
  return solutionCapabilityGate[pathname];
}

export function isSolutionLaunchEnabled(pathname: string) {
  const key = getSolutionCapabilityKey(pathname);
  return key ? isCapabilityLaunchEnabled(key) : true;
}

export function getSolutionReleaseNotice(pathname: string) {
  const key = getSolutionCapabilityKey(pathname);
  if (!key) return null;
  const capability = getCapability(key);
  if (!capability || isCapabilityLaunchEnabled(key)) return null;
  return {
    label: "SERVICIO EN REVISIÓN",
    title: `${capability.label} todavía no está disponible para cotización online.`,
    body: capability.publicClaim,
  };
}
