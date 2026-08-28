// Aceptación de render real en navegador para los assets de public/brand.
//
// Complementa scripts/check-brand-assets.mjs: aquel valida estructura sin navegador
// y corre dentro de `npm run build` (Vercel no tiene Chromium). Este exige que
// Chromium efectivamente decodifique cada asset, según AGENTS.md > Logo rule:
// "Acceptance requires actual browser rendering, not merely HTTP 200".
//
// Nota: naturalWidth > 0 NO es criterio suficiente por sí solo. Chromium decodifica
// parcialmente un PNG con IDAT incompleto y reporta las dimensiones del IHDR, que
// permanece intacto. Por eso el gate estructural es el que manda sobre integridad.

import { createReadStream, readdirSync } from "node:fs";
import { createServer } from "node:http";
import { extname, resolve } from "node:path";
import { chromium } from "@playwright/test";

const brandDir = "public/brand";
const mimeByExt = new Map([
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".png", "image/png"],
  [".webp", "image/webp"],
  [".svg", "image/svg+xml"],
]);

const assets = readdirSync(brandDir)
  .filter((name) => mimeByExt.has(extname(name).toLowerCase()))
  .sort();

if (!assets.length) {
  console.error("RINON BRAND RENDER CONTRACT FAILED: public/brand no contiene assets raster.");
  process.exit(1);
}

const server = createServer((request, response) => {
  const asset = decodeURIComponent(new URL(request.url ?? "/", "http://127.0.0.1").pathname.replace(/^\//, ""));
  if (!asset) {
    response.setHeader("content-type", "text/html");
    response.end("<!doctype html><title>RINON brand render check</title>");
    return;
  }
  const extension = extname(asset).toLowerCase();
  if (!assets.includes(asset) || !mimeByExt.has(extension)) {
    response.writeHead(404).end("not found");
    return;
  }
  response.setHeader("content-type", mimeByExt.get(extension));
  createReadStream(resolve(brandDir, asset)).pipe(response);
});

await new Promise((ready) => server.listen(0, "127.0.0.1", ready));
const { port } = server.address();

let browser;
const failures = [];

try {
  browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${port}/`);

  for (const asset of assets) {
    const result = await page.evaluate(async (src) => {
      const image = new Image();
      image.src = src;
      const settled = await Promise.race([
        image.decode().then(() => ({ decoded: true })).catch((error) => ({ decoded: false, message: String(error?.message ?? error) })),
        new Promise((done) => setTimeout(() => done({ decoded: false, message: "decode() no resolvió en 5s" }), 5000)),
      ]);
      return { ...settled, complete: image.complete, naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight };
    }, `http://127.0.0.1:${port}/${encodeURIComponent(asset)}`);

    if (!result.decoded || !result.complete || !(result.naturalWidth > 0) || !(result.naturalHeight > 0)) {
      failures.push(`${asset}: ${result.message ?? `${result.naturalWidth}x${result.naturalHeight}`}`);
      continue;
    }
    console.log(`- ${asset}: ${result.naturalWidth}x${result.naturalHeight}`);
  }
} finally {
  await browser?.close();
  await new Promise((closed) => server.close(closed));
}

if (failures.length) {
  console.error(`RINON BRAND RENDER CONTRACT FAILED (${failures.length} asset${failures.length === 1 ? "" : "s"})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`RINON BRAND RENDER CONTRACT PASSED: ${assets.length} assets de public/brand decodifican en Chromium.`);
