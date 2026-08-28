import {test,expect} from "@playwright/test";
import { commercialHeroRoutes, gotoReady, perimeterMoneyRoutes, route } from "./fixtures/routes.mjs";

async function expectNoHeroTechnicalVisual(page){
 await expect(page.locator('.rinon-commercial-hero [data-visual-kind="technical-render"], .prd2-solution-hero [data-visual-kind="technical-render"], .v2-solution-hero [data-visual-kind="technical-render"], .rinon-quote-hero [data-visual-kind="technical-render"]')).toHaveCount(0);
 await expect(page.locator(".rinon-commercial-hero .v2-tech-stage, .prd2-solution-hero .v2-tech-stage, .v2-solution-hero .v2-tech-stage, .rinon-quote-hero .v2-tech-stage")).toHaveCount(0);
}

test("perimeter money pages use concrete evidence panels instead of hero diagrams",async({page})=>{
 for(const routeEntry of perimeterMoneyRoutes){
  const response=await gotoReady(page,routeEntry);
  expect(response?.status()).toBe(200);
  await expect(page.locator(".rinon-commercial-hero")).toBeVisible();
  await expect(page.locator(".rinon-commercial-hero .commercial-evidence-panel")).toBeVisible();
  await expectNoHeroTechnicalVisual(page);
  const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth}));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth+2);
 }
});

test("generic commercial solution fallback never promotes a technical diagram to hero evidence",async({page})=>{
 const response=await gotoReady(page,route("/pintura-electrostatica"));
 expect(response?.status()).toBe(200);
 await expect(page.locator(".prd2-solution-hero")).toBeVisible();
 const visualCount=await page.locator(".prd2-solution-hero .visual-evidence").count();
 if(visualCount===0){
  const fallbackCount=await page.locator(".prd2-solution-hero .evidence-panel-only .commercial-evidence-panel, .prd2-solution-hero .fabrication-spec").count();
  expect(fallbackCount).toBeGreaterThan(0);
  await expectNoHeroTechnicalVisual(page)
 }
});

test("evidence-led perimeter heroes stay responsive",async({page})=>{
 for(const width of [320,375,430,768,1024]){
  await page.setViewportSize({width,height:900});
  await gotoReady(page,route("/rejas-metalicas"));
  await expect(page.locator(".commercial-evidence-panel")).toBeVisible();
  const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth,heroWidth:document.querySelector(".rinon-commercial-hero")?.getBoundingClientRect().width??0}));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth+2);
  expect(metrics.heroWidth).toBeLessThanOrEqual(metrics.innerWidth+1);
 }
});

test("commercial heroes never fall back to TechnicalVisual",async({page})=>{
 for(const routeEntry of commercialHeroRoutes){
  const response=await gotoReady(page,routeEntry);
  expect(response?.status()).toBe(200);
  await expectNoHeroTechnicalVisual(page);
 }
});
