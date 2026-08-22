import {test,expect} from "@playwright/test";

test("desktop navigation exposes the active product and service section",async({page})=>{
 await page.setViewportSize({width:1440,height:1000});
 await page.goto("/estructuras-metalicas",{waitUntil:"networkidle"});
 await expect(page.getByRole("button",{name:/Productos/})).toHaveClass(/is-active/);
 await page.getByRole("button",{name:/Productos/}).click();
 await expect(page.getByRole("link",{name:/Estructuras metálicas/}).first()).toHaveAttribute("aria-current","page");
 await page.goto("/pintura-electrostatica",{waitUntil:"networkidle"});
 await expect(page.getByRole("button",{name:/Servicios/})).toHaveClass(/is-active/);
 await page.getByRole("button",{name:/Servicios/}).click();
 await expect(page.locator('#mega-services a[aria-current="page"]')).toContainText("Pintura electrostática");
});

test("legacy product routes still orient the user toward Productos",async({page})=>{
 await page.setViewportSize({width:1440,height:1000});
 await page.goto("/camarote-nido",{waitUntil:"networkidle"});
 await expect(page.getByRole("button",{name:/Productos/})).toHaveClass(/is-active/);
});

test("mobile navigation marks the current task family without overflow",async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto("/soldadura-mig",{waitUntil:"networkidle"});
 await page.locator(".mobile-nav-toggle").click();
 await expect(page.locator(".mobile-nav-services summary")).toHaveClass(/is-active/);
 const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth}));
 expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth+2);
});

test("footer exposes priority product, service and resource discovery",async({page})=>{
 await page.setViewportSize({width:1440,height:1000});
 await page.goto("/",{waitUntil:"networkidle"});
 const footer=page.locator(".s6-footer");
 await expect(footer.getByRole("link",{name:"Malla 3D"})).toBeVisible();
 await expect(footer.getByRole("link",{name:"Estructuras"})).toBeVisible();
 await expect(footer.getByRole("link",{name:"Guías y recursos"})).toBeVisible();
 await expect(footer.getByRole("link",{name:"Blog"})).toBeVisible();
});
