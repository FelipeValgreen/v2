import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isAdminEnabled, isValidAdminToken } from "@/lib/admin-auth";
import { fetchLeadAttachmentContent, getLeadAttachment } from "@/lib/lead-attachments";

export const runtime = "nodejs";

function safeFilename(value: string) {
  return value.replace(/[\r\n"\\]/g, "_").slice(0, 180) || "adjunto";
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string; attachmentId: string }> }) {
  const noStore = { "Cache-Control": "private, no-store" };
  if (!isAdminEnabled()) return new NextResponse("No disponible", { status: 404, headers: noStore });
  const authenticated = isValidAdminToken((await cookies()).get(ADMIN_COOKIE)?.value);
  if (!authenticated) return new NextResponse("No autorizado", { status: 401, headers: noStore });

  const { id, attachmentId } = await params;
  try {
    const attachment = await getLeadAttachment(id, attachmentId);
    if (!attachment) return new NextResponse("Adjunto no encontrado", { status: 404, headers: noStore });
    const source = await fetchLeadAttachmentContent(attachment);
    const filename = safeFilename(attachment.original_name);
    return new NextResponse(source.body, {
      status: 200,
      headers: {
        ...noStore,
        "Content-Type": attachment.mime_type,
        "Content-Length": String(attachment.size_bytes),
        "Content-Disposition": `inline; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
        "X-Content-Type-Options": "nosniff",
        "Cross-Origin-Resource-Policy": "same-origin",
      },
    });
  } catch (error) {
    console.error("No fue posible servir el adjunto privado", error);
    return new NextResponse("No fue posible abrir el adjunto", { status: 503, headers: noStore });
  }
}
