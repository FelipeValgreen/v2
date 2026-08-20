import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, isAdminEnabled, isValidAdminToken } from "@/lib/admin-auth";
import { isLeadStatus, updateLeadStatus } from "@/lib/leads";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdminEnabled()) return new NextResponse("No disponible", { status: 404, headers: { "Cache-Control": "no-store" } });
  const authenticated = isValidAdminToken((await cookies()).get(ADMIN_COOKIE)?.value);
  if (!authenticated) return new NextResponse("No autorizado", { status: 401, headers: { "Cache-Control": "no-store" } });

  const { id } = await params;
  let estado = "";
  try {
    const form = await request.formData();
    estado = String(form.get("estado") ?? "");
  } catch {
    return new NextResponse("Solicitud inválida", { status: 400, headers: { "Cache-Control": "no-store" } });
  }
  if (!isLeadStatus(estado)) return new NextResponse("Estado inválido", { status: 400, headers: { "Cache-Control": "no-store" } });

  try {
    await updateLeadStatus(id, estado);
  } catch {
    return new NextResponse("No fue posible actualizar el contacto", { status: 503, headers: { "Cache-Control": "no-store" } });
  }
  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
