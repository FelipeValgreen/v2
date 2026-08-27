import {test,expect} from "@playwright/test";

test("desktop navigation exposes the active product and service section",async({page})=>{
 await page.setViewportSize({width:1440,height:1000});
 await page.goto("/estructuras-metalicas",{waitUntil:"domcontentloaded"});
 await expect(page.getByRole("button",{name:/Productos/})).toHaveClass(/is-active/);
 await page.getByRole("button",{name:/Productos/}).click();
 await expect(page.locator('#mega-products a[href="/estructuras-metalicas"]')).toHaveAttribute("aria-current","page");
 await page.goto("/pintura-electrostatica",{waitUntil:"domcontentloaded"});
 await expect(page.getByRole("button",{name:/Servicios/})).toHaveClass(/is-active/);
 await page.getByRole("button",{name:/Servicios/}).click();
 await expect(page.locator('#mega-services a[aria-current="page"]')).toContainText("Pintura electrostática");
});

test("legacy product routes still orient the user toward Productos",async({page})=>{
 await page.setViewportSize({width:1440,height:1000});
 await page.goto("/camarote-nido",{waitUntil:"domcontentloaded"});
 await expect(page.getByRole("button",{name:/Productos/})).toHaveClass(/is-active/);
});

test("mobile navigation marks the current task family without overflow",async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto("/soldadura-mig",{waitUntil:"domcontentloaded"});
 await page.locator(".mobile-nav-toggle").click();
 await expect(page.locator(".mobile-nav-services summary")).toHaveClass(/is-active/);
 const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth}));
 expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth+2);
});

test("footer keeps products concise and services semantically pure",async({page})=>{
 await page.setViewportSize({width:1440,height:1000});
 await page.goto("/",{waitUntil:"domcontentloaded"});
 const footer=page.locator(".s6-footer");
 const products=footer.getByRole("navigation",{name:"Productos"});
 const services=footer.getByRole("navigation",{name:"Servicios"});
 await expect(products.getByRole("link")).toHaveCount(8);
 await expect(services.getByRole("link")).toHaveCount(5);
 await expect(services.getByRole("link",{name:"Proyectos a medida"})).toHaveCount(0);
 await expect(footer.getByRole("link",{name:"Proyectos a medida"})).toBeVisible();
 await expect(footer.getByRole("link",{name:"Malla 3D"})).toBeVisible();
 await expect(footer.getByRole("link",{name:"Estructuras"})).toBeVisible();
 await expect(footer.getByRole("link",{name:"Guías y recursos"})).toBeVisible();
 await expect(footer.getByRole("link",{name:"Blog"})).toBeVisible();
});
