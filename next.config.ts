import type { NextConfig } from "next";
import { legacyRedirects } from "./lib/legacy-redirects";

const productionRelease = process.env.RINON_INDEXABLE === "true";
/**
 * Legacy rinon.cl URL redirects (lib/legacy-redirects.ts) are evaluated at build time and stay
 * fail-closed: nothing is emitted unless RINON_ENABLE_MIGRATION_REDIRECTS=true. The 58 live-observed
 * URLs that are still GSC-pending additionally require RINON_REDIRECT_GSC_PENDING=true.
 */
const migrationRedirectsEnabled = process.env.RINON_ENABLE_MIGRATION_REDIRECTS === "true";
const gscPendingRedirectsEnabled = process.env.RINON_REDIRECT_GSC_PENDING === "true";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "frame-src https://www.google.com https://maps.google.com",
  "form-action 'self'",
  "img-src 'self' data: blob: https://*.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms https://*.google.com https://*.gstatic.com",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  ...(productionRelease ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }] : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    if (!migrationRedirectsEnabled) return [];
    return legacyRedirects
      .filter((entry) => entry.tier === "family" || gscPendingRedirectsEnabled)
      .map((entry) => ({ source: entry.source, destination: entry.destination, statusCode: 301 as const }));
  },
  async headers() {
    const noStore = [{ key: "Cache-Control", value: "no-store, max-age=0" }];
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/admin/:path*", headers: noStore },
      { source: "/api/admin/:path*", headers: noStore },
    ];
  },
};

export default nextConfig;
