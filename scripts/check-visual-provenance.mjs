import fs from "node:fs";
import path from "node:path";

const root=process.cwd();
const visualsPath=path.join(root,"lib","visuals.ts");
const structuresBriefPath=path.join(root,"docs","STRUCTURES_VISUAL_BRIEF.md");
const inventoryPath=path.join(root,"docs","VISUAL_PROVENANCE_INVENTORY.md");
const reconstructionPath=path.join(root,"scripts","reconstruct-visual-assets.mjs");
const homePath=path.join(root,"app","page.tsx");
const xrayPath=path.join(root,"components","XRayMetal.tsx");

function fail(message){
 console.error(`✗ ${message}`);
 process.exitCode=1;
}
function pass(message){console.log(`✓ ${message}`)}

if(!fs.existsSync(visualsPath)){
 fail("lib/visuals.ts exists");
 process.exit(1);
}

const source=fs.readFileSync(visualsPath,"utf8");
const inventory=fs.existsSync(inventoryPath)?fs.readFileSync(inventoryPath,"utf8"):"";
const reconstruction=fs.existsSync(reconstructionPath)?fs.readFileSync(reconstructionPath,"utf8"):"";
const home=fs.existsSync(homePath)?fs.readFileSync(homePath,"utf8"):"";
const xray=fs.existsSync(xrayPath)?fs.readFileSync(xrayPath,"utf8"):"";
const assetBlocks=[...source.matchAll(/\{\s*\n\s*src:\s*[`\"][\s\S]*?\n\s*\},?/g)].map(match=>match[0]);

if(assetBlocks.length===0){
 fail("visual registry contains auditable asset blocks");
 process.exit(1);
}
pass(`visual registry exposes ${assetBlocks.length} auditable assets`);

for(const [index,block] of assetBlocks.entries()){
 const src=block.match(/src:\s*([`\"])(.*?)\1/s)?.[2] ?? `asset-${index+1}`;
 if(!/provenance:\s*"(?:verified-rinon|current-site-approved|user-drive-reference|conceptual)"/.test(block)) fail(`${src} declares an allowed provenance`);
 else pass(`${src} declares provenance`);
 if(!/sourceRef:\s*"[^\"]+"/.test(block)) fail(`${src} declares sourceRef`);
 else pass(`${src} declares sourceRef`);

 const provenance=block.match(/provenance:\s*"([^\"]+)"/)?.[1];
 if(provenance==="verified-rinon"){
  if(!/verificationRef:\s*"[^\"]+"/.test(block)) fail(`${src} verified-rinon requires verificationRef`);
  else pass(`${src} verified-rinon has verificationRef`);
 }
 if(provenance==="current-site-approved" || provenance==="user-drive-reference"){
  if(/verificationRef\s*:/.test(block)) fail(`${src} reference imagery cannot declare verificationRef`);
  else pass(`${src} remains reference-only`);
 }
 if(provenance==="conceptual"){
  const note=(block.match(/note:\s*"([^\"]+)"/)?.[1] ?? "").toLowerCase();
  if(!(note.includes("no corresponde") || note.includes("no obra ejecutada"))) fail(`${src} conceptual note must deny executed-project attribution`);
  else pass(`${src} conceptual attribution is explicit`);
 }
}

if(!source.includes('verificationRef: string')) fail("verified-rinon type requires verificationRef");
else pass("verified-rinon type requires verificationRef");
if(!source.includes('sourceRef: string')) fail("all visual assets require sourceRef");
else pass("all visual assets require sourceRef");
if(!fs.existsSync(structuresBriefPath)) fail("structures conceptual replacement brief exists");
else pass("structures conceptual replacement brief exists");
if(!source.includes("docs/STRUCTURES_VISUAL_BRIEF.md")) fail("structure conceptual asset points to its replacement brief");
else pass("structure conceptual asset points to its replacement brief");

// Vercel's image optimizer currently returns 400/attachment for local brand assets in this project.
// Any local RINON visual rendered through next/image must therefore be explicitly unoptimized/direct.
if(/src="\/brand\/isotipo-rinoceronte-transparent\.webp"[\s\S]{0,180}?unoptimized/.test(home)) pass("Home rhino mark bypasses the broken Vercel image optimizer");
else fail("Home rhino mark must render unoptimized/direct");
if(/<Image\s+src=\{image\}[\s\S]{0,220}?unoptimized/.test(xray)) pass("XRay local visual bypasses the broken Vercel image optimizer");
else fail("XRay local visual must render unoptimized/direct");

const blockerMatch=source.match(/VISUAL_CUTOVER_BLOCKERS\s*=\s*\[([\s\S]*?)\]\s*as const/);
if(!blockerMatch){
 fail("visual registry declares machine-readable cutover blockers");
}else{
 const blockers=[...blockerMatch[1].matchAll(/"([^"]+)"/g)].map(match=>match[1]);
 pass(`visual registry declares ${blockers.length} cutover blocker${blockers.length===1?"":"s"}`);
 if(reconstruction.includes("RINON-VIS-P0-HOME-WELDING") && inventory.includes("RINON-VIS-P0-HOME-WELDING") && inventory.includes("TEMPORARY") && !blockers.includes("home-hero-final-master")) fail("temporary Home hero cannot lose its cutover blocker");
 else pass("Home hero temporary state remains release-gated");
 if(source.includes("RINON-VIS-P0-HOME-STRUCTURE-TEMP") && !blockers.includes("structures-residential-final-master")) fail("temporary Structures visual cannot lose its cutover blocker");
 else pass("Structures temporary state remains release-gated");
}

if(process.exitCode){
 console.error("RINON VISUAL PROVENANCE CONTRACT FAILED.");
 process.exit(process.exitCode);
}
console.log(`RINON VISUAL PROVENANCE CONTRACT PASSED: ${assetBlocks.length} assets have explicit, auditable provenance and local critical visuals bypass the broken optimizer.`);
