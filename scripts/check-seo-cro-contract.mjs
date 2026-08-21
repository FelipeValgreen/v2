import {existsSync,readFileSync} from "node:fs";

const failures=[];
const read=(path)=>readFileSync(path,"utf8");
const check=(condition,message)=>{if(condition)console.log(`✓ ${message}`);else{failures.push(message);console.error(`✗ ${message}`)}};
const count=(text,needle)=>text.split(needle).length-1;

const contractPath="docs/SEO-MIGRATION-CRO-CONTRACT.md";
check(existsSync(contractPath),"SEO migration + CRO contract exists");
const contract=existsSync(contractPath)?read(contractPath):"";
const seo=read("lib/seo.ts");
const robots=read("app/robots.ts");
const solutionPage=read("components/SolutionPage.tsx");
const expansionPage=read("components/CommercialExpansionPage.tsx");
const legacyPage=read("app/[legacy]/page.tsx");
const migration=read("lib/migration.ts");
const migrationContract=read("scripts/check-migration-contract.mjs");
const expansions=read("lib/commercial-expansion.ts");
const tracking=read("components/ProductionTracking.tsx");
const quoteForm=read("components/QuoteForm.tsx");
const packageJson=JSON.parse(read("package.json"));

for(const metric of ["125","6.13k","2%","14.7"])check(contract.includes(metric),`Search Console baseline records ${metric}`);
check(contract.includes("organic visibility × commercial intent × conversion"),"success formula couples organic visibility, intent and conversion");
check(contract.includes("KEEP 200")&&contract.includes("301")&&contract.includes("MERGE")&&contract.includes("REBUILD")&&contract.includes("410")&&contract.includes("REVIEW"),"URL migration decisions are explicit and non-blanket");
check(contract.includes("one clear primary quote CTA")&&contract.includes("one low-friction WhatsApp path"),"commercial landing CRO minimums are documented");
check(contract.includes("Post-migration monitoring"),"post-migration organic and conversion monitoring is defined");

check(seo.includes('export const SEO_BASE_URL = "https://rinon.cl"'),"canonical production base remains rinon.cl");
check(seo.includes('process.env.RINON_INDEXABLE === "true"'),"indexation remains explicit opt-in");
check(seo.includes("alternates: { canonical: canonicalUrl(pathname) }"),"route metadata emits canonical URLs");
check(robots.includes("isIndexableSite")&&robots.includes('disallow: "/"'),"staging robots remain fail-closed");

check(solutionPage.includes("<h1>{solution.title}</h1>"),"primary solution template owns one explicit H1");
check(solutionPage.includes('href={quoteHref}')&&solutionPage.includes("WhatsAppCTA"),"primary solution template exposes quote + WhatsApp conversion paths");
check(solutionPage.includes('id="faq"')&&solutionPage.includes("solutionJsonLd"),"primary solution template supports FAQ and structured data");
check(solutionPage.includes("PARA COTIZAR")&&solutionPage.includes("solution.quoteInputs"),"primary solution template explains quote inputs");

check(expansionPage.includes("<h1>{item.title}</h1>"),"expanded commercial template owns one explicit H1");
check(count(expansionPage,"<WhatsAppCTA")>=2,"expanded commercial template exposes WhatsApp in hero and closing CTA");
check(count(expansionPage,"data-event=\"quote_start\"")>=2,"expanded commercial template tracks quote starts in hero and footer");
check(expansionPage.includes('"@type":"FAQPage"')&&expansionPage.includes('"@type":"BreadcrumbList"'),"expanded commercial template emits FAQ and breadcrumb schema");
check(expansionPage.includes("PARA COTIZAR")&&expansionPage.includes("item.quoteInputs"),"expanded commercial template captures intent-specific quote inputs");

check(legacyPage.includes("<h1>{landing.title}</h1>"),"preserved commercial template owns one explicit H1");
check(count(legacyPage,"<WhatsAppCTA")>=2,"preserved commercial template exposes WhatsApp in hero and closing CTA");
check(count(legacyPage,"data-event=\"quote_start\"")>=2,"preserved commercial template tracks quote starts in hero and footer");
check(legacyPage.includes("routeMetadata")&&legacyPage.includes("PREGUNTAS FRECUENTES"),"preserved commercial template keeps metadata and decision-support FAQs");

const preserved=["camarote-nido","camarote-triple","camarote-doble","cama-alta","camarote-titanic","camarote-1-5-plazas","camarote-desmontable","cama-dos-plazas-con-cajon","camarote-2-plazas","cama-institucional-metalica","cama-loft-metalica","cama-loft-con-escritorio","mobiliario-institucional"];
for(const slug of preserved)check(migrationContract.includes(`"${slug}"`)&&migration.includes("legacyCommercialSlugs"),`preserved organic owner remains protected: /${slug}`);

const expanded=["/camas-metalicas","/camas-balinesas","/mesas-metalicas","/escritorios-metalicos","/soldadura-mig","/corte-metalico","/instalacion","/reparaciones-metalicas"];
for(const route of expanded)check(expansions.includes(`slug:"${route}"`),`commercial intent owner remains defined: ${route}`);

check(tracking.includes("contact_whatsapp")&&tracking.includes("contact_phone")&&tracking.includes("generate_lead"),"production analytics covers WhatsApp, phone and generated leads");
check(tracking.includes("quote_category")&&tracking.includes("cta_location"),"conversion events preserve landing/CTA intent context");
check(quoteForm.includes("data-quote-step=\"1\"")&&quoteForm.includes("data-quote-step=\"2\"")&&quoteForm.includes("data-quote-step=\"3\""),"quote form remains progressive rather than a single long first step");

check(packageJson.scripts?.["qa:seo-cro"]==="node scripts/check-seo-cro-contract.mjs","package exposes dedicated SEO/CRO QA command");
check(packageJson.scripts?.build?.includes("qa:seo-cro"),"Vercel build executes SEO/CRO contract before Next build");
check(packageJson.scripts?.["qa:static"]?.includes("qa:seo-cro"),"release static QA executes SEO/CRO contract");

if(failures.length){console.error(`\nRINON SEO/CRO CONTRACT FAILED (${failures.length} issues).`);process.exit(1)}
console.log(`\nRINON SEO/CRO CONTRACT PASSED: baseline protected, ${preserved.length} preserved organic owners, ${expanded.length} expanded intent owners and conversion paths enforced.`);
