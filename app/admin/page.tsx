import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isAdminEnabled, isValidAdminToken } from "@/lib/admin-auth";
import { getAnalyticsSummary, isAnalyticsConfigured, type AnalyticsSummary } from "@/lib/analytics";
import { isLeadsConfigured, LEAD_STATUSES, listLeads, type LegacyLead } from "@/lib/leads";
import { PIPELINE_GROUPS, commercialCategoryLabel, pipelineGroupForStatus } from "@/lib/commercial";
import { isRevenueOpsEnabled } from "@/lib/revenue";

export const metadata: Metadata = { title: "Administración | RINON", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const periods = {
  hoy: { label: "Hoy", days: 1, bucket: "hour" as const },
  semana: { label: "7 días", days: 7, bucket: "day" as const },
  mes: { label: "30 días", days: 30, bucket: "day" as const },
  ano: { label: "12 meses", days: 365, bucket: "month" as const },
};
function emptySummary(): AnalyticsSummary { return { totals: { views: 0, visitors: 0, whatsapp: 0, phone: 0, leads: 0 }, series: [], topPages: [] }; }
function StatCard({ label, value, note }: { label: string; value: number; note: string }) { return <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><p className="text-sm text-gray-500">{label}</p><p className="mt-2 text-3xl font-bold text-gray-950">{value.toLocaleString("es-CL")}</p><p className="mt-1 text-xs text-gray-400">{note}</p></div>; }
function ActivityChart({ data }: { data: AnalyticsSummary["series"] }) { const max = Math.max(1, ...data.map((item) => item.views)); if (!data.length) return <div className="flex h-56 items-center justify-center text-sm text-gray-400">Los gráficos aparecerán cuando comiencen a llegar visitas.</div>; return <div className="flex h-64 items-end gap-2 overflow-x-auto border-b border-gray-200 pt-6">{data.map((item) => { const date = new Date(item.bucket); const label = data.length > 40 ? new Intl.DateTimeFormat("es-CL", { month: "short" }).format(date) : new Intl.DateTimeFormat("es-CL", { day: "2-digit", month: "short" }).format(date); return <div key={item.bucket} className="group flex h-full min-w-8 flex-1 flex-col items-center justify-end" title={`${label}: ${item.views} vistas, ${item.visitors} personas, ${item.contacts} contactos`}><div className="w-full max-w-12 rounded-t-md bg-orange-500 transition hover:bg-orange-600" style={{ height: `${Math.max(6, (item.views / max) * 88)}%` }} /><span className="mt-2 text-[10px] text-gray-500">{label}</span></div>; })}</div>; }
function yn(value: boolean | null | undefined) { return value === true ? "Sí" : value === false ? "No" : "—"; }
function compactDate(value?: string | null) { if (!value) return ""; const date = new Date(`${value}T12:00:00`); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("es-CL", { dateStyle: "medium" }).format(date); }
function LeadQualification({ lead }: { lead: LegacyLead }) {
  const facts = [
    lead.subcategoria ? ["Detalle", lead.subcategoria] : null,
    lead.cantidad_aprox ? ["Cantidad", lead.cantidad_aprox] : null,
    lead.fecha_objetivo ? ["Fecha objetivo", compactDate(lead.fecha_objetivo)] : null,
    lead.uso_proyecto ? ["Uso", lead.uso_proyecto] : null,
    lead.requiere_instalacion !== null && lead.requiere_instalacion !== undefined ? ["Instalación", yn(lead.requiere_instalacion)] : null,
    lead.tiene_plano !== null && lead.tiene_plano !== undefined ? ["Plano", yn(lead.tiene_plano)] : null,
    lead.estado_superficie ? ["Superficie", lead.estado_superficie] : null,
  ].filter(Boolean) as [string,string][];
  if (!facts.length) return null;
  return <dl className="mt-2 grid min-w-56 gap-1 text-xs">{facts.map(([label,value])=><div key={label} className="grid grid-cols-[90px_1fr] gap-2"><dt className="text-gray-400">{label}</dt><dd className="font-medium text-gray-700">{value}</dd></div>)}</dl>;
}
function LeadAttribution({ lead }: { lead: LegacyLead }) {
  const campaign = [lead.utm_source, lead.utm_medium].filter(Boolean).join(" / ");
  return <div className="grid min-w-44 gap-1 text-xs text-gray-500"><span>{lead.landing_path || lead.pagina_origen || "—"}</span>{campaign?<strong className="font-semibold text-gray-700">{campaign}</strong>:null}{lead.utm_campaign?<span>Campaña: {lead.utm_campaign}</span>:null}{lead.referrer_host?<span>Ref: {lead.referrer_host}</span>:null}{lead.gclid||lead.gbraid||lead.wbraid?<span className="text-[10px] font-semibold uppercase tracking-wide text-orange-700">Google Ads atribuido</span>:null}{lead.fbclid?<span className="text-[10px] font-semibold uppercase tracking-wide text-blue-700">Meta atribuido</span>:null}</div>;
}

function summarizePipeline(leads: LegacyLead[]) {
  return PIPELINE_GROUPS.map((group) => ({ ...group, count: leads.filter((lead) => pipelineGroupForStatus(lead.estado || "nuevo") === group.key).length }));
}
function summarizeCategories(leads: LegacyLead[]) {
  const counts = new Map<string, number>();
  for (const lead of leads) { const key = commercialCategoryLabel(lead.servicio || ""); counts.set(key, (counts.get(key) || 0) + 1); }
  return [...counts.entries()].sort((a,b)=>b[1]-a[1]).slice(0,8);
}
function filterLeads(leads: LegacyLead[], stage?: string, category?: string) {
  return leads.filter((lead) => {
    const stageOk = !stage || stage === "todos" || pipelineGroupForStatus(lead.estado || "nuevo") === stage;
    const categoryOk = !category || category === "todas" || commercialCategoryLabel(lead.servicio || "") === category;
    return stageOk && categoryOk;
  });
}
function queryHref(periodo: string, stage?: string, category?: string) {
  const params = new URLSearchParams({ periodo });
  if (stage && stage !== "todos") params.set("etapa", stage);
  if (category && category !== "todas") params.set("categoria", category);
  return `/admin?${params.toString()}`;
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string; periodo?: string; etapa?: string; categoria?: string }> }) {
  if (!isAdminEnabled()) notFound();
  const query = await searchParams;
  const authenticated = isValidAdminToken((await cookies()).get(ADMIN_COOKIE)?.value);
  const revenueEnabled = isRevenueOpsEnabled();
  if (!authenticated) return <main className="flex min-h-[70vh] items-center justify-center p-4"><form method="post" action="/api/admin/login" className="w-full max-w-sm rounded-2xl border border-gray-200 p-7 shadow-sm"><p className="text-sm text-gray-500">RINON</p><h1 className="mt-1 mb-6 text-2xl font-bold">Administración</h1><label className="text-sm font-medium">Contraseña<input type="password" name="password" required autoComplete="current-password" className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3" /></label>{query.error && <p className="mt-3 text-sm text-red-600">Contraseña incorrecta.</p>}<button className="mt-5 w-full rounded-xl bg-gray-900 py-3 font-bold text-white">Ingresar</button></form></main>;

  const periodKey = query.periodo && query.periodo in periods ? query.periodo as keyof typeof periods : "mes";
  const period = periods[periodKey];
  let leads = [] as Awaited<ReturnType<typeof listLeads>>; let analytics = emptySummary(); let loadError = "";
  try { [leads, analytics] = await Promise.all([isLeadsConfigured() ? listLeads() : Promise.resolve([]),isAnalyticsConfigured() ? getAnalyticsSummary(period.days, period.bucket) : Promise.resolve(emptySummary())]); } catch { loadError = "No fue posible cargar toda la información del panel."; }
  const contacts = analytics.totals.whatsapp + analytics.totals.phone + analytics.totals.leads;
  const pipeline = summarizePipeline(leads);
  const categories = summarizeCategories(leads);
  const visibleLeads = filterLeads(leads, query.etapa, query.categoria);
  const openLeads = leads.filter((lead)=>!["perdido","entregado"].includes(lead.estado || "nuevo")).length;
  const wonLeads = leads.filter((lead)=>["ganado","produccion","entregado"].includes(lead.estado || "")).length;
  const quotedLeads = leads.filter((lead)=>["cotizado","seguimiento","negociacion","ganado","produccion","entregado"].includes(lead.estado || "")).length;
  const winRate = quotedLeads ? Math.round((wonLeads / quotedLeads) * 100) : 0;

  return <main className="mx-auto max-w-7xl px-4 py-10">
    <header className="mb-8 flex items-start justify-between gap-4"><div><p className="text-sm text-gray-500">RINON 2.0</p><h1 className="text-3xl font-bold">Panel comercial</h1><p className="mt-1 text-gray-500">Actividad digital, contactos y avance del pipeline sobre el esquema actual de leads.</p></div><div className="flex gap-2">{revenueEnabled?<Link href="/admin/oportunidades" className="rounded-lg border border-gray-300 px-4 py-2 text-sm">Oportunidades y margen</Link>:null}<form method="post" action="/api/admin/logout"><button className="rounded-lg border border-gray-300 px-4 py-2 text-sm">Cerrar sesión</button></form></div></header>
    {loadError && <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-700">{loadError}</div>}
    <nav className="mb-6 flex flex-wrap gap-2" aria-label="Periodo de estadísticas">{Object.entries(periods).map(([key, item]) => <Link key={key} href={queryHref(key, query.etapa, query.categoria)} className={`rounded-full px-4 py-2 text-sm font-semibold ${periodKey === key ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>{item.label}</Link>)}</nav>

    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"><StatCard label="Personas" value={analytics.totals.visitors} note="visitantes anónimos" /><StatCard label="Contactos" value={contacts} note="acciones digitales" /><StatCard label="Leads abiertos" value={openLeads} note="sin cerrar/perder" /><StatCard label="Cotizados+" value={quotedLeads} note="alcanzaron cotización" /><StatCard label="Conversión sobre cotizados" value={winRate} note="% ganado / cotizados" /></section>

    <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><div className="flex items-end justify-between gap-3"><div><p className="text-sm font-semibold text-orange-700">Actividad</p><h2 className="text-xl font-bold">Visitas durante {period.label.toLowerCase()}</h2></div><div className="text-right text-xs text-gray-400">{analytics.totals.views.toLocaleString("es-CL")} páginas vistas · {analytics.totals.whatsapp.toLocaleString("es-CL")} WhatsApp</div></div><ActivityChart data={analytics.series} /></section>

    <section className="mt-8"><div className="mb-4"><p className="text-sm font-semibold text-orange-700">Pipeline</p><h2 className="text-xl font-bold">Dónde están las oportunidades</h2></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{pipeline.map((group)=><Link key={group.key} href={queryHref(periodKey, group.key, query.categoria)} className={`rounded-2xl border p-4 no-underline ${query.etapa===group.key?"border-orange-500 bg-orange-50":"border-gray-200 bg-white"}`}><span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{group.label}</span><strong className="mt-2 block text-3xl text-gray-950">{group.count}</strong></Link>)}</div></section>

    <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.5fr]"><div className="space-y-8"><section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><h2 className="text-xl font-bold">Páginas más vistas</h2><div className="mt-4 space-y-3">{analytics.topPages.map((page, index) => <div key={page.path} className="flex items-center gap-3"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold">{index + 1}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{page.path === "/" ? "Página principal" : page.path.replaceAll("-", " ")}</p></div><span className="text-sm font-bold">{page.views}</span></div>)}{!analytics.topPages.length && <p className="py-8 text-center text-sm text-gray-400">Aún no hay páginas vistas registradas.</p>}</div></section>
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><h2 className="text-xl font-bold">Demanda por categoría</h2><p className="mt-1 text-sm text-gray-500">Clasificación compatible con el campo de servicio existente.</p><div className="mt-4 space-y-2"><Link href={queryHref(periodKey, query.etapa)} className={`flex justify-between rounded-lg p-2 text-sm ${!query.categoria?"bg-gray-950 text-white":"bg-gray-50 text-gray-700"}`}><span>Todas</span><b>{leads.length}</b></Link>{categories.map(([label,count])=><Link key={label} href={queryHref(periodKey, query.etapa, label)} className={`flex justify-between rounded-lg p-2 text-sm ${query.categoria===label?"bg-orange-100 text-gray-950":"bg-gray-50 text-gray-700"}`}><span>{label}</span><b>{count}</b></Link>)}</div></section></div>

    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"><div className="p-5"><div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-xl font-bold">Contactos recibidos</h2><p className="text-sm text-gray-500">{visibleLeads.length} visibles de {leads.length} · ahora los nuevos formularios guardan calificación y atribución en campos estructurados.</p></div>{(query.etapa||query.categoria)&&<Link href={queryHref(periodKey)} className="text-sm font-semibold text-orange-700">Limpiar filtros</Link>}</div></div><div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-gray-50 text-left"><tr>{["Fecha", "Cliente", "WhatsApp", "Ubicación", "Solicitud", "Origen", "Estado", "Detalles"].map((h) => <th key={h} className="p-3 font-semibold">{h}</th>)}</tr></thead><tbody>{visibleLeads.map((lead) => <tr key={lead.id} className="border-t border-gray-100 align-top"><td className="p-3 whitespace-nowrap">{new Intl.DateTimeFormat("es-CL", { dateStyle: "short", timeStyle: "short", timeZone: "America/Santiago" }).format(new Date(lead.created_at))}</td><td className="p-3"><strong className="font-semibold">{lead.nombre}</strong>{lead.tipo_cliente?<span className="mt-1 block text-xs text-gray-500">{lead.tipo_cliente}</span>:null}{lead.empresa?<span className="block text-xs font-medium text-gray-700">{lead.empresa}</span>:null}</td><td className="p-3"><a href={`https://wa.me/${lead.telefono.replace(/\D/g, "")}`} className="text-green-700 underline">{lead.telefono}</a>{lead.email?<a href={`mailto:${lead.email}`} className="mt-1 block max-w-44 truncate text-xs text-gray-500">{lead.email}</a>:null}</td><td className="p-3">{lead.ubicacion_proyecto || lead.comuna}</td><td className="p-3"><b>{commercialCategoryLabel(lead.servicio)}</b><br/><span className="text-xs text-gray-500">{lead.servicio}</span><LeadQualification lead={lead}/></td><td className="p-3"><LeadAttribution lead={lead}/></td><td className="p-3"><form method="post" action={`/admin/api/leads/${lead.id}`}><select name="estado" defaultValue={lead.estado || "nuevo"} className="min-w-40 rounded-lg border border-gray-300 px-2 py-2 text-xs" aria-label={`Estado comercial de ${lead.nombre}`}>{LEAD_STATUSES.map((status) => <option key={status} value={status}>{status.replaceAll("_", " ")}</option>)}</select><button className="mt-2 block rounded-lg bg-gray-950 px-3 py-1.5 text-xs font-semibold text-white">Guardar</button></form></td><td className="min-w-72 p-3 whitespace-pre-wrap">{lead.mensaje || "—"}{Array.isArray(lead.archivo_ids)&&lead.archivo_ids.length?<div className="mt-3 flex flex-wrap gap-2 border-t border-gray-100 pt-3"><span className="w-full text-[10px] font-semibold uppercase tracking-wide text-gray-400">Adjuntos privados</span>{lead.archivo_ids.slice(0,3).map((attachmentId,index)=><a key={attachmentId} href={`/admin/api/leads/${lead.id}/attachments/${attachmentId}`} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-gray-300 bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-800 no-underline hover:border-orange-400 hover:bg-orange-50">Archivo {index+1} ↗</a>)}</div>:null}{revenueEnabled?<form method="post" action="/admin/api/opportunities" className="mt-3"><input type="hidden" name="lead_id" value={lead.id}/><input type="hidden" name="servicio" value={lead.servicio}/><input type="hidden" name="ubicacion" value={lead.ubicacion_proyecto || lead.comuna}/><input type="hidden" name="pagina_origen" value={lead.landing_path || lead.pagina_origen}/><input type="hidden" name="mensaje" value={lead.mensaje}/><button className="rounded bg-orange-500 px-2 py-1 text-xs font-semibold text-gray-950">Promover a oportunidad</button></form>:null}</td></tr>)}{visibleLeads.length === 0 && <tr><td colSpan={8} className="p-10 text-center text-gray-400">No hay contactos para este filtro.</td></tr>}</tbody></table></div></section></div>
    <p className="mt-6 text-xs text-gray-400">La tasa mostrada es operacional, no contable: ganado/producción/entregado sobre oportunidades que alcanzaron cotización. Margen e ingreso requieren el modelo CRM ampliado antes de ser medidos aquí.</p>
  </main>;
}
