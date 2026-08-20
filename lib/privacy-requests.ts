import "server-only";
import { isPublicIntakeConfigured, sendPublicIntake } from "@/lib/public-intake";

export type PrivacyRequestType = "access" | "rectification" | "deletion" | "opposition" | "other";

export type PrivacyRequest = {
  id: string;
  created_at: string;
  request_type: PrivacyRequestType;
  nombre: string;
  email: string;
  telefono: string | null;
  details: string;
  status: "received" | "identity_check" | "in_review" | "resolved" | "rejected";
  source_path: string;
};

export function isPrivacyRequestWriteConfigured() {
  return isPublicIntakeConfigured();
}

export async function createPrivacyRequest(data: Omit<PrivacyRequest, "id" | "created_at" | "status">, clientIp = "unknown") {
  await sendPublicIntake("privacy", { ...data, status: "received" }, clientIp);
}
