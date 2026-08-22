import {test,expect} from "@playwright/test";

const expandedRoutes=[
 "/camas-metalicas","/camas-balinesas","/mesas-metalicas","/escritorios-metalicos",
 "/soldadura-mig","/corte-metalico","/instalacion","/reparaciones-metalicas",
];

const preservedRoutes=[
 "/camarote-nido","/camarote-triple","/camarote-doble","/cama-alta","/camarote-titanic",
 "/camarote-1-5-plazas","/camarote-desmontable","/cama-dos-plazas-con-cajon","/camarote-2-plazas",
 "/cama-institucional-metalica","/cama-loft-metalica","/cama-loft-con-escritorio","/mobiliario-institucional",
];

const primarySolutionRoutes=[
 "/camarotes","/cierres-perimetrales","/estructuras-metalicas","/rejas-metalicas","/portones-metalicos","/equipamiento-metalico",
 "/pintura-electrostatica",
];

const genericTemplateRoutes=["/camarotes","/cierres-perimetrales","/equipamiento-metalico","/pintura-electrostatica"];

const dedicatedCommercialRoutes=[
 "/mallas-3d","/mallas-separadoras","/fabricacion-metalica",
];

const preCutoverRedirectAliases=[
 "/cercos-metalicos-santiago","/portones-industriales","/mallas-separadoras-industriales","/soldadura-metalica-santiago",
];

async function assertSeoShell(page,route){
 const response=await page.goto(route,{waitUntil:"networkidle"});
 expect(response?.status(),`${route} status`).toBe(200);
 const expectedCanonical=`https://rinon.cl${route}`;
 await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href",expectedCanonical);
 const robots=await page.locator('meta[name="robots"]').getAttribute("content");
 expect(robots?.toLowerCase(),`${route} robots`).toContain("noindex");
 expect(robots?.toLowerCase(),`${route} robots`).toContain("nofollow");
 await expect(page.locator("main h1"),`${route} h1`).toHaveCount(1);
 const title=await page.title();
 expect(title.trim().length,`${route} title`).toBeGreaterThan(15);
 const description=await page.locator('meta[name="description"]').getAttribute("content");
 expect(description?.trim().length??0,`${route} description`).toBeGreaterThan(45);
 const text=await page.locator("main").innerText();
 expect(text,`${route} mojibake`).not.toMatch(/Ã.|Â.|â€|�/u);
}

async function assertCommercialPath(page,route,{dualPath=true}={}){
 const main=page.locator("main");
 const quoteLinks=main.locator('a[href^="/cotizar"]');
 expect(await quoteLinks.count(),`${route} needs a main quote CTA`).toBeGreaterThan(0);
 const trackedQuote=main.locator('[data-event="quote_start"]');
 expect(await trackedQuote.count(),`${route} needs a tracked quote start`).toBeGreaterThan(0);
 if(dualPath){
  const whatsapp=main.locator('a[href*="wa.me/"]');
  expect(await whatsapp.count(),`${route} needs a main WhatsApp path`).toBeGreaterThan(0);
 }
 const h2Count=await main.locator("h2").count();
 expect(h2Count,`${route} needs decision-support content`).toBeGreaterThanOrEqual(2);
}

test("expanded commercial intent owners preserve SEO and dual conversion paths",async({page})=>{
 for(const route of expandedRoutes){await assertSeoShell(page,route);await assertCommercialPath(page,route,{dualPath:true});}
});

test("preserved organic commercial URLs remain full conversion pages",async({page})=>{
 for(const route of preservedRoutes){await assertSeoShell(page,route);await assertCommercialPath(page,route,{dualPath:true});}
});

test("primary solution landings keep canonical intent and commercial exit",async({page})=>{
 for(const route of primarySolutionRoutes){await assertSeoShell(page,route);await assertCommercialPath(page,route,{dualPath:true});}
});

test("generic solution template tracks the closing quote as well as WhatsApp",async({page})=>{
 for(const route of genericTemplateRoutes){
  await assertSeoShell(page,route);
  const closing=page.locator("#cotizar");
  await expect(closing,`${route} generic closing CTA`).toHaveCount(1);
  expect(await closing.locator('a[href^="/cotizar"][data-event="quote_start"][data-cta-location="solution_footer"]').count(),`${route} tracked solution footer quote`).toBeGreaterThan(0);
  expect(await closing.locator('a[href*="wa.me/"][data-cta-location="solution_footer"]').count(),`${route} solution footer WhatsApp`).toBeGreaterThan(0);
 }
});

test("dedicated malla and custom-fabrication owners keep dual conversion paths",async({page})=>{
 for(const route of dedicatedCommercialRoutes){await assertSeoShell(page,route);await assertCommercialPath(page,route,{dualPath:true});}
});

test("structures landing owns structural intent without pretending conceptual evidence is executed work",async({page})=>{
 const route="/estructuras-metalicas";
 await assertSeoShell(page,route);
 await assertCommercialPath(page,route,{dualPath:true});
 const main=page.locator('main[data-sgeo-owner="estructuras-metalicas"]');
 await expect(main).toHaveCount(1);
 const text=(await main.innerText()).toLowerCase();
 expect(text).toContain("cobertizos y pérgolas");
 expect(text).toContain("empresas y operación");
 expect(text).toContain("fabricar una estructura no equivale automáticamente a desarrollar su ingeniería");
 expect(text).toContain("visual conceptual");
 expect(text).toContain("no obra ejecutada");
 const schema=await main.locator('script[type="application/ld+json"]').first().textContent();
 expect(schema).toContain('"@type":"Service"');
 expect(schema).toContain('"@type":"FAQPage"');
 expect(schema).toContain("Cobertizos y pérgolas");
});

test("enterprise landing is a B2B intent owner with structured answers and three closing paths",async({page})=>{
 const route="/empresas";
 await assertSeoShell(page,route);
 await assertCommercialPath(page,route,{dualPath:true});
 const main=page.locator('main[data-sgeo-owner="empresas"]');
 await expect(main).toHaveCount(1);
 const text=await main.innerText();
 expect(text).toContain("Compra por volumen");
 expect(text).toContain("RUTAS DE COMPRA");
 expect(text).toContain("Bajo plano");
 const schema=await main.locator('script[type="application/ld+json"]').first().textContent();
 expect(schema).toContain('"@type":"Service"');
 expect(schema).toContain('"@type":"FAQPage"');
 const closing=page.locator("#cotizar");
 expect(await closing.locator('a[href^="/cotizar"][data-event="quote_start"][data-cta-location="b2b_footer"]').count()).toBeGreaterThan(0);
 expect(await closing.locator('a[href*="wa.me/"][data-cta-location="b2b_footer"]').count()).toBeGreaterThan(0);
 expect(await closing.locator('a[href^="/recursos/"]').count()).toBeGreaterThan(0);
});

test("rejas and portones preserve a dual conversion choice at the decision point",async({page})=>{
 for(const route of ["/rejas-metalicas","/portones-metalicos"]){
  await assertSeoShell(page,route);
  const closing=page.locator("#cotizar");
  await expect(closing,`${route} closing CTA`).toHaveCount(1);
  expect(await closing.locator('a[href^="/cotizar"][data-event="quote_start"]').count(),`${route} tracked closing quote`).toBeGreaterThan(0);
  expect(await closing.locator('a[href*="wa.me/"]').count(),`${route} closing WhatsApp`).toBeGreaterThan(0);
 }
});

test("pre-cutover migration aliases remain disabled in staging",async({page})=>{
 for(const route of preCutoverRedirectAliases){
  const response=await page.goto(route,{waitUntil:"networkidle"});
  expect(response?.status(),`${route} must not redirect before authorized cutover`).toBe(404);
  const robots=await page.locator('meta[name="robots"]').first().getAttribute("content");
  expect(robots?.toLowerCase(),`${route} 404 robots`).toContain("noindex");
 }
});

test("representative organic landings remain usable at mobile width",async({page})=>{
 await page.setViewportSize({width:390,height:900});
 for(const route of ["/camarotes","/camas-metalicas","/cierres-perimetrales","/estructuras-metalicas","/rejas-metalicas","/portones-metalicos","/mallas-3d","/mallas-separadoras","/fabricacion-metalica","/empresas","/camarote-nido","/soldadura-mig"]){
  await page.goto(route,{waitUntil:"networkidle"});
  const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth}));
  expect(metrics.scrollWidth,`${route} mobile overflow`).toBeLessThanOrEqual(metrics.innerWidth+2);
  const primary=page.locator('main a[href^="/cotizar"]').first();
  await expect(primary,`${route} mobile quote CTA`).toBeVisible();
 }
});
