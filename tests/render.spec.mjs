import { test, expect } from "@playwright/test";

async function assertNoFailedLocalAssets(page){const failures=[];page.on("response",response=>{const url=new URL(response.url());if(url.hostname==="127.0.0.1"&&response.status()>=400)failures.push(`${response.status()} ${url.pathname}`)});return failures}

async function assertBrandChrome(page){
 await expect(page.locator(".prd2-header")).toBeVisible();
 await expect(page.locator(".s6-footer")).toBeVisible();
 const chrome=await page.evaluate(()=>{
  const logo=document.querySelector(".prd2-brand img");
  const footerLink=document.querySelector(".s6-footer a");
  const body=getComputedStyle(document.body);
  const link=footerLink?getComputedStyle(footerLink):null;
  return {logoLoaded:logo instanceof HTMLImageElement&&logo.complete&&logo.naturalWidth>100,bodyFont:body.fontFamily,footerColor:link?.color??"",footerDecoration:link?.textDecorationLine??"",scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth};
 });
 expect(chrome.logoLoaded).toBeTruthy();
 expect(chrome.bodyFont.toLowerCase()).toContain("raleway");
 expect(chrome.footerColor).not.toBe("rgb(0, 0, 238)");
 expect(chrome.scrollWidth).toBeLessThanOrEqual(chrome.innerWidth+2);
}

test("home renders the approved visual system, mega navigation and premium structure visual",async({page})=>{
 const failures=await assertNoFailedLocalAssets(page);await page.goto("/",{waitUntil:"networkidle"});
 await expect(page.locator("main.s7-home")).toBeVisible();await expect(page.locator(".s7-hero h1")).toContainText("Lo necesitas");await assertBrandChrome(page);
 const rendered=await page.evaluate(()=>{const h1=document.querySelector(".s7-hero h1"),hero=document.querySelector(".s7-hero"),image=document.querySelector(".s7-hero-image img"),structure=document.querySelector(".rinon-structure-photo img");if(!h1||!hero||!image)return null;return{styleSheetCount:document.styleSheets.length,h1FontSize:parseFloat(getComputedStyle(h1).fontSize),heroHeight:hero.getBoundingClientRect().height,headerHeight:document.querySelector(".prd2-header")?.getBoundingClientRect().height??0,imageLoaded:image instanceof HTMLImageElement&&image.complete&&image.naturalWidth>200,structureLoaded:structure instanceof HTMLImageElement&&structure.complete&&structure.naturalWidth>100}});
 expect(rendered).not.toBeNull();expect(rendered.styleSheetCount).toBeGreaterThanOrEqual(2);expect(rendered.h1FontSize).toBeGreaterThan(45);expect(rendered.heroHeight).toBeGreaterThan(550);expect(rendered.headerHeight).toBeGreaterThan(55);expect(rendered.imageLoaded).toBeTruthy();expect(rendered.structureLoaded).toBeTruthy();
 await page.getByRole("button",{name:/Productos/}).click();await expect(page.locator("#mega-products")).toBeVisible();await expect(page.getByRole("link",{name:/Camas balinesas/}).first()).toBeVisible();
 await page.getByRole("button",{name:/Servicios/}).click();await expect(page.locator("#mega-services")).toBeVisible();await expect(page.getByRole("link",{name:/Pintura electrostática/}).first()).toBeVisible();
 expect(failures).toEqual([]);
});

test("critical commercial pages including expanded catalog render with CSS",async({page})=>{
 for(const route of ["/soluciones","/camarotes","/camarote-nido","/camas-metalicas","/camas-balinesas","/mesas-metalicas","/escritorios-metalicos","/estructuras-metalicas","/cierres-perimetrales","/mallas-3d","/mallas-separadoras","/mobiliario-institucional","/soldadura-mig","/corte-metalico","/pintura-electrostatica","/instalacion","/reparaciones-metalicas","/recursos/como-cotizar-rejas-metalicas","/cotizar"]){
  const response=await page.goto(route,{waitUntil:"networkidle"});expect(response?.status()).toBe(200);await assertBrandChrome(page);const state=await page.evaluate(()=>({sheets:document.styleSheets.length,font:getComputedStyle(document.body).fontFamily,text:document.body.innerText.slice(0,3000)}));expect(state.sheets).toBeGreaterThanOrEqual(2);expect(state.font.toLowerCase()).toContain("raleway");expect(state.text).not.toMatch(/Ã.|Â.|â€|�/u);
 }
});

test("about and contact include usable location actions",async({page})=>{
 for(const route of ["/nosotros","/contacto"]){await page.goto(route,{waitUntil:"domcontentloaded"});await assertBrandChrome(page);await expect(page.locator(".rinon-map-panel iframe")).toHaveAttribute("src",/google\.com\/maps/);await expect(page.getByRole("link",{name:/Google Maps/})).toHaveAttribute("href",/google\.com\/maps\/dir/);await expect(page.getByRole("link",{name:/Waze/})).toHaveAttribute("href",/waze\.com/)}
});

test("approved legacy blog URL stays non-redirecting in safe preview",async({page})=>{const response=await page.goto("/blog/como-cotizar-rejas-metalicas",{waitUntil:"networkidle"});expect(response?.status()).toBe(200);await expect(page.getByRole("heading",{name:"Esta guía ya tiene una versión actualizada."})).toBeVisible();await expect(page.getByRole("link",{name:"Ver guía actualizada"})).toHaveAttribute("href","/recursos/como-cotizar-rejas-metalicas")});

test("unknown root-level routes still return the real 404",async({page})=>{const response=await page.goto("/__rinon_browser_missing_route__",{waitUntil:"networkidle"});expect(response?.status()).toBe(404);await expect(page.getByText("No encontramos esta página.")).toBeVisible()});
