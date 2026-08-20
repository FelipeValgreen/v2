export type ResourceArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  ownerHref: string;
  ownerLabel: string;
  intro: string;
  sections: Array<{ heading: string; body: string; bullets?: string[] }>;
  checklist: string[];
  capabilityKey?: string;
};

export const resourceArticles: ResourceArticle[] = [
  {
    slug: "como-cotizar-estructura-metalica",
    title: "Qué enviar para cotizar una estructura metálica",
    description: "Checklist práctico para transformar una idea, croquis o plano en un requerimiento evaluable de fabricación metálica.",
    category: "Estructuras metálicas",
    ownerHref: "/estructuras-metalicas",
    ownerLabel: "Cotizar estructura",
    intro: "Una cotización mejora cuando el fabricante entiende uso, geometría, dimensiones, ubicación y alcance. No necesitas convertirte en calculista para iniciar la conversación: necesitas entregar antecedentes que reduzcan supuestos.",
    sections: [
      { heading: "1. Parte por el uso", body: "Explica qué debe resolver la estructura: soporte, acceso, plataforma, habilitación, protección, base para equipo u otra función. El uso entrega contexto que una medida aislada no muestra." },
      { heading: "2. Adjunta el mejor antecedente que tengas", body: "Un plano es ideal cuando existe, pero un croquis, fotografías del lugar o una referencia dimensional pueden servir para una primera evaluación. Si el proyecto requiere ingeniería o información adicional, debe definirse antes de fabricar." },
      { heading: "3. Distingue fabricación de instalación", body: "Indica si necesitas solo fabricación/despacho o también montaje en terreno. Ubicación, accesos y condiciones del sitio cambian el alcance logístico." },
      { heading: "4. No ocultes la fecha objetivo", body: "Una fecha realista permite revisar capacidad, compra de materiales y secuencia de producción. La fecha deseada no debe confundirse con un plazo prometido hasta que el proyecto sea evaluado." },
    ],
    checklist: ["Uso de la estructura", "Plano/croquis/fotos", "Dimensiones principales", "Cantidad", "Ubicación", "Fabricación o fabricación + montaje", "Fecha objetivo", "Condiciones/restricciones conocidas"],
  },
  {
    slug: "como-cotizar-cierre-perimetral",
    title: "Cómo preparar una cotización de cierre perimetral",
    description: "Metros lineales, altura, terreno, accesos y fotos: los antecedentes que ayudan a evaluar un cierre sin adivinar el proyecto.",
    category: "Cierres perimetrales",
    ownerHref: "/cierres-perimetrales",
    ownerLabel: "Cotizar cierre",
    intro: "Decir “necesito un cierre” no define todavía el trabajo. El objetivo de una buena solicitud es mostrar cuánto perímetro existe, qué debe protegerse, cómo es el terreno y qué accesos deben integrarse.",
    sections: [
      { heading: "1. Estima el perímetro", body: "Entrega los metros lineales aproximados y, si puedes, divide el trazado por tramos. Una captura de plano, croquis o imagen aérea anotada puede ser más útil que un párrafo largo." },
      { heading: "2. Define la altura y el objetivo", body: "No es lo mismo delimitar un área, separar flujos o elevar el nivel de protección. Explicar el objetivo ayuda a seleccionar qué alternativas merece la pena evaluar." },
      { heading: "3. Muestra terreno y bases", body: "Fotografías del piso, pendientes, muros existentes, encuentros y obstáculos reducen incertidumbre. No asumir una condición de base que no se ha visto evita errores posteriores." },
      { heading: "4. Cuenta los accesos", body: "Indica puertas peatonales, portones, accesos vehiculares y cualquier punto donde el cierre deba interrumpirse o conectarse con otro elemento." },
    ],
    checklist: ["Metros lineales", "Altura aproximada", "Fotos del perímetro", "Tipo de terreno/base", "Cantidad/tipo de accesos", "Ubicación", "Uso del recinto", "Necesidad de instalación"],
  },
  {
    slug: "que-informacion-enviar-pintura-electrostatica",
    title: "Qué información enviar para cotizar pintura electrostática",
    description: "Una guía para describir piezas, cantidad, dimensiones, estado y terminación antes de solicitar una cotización de pintura en polvo.",
    category: "Pintura electrostática",
    ownerHref: "/pintura-electrostatica",
    ownerLabel: "Cotizar pintura",
    intro: "El número de piezas por sí solo no describe el trabajo. Geometría, dimensiones, estado superficial y terminación influyen en cómo debe evaluarse un lote.",
    sections: [
      { heading: "1. Identifica las piezas", body: "Describe qué son y adjunta fotografías. Si existen piezas distintas, sepáralas por tipo en vez de entregar solo el total del lote." },
      { heading: "2. Entrega dimensiones", body: "Incluye las medidas máximas aproximadas de cada tipo de pieza. Esto permite validar compatibilidad con el proceso real antes de prometer recepción." },
      { heading: "3. Muestra el estado actual", body: "Indica si las piezas son nuevas, tienen recubrimiento previo, oxidación u otra condición visible. La preparación necesaria no debe inferirse a ciegas." },
      { heading: "4. Define el resultado esperado", body: "Color y acabado deseado deben conversarse contra la disponibilidad operacional vigente. No asumas una carta o estándar que todavía no haya sido confirmado por el taller." },
    ],
    checklist: ["Tipo de pieza", "Cantidad por tipo", "Medidas máximas", "Fotos actuales", "Material si se conoce", "Estado superficial", "Color/terminación deseada", "Retiro/despacho requerido"],
    capabilityKey: "powder_coating",
  },
  {
    slug: "como-especificar-camarotes-compra-institucional",
    title: "Cómo especificar camarotes para una compra institucional o por volumen",
    description: "Qué definir antes de pedir una cotización de camas o camarotes metálicos para instituciones, faenas, residencias o compras por lote.",
    category: "Camarotes",
    ownerHref: "/camarotes",
    ownerLabel: "Cotizar camarotes",
    intro: "Una compra por volumen necesita algo más que escoger una foto. Cantidad, configuración, destino, uso y restricciones de espacio permiten comparar correctamente una solución fabricada.",
    sections: [
      { heading: "1. Define cantidad y configuración", body: "Separa camas individuales, camarotes u otras configuraciones en cantidades claras. Si aún no sabes cuál conviene, explica cuántas personas y qué espacio debe resolverse." },
      { heading: "2. Informa el contexto de uso", body: "Institución, alojamiento, faena, residencia u hogar pueden tener necesidades distintas de transporte, armado, ocupación y reposición. La evaluación debe utilizar únicamente especificaciones verificadas para el modelo que se esté cotizando." },
      { heading: "3. Confirma espacio y destino", body: "Entrega medidas del recinto si son relevantes y especifica comuna/ciudad de destino. En compras grandes, la logística debe evaluarse como parte del proyecto." },
      { heading: "4. Separa requisito de preferencia", body: "Distingue dimensiones o características obligatorias de preferencias de color/configuración. Esto ayuda a cotizar alternativas sin alterar un requisito crítico." },
    ],
    checklist: ["Cantidad", "Configuración", "Uso", "Destino", "Medidas/restricciones", "Necesidad de armado/instalación", "Fecha objetivo", "Requisitos obligatorios"],
  },
  {
    slug: "como-pedir-fabricacion-metalica-especial",
    title: "Cómo pedir una fabricación metálica especial sin saber el nombre técnico",
    description: "Foto, muestra, croquis, medidas y función: una forma simple de explicar una pieza o conjunto especial para que pueda evaluarse.",
    category: "Fabricación especial",
    ownerHref: "/fabricaciones-especiales",
    ownerLabel: "Enviar requerimiento",
    intro: "No necesitas inventar una especificación técnica para pedir una pieza. Es más útil describir la función, aportar referencias y separar lo que sabes de lo que todavía debe definirse.",
    sections: [
      { heading: "1. Explica qué problema resuelve", body: "Describe qué debe sostener, proteger, unir, separar, soportar o permitir. La función ayuda a interpretar la geometría y detectar preguntas faltantes." },
      { heading: "2. Usa una referencia física o visual", body: "Una foto con una escala conocida, una muestra, un croquis o un plano existente puede iniciar la evaluación. No se promete reproducción exacta sin revisar material, tolerancias y detalles." },
      { heading: "3. Indica cantidad", body: "Una pieza única y una serie pueden requerir enfoques de fabricación y preparación distintos. Cantidad ayuda a evaluar factibilidad y costo de preparación." },
      { heading: "4. Señala qué es crítico", body: "Si alguna dimensión, interferencia, montaje o compatibilidad es obligatoria, declárala. Evita que una preferencia secundaria termine tratándose como el dato principal." },
    ],
    checklist: ["Función", "Foto/plano/croquis/muestra", "Dimensiones conocidas", "Cantidad", "Material si se conoce", "Puntos críticos", "Contexto de instalación", "Fecha objetivo"],
  },
  {
    slug: "como-elegir-proveedor-fabricacion-metalica",
    title: "Cómo evaluar un proveedor de fabricación metálica sin quedarse solo con el precio",
    description: "Una guía práctica para comparar alcance, especificación, logística, evidencia y condiciones de una cotización metalmecánica.",
    category: "Fabricación metálica",
    ownerHref: "/fabricacion-metalica",
    ownerLabel: "Cotizar fabricación",
    intro: "Dos cotizaciones pueden parecer comparables y, sin embargo, incluir alcances distintos. Antes de decidir por el menor número, conviene revisar qué está incluido, qué se está suponiendo y qué información falta por confirmar.",
    sections: [
      { heading: "1. Compara el mismo alcance", body: "Revisa material, cantidad, dimensiones, terminación, despacho, montaje y cualquier trabajo previo o posterior. Un precio menor puede corresponder simplemente a un alcance menor." },
      { heading: "2. Pide evidencia relevante", body: "La mejor evidencia no es una frase de marketing: son productos, detalles, proceso y trabajos comparables cuya procedencia pueda verificarse." },
      { heading: "3. Revisa qué datos siguen abiertos", body: "Una cotización responsable distingue lo definido de lo pendiente. Si una carga, tolerancia, terminación o condición de instalación es crítica, debe quedar expresada antes de fabricar." },
      { heading: "4. Incluye logística y coordinación", body: "En proyectos B2B, fecha objetivo, acceso, descarga, montaje y secuencia de entrega pueden tener tanto impacto operativo como la fabricación misma." },
    ],
    checklist: ["Alcance comparable", "Material/configuración", "Cantidad", "Terminación", "Despacho", "Montaje", "Plazo", "Evidencia del proveedor", "Supuestos pendientes"],
  },
  {
    slug: "fabricacion-por-lote-que-definir",
    title: "Fabricación por lote: qué definir antes de pedir precio por volumen",
    description: "Cantidad, repetibilidad, muestra, tolerancias, empaque y calendario: los datos que ayudan a cotizar una serie metálica de forma consistente.",
    category: "Producción por volumen",
    ownerHref: "/empresas",
    ownerLabel: "Cotizar por volumen",
    intro: "Una serie no es simplemente una pieza multiplicada. La cantidad cambia preparación, repetibilidad, manipulación, control y logística. Por eso conviene definir el lote antes de comparar precios unitarios.",
    sections: [
      { heading: "1. Define cantidad total y parciales", body: "Indica volumen total y, si aplica, entregas parciales. Esto ayuda a evaluar secuencia de fabricación y espacio de manejo." },
      { heading: "2. Identifica la referencia maestra", body: "Plano, muestra aprobada, ficha o dimensiones acordadas deben convertirse en la referencia común para repetir la pieza." },
      { heading: "3. Separa dimensiones críticas", body: "No todas las medidas tienen la misma importancia. Señala cuáles condicionan ensamble, montaje, interferencias o uso final." },
      { heading: "4. Anticipa despacho y embalaje", body: "Un lote puede ser fácil de fabricar y complejo de almacenar o transportar. La forma de entrega debe definirse antes de cerrar el costo total." },
    ],
    checklist: ["Cantidad total", "Lotes parciales", "Plano/muestra", "Dimensiones críticas", "Terminación", "Embalaje", "Destino", "Fecha objetivo"],
  },
  {
    slug: "reja-o-cierre-perimetral-como-definir",
    title: "Reja, malla o cierre perimetral: cómo describir lo que realmente necesitas",
    description: "Una guía para separar función, perímetro, accesos, visual, terreno y nivel de protección antes de cotizar un sistema metálico.",
    category: "Cierres y rejas",
    ownerHref: "/cierres-perimetrales",
    ownerLabel: "Cotizar cierre",
    intro: "Los nombres comerciales cambian, pero el problema a resolver suele ser más estable: delimitar, separar, controlar un acceso, proteger o mantener visibilidad. Partir por esa función ayuda a elegir qué sistema merece evaluación.",
    sections: [
      { heading: "1. Explica la función principal", body: "Delimitar un terreno, separar una bodega, proteger una ventana o controlar acceso son requerimientos distintos aunque todos involucren metal." },
      { heading: "2. Define cuánto debe cubrir", body: "Para perímetros: metros lineales y altura. Para vanos: ancho, alto y cantidad. Para divisiones interiores: planta o croquis del espacio." },
      { heading: "3. Decide cuánto importa la visibilidad", body: "Algunos sistemas priorizan transparencia visual y otros privacidad o robustez. Indicar esa preferencia evita comparar soluciones incompatibles." },
      { heading: "4. Incluye terreno y accesos", body: "Bases, pendientes, muros existentes, puertas y portones cambian el alcance de fabricación e instalación." },
    ],
    checklist: ["Función", "Metros o vanos", "Altura", "Visibilidad/privacidad", "Fotos", "Terreno/base", "Accesos", "Ubicación"],
  },
  {
    slug: "camarotes-faena-compra-por-volumen",
    title: "Camarotes para faena o alojamiento: qué revisar antes de comprar por volumen",
    description: "Configuración, cantidad, espacio, traslado y reposición: criterios prácticos para preparar una compra de camas o camarotes metálicos.",
    category: "Camarotes",
    ownerHref: "/camarotes",
    ownerLabel: "Cotizar camarotes",
    intro: "Cuando el pedido aumenta, ya no basta con mirar el producto unitario. Conviene revisar cómo se distribuirá, transportará, armará y mantendrá el equipamiento dentro del espacio disponible.",
    sections: [
      { heading: "1. Parte por capacidad de alojamiento", body: "Indica cuántas personas deben alojarse y cuántos recintos existen. Esto permite comparar camas individuales, camarotes u otras configuraciones sin asumir una solución." },
      { heading: "2. Levanta restricciones del recinto", body: "Accesos, altura, ancho de pasillos y distribución pueden condicionar traslado, armado y configuración." },
      { heading: "3. Define si necesitas desmontaje o movilidad", body: "Si el equipamiento debe transportarse o reconfigurarse con frecuencia, indícalo como requisito del proyecto y no como detalle posterior." },
      { heading: "4. Planifica cantidad y calendario", body: "En un pedido por lote, cantidad total, entregas parciales, destino y fecha objetivo deben revisarse junto con la capacidad de fabricación." },
    ],
    checklist: ["Personas a alojar", "Cantidad de camas/camarotes", "Medidas del recinto", "Accesos", "Destino", "Desmontaje requerido", "Entregas parciales", "Fecha objetivo"],
  },
  {
    slug: "del-croquis-a-la-pieza-metalica",
    title: "Del croquis a una pieza metálica: cómo reducir iteraciones antes de fabricar",
    description: "Función, medidas críticas, cantidad y montaje: una forma simple de transformar una idea en un requerimiento fabricable.",
    category: "Fabricaciones especiales",
    ownerHref: "/fabricaciones-especiales",
    ownerLabel: "Enviar requerimiento",
    intro: "Un croquis puede ser suficiente para comenzar, pero no todas las anotaciones tienen el mismo peso. El objetivo es convertir la idea en un conjunto de decisiones verificables antes de cortar material.",
    sections: [
      { heading: "1. Dibuja la función antes que el detalle", body: "Marca qué sostiene, dónde apoya, qué debe pasar alrededor y cómo se utilizará. La función revela restricciones que una vista frontal puede esconder." },
      { heading: "2. Marca medidas críticas", body: "Identifica dimensiones que deben coincidir con otro equipo, vano, apoyo o pieza. Las demás pueden quedar sujetas a definición posterior." },
      { heading: "3. Agrega referencias de escala", body: "Fotos con cinta métrica, objetos conocidos o cotas simples ayudan a interpretar correctamente la geometría." },
      { heading: "4. Define cómo se monta", body: "Atornillado, soldado, apoyado, colgado o ensamblado son condiciones distintas. Si el montaje ya está definido, inclúyelo desde el principio." },
    ],
    checklist: ["Función", "Croquis/foto", "Medidas críticas", "Cantidad", "Puntos de apoyo", "Montaje", "Material si se conoce", "Fecha objetivo"],
  },

];

import { isCapabilityLaunchEnabled } from "@/lib/capabilities";

export function isResourceLaunchEnabled(article: ResourceArticle) {
  return article.capabilityKey ? isCapabilityLaunchEnabled(article.capabilityKey) : true;
}

export const publicResourceArticles = resourceArticles.filter(isResourceLaunchEnabled);

export function getResource(slug: string) {
  return resourceArticles.find((article) => article.slug === slug);
}

export function quoteCategoryForOwner(ownerHref: string) {
  if (ownerHref.includes("pintura")) return "pintura";
  if (ownerHref.includes("camarote")) return "camarotes";
  if (ownerHref.includes("cierre") || ownerHref.includes("reja") || ownerHref.includes("porton")) return "cierres";
  if (ownerHref.includes("estructura")) return "estructuras";
  if (ownerHref.includes("equipamiento")) return "equipamiento";
  if (ownerHref.includes("fabricacion-metalica")) return "fabricacion";
  return "especiales";
}

export function resourceQuickAnswer(article: ResourceArticle) {
  const essentials = article.checklist.slice(0, 5).join(", ");
  return `Para iniciar una evaluación conviene preparar: ${essentials}. No necesitas tener todo resuelto; lo que falte puede definirse antes de confirmar fabricación o alcance.`;
}

export function getRelatedResources(article: ResourceArticle, limit = 3) {
  const enabled = publicResourceArticles.filter((item) => item.slug !== article.slug);
  return enabled
    .map((item) => ({
      item,
      score: (item.ownerHref === article.ownerHref ? 3 : 0) + (item.category === article.category ? 2 : 0) + (item.ownerHref.split("/")[1] === article.ownerHref.split("/")[1] ? 1 : 0),
    }))
    .sort((a,b) => b.score - a.score || a.item.title.localeCompare(b.item.title, "es"))
    .slice(0, limit)
    .map(({item}) => item);
}
