import { test, expect } from "@playwright/test";

async function assertNoFailedLocalAssets(page) {
  const failures = [];
  page.on("response", (response) => {
    const url = new URL(response.url());
    if (url.hostname === "127.0.0.1" && response.status() >= 400) {
      failures.push(`${response.status()} ${url.pathname}`);
    }
  });
  return failures;
}

test("home renders the approved visual system, not raw HTML", async ({ page }) => {
  const failures = await assertNoFailedLocalAssets(page);
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.locator("main.s7-home")).toBeVisible();
  await expect(page.locator(".prd2-header")).toBeVisible();
  await expect(page.locator(".s7-hero h1")).toContainText("Lo necesitas");

  const rendered = await page.evaluate(() => {
    const h1 = document.querySelector(".s7-hero h1");
    const hero = document.querySelector(".s7-hero");
    const image = document.querySelector(".s7-hero-image img");
    const header = document.querySelector(".prd2-header");
    if (!h1 || !hero || !image || !header) return null;
    const h1Style = getComputedStyle(h1);
    const heroStyle = getComputedStyle(hero);
    return {
      styleSheetCount: document.styleSheets.length,
      h1FontSize: parseFloat(h1Style.fontSize),
      h1LineHeight: h1Style.lineHeight,
      heroHeight: hero.getBoundingClientRect().height,
      heroPosition: heroStyle.position,
      headerHeight: header.getBoundingClientRect().height,
      imageLoaded: image.complete && image.naturalWidth > 200 && image.naturalHeight > 200,
      bodyFont: getComputedStyle(document.body).fontFamily,
    };
  });

  expect(rendered).not.toBeNull();
  expect(rendered.styleSheetCount).toBeGreaterThanOrEqual(2);
  expect(rendered.h1FontSize).toBeGreaterThan(45);
  expect(rendered.heroHeight).toBeGreaterThan(550);
  expect(rendered.headerHeight).toBeGreaterThan(55);
  expect(rendered.imageLoaded).toBeTruthy();
  expect(rendered.bodyFont.toLowerCase()).toContain("raleway");
  expect(failures).toEqual([]);
});

test("critical commercial pages render with CSS and navigation", async ({ page }) => {
  for (const route of ["/camarotes", "/estructuras-metalicas", "/cierres-perimetrales", "/cotizar"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator(".prd2-header")).toBeVisible();
    const state = await page.evaluate(() => ({
      sheets: document.styleSheets.length,
      width: document.documentElement.scrollWidth,
      font: getComputedStyle(document.body).fontFamily,
      text: document.body.innerText.slice(0, 2000),
    }));
    expect(state.sheets).toBeGreaterThanOrEqual(2);
    expect(state.width).toBeGreaterThan(1000);
    expect(state.font.toLowerCase()).toContain("raleway");
    expect(state.text).not.toMatch(/Ã.|Â.|â€|�/u);
  }
});
