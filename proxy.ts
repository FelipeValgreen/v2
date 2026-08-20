import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resolveMigration } from "@/lib/migration";
import { isSolutionLaunchEnabled } from "@/lib/capabilities";

/**
 * Migration redirects are intentionally disabled unless the release pipeline
 * explicitly opts in. This prevents a preview deployment from activating
 * provisional SEO consolidations before GSC/analytics/backlink review.
 */
export function proxy(request: NextRequest) {
  if (process.env.RINON_ENABLE_MIGRATION_REDIRECTS !== "true") {
    return NextResponse.next();
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  const decision = resolveMigration(request.nextUrl.pathname);
  if (decision.action !== "MERGE_301" || decision.destination === request.nextUrl.pathname || !isSolutionLaunchEnabled(decision.destination)) {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  destination.pathname = decision.destination;
  return NextResponse.redirect(destination, 301);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|brand/).*)"],
};
