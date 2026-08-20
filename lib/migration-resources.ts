import type { ResourceArticle } from "@/lib/resources";

/**
 * New resources created specifically to preserve useful legacy editorial intent.
 * They avoid inheriting old prices, safety guarantees or unsupported technical claims.
 */
export const migrationResourceArticles: ResourceArticle[] = [
  {
    slug: "como-cotizar-rejas-metalicas",
    title: "Cómo cotizar rejas metálicas con antecedentes útiles",
    description: "Qué medir, fotografiar y definir antes de solicitar una cotización de rejas metálicas para ventanas, accesos, frontis o perímetros.",
    category: "Rejas metálicas",
    ownerHref: "/rejas-metalicas",
    ownerLabel: "Cotizar rejas",
    intro: "Una solicitud de reja se puede evaluar mucho mejor cuando distingue el vano o perímetro, el objetivo, la forma de fijación y la cantidad. No necesitas definir perfiles ni detalles de fabricación si todavía no los conoces.",
    sections: [
      { heading: "1. Identifica dónde irá la reja", body: "Indica si se trata de ventana, puerta, frontis, terraza, cierre u otro punto. Una fotografía general y otra más cercana ayudan a entender el contexto." },
      { heading: "2. Entrega medidas aproximadas", body: "Para vanos, ancho y alto. Para tramos, largo y altura deseada. Si existen varias unidades distintas, sepáralas para evitar mezclar cantidades." },
      { heading: "3. Explica qué debe resolver", body: "Protección, control de acceso, delimitación, ventilación o mantener visibilidad son objetivos diferentes y pueden llevar a configuraciones distintas." },
      { heading: "4. Muestra el soporte existente", body: "Muro, hormigón, estructura metálica, pilar u otro soporte condicionan cómo debe evaluarse la fijación y el alcance de instalación." },
    ],
    checklist: ["Tipo de vano o tramo", "Ancho/largo", "Altura", "Cantidad", "Fotos", "Objetivo", "Soporte existente", "Ubicación"],
  },
  {
    slug: "tipos-de-cierres-perimetrales",
    title: "Tipos de cierres perimetrales: cómo comparar alternativas",
    description: "Una guía para comparar cierres metálicos por función, visibilidad, terreno, accesos y contexto de uso sin reducir la decisión a un solo material.",
    category: "Cierres perimetrales",
    ownerHref: "/cierres-perimetrales",
    ownerLabel: "Evaluar cierre",
    intro: "No existe un tipo de cierre correcto para todos los proyectos. La comparación útil parte por la función del perímetro, el terreno, cuánto importa la visibilidad y qué accesos deben integrarse.",
    sections: [
      { heading: "1. Cierres abiertos o de alta visibilidad", body: "Rejas, mallas y paneles metálicos pueden ser apropiados cuando se necesita delimitar manteniendo lectura visual del recinto. La configuración exacta depende del proyecto." },
      { heading: "2. Soluciones con mayor privacidad", body: "Cuando la privacidad o el control visual son relevantes, conviene indicarlo desde el inicio para evaluar sistemas con mayor superficie cerrada o combinaciones específicas." },
      { heading: "3. Sistemas modulares o repetitivos", body: "En perímetros extensos, la repetibilidad de módulos puede ordenar fabricación e instalación, pero medidas, postes, bases y encuentros siguen necesitando definición." },
      { heading: "4. Accesos y terreno cambian el sistema", body: "Portones, puertas, pendientes, muros existentes y cambios de nivel deben analizarse junto con el cierre, no agregarse al final." },
    ],
    checklist: ["Función del cierre", "Metros lineales", "Altura", "Visibilidad/privacidad", "Terreno", "Accesos", "Fotos", "Ubicación"],
  },
  {
    slug: "porton-corredizo-vs-batiente",
    title: "Portón corredizo vs. batiente: qué revisar antes de elegir",
    description: "Compara portones corredizos y batientes según espacio lateral, barrido, pendiente, frecuencia de uso y condiciones del acceso.",
    category: "Portones metálicos",
    ownerHref: "/portones-metalicos",
    ownerLabel: "Cotizar portón",
    intro: "La forma de apertura no debería elegirse solo por estética. Un portón corredizo necesita recorrido lateral; uno batiente necesita área de barrido. El acceso existente normalmente define qué alternativas vale la pena evaluar.",
    sections: [
      { heading: "1. El corredizo necesita recorrido lateral", body: "Conviene medir cuánto espacio libre existe junto al vano y detectar pilares, muros, desniveles u obstáculos que puedan interferir con el desplazamiento." },
      { heading: "2. El batiente necesita área de apertura", body: "Las hojas requieren un barrido libre. Vehículos, pendiente, vereda, puertas cercanas y profundidad del acceso pueden hacer esa geometría más o menos conveniente." },
      { heading: "3. Revisa ancho y frecuencia de uso", body: "El tamaño del vano, cantidad de ciclos esperada y operación manual o futura automatización son antecedentes de evaluación; no deben asumirse capacidades sin definir el sistema concreto." },
      { heading: "4. Integra estructura y fijaciones", body: "Postes, apoyos, guía, bisagras y soporte existente forman parte del alcance. Fotografías y medidas del acceso ayudan a evitar una comparación incompleta." },
    ],
    checklist: ["Ancho del vano", "Altura deseada", "Espacio lateral", "Área de barrido", "Pendiente", "Fotos", "Frecuencia de uso", "Ubicación"],
  },
  {
    slug: "mezzanine-metalico-bodega-guia",
    title: "Mezzanine metálico en bodega: antecedentes para una primera evaluación",
    description: "Qué información reunir sobre uso, geometría, apoyos, acceso y cargas antes de evaluar un mezzanine o entrepiso metálico para bodega.",
    category: "Estructuras metálicas",
    ownerHref: "/estructuras-metalicas",
    ownerLabel: "Evaluar estructura",
    intro: "Un mezzanine es una estructura y no debe definirse solo por metros cuadrados. Para una primera conversación sirven la geometría del lugar, el uso esperado, fotografías y antecedentes disponibles; cualquier ingeniería estructural requerida debe resolverse explícitamente antes de fabricar.",
    sections: [
      { heading: "1. Define el uso del nivel superior", body: "Almacenamiento, circulación, oficina u otro uso cambian las preguntas que deben resolverse. No se deben inferir cargas de diseño a partir de una descripción informal." },
      { heading: "2. Levanta la geometría disponible", body: "Ancho, largo, altura libre, posiciones de pilares, muros, portones e instalaciones permiten entender el espacio antes de proponer una configuración." },
      { heading: "3. Identifica apoyos y condiciones existentes", body: "Fotografías y antecedentes de piso, muros y estructura existente son necesarios para separar fabricación de cualquier verificación técnica adicional." },
      { heading: "4. Incluye acceso y operación", body: "Escalera, movimiento de personas o materiales, interferencias y forma de montaje deben considerarse junto con la estructura principal." },
    ],
    checklist: ["Uso previsto", "Ancho y largo", "Altura disponible", "Fotos/planos", "Apoyos existentes", "Acceso", "Ubicación", "Antecedentes técnicos disponibles"],
  },
  {
    slug: "proveedor-camarotes-empresas",
    title: "Cómo evaluar un proveedor de camarotes para empresas",
    description: "Criterios para comparar proveedores de camas y camarotes metálicos por volumen: especificación, muestra, logística, capacidad y alcance de la cotización.",
    category: "Camarotes por volumen",
    ownerHref: "/empresas",
    ownerLabel: "Cotizar por volumen",
    intro: "En una compra empresarial, comparar solo el precio unitario puede esconder diferencias de configuración, despacho, armado o especificación. La evaluación mejora cuando todos los proveedores responden al mismo requerimiento.",
    sections: [
      { heading: "1. Compara la misma configuración", body: "Medidas, disposición, cantidad, terminación y elementos incluidos deben quedar expresados. Nombres comerciales como ‘reforzado’ no reemplazan una especificación verificable." },
      { heading: "2. Revisa capacidad contra tu calendario", body: "Pregunta por el volumen concreto y la fecha objetivo de tu pedido. Evita convertir una capacidad general en una promesa para un proyecto que todavía no fue programado." },
      { heading: "3. Separa fabricación de logística", body: "Destino, despacho, descarga, armado, entregas parciales y restricciones de acceso pueden cambiar el costo y la coordinación del proyecto." },
      { heading: "4. Define cómo aprobar la referencia", body: "Para series relevantes puede ser útil acordar plano, ficha, muestra u otra referencia de aprobación antes de repetir unidades." },
    ],
    checklist: ["Cantidad", "Configuración comparable", "Destino", "Fecha objetivo", "Entregas parciales", "Armado", "Referencia de aprobación", "Condiciones comerciales"],
  },
  {
    slug: "como-elegir-reja-metalica-frontis",
    title: "Cómo definir una reja metálica para el frontis",
    description: "Qué revisar en una reja de frontis: ancho, altura, visibilidad, accesos, portón, soportes existentes y relación con el terreno.",
    category: "Rejas metálicas",
    ownerHref: "/rejas-metalicas",
    ownerLabel: "Cotizar reja",
    intro: "El frontis combina perímetro y accesos. Antes de elegir una geometría conviene definir qué tramos son fijos, dónde entran peatones o vehículos y cuánto importa mantener visibilidad hacia la calle.",
    sections: [
      { heading: "1. Divide el frontis por tramos", body: "Mide aproximadamente cada paño y separa puertas o portones. Un croquis sencillo evita tratar todo el frente como una única medida." },
      { heading: "2. Define visibilidad y privacidad", body: "Indica cuánto quieres ver hacia afuera y cuánto quieres bloquear visualmente. Esa preferencia ayuda a descartar soluciones incompatibles." },
      { heading: "3. Integra los accesos", body: "Puerta peatonal y portón vehicular deben pensarse junto con los paños fijos para mantener una lógica común de alturas, soportes y encuentros." },
      { heading: "4. Muestra terreno y apoyos", body: "Pendiente, muros, pilares, soleras y elementos existentes pueden cambiar el detalle de fabricación e instalación." },
    ],
    checklist: ["Ancho por tramos", "Altura", "Fotos", "Puerta peatonal", "Portón", "Visibilidad deseada", "Soportes existentes", "Ubicación"],
  },
];
