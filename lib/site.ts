export type SolutionItem = { title: string; body: string };
export type Solution = {
  slug: string;
  label: string;
  seoTitle?: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  bullets: SolutionItem[];
  evidence: string[];
  applications: string[];
  quoteInputs: string[];
  faqs: Array<{q:string;a:string}>;
  related?: Array<{label:string;href:string}>;
  quoteCategory: string;
};

export const solutions: Solution[] = [
  {
    slug: "/camarotes",
    label: "Camas y camarotes",
    seoTitle: "Camarotes y camas metálicas en Santiago",
    eyebrow: "CAMAS Y CAMAROTES METÁLICOS",
    title: "Camas y camarotes metálicos.",
    description: "Camas y camarotes metálicos para hogares, instituciones, faenas, residencias y compras por volumen.",
    intro: "Puedes partir por un modelo de referencia o explicar cuántas personas necesitas alojar, dónde se utilizarán y qué restricciones de espacio existen. RINON evalúa la configuración antes de confirmar fabricación, despacho o armado.",
    bullets: [
      {title:"Camarotes metálicos",body:"Configuraciones de dos o más niveles sujetas al modelo vigente y al uso requerido."},
      {title:"Camas metálicas",body:"Soluciones individuales y configuraciones relacionadas para equipamiento residencial o institucional."},
      {title:"Configuraciones especiales",body:"Medidas o combinaciones distintas pueden evaluarse cuando sean técnicamente fabricables."},
      {title:"Compras por volumen",body:"Para instituciones y empresas, la cantidad, destino y calendario se revisan como parte del requerimiento."},
    ],
    evidence: ["producto completo", "uniones y terminación", "escala o cantidad", "contexto de uso verificable"],
    applications: ["Hogar", "Instituciones", "Faenas y campamentos", "Residencias y hospedaje"],
    quoteInputs: ["Configuración o referencia", "Cantidad", "Destino o ubicación", "Medidas especiales si aplican"],
    faqs: [
      {q:"¿Fabrican por volumen?",a:"Sí, se pueden evaluar compras por volumen. Para hacerlo correctamente necesitamos cantidad, configuración, destino y fecha objetivo."},
      {q:"¿Puedo pedir una medida especial?",a:"Puede evaluarse. La factibilidad y cualquier ajuste de precio se confirman para el modelo y requerimiento específico."},
      {q:"¿Puedo cotizar para una institución o faena?",a:"Sí. Indica cantidad, destino, tipo de uso y cualquier requisito de logística o instalación que deba considerarse."}
    ],
    related: [{label:"Camarote con escritorio",href:"/camarote-con-escritorio"}],
    quoteCategory: "camarotes",
  },
  {
    slug: "/cierres-perimetrales",
    label: "Cierres y protecciones",
    seoTitle: "Cierres perimetrales, rejas y portones en Santiago",
    eyebrow: "CIERRES PERIMETRALES",
    title: "Cierres y protecciones metálicas.",
    description: "Cierres perimetrales para obras, bodegas, industria, condominios y terrenos.",
    intro: "Un buen presupuesto parte por entender el perímetro: metros aproximados, altura, accesos, condiciones del terreno y ubicación. Con esos antecedentes se puede definir qué sistema conviene evaluar.",
    bullets: [
      {title:"Cierres perimetrales",body:"Soluciones metálicas para delimitar y proteger perímetros en contextos residenciales, comerciales e industriales."},
      {title:"Mallas y divisiones",body:"Separaciones y paneles metálicos para ordenar sectores, recintos, bodegas y zonas de trabajo."},
      {title:"Rejas",body:"Rejas fabricadas según medidas, contexto de uso y terminación requerida."},
      {title:"Portones y accesos",body:"Accesos metálicos que se evalúan junto con el vano, tipo de apertura y condiciones de apoyo."},
    ],
    evidence: ["cierre instalado", "poste, base y unión", "escala del perímetro", "detalle de terminación"],
    applications: ["Obras y construcción", "Bodegas e industria", "Condominios y estacionamientos", "Terrenos y perímetros"],
    quoteInputs: ["Metros lineales aproximados", "Altura", "Ubicación", "Fotos del perímetro y accesos"],
    faqs: [
      {q:"¿Pueden evaluar con medidas aproximadas?",a:"Sí, sirven para una primera evaluación. La definición final dependerá del sistema, terreno, accesos y alcance de instalación."},
      {q:"¿El cierre puede incluir portón?",a:"Sí, el acceso puede evaluarse como parte del conjunto cuando el tipo de portón solicitado esté dentro del alcance del proyecto."},
      {q:"¿Hacen instalación?",a:"La instalación se evalúa según proyecto y ubicación. Indica dónde se ejecutará el trabajo para incluirla correctamente en la revisión."}
    ],
    related: [{label:"Rejas metálicas",href:"/rejas-metalicas"},{label:"Portones metálicos",href:"/portones-metalicos"}],
    quoteCategory: "cierres",
  },
  {
    slug: "/estructuras-metalicas",
    label: "Estructuras metálicas",
    seoTitle: "Estructuras metálicas a medida en Santiago",
    eyebrow: "ESTRUCTURAS METÁLICAS",
    title: "Estructuras metálicas a medida.",
    description: "Fabricación de estructuras metálicas a medida para habilitación, soportes, plataformas, escaleras y proyectos especiales.",
    intro: "Si ya tienes plano, medidas o fotografías, envíalos. Si todavía estás definiendo el proyecto, describe qué debe resolver la estructura y el lugar donde se utilizará. La fabricación se confirma una vez revisado el alcance técnico.",
    bullets: [
      {title:"Escaleras y plataformas",body:"Elementos de acceso o trabajo fabricados a medida cuando el alcance está correctamente definido."},
      {title:"Soportes y bastidores",body:"Marcos, soportes, bases y conjuntos para habilitación o apoyo de equipos y procesos."},
      {title:"Estructuras de habilitación",body:"Soluciones livianas o medianas para organizar, proteger o habilitar espacios de trabajo."},
      {title:"Proyectos especiales",body:"Estructuras no estándar que requieren revisión de uso, dimensiones, material y forma de montaje."},
    ],
    evidence: ["estructura completa", "detalle de unión", "fabricación en taller", "montaje o resultado"],
    applications: ["Habilitación", "Soportes y bastidores", "Plataformas y escaleras", "Proyectos especiales"],
    quoteInputs: ["Plano, croquis o foto", "Dimensiones", "Uso y cargas si están definidas", "Ubicación y necesidad de montaje"],
    faqs: [
      {q:"¿Pueden cotizar desde un croquis?",a:"Sí, puede servir para iniciar la evaluación. Si el proyecto requiere antecedentes técnicos adicionales, se solicitan antes de fabricar."},
      {q:"¿Incluyen cálculo estructural?",a:"No está incluido por defecto. Si un proyecto requiere ingeniería o memoria de cálculo, ese alcance debe definirse expresamente antes de cotizarlo como parte del servicio."},
      {q:"¿Fabrican una sola unidad?",a:"Puede evaluarse. La factibilidad depende de la pieza, complejidad, material y capacidad necesaria para producirla."}
    ],
    related: [{label:"Fabricación metálica",href:"/fabricacion-metalica"},{label:"Fabricaciones especiales",href:"/fabricaciones-especiales"}],
    quoteCategory: "estructuras",
  },
  {
    slug: "/equipamiento-metalico",
    label: "Equipamiento metálico",
    seoTitle: "Equipamiento metálico a medida en Santiago",
    eyebrow: "EQUIPAMIENTO METÁLICO",
    title: "Equipamiento metálico.",
    description: "Racks, estanterías, lockers, gabinetes, soportes y equipamiento metálico sujeto a requerimiento.",
    intro: "En vez de partir por un catálogo infinito, cuéntanos qué necesitas almacenar, ordenar, proteger o equipar. Las dimensiones, cantidad y uso permiten definir si corresponde un modelo vigente o una fabricación a medida.",
    bullets: [
      {title:"Racks y estanterías",body:"Configuraciones para almacenamiento y organización, con cargas y geometría definidas para cada proyecto."},
      {title:"Lockers y gabinetes",body:"Equipamiento metálico para instituciones, faenas, bodegas y espacios de apoyo."},
      {title:"Soportes",body:"Bases, marcos y elementos auxiliares adaptados al equipo o espacio que deben servir."},
      {title:"Equipamiento a medida",body:"Piezas o conjuntos fabricados cuando una solución estándar no resuelve correctamente el requerimiento."},
    ],
    evidence: ["producto completo", "detalle constructivo", "uso operacional", "producción por lote"],
    applications: ["Bodegas", "Operación industrial", "Instituciones", "Equipamiento de apoyo"],
    quoteInputs: ["Tipo de equipamiento", "Dimensiones o espacio", "Cantidad", "Uso esperado"],
    faqs: [
      {q:"¿Venden productos estándar o fabrican a medida?",a:"Ambos escenarios pueden evaluarse. Si existe una configuración vigente se cotiza como tal; si el requerimiento es distinto, se revisa la factibilidad de fabricación."},
      {q:"¿Puedo mandar una referencia?",a:"Sí. Una foto, croquis o producto de referencia ayuda a explicar el requerimiento, junto con medidas, cantidad y uso."},
      {q:"¿Cómo definen la capacidad de un rack?",a:"Las cargas no deben asumirse. Si el proyecto depende de una capacidad específica, debe informarse para que el alcance técnico se defina antes de fabricar."}
    ],
    related: [{label:"Fabricaciones especiales",href:"/fabricaciones-especiales"}],
    quoteCategory: "equipamiento",
  },
  {
    slug: "/fabricaciones-especiales",
    label: "Fabricaciones especiales",
    seoTitle: "Fabricaciones metálicas especiales en Santiago",
    eyebrow: "FABRICACIONES ESPECIALES",
    title: "Fabricaciones especiales.",
    description: "Piezas, conjuntos, bases, soportes y fabricaciones especiales desde plano, muestra, fotografía, croquis o medidas.",
    intro: "No necesitas conocer el nombre técnico exacto para consultar. Explica la función de la pieza y comparte el mejor antecedente disponible. A partir de ahí se revisan geometría, material, cantidad y factibilidad.",
    bullets: [
      {title:"Piezas y conjuntos",body:"Fabricaciones soldadas o armadas para resolver una función específica dentro de un proyecto u operación."},
      {title:"Bases y soportes",body:"Elementos diseñados alrededor de medidas, puntos de apoyo y condiciones de uso conocidas."},
      {title:"Desde muestra o croquis",body:"Una muestra, fotografía o dibujo puede iniciar la conversación cuando todavía no existe un plano formal."},
      {title:"Unidad, lote o serie",body:"La cantidad forma parte de la evaluación para definir proceso, repetibilidad y logística."},
    ],
    evidence: ["requerimiento inicial", "proceso de fabricación", "detalle constructivo", "pieza terminada"],
    applications: ["Maquinaria y operación", "Soportes y bases", "Protecciones", "Conjuntos no estándar"],
    quoteInputs: ["Plano, foto, muestra o croquis", "Cantidad", "Dimensiones", "Uso o contexto de la pieza"],
    faqs: [
      {q:"¿Qué pasa si no sé el nombre técnico?",a:"No es problema. Describe qué debe hacer la pieza, dónde se usa y aporta fotografías, medidas o referencias si las tienes."},
      {q:"¿Pueden fabricar desde una muestra?",a:"Puede evaluarse caso a caso según geometría, material, tolerancias y posibilidad de medir o reproducir correctamente la muestra."},
      {q:"¿Hacen series?",a:"Sí se pueden evaluar lotes o series. Indica cantidad estimada para considerar repetibilidad y capacidad desde el inicio."}
    ],
    related: [{label:"Fabricación metálica",href:"/fabricacion-metalica"}],
    quoteCategory: "especiales",
  },
  {
    slug: "/fabricacion-metalica",
    label: "Fabricación metálica",
    seoTitle: "Fabricación metálica a medida en San Bernardo",
    eyebrow: "FABRICACIÓN METÁLICA",
    title: "Fabricación metálica a medida.",
    description: "Fabricación metálica a medida en San Bernardo para productos, estructuras, componentes y proyectos por lote.",
    intro: "RINON reúne fabricación de productos y trabajos a medida en un mismo taller. Para evaluar correctamente necesitamos entender qué se fabrica, cuántas unidades son, qué antecedentes existen y dónde se utilizará el resultado.",
    bullets: [
      {title:"Revisión del requerimiento",body:"Partimos por uso, medidas, cantidad y antecedentes disponibles antes de definir el trabajo."},
      {title:"Corte y dimensionado",body:"Preparación de piezas dentro del flujo de fabricación aplicable al proyecto."},
      {title:"Soldadura MIG y armado",body:"Unión y armado de conjuntos cuando corresponde al diseño y material del trabajo."},
      {title:"Terminación y entrega",body:"El acabado, despacho e instalación se definen según el alcance específico de cada proyecto."},
    ],
    evidence: ["taller y proceso", "medición y preparación", "soldadura y armado", "resultado terminado"],
    applications: ["Productos", "Estructuras", "Componentes", "Fabricación por lote"],
    quoteInputs: ["Qué se necesita fabricar", "Plano, foto o medidas", "Cantidad", "Uso y fecha objetivo"],
    faqs: [
      {q:"¿Trabajan solo con productos de catálogo?",a:"No. También se evalúan fabricaciones bajo requerimiento cuando están dentro de la capacidad del taller."},
      {q:"¿Puedo enviar un plano?",a:"Sí. También puedes enviar fotografías, croquis o medidas si todavía no existe un plano formal."},
      {q:"¿Qué procesos realizan?",a:"El alcance se define por proyecto. Corte, dimensionado, soldadura MIG y armado forman parte de las capacidades confirmadas; otros procesos se indican únicamente cuando estén disponibles para el trabajo."}
    ],
    related: [{label:"Estructuras metálicas",href:"/estructuras-metalicas"},{label:"Fabricaciones especiales",href:"/fabricaciones-especiales"}],
    quoteCategory: "fabricacion",
  },
  {
    slug: "/pintura-electrostatica",
    label: "Pintura electrostática",
    seoTitle: "Pintura electrostática para metal en Santiago",
    eyebrow: "PINTURA ELECTROSTÁTICA",
    title: "Pintura electrostática para metal.",
    description: "Pintura electrostática para piezas y estructuras metálicas, cotizada según geometría, cantidad, estado y terminación.",
    intro: "Para evaluar un lote se revisan tipo de pieza, cantidad, dimensiones, estado superficial y resultado esperado. El servicio se habilitará públicamente cuando sus límites operativos estén confirmados.",
    bullets: [
      {title:"Piezas y cantidades",body:"La geometría y el número de unidades ayudan a definir manipulación, secuencia y lote de trabajo."},
      {title:"Estado superficial",body:"La condición en que llegan las piezas puede cambiar la preparación necesaria antes de pintar."},
      {title:"Dimensiones",body:"Las medidas de cada pieza deben contrastarse con la capacidad real del proceso antes de confirmar recepción."},
      {title:"Color y terminación",body:"Se cotizan contra la disponibilidad operacional vigente del servicio."},
    ],
    evidence: ["pieza antes", "proceso real", "detalle de acabado", "serie terminada"],
    applications: ["Piezas metálicas", "Rejas y portones", "Equipamiento", "Series compatibles con el proceso"],
    quoteInputs: ["Tipo y cantidad de piezas", "Dimensiones", "Estado actual", "Color o terminación si están definidos"],
    faqs: [
      {q:"¿Cómo cotizan la pintura?",a:"Se revisan geometría, cantidad, dimensiones, estado de las piezas y preparación necesaria antes de confirmar el trabajo."},
      {q:"¿Qué dimensiones máximas pueden pintar?",a:"Ese dato se confirma contra las dimensiones útiles reales del proceso antes de aceptar el trabajo."},
      {q:"¿Qué colores tienen?",a:"La disponibilidad se confirma al cotizar de acuerdo con la operación vigente del servicio."}
    ],
    related: [{label:"Fabricación metálica",href:"/fabricacion-metalica"}],
    quoteCategory: "pintura",
  },
];

import { isSolutionLaunchEnabled } from "@/lib/capabilities";

export const publicSolutions = solutions.filter((solution) => isSolutionLaunchEnabled(solution.slug));
export const navSolutions = publicSolutions.filter((s) => ["/camarotes", "/cierres-perimetrales", "/estructuras-metalicas", "/fabricacion-metalica", "/pintura-electrostatica"].includes(s.slug));
