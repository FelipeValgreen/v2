import { legalIdentity, isLegalPublicationReady } from "@/lib/legal";
import { routeMetadata } from "@/lib/seo";

const ready=isLegalPublicationReady();
export const metadata=routeMetadata("/terminos", "Términos de uso | RINON", "Condiciones generales de uso del sitio y alcance de las solicitudes de cotización de RINON.", {indexable:ready});

export default function Page(){return <main><article className="section"><div className="container article-narrow">
  <div className="eyebrow">TÉRMINOS DE USO</div><h1>Condiciones generales del sitio</h1>
  <p className="lead">El sitio permite conocer capacidades y solicitar evaluaciones comerciales. Una consulta web no reemplaza la propuesta técnica/comercial específica de cada trabajo.</p>
  {!ready?<div className="legal-draft-warning"><b>Identidad y aprobación legal pendientes para publicación.</b><p>La versión pública se habilita solo cuando los datos del responsable estén verificados.</p></div>:null}
  <h2>1. Información del sitio</h2><p>Las descripciones, imágenes, ejemplos y contenidos sirven para orientar un requerimiento. Cuando una medida, capacidad, material, terminación, plazo, cobertura o proceso sea crítico, debe quedar confirmado por escrito en la propuesta aplicable al proyecto.</p>
  <h2>2. Solicitudes y cotizaciones</h2><p>Enviar un formulario, correo, mensaje de WhatsApp, plano o fotografía constituye una solicitud de evaluación; no crea por sí solo una orden de fabricación. Precio, impuestos, forma de pago, alcance, despacho, instalación, exclusiones, vigencia y plazo se definen en la cotización o documento comercial correspondiente.</p>
  <h2>3. Información entregada por el cliente</h2><p>Quien solicita una cotización debe procurar que planos, medidas, cantidades, ubicación, condiciones de terreno y demás antecedentes sean correctos. Si un dato es aproximado, debe identificarse como tal. RINON puede solicitar antecedentes adicionales antes de comprometer fabricación o instalación.</p>
  <h2>4. Fabricación a medida</h2><p>La factibilidad de trabajos especiales depende de geometría, material, tolerancias, cantidad, proceso y capacidad disponible. El sitio no debe interpretarse como una promesa de fabricar cualquier objeto o de ejecutar procesos que todavía no hayan sido validados operativamente.</p>
  <h2>5. Propiedad intelectual y antecedentes del proyecto</h2><p>El contenido propio del sitio, marca y material gráfico se utiliza bajo sus respectivos derechos. Los antecedentes técnicos enviados por un cliente se emplean para evaluar y gestionar su requerimiento y deben tratarse conforme a la política de privacidad y las condiciones comerciales aplicables.</p>
  <h2>6. Derechos obligatorios</h2><p>Nada en estos términos pretende limitar derechos irrenunciables que correspondan conforme a la legislación chilena aplicable. En caso de conflicto entre una cláusula general del sitio y una obligación legal imperativa, prevalece la normativa aplicable.</p>
  <h2>7. Responsable y contacto</h2><p>{ready?<>El sitio es operado por <strong>{legalIdentity.entityName}</strong>, RUT {legalIdentity.taxId}, representada legalmente por {legalIdentity.legalRepresentative}. Para contacto público se informa {legalIdentity.operationalAddress}.</>:<>Los datos legales del operador se incorporarán desde la configuración validada antes de habilitar esta página para indexación.</>}</p>
  <h2>8. Actualizaciones</h2><p>RINON puede actualizar estos términos para reflejar cambios operativos o normativos. Fecha de la especificación: 19 de agosto de 2026.</p>
</div></article></main>}
