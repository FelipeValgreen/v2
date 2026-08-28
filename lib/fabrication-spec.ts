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
  "/soldadura-mig": {
    eyebrow: "QUÉ SOLDADURA PODEMOS EVALUAR",
    items: [
      { name: "Uniones MIG", note: "Piezas y conjuntos metálicos dentro de un trabajo definido." },
      { name: "Armado", note: "Ensamble de partes cuando la geometría y el material son evaluables." },
      { name: "Reparación", note: "Recuperación sujeta al estado real de la pieza y su función." },
      { name: "Modificación", note: "Adaptaciones de medida, apoyo o configuración existente." },
      { name: "Lotes", note: "Trabajos repetibles cuando cantidad y preparación están claras." },
      { name: "Bajo plano", note: "Soldadura integrada a una fabricación con plano, croquis o referencia." },
    ],
    footnote:
      "La cotización define material, preparación, geometría, cantidad y terminación. No se comunica soldadura certificada, WPS, PQR ni calificación de soldador sin respaldo específico.",
  },
  "/corte-metalico": {
    eyebrow: "QUÉ CORTE PODEMOS EVALUAR",
    items: [
      { name: "Dimensionado", note: "Piezas preparadas según medidas confirmadas." },
      { name: "Piezas repetidas", note: "Series cortas o lotes cuando la geometría se puede repetir." },
      { name: "Componentes", note: "Partes para estructuras, soportes, bases o conjuntos." },
      { name: "Croquis", note: "Cortes desde dibujo simple cuando las medidas son legibles." },
      { name: "Plano", note: "Preparación de piezas cuando el antecedente técnico está definido." },
      { name: "Fabricación", note: "Corte integrado al flujo de soldadura, armado o terminación." },
    ],
    footnote:
      "La cotización confirma material, espesor, geometría, tolerancia y cantidad. No se publican dimensiones máximas, espesores universales ni capacidades de máquina sin respaldo específico.",
  },
  "/pintura-electrostatica": {
    eyebrow: "QUÉ PINTURA PODEMOS EVALUAR",
    items: [
      { name: "Piezas metálicas", note: "Elementos compatibles con la operación vigente del servicio." },
      { name: "Series", note: "Lotes sujetos a cantidad, manipulación y secuencia de trabajo." },
      { name: "Preparación", note: "Estado superficial revisado antes de confirmar recepción." },
      { name: "Geometría", note: "Forma y zonas críticas evaluadas antes de comprometer acabado." },
      { name: "Color", note: "Disponibilidad y terminación se confirman al cotizar." },
      { name: "Reacabado", note: "Recuperación de piezas solo si el estado permite evaluar el proceso." },
    ],
    footnote:
      "El servicio queda sujeto a pieza, dimensión, preparación, color, cantidad y alcance. No se publican dimensiones útiles, preparación garantizada, capacidad, garantía ni durabilidad universal.",
  },
};

export function getFabricationSpec(slug: string): FabricationSpec | null {
  return specs[slug] ?? null;
}

export const FABRICATION_SPEC_SLUGS = Object.keys(specs);
