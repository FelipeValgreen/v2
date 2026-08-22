import {readFileSync} from "node:fs";
const failures=[];const read=path=>readFileSync(path,"utf8");const check=(condition,message)=>{if(condition)console.log(`✓ ${message}`);else{failures.push(message);console.error(`✗ ${message}`)}};
const legal=read("lib/legal.ts");
const privacy=read("app/politica-de-privacidad/page.tsx");
const cookies=read("app/politica-de-cookies/page.tsx");
const terms=read("app/terminos/page.tsx");
const dataRequest=read("app/solicitud-de-datos/page.tsx");
const tracking=read("components/ProductionTracking.tsx");
const layout=read("app/layout.tsx");
const preflight=read("scripts/preflight-production.mjs");

check(legal.includes('process.env.RINON_LEGAL_APPROVED === "true"'),"legal publication is fail-closed behind explicit approval");
check(legal.includes("isLegalIdentityConfigured")&&legal.includes("legalRepresentative"),"legal publication requires configured legal identity and representative");
check(privacy.includes("isLegalPublicationReady")&&cookies.includes("isLegalPublicationReady")&&terms.includes("isLegalPublicationReady"),"legal pages share the publication readiness gate");
check(privacy.includes("almacena los objetos de forma privada")&&privacy.includes("hasta tres archivos técnicos"),"privacy draft documents the active private attachment flow");
check(!privacy.includes("Mientras ese flujo no esté validado"),"privacy draft no longer describes attachments as unvalidated");
check(privacy.includes("UTM")||privacy.includes("utm_source"),"privacy draft documents consented campaign attribution");
check(cookies.includes("Google Tag Manager")&&cookies.includes("Microsoft Clarity"),"cookie draft documents the supported optional external tools");
check(cookies.includes("no hay consentimiento")&&tracking.includes("if (!enabled) return null"),"cookie copy and runtime both keep optional tracking consent-gated");
check(layout.includes("productionTracking ? <><ProductionTracking /><CookieConsent /></>"),"production tracking is mounted through the consent-aware production layer");
check(dataRequest.includes("{indexable:false}"),"privacy request page is permanently noindex");
check(terms.includes("no crea por sí solo una orden de fabricación"),"terms keep web requests distinct from binding fabrication orders");
check(preflight.includes('check(envTrue("RINON_LEGAL_APPROVED")'),"authorized cutover requires explicit legal approval");

if(failures.length){console.error(`\nRINON LEGAL CONTRACT FAILED (${failures.length} issues).`);process.exit(1)}
console.log("\nRINON LEGAL CONTRACT PASSED: legal publication remains fail-closed and the draft matches the current intake, attachment and consent architecture.");
