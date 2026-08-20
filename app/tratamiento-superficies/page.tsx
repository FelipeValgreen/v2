import Link from "next/link";
import { routeMetadata } from "@/lib/seo";
import { isSolutionLaunchEnabled } from "@/lib/capabilities";
import { TechnicalVisual } from "@/components/TechnicalVisual";
const launchEnabled = isSolutionLaunchEnabled("/tratamiento-superficies");
export const metadata = routeMetadata("/tratamiento-superficies","Tratamiento de superficies metálicas","Consulta por preparación y terminación de superficies metálicas disponibles en RINON.",{ indexable: launchEnabled });
export default function Page(){return <main><section className="v2-solution-hero"><div className="container v2-solution-hero-grid"><div><div className="v2-eyebrow">TRATAMIENTO DE SUPERFICIES</div><h1>Terminaciones metálicas según el requerimiento de cada pieza.</h1><p>Publicamos únicamente procesos cuyo alcance operativo esté confirmado. Mientras un servicio siga en validación, atendemos consultas sin presentarlo como una disponibilidad confirmada.</p><div className="v2-actions">{launchEnabled?<Link className="v2-btn orange" href="/pintura-electrostatica">Ver pintura electrostática</Link>:<Link className="v2-btn orange" href="/contacto">Consultar por una terminación</Link>}</div></div><TechnicalVisual kind="surface" label="Preparación · aplicación · resultado" detail="El alcance depende de material, estado y terminación requerida" /></div></section></main>}
