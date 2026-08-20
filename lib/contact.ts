export const DEFAULT_PUBLIC_CONTACT = {
  whatsapp: "56975893742",
  phoneDisplay: "+56 9 7589 3742",
  addressLine: "Portezuelo 1506",
  locality: "San Bernardo",
  region: "Región Metropolitana",
  country: "Chile",
} as const;

export function publicWhatsAppNumber() {
  return (process.env.NEXT_PUBLIC_RINON_WHATSAPP_NUMBER ?? DEFAULT_PUBLIC_CONTACT.whatsapp).replace(/\D/g, "");
}

export function publicPhoneDisplay() {
  return (process.env.NEXT_PUBLIC_RINON_PHONE_DISPLAY ?? DEFAULT_PUBLIC_CONTACT.phoneDisplay).trim();
}

export function publicAddressLine() {
  return (process.env.NEXT_PUBLIC_RINON_PUBLIC_ADDRESS ?? DEFAULT_PUBLIC_CONTACT.addressLine).trim();
}

export function publicLocality() {
  return (process.env.NEXT_PUBLIC_RINON_PUBLIC_LOCALITY ?? DEFAULT_PUBLIC_CONTACT.locality).trim();
}

export function publicAddressDisplay() {
  return `${publicAddressLine()}, ${publicLocality()}`;
}

export function publicPhoneHref() {
  const number = publicWhatsAppNumber();
  return number ? `tel:+${number}` : null;
}

export function isPublicContactConfigured() {
  return publicWhatsAppNumber().length >= 10 && Boolean(publicPhoneDisplay() && publicAddressLine() && publicLocality());
}
