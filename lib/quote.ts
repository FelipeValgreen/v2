export const quoteCategoryLabels:Record<string,string>={
 fabricacion:"Fabricación metálica",estructuras:"Estructura metálica",cierres:"Cierre / reja / portón",camarotes:"Cama / camarote",equipamiento:"Equipamiento metálico",especiales:"Fabricación especial",pintura:"Pintura electrostática",
};

export function clean(value:unknown,max=500){return typeof value==="string"?value.trim().slice(0,max):""}
function line(label:string,value:unknown,max=300){const text=clean(value,max);return text?`${label}: ${text}`:""}
function nullable(value:unknown,max:number){const text=clean(value,max);return text||null}
function triState(value:unknown){const text=clean(value,40).toLocaleLowerCase("es-CL");if(["sí","si","yes","true"].includes(text))return true;if(["no","false"].includes(text))return false;return null}
function safeDate(value:unknown){const text=clean(value,20);return /^\d{4}-\d{2}-\d{2}$/.test(text)?text:null}

export type StructuredLeadFields={
 landing_path:string|null;referrer_host:string|null;utm_source:string|null;utm_medium:string|null;utm_campaign:string|null;utm_term:string|null;utm_content:string|null;gclid:string|null;gbraid:string|null;wbraid:string|null;fbclid:string|null;
 categoria:string|null;subcategoria:string|null;cantidad_aprox:string|null;ubicacion_proyecto:string|null;fecha_objetivo:string|null;requiere_instalacion:boolean|null;tiene_plano:boolean|null;uso_proyecto:string|null;estado_superficie:string|null;tipo_cliente:string|null;empresa:string|null;
};

export function buildStructuredLeadFields(body:Record<string,unknown>,paginaOrigen:string):StructuredLeadFields{
 const subcategoria=clean(body.detalle_origen,160)||clean(body.tipo_cierre,100)||clean(body.modelo_referencia,160)||null;
 return {
  landing_path:paginaOrigen||null,
  referrer_host:nullable(body.referrer_host,200),
  utm_source:nullable(body.utm_source,120),utm_medium:nullable(body.utm_medium,120),utm_campaign:nullable(body.utm_campaign,160),utm_term:nullable(body.utm_term,160),utm_content:nullable(body.utm_content,160),
  gclid:nullable(body.gclid,180),gbraid:nullable(body.gbraid,180),wbraid:nullable(body.wbraid,180),fbclid:nullable(body.fbclid,180),
  categoria:nullable(body.categoria,80),subcategoria,cantidad_aprox:nullable(body.cantidad,80)||nullable(body.piezas,80),ubicacion_proyecto:nullable(body.ubicacion,100),fecha_objetivo:safeDate(body.fecha_objetivo),
  requiere_instalacion:triState(body.instalacion),tiene_plano:triState(body.plano),uso_proyecto:nullable(body.uso,300),estado_superficie:nullable(body.estado,100),tipo_cliente:nullable(body.tipo_cliente,80),empresa:nullable(body.empresa,160),
 };
}

export function buildLegacyLeadMessage(body:Record<string,unknown>){return [
 line("Tipo solicitud",body.tipo_solicitud,80),line("Tipo cliente",body.tipo_cliente,80),line("Empresa",body.empresa,160),line("Modalidad",body.modo_compra,120),line("Origen específico",body.detalle_origen,160),
 line("Descripción",body.mensaje,1800),line("Cantidad",body.cantidad,80),line("Tipo cierre",body.tipo_cierre,100),line("Modelo / referencia",body.modelo_referencia,160),line("Medidas",body.medidas,160),line("Longitud",body.longitud,80),line("Altura",body.altura,80),line("Apertura",body.apertura,100),line("Instalación",body.instalacion,60),line("Plano",body.plano,60),line("Uso",body.uso,300),line("Piezas",body.piezas,80),line("Estado",body.estado,100),line("Fecha objetivo",body.fecha_objetivo,40),
 line("UTM source",body.utm_source,120),line("UTM medium",body.utm_medium,120),line("UTM campaign",body.utm_campaign,160),line("UTM content",body.utm_content,160),line("UTM term",body.utm_term,160),line("GCLID",body.gclid,180),line("GBRAID",body.gbraid,180),line("WBRAID",body.wbraid,180),line("FBCLID",body.fbclid,180),
].filter(Boolean).join("\n").slice(0,3000)}
