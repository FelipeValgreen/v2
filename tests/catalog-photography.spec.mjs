import { test, expect } from "@playwright/test";
import { gotoReady, route } from "./fixtures/routes.mjs";

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
  const figure = page.locator('.evidence-photo[data-visual-provenance="user-drive-reference"]').first();
  await expect(figure).toBeVisible();
  await expect(figure.locator("figcaption")).toContainText("REFERENCIA DE PRODUCTO · ARCHIVO");
  await expect(figure.locator("figcaption")).toContainText("No se atribuye a cliente, obra ni instalación específica.");

  const image = figure.locator("img");
  await expect(image).toHaveJSProperty("complete", true);
  await expect(image).not.toHaveJSProperty("naturalWidth", 0);

  const metrics = await figure.evaluate((node) => {
    const img = node.querySelector("img");
    return { natural: img.naturalWidth, rendered: node.getBoundingClientRect().width, src: img.currentSrc };
  });
  expect(metrics.natural).toBeGreaterThanOrEqual(1800);
  expect(metrics.rendered, "/camas-balinesas upscale").toBeLessThanOrEqual(metrics.natural + 2);
  expect(metrics.src).toContain("/visuals/archive/cama-balinesa-product-reference.webp");

  const text = await page.locator("main").innerText();
  expect(text.toLowerCase()).not.toContain("evidencia rinon verificada");
  expect(text.toLowerCase()).not.toContain("obra ejecutada");
});
