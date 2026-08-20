export const quoteCategoryLabels:Record<string,string>={
 fabricacion:"Fabricación metálica",estructuras:"Estructura metálica",cierres:"Cierre / reja / portón",camarotes:"Cama / camarote",equipamiento:"Equipamiento metálico",especiales:"Fabricación especial",pintura:"Pintura electrostática",
};

export function clean(value:unknown,max=500){return typeof value==="string"?value.trim().slice(0,max):""}
function line(label:string,value:unknown,max=300){const text=clean(value,max);return text?`${label}: ${text}`:""}

export function buildLegacyLeadMessage(body:Record<string,unknown>){return [
 line("Tipo solicitud",body.tipo_solicitud,80),line("Tipo cliente",body.tipo_cliente,80),line("Empresa",body.empresa,160),line("Modalidad",body.modo_compra,120),line("Origen específico",body.detalle_origen,160),
 line("Descripción",body.mensaje,1800),line("Cantidad",body.cantidad,80),line("Tipo cierre",body.tipo_cierre,100),line("Modelo / referencia",body.modelo_referencia,160),line("Medidas",body.medidas,160),line("Longitud",body.longitud,80),line("Altura",body.altura,80),line("Apertura",body.apertura,100),line("Instalación",body.instalacion,60),line("Plano",body.plano,60),line("Uso",body.uso,300),line("Piezas",body.piezas,80),line("Estado",body.estado,100),line("Fecha objetivo",body.fecha_objetivo,40),
 line("UTM source",body.utm_source,120),line("UTM medium",body.utm_medium,120),line("UTM campaign",body.utm_campaign,160),line("UTM content",body.utm_content,160),line("UTM term",body.utm_term,160),line("GCLID",body.gclid,180),
].filter(Boolean).join("\n").slice(0,2000)}
