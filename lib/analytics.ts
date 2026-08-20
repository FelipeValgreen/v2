import "server-only";
export const ANALYTICS_EVENTS = ["page_view", "contact_whatsapp", "contact_phone", "generate_lead"] as const;
export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[number];

export type AnalyticsSummary = {
  totals: { views: number; visitors: number; whatsapp: number; phone: number; leads: number };
  series: Array<{ bucket: string; views: number; visitors: number; contacts: number }>;
  topPages: Array<{ path: string; views: number; visitors: number }>;
};

type AnalyticsEvent = {
  event_name: AnalyticsEventName;
  page_path: string;
  page_title: string;
  referrer_host: string;
  visitor_id: string;
  session_id: string;
};

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase no está configurado");
  return { url: url.replace(/\/$/, ""), key };
}
function getHeaders(key: string) { return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" }; }
export function isAnalyticsConfigured() { return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY); }
export async function createAnalyticsEvent(event: AnalyticsEvent) {
  const config = getSupabaseConfig();
  const response = await fetch(`${config.url}/rest/v1/analytics_events`, {
    method: "POST",
    headers: { ...getHeaders(config.key), Prefer: "return=minimal" },
    body: JSON.stringify(event),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`No fue posible registrar el evento (${response.status})`);
}

export async function getAnalyticsSummary(days: number, bucket: "hour" | "day" | "month") {
  const config = getSupabaseConfig();
  const response = await fetch(`${config.url}/rest/v1/rpc/rinon_analytics_summary`, {
    method: "POST",
    headers: getHeaders(config.key),
    body: JSON.stringify({ p_days: days, p_bucket: bucket }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`No fue posible cargar las estadísticas (${response.status})`);
  return response.json() as Promise<AnalyticsSummary>;
}
