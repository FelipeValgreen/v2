export const approvedLegacyBlogRedirects: Readonly<Record<string, string>> = {
  "como-cotizar-rejas-metalicas": "/recursos/como-cotizar-rejas-metalicas",
  "tipos-de-cierres-perimetrales": "/recursos/tipos-de-cierres-perimetrales",
  "porton-corredizo-vs-batiente": "/recursos/porton-corredizo-vs-batiente",
  "mezzanine-metalico-bodega-guia": "/recursos/mezzanine-metalico-bodega-guia",
  "proveedor-camarotes-empresas": "/recursos/proveedor-camarotes-empresas",
  "como-elegir-reja-metalica-frontis": "/recursos/como-elegir-reja-metalica-frontis",
};

export function getApprovedLegacyBlogRedirect(slug: string) {
  return approvedLegacyBlogRedirects[slug];
}
