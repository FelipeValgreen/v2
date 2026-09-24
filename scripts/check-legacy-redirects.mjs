import {readFileSync,existsSync} from "node:fs";
const failures=[];
function check(condition,message){if(condition)console.log(`✓ ${message}`);else{failures.push(message);console.error(`✗ ${message}`)}}
const source=readFileSync("lib/legacy-redirects.ts","utf8");
const entries=[...source.matchAll(/\{\s*source:\s*"([^"]+)",\s*destination:\s*"([^"]+)",\s*tier:\s*"([^"]+)"\s*\}/g)].map(m=>({source:m[1],destination:m[2],tier:m[3]}));
const migration=readFileSync("lib/migration.ts","utf8");
const observed=new Set([...migration.match(/observedLiveReviewPaths=new Set\(\[([\s\S]*?)\]\)/)[1].matchAll(/"([^"]+)"/g)].map(m=>m[1]));
const legacyCommercial=[...readFileSync("lib/legacy-commercial.ts","utf8").matchAll(/slug:\s*"([^"]+)"/g)].map(m=>`/${m[1]}`);
const expansions=[...readFileSync("lib/commercial-expansion.ts","utf8").matchAll(/slug:"(\/[^"]+)"/g)].map(m=>m[1]);
const routes=new Set(["/",...legacyCommercial,...expansions]);
import {readdirSync,statSync} from "node:fs";
function collect(dir,prefix){for(const name of readdirSync(dir)){const full=`${dir}/${name}`;if(!statSync(full).isDirectory())continue;if(name.startsWith("[")||name.startsWith("("))continue;const route=`${prefix}/${name}`;if(existsSync(`${full}/page.tsx`))routes.add(route);collect(full,route)}}
collect("app","");
const sources=new Set(entries.map(e=>e.source));
check(entries.length>0,`legacy redirect map declares ${entries.length} entries`);
check(new Set(entries.map(e=>e.source)).size===entries.length,"legacy redirect sources are unique");
check(entries.every(e=>/^\/[a-z0-9-]+$/.test(e.source)),"legacy redirect sources are single-segment lowercase slugs");
check(entries.every(e=>routes.has(e.destination)),"every legacy redirect destination is an existing RINON 2.0 route");
for(const e of entries.filter(e=>!routes.has(e.destination)))console.error(`  missing destination: ${e.source} → ${e.destination}`);
check(entries.every(e=>!sources.has(e.destination)),"no legacy redirect destination is itself a redirect source (no chains/loops)");
check(entries.every(e=>!routes.has(e.source)),"no RINON 2.0 route is shadowed by a legacy redirect source");
for(const e of entries.filter(e=>routes.has(e.source)))console.error(`  shadowed route: ${e.source}`);
const pending=entries.filter(e=>e.tier==="gsc-pending");
check(pending.length===observed.size&&pending.every(e=>observed.has(e.source)),`gsc-pending tier matches the live-observed quarantine in lib/migration.ts (${observed.size})`);
check(entries.filter(e=>e.tier==="family").every(e=>!observed.has(e.source)),"no live-observed URL is redirected through the family tier");
const config=readFileSync("next.config.ts","utf8");
check(config.includes('const productionBuild = process.env.VERCEL_ENV === "production" || productionRelease'),"next.config identifies production builds (VERCEL_ENV=production or RINON_INDEXABLE=true)");
check(config.includes('const migrationRedirectsEnabled = !productionBuild || process.env.RINON_ENABLE_MIGRATION_REDIRECTS === "true"')&&config.includes("if (!migrationRedirectsEnabled) return []"),"production builds emit legacy redirects only with RINON_ENABLE_MIGRATION_REDIRECTS=true (non-production builds emit the whole map)");
check(config.includes('const gscPendingRedirectsEnabled = !productionBuild || process.env.RINON_REDIRECT_GSC_PENDING === "true"'),"production builds emit gsc-pending redirects only with RINON_REDIRECT_GSC_PENDING=true");
check(config.includes("statusCode: 301"),"legacy redirects are emitted as 301");
if(failures.length){console.error(`\nRINON LEGACY REDIRECT CONTRACT FAILED (${failures.length} issue${failures.length===1?"":"s"}).`);process.exit(1)}
console.log(`\nRINON LEGACY REDIRECT CONTRACT PASSED · ${entries.length} entries (${entries.length-pending.length} family / ${pending.length} gsc-pending).`);
