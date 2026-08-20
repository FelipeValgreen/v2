import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const assets = [
  { source: '.asset-chunks/home-hero-conceptual-welding.webp', target: 'public/visuals/home-hero-conceptual-welding.webp', sha256: '58433b1c12782d0f683407022b6db3879a688a590497f65e4a9b32f52f8d33c8' },
  { source: '.asset-chunks/camarote-conceptual.webp', target: 'public/visuals/product-theatre/camarote-conceptual.webp', sha256: '9942ef3cb9b863fc3aebf2b0ad3face8f4fac86f161d588cb6f97e19ceaf35d6' },
  { source: '.asset-chunks/cierre-conceptual.webp', target: 'public/visuals/product-theatre/cierre-conceptual.webp', sha256: 'ff4442f43e235c88d78c2234f8c5c5484e8df1cf499e11f82370bfc781c2d58a' },
  { source: '.asset-chunks/estructura-conceptual.webp', target: 'public/visuals/product-theatre/estructura-conceptual.webp', sha256: '7d948f4abe4aca756f2bcde68479435b7738fc03099fd9435c771b28f786cc4c' },
];

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
  console.log(`ASSET ${asset.target} bytes=${binary.length} sha256=${actualHash}`);
  if (actualHash !== asset.sha256) mismatches.push(`${asset.target}: expected ${asset.sha256}, got ${actualHash}`);

  await mkdir(path.dirname(asset.target), { recursive: true });
  await writeFile(asset.target, binary);
}

if (mismatches.length) throw new Error(`Visual asset lock mismatch:\n${mismatches.join('\n')}`);
console.log('✓ All final RINON visual assets reconstructed and SHA-256 verified');
