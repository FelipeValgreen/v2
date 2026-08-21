import {test,expect} from "@playwright/test";

test("quote wizard owns validation instead of hidden future fields",async({page})=>{
 await page.goto("/cotizar",{waitUntil:"networkidle"});
 await page.getByRole("button",{name:/Continuar/}).click();
 await expect(page.locator('[data-quote-step="1"]')).toBeVisible();
 await expect(page.locator(".quote-status")).toContainText("Completa los campos obligatorios");
 await expect(page.locator('[data-quote-step="2"]')).toBeHidden();
});

test("pressing Enter can advance a prequalified first step",async({page})=>{
 await page.goto("/cotizar?category=fabricacion",{waitUntil:"networkidle"});
 await expect(page.locator('[data-quote-step="1"]')).toBeVisible();
 const useField=page.getByLabel("Uso");
 await useField.fill("Soporte metálico");
 await useField.press("Enter");
 await expect(page.locator('[data-quote-step="2"]')).toBeVisible();
 await expect(page.locator('[data-quote-step="1"]')).toBeHidden();
});
