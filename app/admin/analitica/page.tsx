import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ADMIN_COOKIE, isAdminEnabled, isValidAdminToken } from "@/lib/admin-auth";
import { getAnalyticsSummary, isAnalyticsConfigured } from "@/lib/analytics";

export const metadata: Metadata = { title: "Analítica comercial | RINON", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const periods = {
  hoy: { label: "Hoy", days: 1, bucket: "hour" as const },
  semana: { label: "7 días", days: 7, bucket: "day" as const },
  mes: { label: "30 días", days: 30, bucket: "day" as const },
  ano: { label: "12 meses", days: 365, bucket: "month" as const },
};

function Metric({label,value,note}:{label:string;value:number|string;note:string}){
  return <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">{label}</p><strong className="mt-2 block text-3xl text-gray-950">{typeof value==="number"?value.toLocaleString("es-CL"):value}</strong><p className="mt-1 text-xs text-gray-400">{note}</p></article>;
}

export default async function AnalyticsAdminPage({searchParams}:{searchParams:Promise<{periodo?:string}>}){
  if(!isAdminEnabled())notFound();
  const authenticated=isValidAdminToken((await cookies()).get(ADMIN_COOKIE)?.value);
  if(!authenticated)redirect("/admin");
  const query=await searchParams;
  const periodKey=query.periodo&&query.periodo in periods?query.periodo as keyof typeof periods:"mes";
  const period=periods[periodKey];
  if(!isAnalyticsConfigured())return <main className="mx-auto max-w-6xl px-4 py-10"><Link href="/admin" className="text-sm font-semibold text-orange-700">← Panel comercial</Link><h1 className="mt-4 text-3xl font-bold">Analítica comercial</h1><p className="mt-4 rounded-xl bg-amber-50 p-4 text-amber-900">Analytics interno no está configurado en este entorno.</p></main>;
  const analytics=await getAnalyticsSummary(period.days,period.bucket);
  const funnel=analytics.funnel??{quote_starts:analytics.totals.quote_starts??0,quote_submits:analytics.totals.quote_submits??0,leads:analytics.totals.leads,start_to_submit_rate:0,submit_to_lead_rate:0};
  const contactActions=analytics.totals.whatsapp+analytics.totals.phone;
  return <main className="mx-auto max-w-6xl px-4 py-10">
    <header className="flex flex-wrap items-end justify-between gap-4"><div><Link href="/admin" className="text-sm font-semibold text-orange-700">← Panel comercial</Link><p className="mt-4 text-sm text-gray-500">RINON 2.0 · medición first-party consentida</p><h1 className="text-3xl font-bold">Analítica comercial</h1><p className="mt-2 max-w-2xl text-gray-500">Embudo digital, acciones de contacto y señales de intención persistidas en el backend RINON, independientes de GTM.</p></div><nav className="flex flex-wrap gap-2" aria-label="Periodo">{Object.entries(periods).map(([key,item])=><Link key={key} href={`/admin/analitica?periodo=${key}`} className={`rounded-full px-4 py-2 text-sm font-semibold no-underline ${periodKey===key?"bg-gray-950 text-white":"bg-gray-100 text-gray-700"}`}>{item.label}</Link>)}</nav></header>

    <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Metric label="Visitantes" value={analytics.totals.visitors} note="personas anónimas con consentimiento"/>
      <Metric label="Cotizaciones iniciadas" value={funnel.quote_starts} note="evento quote_start"/>
      <Metric label="Cotizaciones enviadas" value={funnel.quote_submits} note="formulario enviado correctamente"/>
      <Metric label="Leads generados" value={funnel.leads} note="persistencia confirmada"/>
    </section>

    <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Metric label="Inicio → envío" value={`${Number(funnel.start_to_submit_rate||0).toLocaleString("es-CL")}%`} note="eficiencia del formulario"/>
      <Metric label="Envío → lead" value={`${Number(funnel.submit_to_lead_rate||0).toLocaleString("es-CL")}%`} note="confirmación backend"/>
      <Metric label="WhatsApp + teléfono" value={contactActions} note={`${analytics.totals.whatsapp} WhatsApp · ${analytics.totals.phone} llamadas`}/>
      <Metric label="Cómo llegar" value={(analytics.totals.maps??0)+(analytics.totals.waze??0)} note={`${analytics.totals.maps??0} Maps · ${analytics.totals.waze??0} Waze`}/>
    </section>

    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><div><p className="text-sm font-semibold text-orange-700">Embudo por periodo</p><h2 className="text-xl font-bold">Intención → cotización → lead</h2></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[680px] text-sm"><thead><tr className="border-b border-gray-200 text-left text-gray-500"><th className="p-3">Periodo</th><th className="p-3">Vistas</th><th className="p-3">Personas</th><th className="p-3">Inicios</th><th className="p-3">Envíos</th><th className="p-3">Contactos</th></tr></thead><tbody>{analytics.series.map(item=><tr key={item.bucket} className="border-b border-gray-100"><td className="p-3">{new Intl.DateTimeFormat("es-CL",{dateStyle:period.bucket==="hour"?"short":"medium",timeStyle:period.bucket==="hour"?"short":undefined,timeZone:"America/Santiago"}).format(new Date(item.bucket))}</td><td className="p-3 font-semibold">{item.views}</td><td className="p-3">{item.visitors}</td><td className="p-3">{item.quote_starts??0}</td><td className="p-3">{item.quote_submits??0}</td><td className="p-3">{item.contacts}</td></tr>)}</tbody></table>{!analytics.series.length?<p className="p-8 text-center text-gray-400">Aún no hay eventos consentidos para este periodo.</p>:null}</div></section>

    <p className="mt-6 text-xs leading-5 text-gray-400">Las métricas son first-party y solo se registran después del consentimiento analítico. `quote_submit` mide envío exitoso del formulario; `generate_lead` confirma la señal de lead que dispara la aplicación después de recibir respuesta satisfactoria.</p>
  </main>;
}
