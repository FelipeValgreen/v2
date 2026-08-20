import { readFileSync } from "node:fs";

const failures=[];
function read(path){return readFileSync(path,"utf8")}
function check(condition,message){if(condition)console.log(`✓ ${message}`);else{failures.push(message);console.error(`✗ ${message}`)}}
function includes(source,value){return source.includes(value)}

const migration=read("lib/migration.ts");
const legacyCommercial=read("lib/legacy-commercial.ts");
const blogMigration=read("lib/blog-migration.ts");
const migrationResources=read("lib/migration-resources.ts");
const blogPage=read("app/blog/[slug]/page.tsx");
const sitemap=read("app/sitemap.ts");
const solutions=read("app/soluciones/page.tsx");
const malla3d=read("app/mallas-3d/page.tsx");
const mallasSeparadoras=read("app/mallas-separadoras/page.tsx");
const proxy=read("proxy.ts");
const envExample=read(".env.example");
const envPreview=read(".env.preview.example");

const preservedCommercial=[
  "camarote-nido",
  "camarote-triple",
  "camarote-doble",
  "cama-alta",
  "camarote-titanic",
  "camarote-1-5-plazas",
  "camarote-desmontable",
  "cama-dos-plazas-con-cajon",
  "camarote-2-plazas",
  "cama-institucional-metalica",
  "cama-loft-metalica",
  "cama-loft-con-escritorio",
  "mobiliario-institucional",
];

const approvedBlogRedirects={
  "como-cotizar-rejas-metalicas":"/recursos/como-cotizar-rejas-metalicas",
  "tipos-de-cierres-perimetrales":"/recursos/tipos-de-cierres-perimetrales",
  "porton-corredizo-vs-batiente":"/recursos/porton-corredizo-vs-batiente",
  "mezzanine-metalico-bodega-guia":"/recursos/mezzanine-metalico-bodega-guia",
  "proveedor-camarotes-empresas":"/recursos/proveedor-camarotes-empresas",
  "como-elegir-reja-metalica-frontis":"/recursos/como-elegir-reja-metalica-frontis",
};

const prohibitedBlogRedirects=[
  "cuanto-cuesta-camarote-chile",
  "cuanto-cuesta-cierre-perimetral-chile",
  "cuanto-cuesta-porton-automatico-chile",
  "altura-reja-casa-seguridad",
  "camarote-nino-6-anos",
  "camarote-para-adulto-mayor",
  "pintura-electrostatica-que-es",
  "camarotes-mineria-que-exige-cada-faena",
];

for(const slug of preservedCommercial){
  check(includes(legacyCommercial,`slug: "${slug}"`),`preserved commercial page exists: /${slug}`);
}
check(includes(migration,'...legacyCommercialSlugs.map((slug) => `/${slug}`)'),"preserved commercial slugs are durable in migration resolver");
check(includes(sitemap,"legacyCommercialSlugs"),"preserved commercial routes are included in sitemap source");

for(const [legacy,destination] of Object.entries(approvedBlogRedirects)){
  check(includes(blogMigration,`"${legacy}": "${destination}"`),`approved blog redirect is allowlisted: ${legacy}`);
  const resourceSlug=destination.split("/").pop();
  check(includes(migrationResources,`slug: "${resourceSlug}"`),`approved redirect destination has an equivalent resource: ${resourceSlug}`);
}
for(const slug of prohibitedBlogRedirects){
  check(!includes(blogMigration,`"${slug}":`),`high-risk blog slug is not approved for redirect: ${slug}`);
}

check(includes(malla3d,'routeMetadata(\n  "/mallas-3d"'),"/mallas-3d has dedicated metadata and page owner");
check(includes(mallasSeparadoras,'routeMetadata(\n  "/mallas-separadoras"'),"/mallas-separadoras has dedicated metadata and page owner");
check(includes(solutions,'["Malla 3D / panel electrosoldado", "/mallas-3d"]'),"solutions hub links to /mallas-3d");
check(includes(solutions,'["Mallas separadoras", "/mallas-separadoras"]'),"solutions hub links to /mallas-separadoras");
check(includes(sitemap,'"/mallas-3d"'),"sitemap includes /mallas-3d");
check(includes(sitemap,'"/mallas-separadoras"'),"sitemap includes /mallas-separadoras");
check(includes(migration,'"/mallas-3d", "/mallas-separadoras"'),"malla intent owners are durable in migration resolver");
check(includes(migration,'path.startsWith("/mallas-separadoras-")'),"legacy mallas separadoras aliases have an explicit resolver");
check(includes(migration,'destination: "/mallas-separadoras"'),"legacy mallas separadoras aliases consolidate to dedicated owner");

// Representative URLs confirmed on the current public site in the 2026-08-20 migration audit.
// These assertions prevent future refactors from silently dropping an entire legacy URL family.
check(includes(migration,'path.startsWith("/camarotes-")'),"current camarotes sector/geo aliases remain covered (mineria, salmoneras, militares, hospitales, internados, por-mayor)");
check(includes(migration,'"/literas"'),"current /literas alias remains covered by /camarotes");
check(includes(migration,'path.startsWith("/cercos-perimetrales-")'),"current regional cercos aliases remain covered (Concepcion, Antofagasta and other regions)");
check(includes(migration,'path.startsWith("/cercos-para-")'),"current sector cercos aliases remain covered (including /cercos-para-empresas)");
check(includes(migration,'"/cierre-perimetral-industrial"'),"current /cierre-perimetral-industrial remains covered by /cierres-perimetrales");
check(includes(migration,'path.startsWith("/rejas-metalicas-")'),"current rejas-by-comuna aliases remain covered");
check(includes(migration,'"/reja-metalica-santiago"'),"current /reja-metalica-santiago remains covered by /rejas-metalicas");
check(includes(migration,'path.startsWith("/portones-")'),"current /portones-industriales and model aliases remain covered by /portones-metalicos");
check(includes(migration,'"/soldadura-metalica-santiago"'),"current /soldadura-metalica-santiago remains covered by /fabricacion-metalica");
check(includes(migration,'path.startsWith("/pintura-electrostatica-")'),"current geographic pintura aliases remain covered by the pintura owner, subject to launch capability gate");

check(includes(blogPage,'process.env.RINON_ENABLE_BLOG_REDIRECTS === "true"'),"blog redirects require explicit production flag");
check(/RINON_ENABLE_MIGRATION_REDIRECTS\s*!==\s*["']true["']/.test(proxy),"commercial migration redirects fail closed unless explicitly enabled");
check(includes(sitemap,"migrationResourceArticles"),"migration-safe resources are included in sitemap source");
check(/RINON_ENABLE_MIGRATION_REDIRECTS=false/.test(envExample),"default environment keeps migration redirects disabled");
check(/RINON_ENABLE_BLOG_REDIRECTS=false/.test(envExample),"default environment keeps blog redirects disabled");
check(/RINON_ENABLE_MIGRATION_REDIRECTS=false/.test(envPreview),"preview keeps migration redirects disabled");
check(/RINON_ENABLE_BLOG_REDIRECTS=false/.test(envPreview),"preview keeps blog redirects disabled");

if(failures.length){
  console.error(`\nRINON MIGRATION CONTRACT FAILED (${failures.length} issue${failures.length===1?"":"s"}).`);
  process.exit(1);
}
console.log(`\nRINON MIGRATION CONTRACT PASSED: ${preservedCommercial.length} preserved commercial URLs, 2 dedicated malla intent owners, current public legacy URL families and ${Object.keys(approvedBlogRedirects).length} explicitly approved editorial redirects.`);
