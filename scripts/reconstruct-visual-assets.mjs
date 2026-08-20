import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const assets = [
  { source: '.asset-chunks/home-hero-conceptual-welding.webp', target: 'public/visuals/home-hero-conceptual-welding.webp', sha256: 'd150f20dd38b61cb48e94dba24c304a23b8e09985416b6f4fca473487962951f' },
  { source: '.asset-chunks/camarote-conceptual.webp', target: 'public/visuals/product-theatre/camarote-conceptual.webp', sha256: '34ecd542faeed218b673ab70d79480737d4da0ed68fd3ec54fca4f27a0664c9d' },
  { source: '.asset-chunks/cierre-conceptual.webp', target: 'public/visuals/product-theatre/cierre-conceptual.webp', sha256: '934b333adfdbeae5a495beee0d22e7ac3f3d06c78dcee7f05ec264dddc191f62' },
  { source: '.asset-chunks/estructura-conceptual.webp', target: 'public/visuals/product-theatre/estructura-conceptual.webp', sha256: 'ab18df9470c690bd68a4de1dea1e6bd2a28662a7727b1b5644eabfa6ddcbbd38' },
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
