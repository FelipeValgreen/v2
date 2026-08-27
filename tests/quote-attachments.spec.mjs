import {test,expect} from "@playwright/test";

async function openContextStep(page){
 await page.goto("/cotizar?category=fabricacion",{waitUntil:"domcontentloaded"});
 await expect(page.locator('[data-quote-step="1"]')).toBeVisible();
 await page.getByRole("button",{name:/Continuar/}).click();
 await expect(page.locator('[data-quote-step="2"]')).toBeVisible();
}

test("quote flow accepts up to three private-ready reference files without writing in staging",async({page})=>{
 await openContextStep(page);
 const input=page.locator('input[type="file"][name="attachments"]');
 await expect(input).toBeEnabled();
 const accept=await input.getAttribute("accept");
 expect(accept).toContain("image/jpeg");
 expect(accept).toContain("image/png");
 expect(accept).toContain("image/webp");
 expect(accept).toContain("application/pdf");

 await input.setInputFiles([
  {name:"referencia.jpg",mimeType:"image/jpeg",buffer:Buffer.from("rinon-reference-image")},
  {name:"croquis.pdf",mimeType:"application/pdf",buffer:Buffer.from("%PDF-1.4 rinon-test")},
 ]);
 await expect(page.locator(".quote-status")).toContainText("2 archivos listos para adjuntar");
 await expect(page.locator(".quote-file-control small")).toContainText("2 seleccionados");

 await page.getByLabel("Ubicación *").fill("San Bernardo");
 await page.getByLabel("Cuéntanos qué necesitas resolver *").fill("Necesito fabricar un soporte metálico según una referencia y un croquis.");
 await page.getByRole("button",{name:/Continuar/}).click();
 await expect(page.locator('[data-quote-step="3"]')).toBeVisible();
 await page.getByLabel("Nombre *").fill("Prueba QA RINON");
 await page.getByLabel("Tipo de cliente *").selectOption("Empresa");
 await page.getByLabel("WhatsApp *").fill("+56 9 1234 5678");
 await page.locator('input[name="privacidad"]').check();
 await page.getByRole("button",{name:"Solicitar cotización"}).click();
 await expect(page.locator(".quote-status")).toContainText("modo de demostración");
});

test("quote attachment picker rejects more than three files before submission",async({page})=>{
 await openContextStep(page);
 const input=page.locator('input[type="file"][name="attachments"]');
 await input.setInputFiles([
  {name:"a.jpg",mimeType:"image/jpeg",buffer:Buffer.from("a")},
  {name:"b.jpg",mimeType:"image/jpeg",buffer:Buffer.from("b")},
  {name:"c.png",mimeType:"image/png",buffer:Buffer.from("c")},
  {name:"d.pdf",mimeType:"application/pdf",buffer:Buffer.from("d")},
 ]);
 await expect(page.locator(".quote-status")).toContainText("hasta 3 archivos");
 const count=await input.evaluate(node=>node.files?.length??0);
 expect(count).toBe(0);
});

test("quote attachment control remains usable and bounded on mobile",async({page})=>{
 await page.setViewportSize({width:390,height:900});
 await openContextStep(page);
 const control=page.locator(".quote-file-control");
 await expect(control).toBeVisible();
 const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth}));
 expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth+2);
});
