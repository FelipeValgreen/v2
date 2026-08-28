/**
 * Ficha de fabricación — evidencia cuando no hay fotografía verificada.
 *
 * Regla del sistema de evidencia visual: la fotografía manda. Cuando una
 * categoría no tiene foto verificada ni referencia de archivo utilizable, un
 * visual conceptual genérico no responde la única pregunta que el bloque tiene
 * delante ("¿qué me pueden fabricar aquí?"), y además arriesga leerse como una
 * obra ejecutada. Una ficha de lo que RINON efectivamente fabrica sí la
 * responde, sin inventar fotografía y sin depender de conseguir assets.
 *
 * Contenido acotado por lib/capabilities.ts: solo se declara lo que RINON
 * fabrica. No se declaran cargas certificadas, certificaciones de soldadura,
 * ingeniería estructural ni dimensiones universales.
 */

export type FabricationItem = {
  /** Qué se fabrica. Sustantivo comercial, en el lenguaje del cliente. */
  name: string;
  /** Una línea de contexto de uso reconocible. Nunca una especificación técnica. */
  note: string;
};

export type FabricationSpec = {
  eyebrow: string;
  items: FabricationItem[];
  /** Qué define la cotización y qué queda explícitamente fuera de alcance. */
  footnote: string;
};

const specs: Record<string, FabricationSpec> = {
  "/estructuras-metalicas": {
    eyebrow: "LO QUE FABRICAMOS EN ESTRUCTURAS",
    items: [
      { name: "Cobertizos", note: "Cubierta sobre estacionamiento, patio o acceso." },
      { name: "Pérgolas", note: "Estructura de sombra en terraza o jardín." },
      { name: "Escaleras", note: "Rectas, en L o de servicio, con baranda." },
      { name: "Plataformas", note: "Entrepisos y pasarelas de circulación." },
      { name: "Soportes", note: "Bases y bancadas para equipos o estanques." },
      { name: "Bajo plano", note: "Piezas y conjuntos según tu plano o croquis." },
    ],
    footnote:
      "La cotización define medidas, perfiles, anclajes y terminación. Fabricar una estructura no equivale a desarrollar su ingeniería: cuando el proyecto la requiere, se coordina aparte.",
  },
};

export function getFabricationSpec(slug: string): FabricationSpec | null {
  return specs[slug] ?? null;
}

export const FABRICATION_SPEC_SLUGS = Object.keys(specs);
