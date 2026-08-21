import {test,expect} from "@playwright/test";

async function archivePhotoMetrics(locator){
 return locator.evaluate(node=>{
  const image=node.querySelector("img");
  const box=node.getBoundingClientRect();
  return{
   provenance:node.getAttribute("data-visual-provenance"),
   sourceWidth:Number(node.getAttribute("data-source-width")||0),
   sourceHeight:Number(node.getAttribute("data-source-height")||0),
   renderedWidth:box.width,
   src:image instanceof HTMLImageElement?image.currentSrc:"",
   loaded:image instanceof HTMLImageElement&&image.complete&&image.naturalWidth>0,
  };
 });
}

test("home bunk chapter uses governed archive photography",async({page})=>{
 await page.goto("/",{waitUntil:"networkidle"});
 const figure=page.locator('.s7-chapter-dark .evidence-photo[data-visual-provenance="user-drive-reference"]');
 await expect(figure).toBeVisible();
 const metrics=await archivePhotoMetrics(figure);
 expect(metrics.loaded).toBeTruthy();
 expect(metrics.provenance).toBe("user-drive-reference");
 expect(metrics.sourceWidth).toBe(1200);
 expect(metrics.sourceHeight).toBe(900);
 expect(metrics.renderedWidth).toBeLessThanOrEqual(1202);
 expect(metrics.src).toContain("/visuals/archive/camarote-product-reference.webp");
 expect(metrics.src).not.toContain("/_next/image");
 await expect(figure.locator("figcaption")).toContainText("REFERENCIA DE PRODUCTO · ARCHIVO");
 await expect(figure).not.toHaveClass(/is-conceptual/);
});

test("camarotes landing keeps archive provenance explicit",async({page})=>{
 await page.goto("/camarotes",{waitUntil:"networkidle"});
 const figure=page.locator('.evidence-photo[data-visual-provenance="user-drive-reference"]').first();
 await expect(figure).toBeVisible();
 const metrics=await archivePhotoMetrics(figure);
 expect(metrics.loaded).toBeTruthy();
 expect(metrics.sourceWidth).toBe(1200);
 expect(metrics.sourceHeight).toBe(900);
 expect(metrics.src).toContain("/visuals/archive/camarote-product-reference.webp");
 await expect(figure.locator("figcaption")).toContainText("REFERENCIA DE PRODUCTO · ARCHIVO");
});
