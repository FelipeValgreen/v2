import {test,expect} from "@playwright/test";

const routes=["/rejas-metalicas","/portones-metalicos","/mallas-3d","/mallas-separadoras"];

test("perimeter money pages use concrete evidence panels instead of hero diagrams",async({page})=>{
 for(const route of routes){
  const response=await page.goto(route,{waitUntil:"networkidle"});
  expect(response?.status()).toBe(200);
  await expect(page.locator(".rinon-commercial-hero")).toBeVisible();
  await expect(page.locator(".rinon-commercial-hero .commercial-evidence-panel")).toBeVisible();
  await expect(page.locator(".rinon-commercial-hero .technical-visual")).toHaveCount(0);
  const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth}));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth+2);
 }
});

test("generic commercial solution fallback never promotes a technical diagram to hero evidence",async({page})=>{
 const response=await page.goto("/pintura-electrostatica",{waitUntil:"networkidle"});
 expect(response?.status()).toBe(200);
 await expect(page.locator(".prd2-solution-hero")).toBeVisible();
 const visualCount=await page.locator(".prd2-solution-hero .visual-evidence").count();
 if(visualCount===0){await expect(page.locator(".prd2-solution-hero .evidence-panel-only .commercial-evidence-panel")).toBeVisible();await expect(page.locator(".prd2-solution-hero .technical-visual")).toHaveCount(0)}
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
