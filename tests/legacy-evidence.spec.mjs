import {test,expect} from "@playwright/test";
import { gotoReady, preservedCommercialRoutes } from "./fixtures/routes.mjs";

async function expectNoTechnicalHero(page,scope){
 await expect(page.locator(`${scope} [data-visual-kind="technical-render"]`)).toHaveCount(0);
 await expect(page.locator(`${scope} .v2-tech-stage`)).toHaveCount(0);
}

test("preserved commercial URLs keep evidence-led heroes",async({page})=>{
 for(const routeEntry of preservedCommercialRoutes){
  const response=await gotoReady(page,routeEntry);
  expect(response?.status(),routeEntry.path).toBe(200);
  await expect(page.locator(".v2-solution-hero .commercial-evidence-panel"),routeEntry.path).toBeVisible();
  await expectNoTechnicalHero(page,".v2-solution-hero");
  const text=await page.locator("body").innerText();
  expect(text,routeEntry.path).not.toMatch(/Ã.|Â.|â€|�/u);
 }
});
