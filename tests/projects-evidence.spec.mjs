import {test,expect} from "@playwright/test";
import { gotoReady, route } from "./fixtures/routes.mjs";

async function expectNoTechnicalHero(page,scope){
 await expect(page.locator(`${scope} [data-visual-kind="technical-render"]`)).toHaveCount(0);
 await expect(page.locator(`${scope} .v2-tech-stage`)).toHaveCount(0);
}

test("projects page opens with commercial evidence instead of a technical diagram",async({page})=>{
 const response=await gotoReady(page,route("/proyectos"));
 expect(response?.status()).toBe(200);
 await expect(page.getByRole("heading",{name:"Fabricación que se puede explicar."})).toBeVisible();
 await expect(page.locator(".v2-solution-hero .commercial-evidence-panel")).toBeVisible();
 await expect(page.getByText("QUÉ DEFINE UN PROYECTO")).toBeVisible();
 await expectNoTechnicalHero(page,".v2-solution-hero");
});

test("governed conceptual evidence never exceeds its declared source width",async({page})=>{
 await page.setViewportSize({width:1440,height:1000});
 await gotoReady(page,route("/"));
 const governed=page.locator('.evidence-photo[data-source-width]');
 expect(await governed.count()).toBeGreaterThanOrEqual(3);
 for(let index=0;index<await governed.count();index++){
  const figure=governed.nth(index);
  const image=figure.locator("img");
  await expect(image).toHaveJSProperty("complete",true);
  await expect(image).not.toHaveJSProperty("naturalWidth",0);
  const metrics=await figure.evaluate(node=>{
   const image=node.querySelector("img");
   const box=node.getBoundingClientRect();
   return{
    sourceWidth:Number(node.getAttribute("data-source-width")||0),
    renderedWidth:box.width,
    src:image instanceof HTMLImageElement?image.currentSrc:"",
   };
  });
  expect(metrics.sourceWidth).toBeGreaterThan(0);
  expect(metrics.renderedWidth).toBeLessThanOrEqual(metrics.sourceWidth+2);
  expect(metrics.src).toContain("/visuals/");
  expect(metrics.src).not.toContain("/_next/image");
 }
});

test("projects page has no horizontal overflow on compact breakpoints",async({page})=>{
 for(const width of [320,375,430,768]){
  await page.setViewportSize({width,height:900});
  await gotoReady(page,route("/proyectos"));
  const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth}));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth+2);
 }
});
