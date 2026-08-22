import { readPublicJsonWrite, readPublicMultipartWrite } from "@/lib/request-security";
import { createLegacyLead, isLeadWriteConfigured } from "@/lib/leads";
import { buildLegacyLeadMessage, buildStructuredLeadFields, clean, quoteCategoryLabels } from "@/lib/quote";
import { storeLeadAttachments, validateLeadAttachments } from "@/lib/lead-attachments";

export const runtime = "nodejs";
const attempts = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((time) => now - time < 3_600_000);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > 8;
}

function recordFromFormData(formData: FormData) {
  const body: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && key !== "privacidad") body[key] = value;
  }
  body.acepta_privacidad = formData.get("privacidad") === "on";
  return body;
}

function filesFromFormData(formData: FormData) {
  return formData.getAll("attachments").filter((value): value is File => value instanceof File && value.size > 0);
}

function referrerHost(request: Request) {
  const value = request.headers.get("referer") || "";
  try { return value ? new URL(value).hostname.slice(0, 200) : ""; } catch { return ""; }
}

export async function POST(request: Request) {
  if (!isLeadWriteConfigured()) {
    return Response.json({ error: "La persistencia de leads no está habilitada en este entorno." }, { status: 503 });
  }

  const contentType = (request.headers.get("content-type") || "").toLowerCase();
  let body: Record<string, unknown>;
  let attachments: File[] = [];
  if (contentType.startsWith("multipart/form-data")) {
    const requestBody = await readPublicMultipartWrite(request, 16_000_000);
    if (!requestBody.ok) return requestBody.response;
    body = recordFromFormData(requestBody.formData);
    attachments = filesFromFormData(requestBody.formData);
    try { validateLeadAttachments(attachments); } catch (error) {
      return Response.json({ error: error instanceof Error ? error.message : "Adjuntos inválidos." }, { status: 400 });
    }
  } else {
    const requestBody = await readPublicJsonWrite(request, 32_000);
    if (!requestBody.ok) return requestBody.response;
    body = requestBody.body;
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) return Response.json({ error: "Demasiados intentos. Intenta más tarde." }, { status: 429 });

  if (clean(body.empresa_web, 100)) return Response.json({ ok: true });

  const nombre = clean(body.nombre, 100);
  const telefono = clean(body.telefono, 30).replace(/[^\d+ ()-]/g, "");
  const email = clean(body.email, 160);
  const ubicacion = clean(body.ubicacion, 100);
  const categoria = clean(body.categoria, 80);
  const servicio = quoteCategoryLabels[categoria] ?? categoria;
  const rawPaginaOrigen = clean(body.pagina_origen, 300);
  const paginaOrigen = rawPaginaOrigen.startsWith("/") ? rawPaginaOrigen : "/cotizar";
  body.referrer_host = clean(body.referrer_host, 200) || referrerHost(request);

  if (nombre.length < 2 || telefono.replace(/\D/g, "").length < 8 || !ubicacion || !servicio) {
    return Response.json({ error: "Completa nombre, WhatsApp, ubicación y tipo de solicitud." }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: "El correo no es válido." }, { status: 400 });
  if (body.acepta_privacidad !== true) return Response.json({ error: "Debes aceptar el uso de tus datos." }, { status: 400 });

  try {
    const leadId = await createLegacyLead({
      nombre,
      telefono,
      email: email || null,
      comuna: ubicacion,
      servicio,
      mensaje: buildLegacyLeadMessage(body),
      contacto_preferido: "WhatsApp",
      pagina_origen: paginaOrigen,
      ...buildStructuredLeadFields(body, paginaOrigen),
    }, ip);

    let attachmentsUploaded = 0;
    let attachmentWarning = "";
    if (attachments.length) {
      try {
        const stored = await storeLeadAttachments(leadId, attachments);
        attachmentsUploaded = stored.length;
      } catch (error) {
        console.error("Error al guardar adjuntos de cotización", error);
        attachmentWarning = "La solicitud quedó registrada, pero uno o más archivos no pudieron adjuntarse. Puedes enviarlos por WhatsApp.";
      }
    }

    return Response.json({ ok: true, id: leadId, attachments_uploaded: attachmentsUploaded, attachment_warning: attachmentWarning || undefined }, { status: 201 });
  } catch (error) {
    console.error("Error al guardar cotización", error);
    return Response.json({ error: "No pudimos guardar tu solicitud. Puedes escribirnos por WhatsApp." }, { status: 503 });
  }
}
