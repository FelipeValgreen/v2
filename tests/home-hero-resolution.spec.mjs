import {test,expect} from "@playwright/test";

test.use({deviceScaleFactor:2});

for(const viewport of [{width:1440,height:1000},{width:1024,height:900},{width:768,height:900},{width:390,height:844},{width:320,height:800}]){
 test(`home temporary hero respects governed source density at ${viewport.width}px`,async({page})=>{
  await page.setViewportSize(viewport);
  await page.goto("/",{waitUntil:"networkidle"});
  const shell=page.locator(".s7-hero-contained .s7-hero-image");
  const image=shell.locator("img");
  await expect(image).toBeVisible();
  const metrics=await shell.evaluate(node=>{
   const image=node.querySelector("img");
   const box=node.getBoundingClientRect();
   return{
    sourceWidth:Number(node.getAttribute("data-source-width")||0),
    sourceHeight:Number(node.getAttribute("data-source-height")||0),
    renderedWidth:box.width,
    renderedHeight:box.height,
    dpr:window.devicePixelRatio,
    src:image instanceof HTMLImageElement?image.currentSrc:"",
    scrollWidth:document.documentElement.scrollWidth,
    innerWidth:window.innerWidth,
   };
  });
  expect(metrics.sourceWidth).toBe(720);
  expect(metrics.sourceHeight).toBe(730);
  expect(metrics.src).toContain("/visuals/home-hero-conceptual-welding.webp");
  expect(metrics.src).not.toContain("/_next/image");
  expect(metrics.renderedWidth*metrics.dpr).toBeLessThanOrEqual(metrics.sourceWidth+2);
  expect(metrics.renderedHeight*metrics.dpr).toBeLessThanOrEqual(metrics.sourceHeight+2);
  expect(metrics.renderedWidth).toBeLessThanOrEqual(362);
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth+2);
  await expect(page.getByText(/Visual conceptual · 720 × 730 fuente/)).toBeVisible();
 });
}
