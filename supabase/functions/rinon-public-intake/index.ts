import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const jsonHeaders = { "Content-Type": "application/json", "Cache-Control": "no-store" };
const dbHeaders = { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, "Content-Type": "application/json" };
const kinds = new Set(["lead", "privacy", "analytics"]);
const analyticsEvents = new Set(["page_view", "view_product", "view_service", "quote_start", "quote_step", "quote_submit", "contact_whatsapp", "contact_phone", "generate_lead", "maps_click", "waze_click", "menu_product_click", "menu_service_click", "resource_view", "cta_click"]);
const privacyTypes = new Set(["access", "rectification", "deletion", "opposition", "other"]);

function clean(value: unknown, max = 1000) { return typeof value === "string" ? value.trim().slice(0, max) : ""; }
function nullable(value: unknown, max: number) { const text = clean(value, max); return text || null; }
function triBool(value: unknown) {
  if (typeof value === "boolean") return value;
  const text = clean(value, 20).toLowerCase();
  if (["sí", "si", "yes", "true"].includes(text)) return true;
  if (["no", "false"].includes(text)) return false;
  return null;
}
function validDate(value: unknown) { const text = clean(value, 20); return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : null; }
function response(body: unknown, status = 200) { return new Response(JSON.stringify(body), { status, headers: jsonHeaders }); }
async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
async function countAttempts(ipHash: string, kind: string, since: string, limit: number) {
  const query = new URLSearchParams({ select: "id", ip_hash: `eq.${ipHash}`, kind: `eq.${kind}`, created_at: `gte.${since}`, limit: String(limit) });
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rinon_intake_rate_limits?${query.toString()}`, { headers: dbHeaders, cache: "no-store" });
  if (!r.ok) throw new Error(`rate-limit read ${r.status}`);
  const rows = await r.json();
  return Array.isArray(rows) ? rows.length : 0;
}
async function recordAttempt(ipHash: string, kind: string) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rinon_intake_rate_limits`, { method: "POST", headers: { ...dbHeaders, Prefer: "return=minimal" }, body: JSON.stringify({ ip_hash: ipHash, kind }) });
  if (!r.ok) throw new Error(`rate-limit insert ${r.status}`);
}
async function insertRow(table: string, row: Record<string, unknown>) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, { method: "POST", headers: { ...dbHeaders, Prefer: "return=minimal" }, body: JSON.stringify(row) });
  if (!r.ok) throw new Error(`${table} insert ${r.status}: ${await r.text()}`);
}
async function insertRowReturningId(table: string, row: Record<string, unknown>) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=id`, { method: "POST", headers: { ...dbHeaders, Prefer: "return=representation" }, body: JSON.stringify(row) });
  if (!r.ok) throw new Error(`${table} insert ${r.status}: ${await r.text()}`);
  const rows = await r.json();
  const id = Array.isArray(rows) ? clean(rows[0]?.id, 80) : "";
  if (!id) throw new Error(`${table} insert did not return id`);
  return id;
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return response({ error: "Method not allowed" }, 405);
  const length = Number(req.headers.get("content-length") || "0");
  if (length > 32000) return response({ error: "Payload too large" }, 413);

  let body: any;
  try { body = await req.json(); } catch { return response({ error: "Invalid JSON" }, 400); }
  const kind = clean(body?.kind, 20);
  if (!kinds.has(kind)) return response({ error: "Invalid intake kind" }, 400);

  const sourceIp = clean(req.headers.get("x-forwarded-for")?.split(",")[0] || req.headers.get("x-real-ip") || "unknown", 100);
  const claimedIp = clean(req.headers.get("x-rinon-client-ip") || sourceIp, 100);
  const sourceHash = `src:${await sha256(sourceIp)}`;
  const clientHash = `client:${await sha256(`${sourceIp}|${claimedIp}`)}`;
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const clientLimit = kind === "privacy" ? 5 : kind === "analytics" ? 120 : 8;
  const sourceLimit = kind === "analytics" ? 2500 : 500;

  try {
    const [clientCount, sourceCount] = await Promise.all([
      countAttempts(clientHash, kind, since, clientLimit + 1),
      countAttempts(sourceHash, kind, since, sourceLimit + 1),
    ]);
    if (clientCount >= clientLimit || sourceCount >= sourceLimit) return response({ error: "Too many requests" }, 429);
    await Promise.all([recordAttempt(clientHash, kind), recordAttempt(sourceHash, kind)]);
  } catch (error) {
    console.error("rate-limit error", error);
    return response({ error: "Intake unavailable" }, 503);
  }

  try {
    const data = body?.data ?? {};
    if (kind === "lead") {
      const nombre = clean(data.nombre, 100);
      const telefono = clean(data.telefono, 30).replace(/[^\d+ ()-]/g, "");
      const email = clean(data.email, 160);
      const comuna = clean(data.comuna, 100);
      const servicio = clean(data.servicio, 120);
      const mensaje = clean(data.mensaje, 5000);
      const rawPaginaOrigen = clean(data.pagina_origen, 300);
      const paginaOrigen = rawPaginaOrigen.startsWith("/") ? rawPaginaOrigen : "/cotizar";
      if (nombre.length < 2 || telefono.replace(/\D/g, "").length < 8 || !comuna || !servicio) return response({ error: "Invalid lead" }, 400);
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return response({ error: "Invalid email" }, 400);

      const landingCandidate = clean(data.landing_path, 300);
      const landingPath = landingCandidate.startsWith("/") ? landingCandidate : paginaOrigen;
      const row = {
        nombre, telefono, email: email || null, comuna, servicio, mensaje,
        contacto_preferido: "WhatsApp", pagina_origen: paginaOrigen, estado: "nuevo",
        landing_path: landingPath,
        referrer_host: nullable(data.referrer_host, 200),
        utm_source: nullable(data.utm_source, 120), utm_medium: nullable(data.utm_medium, 120), utm_campaign: nullable(data.utm_campaign, 160), utm_term: nullable(data.utm_term, 160), utm_content: nullable(data.utm_content, 160),
        gclid: nullable(data.gclid, 180), gbraid: nullable(data.gbraid, 180), wbraid: nullable(data.wbraid, 180), fbclid: nullable(data.fbclid, 180),
        categoria: nullable(data.categoria, 80), subcategoria: nullable(data.subcategoria, 160), cantidad_aprox: nullable(data.cantidad_aprox, 80), ubicacion_proyecto: nullable(data.ubicacion_proyecto, 100) || comuna,
        fecha_objetivo: validDate(data.fecha_objetivo), requiere_instalacion: triBool(data.requiere_instalacion), tiene_plano: triBool(data.tiene_plano), uso_proyecto: nullable(data.uso_proyecto, 300), estado_superficie: nullable(data.estado_superficie, 100),
        tipo_cliente: nullable(data.tipo_cliente, 80), empresa: nullable(data.empresa, 160),
      };
      const id = await insertRowReturningId("leads", row);
      return response({ ok: true, id }, 201);
    }

    if (kind === "privacy") {
      const requestType = clean(data.request_type, 30);
      const nombre = clean(data.nombre, 120);
      const email = clean(data.email, 160);
      const telefono = clean(data.telefono, 30).replace(/[^\d+ ()-]/g, "");
      const details = clean(data.details, 3000);
      const sourcePath = clean(data.source_path, 300) || "/solicitud-de-datos";
      if (!privacyTypes.has(requestType) || nombre.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || details.length < 10) return response({ error: "Invalid privacy request" }, 400);
      await insertRow("privacy_requests", { request_type: requestType, nombre, email, telefono: telefono || null, details, status: "received", source_path: sourcePath });
      return response({ ok: true }, 201);
    }

    const eventName = clean(data.event_name, 40);
    const pagePath = clean(data.page_path, 500);
    const visitorId = clean(data.visitor_id, 80);
    const sessionId = clean(data.session_id, 80);
    if (!analyticsEvents.has(eventName) || !pagePath.startsWith("/") || !/^[a-zA-Z0-9_-]{8,80}$/.test(visitorId) || !/^[a-zA-Z0-9_-]{8,80}$/.test(sessionId)) return response({ error: "Invalid analytics event" }, 400);
    await insertRow("analytics_events", { event_name: eventName, page_path: pagePath, page_title: clean(data.page_title, 300), referrer_host: clean(data.referrer_host, 200), visitor_id: visitorId, session_id: sessionId });
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("intake write error", error);
    return response({ error: "Intake unavailable" }, 503);
  }
});
