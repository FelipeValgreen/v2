import "server-only";
export type WriteRequestCheck = { ok: true } | { ok: false; response: Response };
export type JsonWriteRead = { ok: true; body: Record<string, unknown> } | { ok: false; response: Response };
export type MultipartWriteRead = { ok: true; formData: FormData } | { ok: false; response: Response };

function normalizeOrigin(value: string) {
  try { return new URL(value).origin; } catch { return ""; }
}

function validatePublicWriteOrigin(request: Request): WriteRequestCheck {
  const expected = normalizeOrigin(process.env.RINON_WRITE_ALLOWED_ORIGIN || "");
  if (!expected) {
    return { ok: false, response: Response.json({ error: "Canal de escritura no configurado." }, { status: 503 }) };
  }
  const origin = normalizeOrigin(request.headers.get("origin") || "");
  if (!origin || origin !== expected) {
    return { ok: false, response: Response.json({ error: "Origen no permitido." }, { status: 403 }) };
  }
  return { ok: true };
}

function validateDeclaredLength(request: Request, maxBytes: number): WriteRequestCheck {
  const contentLengthHeader = request.headers.get("content-length");
  if (!contentLengthHeader) return { ok: true };
  const contentLength = Number(contentLengthHeader);
  if (!Number.isFinite(contentLength) || contentLength < 0 || contentLength > maxBytes) {
    return { ok: false, response: Response.json({ error: "Solicitud demasiado grande." }, { status: 413 }) };
  }
  return { ok: true };
}

/**
 * Baseline protection for public JSON write endpoints.
 * This is intentionally not treated as a replacement for persistent rate
 * limiting / WAF protection in production.
 */
export function validatePublicJsonWrite(request: Request, maxBytes = 32_000): WriteRequestCheck {
  const originCheck = validatePublicWriteOrigin(request);
  if (!originCheck.ok) return originCheck;
  const contentType = (request.headers.get("content-type") || "").toLowerCase();
  if (!contentType.startsWith("application/json")) {
    return { ok: false, response: Response.json({ error: "Tipo de contenido no permitido." }, { status: 415 }) };
  }
  return validateDeclaredLength(request, maxBytes);
}

/**
 * Reads and parses a bounded JSON body. The byte-size check is repeated on the
 * actual payload so security does not depend on Content-Length being present.
 */
export async function readPublicJsonWrite(request: Request, maxBytes = 32_000): Promise<JsonWriteRead> {
  const initial = validatePublicJsonWrite(request, maxBytes);
  if (!initial.ok) return initial;
  let raw: string;
  try { raw = await request.text(); } catch {
    return { ok: false, response: Response.json({ error: "Solicitud inválida." }, { status: 400 }) };
  }
  if (new TextEncoder().encode(raw).byteLength > maxBytes) {
    return { ok: false, response: Response.json({ error: "Solicitud demasiado grande." }, { status: 413 }) };
  }
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("invalid-object");
    return { ok: true, body: parsed as Record<string, unknown> };
  } catch {
    return { ok: false, response: Response.json({ error: "Solicitud inválida." }, { status: 400 }) };
  }
}

/**
 * Bounded multipart reader for public quote intake. The body is buffered only
 * after origin/content-type/declared-size checks, then its actual byte size is
 * enforced before FormData parsing. This prevents attachment limits from
 * relying exclusively on Content-Length.
 */
export async function readPublicMultipartWrite(request: Request, maxBytes = 16_000_000): Promise<MultipartWriteRead> {
  const originCheck = validatePublicWriteOrigin(request);
  if (!originCheck.ok) return originCheck;
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().startsWith("multipart/form-data")) {
    return { ok: false, response: Response.json({ error: "Tipo de contenido no permitido." }, { status: 415 }) };
  }
  const lengthCheck = validateDeclaredLength(request, maxBytes);
  if (!lengthCheck.ok) return lengthCheck;

  let raw: ArrayBuffer;
  try { raw = await request.arrayBuffer(); } catch {
    return { ok: false, response: Response.json({ error: "Solicitud inválida." }, { status: 400 }) };
  }
  if (raw.byteLength > maxBytes) {
    return { ok: false, response: Response.json({ error: "Solicitud demasiado grande." }, { status: 413 }) };
  }
  try {
    const formData = await new Response(raw, { headers: { "Content-Type": contentType } }).formData();
    return { ok: true, formData };
  } catch {
    return { ok: false, response: Response.json({ error: "Formulario inválido." }, { status: 400 }) };
  }
}
