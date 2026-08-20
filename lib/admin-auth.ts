import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "rinon_admin";

export function isAdminEnabled() {
  return process.env.RINON_ADMIN_ENABLED === "true";
}

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const loginAttempts = new Map<string, number[]>();

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

export function getAdminToken() {
  const password = process.env.ADMIN_PASSWORD;
  return password ? digest(`rinon-admin:${password}`).toString("hex") : null;
}

export function isValidAdminToken(value?: string) {
  const expected = getAdminToken();
  if (!expected || !value) return false;
  const actualBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export function isValidAdminPassword(value: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !value || value.length > 256) return false;
  return timingSafeEqual(digest(value), digest(expected));
}

export function adminClientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")?.trim()
    || "unknown";
}

export function isAdminLoginRateLimited(clientKey: string) {
  const now = Date.now();
  const recent = (loginAttempts.get(clientKey) ?? []).filter((time) => now - time < WINDOW_MS);
  loginAttempts.set(clientKey, recent);
  return recent.length >= MAX_ATTEMPTS;
}

export function recordAdminLoginFailure(clientKey: string) {
  const now = Date.now();
  const recent = (loginAttempts.get(clientKey) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  loginAttempts.set(clientKey, recent);
}

export function clearAdminLoginFailures(clientKey: string) {
  loginAttempts.delete(clientKey);
}
