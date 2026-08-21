import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const assets = [
  { id: 'RINON-VIS-P0-HOME-WELDING', source: '.asset-chunks/home-hero-conceptual-welding.webp', target: 'public/visuals/home-hero-conceptual-welding.webp', provenance: 'conceptual-context', minWidth: 700, minHeight: 700, sha256: 'd150f20dd38b61cb48e94dba24c304a23b8e09985416b6f4fca473487962951f' },
  { id: 'RINON-VIS-P1-BUNK', source: '.asset-chunks/camarote-conceptual.webp', target: 'public/visuals/product-theatre/camarote-conceptual.webp', provenance: 'conceptual-context', minWidth: 900, minHeight: 500, sha256: '34ecd542faeed218b673ab70d79480737d4da0ed68fd3ec54fca4f27a0664c9d' },
  { id: 'RINON-VIS-P1-FENCE', source: '.asset-chunks/cierre-conceptual.webp', target: 'public/visuals/product-theatre/cierre-conceptual.webp', provenance: 'conceptual-context', minWidth: 900, minHeight: 500, sha256: '934b333adfdbeae5a495beee0d22e7ac3f3d06c78dcee7f05ec264dddc191f62' },
  { id: 'RINON-VIS-P0-HOME-STRUCTURE-TEMP', source: '.asset-chunks/estructura-conceptual.webp', target: 'public/visuals/product-theatre/estructura-conceptual.webp', provenance: 'conceptual-context', minWidth: 900, minHeight: 500, sha256: 'ab18df9470c690bd68a4de1dea1e6bd2a28662a7727b1b5644eabfa6ddcbbd38' },
];

function webpDimensions(binary) {
  if (binary.subarray(0, 4).toString('ascii') !== 'RIFF' || binary.subarray(8, 12).toString('ascii') !== 'WEBP') throw new Error('Not a WebP RIFF container');
  let offset = 12;
  while (offset + 8 <= binary.length) {
    const type = binary.subarray(offset, offset + 4).toString('ascii');
    const size = binary.readUInt32LE(offset + 4);
    const data = offset + 8;
    if (type === 'VP8X' && size >= 10) {
      return {
        width: 1 + binary[data + 4] + (binary[data + 5] << 8) + (binary[data + 6] << 16),
        height: 1 + binary[data + 7] + (binary[data + 8] << 8) + (binary[data + 9] << 16),
      };
    }
    if (type === 'VP8L' && size >= 5 && binary[data] === 0x2f) {
      const bits = binary.readUInt32LE(data + 1);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (type === 'VP8 ' && size >= 10 && binary[data + 3] === 0x9d && binary[data + 4] === 0x01 && binary[data + 5] === 0x2a) {
      return { width: binary.readUInt16LE(data + 6) & 0x3fff, height: binary.readUInt16LE(data + 8) & 0x3fff };
    }
    offset = data + size + (size % 2);
  }
  throw new Error('Unable to read WebP dimensions');
}

const mismatches = [];
for (const asset of assets) {
  const entries = (await readdir(asset.source)).filter((name) => name.endsWith('.b64')).sort((a, b) => a.localeCompare(b));
  if (entries.length === 0) throw new Error(`No asset chunks found for ${asset.source}`);

  const encodedParts = await Promise.all(entries.map(async (name) => (await readFile(path.join(asset.source, name), 'utf8')).trim()));
  const binary = Buffer.from(encodedParts.join(''), 'base64');
  const riff = binary.subarray(0, 4).toString('ascii');
  const webp = binary.subarray(8, 12).toString('ascii');
  if (riff !== 'RIFF' || webp !== 'WEBP') throw new Error(`Invalid WebP signature for ${asset.target}: ${riff}/${webp}`);
  if (binary.length < 10000) throw new Error(`Unexpectedly small visual asset ${asset.target}: ${binary.length} bytes`);

  const actualHash = createHash('sha256').update(binary).digest('hex');
  const { width, height } = webpDimensions(binary);
  console.log(`ASSET ${asset.id} target=${asset.target} provenance=${asset.provenance} dimensions=${width}x${height} minimum=${asset.minWidth}x${asset.minHeight} bytes=${binary.length} sha256=${actualHash}`);
  if (actualHash !== asset.sha256) mismatches.push(`${asset.target}: expected ${asset.sha256}, got ${actualHash}`);
  if (width < asset.minWidth || height < asset.minHeight) mismatches.push(`${asset.target}: ${width}x${height} is below minimum ${asset.minWidth}x${asset.minHeight}`);

  await mkdir(path.dirname(asset.target), { recursive: true });
  await writeFile(asset.target, binary);
}

if (mismatches.length) throw new Error(`Visual asset lock mismatch:\n${mismatches.join('\n')}`);
console.log('✓ All final RINON visual assets reconstructed, measured, dimension-gated and SHA-256 verified');
