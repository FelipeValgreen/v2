import {test,expect} from "@playwright/test";

async function assertHub(page){
 const response=await page.goto("/soluciones",{waitUntil:"domcontentloaded"});
 expect(response?.status()).toBe(200);
 await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href","https://rinon.cl/soluciones");
 const robots=(await page.locator('meta[name="robots"]').getAttribute("content"))?.toLowerCase() ?? "";
 expect(robots).toContain("noindex");
 await expect(page.locator('main[data-sgeo-owner="soluciones"] h1')).toHaveText(/Productos y soluciones metálicas/i);
 const main=page.locator('main[data-sgeo-owner="soluciones"]');
 const text=await main.innerText();
 for(const required of ["Camas y descanso","Mobiliario y equipamiento","Cierres y accesos","Estructuras","SERVICIOS DE TALLER Y TERRENO"]){
  expect(text).toContain(required);
 }
 for(const href of ["/camarotes","/cierres-perimetrales","/estructuras-metalicas","/fabricacion-metalica","/empresas"]){
  expect(await main.locator(`a[href="${href}"]`).count(),`solutions hub link ${href}`).toBeGreaterThan(0);
 }
 const closing=main.locator("#cotizar");
 expect(await closing.locator('a[href="/cotizar"][data-event="quote_start"][data-cta-location="solutions_footer"]').count()).toBeGreaterThan(0);
 expect(await closing.locator('a[href*="wa.me/"][data-cta-location="solutions_footer"]').count()).toBeGreaterThan(0);
}

test("solutions hub owns discovery IA and commercial exits",async({page})=>{
 await assertHub(page);
});

test("solutions hub remains usable on mobile",async({page})=>{
 await page.setViewportSize({width:390,height:900});
 await assertHub(page);
 const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth}));
 expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth+2);
 await expect(page.locator('main a[href="/cotizar"]').first()).toBeVisible();
});
