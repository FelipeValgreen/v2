import { expect } from "@playwright/test";

const ready = "main h1";

export const ROUTES = [
  { path: "/", ready: "main h1" },
  { path: "/soluciones", ready },
  { path: "/camarotes", ready },
  { path: "/camarote-nido", ready },
  { path: "/camarote-triple", ready },
  { path: "/camarote-doble", ready },
  { path: "/cama-alta", ready },
  { path: "/camarote-titanic", ready },
  { path: "/camarote-1-5-plazas", ready },
  { path: "/camarote-desmontable", ready },
  { path: "/cama-dos-plazas-con-cajon", ready },
  { path: "/camarote-2-plazas", ready },
  { path: "/cama-institucional-metalica", ready },
  { path: "/cama-loft-metalica", ready },
  { path: "/cama-loft-con-escritorio", ready },
  { path: "/camas-metalicas", ready },
  { path: "/camas-balinesas", ready },
  { path: "/mesas-metalicas", ready },
  { path: "/escritorios-metalicos", ready },
  { path: "/cierres-perimetrales", ready },
  { path: "/rejas-metalicas", ready },
  { path: "/portones-metalicos", ready },
  { path: "/mallas-3d", ready },
  { path: "/mallas-separadoras", ready },
  { path: "/estructuras-metalicas", ready },
  { path: "/fabricacion-metalica", ready },
  { path: "/mobiliario-institucional", ready },
  { path: "/soldadura-mig", ready },
  { path: "/corte-metalico", ready },
  { path: "/pintura-electrostatica", ready },
  { path: "/instalacion", ready },
  { path: "/reparaciones-metalicas", ready },
  { path: "/empresas", ready },
  { path: "/proyectos", ready },
  { path: "/nosotros", ready },
  { path: "/contacto", ready },
  { path: "/cotizar", ready },
  { path: "/recursos", ready },
  { path: "/recursos/como-cotizar-rejas-metalicas", ready },
  { path: "/blog/como-cotizar-rejas-metalicas", ready },
];

export const route = (path) => {
  const entry = ROUTES.find((candidate) => candidate.path === path);
  if (!entry) throw new Error(`Missing route fixture for ${path}`);
  return entry;
};

export const routes = (paths) => paths.map(route);

export const perimeterMoneyRoutes = routes([
  "/rejas-metalicas",
  "/portones-metalicos",
  "/mallas-3d",
  "/mallas-separadoras",
]);

export const commercialHeroRoutes = routes([
  "/soluciones",
  "/camarotes",
  "/camarote-nido",
  "/camas-metalicas",
  "/camas-balinesas",
  "/mesas-metalicas",
  "/escritorios-metalicos",
  "/cierres-perimetrales",
  "/rejas-metalicas",
  "/portones-metalicos",
  "/mallas-3d",
  "/mallas-separadoras",
  "/estructuras-metalicas",
  "/fabricacion-metalica",
  "/mobiliario-institucional",
  "/soldadura-mig",
  "/corte-metalico",
  "/pintura-electrostatica",
  "/instalacion",
  "/reparaciones-metalicas",
  "/empresas",
  "/proyectos",
  "/contacto",
  "/cotizar",
]);

export const preservedCommercialRoutes = routes([
  "/camarote-nido",
  "/camarote-triple",
  "/camarote-doble",
  "/cama-alta",
  "/camarote-titanic",
  "/camarote-1-5-plazas",
  "/camarote-desmontable",
  "/cama-dos-plazas-con-cajon",
  "/camarote-2-plazas",
  "/cama-institucional-metalica",
  "/cama-loft-metalica",
  "/cama-loft-con-escritorio",
  "/mobiliario-institucional",
]);

export const criticalCommercialRoutes = routes([
  "/soluciones",
  "/camarotes",
  "/camarote-nido",
  "/camas-metalicas",
  "/camas-balinesas",
  "/mesas-metalicas",
  "/escritorios-metalicos",
  "/estructuras-metalicas",
  "/cierres-perimetrales",
  "/mallas-3d",
  "/mallas-separadoras",
  "/mobiliario-institucional",
  "/fabricacion-metalica",
  "/soldadura-mig",
  "/corte-metalico",
  "/pintura-electrostatica",
  "/instalacion",
  "/reparaciones-metalicas",
  "/recursos/como-cotizar-rejas-metalicas",
  "/cotizar",
]);

export async function gotoReady(page, routeEntry, options = {}) {
  const response = await page.goto(routeEntry.path, {
    waitUntil: "domcontentloaded",
    ...options,
  });
  await expect(page.locator(routeEntry.ready), routeEntry.path).toBeVisible();
  return response;
}
