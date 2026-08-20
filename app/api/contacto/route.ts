import { readPublicJsonWrite } from "@/lib/request-security";
import { createLegacyLead, isLeadWriteConfigured } from "@/lib/leads";
import { buildLegacyLeadMessage, clean, quoteCategoryLabels } from "@/lib/quote";

export const runtime = "nodejs";
const attempts = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((time) => now - time < 3_600_000);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > 8;
}

export async function POST(request: Request) {
  if (!isLeadWriteConfigured()) {
    return Response.json({ error: "La persistencia de leads no está habilitada en este entorno." }, { status: 503 });
  }

  const requestBody = await readPublicJsonWrite(request, 32_000);
  if (!requestBody.ok) return requestBody.response;

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return Response.json({ error: "Demasiados intentos. Intenta más tarde." }, { status: 429 });

  const body = requestBody.body;
  if (clean(body.empresa_web, 100)) return Response.json({ ok: true });

  const nombre = clean(body.nombre, 100);
  const telefono = clean(body.telefono, 30).replace(/[^\d+ ()-]/g, "");
  const email = clean(body.email, 160);
  const ubicacion = clean(body.ubicacion, 100);
  const categoria = clean(body.categoria, 80);
  const servicio = quoteCategoryLabels[categoria] ?? categoria;
  const paginaOrigen = clean(body.pagina_origen, 300) || "/cotizar";

  if (nombre.length < 2 || telefono.replace(/\D/g, "").length < 8 || !ubicacion || !servicio) {
    return Response.json({ error: "Completa nombre, WhatsApp, ubicación y tipo de solicitud." }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: "El correo no es válido." }, { status: 400 });
  if (body.acepta_privacidad !== true) return Response.json({ error: "Debes aceptar el uso de tus datos." }, { status: 400 });

  try {
    await createLegacyLead({
      nombre,
      telefono,
      email: email || null,
      comuna: ubicacion,
      servicio,
      mensaje: buildLegacyLeadMessage(body),
      contacto_preferido: "WhatsApp",
      pagina_origen: paginaOrigen,
    }, ip);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Error al guardar cotización", error);
    return Response.json({ error: "No pudimos guardar tu solicitud. Puedes escribirnos por WhatsApp." }, { status: 503 });
  }
}
