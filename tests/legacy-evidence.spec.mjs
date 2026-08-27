import {test,expect} from "@playwright/test";

const preserved=[
 "/camarote-nido",
 "/camarote-triple",
 "/camarote-doble",
 "/cama-alta",
 "/camarote-titanic",
 "/camarote-1-5-plazas",
 "/camarote-desmontable",
 "/cama-dos-plazas-con-cajon",
 "/camarote-2-plazas",
 "/cama-institucional-metalica",
 "/cama-loft-metalica",
 "/cama-loft-con-escritorio",
 "/mobiliario-institucional",
];

async function expectNoTechnicalHero(page,scope){
 await expect(page.locator(`${scope} [data-visual-kind="technical-render"]`)).toHaveCount(0);
 await expect(page.locator(`${scope} .v2-tech-stage`)).toHaveCount(0);
}

test("preserved commercial URLs keep evidence-led heroes",async({page})=>{
 for(const route of preserved){
  const response=await page.goto(route,{waitUntil:"networkidle"});
  expect(response?.status(),route).toBe(200);
  await expect(page.locator(".v2-solution-hero .commercial-evidence-panel"),route).toBeVisible();
  await expectNoTechnicalHero(page,".v2-solution-hero");
  const text=await page.locator("body").innerText();
  expect(text,route).not.toMatch(/Ã.|Â.|â€|�/u);
 }
});
