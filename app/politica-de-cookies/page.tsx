import { isLegalPublicationReady } from "@/lib/legal";
import { routeMetadata } from "@/lib/seo";

const ready=isLegalPublicationReady();
export const metadata=routeMetadata("/politica-de-cookies", "Política de cookies | RINON", "Cómo RINON utiliza almacenamiento necesario y activa medición opcional según las preferencias del usuario.", {indexable:ready});

export default function Page(){return <main><article className="section"><div className="container article-narrow">
  <div className="eyebrow">COOKIES Y MEDICIÓN</div><h1>Preferencias de almacenamiento y analítica</h1>
  <p className="lead">RINON utiliza un enfoque de consentimiento previo para la medición opcional: la navegación básica y el cotizador no dependen de aceptar analítica.</p>
  {!ready?<div className="legal-draft-warning"><b>Publicación legal pendiente de aprobación.</b><p>La implementación técnica de consentimiento está definida. Antes de indexar esta política debe confirmarse la configuración productiva final de proveedores e identificadores de medición.</p></div>:null}
  <h2>1. Almacenamiento necesario</h2><p>El sitio utiliza almacenamiento local necesario para recordar la elección de privacidad y mantener funciones técnicas. La clave <code>rinon_cookie_consent</code> conserva la preferencia seleccionada. Estas funciones no se utilizan para cargar herramientas externas de analítica cuando el usuario elige solo lo necesario.</p>
  <h2>2. Medición opcional</h2><p>Cuando el usuario acepta analítica, el sitio puede crear identificadores anónimos de visitante y sesión, guardar atribución de la sesión y registrar eventos como páginas vistas, navegación por productos/servicios, inicio y avance del cotizador, envío confirmado, contacto por WhatsApp o teléfono y clics de ubicación. Los eventos no deben incluir nombre, correo, teléfono, contenido del mensaje ni nombres de archivos.</p>
  <h2>3. Atribución de campañas</h2><p>Con consentimiento de analítica, la sesión puede conservar la primera ruta de entrada, dominio referidor y parámetros presentes en la URL como <code>utm_source</code>, <code>utm_medium</code>, <code>utm_campaign</code>, <code>utm_content</code>, <code>utm_term</code>, <code>gclid</code>, <code>gbraid</code>, <code>wbraid</code> o <code>fbclid</code>. Su finalidad es relacionar una consulta comercial con el canal que originó la visita.</p>
  <h2>4. Herramientas externas</h2><p>La arquitectura permite cargar Google Tag Manager y Microsoft Clarity únicamente cuando sus identificadores de producción están configurados y el usuario ha aceptado medición. Si no existe configuración o no hay consentimiento, esos scripts no deben cargarse. La configuración productiva definitiva debe verificarse antes de aprobar esta política.</p>
  <h2>5. Rechazar o cambiar la elección</h2><p>Elegir solo almacenamiento necesario permite seguir navegando y cotizando. La preferencia puede volver a abrirse desde el control de privacidad/cookies del sitio. Al revocar analítica, el sistema deja de habilitar las herramientas opcionales para nuevas interacciones.</p>
  <h2>6. Vigencia</h2><p>Este borrador técnico fue actualizado el 22 de agosto de 2026 y debe revisarse cuando cambien herramientas de analítica, publicidad, consentimiento o el marco normativo aplicable.</p>
</div></article></main>}
