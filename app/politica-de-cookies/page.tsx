import { isLegalPublicationReady } from "@/lib/legal";
import { routeMetadata } from "@/lib/seo";

const ready=isLegalPublicationReady();
export const metadata=routeMetadata("/politica-de-cookies", "Política de cookies | RINON", "Cómo RINON utiliza almacenamiento necesario y activa medición opcional según las preferencias del usuario.", {indexable:ready});

export default function Page(){return <main><article className="section"><div className="container article-narrow">
  <div className="eyebrow">COOKIES Y MEDICIÓN</div><h1>Preferencias de almacenamiento y analítica</h1>
  <p className="lead">RINON utiliza un enfoque de consentimiento previo para la medición opcional: la navegación básica no depende de aceptar analítica.</p>
  {!ready?<div className="legal-draft-warning"><b>Publicación legal pendiente de aprobación.</b><p>Antes de publicar esta política se debe confirmar el inventario real de herramientas de medición y proveedores activos.</p></div>:null}
  <h2>1. Almacenamiento necesario</h2><p>El sitio puede usar almacenamiento local imprescindible para recordar la elección de privacidad y mantener funciones técnicas de la sesión. La implementación actual utiliza la clave <code>rinon_cookie_consent</code> para recordar la preferencia seleccionada.</p>
  <h2>2. Medición opcional</h2><p>Cuando el usuario acepta medición, RINON puede habilitar herramientas de analítica y registrar eventos como páginas vistas, inicio de cotización, contacto por WhatsApp o teléfono y envío confirmado de formularios. Estos eventos no deben incluir nombre, correo, teléfono, contenido del mensaje ni nombres de archivos.</p>
  <h2>3. Rechazar o cambiar la elección</h2><p>Elegir solo almacenamiento necesario debe seguir permitiendo usar el sitio y cotizar. La preferencia puede volver a abrirse desde el enlace de privacidad/cookies del sitio. Al revocar analítica, la implementación reinicia el estado de medición para evitar continuar una sesión opcional ya rechazada.</p>
  <h2>4. Terceros</h2><p>La lista definitiva de cookies o identificadores de terceros depende de las herramientas efectivamente activas. Antes de publicar cambios se verifica su comportamiento con y sin consentimiento para que esta información coincida con el sitio real.</p>
  <h2>5. Vigencia</h2><p>Esta especificación fue actualizada el 19 de agosto de 2026 y debe revisarse cuando cambie la herramienta de analítica, publicidad, consentimiento o el marco normativo aplicable.</p>
</div></article></main>}
