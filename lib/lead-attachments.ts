import "server-only";

const BUCKET = "rinon-lead-attachments";
const MAX_FILES = 3;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const allowedMimeToExtension: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "application/pdf": "pdf",
};

export type LeadAttachment = {
  id: string;
  lead_id: string;
  bucket_id: string;
  object_path: string;
  original_name: string;
  mime_type: string;
  size_bytes: number;
  created_at?: string;
};

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase no está configurado para adjuntos");
  return { url: url.replace(/\/$/, ""), key };
}

function authHeaders(key: string) {
  return { apikey: key, Authorization: `Bearer ${key}` };
}

function assertLeadId(leadId: string) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(leadId)) {
    throw new Error("ID de lead inválido para adjuntos");
  }
}

function cleanOriginalName(value: string) {
  return value.trim().replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 180) || "archivo";
}

export function validateLeadAttachments(files: File[]) {
  if (files.length > MAX_FILES) throw new Error(`Puedes adjuntar hasta ${MAX_FILES} archivos.`);
  for (const file of files) {
    if (!file.size) throw new Error("Uno de los archivos está vacío.");
    if (file.size > MAX_FILE_BYTES) throw new Error("Cada archivo puede pesar como máximo 5 MB.");
    if (!allowedMimeToExtension[file.type]) throw new Error("Solo se permiten JPG, PNG, WebP o PDF.");
  }
}

async function bestEffortDeleteObject(url: string, key: string, objectPath: string) {
  const encodedPath = objectPath.split("/").map(encodeURIComponent).join("/");
  await fetch(`${url}/storage/v1/object/${BUCKET}/${encodedPath}`, {
    method: "DELETE",
    headers: authHeaders(key),
    cache: "no-store",
  }).catch(() => undefined);
}

async function bestEffortDeleteMetadata(url: string, key: string, id: string) {
  await fetch(`${url}/rest/v1/rinon_lead_attachments?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { ...authHeaders(key), Prefer: "return=minimal" },
    cache: "no-store",
  }).catch(() => undefined);
}

async function rollbackStored(stored: LeadAttachment[]) {
  if (!stored.length) return;
  const { url, key } = getSupabaseConfig();
  await Promise.allSettled(stored.flatMap((item) => [
    bestEffortDeleteObject(url, key, item.object_path),
    bestEffortDeleteMetadata(url, key, item.id),
  ]));
}

async function uploadOne(leadId: string, file: File): Promise<LeadAttachment> {
  const { url, key } = getSupabaseConfig();
  const extension = allowedMimeToExtension[file.type];
  const objectPath = `${leadId}/${crypto.randomUUID()}.${extension}`;
  const encodedPath = objectPath.split("/").map(encodeURIComponent).join("/");
  const bytes = await file.arrayBuffer();

  const upload = await fetch(`${url}/storage/v1/object/${BUCKET}/${encodedPath}`, {
    method: "POST",
    headers: {
      ...authHeaders(key),
      "Content-Type": file.type,
      "x-upsert": "false",
    },
    body: bytes,
    cache: "no-store",
  });
  if (!upload.ok) throw new Error(`No fue posible guardar ${cleanOriginalName(file.name)} (${upload.status}).`);

  const metadata = {
    lead_id: leadId,
    bucket_id: BUCKET,
    object_path: objectPath,
    original_name: cleanOriginalName(file.name),
    mime_type: file.type,
    size_bytes: file.size,
  };
  const record = await fetch(`${url}/rest/v1/rinon_lead_attachments?select=*`, {
    method: "POST",
    headers: {
      ...authHeaders(key),
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(metadata),
    cache: "no-store",
  });
  if (!record.ok) {
    await bestEffortDeleteObject(url, key, objectPath);
    throw new Error(`No fue posible asociar ${metadata.original_name} al requerimiento.`);
  }
  const rows = await record.json() as LeadAttachment[];
  if (!rows[0]?.id) {
    await bestEffortDeleteObject(url, key, objectPath);
    throw new Error(`No fue posible registrar ${metadata.original_name}.`);
  }
  return rows[0];
}

export async function storeLeadAttachments(leadId: string, files: File[]) {
  assertLeadId(leadId);
  validateLeadAttachments(files);
  if (!files.length) return [] as LeadAttachment[];

  const stored: LeadAttachment[] = [];
  try {
    for (const file of files) stored.push(await uploadOne(leadId, file));

    const { url, key } = getSupabaseConfig();
    const patch = await fetch(`${url}/rest/v1/leads?id=eq.${encodeURIComponent(leadId)}`, {
      method: "PATCH",
      headers: {
        ...authHeaders(key),
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ archivo_ids: stored.map((item) => item.id) }),
      cache: "no-store",
    });
    if (!patch.ok) throw new Error(`No fue posible vincular los adjuntos al lead (${patch.status}).`);
    return stored;
  } catch (error) {
    await rollbackStored(stored);
    throw error;
  }
}

export async function listLeadAttachments(leadId: string): Promise<LeadAttachment[]> {
  assertLeadId(leadId);
  const { url, key } = getSupabaseConfig();
  const query = new URLSearchParams({ select: "*", lead_id: `eq.${leadId}`, order: "created_at.asc" });
  const response = await fetch(`${url}/rest/v1/rinon_lead_attachments?${query.toString()}`, {
    headers: { ...authHeaders(key), "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`No fue posible cargar adjuntos (${response.status})`);
  return response.json() as Promise<LeadAttachment[]>;
}
