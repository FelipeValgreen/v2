import "server-only";
export type WriteRequestCheck = { ok: true } | { ok: false; response: Response };
export type JsonWriteRead = { ok: true; body: Record<string, unknown> } | { ok: false; response: Response };

function normalizeOrigin(value: string) {
  try { return new URL(value).origin; } catch { return ""; }
}

/**
 * Baseline protection for public JSON write endpoints.
 * This is intentionally not treated as a replacement for persistent rate
 * limiting / WAF protection in production.
 */
export function validatePublicJsonWrite(request: Request, maxBytes = 32_000): WriteRequestCheck {
  const expected = normalizeOrigin(process.env.RINON_WRITE_ALLOWED_ORIGIN || "");
  if (!expected) {
    return { ok: false, response: Response.json({ error: "Canal de escritura no configurado." }, { status: 503 }) };
  }
  const origin = normalizeOrigin(request.headers.get("origin") || "");
  if (!origin || origin !== expected) {
    return { ok: false, response: Response.json({ error: "Origen no permitido." }, { status: 403 }) };
  }
  const contentType = (request.headers.get("content-type") || "").toLowerCase();
  if (!contentType.startsWith("application/json")) {
    return { ok: false, response: Response.json({ error: "Tipo de contenido no permitido." }, { status: 415 }) };
  }
  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader) {
    const contentLength = Number(contentLengthHeader);
    if (!Number.isFinite(contentLength) || contentLength < 0 || contentLength > maxBytes) {
      return { ok: false, response: Response.json({ error: "Solicitud demasiado grande." }, { status: 413 }) };
    }
  }
  return { ok: true };
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
