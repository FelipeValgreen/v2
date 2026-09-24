# Redirects 301 del sitio viejo (rinon.cl → RINON 2.0)

**Estado:** implementado en la rama `claude/preparar-rinon-cl`. Nada de esto toca producción ni DNS.
**Fuente de verdad en código:** `lib/legacy-redirects.ts` (398 pares `{ source, destination, tier }`), emitidos por `redirects()` en `next.config.ts` con `statusCode: 301`.
**Contrato automático:** `npm run qa:redirects` (`scripts/check-legacy-redirects.mjs`), incluido en `qa:static` y en `build`.

## 1. Qué cubre

Lista de partida (Felipe, 2026-09-24): sitemap del sitio viejo cruzado con el sitemap de v2 → 420 URLs viejas, 29 existen igual en v2 (por ejemplo `/camarote-titanic`, `/mallas-3d`, `/blog`, `/contacto`) y **391 necesitan redirect**.

- Las 391 están en el mapa. Además hay **7 rutas extra** que salieron del inventario de rutas del repositorio viejo (`enrique636/rinon`) y que el sitemap viejo nunca publicó; se conservan para que tampoco den 404: `/cama-alta-con-escritorio`, `/cama-alta-2-plazas-con-escritorio`, `/camarote-con-escritorio-a-medida`, `/camarote-con-escritorio-metalico`, `/camarote-con-escritorio-premium`, `/camarotes-con-escritorio`, `/camarotes-temporeros`.
- Total: **398 redirects**, 340 en tier `family` y 58 en tier `gsc-pending` (las URLs en cuarentena de Search Console de `docs/GSC_PENDING_URLS.csv`; el tier se conserva sólo para trazabilidad y para el gate de producción, ver §4).
- Cada entrada es una ruta literal de un segmento (`/rejas-metalicas-macul`). No se usan patrones (`/rejas-metalicas-:comuna`) a propósito: un patrón podría capturar una ruta real de v2 en el futuro; la lista explícita más el contrato "ninguna ruta de v2 es sombreada por un source" es más segura.
- Destinos siempre relativos (`/rejas-metalicas`), nunca absolutos a `rinon.cl`, para que el mismo build funcione en preview y en producción.
- Lo que no está en el mapa sigue cayendo en `app/[legacy]/page.tsx`, que sólo renderiza los 13 slugs comerciales preservados y devuelve **404** para el resto (respaldo intacto).

## 2. Diferencias con la lista de partida (decisión, no error)

En 8 rutas el mapa ya existente apuntaba a otro destino que el de la lista. Criterio aplicado: se adopta el destino de la lista **salvo** cuando el mapa ya apuntaba a una página más específica dentro de la misma familia (en ese caso la página específica gana, porque conserva mejor la intención de búsqueda).

| URL vieja | Lista de partida | Mapa final | Motivo |
| --- | --- | --- | --- |
| `/camarote-dos-plazas-abajo` | `/camarotes` | `/camarote-2-plazas` | página específica existente en v2 |
| `/camarotes-con-escritorio-empresas` | `/camarotes` | `/camarote-con-escritorio` | página específica existente en v2 |
| `/camarotes-con-escritorio-por-mayor` | `/camarotes` | `/camarote-con-escritorio` | página específica existente en v2 |
| `/camarotes-con-escritorio-precio-fabrica` | `/camarotes` | `/camarote-con-escritorio` | página específica existente en v2 |
| `/fabricante-camarotes-con-escritorio` | `/camarotes` | `/camarote-con-escritorio` | página específica existente en v2 |
| `/litera-con-escritorio` | `/camarotes` | `/camarote-con-escritorio` | página específica existente en v2 |
| `/instalacion-camarotes` | `/instalacion` | `/instalacion` | **cambiado** en esta rama (antes `/camarotes`); se adopta la lista |
| `/instalacion-de-rejas` | `/instalacion` | `/instalacion` | **cambiado** en esta rama (antes `/rejas-metalicas`); se adopta la lista |

Si Felipe prefiere que las 6 primeras vayan a `/camarotes`, es un cambio de una línea cada una en `lib/legacy-redirects.ts`; el contrato lo acepta.

## 3. Rutas por familia y por destino

| Familia (patrón de URL vieja) | Rutas | Destino(s) en v2 | 301→200 verificados |
| --- | --- | --- | --- |
| `camarotes-*` | 84 | `/camarotes` (84) | 84/84 |
| `camarote-con-escritorio-*` | 67 | `/camarote-con-escritorio` (67) | 67/67 |
| `cercos-perimetrales-*` | 60 | `/cierres-perimetrales` (60) | 60/60 |
| `rejas-metalicas-*` | 54 | `/rejas-metalicas` (54) | 54/54 |
| `pintura-electrostatica-*` | 42 | `/pintura-electrostatica` (42) | 42/42 |
| `cercos-* / cierres-* / barreras / presupuesto-*` | 23 | `/cierres-perimetrales` (23) | 23/23 |
| `portones-* / puertas-peatonales` | 17 | `/portones-metalicos` (17) | 17/17 |
| `rejas-* / reja-*` | 16 | `/rejas-metalicas` (16) | 16/16 |
| `camarote-* / litera* / cama-alta-*` | 13 | `/cama-alta` (1), `/camarote-2-plazas` (1), `/camarote-con-escritorio` (2), `/camarotes` (9) | 13/13 |
| `fabricante-* / venta-* / metalurgica-rinon` | 10 | `/camarote-con-escritorio` (1), `/camarotes` (3), `/cierres-perimetrales` (2), `/estructuras-metalicas` (1), `/fabricacion-metalica` (1), `/portones-metalicos` (1), `/rejas-metalicas` (1) | 10/10 |
| `camarotes-con-escritorio*` | 4 | `/camarote-con-escritorio` (4) | 4/4 |
| `barandas / escaleras / estructuras-*` | 3 | `/estructuras-metalicas` (3) | 3/3 |
| `instalacion-*` | 2 | `/instalacion` (2) | 2/2 |
| `mallas-separadoras-*` | 2 | `/mallas-separadoras` (2) | 2/2 |
| `soldadura-*` | 1 | `/soldadura-mig` (1) | 1/1 |

Destinos (13 páginas de v2, todas responden 200):

| Destino en v2 | Rutas viejas | tier `family` | tier `gsc-pending` | En la lista de Felipe |
| --- | --- | --- | --- | --- |
| `/camarotes` | 96 | 68 | 28 | 95 |
| `/cierres-perimetrales` | 85 | 81 | 4 | 85 |
| `/camarote-con-escritorio` | 74 | 71 | 3 | 69 |
| `/rejas-metalicas` | 71 | 60 | 11 | 71 |
| `/pintura-electrostatica` | 42 | 33 | 9 | 42 |
| `/portones-metalicos` | 18 | 17 | 1 | 18 |
| `/estructuras-metalicas` | 4 | 4 | 0 | 4 |
| `/instalacion` | 2 | 2 | 0 | 2 |
| `/mallas-separadoras` | 2 | 1 | 1 | 2 |
| `/cama-alta` | 1 | 1 | 0 | 0 |
| `/camarote-2-plazas` | 1 | 1 | 0 | 1 |
| `/fabricacion-metalica` | 1 | 1 | 0 | 1 |
| `/soldadura-mig` | 1 | 0 | 1 | 1 |
| **Total** | **398** | **340** | **58** | **391** |

## 4. Cuándo se emiten (gate de producción)

`next.config.ts`:

- **Build no productivo** (`next build` local, Vercel *Preview*): se emiten los 398, sin flags. Por eso el preview de la rama responde 301 a las URLs viejas y se puede verificar antes del corte.
- **Build de producción** (`VERCEL_ENV=production` o `RINON_INDEXABLE=true`): fail-closed según `docs/AI_DECISION_LOG.md` D-001. Sin `RINON_ENABLE_MIGRATION_REDIRECTS=true` no se emite ninguno; con ese flag se emiten los 340 `family`; los 58 `gsc-pending` requieren además `RINON_REDIRECT_GSC_PENDING=true`. Ambas variables ya están en `docs/cutover-rinon-cl.md` §2 (la segunda como opcional, con la recomendación de activarla frente a dejar 58 URLs en 404).

Matriz verificada cargando el `next.config.ts` real con el loader de Next (un proceso por escenario):

| Escenario | Redirects emitidos |
| --- | --- |
| sin variables (local) / `VERCEL_ENV=preview` | 398 (301) |
| `VERCEL_ENV=production` sin flags | 0 |
| `RINON_INDEXABLE=true` sin flags | 0 |
| `VERCEL_ENV=production` + `RINON_ENABLE_MIGRATION_REDIRECTS=true` | 340 (301) |
| `VERCEL_ENV=production` + ambos flags | 398 (301) |

Los redirects se evalúan en **build**: cambiar estas variables exige redeploy. Se usa `statusCode: 301` (no `permanent: true`, que en Next 16 emite 308); ambos son permanentes para Google, 301 es lo que describe el runbook.

## 5. Cómo se probó (2026-09-24, build local de esta rama)

`npm run build && npm run start -- -p 3210`, luego `fetch` con `redirect: "manual"` sobre **las 398** rutas:

- 398/398 → **301** con `location` relativo al destino esperado, **un solo salto**, y el destino responde **200** directo (sin cadenas ni bucles).
- 20 rutas de v2 siguen en 200 sin redirect: `/`, `/camarotes`, `/camarote-con-escritorio`, `/rejas-metalicas`, `/cierres-perimetrales`, `/pintura-electrostatica`, `/portones-metalicos`, `/mallas-separadoras`, `/blog`, `/recursos`, `/recursos/como-cotizar-rejas-metalicas`, `/instalacion`, `/estructuras-metalicas`, `/fabricacion-metalica`, `/soldadura-mig`, `/camarote-2-plazas`, `/cama-alta`, `/camarote-titanic`, `/mallas-3d`, `/contacto`.
- `/no-existe` y `/rejas-metalicas-comuna-inexistente` → 404 (respaldo `/[legacy]`).
- Query string preservada: `/rejas-metalicas-macul?utm_source=test` → 301 `/rejas-metalicas?utm_source=test`.
- Variante con barra final (`/camarotes-maipu/`): Next normaliza primero con 308 a `/camarotes-maipu` y luego 301 → dos saltos, sólo para una forma que el sitemap viejo nunca publicó.
- `.next/routes-manifest.json`: 398 redirects no internos con `statusCode: 301`.

Muestra de 40 rutas de distintas familias (misma lista para repetir contra `https://rinon.cl` después del corte):

| # | URL vieja | Respuesta | `location` | Destino responde | Tier |
| --- | --- | --- | --- | --- | --- |
| 1 | `/rejas-metalicas-macul` | 301 | `/rejas-metalicas` | 200 | family |
| 2 | `/camarotes-metalicos` | 301 | `/camarotes` | 200 | gsc-pending |
| 3 | `/barandas-metalicas` | 301 | `/estructuras-metalicas` | 200 | family |
| 4 | `/cama-alta-con-escritorio` | 301 | `/cama-alta` | 200 | family |
| 5 | `/camarote-con-escritorio-a-medida` | 301 | `/camarote-con-escritorio` | 200 | family |
| 6 | `/camarotes-acero-chile` | 301 | `/camarotes` | 200 | family |
| 7 | `/camarotes-con-escritorio` | 301 | `/camarote-con-escritorio` | 200 | family |
| 8 | `/barreras-peatonales` | 301 | `/cierres-perimetrales` | 200 | family |
| 9 | `/cercos-perimetrales-angol` | 301 | `/cierres-perimetrales` | 200 | family |
| 10 | `/fabricante-camarotes-con-escritorio` | 301 | `/camarote-con-escritorio` | 200 | family |
| 11 | `/instalacion-camarotes` | 301 | `/instalacion` | 200 | family |
| 12 | `/mallas-separadoras-bodegas` | 301 | `/mallas-separadoras` | 200 | family |
| 13 | `/pintura-electrostatica-antofagasta` | 301 | `/pintura-electrostatica` | 200 | family |
| 14 | `/portones-antofagasta` | 301 | `/portones-metalicos` | 200 | family |
| 15 | `/reja-metalica-santiago` | 301 | `/rejas-metalicas` | 200 | gsc-pending |
| 16 | `/rejas-metalicas-antofagasta` | 301 | `/rejas-metalicas` | 200 | family |
| 17 | `/soldadura-metalica-santiago` | 301 | `/soldadura-mig` | 200 | gsc-pending |
| 18 | `/cama-alta-2-plazas-con-escritorio` | 301 | `/camarote-con-escritorio` | 200 | family |
| 19 | `/camarote-con-escritorio-departamento` | 301 | `/camarote-con-escritorio` | 200 | family |
| 20 | `/camarotes-construccion` | 301 | `/camarotes` | 200 | family |
| 21 | `/cercos-para-canchas` | 301 | `/cierres-perimetrales` | 200 | family |
| 22 | `/cercos-perimetrales-coyhaique` | 301 | `/cierres-perimetrales` | 200 | family |
| 23 | `/fabricante-camarotes-chile` | 301 | `/camarotes` | 200 | gsc-pending |
| 24 | `/pintura-electrostatica-el-bosque` | 301 | `/pintura-electrostatica` | 200 | family |
| 25 | `/portones-batientes` | 301 | `/portones-metalicos` | 200 | family |
| 26 | `/reja-tubular` | 301 | `/rejas-metalicas` | 200 | family |
| 27 | `/rejas-metalicas-el-monte` | 301 | `/rejas-metalicas` | 200 | family |
| 28 | `/escaleras-metalicas` | 301 | `/estructuras-metalicas` | 200 | family |
| 29 | `/camarote-de-acero` | 301 | `/camarotes` | 200 | family |
| 30 | `/camarote-con-escritorio-hostal` | 301 | `/camarote-con-escritorio` | 200 | family |
| 31 | `/camarotes-la-reina` | 301 | `/camarotes` | 200 | family |
| 32 | `/camarotes-con-escritorio-empresas` | 301 | `/camarote-con-escritorio` | 200 | family |
| 33 | `/cercos-para-estacionamientos` | 301 | `/cierres-perimetrales` | 200 | family |
| 34 | `/cercos-perimetrales-la-granja` | 301 | `/cierres-perimetrales` | 200 | family |
| 35 | `/venta-mayor-camarotes-metalicos` | 301 | `/camarotes` | 200 | family |
| 36 | `/pintura-electrostatica-la-pintana` | 301 | `/pintura-electrostatica` | 200 | gsc-pending |
| 37 | `/portones-de-acero` | 301 | `/portones-metalicos` | 200 | family |
| 38 | `/rejas-decorativas` | 301 | `/rejas-metalicas` | 200 | gsc-pending |
| 39 | `/rejas-metalicas-la-reina` | 301 | `/rejas-metalicas` | 200 | family |
| 40 | `/camarote-militar` | 301 | `/camarotes` | 200 | family |

Script para repetir la muestra (`BASE=https://rinon.cl bash docs/redirects-sample-check.sh`):

```bash
#!/usr/bin/env bash
# Uso: BASE=https://rinon.cl bash sample-curl.sh
BASE="${BASE:-http://localhost:3210}"
for p in /rejas-metalicas-macul /camarotes-metalicos /barandas-metalicas /cama-alta-con-escritorio /camarote-con-escritorio-a-medida /camarotes-acero-chile /camarotes-con-escritorio /barreras-peatonales /cercos-perimetrales-angol /fabricante-camarotes-con-escritorio /instalacion-camarotes /mallas-separadoras-bodegas /pintura-electrostatica-antofagasta /portones-antofagasta /reja-metalica-santiago /rejas-metalicas-antofagasta /soldadura-metalica-santiago /cama-alta-2-plazas-con-escritorio /camarote-con-escritorio-departamento /camarotes-construccion /cercos-para-canchas /cercos-perimetrales-coyhaique /fabricante-camarotes-chile /pintura-electrostatica-el-bosque /portones-batientes /reja-tubular /rejas-metalicas-el-monte /escaleras-metalicas /camarote-de-acero /camarote-con-escritorio-hostal /camarotes-la-reina /camarotes-con-escritorio-empresas /cercos-para-estacionamientos /cercos-perimetrales-la-granja /venta-mayor-camarotes-metalicos /pintura-electrostatica-la-pintana /portones-de-acero /rejas-decorativas /rejas-metalicas-la-reina /camarote-militar; do printf '%-50s ' "$p"; curl -sI "$BASE$p" | awk 'NR==1{s=$2} tolower($1)=="location:"{l=$2} END{printf "%s %s\n", s, l}'; done
```

## 6. Pendiente / no verificable desde este entorno

- El preview de Vercel de esta rama se comprueba **después del push** (Vercel construye un preview nuevo). El contenedor no tiene salida a `*.vercel.app` por curl; la comprobación remota se hace con la herramienta de Vercel disponible en la sesión y queda anotada en `docs/AI_HANDOFF_CLAUDE.md`.
- Producción: intencionalmente sin cambios. Los redirects sólo se activarán en producción con las variables de `docs/cutover-rinon-cl.md` §2.
