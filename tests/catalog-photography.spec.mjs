import { test, expect } from "@playwright/test";
import { gotoReady, route } from "./fixtures/routes.mjs";
import { COPY } from "./fixtures/copy.mjs";

const CATALOG_ROUTES = [
  { path: "/camarote-con-escritorio", minWidth: 1200 },
  { path: "/camas-metalicas", minWidth: 1280 },
];

test("catalogue photography replaces the fabrication spec where a real product photo exists", async ({ page }) => {
  for (const entry of CATALOG_ROUTES) {
    await gotoReady(page, route(entry.path));
    const figure = page.locator('.evidence-photo[data-visual-provenance="sister-brand-product"]').first();
    await expect(figure, entry.path).toBeVisible();
    await expect(figure.locator("figcaption"), entry.path).toContainText("PRODUCTO DE CATÁLOGO");

    const image = figure.locator("img");
    await expect(image, entry.path).toHaveJSProperty("complete", true);
    await expect(image, entry.path).not.toHaveJSProperty("naturalWidth", 0);

    // No se sirve ampliada por encima de su resolución de origen.
    const metrics = await figure.evaluate((node) => {
      const img = node.querySelector("img");
      return { natural: img.naturalWidth, rendered: node.getBoundingClientRect().width, src: img.currentSrc };
    });
    expect(metrics.natural, entry.path).toBeGreaterThanOrEqual(entry.minWidth);
    expect(metrics.rendered, `${entry.path} upscale`).toBeLessThanOrEqual(metrics.natural + 2);
    expect(metrics.src, entry.path).toContain("/visuals/catalog/");
  }
});

test("catalogue photography never claims a client, project or executed work", async ({ page }) => {
  for (const entry of CATALOG_ROUTES) {
    await gotoReady(page, route(entry.path));
    const text = await page.locator("main").innerText();
    expect(text.toLowerCase(), entry.path).not.toContain("obra ejecutada");
    // La etiqueta es de producto de catálogo, no de evidencia RINON verificada.
    await expect(page.locator("main"), entry.path).not.toContainText("EVIDENCIA RINON VERIFICADA");
  }
});

test("user-supplied product photography replaces the fallback on camas balinesas", async ({ page }) => {
  await gotoReady(page, route("/camas-balinesas"));
  await expect(page.locator("main h1")).toContainText(COPY.commercial.balineseBedTitle);
  const gallery = page.locator(".product-visual-gallery");
  await expect(gallery).toBeVisible();
  const figures = gallery.locator('[data-visual-provenance="user-drive-reference"]');
  await expect(figures).toHaveCount(3);

  const figure = gallery.locator(".product-visual-gallery-main").first();
  await expect(figure.locator("figcaption")).toContainText(COPY.commercial.balineseBedCaption);
  await expect(figure.locator("figcaption")).toContainText(COPY.commercial.balineseBedCaptionNote);
  await expect(figure.locator("figcaption")).not.toContainText("Referencia de producto");
  await expect(figure.locator("figcaption")).not.toContainText("archivo");

  const image = figure.locator("img");
  await expect(image).toHaveJSProperty("complete", true);
  await expect(image).not.toHaveJSProperty("naturalWidth", 0);

  const metrics = await figure.evaluate((node) => {
    const img = node.querySelector("img");
    return { natural: img.naturalWidth, rendered: node.getBoundingClientRect().width, src: img.currentSrc };
  });
  expect(metrics.natural).toBeGreaterThanOrEqual(2200);
  expect(metrics.rendered, "/camas-balinesas upscale").toBeLessThanOrEqual(metrics.natural + 2);
  expect(metrics.src).toContain(COPY.assets.balineseBedHero);

  const text = await page.locator("main").innerText();
  expect(text.toLowerCase()).not.toContain("evidencia rinon verificada");
  expect(text.toLowerCase()).not.toContain("obra ejecutada");
  expect(text.toLowerCase()).not.toContain("fotografía aportada por el dueño");
  expect(text).toContain("Lo que fabricamos y lo que se define aparte.");
  expect(text).toContain("Textiles y colchonería");
  expect(text).toContain("Una foto del celular basta");
  expect(text).not.toContain("Inclúyelo en el requerimiento si ya está definido.");
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(schemas.join("\n")).toContain(COPY.assets.balineseBedHero);
});
