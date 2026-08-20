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
console.log(`\nRINON MIGRATION CONTRACT PASSED: ${preservedCommercial.length} preserved commercial URLs and ${Object.keys(approvedBlogRedirects).length} explicitly approved editorial redirects.`);
