import {test,expect} from "@playwright/test";

for(const viewport of [{width:1440,height:1000},{width:1024,height:900},{width:768,height:900},{width:390,height:844},{width:320,height:800}]){
 test(`home temporary hero stays within intrinsic resolution at ${viewport.width}px`,async({page})=>{
  await page.setViewportSize(viewport);
  await page.goto("/",{waitUntil:"networkidle"});
  const image=page.locator(".s7-hero-contained .s7-hero-image img");
  await expect(image).toBeVisible();
  const metrics=await image.evaluate(node=>{const box=node.getBoundingClientRect();return{naturalWidth:node.naturalWidth,naturalHeight:node.naturalHeight,renderedWidth:box.width,renderedHeight:box.height,src:node.currentSrc,scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth}});
  expect(metrics.naturalWidth).toBeGreaterThanOrEqual(Math.floor(metrics.renderedWidth));
  expect(metrics.naturalHeight).toBeGreaterThanOrEqual(Math.floor(metrics.renderedHeight));
  expect(metrics.renderedWidth).toBeLessThanOrEqual(viewport.width>=1100?622:viewport.width+1);
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth+2);
  await expect(page.getByText(/Visual conceptual · 720 × 730 fuente/)).toBeVisible();
 });
}
