import "server-only";
import { isPublicIntakeConfigured, sendPublicIntake } from "@/lib/public-intake";

export type LegacyLead = {
  id: string;
  created_at: string;
  nombre: string;
  telefono: string;
  email: string | null;
  comuna: string;
  servicio: string;
  mensaje: string;
  contacto_preferido: string;
  pagina_origen: string;
  estado: string;
  archivo_ids?: string[] | null;
};

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase no está configurado");
  return { url: url.replace(/\/$/, ""), key };
}

function getHeaders(key: string) {
  return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
}

export async function createLegacyLead(data: Omit<LegacyLead, "id" | "created_at" | "estado">, clientIp = "unknown") {
  const result = await sendPublicIntake("lead", { ...data, estado: "nuevo" }, clientIp);
  const id = typeof result.id === "string" ? result.id : "";
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    throw new Error("El intake no devolvió un identificador de lead válido");
  }
  return id;
}

export function isLeadWriteConfigured() {
  const writeEnabled = process.env.RINON_LEAD_WRITE_ENABLED === "true";
  const productionRelease = process.env.RINON_INDEXABLE === "true";
  const controlledPreviewWrite = process.env.RINON_ALLOW_PREVIEW_WRITES === "true";
  return writeEnabled && (productionRelease || controlledPreviewWrite) && isPublicIntakeConfigured();
}

export async function listLeads(): Promise<LegacyLead[]> {
  const config = getSupabaseConfig();
  const response = await fetch(`${config.url}/rest/v1/leads?select=*&order=created_at.desc&limit=500`, {
    headers: getHeaders(config.key),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`No fue posible cargar los contactos (${response.status})`);
  return response.json() as Promise<LegacyLead[]>;
}

export function isLeadsConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export const LEAD_STATUSES = [
  "nuevo",
  "contactado",
  "calificado",
  "requerimiento_completo",
  "cotizando",
  "cotizado",
  "seguimiento",
  "negociacion",
  "ganado",
  "perdido",
  "produccion",
  "entregado",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export function isLeadStatus(value: string): value is LeadStatus {
  return (LEAD_STATUSES as readonly string[]).includes(value);
}

export async function updateLeadStatus(id: string, estado: LeadStatus) {
  if (!/^[a-zA-Z0-9_-]{8,100}$/.test(id)) throw new Error("ID de lead inválido");
  const config = getSupabaseConfig();
  const response = await fetch(`${config.url}/rest/v1/leads?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { ...getHeaders(config.key), Prefer: "return=minimal" },
    body: JSON.stringify({ estado }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`No fue posible actualizar el contacto (${response.status})`);
}
