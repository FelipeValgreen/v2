import {readFileSync} from "node:fs";

const failures=[];
const read=(path)=>readFileSync(path,"utf8");
const check=(condition,message)=>{if(condition)console.log(`✓ ${message}`);else{failures.push(message);console.error(`✗ ${message}`)}};

const migration=read("lib/migration.ts");
const legacyCommercial=read("lib/legacy-commercial.ts");
const blogMigration=read("lib/blog-migration.ts");
const migrationResources=read("lib/migration-resources.ts");
const blogPage=read("app/blog/[slug]/page.tsx");
const sitemap=read("app/sitemap.ts");
const navigation=read("lib/navigation.ts");
const expansions=read("lib/commercial-expansion.ts");
const capabilities=read("lib/capabilities.ts");
const malla3d=read("app/mallas-3d/page.tsx");
const mallasSeparadoras=read("app/mallas-separadoras/page.tsx");
const proxy=read("proxy.ts");
const envExample=read(".env.example");
const envPreview=read(".env.preview.example");
const urlInventory=read("docs/URL-MIGRATION-INVENTORY.md");
const preflight=read("scripts/preflight-production.mjs");

const preservedCommercial=["camarote-nido","camarote-triple","camarote-doble","cama-alta","camarote-titanic","camarote-1-5-plazas","camarote-desmontable","cama-dos-plazas-con-cajon","camarote-2-plazas","cama-institucional-metalica","cama-loft-metalica","cama-loft-con-escritorio","mobiliario-institucional"];
const newOwners=["/camas-metalicas","/camas-balinesas","/mesas-metalicas","/escritorios-metalicos","/soldadura-mig","/corte-metalico","/instalacion","/reparaciones-metalicas"];
const approvedBlogRedirects={"como-cotizar-rejas-metalicas":"/recursos/como-cotizar-rejas-metalicas","tipos-de-cierres-perimetrales":"/recursos/tipos-de-cierres-perimetrales","porton-corredizo-vs-batiente":"/recursos/porton-corredizo-vs-batiente","mezzanine-metalico-bodega-guia":"/recursos/mezzanine-metalico-bodega-guia","proveedor-camarotes-empresas":"/recursos/proveedor-camarotes-empresas","como-elegir-reja-metalica-frontis":"/recursos/como-elegir-reja-metalica-frontis"};
const prohibitedBlogRedirects=["cuanto-cuesta-camarote-chile","cuanto-cuesta-cierre-perimetral-chile","cuanto-cuesta-porton-automatico-chile","altura-reja-casa-seguridad","camarote-nino-6-anos","camarote-para-adulto-mayor","pintura-electrostatica-que-es","camarotes-mineria-que-exige-cada-faena"];

const observedBlock=migration.match(/observedLiveReviewPaths=new Set\(\[([\s\S]*?)\]\);/);
check(Boolean(observedBlock),"migration resolver has an explicit live-observed quarantine set");
const observedLiveReview=observedBlock?[...observedBlock[1].matchAll(/"([^"]+)"/g)].map((m)=>m[1]):[];
const uniqueObserved=new Set(observedLiveReview);
check(uniqueObserved.size===observedLiveReview.length,"live-observed quarantine contains no duplicate URLs");
check(observedLiveReview.length>=58,"live-observed quarantine protects at least 58 current organic URLs");

for(const slug of preservedCommercial){
 check(legacyCommercial.includes(`slug: "${slug}"`),`preserved commercial page exists: /${slug}`);
 check(urlInventory.includes(`\`/${slug}\``),`URL inventory preserves /${slug}`);
}
check(migration.includes("...legacyCommercialSlugs.map"),"preserved commercial slugs are durable in migration resolver");
check(sitemap.includes("legacyCommercialSlugs"),"preserved commercial routes are included in sitemap source");

for(const route of newOwners){
 check(expansions.includes(`slug:"${route}"`),`expanded catalog defines ${route}`);
 check(navigation.includes(route),`navigation exposes ${route}`);
 check(migration.includes(route),`migration resolver preserves ${route}`);
 check(urlInventory.includes(`\`${route}\``),`URL inventory records intent owner ${route}`);
}
check(sitemap.includes("commercialExpansions"),"expanded catalog owners are included in sitemap generation");

for(const route of observedLiveReview){
 check(urlInventory.includes(`\`${route}\``),`live-observed route is documented GSC-pending: ${route}`);
}
const declaredPending=Number(migration.match(/MIGRATION_GSC_REVIEW_PENDING_COUNT\s*=\s*(\d+)/)?.[1]??NaN);
check(declaredPending===observedLiveReview.length,`machine-readable GSC pending count matches ${observedLiveReview.length} protected live URLs`);
check(preflight.includes('check(gscPendingCount===0,"no live-observed GSC migration reviews remain unresolved")'),"authorized production preflight hard-blocks unresolved GSC URL reviews");

const observedGuardIndex=migration.indexOf("if(observedLiveReviewPaths.has(path))");
for(const marker of ['if(path.startsWith("/camarotes-")','if(path.startsWith("/rejas-metalicas-")','if(path.startsWith("/portones-")','if(path.startsWith("/pintura-electrostatica-")','if(path.startsWith("/mallas-separadoras-")']){
 const idx=migration.indexOf(marker);
 check(observedGuardIndex>=0&&idx>observedGuardIndex,`live-observed guard executes before broad redirect ${marker}`);
}

for(const [legacy,destination] of Object.entries(approvedBlogRedirects)){
 check(blogMigration.includes(`"${legacy}": "${destination}"`),`approved blog redirect is allowlisted: ${legacy}`);
 const resourceSlug=destination.split("/").pop();
 check(migrationResources.includes(`slug: "${resourceSlug}"`),`approved redirect destination exists: ${resourceSlug}`);
 check(urlInventory.includes(`\`/blog/${legacy}\``)&&urlInventory.includes(`\`${destination}\``),`URL inventory records editorial redirect: ${legacy}`);
}
for(const slug of prohibitedBlogRedirects){
 check(!blogMigration.includes(`"${slug}":`),`high-risk blog slug is not approved for redirect: ${slug}`);
 check(urlInventory.includes(`\`/blog/${slug}\``),`URL inventory records high-risk review: ${slug}`);
}

check(urlInventory.includes("RINON_URL_INVENTORY_COMPLETE=false")&&urlInventory.includes("Search Console"),"inventory remains completion-gated on crawl + Search Console reconciliation");
check(urlInventory.includes("REVIEW / GSC-PENDING")&&urlInventory.includes("default to preserving"),"inventory defaults to preservation when GSC evidence is unavailable");
check(!urlInventory.includes("/estructuras-metallicas"),"inventory has no misspelled structures destination");

check(malla3d.includes('"/mallas-3d"'),"/mallas-3d has a dedicated page owner");
check(mallasSeparadoras.includes('"/mallas-separadoras"'),"/mallas-separadoras has a dedicated page owner");
check(navigation.includes('/mallas-3d')&&navigation.includes('/mallas-separadoras'),"navigation links both malla intent owners");
check(migration.includes('path.startsWith("/mallas-separadoras-")')&&migration.includes('destination:"/mallas-separadoras"'),"legacy mallas separadoras aliases consolidate only behind quarantine");
check(migration.includes('"/soldadura-metalica-santiago"')&&migration.includes('destination:"/soldadura-mig"'),"legacy Santiago welding intent has a defined candidate owner behind quarantine");
check(capabilities.includes('key: "powder_coating"')&&capabilities.includes('status: "confirmed"'),"powder coating is a confirmed commercial capability");
check(capabilities.includes('key: "repairs"')&&capabilities.includes('status: "confirmed"'),"repairs are a confirmed commercial capability");

check(blogPage.includes('process.env.RINON_ENABLE_BLOG_REDIRECTS === "true"'),"blog redirects require explicit production flag");
check(/RINON_ENABLE_MIGRATION_REDIRECTS\s*!==\s*["']true["']/.test(proxy),"commercial migration redirects fail closed unless explicitly enabled");
check(sitemap.includes("migrationResourceArticles"),"migration-safe resources are included in sitemap source");
for(const env of [envExample,envPreview]){
 check(/RINON_ENABLE_MIGRATION_REDIRECTS=false/.test(env),"environment keeps migration redirects disabled by default");
 check(/RINON_ENABLE_BLOG_REDIRECTS=false/.test(env),"environment keeps blog redirects disabled by default");
 check(/RINON_URL_INVENTORY_COMPLETE=false/.test(env),"environment keeps URL inventory incomplete by default");
}

if(failures.length){
 console.error(`\nRINON MIGRATION CONTRACT FAILED (${failures.length} issues).`);
 process.exit(1);
}
console.log(`\nRINON MIGRATION CONTRACT PASSED: ${preservedCommercial.length} preserved commercial URLs, ${newOwners.length} new intent owners, ${observedLiveReview.length} live-observed GSC-pending URLs and ${Object.keys(approvedBlogRedirects).length} editorial redirects.`);
