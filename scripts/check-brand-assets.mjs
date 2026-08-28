// Contrato estructural de assets de marca.
//
// Motivo: public/brand contenía dos archivos que pasaban HTTP 200 y que `file`
// reportaba como imágenes válidas, pero que ningún decodificador podía abrir:
//   - logo-rinon-horizontal-white.png  (PNG con chunk PLTE de CRC inválido)
//   - isotipo-rinoceronte-transparent.webp  (sin cabecera RIFF/WEBP)
// El logo roto se publicó en el header y el footer del sitio desplegado.
//
// Este check no usa navegador a propósito: corre dentro de `npm run build`, es
// decir también en Vercel, donde no hay Chromium. La verificación de render real
// en navegador vive en scripts/check-brand-assets-render.mjs y corre en qa:static.

import { readFileSync, readdirSync } from "node:fs";
import { crc32 } from "node:zlib";
import { extname, join } from "node:path";

const brandDir = "public/brand";
const supported = new Set([".png", ".webp", ".jpg", ".jpeg"]);

const fail = (asset, reason) => ({ asset, reason });

function readPng(buffer) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buffer.length < 8 || !buffer.subarray(0, 8).equals(signature)) {
    return { error: "firma PNG inválida" };
  }

  let offset = 8;
  let width = 0;
  let height = 0;
  let idatBytes = 0;
  let sawIhdr = false;
  let sawIend = false;

  while (offset < buffer.length) {
    if (offset + 8 > buffer.length) return { error: `cabecera de chunk truncada en offset ${offset}` };
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("latin1", offset + 4, offset + 8);
    const end = offset + 12 + length;
    if (end > buffer.length) {
      return { error: `chunk ${type} declara ${length} bytes y excede el archivo (faltan ${end - buffer.length})` };
    }

    const declared = buffer.readUInt32BE(end - 4);
    const computed = crc32(buffer.subarray(offset + 4, end - 4)) >>> 0;
    if (declared !== computed) return { error: `chunk ${type} con CRC inválido` };

    if (type === "IHDR") {
      sawIhdr = true;
      width = buffer.readUInt32BE(offset + 8);
      height = buffer.readUInt32BE(offset + 12);
    }
    if (type === "IDAT") idatBytes += length;
    if (type === "IEND") {
      sawIend = true;
      break;
    }

    offset = end;
  }

  if (!sawIhdr) return { error: "sin chunk IHDR" };
  if (!idatBytes) return { error: "sin datos de imagen (IDAT)" };
  if (!sawIend) return { error: "sin chunk IEND" };
  return { width, height };
}

function readWebp(buffer) {
  if (buffer.length < 16) return { error: "archivo demasiado corto para ser WebP" };
  if (buffer.toString("latin1", 0, 4) !== "RIFF" || buffer.toString("latin1", 8, 12) !== "WEBP") {
    return { error: "sin cabecera RIFF/WEBP" };
  }

  const fourcc = buffer.toString("latin1", 12, 16);

  if (fourcc === "VP8X") {
    const width = buffer.readUIntLE(24, 3) + 1;
    const height = buffer.readUIntLE(27, 3) + 1;
    return { width, height };
  }

  if (fourcc === "VP8L") {
    if (buffer[20] !== 0x2f) return { error: "firma VP8L inválida" };
    const bits = buffer.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }

  if (fourcc === "VP8 ") {
    const sync = buffer.subarray(23, 26);
    if (sync[0] !== 0x9d || sync[1] !== 0x01 || sync[2] !== 0x2a) return { error: "sync VP8 inválido" };
    return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
  }

  return { error: `fourcc WebP no reconocido: ${fourcc}` };
}

const sofMarkers = new Set([
  0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
]);

function readJpeg(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return { error: "sin marcador SOI" };

  let offset = 2;
  while (offset + 4 <= buffer.length) {
    if (buffer[offset] !== 0xff) return { error: `marcador inválido en offset ${offset}` };
    const marker = buffer[offset + 1];
    if (marker === 0xd8 || marker === 0xd9) return { error: "estructura JPEG inesperada" };

    const length = buffer.readUInt16BE(offset + 2);
    if (offset + 2 + length > buffer.length) return { error: "segmento JPEG truncado" };

    if (sofMarkers.has(marker)) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }

    offset += 2 + length;
  }

  return { error: "sin segmento SOF (dimensiones no declaradas)" };
}

const readers = new Map([
  [".png", readPng],
  [".webp", readWebp],
  [".jpg", readJpeg],
  [".jpeg", readJpeg],
]);

const assets = readdirSync(brandDir)
  .filter((name) => supported.has(extname(name).toLowerCase()))
  .sort();

if (!assets.length) {
  console.error("RINON BRAND ASSET CONTRACT FAILED: public/brand no contiene assets raster.");
  process.exit(1);
}

const failures = [];

for (const asset of assets) {
  const extension = extname(asset).toLowerCase();
  let buffer;
  try {
    buffer = readFileSync(join(brandDir, asset));
  } catch (error) {
    failures.push(fail(asset, `no se pudo leer (${error.message})`));
    continue;
  }

  let result;
  try {
    result = readers.get(extension)(buffer);
  } catch (error) {
    failures.push(fail(asset, `estructura ilegible (${error.message})`));
    continue;
  }

  if (result.error) {
    failures.push(fail(asset, result.error));
    continue;
  }

  if (!(result.width > 0) || !(result.height > 0)) {
    failures.push(fail(asset, `dimensiones inválidas (${result.width}x${result.height})`));
    continue;
  }

  console.log(`- ${asset}: ${result.width}x${result.height}`);
}

if (failures.length) {
  console.error(`RINON BRAND ASSET CONTRACT FAILED (${failures.length} asset${failures.length === 1 ? "" : "s"})`);
  for (const failure of failures) console.error(`- ${failure.asset}: ${failure.reason}`);
  console.error("HTTP 200 y `file` no son criterio de aceptación: el asset debe decodificar.");
  process.exit(1);
}

console.log(`RINON BRAND ASSET CONTRACT PASSED: ${assets.length} assets de public/brand con estructura y dimensiones válidas.`);
