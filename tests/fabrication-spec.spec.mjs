import { test, expect } from "@playwright/test";
import { gotoReady, route } from "./fixtures/routes.mjs";

const EXPECTED_ITEMS = ["Cobertizos", "Pérgolas", "Escaleras", "Plataformas", "Soportes", "Bajo plano"];

test("home structures chapter states what RINON fabricates instead of a generic visual", async ({ page }) => {
  await gotoReady(page, route("/"));
  const panel = page.locator(".s7-chapter-graphite .fabrication-spec");
  await expect(panel).toBeVisible();
  await expect(panel).toHaveAttribute("data-visual-kind", "fabrication-spec");
  await expect(panel.locator(".fabrication-spec-head span")).toContainText("LO QUE FABRICAMOS EN ESTRUCTURAS");

  const items = panel.locator(".fabrication-spec-grid li");
  await expect(items).toHaveCount(EXPECTED_ITEMS.length);
  for (const name of EXPECTED_ITEMS) {
    await expect(panel.locator(".fabrication-spec-grid b", { hasText: name }).first()).toBeVisible();
  }

  // El alcance queda acotado: fabricar no es desarrollar ingeniería.
  await expect(panel.locator(".fabrication-spec-foot")).toContainText("no equivale a desarrollar su ingeniería");
});

test("structures evidence never falls back to an image that does not show a structure", async ({ page }) => {
  for (const routeEntry of [route("/"), route("/estructuras-metalicas")]) {
    await gotoReady(page, routeEntry);
    // El render de interiorismo no puede volver a ocupar el slot de estructuras.
    expect(await page.locator('img[src*="structures-residential-reference"]').count(), routeEntry.path).toBe(0);
    await expect(page.locator(".fabrication-spec").first(), routeEntry.path).toBeVisible();
  }
});

test("fabrication spec stays readable and contained on compact breakpoints", async ({ page }) => {
  for (const width of [320, 375, 390, 430, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await gotoReady(page, route("/estructuras-metalicas"));
    const panel = page.locator(".fabrication-spec").first();
    await expect(panel, `${width}px`).toBeVisible();
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(metrics.scrollWidth, `${width}px overflow`).toBeLessThanOrEqual(metrics.innerWidth + 2);
  }
});
