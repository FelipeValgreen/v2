import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  isAdminEnabled,
  adminClientKey,
  clearAdminLoginFailures,
  getAdminToken,
  isAdminLoginRateLimited,
  isValidAdminPassword,
  recordAdminLoginFailure,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isAdminEnabled()) return new NextResponse("No disponible", { status: 404, headers: { "Cache-Control": "no-store" } });
  const clientKey = adminClientKey(request);
  if (isAdminLoginRateLimited(clientKey)) {
    return new NextResponse("Demasiados intentos. Intenta nuevamente más tarde.", {
      status: 429,
      headers: { "Cache-Control": "no-store", "Retry-After": "900" },
    });
  }

  let password = "";
  try {
    const form = await request.formData();
    password = String(form.get("password") ?? "").slice(0, 257);
  } catch {
    return new NextResponse("Solicitud inválida.", { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  if (!isValidAdminPassword(password)) {
    recordAdminLoginFailure(clientKey);
    const response = NextResponse.redirect(new URL("/admin?error=1", request.url), 303);
    response.headers.set("Cache-Control", "no-store");
    return response;
  }

  clearAdminLoginFailures(clientKey);
  const token = getAdminToken();
  if (!token) return new NextResponse("Panel no configurado.", { status: 503, headers: { "Cache-Control": "no-store" } });

  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.headers.set("Cache-Control", "no-store");
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: 28_800,
  });
  return response;
}
