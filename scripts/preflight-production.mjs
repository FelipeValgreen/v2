import {existsSync,readFileSync} from "node:fs";
const failures=[];const notes=[];
function read(path){if(!existsSync(path)){failures.push(`missing required file: ${path}`);return ""}return readFileSync(path,"utf8")}
function check(condition,message){if(condition)console.log(`✓ ${message}`);else{failures.push(message);console.error(`✗ ${message}`)}}
function envTrue(name){return process.env[name]==="true"}

const seo=read("lib/seo.ts");const robots=read("app/robots.ts");const proxy=read("proxy.ts");const blogPage=read("app/blog/[slug]/page.tsx");const leads=read("lib/leads.ts");const publicIntake=read("lib/public-intake.ts");const contactRoute=read("app/api/contacto/route.ts");const sitemap=read("app/sitemap.ts");const capabilities=read("lib/capabilities.ts");const navigation=read("lib/navigation.ts");const migration=read("lib/migration.ts");
const cutoverAuthorized=envTrue("RINON_CUTOVER_AUTHORIZED");const mode=cutoverAuthorized?"AUTHORIZED CUTOVER":"SAFE PRE-CUTOVER";console.log(`RINON production preflight · ${mode}`);

check(seo.includes('export const SEO_BASE_URL = "https://rinon.cl"'),"canonical production base is https://rinon.cl");
check(seo.includes('process.env.RINON_INDEXABLE === "true"'),"indexation is fail-closed behind RINON_INDEXABLE");
check(robots.includes("if (!isIndexableSite())"),"robots.txt follows the indexation gate");
check(robots.includes('disallow: "/"'),"non-indexable environments block all crawlers");
check(proxy.includes('process.env.RINON_ENABLE_MIGRATION_REDIRECTS !== "true"'),"commercial migration redirects are fail-closed");
check(blogPage.includes('process.env.RINON_ENABLE_BLOG_REDIRECTS === "true"'),"legacy blog redirects are fail-closed");
check(contactRoute.includes("isLeadWriteConfigured()"),"public contact writes require lead-write configuration");
check(leads.includes('process.env.RINON_LEAD_WRITE_ENABLED === "true"'),"lead persistence has an explicit write gate");
check(leads.includes('process.env.RINON_INDEXABLE === "true"'),"normal lead persistence is tied to production release state");
check(publicIntake.includes(".supabase.co/functions/v1/rinon-public-intake"),"public intake targets the dedicated Supabase edge endpoint");
check(publicIntake.includes("isPublicIntakeConfigured"),"public intake has a runtime configuration validator");
check(sitemap.includes("commercialExpansions"),"expanded products and services are part of sitemap generation");
check(sitemap.includes("legacyCommercialSlugs")&&sitemap.includes("migrationResourceArticles"),"preserved commercial URLs and migration resources remain in sitemap generation");
check(capabilities.includes('key: "powder_coating"')&&capabilities.includes('label: "Pintura electrostática al horno"')&&capabilities.includes('status: "confirmed"'),"powder coating offer is confirmed while technical limits remain bounded");
check(capabilities.includes('key: "repairs"')&&capabilities.includes('status: "confirmed"'),"metal repairs are registered as a confirmed commercial capability");
for(const route of ["/camas-metalicas","/camas-balinesas","/mesas-metalicas","/escritorios-metalicos","/soldadura-mig","/corte-metalico","/instalacion","/reparaciones-metalicas"]){check(navigation.includes(route),`navigation owns ${route}`);check(migration.includes(route),`migration resolver preserves ${route}`)}
check(navigation.includes("Pintura electrostática")&&!navigation.includes("Tratamientos superficiales"),"service navigation is commercial, short and free of removed menu labels");

const productionFlags=["RINON_INDEXABLE","RINON_ENABLE_MIGRATION_REDIRECTS","RINON_ENABLE_BLOG_REDIRECTS","RINON_LEAD_WRITE_ENABLED","RINON_PRODUCTION_TRACKING_ENABLED"];
if(!cutoverAuthorized){for(const name of productionFlags)check(!envTrue(name),`${name} is not active before cutover authorization`);notes.push("Cutover is intentionally blocked. Set RINON_CUTOVER_AUTHORIZED=true only during an explicitly authorized production release.")}else{for(const name of productionFlags)check(envTrue(name),`${name}=true for authorized production cutover`);check(envTrue("RINON_LEGAL_APPROVED"),"legal identity/content approved for production");check(Boolean(process.env.SUPABASE_URL),"SUPABASE_URL is present for production administration/read access");check(Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),"SUPABASE_SERVICE_ROLE_KEY is present for production administration/read access");check(publicIntake.includes(".supabase.co/functions/v1/rinon-public-intake"),"production public intake endpoint remains configured")}
if(failures.length){console.error(`\nRINON PRODUCTION PREFLIGHT FAILED (${failures.length} issue${failures.length===1?"":"s"}).`);for(const message of failures)console.error(`- ${message}`);process.exit(1)}
console.log(`\nRINON PRODUCTION PREFLIGHT PASSED · ${mode}.`);for(const note of notes)console.log(`NOTE: ${note}`);
