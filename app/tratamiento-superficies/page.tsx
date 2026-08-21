import Link from "next/link";
import { routeMetadata } from "@/lib/seo";
import { isSolutionLaunchEnabled } from "@/lib/capabilities";
import { CommercialEvidencePanel } from "@/components/CommercialEvidencePanel";

const launchEnabled = isSolutionLaunchEnabled("/tratamiento-superficies");
export const metadata = routeMetadata("/tratamiento-superficies","Tratamiento de superficies metálicas","Consulta por preparación y terminación de superficies metálicas disponibles en RINON.",{ indexable: launchEnabled });

const evaluation=[
 {label:"Material",body:"Tipo de metal y condición de la pieza que se necesita tratar."},
 {label:"Estado",body:"Superficie nueva, usada, oxidada, pintada o con preparación previa por confirmar."},
 {label:"Terminación",body:"Resultado visual o funcional esperado según el proceso disponible."},
 {label:"Alcance",body:"Proceso, cantidad y dimensiones que deben validarse antes de confirmar disponibilidad."},
] as const;

export default function Page(){return <main><section className="v2-solution-hero"><div className="container v2-solution-hero-grid"><div><div className="v2-eyebrow">TRATAMIENTO DE SUPERFICIES</div><h1>Terminaciones metálicas según el requerimiento de cada pieza.</h1><p>Publicamos únicamente procesos cuyo alcance operativo esté confirmado. Mientras un servicio siga en validación, atendemos consultas sin presentarlo como una disponibilidad confirmada.</p><div className="v2-actions">{launchEnabled?<Link className="v2-btn orange" href="/pintura-electrostatica">Ver pintura electrostática</Link>:<Link className="v2-btn orange" href="/contacto">Consultar por una terminación</Link>}</div></div><CommercialEvidencePanel title="ANTES DE CONFIRMAR" items={evaluation} note="La disponibilidad final depende del material, estado de la pieza, terminación requerida y capacidad vigente."/></div></section></main>}
