import { NextResponse } from "next/server";
import { ADMIN_COOKIE, isAdminEnabled } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isAdminEnabled()) return new NextResponse("No disponible", { status: 404, headers: { "Cache-Control": "no-store" } });
  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.headers.set("Cache-Control", "no-store");
  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: 0,
  });
  return response;
}
