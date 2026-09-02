import {test,expect} from "@playwright/test";
import { gotoReady, preservedCommercialRoutes } from "./fixtures/routes.mjs";

const preservedCommercialRoutesWithCatalogPhotography = new Map([
 ["/cama-loft-con-escritorio", { minWidth: 1200 }],
]);

async function expectNoTechnicalHero(page,scope){
 await expect(page.locator(`${scope} [data-visual-kind="technical-render"]`)).toHaveCount(0);
 await expect(page.locator(`${scope} .v2-tech-stage`)).toHaveCount(0);
}

test("preserved commercial URLs keep evidence-led heroes",async({page})=>{
 for(const routeEntry of preservedCommercialRoutes){
 const response=await gotoReady(page,routeEntry);
 expect(response?.status(),routeEntry.path).toBe(200);
 const catalogPhoto=preservedCommercialRoutesWithCatalogPhotography.get(routeEntry.path);
 if(catalogPhoto){
  const figure=page.locator('.v2-solution-hero .evidence-photo[data-visual-provenance="sister-brand-product"]').first();
  await expect(figure,routeEntry.path).toBeVisible();
  await expect(figure.locator("figcaption"),routeEntry.path).toContainText("PRODUCTO DE CATÁLOGO");
  const image=figure.locator("img");
  await expect(image,routeEntry.path).toHaveJSProperty("complete",true);
  await expect(image,routeEntry.path).not.toHaveJSProperty("naturalWidth",0);
  const metrics=await figure.evaluate((node)=>{
   const img=node.querySelector("img");
   return {natural:img.naturalWidth,rendered:node.getBoundingClientRect().width,src:img.currentSrc};
  });
  expect(metrics.natural,routeEntry.path).toBeGreaterThanOrEqual(catalogPhoto.minWidth);
  expect(metrics.rendered,`${routeEntry.path} upscale`).toBeLessThanOrEqual(metrics.natural+2);
  expect(metrics.src,routeEntry.path).toContain("/visuals/catalog/");
 }else{
  await expect(page.locator(".v2-solution-hero .commercial-evidence-panel"),routeEntry.path).toBeVisible();
 }
 await expectNoTechnicalHero(page,".v2-solution-hero");
 const text=await page.locator("body").innerText();
 expect(text,routeEntry.path).not.toMatch(/Ã.|Â.|â€|�/u);
 }
});
