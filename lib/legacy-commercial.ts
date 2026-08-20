export type LegacyCommercialLanding = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  parentHref: string;
  parentLabel: string;
  quoteHref: string;
  quoteLabel: string;
  points: Array<{ title: string; body: string }>;
  faq: Array<{ q: string; a: string }>;
};

/**
 * Commercial URLs from the current rinon.cl that have a distinct product or B2B
 * intent. They are intentionally preserved as 200 pages during migration rather
 * than collapsed blindly into a category hub. Copy is conservative: configuration,
 * dimensions, inclusions and availability are re-confirmed on each quotation.
 */
export const legacyCommercialLandings: LegacyCommercialLanding[] = [
  {
    slug: "camarote-nido",
    eyebrow: "CAMAROTE NIDO",
    title: "Camarote nido metálico.",
    description: "Camarote metálico con una cama adicional inferior deslizante. Consulta configuración, medidas y disponibilidad vigente con RINON.",
    intro: "Esta configuración busca aumentar la capacidad de descanso sin ocupar permanentemente el espacio de una tercera cama separada. Antes de cotizar se confirman medidas, sistema de deslizamiento, cantidad y destino.",
    parentHref: "/camarotes", parentLabel: "Ver camas y camarotes",
    quoteHref: "/cotizar?category=camarotes&detail=camarote_nido", quoteLabel: "Cotizar camarote nido",
    points: [
      { title: "Capacidad flexible", body: "La cama adicional se integra al conjunto y debe revisarse junto con el espacio disponible." },
      { title: "Medidas del dormitorio", body: "Ancho, largo y espacio de extracción ayudan a validar si la configuración funciona en el lugar." },
      { title: "Configuración vigente", body: "Dimensiones, terminación y elementos incluidos se confirman en la cotización aplicable al pedido." },
    ],
    faq: [
      { q: "¿La cama adicional queda siempre extendida?", a: "No necesariamente. El concepto nido utiliza una cama inferior que se guarda cuando no se usa; el mecanismo exacto se confirma para la configuración vigente." },
      { q: "¿Puedo pedir varias unidades?", a: "Sí, se pueden evaluar pedidos por volumen indicando cantidad, destino y fecha objetivo." },
    ],
  },
  {
    slug: "camarote-triple",
    eyebrow: "CAMAROTE TRIPLE",
    title: "Camarote metálico de tres niveles.",
    description: "Configuración de camarote metálico de tres niveles para proyectos donde la capacidad y la altura disponible son determinantes.",
    intro: "Un camarote de tres niveles exige revisar con especial cuidado la altura útil del recinto, circulación, acceso a cada nivel y la configuración vigente antes de confirmar fabricación.",
    parentHref: "/camarotes", parentLabel: "Ver camas y camarotes",
    quoteHref: "/cotizar?category=camarotes&detail=camarote_triple", quoteLabel: "Cotizar camarote triple",
    points: [
      { title: "Altura disponible", body: "La altura del dormitorio es un antecedente crítico para evaluar esta configuración." },
      { title: "Acceso y circulación", body: "Escalera, barandas y relación con muros o ventanas deben revisarse como parte del conjunto." },
      { title: "Uso y cantidad", body: "Hogar, residencia, institución o faena pueden requerir alcances logísticos distintos." },
    ],
    faq: [
      { q: "¿Qué altura necesita el dormitorio?", a: "No publicamos una medida universal porque depende de la configuración vigente. Envía la altura del recinto y se valida antes de cotizar." },
      { q: "¿Fabrican por volumen?", a: "Sí, se pueden evaluar pedidos por volumen con cantidad, destino y fecha objetivo." },
    ],
  },
  {
    slug: "camarote-doble",
    eyebrow: "CAMAROTE DOBLE",
    title: "Camarote con cama inferior ampliada.",
    description: "Configuración de camarote metálico con una cama inferior de mayor ancho y una cama superior. Medidas y alcance se confirman al cotizar.",
    intro: "Esta familia de camarotes prioriza una cama inferior más amplia sin renunciar al aprovechamiento vertical. La combinación exacta de plazas y dimensiones se valida para el modelo solicitado.",
    parentHref: "/camarotes", parentLabel: "Ver camas y camarotes",
    quoteHref: "/cotizar?category=camarotes&detail=camarote_doble", quoteLabel: "Cotizar configuración",
    points: [
      { title: "Ancho disponible", body: "La cama inferior ampliada necesita más ancho de dormitorio que un camarote de dos camas individuales." },
      { title: "Combinación de camas", body: "La configuración superior e inferior se confirma antes de fabricar o reservar producción." },
      { title: "Entrega y armado", body: "Destino, accesos y modalidad de entrega forman parte de la evaluación." },
    ],
    faq: [
      { q: "¿Es lo mismo que un camarote de dos plazas?", a: "Se usan nombres similares para distintas configuraciones. Por eso la cotización confirma expresamente qué cama va abajo, cuál va arriba y sus medidas." },
      { q: "¿Puedo enviar una foto de referencia?", a: "Sí. Una foto junto con las medidas del espacio ayuda a identificar la configuración que quieres evaluar." },
    ],
  },
  {
    slug: "cama-alta",
    eyebrow: "CAMA ALTA",
    title: "Cama alta metálica.",
    description: "Cama metálica elevada para liberar el espacio inferior. Consulta altura, medidas y configuración vigente antes de comprar.",
    intro: "La cama alta utiliza el espacio vertical y deja la zona inferior disponible para escritorio, almacenamiento u otro uso. La altura del recinto y la circulación son los primeros datos que conviene revisar.",
    parentHref: "/camarotes", parentLabel: "Ver camas y camarotes",
    quoteHref: "/cotizar?category=camarotes&detail=cama_alta", quoteLabel: "Cotizar cama alta",
    points: [
      { title: "Altura del recinto", body: "Mide desde piso a cielo para revisar la relación entre cama, colchón y espacio superior." },
      { title: "Uso bajo la cama", body: "Escritorio, almacenamiento o espacio libre pueden cambiar la altura y distribución que conviene evaluar." },
      { title: "Acceso", body: "Escalera, circulación y posición respecto de puertas y ventanas deben considerarse antes de confirmar." },
    ],
    faq: [
      { q: "¿Incluye escritorio?", a: "La cama alta deja el espacio inferior libre. Si buscas escritorio integrado, revisa el camarote con escritorio." },
      { q: "¿Se puede adaptar a mi dormitorio?", a: "Puede evaluarse. Envía medidas del espacio y una fotografía para revisar factibilidad." },
    ],
  },
  {
    slug: "camarote-titanic",
    eyebrow: "MODELO TITANIC",
    title: "Camarote Titanic.",
    description: "Página de continuidad para el modelo Camarote Titanic de RINON. La estructura y especificaciones vigentes se confirman en cada cotización.",
    intro: "El nombre Titanic identifica una referencia histórica de producto dentro del catálogo de RINON. Para evitar trasladar especificaciones antiguas, la cotización actual vuelve a confirmar medidas, perfiles, terminación y elementos incluidos.",
    parentHref: "/camarotes", parentLabel: "Ver camas y camarotes",
    quoteHref: "/cotizar?category=camarotes&detail=camarote_titanic", quoteLabel: "Consultar modelo Titanic",
    points: [
      { title: "Referencia de producto", body: "Usamos el nombre del modelo para identificar la intención, no para asumir automáticamente una ficha técnica antigua." },
      { title: "Uso esperado", body: "Indica quién utilizará el camarote, cuántas unidades necesitas y dónde se entregará." },
      { title: "Especificación actual", body: "Materiales, medidas y configuración se dejan expresados en la cotización vigente." },
    ],
    faq: [
      { q: "¿Mantiene exactamente las mismas medidas de versiones anteriores?", a: "No debe asumirse. Las medidas y la configuración se confirman para la versión que esté disponible al momento de cotizar." },
      { q: "¿Puedo pedir varias unidades?", a: "Sí, se pueden evaluar pedidos por volumen." },
    ],
  },
  {
    slug: "camarote-1-5-plazas",
    eyebrow: "CAMAROTE PLAZA Y MEDIA",
    title: "Camarote con cama ampliada.",
    description: "Configuración de camarote con una cama de mayor ancho dentro del conjunto. Las plazas y medidas exactas se confirman en la cotización vigente.",
    intro: "Si buscas más espacio en uno de los niveles, esta ruta conserva la intención del antiguo camarote de plaza y media. Lo importante es confirmar qué nivel debe ser más ancho y cuánto espacio real tiene el dormitorio.",
    parentHref: "/camarotes", parentLabel: "Ver camas y camarotes",
    quoteHref: "/cotizar?category=camarotes&detail=camarote_plaza_media", quoteLabel: "Cotizar plaza y media",
    points: [
      { title: "Nivel ampliado", body: "Indica si la cama de mayor ancho debe ir arriba o abajo." },
      { title: "Medidas disponibles", body: "Ancho, largo y altura del dormitorio ayudan a validar la configuración." },
      { title: "Cantidad", body: "Para compras por volumen se revisan destino, calendario y repetibilidad." },
    ],
    faq: [
      { q: "¿Cuánto mide una plaza y media?", a: "Las denominaciones comerciales pueden variar. RINON confirma la medida exacta de la cama en la cotización para evitar ambigüedades." },
      { q: "¿Se puede fabricar a medida?", a: "Puede evaluarse según geometría, material, cantidad y capacidad de fabricación." },
    ],
  },
  {
    slug: "camarote-desmontable",
    eyebrow: "CAMAROTE DESMONTABLE",
    title: "Camarote metálico desmontable.",
    description: "Configuración de camarote pensada para facilitar armado, desarme y traslado. Consulta el sistema vigente y alcance de entrega.",
    intro: "Un camarote desmontable es útil cuando el producto debe transportarse, reubicarse o almacenarse con mayor facilidad. El sistema de unión y la forma de armado se confirman para la versión cotizada.",
    parentHref: "/camarotes", parentLabel: "Ver camas y camarotes",
    quoteHref: "/cotizar?category=camarotes&detail=camarote_desmontable", quoteLabel: "Cotizar desmontable",
    points: [
      { title: "Sistema de unión", body: "La forma de armado se confirma para la configuración vigente; no se asume un mecanismo antiguo." },
      { title: "Traslado", body: "Indica si el objetivo principal es facilitar despacho, mudanzas, almacenaje o instalación en faena." },
      { title: "Cantidad", body: "En series se revisa también identificación de piezas y lógica de entrega." },
    ],
    faq: [
      { q: "¿Se arma sin herramientas?", a: "Depende del sistema vigente y no debe asumirse. La cotización puede indicar cómo se entrega y qué requiere el armado." },
      { q: "¿Sirve para compras institucionales?", a: "Puede evaluarse. Indica cantidad, destino, frecuencia de traslado y restricciones del lugar." },
    ],
  },
  {
    slug: "cama-dos-plazas-con-cajon",
    eyebrow: "CAMA CON ALMACENAMIENTO",
    title: "Cama metálica con cajón inferior.",
    description: "Cama metálica con almacenamiento inferior integrado. Consulta medidas, configuración del cajón y terminación vigente.",
    intro: "Esta solución aprovecha el volumen bajo la cama para almacenamiento. Antes de fabricar se revisa el espacio lateral necesario para abrir el cajón y las dimensiones del dormitorio.",
    parentHref: "/camarotes", parentLabel: "Ver camas y camarotes",
    quoteHref: "/cotizar?category=camarotes&detail=cama_con_cajon", quoteLabel: "Cotizar cama con cajón",
    points: [
      { title: "Espacio de apertura", body: "El cajón necesita recorrido libre al costado de la cama." },
      { title: "Volumen útil", body: "La altura y distribución del almacenamiento se definen dentro de la configuración cotizada." },
      { title: "Medida de cama", body: "La medida comercial se traduce a dimensiones exactas antes de fabricar." },
    ],
    faq: [
      { q: "¿Puede llevar uno o más cajones?", a: "Puede evaluarse según la configuración disponible y el espacio. Indica qué necesitas guardar y el lado de apertura preferido." },
      { q: "¿La medida es fija?", a: "La medida vigente se confirma al cotizar; las modificaciones especiales quedan sujetas a factibilidad." },
    ],
  },
  {
    slug: "camarote-2-plazas",
    eyebrow: "CAMAROTE 2 PLAZAS",
    title: "Camarote con cama inferior de dos plazas.",
    description: "Configuración con cama inferior de dos plazas y nivel superior. Medidas, estructura y elementos incluidos se confirman al cotizar.",
    intro: "Esta ruta conserva la intención específica de una cama inferior matrimonial o de dos plazas dentro del conjunto. Para evitar diferencias entre nomenclatura y medida real, RINON confirma dimensiones exactas en cada propuesta.",
    parentHref: "/camarotes", parentLabel: "Ver camas y camarotes",
    quoteHref: "/cotizar?category=camarotes&detail=camarote_2_plazas", quoteLabel: "Cotizar camarote 2 plazas",
    points: [
      { title: "Cama inferior", body: "Se confirma la dimensión exacta solicitada y el espacio que requiere el conjunto." },
      { title: "Nivel superior", body: "La medida y posición del nivel superior se definen como parte de la configuración." },
      { title: "Acceso y altura", body: "Escalera, barandas y altura del dormitorio se revisan antes de confirmar." },
    ],
    faq: [
      { q: "¿Dos plazas significa una medida exacta?", a: "La denominación comercial no reemplaza la medida. La cotización expresa ancho y largo para el modelo vigente." },
      { q: "¿Se puede cotizar para varias habitaciones?", a: "Sí. Entrega cantidad, destino y restricciones de acceso o armado." },
    ],
  },
  {
    slug: "cama-institucional-metalica",
    eyebrow: "CAMA INSTITUCIONAL",
    title: "Cama metálica para compras institucionales.",
    description: "Camas metálicas para requerimientos institucionales y compras por volumen, sujetas a especificación, cantidad y destino.",
    intro: "En una compra institucional la foto del producto no basta: deben quedar claros cantidad, medida requerida, uso, destino, condiciones de entrega y cualquier exigencia documental o técnica aplicable.",
    parentHref: "/empresas", parentLabel: "Ver soluciones para empresas",
    quoteHref: "/cotizar?category=camarotes&detail=cama_institucional", quoteLabel: "Cotizar compra institucional",
    points: [
      { title: "Especificación", body: "Separamos requisitos obligatorios de preferencias para cotizar una solución comparable." },
      { title: "Volumen", body: "Cantidad total y posibles entregas parciales se revisan desde el inicio." },
      { title: "Destino", body: "Ciudad, acceso, descarga, armado y fecha objetivo forman parte del alcance logístico." },
    ],
    faq: [
      { q: "¿Emiten cotización formal para empresas e instituciones?", a: "Sí. Para evaluar correctamente necesitamos los antecedentes comerciales y técnicos del requerimiento." },
      { q: "¿Pueden trabajar con una especificación existente?", a: "Sí, puede revisarse una ficha, bases técnicas, plano o referencia y señalar cualquier punto que deba aclararse antes de cotizar." },
    ],
  },
  {
    slug: "cama-loft-metalica",
    eyebrow: "CAMA LOFT",
    title: "Cama loft metálica.",
    description: "Cama metálica elevada con espacio inferior libre. Página preservada para quienes buscan cama loft o cama alta.",
    intro: "Cama loft y cama alta describen la misma idea general: elevar la cama para liberar superficie de piso. La altura y configuración exactas se adaptan a lo que pueda evaluarse para el espacio disponible.",
    parentHref: "/camarotes", parentLabel: "Ver camas y camarotes",
    quoteHref: "/cotizar?category=camarotes&detail=cama_loft", quoteLabel: "Cotizar cama loft",
    points: [
      { title: "Espacio vertical", body: "La altura del recinto determina cuánto margen existe arriba y abajo de la cama." },
      { title: "Zona inferior", body: "Puedes indicar si necesitas dejarla libre o reservarla para escritorio o mobiliario." },
      { title: "Configuración", body: "Medidas y elementos se confirman antes de fabricar." },
    ],
    faq: [
      { q: "¿Cama loft y cama alta son lo mismo?", a: "Son términos usados para la misma familia de soluciones: una cama elevada con espacio inferior disponible." },
      { q: "¿Puedo enviar medidas de mi dormitorio?", a: "Sí. Son el mejor punto de partida para evaluar la configuración." },
    ],
  },
  {
    slug: "cama-loft-con-escritorio",
    eyebrow: "CAMA LOFT CON ESCRITORIO",
    title: "Cama loft con escritorio.",
    description: "Configuración elevada con zona de trabajo inferior. Revisa también el camarote con escritorio vigente de RINON.",
    intro: "Esta búsqueda normalmente apunta a una cama elevada que integra o reserva una zona de escritorio debajo. RINON mantiene una línea específica de camarote con escritorio donde se confirma la configuración actual.",
    parentHref: "/camarote-con-escritorio", parentLabel: "Ver camarote con escritorio",
    quoteHref: "/cotizar?category=camarotes&detail=camarote_escritorio", quoteLabel: "Cotizar cama con escritorio",
    points: [
      { title: "Área de trabajo", body: "Indica computador, estudio u otro uso para definir qué espacio necesitas debajo." },
      { title: "Altura", body: "Mide el recinto completo antes de decidir la elevación de la cama." },
      { title: "Circulación", body: "Escalera, silla, puertas y ventanas deben funcionar con el conjunto instalado." },
    ],
    faq: [
      { q: "¿Es distinta al camarote con escritorio?", a: "Los nombres pueden referirse a configuraciones muy similares. RINON utiliza la cotización para dejar claro qué estructura y escritorio incluye el modelo vigente." },
      { q: "¿Se puede adaptar al espacio?", a: "Puede evaluarse con medidas y fotografías del dormitorio." },
    ],
  },
  {
    slug: "mobiliario-institucional",
    eyebrow: "EMPRESAS E INSTITUCIONES",
    title: "Mobiliario metálico para requerimientos institucionales.",
    description: "Camas, camarotes y equipamiento metálico para empresas e instituciones, evaluados por especificación, volumen, destino y plazo.",
    intro: "Una compra institucional necesita trazabilidad del requerimiento. RINON puede evaluar productos y fabricaciones metálicas por volumen siempre que se definan las especificaciones, cantidad, destino y condiciones de entrega.",
    parentHref: "/empresas", parentLabel: "Ver soluciones para empresas",
    quoteHref: "/cotizar?category=empresas&detail=institucional", quoteLabel: "Enviar requerimiento institucional",
    points: [
      { title: "Camas y camarotes", body: "Compras por volumen sujetas a configuración y especificación confirmadas." },
      { title: "Equipamiento metálico", body: "Lockers, soportes, racks u otros conjuntos pueden evaluarse según requerimiento." },
      { title: "Logística", body: "Destino, entregas parciales, armado y acceso se consideran antes de cerrar el alcance." },
    ],
    faq: [
      { q: "¿Pueden cotizar desde bases técnicas?", a: "Sí. Envíalas junto con cantidad y fecha objetivo para revisar qué puntos están definidos y cuáles requieren aclaración." },
      { q: "¿Trabajan por volumen?", a: "Sí, la fabricación por volumen es una capacidad confirmada; la capacidad y plazo concretos se validan para cada pedido." },
    ],
  },
];

export const legacyCommercialSlugs = legacyCommercialLandings.map((item) => item.slug);

export function getLegacyCommercialLanding(slug: string) {
  const normalized = slug.replace(/^\/+|\/+$/g, "").toLowerCase();
  return legacyCommercialLandings.find((item) => item.slug === normalized);
}
