import Link from "next/link";
import { PrivacyRequestForm } from "@/components/PrivacyRequestForm";
import { routeMetadata } from "@/lib/seo";
import { legalIdentity } from "@/lib/legal";

export const metadata=routeMetadata(
  "/solicitud-de-datos",
  "Solicitud sobre datos personales | RINON",
  "Canal para enviar una solicitud relacionada con datos personales tratados por RINON.",
  {indexable:false},
);

export default function Page(){return <main>
  <section className="hero compact-hero"><div className="container article-narrow"><div className="eyebrow">PRIVACIDAD · CANAL DE SOLICITUD</div><h1>Solicitudes relacionadas con tus datos personales.</h1><p className="lead">Utiliza este canal para pedir información, actualización, eliminación u otra gestión relacionada con datos personales que hayas entregado a RINON.</p><div className="route-kicker"><span>{legalIdentity.entityName}</span><span>RUT {legalIdentity.taxId}</span><span>{legalIdentity.operationalAddress}</span></div></div></section>
  <section className="section"><div className="container split"><div><div className="eyebrow">ANTES DE ENVIAR</div><h2>No envíes más información de la necesaria.</h2><p>Describe la interacción o dato que quieres revisar. Para proteger a la persona solicitante, RINON puede requerir verificación adicional antes de entregar, modificar o eliminar información.</p><ul className="simple-check"><li>No adjuntes cédula en el contacto inicial.</li><li>Usa un correo al que tengas acceso.</li><li>Indica contexto suficiente para ubicar el registro.</li><li>Una solicitud de privacidad se gestiona separada de las solicitudes comerciales.</li></ul><Link href="/politica-de-privacidad" className="text-link">Leer política de privacidad →</Link></div><PrivacyRequestForm/></div></section>
</main>}
