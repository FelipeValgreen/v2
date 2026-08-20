import { legalIdentity, isLegalPublicationReady } from "@/lib/legal";
import { routeMetadata } from "@/lib/seo";
import Link from "next/link";

const ready=isLegalPublicationReady();
export const metadata=routeMetadata(
  "/politica-de-privacidad",
  "Política de privacidad | RINON",
  "Cómo RINON trata los datos personales recibidos a través de su sitio, cotizaciones y canales comerciales.",
  {indexable:ready},
);

function Identity(){
  if(ready)return <dl className="legal-identity"><div><dt>Responsable</dt><dd>{legalIdentity.entityName}</dd></div><div><dt>RUT</dt><dd>{legalIdentity.taxId}</dd></div><div><dt>Representante legal</dt><dd>{legalIdentity.legalRepresentative}</dd></div><div><dt>Dirección pública de contacto</dt><dd>{legalIdentity.operationalAddress}</dd></div><div><dt>Privacidad</dt><dd><Link href={legalIdentity.privacyRequestPath}>Enviar solicitud sobre datos personales</Link>{legalIdentity.privacyEmail?<><br/><a href={`mailto:${legalIdentity.privacyEmail}`}>{legalIdentity.privacyEmail}</a></>:null}</dd></div></dl>;
  return <div className="legal-draft-warning"><b>Versión legal todavía pendiente de aprobación final.</b><p>La razón social, RUT, dirección pública y canal de solicitudes están configurados. Falta incorporar el representante legal y revisar el mapa real de proveedores/integraciones antes de la aprobación final.</p></div>;
}

export default function Page(){return <main><article className="section"><div className="container article-narrow">
  <div className="eyebrow">PRIVACIDAD</div><h1>Política de privacidad</h1>
  <p className="lead">Esta política explica cómo RINON recibe, utiliza y protege los datos personales asociados a consultas, cotizaciones, comunicaciones y uso del sitio.</p>
  <Identity/>
  <h2>1. Qué datos podemos recibir</h2><p>Según el canal utilizado, podemos recibir nombre, empresa, teléfono, correo, ubicación del proyecto, categoría de trabajo, cantidades, dimensiones, fechas objetivo, mensajes y antecedentes técnicos que el usuario decida adjuntar o enviar. El formulario comercial no está diseñado para pedir datos sensibles ni documentos de identidad como requisito inicial.</p>
  <h2>2. Para qué se usan</h2><ul><li>Responder consultas y evaluar o preparar una cotización.</li><li>Gestionar comunicaciones comerciales vinculadas al requerimiento.</li><li>Coordinar fabricación, despacho, instalación o postventa cuando exista una relación comercial.</li><li>Proteger el sitio, prevenir abuso y mantener registros técnicos necesarios.</li><li>Medir el uso del sitio o campañas únicamente cuando la configuración de consentimiento lo habilite.</li></ul>
  <h2>3. Proveedores y encargados</h2><p>RINON puede utilizar proveedores de hosting, infraestructura, base de datos, mensajería, analítica, publicidad o gestión comercial. La identificación definitiva de terceros y sus finalidades debe reflejar únicamente los servicios que estén efectivamente activos cuando esta política sea publicada.</p>
  <h2>4. Conservación</h2><p>Los datos deben conservarse solo durante el tiempo necesario para atender el requerimiento, administrar la relación comercial, resolver obligaciones posteriores o cumplir deberes legales aplicables. Los plazos específicos de conservación se definen según la finalidad y las obligaciones aplicables. Una solicitud de eliminación puede estar sujeta a excepciones cuando exista una obligación legítima de conservación.</p>
  <h2>5. Archivos técnicos</h2><p>Planos, fotografías, croquis y otros archivos pueden contener información confidencial del proyecto. Si RINON habilita carga directa de archivos, estos deben almacenarse de forma privada, con acceso controlado y sin indexación pública. Mientras ese flujo no esté validado, el sitio no debe simular que un archivo quedó almacenado.</p>
  <h2>6. Derechos y solicitudes</h2><p>Las personas pueden ejercer los derechos que reconozca la normativa chilena vigente respecto de sus datos. La reforma introducida por la Ley N° 21.719 entra en vigencia el 1 de diciembre de 2026 y establece un marco reforzado de protección de datos personales. RINON debe mantener un canal operativo para recibir, autenticar, registrar y responder solicitudes conforme al régimen aplicable en la fecha de la solicitud. Puedes utilizar el <a href="/solicitud-de-datos">formulario de solicitudes sobre datos personales</a>.</p>
  <h2>7. Analítica y cookies</h2><p>El sitio separa el almacenamiento necesario de la medición opcional. Las etiquetas de analítica o publicidad no deben activarse antes de la preferencia correspondiente. Los detalles se explican en la <a href="/politica-de-cookies">política de cookies</a>.</p>
  <h2>8. Actualizaciones</h2><p>Esta política debe revisarse cuando cambien los formularios, proveedores, finalidades, mecanismos de archivo, analítica o normativa aplicable. Fecha de la especificación: 19 de agosto de 2026.</p>
  <p className="legal-source-note">Marco de referencia: Ley N° 19.628 y reforma de la Ley N° 21.719. La publicación definitiva requiere revisión contra la operación real de RINON.</p>
</div></article></main>}
