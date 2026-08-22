import {test,expect} from "@playwright/test";

const routes=["/contacto","/nosotros"];

for(const route of routes){
 test(`${route} exposes one auditable workshop location`,async({page})=>{
  const response=await page.goto(route,{waitUntil:"networkidle"});
  expect(response?.status()).toBe(200);
  await expect(page.locator('#ubicacion')).toHaveCount(1);
  await expect(page.locator('#ubicacion-title')).toHaveCount(1);
  const location=page.locator('#ubicacion');
  await expect(location.locator('iframe[title="Ubicación de RINON en San Bernardo"]')).toHaveCount(1);
  const iframeSrc=await location.locator('iframe').getAttribute('src');
  expect(iframeSrc).toContain('google.com/maps');
  expect(decodeURIComponent(iframeSrc??'')).toContain('Portezuelo 1506');
  expect(decodeURIComponent(iframeSrc??'')).toContain('San Bernardo');

  const maps=location.locator('a[data-event="maps_click"]');
  const waze=location.locator('a[data-event="waze_click"]');
  await expect(maps).toHaveCount(1);
  await expect(waze).toHaveCount(1);
  expect(await maps.getAttribute('href')).toContain('google.com/maps/dir/');
  expect(await waze.getAttribute('href')).toContain('waze.com/ul');
  expect(decodeURIComponent((await maps.getAttribute('href'))??'')).toContain('Portezuelo 1506');
  expect(decodeURIComponent((await waze.getAttribute('href'))??'')).toContain('Portezuelo 1506');
  await expect(maps).toHaveAttribute('data-cta-location','location');
  await expect(waze).toHaveAttribute('data-cta-location','location');
 });
}

test("contacto keeps quote, WhatsApp and phone paths measurable",async({page})=>{
 await page.goto('/contacto',{waitUntil:'networkidle'});
 const main=page.locator('main[data-sgeo-owner="contacto"]');
 await expect(main).toHaveCount(1);
 expect(await main.locator('a[href^="/cotizar"][data-event="quote_start"]').count()).toBeGreaterThanOrEqual(3);
 expect(await main.locator('a[href*="wa.me/"][data-event="contact_whatsapp"]').count()).toBeGreaterThanOrEqual(2);
 expect(await main.locator('a[href^="tel:"][data-event="contact_phone"]').count()).toBeGreaterThanOrEqual(1);
});

test("nosotros keeps local trust and dual conversion paths",async({page})=>{
 await page.goto('/nosotros',{waitUntil:'networkidle'});
 const main=page.locator('main[data-sgeo-owner="nosotros"]');
 await expect(main).toHaveCount(1);
 await expect(main.locator('h1')).toHaveText(/Fabricamos en San Bernardo/i);
 expect(await main.locator('a[href^="/cotizar"][data-event="quote_start"]').count()).toBeGreaterThanOrEqual(2);
 expect(await main.locator('a[href*="wa.me/"][data-event="whatsapp_click"]').count()).toBeGreaterThanOrEqual(2);
});

test("local trust pages do not overflow at mobile width",async({page})=>{
 await page.setViewportSize({width:390,height:900});
 for(const route of routes){
  await page.goto(route,{waitUntil:'networkidle'});
  const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth}));
  expect(metrics.scrollWidth,`${route} mobile overflow`).toBeLessThanOrEqual(metrics.innerWidth+2);
  await expect(page.locator('#ubicacion')).toBeVisible();
 }
});
