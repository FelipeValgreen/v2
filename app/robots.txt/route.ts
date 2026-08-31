import { SEO_BASE_URL, isIndexableSite } from "@/lib/seo";

/**
 * robots.txt se sirve como ruta propia, no por el helper de metadatos de Next,
 * porque Content Signals no es una directiva que ese helper sepa emitir.
 *
 * Content Signals (contentsignals.org) declara la preferencia del titular sobre
 * el uso del contenido:
 *   search=yes     el buscador sigue autorizado a indexar y enlazar
 *   ai-train=no    no se autoriza entrenar modelos con este contenido
 *   ai-input=no    no se autoriza usarlo como entrada de sistemas de IA
 *
 * La señal se declara en los dos modos: una preferencia de uso no depende de
 * si el sitio está indexable. El gate de indexación es independiente y sigue
 * siendo fail-closed.
 */
const contentSignal = "Content-Signal: ai-train=no, search=yes, ai-input=no";

export function GET() {
  const lines = [contentSignal, "", "User-agent: *"];

  if (!isIndexableSite()) {
    // Preproducción: se bloquea todo rastreo. Mismo contrato fail-closed que antes.
    lines.push('Disallow: /');
  } else {
    lines.push("Allow: /", "Disallow: /api/", "Disallow: /admin", "Disallow: /admin/", "", `Sitemap: ${SEO_BASE_URL}/sitemap.xml`, `Host: ${SEO_BASE_URL}`);
  }

  return new Response(`${lines.join("\n")}\n`, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
