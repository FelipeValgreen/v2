import {existsSync,readFileSync} from "node:fs";
const failures=[];
function read(path){if(!existsSync(path)){failures.push(`missing required file: ${path}`);return ""}return readFileSync(path,"utf8")}
function check(condition,message){if(condition)console.log(`✓ ${message}`);else{failures.push(message);console.error(`✗ ${message}`)}}

const quote=read("lib/quote.ts");
const route=read("app/api/contacto/route.ts");
const leads=read("lib/leads.ts");
const edge=read("supabase/functions/rinon-public-intake/index.ts");
const fields=["landing_path","referrer_host","utm_source","utm_medium","utm_campaign","utm_term","utm_content","gclid","gbraid","wbraid","fbclid","categoria","subcategoria","cantidad_aprox","ubicacion_proyecto","fecha_objetivo","requiere_instalacion","tiene_plano","uso_proyecto","estado_superficie","tipo_cliente","empresa"];

check(quote.includes("buildStructuredLeadFields"),"quote layer builds structured CRM fields");
check(route.includes("...buildStructuredLeadFields(body, paginaOrigen)"),"contact route sends structured fields with the lead");
check(route.includes("rawPaginaOrigen.startsWith"),"lead origin is constrained to an internal path");
check(route.includes("referrerHost(request)"),"server captures a bounded referrer host fallback");
check(leads.includes("CreateLeadInput")&&leads.includes("StructuredLeadFields"),"lead model types structured intake fields");
for(const field of fields){check(quote.includes(field),`quote mapping includes ${field}`);check(edge.includes(field),`edge whitelist includes ${field}`);}
check(edge.includes("const row = {")&&edge.includes("insertRowReturningId(\"leads\", row)"),"edge inserts only an explicit lead row whitelist");
check(edge.includes("validDate")&&edge.includes("triBool"),"edge normalizes dates and tri-state booleans");
check(edge.includes("landingCandidate.startsWith"),"edge independently constrains landing path");
check(edge.includes("telefono.replace")&&edge.includes("Invalid email"),"edge repeats core contact validation");
check(edge.includes("Too many requests")&&edge.includes("rinon_intake_rate_limits"),"edge preserves persistent intake rate limiting");

if(failures.length){console.error(`\nRINON STRUCTURED LEAD CONTRACT FAILED (${failures.length} issue${failures.length===1?"":"s"}).`);for(const failure of failures)console.error(`- ${failure}`);process.exit(1)}
console.log(`\nRINON STRUCTURED LEAD CONTRACT PASSED: ${fields.length} CRM fields are typed, mapped and server-whitelisted.`);
