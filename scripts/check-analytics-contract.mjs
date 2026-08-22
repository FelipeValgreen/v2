import {readFileSync} from "node:fs";

const failures=[];
const read=(path)=>readFileSync(path,"utf8");
const check=(condition,message)=>{if(condition)console.log(`✓ ${message}`);else{failures.push(message);console.error(`✗ ${message}`)}};
const analytics=read("lib/analytics.ts");
const tracking=read("components/ProductionTracking.tsx");
const api=read("app/api/analytics/route.ts");
const edge=read("supabase/functions/rinon-public-intake/index.ts");
const packageJson=read("package.json");
const required=["page_view","view_product","view_service","quote_start","quote_step","quote_submit","contact_whatsapp","contact_phone","generate_lead","maps_click","waze_click","menu_product_click","menu_service_click","resource_view","cta_click"];
for(const event of required){
  check(analytics.includes(`"${event}"`),`server analytics allows ${event}`);
  check(tracking.includes(`"${event}"`),`client tracking knows ${event}`);
  check(edge.includes(`"${event}"`),`Edge intake allows ${event}`);
}
check(api.includes("ANALYTICS_EVENTS.includes(eventName)"),"public analytics route validates against server allowlist");
check(tracking.includes("persistIfInternal(eventName)"),"semantic CRO events persist internally after consent");
check(tracking.includes('eventName!=="contact_whatsapp"&&eventName!=="contact_phone"'),"click tracking avoids duplicate contact persistence");
check(tracking.includes('sendAnalyticsEvent("generate_lead")'),"successful lead submission persists generate_lead");
check(analytics.includes("quote_starts")&&analytics.includes("quote_submits")&&analytics.includes("start_to_submit_rate"),"analytics summary type exposes quote funnel metrics");
check(packageJson.includes('"qa:analytics"'),"package scripts expose analytics contract QA");
if(failures.length){console.error(`\nRINON ANALYTICS CONTRACT FAILED (${failures.length} issues).`);process.exit(1)}
console.log(`\nRINON ANALYTICS CONTRACT PASSED: ${required.length} consented CRO events aligned across client, API and Edge intake.`);
