import {test,expect} from "@playwright/test";

const routes=["/rejas-metalicas","/portones-metalicos","/mallas-3d","/mallas-separadoras"];
const commercialHeroRoutes=[
 "/soluciones",
 "/camarotes",
 "/camarote-nido",
 "/camas-metalicas",
 "/camas-balinesas",
 "/mesas-metalicas",
 "/escritorios-metalicos",
 "/cierres-perimetrales",
 "/rejas-metalicas",
 "/portones-metalicos",
 "/mallas-3d",
 "/mallas-separadoras",
 "/estructuras-metalicas",
 "/fabricacion-metalica",
 "/mobiliario-institucional",
 "/soldadura-mig",
 "/corte-metalico",
 "/pintura-electrostatica",
 "/instalacion",
 "/reparaciones-metalicas",
 "/empresas",
 "/proyectos",
 "/contacto",
 "/cotizar",
];

async function expectNoHeroTechnicalVisual(page){
 await expect(page.locator('.rinon-commercial-hero [data-visual-kind="technical-render"], .prd2-solution-hero [data-visual-kind="technical-render"], .v2-solution-hero [data-visual-kind="technical-render"], .rinon-quote-hero [data-visual-kind="technical-render"]')).toHaveCount(0);
 await expect(page.locator(".rinon-commercial-hero .v2-tech-stage, .prd2-solution-hero .v2-tech-stage, .v2-solution-hero .v2-tech-stage, .rinon-quote-hero .v2-tech-stage")).toHaveCount(0);
}

test("perimeter money pages use concrete evidence panels instead of hero diagrams",async({page})=>{
 for(const route of routes){
  const response=await page.goto(route,{waitUntil:"networkidle"});
  expect(response?.status()).toBe(200);
  await expect(page.locator(".rinon-commercial-hero")).toBeVisible();
  await expect(page.locator(".rinon-commercial-hero .commercial-evidence-panel")).toBeVisible();
  await expectNoHeroTechnicalVisual(page);
  const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth}));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth+2);
 }
});

test("generic commercial solution fallback never promotes a technical diagram to hero evidence",async({page})=>{
 const response=await page.goto("/pintura-electrostatica",{waitUntil:"networkidle"});
 expect(response?.status()).toBe(200);
 await expect(page.locator(".prd2-solution-hero")).toBeVisible();
 const visualCount=await page.locator(".prd2-solution-hero .visual-evidence").count();
 if(visualCount===0){await expect(page.locator(".prd2-solution-hero .evidence-panel-only .commercial-evidence-panel")).toBeVisible();await expectNoHeroTechnicalVisual(page)}
});

test("evidence-led perimeter heroes stay responsive",async({page})=>{
 for(const width of [320,375,430,768,1024]){
  await page.setViewportSize({width,height:900});
  await page.goto("/rejas-metalicas",{waitUntil:"networkidle"});
  await expect(page.locator(".commercial-evidence-panel")).toBeVisible();
  const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth,heroWidth:document.querySelector(".rinon-commercial-hero")?.getBoundingClientRect().width??0}));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth+2);
  expect(metrics.heroWidth).toBeLessThanOrEqual(metrics.innerWidth+1);
 }
});

test("commercial heroes never fall back to TechnicalVisual",async({page})=>{
 for(const route of commercialHeroRoutes){
  const response=await page.goto(route,{waitUntil:"networkidle"});
  expect(response?.status()).toBe(200);
  await expectNoHeroTechnicalVisual(page);
 }
});
