import { readPublicJsonWrite } from "@/lib/request-security";
import { createPrivacyRequest, isPrivacyRequestWriteConfigured, type PrivacyRequestType } from "@/lib/privacy-requests";

export const runtime = "nodejs";
const attempts = new Map<string, number[]>();
const requestTypes = new Set<PrivacyRequestType>(["access", "rectification", "deletion", "opposition", "other"]);

function clean(value: unknown, max = 1000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
function limited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  recent.push(now); attempts.set(ip, recent);
  return recent.length > 5;
}

export async function POST(request: Request) {
  if (!isPrivacyRequestWriteConfigured()) {
    return Response.json({ error: "El canal de solicitudes de privacidad aún no está habilitado en este entorno." }, { status: 503 });
  }
  const requestBody = await readPublicJsonWrite(request, 20_000);
  if (!requestBody.ok) return requestBody.response;

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return Response.json({ error: "Demasiados intentos. Intenta más tarde." }, { status: 429 });

  const body = requestBody.body;
  if (clean(body.empresa_web, 100)) return Response.json({ ok: true });

  const requestType = clean(body.request_type, 30) as PrivacyRequestType;
  const nombre = clean(body.nombre, 120);
  const email = clean(body.email, 160);
  const telefono = clean(body.telefono, 30).replace(/[^\d+ ()-]/g, "");
  const details = clean(body.details, 3000);
  const sourcePath = clean(body.source_path, 300) || "/solicitud-de-datos";

  if (!requestTypes.has(requestType) || nombre.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || details.length < 10) {
    return Response.json({ error: "Completa tipo de solicitud, nombre, correo válido y una descripción suficiente." }, { status: 400 });
  }
  if (body.acepta_tratamiento !== true) {
    return Response.json({ error: "Debes autorizar el uso de estos datos para tramitar la solicitud." }, { status: 400 });
  }

  try {
    await createPrivacyRequest({ request_type: requestType, nombre, email, telefono: telefono || null, details, source_path: sourcePath });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Error al registrar solicitud de privacidad", error);
    return Response.json({ error: "No pudimos registrar la solicitud en este momento." }, { status: 503 });
  }
}
