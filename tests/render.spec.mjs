import { test, expect } from "@playwright/test";

async function assertNoFailedLocalAssets(page){const failures=[];page.on("response",response=>{const url=new URL(response.url());if((url.hostname==="127.0.0.1"||url.hostname.endsWith("vercel.app"))&&response.status()>=400)failures.push(`${response.status()} ${url.pathname}`)});return failures}

async function assertBrandChrome(page){
 await expect(page.locator(".prd2-header")).toBeVisible();
 await expect(page.locator(".s6-footer")).toBeVisible();
 const chrome=await page.evaluate(()=>{
  const logo=document.querySelector(".prd2-brand img");
  const footerLink=document.querySelector(".s6-footer a");
  const body=getComputedStyle(document.body);
  const link=footerLink?getComputedStyle(footerLink):null;
  return {logoLoaded:logo instanceof HTMLImageElement&&logo.complete&&logo.naturalWidth>100,logoSrc:logo instanceof HTMLImageElement?logo.currentSrc:"",bodyFont:body.fontFamily,footerColor:link?.color??"",footerDecoration:link?.textDecorationLine??"",scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth};
 });
 expect(chrome.logoLoaded).toBeTruthy();
 expect(chrome.logoSrc).toContain("/brand/logo-rinon-horizontal-transparent.png");
 expect(chrome.logoSrc).not.toContain("/_next/image");
 expect(chrome.bodyFont.toLowerCase()).toContain("raleway");
 expect(chrome.footerColor).not.toBe("rgb(0, 0, 238)");
 expect(chrome.scrollWidth).toBeLessThanOrEqual(chrome.innerWidth+2);
}

async function assertNoUpscaledImage(page,selector){
 const image=page.locator(selector).first();await expect(image).toBeVisible();
 const metrics=await image.evaluate((node)=>{const box=node.getBoundingClientRect();return{complete:node.complete,naturalWidth:node.naturalWidth,naturalHeight:node.naturalHeight,renderedWidth:box.width,renderedHeight:box.height,src:node.currentSrc}});
 expect(metrics.complete).toBeTruthy();expect(metrics.naturalWidth).toBeGreaterThan(0);expect(metrics.naturalHeight).toBeGreaterThan(0);expect(metrics.naturalWidth).toBeGreaterThanOrEqual(Math.floor(metrics.renderedWidth));
}

test("home renders RC7 brand, navigation and quality-gated structure visual",async({page})=>{
 const failures=await assertNoFailedLocalAssets(page);await page.goto("/",{waitUntil:"networkidle"});
 await expect(page.locator("main.s7-home")).toBeVisible();await expect(page.locator(".s7-hero h1")).toContainText("Lo necesitas");await assertBrandChrome(page);
 const rendered=await page.evaluate(()=>{const h1=document.querySelector(".s7-hero h1"),hero=document.querySelector(".s7-hero"),image=document.querySelector(".s7-hero-image img");if(!h1||!hero||!image)return null;return{styleSheetCount:document.styleSheets.length,h1FontSize:parseFloat(getComputedStyle(h1).fontSize),heroHeight:hero.getBoundingClientRect().height,headerHeight:document.querySelector(".prd2-header")?.getBoundingClientRect().height??0,imageLoaded:image instanceof HTMLImageElement&&image.complete&&image.naturalWidth>200}});
 expect(rendered).not.toBeNull();expect(rendered.styleSheetCount).toBeGreaterThanOrEqual(2);expect(rendered.h1FontSize).toBeGreaterThan(45);expect(rendered.heroHeight).toBeGreaterThan(550);expect(rendered.headerHeight).toBeGreaterThan(55);expect(rendered.imageLoaded).toBeTruthy();
 await assertNoUpscaledImage(page,".s7-chapter-graphite .evidence-photo img");
 const productsButton=page.getByRole("button",{name:/Productos/});await productsButton.click();await expect(page.locator("#mega-products")).toBeVisible();await expect(page.getByRole("link",{name:/Camas balinesas/}).first()).toBeVisible();await expect(page.getByText("Cierres y accesos")).toBeVisible();
 await page.keyboard.press("Escape");await expect(page.locator("#mega-products")).toBeHidden();await expect(productsButton).toBeFocused();
 await expect(page.getByRole("link",{name:"Proyectos a medida"}).first()).toBeVisible();
 const servicesButton=page.getByRole("button",{name:/Servicios/});await servicesButton.click();await expect(page.locator("#mega-services")).toBeVisible();await expect(page.getByRole("link",{name:/Pintura electrostática/}).first()).toBeVisible();await expect(page.locator("#mega-services")).not.toContainText("Fabricación a medida");
 expect(failures).toEqual([]);
});

test("critical commercial pages including expanded catalog render with CSS",async({page})=>{
 for(const route of ["/soluciones","/camarotes","/camarote-nido","/camas-metalicas","/camas-balinesas","/mesas-metalicas","/escritorios-metalicos","/estructuras-metalicas","/cierres-perimetrales","/mallas-3d","/mallas-separadoras","/mobiliario-institucional","/fabricacion-metalica","/soldadura-mig","/corte-metalico","/pintura-electrostatica","/instalacion","/reparaciones-metalicas","/recursos/como-cotizar-rejas-metalicas","/cotizar"]){
  const response=await page.goto(route,{waitUntil:"networkidle"});expect(response?.status()).toBe(200);await assertBrandChrome(page);const state=await page.evaluate(()=>({sheets:document.styleSheets.length,font:getComputedStyle(document.body).fontFamily,text:document.body.innerText.slice(0,3000)}));expect(state.sheets).toBeGreaterThanOrEqual(2);expect(state.font.toLowerCase()).toContain("raleway");expect(state.text).not.toMatch(/Ã.|Â.|â€|�/u);
 }
});

test("projects-to-measure keeps SEO route but uses human-first UX",async({page})=>{await page.goto("/fabricacion-metalica",{waitUntil:"networkidle"});await expect(page.getByRole("heading",{name:/Tu proyecto en metal, hecho a medida/})).toBeVisible();await expect(page.getByText("PROYECTOS A MEDIDA · SAN BERNARDO")).toBeVisible();await expect(page.getByRole("link",{name:"Cotizar proyecto"}).first()).toHaveAttribute("href",/category=fabricacion/)});

test("quote experience is a real three-step progressive wizard",async({page})=>{
 await page.goto("/cotizar?category=fabricacion&detail=soldadura-mig",{waitUntil:"networkidle"});
 await expect(page.getByRole("heading",{name:"Cuéntanos qué necesitas fabricar."})).toBeVisible();
 await expect(page.locator('[data-quote-step="1"]')).toBeVisible();await expect(page.locator('[data-quote-step="2"]')).toBeHidden();await expect(page.locator('[data-quote-step="1"]').getByText("Soldadura MIG")).toBeVisible();
 await page.getByRole("button",{name:/Continuar/}).click();await expect(page.locator('[data-quote-step="2"]')).toBeVisible();await expect(page.locator('[data-quote-step="1"]')).toBeHidden();
 await page.getByLabel("Ubicación *").fill("San Bernardo");await page.getByLabel("Cuéntanos qué necesitas resolver *").fill("Necesito fabricar y soldar una estructura metálica según medidas aproximadas.");await page.getByRole("button",{name:/Continuar/}).click();
 await expect(page.locator('[data-quote-step="3"]')).toBeVisible();await page.getByLabel("Nombre *").fill("QA RINON");await page.getByLabel("Tipo de cliente *").selectOption("Particular");await page.getByLabel("WhatsApp *").fill("+56911111111");await page.getByLabel(/Acepto que RINON use estos datos/).check();await page.getByRole("button",{name:"Solicitar cotización"}).click();
 await expect(page.locator(".quote-status")).toContainText("Formulario revisado correctamente");
});

test("mobile navigation is task-led, reachable and responsive without overflow",async({page})=>{
 for(const width of [320,375,430,768,1024]){await page.setViewportSize({width,height:900});await page.goto("/",{waitUntil:"networkidle"});const state=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth}));expect(state.scrollWidth).toBeLessThanOrEqual(state.innerWidth+2);const toggle=page.locator(".mobile-nav-toggle");await expect(toggle).toBeVisible();await toggle.click();const panel=page.locator("#mobile-navigation");await expect(panel).toBeVisible();await expect(panel.getByRole("link",{name:/Proyectos a medida/})).toBeVisible();await expect(panel.getByRole("link",{name:/Empresas/})).toBeVisible();await expect(panel.getByRole("link",{name:/Nosotros/})).toBeVisible();const actions=page.locator(".mobile-nav-actions");await expect(actions).toBeVisible();await expect(panel.getByRole("link",{name:/Cotizar/})).toBeVisible();const navCss=await page.evaluate(()=>({top:getComputedStyle(document.querySelector(".mobile-nav-top")).position,actions:getComputedStyle(document.querySelector(".mobile-nav-actions")).position}));expect(navCss.top).toBe("sticky");expect(navCss.actions).toBe("sticky");await panel.evaluate(node=>{node.scrollTop=node.scrollHeight});await expect(actions).toBeVisible();await page.locator(".mobile-nav-close").click();await expect(toggle).toBeFocused()}
});

test("quote wizard has no horizontal overflow on compact breakpoints",async({page})=>{for(const width of [320,360,375,390,430,768]){await page.setViewportSize({width,height:900});await page.goto("/cotizar?category=estructuras",{waitUntil:"networkidle"});const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth,progressVisible:!!document.querySelector(".quote-progress"),activeStep:document.querySelector('.quote-progress [aria-current="step"]')?.textContent??""}));expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth+2);expect(metrics.progressVisible).toBeTruthy();expect(metrics.activeStep).toContain("Qué necesitas")}});

test("desktop does not duplicate the conversion dock",async({page})=>{await page.setViewportSize({width:1440,height:1000});await page.goto("/empresas",{waitUntil:"networkidle"});await expect(page.locator(".prd2-header-cta")).toBeVisible();await expect(page.locator(".commercial-dock")).toBeHidden()});

test("about and contact include usable location actions",async({page})=>{
 for(const route of ["/nosotros","/contacto"]){await page.goto(route,{waitUntil:"domcontentloaded"});await assertBrandChrome(page);await expect(page.locator(".rinon-map-panel iframe")).toHaveAttribute("src",/google\.com\/maps/);await expect(page.getByRole("link",{name:/Google Maps/})).toHaveAttribute("href",/google\.com\/maps\/dir/);await expect(page.getByRole("link",{name:/Waze/})).toHaveAttribute("href",/waze\.com/)}
});

test("approved legacy blog URL stays non-redirecting in safe preview",async({page})=>{const response=await page.goto("/blog/como-cotizar-rejas-metalicas",{waitUntil:"networkidle"});expect(response?.status()).toBe(200);await expect(page.getByRole("heading",{name:"Esta guía ya tiene una versión actualizada."})).toBeVisible();await expect(page.getByRole("link",{name:"Ver guía actualizada"})).toHaveAttribute("href","/recursos/como-cotizar-rejas-metalicas")});

test("unknown root-level routes still return the real 404",async({page})=>{const response=await page.goto("/__rinon_browser_missing_route__",{waitUntil:"networkidle"});expect(response?.status()).toBe(404);await expect(page.getByText("No encontramos esta página.")).toBeVisible()});
