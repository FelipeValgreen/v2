import { test, expect } from "@playwright/test";
import { gotoReady, route } from "./fixtures/routes.mjs";

test("desktop exposes a floating WhatsApp entry without duplicating the dock", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await gotoReady(page, route("/"));
  const float = page.locator(".whatsapp-float");
  await expect(float).toBeVisible();
  await expect(float).toHaveAttribute("href", /wa\.me\/\d{10,}/);
  await expect(float).toHaveAttribute("target", "_blank");
  await expect(float).toHaveAttribute("rel", /noopener/);
  await expect(float).toHaveAttribute("aria-label", /WhatsApp/);
  await expect(float).toHaveAttribute("data-event", "contact_whatsapp");
  // El dock sigue oculto en escritorio: el botón no lo reintroduce.
  await expect(page.locator(".commercial-dock")).toBeHidden();
  const box = await float.boundingBox();
  expect(box.width).toBeGreaterThanOrEqual(44);
  expect(box.height).toBeGreaterThanOrEqual(44);
});

test("mobile keeps WhatsApp in the dock and hides the floating button", async ({ page }) => {
  for (const width of [390, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await gotoReady(page, route("/camarotes"));
    await expect(page.locator(".whatsapp-float"), `${width}px`).toBeHidden();
    await expect(page.locator('.commercial-dock a[href*="wa.me"]'), `${width}px`).toBeVisible();
  }
});

test("floating WhatsApp stays out of admin and legal pages", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const response = await page.goto("/politica-de-privacidad", { waitUntil: "domcontentloaded" });
  expect(response?.status()).toBe(200);
  await expect(page.locator(".whatsapp-float")).toHaveCount(0);
});
