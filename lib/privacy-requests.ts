import "server-only";
export type PrivacyRequestType = "access" | "rectification" | "deletion" | "opposition" | "other";

export type PrivacyRequest = {
  id: string;
  created_at: string;
  request_type: PrivacyRequestType;
  nombre: string;
  email: string;
  telefono: string | null;
  details: string;
  status: "received" | "identity_check" | "in_review" | "resolved" | "rejected";
  source_path: string;
};

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase no está configurado");
  return { url: url.replace(/\/$/, ""), key };
}

function headers(key: string) {
  return { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
}

export function isPrivacyRequestWriteConfigured() {
  return process.env.RINON_PRIVACY_WRITE_ENABLED === "true" && Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export async function createPrivacyRequest(data: Omit<PrivacyRequest, "id" | "created_at" | "status">) {
  const config = getSupabaseConfig();
  const response = await fetch(`${config.url}/rest/v1/privacy_requests`, {
    method: "POST",
    headers: { ...headers(config.key), Prefer: "return=minimal" },
    body: JSON.stringify({ ...data, status: "received" }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`No fue posible registrar la solicitud (${response.status})`);
}
