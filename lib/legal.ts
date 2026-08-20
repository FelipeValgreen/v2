import { publicAddressDisplay } from "@/lib/contact";

export const legalIdentity = {
  entityName: process.env.NEXT_PUBLIC_RINON_LEGAL_ENTITY?.trim() || "Tolipoli SpA",
  taxId: process.env.NEXT_PUBLIC_RINON_LEGAL_TAX_ID?.trim() || "77.795.508-K",
  legalRepresentative: process.env.NEXT_PUBLIC_RINON_LEGAL_REPRESENTATIVE?.trim() || "",
  legalAddress: process.env.NEXT_PUBLIC_RINON_LEGAL_ADDRESS?.trim() || "", // optional; do not infer from operating address
  operationalAddress: publicAddressDisplay(),
  privacyEmail: process.env.NEXT_PUBLIC_RINON_PRIVACY_EMAIL?.trim() || "",
  privacyRequestPath: "/solicitud-de-datos",
};

export const legalApproved = process.env.RINON_LEGAL_APPROVED === "true";

export function isLegalIdentityConfigured(){
  return Boolean(legalIdentity.entityName && legalIdentity.taxId && legalIdentity.legalRepresentative && legalIdentity.operationalAddress && legalIdentity.privacyRequestPath);
}

export function isLegalPublicationReady(){
  return legalApproved && isLegalIdentityConfigured();
}
