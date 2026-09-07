import { test, expect } from "@playwright/test";
import { COPY } from "./fixtures/copy.mjs";

test("camarotes hub links preserved organic product variants", async ({ page }) => {
  await page.goto("/camarotes", { waitUntil: "domcontentloaded" });
  const section = page.locator("section", { has: page.getByRole("heading", { name: COPY.internalLinks.camarotesHeading }) });
  await expect(section).toBeVisible();
  for (const [href, label] of COPY.internalLinks.camarotesPreservedLinks) {
    const link = section.getByRole("link", { name: new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) });
    await expect(link).toHaveAttribute("href", href);
  }
});

test("metal beds page links preserved bed variants", async ({ page }) => {
  await page.goto("/camas-metalicas", { waitUntil: "domcontentloaded" });
  const section = page.locator("section", { has: page.getByRole("heading", { name: COPY.internalLinks.camasMetalicasHeading }) });
  await expect(section).toBeVisible();
  for (const [href, label] of COPY.internalLinks.metalBedsPreservedLinks) {
    const link = section.getByRole("link", { name: new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) });
    await expect(link).toHaveAttribute("href", href);
  }
});

test("enterprise page links preserved institutional product routes", async ({ page }) => {
  await page.goto("/empresas", { waitUntil: "domcontentloaded" });
  const section = page.locator("section", { has: page.getByRole("heading", { name: COPY.internalLinks.empresasHeading }) });
  await expect(section).toBeVisible();
  for (const [href, label] of COPY.internalLinks.b2bPreservedLinks) {
    const link = section.getByRole("link", { name: new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) });
    await expect(link).toHaveAttribute("href", href);
  }
});
