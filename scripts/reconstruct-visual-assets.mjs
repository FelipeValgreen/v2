import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const assets = [
  {
    source: '.asset-chunks/home-hero-conceptual-welding.webp',
    target: 'public/visuals/home-hero-conceptual-welding.webp',
    sha256: 'd543438a0c2729238b8a3b9f45743210a6890e57dab33c244404d993b79bd74d',
  },
  {
    source: '.asset-chunks/camarote-conceptual.webp',
    target: 'public/visuals/product-theatre/camarote-conceptual.webp',
    sha256: '34ecd542faeed218b673ab70d79480737d4da0ed68fd3ec54fca4f27a0664c9d',
  },
  {
    source: '.asset-chunks/cierre-conceptual.webp',
    target: 'public/visuals/product-theatre/cierre-conceptual.webp',
    sha256: '934b333adfdbeae5a495beee0d22e7ac3f3d06c78dcee7f05ec264dddc191f62',
  },
  {
    source: '.asset-chunks/estructura-conceptual.webp',
    target: 'public/visuals/product-theatre/estructura-conceptual.webp',
    sha256: 'ab18df9470c690bd68a4de1dea1e6bd2a28662a7727b1b5644eabfa6ddcbbd38',
  },
];

for (const asset of assets) {
  const entries = (await readdir(asset.source))
    .filter((name) => name.endsWith('.b64'))
    .sort((a, b) => a.localeCompare(b));

  if (entries.length === 0) {
    throw new Error(`No asset chunks found for ${asset.source}`);
  }

  const encodedParts = await Promise.all(
    entries.map(async (name) => (await readFile(path.join(asset.source, name), 'utf8')).trim()),
  );
  const binary = Buffer.from(encodedParts.join(''), 'base64');
  const actualHash = createHash('sha256').update(binary).digest('hex');

  if (actualHash !== asset.sha256) {
    throw new Error(`Asset hash mismatch for ${asset.target}: expected ${asset.sha256}, got ${actualHash}`);
  }

  await mkdir(path.dirname(asset.target), { recursive: true });
  await writeFile(asset.target, binary);
  console.log(`✓ ${asset.target} (${binary.length} bytes, SHA-256 verified)`);
}
