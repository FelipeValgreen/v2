import { test, expect } from "@playwright/test";

const camarotesPreservedLinks = [
  ["/cama-alta", "Cama alta metálica."],
  ["/camarote-1-5-plazas", "Camarote con cama ampliada."],
  ["/camarote-2-plazas", "Camarote con cama inferior de dos plazas."],
  ["/camarote-desmontable", "Camarote metálico desmontable."],
  ["/camarote-doble", "Camarote con cama inferior ampliada."],
  ["/camarote-nido", "Camarote nido metálico."],
  ["/camarote-titanic", "Camarote Titanic."],
  ["/camarote-triple", "Camarote metálico de tres niveles."],
  ["/cama-loft-metalica", "Cama loft metálica."],
];

const metalBedsPreservedLinks = [
  ["/cama-alta", "Cama alta metálica."],
  ["/cama-dos-plazas-con-cajon", "Cama metálica con cajón inferior."],
  ["/cama-institucional-metalica", "Cama metálica para compras institucionales."],
  ["/cama-loft-con-escritorio", "Cama loft con escritorio."],
  ["/cama-loft-metalica", "Cama loft metálica."],
];

test("camarotes hub links preserved organic product variants", async ({ page }) => {
  await page.goto("/camarotes", { waitUntil: "domcontentloaded" });
  const section = page.locator("section", { has: page.getByRole("heading", { name: "Páginas específicas de camas y camarotes." }) });
  await expect(section).toBeVisible();
  for (const [href, label] of camarotesPreservedLinks) {
    const link = section.getByRole("link", { name: new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) });
    await expect(link).toHaveAttribute("href", href);
  }
});

test("metal beds page links preserved bed variants", async ({ page }) => {
  await page.goto("/camas-metalicas", { waitUntil: "domcontentloaded" });
  const section = page.locator("section", { has: page.getByRole("heading", { name: "Páginas específicas de camas metálicas." }) });
  await expect(section).toBeVisible();
  for (const [href, label] of metalBedsPreservedLinks) {
    const link = section.getByRole("link", { name: new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) });
    await expect(link).toHaveAttribute("href", href);
  }
});
