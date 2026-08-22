import "server-only";

const PUBLIC_INTAKE_URL = "https://wbinwroidinsretcgsox.supabase.co/functions/v1/rinon-public-intake";
export type PublicIntakeKind = "lead" | "privacy" | "analytics";
export type PublicIntakeResult = { ok?: boolean; id?: string };

export async function sendPublicIntake(kind: PublicIntakeKind, data: Record<string, unknown>, clientIp = "unknown"): Promise<PublicIntakeResult> {
  const response = await fetch(PUBLIC_INTAKE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-rinon-client-ip": clientIp.slice(0, 100),
    },
    body: JSON.stringify({ kind, data }),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Public intake ${kind} failed (${response.status})${detail ? `: ${detail.slice(0, 300)}` : ""}`);
  }
  if (response.status === 204) return {};
  const payload = await response.json().catch(() => ({}));
  return payload && typeof payload === "object" ? payload as PublicIntakeResult : {};
}

export function isPublicIntakeConfigured() {
  return PUBLIC_INTAKE_URL.startsWith("https://") && PUBLIC_INTAKE_URL.includes(".supabase.co/functions/v1/");
}
