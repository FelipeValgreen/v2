import { test, expect } from "@playwright/test";
import { COPY } from "./fixtures/copy.mjs";
import { criticalCommercialRoutes, gotoReady, route, routes } from "./fixtures/routes.mjs";

async function assertNoFailedLocalAssets(page){const failures=[];page.on("response",response=>{const url=new URL(response.url());if((url.hostname==="127.0.0.1"||url.hostname.endsWith("vercel.app"))&&response.status()>=400)failures.push(`${response.status()} ${url.pathname}`)});return failures}

// OJO: logoLoaded (complete && naturalWidth > 100) NO prueba que el logo se vea bien.
// naturalWidth sale del IHDR, que sobrevive intacto aunque el stream IDAT esté
// incompleto; Chromium pinta las scanlines que alcanzó y reporta 880x168 igual.
// La integridad del asset la valida npm run qa:brand-assets, no esta aserción.
async function assertBrandChrome(page){
 await expect(page.locator(".prd2-header")).toBeVisible();
 await expect(page.locator(".s6-footer")).toBeVisible();
 const logo=page.locator(".prd2-brand img").first();
 await expect(logo).toBeVisible();
 await expect(logo).toHaveJSProperty("complete",true);
 await expect(logo).not.toHaveJSProperty("naturalWidth",0);
 const chrome=await page.evaluate(()=>{
  const logo=document.querySelector(".prd2-brand img");
  const footerLink=document.querySelector(".s6-footer a");
  const body=getComputedStyle(document.body);
  const link=footerLink?getComputedStyle(footerLink):null;
  return {logoLoaded:logo instanceof HTMLImageElement&&logo.complete&&logo.naturalWidth>100,logoSrc:logo instanceof HTMLImageElement?logo.currentSrc:"",bodyFont:body.fontFamily,footerColor:link?.color??"",footerDecoration:link?.textDecorationLine??"",scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth};
 });
 expect(chrome.logoLoaded).toBeTruthy();
 expect(chrome.logoSrc).toContain(COPY.assets.brandLogo);
 expect(chrome.logoSrc).not.toContain("/_next/image");
 expect(chrome.bodyFont.toLowerCase()).toContain("raleway");
 expect(chrome.footerColor).not.toBe("rgb(0, 0, 238)");
 expect(chrome.scrollWidth).toBeLessThanOrEqual(chrome.innerWidth+2);
}

async function assertNoUpscaledImage(page,selector){
 const image=page.locator(selector).first();await expect(image).toBeVisible();
 await expect(image).toHaveJSProperty("complete",true);
 await expect(image).not.toHaveJSProperty("naturalWidth",0);
 const metrics=await image.evaluate((node)=>{const box=node.getBoundingClientRect();return{complete:node.complete,naturalWidth:node.naturalWidth,naturalHeight:node.naturalHeight,renderedWidth:box.width,renderedHeight:box.height,src:node.currentSrc}});
 expect(metrics.complete).toBeTruthy();expect(metrics.naturalWidth).toBeGreaterThan(0);expect(metrics.naturalHeight).toBeGreaterThan(0);expect(metrics.naturalWidth).toBeGreaterThanOrEqual(Math.floor(metrics.renderedWidth));
}

test("home renders RC7 brand, navigation and quality-gated structure visual",async({page})=>{
 const failures=await assertNoFailedLocalAssets(page);await gotoReady(page,route("/"));
 await expect(page.locator("main.s7-home")).toBeVisible();await expect(page.locator(".s7-hero h1")).toContainText(COPY.home.heroClaim);await assertBrandChrome(page);
 await expect(page.locator(".s7-hero-image img")).toHaveJSProperty("complete",true);
 await expect(page.locator(".s7-hero-image img")).not.toHaveJSProperty("naturalWidth",0);
 const rendered=await page.evaluate(()=>{const h1=document.querySelector(".s7-hero h1"),hero=document.querySelector(".s7-hero"),image=document.querySelector(".s7-hero-image img");if(!h1||!hero||!image)return null;return{styleSheetCount:document.styleSheets.length,h1FontSize:parseFloat(getComputedStyle(h1).fontSize),heroHeight:hero.getBoundingClientRect().height,headerHeight:document.querySelector(".prd2-header")?.getBoundingClientRect().height??0,imageLoaded:image instanceof HTMLImageElement&&image.complete&&image.naturalWidth>200}});
 expect(rendered).not.toBeNull();expect(rendered.styleSheetCount).toBeGreaterThanOrEqual(2);expect(rendered.h1FontSize).toBeGreaterThan(45);expect(rendered.heroHeight).toBeGreaterThan(550);expect(rendered.headerHeight).toBeGreaterThan(55);expect(rendered.imageLoaded).toBeTruthy();
 await assertNoUpscaledImage(page,".s7-chapter-graphite .evidence-photo img");
 const productsButton=page.getByRole("button",{name:/Productos/});await productsButton.click();await expect(page.locator("#mega-products")).toBeVisible();await expect(page.getByRole("link",{name:/Camas balinesas/}).first()).toBeVisible();await expect(page.getByText(COPY.home.productsSection)).toBeVisible();
 await page.keyboard.press("Escape");await expect(page.locator("#mega-products")).toBeHidden();await expect(productsButton).toBeFocused();
 await expect(page.getByRole("link",{name:COPY.home.projectLink}).first()).toBeVisible();
 const servicesButton=page.getByRole("button",{name:/Servicios/});await servicesButton.click();await expect(page.locator("#mega-services")).toBeVisible();await expect(page.getByRole("link",{name:COPY.home.serviceLink}).first()).toBeVisible();await expect(page.locator("#mega-services")).not.toContainText("Fabricación a medida");
 expect(failures).toEqual([]);
});

test("critical commercial pages including expanded catalog render with CSS",async({page})=>{
 for(const routeEntry of criticalCommercialRoutes){
  const response=await gotoReady(page,routeEntry);expect(response?.status()).toBe(200);await assertBrandChrome(page);const state=await page.evaluate(()=>({sheets:document.styleSheets.length,font:getComputedStyle(document.body).fontFamily,text:document.body.innerText.slice(0,3000)}));expect(state.sheets).toBeGreaterThanOrEqual(2);expect(state.font.toLowerCase()).toContain("raleway");expect(state.text).not.toMatch(/Ã.|Â.|â€|�/u);
 }
});

test("projects-to-measure keeps SEO route but uses human-first UX",async({page})=>{await gotoReady(page,route("/fabricacion-metalica"));await expect(page.getByRole("heading",{name:COPY.projects.fabricationHeading})).toBeVisible();await expect(page.getByText(COPY.projects.fabricationEyebrow)).toBeVisible();await expect(page.getByRole("link",{name:COPY.projects.quoteProject}).first()).toHaveAttribute("href",/category=fabricacion/)});

test("quote experience is a real three-step progressive wizard",async({page})=>{
 await page.goto("/cotizar?category=fabricacion&detail=soldadura-mig",{waitUntil:"domcontentloaded"});
 await expect(page.getByRole("heading",{name:COPY.quote.firstHeading})).toBeVisible();
 await expect(page.locator('[data-quote-step="1"]')).toBeVisible();await expect(page.locator('[data-quote-step="2"]')).toBeHidden();await expect(page.locator('[data-quote-step="1"]').getByText(COPY.quote.detailSoldaduraMig)).toBeVisible();
 await page.getByRole("button",{name:/Continuar/}).click();await expect(page.locator('[data-quote-step="2"]')).toBeVisible();await expect(page.locator('[data-quote-step="1"]')).toBeHidden();
 await page.getByLabel("Ubicación *").fill("San Bernardo");await page.getByLabel("Cuéntanos qué necesitas resolver *").fill("Necesito fabricar y soldar una estructura metálica según medidas aproximadas.");await page.getByRole("button",{name:/Continuar/}).click();
 await expect(page.locator('[data-quote-step="3"]')).toBeVisible();await page.getByLabel("Nombre *").fill("QA RINON");await page.getByLabel("Tipo de cliente *").selectOption("Particular");await page.getByLabel("WhatsApp *").fill("+56911111111");await page.getByLabel(/Acepto que RINON use estos datos/).check();await page.getByRole("button",{name:"Solicitar cotización"}).click();
 await expect(page.locator(".quote-status")).toContainText(COPY.quote.submitted);
});

test("mobile navigation is task-led, reachable and responsive without overflow",async({page})=>{
 for(const width of [320,375,430,768,1024]){await page.setViewportSize({width,height:900});await gotoReady(page,route("/"));const state=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth}));expect(state.scrollWidth).toBeLessThanOrEqual(state.innerWidth+2);const toggle=page.locator(".mobile-nav-toggle");await expect(toggle).toBeVisible();await toggle.click();const panel=page.locator("#mobile-navigation");await expect(panel).toBeVisible();await expect(panel.getByRole("link",{name:/Proyectos a medida/})).toBeVisible();await expect(panel.getByRole("link",{name:/Empresas/})).toBeVisible();await expect(panel.getByRole("link",{name:/Nosotros/})).toBeVisible();const actions=page.locator(".mobile-nav-actions");await expect(actions).toBeVisible();await expect(panel.getByRole("link",{name:/Cotizar/})).toBeVisible();const navCss=await page.evaluate(()=>({top:getComputedStyle(document.querySelector(".mobile-nav-top")).position,actions:getComputedStyle(document.querySelector(".mobile-nav-actions")).position}));expect(navCss.top).toBe("sticky");expect(navCss.actions).toBe("sticky");await panel.evaluate(node=>{node.scrollTop=node.scrollHeight});await expect(actions).toBeVisible();await page.locator(".mobile-nav-close").click();await expect(toggle).toBeFocused()}
});

test("quote wizard has no horizontal overflow on compact breakpoints",async({page})=>{for(const width of [320,360,375,390,430,768]){await page.setViewportSize({width,height:900});await page.goto("/cotizar?category=estructuras",{waitUntil:"domcontentloaded"});await expect(page.locator(".quote-progress")).toBeVisible();await expect(page.locator('.quote-progress [aria-current="step"]')).toContainText(COPY.quote.firstStep);const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth,progressVisible:!!document.querySelector(".quote-progress"),activeStep:document.querySelector('.quote-progress [aria-current="step"]')?.textContent??""}));expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth+2);expect(metrics.progressVisible).toBeTruthy();expect(metrics.activeStep).toContain(COPY.quote.firstStep)}});

test("desktop does not duplicate the conversion dock",async({page})=>{await page.setViewportSize({width:1440,height:1000});await gotoReady(page,route("/empresas"));await expect(page.locator(".prd2-header-cta")).toBeVisible();await expect(page.locator(".commercial-dock")).toBeHidden()});

test("about and contact include usable location actions",async({page})=>{
 for(const routeEntry of routes(["/nosotros","/contacto"])){await gotoReady(page,routeEntry);await assertBrandChrome(page);await expect(page.locator(".rinon-map-panel iframe")).toHaveAttribute("src",COPY.location.mapsProvider);await expect(page.getByRole("link",{name:/Google Maps/})).toHaveAttribute("href",COPY.location.mapsDirections);await expect(page.getByRole("link",{name:/Waze/})).toHaveAttribute("href",COPY.location.waze)}
});

test("approved legacy blog URL stays non-redirecting in safe preview",async({page})=>{const response=await page.goto("/blog/como-cotizar-rejas-metalicas",{waitUntil:"domcontentloaded"});expect(response?.status()).toBe(200);await expect(page.getByRole("heading",{name:COPY.migration.updatedGuideHeading})).toBeVisible();await expect(page.getByRole("link",{name:COPY.migration.updatedGuideLink})).toHaveAttribute("href","/recursos/como-cotizar-rejas-metalicas")});

test("unknown root-level routes still return the real 404",async({page})=>{const response=await page.goto("/__rinon_browser_missing_route__",{waitUntil:"domcontentloaded"});expect(response?.status()).toBe(404);await expect(page.getByText(COPY.notFound)).toBeVisible()});
