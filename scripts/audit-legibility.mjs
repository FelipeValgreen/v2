/**
 * RINON legibility audit (Playwright + axe-core color-contrast + computed font-size census).
 *
 * Usage (against a served build):
 *   npm run build && npx next start -p 3210
 *   RINON_QA_BASE_URL=http://127.0.0.1:3210 STATES=1 node scripts/audit-legibility.mjs
 *
 * Env:
 *   RINON_QA_BASE_URL / BASE  base URL (default http://127.0.0.1:3210)
 *   ROUTES                    comma-separated routes (default: the 8 core routes)
 *   WIDTHS                    comma-separated viewport widths (default 320,375,1280)
 *   STATES=1                  also audit client states: open mobile menu (<900px), open mega-menus (>=1100px),
 *                             and the three steps of the /cotizar form
 *   BEFORE=1                  additionally strip app/legibility.css rules at runtime and re-measure ("before")
 *   RINON_CHROMIUM_PATH       explicit Chromium executable (e.g. /opt/pw-browsers/chromium when the bundled
 *                             browser revision is not installed)
 *   OUT                       JSON output path
 *
 * Criteria reported per route × width: visible text nodes < 12px, p/a/button/td/th/li < 14px, small < 13px,
 * axe color-contrast violations, horizontal overflow (scrollWidth > clientWidth) with the offending elements.
 */
import {createRequire} from "node:module";const require=createRequire(new URL("../package.json",import.meta.url));const {chromium}=require("playwright-core");
import {readFileSync,writeFileSync} from "node:fs";
const BASE=process.env.RINON_QA_BASE_URL||process.env.BASE||"http://127.0.0.1:3210";
const axeSource=readFileSync(require.resolve("axe-core/axe.min.js"),"utf8");
const routes=(process.env.ROUTES||"/,/camarotes,/rejas-metalicas,/cierres-perimetrales,/empresas,/cotizar,/nosotros,/recursos/como-cotizar-rejas-metalicas").split(",");
const widths=(process.env.WIDTHS||"320,375,1280").split(",").map(Number);
const compareBefore=process.env.BEFORE==="1";
const census=`(()=>{
  const out={total:0,under12:0,under12Samples:[],bodyUnder14:0,bodyUnder14Samples:[],smallUnder13:0,smallSamples:[]};
  const bodyTags=new Set(["P","A","BUTTON","TD","TH","LI"]);
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  const seen=new Set();
  let n;
  while((n=walker.nextNode())){
    if(!n.nodeValue.trim())continue;
    const el=n.parentElement;if(!el||seen.has(el))continue;seen.add(el);
    if(el.closest("script,style,noscript,template,[aria-hidden='true']"))continue;
    const cs=getComputedStyle(el);
    if(cs.display==="none"||cs.visibility==="hidden"||parseFloat(cs.opacity)===0)continue;
    const r=el.getBoundingClientRect();if(r.width===0||r.height===0)continue;
    // skip elements hidden by ancestor display none (getBoundingClientRect would be 0) — handled
    let hidden=false;for(let a=el;a;a=a.parentElement){const acs=getComputedStyle(a);if(acs.display==="none"||acs.visibility==="hidden"){hidden=true;break}}
    if(hidden)continue;
    const fs=parseFloat(cs.fontSize);out.total++;
    const sel=el.tagName.toLowerCase()+(el.className&&typeof el.className==="string"?"."+el.className.trim().split(/\\s+/).slice(0,2).join("."):"");
    const txt=n.nodeValue.trim().slice(0,40);
    if(fs<12){out.under12++;if(out.under12Samples.length<12)out.under12Samples.push(fs+"px "+sel+" «"+txt+"»")}
    if(bodyTags.has(el.tagName)&&fs<14){out.bodyUnder14++;if(out.bodyUnder14Samples.length<12)out.bodyUnder14Samples.push(fs+"px "+sel+" «"+txt+"»")}
    if(el.tagName==="SMALL"&&fs<13){out.smallUnder13++;if(out.smallSamples.length<8)out.smallSamples.push(fs+"px "+sel+" «"+txt+"»")}
  }
  const de=document.documentElement;
  out.scrollWidth=de.scrollWidth;out.clientWidth=de.clientWidth;out.hscroll=de.scrollWidth>de.clientWidth+1;
  out.overflowers=[];
  if(out.hscroll){for(const el of document.body.querySelectorAll("*")){const r=el.getBoundingClientRect();if(r.right>de.clientWidth+1&&r.width>0){const cs=getComputedStyle(el);if(cs.position==="fixed")continue;const chain=[];for(let a=el,i=0;a&&i<4;a=a.parentElement,i++)chain.unshift(a.tagName.toLowerCase()+(typeof a.className==="string"&&a.className?"."+a.className.trim().split(/\\s+/).slice(0,3).join("."):""));out.overflowers.push(chain.join(" > ")+" right="+Math.round(r.right)+" w="+Math.round(r.width));if(out.overflowers.length>=6)break}}}
  return out;})()`;
const stripLegibility=`(()=>{let removed=0;for(const sheet of document.styleSheets){let rules;try{rules=sheet.cssRules}catch{continue}let start=-1;for(let i=0;i<rules.length;i++){const r=rules[i];if(r.selectorText===":root"&&r.style&&r.style.getPropertyValue("--rn-accent-text")){start=i;break}}if(start>=0){for(let i=rules.length-1;i>=start;i--){sheet.deleteRule(i);removed++}}}return removed})()`;
async function axeRun(page){await page.evaluate(axeSource);return page.evaluate(async()=>{const r=await window.axe.run(document,{runOnly:["color-contrast"]});return r.violations.flatMap(v=>v.nodes.map(n=>({target:n.target.join(" "),summary:(n.any[0]&&n.any[0].message||"").slice(0,140)})))})}
const browser=await chromium.launch(process.env.RINON_CHROMIUM_PATH?{executablePath:process.env.RINON_CHROMIUM_PATH}:{});
const results=[];
const states=process.env.STATES==="1";
async function settle(page){await page.evaluate(async()=>{const h=window.innerHeight;for(let y=0;y<document.body.scrollHeight;y+=h){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}window.scrollTo(0,0)});await page.waitForTimeout(250)}
async function fillVisibleRequired(page){await page.evaluate(()=>{for(const el of document.querySelectorAll("form [required]")){if(!(el instanceof HTMLElement)||el.offsetParent===null)continue;if(el instanceof HTMLSelectElement){if(!el.value){const opt=[...el.options].find(o=>o.value);if(opt){el.value=opt.value;el.dispatchEvent(new Event("change",{bubbles:true}))}}}else if(el instanceof HTMLInputElement){if(el.type==="checkbox"){if(!el.checked)el.click()}else if(!el.value){const v=el.type==="email"?"qa@example.com":el.type==="tel"?"+56912345678":"Texto de prueba QA";const setter=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value").set;setter.call(el,v);el.dispatchEvent(new Event("input",{bubbles:true}))}}else if(el instanceof HTMLTextAreaElement&&!el.value){const setter=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value").set;setter.call(el,"Descripción de prueba para QA de legibilidad.");el.dispatchEvent(new Event("input",{bubbles:true}))}}})}
function statesFor(route,width){
  if(!states)return [];
  const list=[];
  if(route==="/"&&width<900)list.push({name:"menu-movil",apply:async page=>{await page.click(".mobile-nav-toggle");await page.waitForSelector(".mobile-nav-panel",{state:"visible",timeout:3000})}});
  if(route==="/"&&width>=1100){list.push({name:"mega-productos",apply:async page=>{await page.click(".prd2-desktop-nav > button >> nth=0");await page.waitForSelector("#mega-products",{state:"visible",timeout:3000})}});list.push({name:"mega-servicios",apply:async page=>{await page.keyboard.press("Escape");await page.click(".prd2-desktop-nav > button >> nth=1");await page.waitForSelector("#mega-services",{state:"visible",timeout:3000})}})}
  if(route==="/cotizar"){
    list.push({name:"form-paso1",apply:async page=>{await page.selectOption("select[name=tipo_solicitud]","Producto");await page.selectOption("select[name=categoria]","camarotes")}});
    list.push({name:"form-paso2",apply:async page=>{await fillVisibleRequired(page);await page.click("fieldset[data-quote-step='1'] .button.primary");await page.waitForSelector("fieldset[data-quote-step='2']",{state:"visible",timeout:3000})}});
    list.push({name:"form-paso3",apply:async page=>{await fillVisibleRequired(page);await page.click("fieldset[data-quote-step='2'] .button.primary");await page.waitForSelector("fieldset[data-quote-step='3']",{state:"visible",timeout:3000})}});
  }
  return list;
}
async function measure(page,label,width,withBefore){
    const after=await page.evaluate(census);const axeAfter=await axeRun(page);
    let before=null,axeBefore=null,removed=0;
    if(withBefore){removed=await page.evaluate(stripLegibility);before=await page.evaluate(census);axeBefore=await axeRun(page)}
    results.push({route:label,width,after:{...after,axe:axeAfter.length,axeSamples:axeAfter.slice(0,6)},before:before?{...before,axe:axeBefore.length}:null,removedRules:removed});
    console.log(`${String(width).padStart(4)} ${label.padEnd(45)} after: total=${after.total} <12px=${after.under12} body<14=${after.bodyUnder14} small<13=${after.smallUnder13} axe=${axeAfter.length} hscroll=${after.hscroll}(${after.scrollWidth}/${after.clientWidth})`+(before?` | before: <12px=${before.under12} body<14=${before.bodyUnder14} axe=${axeBefore.length} hscroll=${before.hscroll} (rules removed ${removed})`:""));
    if(after.under12)console.log("   <12 samples:",after.under12Samples.join(" | "));
    if(after.bodyUnder14)console.log("   body<14 samples:",after.bodyUnder14Samples.join(" | "));
    if(after.smallUnder13)console.log("   small<13 samples:",after.smallSamples.join(" | "));
    if(axeAfter.length)console.log("   axe samples:",axeAfter.slice(0,6).map(x=>x.target+" :: "+x.summary).join("\n      "));
    if(after.hscroll)console.log("   overflow:",after.overflowers.join(" | "));
}
for(const width of widths){
  const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:1});
  const page=await context.newPage();
  for(const route of routes){
    await page.emulateMedia({reducedMotion:"reduce"});
    await page.goto(BASE+route,{waitUntil:"networkidle"});
    await settle(page);
    for(const state of statesFor(route,width)){
      const label=state.name;
      const ok=await state.apply(page).catch(e=>{console.log("   state",label,"failed:",String(e).slice(0,120));return false});
      if(ok===false)continue;
      await page.waitForTimeout(350);
      await measure(page,route+" ["+label+"]",width,false);
    }
    if(states){await page.emulateMedia({reducedMotion:"reduce"});await page.goto(BASE+route,{waitUntil:"networkidle"});await settle(page)}
    await measure(page,route,width,compareBefore);
  }
  await context.close();
}
await browser.close();
writeFileSync(process.env.OUT||"/dev/null",JSON.stringify(results,null,1));
