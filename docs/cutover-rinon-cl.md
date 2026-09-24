# Cutover rinon.cl → RINON 2.0 (proyecto Vercel `rinon-v2`)

**Estado:** preparación técnica en rama `claude/preparar-rinon-cl`. Nada de lo descrito aquí se ha ejecutado en producción.
**Regla:** ningún paso de este documento se ejecuta sin autorización explícita de Felipe. Los pasos marcados **[Enrique]** dependen del dueño del proyecto Vercel viejo y del DNS de `rinon.cl`.

Este documento complementa `docs/RELEASE_CUTOVER_RUNBOOK.md` (gates de release y rollback). Aquí sólo se listan los pasos manuales del traspaso del dominio y su verificación.

## 0. Qué cambia en el código de esta rama

| Tema | Estado en el código | Qué depende de configuración externa |
| --- | --- | --- |
| Indexación | `RINON_INDEXABLE=true` activa `index, follow`, `robots.txt` con `Allow: /` + `Sitemap:` y desmonta `StagingTracking`. Con cualquier otro valor todo queda `noindex, nofollow` y `Disallow: /`. | Definir la variable sólo en el entorno **Production** de `rinon-v2`. |
| Redirects 301 del sitio viejo | `lib/legacy-redirects.ts` (398 URLs: las 391 de la lista de Felipe + 7 del inventario del repo viejo; detalle en `docs/redirects-sitio-viejo.md`). En builds **no productivos** (preview de Vercel, `next build` local) se emiten todos, por eso el preview ya responde 301. En un build de **producción** (`VERCEL_ENV=production` o `RINON_INDEXABLE=true`) siguen fail-closed: sólo con `RINON_ENABLE_MIGRATION_REDIRECTS=true`; las 58 URLs en cuarentena GSC requieren además `RINON_REDIRECT_GSC_PENDING=true`. | Decisión de Felipe sobre las 58 URLs GSC-pending (ver §2). |
| Redirects del blog viejo | 6 redirects aprobados en `lib/blog-migration.ts`, activos sólo con `RINON_ENABLE_BLOG_REDIRECTS=true`. El resto de `/blog/*` sirve una página puente `noindex` con enlace a la solución relacionada. | — |
| Región | `vercel.json` → `"regions": ["gru1"]` (São Paulo). | Verificar que el plan de Vercel del team permita fijar región (en Hobby sólo se admite una región; en Pro varias). |
| Analítica | GTM y Clarity sólo se cargan con `RINON_PRODUCTION_TRACKING_ENABLED=true`, tras consentimiento de cookies, y con ids válidos en `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_CLARITY_ID`. La CSP ya admite `googletagmanager.com`, `*.google-analytics.com`, `*.analytics.google.com`, `*.clarity.ms` y `c.bing.com`. | Ids reales de GTM/GA4/Clarity (no existen en el repo; ver `docs/needs-data.md`). |
| Formulario de cotización | Escribe leads sólo si `RINON_LEAD_WRITE_ENABLED=true` **y** `RINON_INDEXABLE=true` (o `RINON_ALLOW_PREVIEW_WRITES=true` para pruebas controladas). El backend es la Edge Function `rinon-public-intake` del proyecto Supabase `wbinwroidinsretcgsox`; el panel `/admin` y los adjuntos privados usan `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (sólo servidor). | Confirmar que la Edge Function, la tabla `leads` y el bucket privado `rinon-lead-attachments` existen y están desplegados en ese proyecto. |
| WhatsApp / teléfono | Una sola constante en `lib/contact.ts` (`56975893742`, mostrado como `+56 9 7589 3742`), sobreescribible con `NEXT_PUBLIC_RINON_WHATSAPP_NUMBER` / `NEXT_PUBLIC_RINON_PHONE_DISPLAY`. | Nada, salvo que el número cambie. |
| OG image | `/opengraph-image` corregida (fallaba en runtime con error de layout de Satori). | — |

## 1. Verificar el preview de la rama

1. Abrir el deployment de preview que Vercel genera para `claude/preparar-rinon-cl` (proyecto `rinon-v2`).
2. Confirmar que en el preview **sigue** todo cerrado: `curl -I <preview>/` → `x-robots-tag`/meta `noindex, nofollow`; `/robots.txt` → `Disallow: /`; el formulario de `/cotizar` muestra el aviso de staging.
3. Confirmar en el preview que las URLs del sitio viejo redirigen (`curl -sI <preview>/rejas-metalicas-macul` → 301 `location: /rejas-metalicas`; `/camarotes-metalicos` → `/camarotes`; `/cercos-perimetrales-maipu` → `/cierres-perimetrales`) y que `/no-existe` sigue en 404.
4. Revisar en 320/375/1280 px las rutas del reporte de legibilidad: `/`, `/camarotes`, `/rejas-metalicas`, `/cierres-perimetrales`, `/empresas`, `/cotizar`, `/nosotros`, `/recursos/como-cotizar-rejas-metalicas`.
5. Hacer merge a `main` sólo después de la revisión (esta rama no se mergea sola).

## 2. Definir las variables de entorno de producción en `rinon-v2`

Entorno **Production** únicamente (no Preview). Valores exactos que exige `scripts/preflight-production.mjs` en modo autorizado:

```
RINON_CUTOVER_AUTHORIZED=true
RINON_INDEXABLE=true
RINON_ENABLE_MIGRATION_REDIRECTS=true
RINON_ENABLE_BLOG_REDIRECTS=true
RINON_LEAD_WRITE_ENABLED=true
RINON_PRODUCTION_TRACKING_ENABLED=true
RINON_URL_INVENTORY_COMPLETE=true
RINON_LEGAL_APPROVED=true
SUPABASE_URL=https://wbinwroidinsretcgsox.supabase.co        # servidor, sin NEXT_PUBLIC_
SUPABASE_SERVICE_ROLE_KEY=<secreto>                         # servidor, sin NEXT_PUBLIC_
ADMIN_PASSWORD=<secreto>                                    # /admin
RINON_ADMIN_ENABLED=true                                    # sólo si se quiere /admin en producción
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX                              # pendiente (docs/needs-data.md)
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx                           # pendiente (docs/needs-data.md)
```

Opcionales:

```
RINON_REDIRECT_GSC_PENDING=true     # sólo si Felipe decide redirigir también las 58 URLs en cuarentena GSC (recomendado frente a dejarlas en 404; ver docs/AI_HANDOFF_CLAUDE.md, sección CHALLENGE)
RINON_WRITE_ALLOWED_ORIGIN=https://rinon.cl
```

Notas:
- `MIGRATION_GSC_REVIEW_PENDING_COUNT` en `lib/migration.ts` sigue en **58**. El preflight autorizado exige `0`; es decir, hoy un build con `RINON_CUTOVER_AUTHORIZED=true` **falla a propósito** hasta que se resuelvan esas 58 URLs (o se decida explícitamente cómo tratarlas). Esto es una decisión de Felipe, no un bug.
- `RINON_URL_INVENTORY_COMPLETE=true` y `RINON_LEGAL_APPROVED=true` son declaraciones humanas, no flags técnicos.
- Los redirects se evalúan en **build**: cualquier cambio de estas variables requiere un redeploy.

## 3. Agregar `rinon.cl` y `www.rinon.cl` al proyecto `rinon-v2`

1. Vercel → proyecto `rinon-v2` → Settings → Domains → Add `rinon.cl` y `www.rinon.cl` (elegir `www` → `rinon.cl` como redirect, o al revés; recomendado: apex `rinon.cl` canónico, `www` redirige 308 al apex, coherente con `SEO_BASE_URL`).
2. Como el dominio está hoy asignado a un proyecto de **otra cuenta** (la de Enrique), Vercel pedirá **verificación por registro TXT** (`_vercel.rinon.cl` → `vc-domain-verify=rinon.cl,<token>`). Anotar aquí el valor exacto que muestre Vercel:
   - Registro: `_vercel` TXT `vc-domain-verify=...` → **pendiente de copiar desde el panel**.
   - Quién lo carga: **[Enrique]** (o quien administre el DNS de `rinon.cl` en NIC Chile / proveedor DNS).
3. Alternativa sin TXT: **[Enrique]** elimina `rinon.cl` de su proyecto Vercel (o transfiere el dominio al team `filipovalverde-5673s-projects`) antes del paso 1. No hacer esto antes de tener el preview aprobado: dejaría el sitio viejo sin dominio.

## 4. Comprobar los registros DNS actuales

Ejecutar desde cualquier máquina con acceso a internet (el contenedor de esta sesión no tiene salida a `rinon.cl`):

```
dig A rinon.cl +short
dig CNAME www.rinon.cl +short
dig TXT _vercel.rinon.cl +short
```

- Si `rinon.cl` ya apunta a `76.76.21.21` (A de Vercel) y `www` a `cname.vercel-dns.com`, no hay que tocar DNS: basta la verificación TXT + asignación del dominio al proyecto `rinon-v2`.
- Si apunta a otra IP/CNAME, **[Enrique]** o el administrador DNS debe cambiarlos a los valores que muestre Vercel al agregar el dominio (paso 3). TTL bajo (300 s) 24 h antes del corte.

## 5. Promover a producción

1. Merge de `claude/preparar-rinon-cl` a `main` (tras revisión).
2. Confirmar que el build de producción pasa con las variables del §2 (el preflight bloquea si falta algo).
3. Vercel → Deployments → el deployment de `main` con build verde → **Promote to Production** (o dejar que el push a `main` lo haga si el proyecto tiene Production Branch = `main`).
4. Asignar los dominios (paso 3) — en ese momento `rinon.cl` deja de servir el sitio viejo.
5. Registrar antes del corte el deployment de producción anterior y el proyecto viejo para rollback (`docs/RELEASE_CUTOVER_RUNBOOK.md` §8).

## 6. Verificaciones post-corte

```
curl -sI https://rinon.cl | head -20               # 200, sin x-robots-tag noindex, HSTS presente
curl -s https://rinon.cl | grep -o '<meta name="robots"[^>]*>'   # index, follow
curl -s https://rinon.cl/robots.txt                # Allow: / + Sitemap: https://rinon.cl/sitemap.xml
curl -sI https://www.rinon.cl | grep -i location   # → https://rinon.cl/
curl -sI https://rinon.cl/camarotes-maipu | grep -iE "^(HTTP|location)"   # 301 → /camarotes (un salto)
curl -sI https://rinon.cl/no-existe | head -1      # 404
```

Muestra de 40 redirects 301: repetir contra `https://rinon.cl` la tabla de `docs/redirects-sitio-viejo.md` §5 (`BASE=https://rinon.cl bash docs/redirects-sample-check.sh`); cada URL debe responder 301 en un solo salto y su destino 200. Verificar también que `/camarotes`, `/rejas-metalicas`, `/cierres-perimetrales`, `/pintura-electrostatica`, `/portones-metalicos`, `/blog` y `/recursos` sigan en 200 sin redirect.

Luego:
1. Search Console: agregar/validar la propiedad `https://rinon.cl` (ya hay `google-site-verification` en `app/layout.tsx`), enviar `https://rinon.cl/sitemap.xml`, revisar "Páginas" a las 48–72 h.
2. GA4: DebugView con consentimiento aceptado → `page_view`, `quote_start`, `contact_whatsapp`.
3. Enviar una cotización de prueba con adjunto y verificar el lead en `/admin` (adjunto accesible sólo autenticado).
4. Clarity: sesiones entrando.
5. Vercel → Logs: sin 5xx ni errores de runtime.

## 7. Resumen de responsables

| Paso | Responsable |
| --- | --- |
| Revisar preview y aprobar merge | Felipe |
| Env vars de producción en `rinon-v2` | Felipe |
| Decidir tratamiento de las 58 URLs GSC-pending | Felipe (con datos de Search Console del sitio viejo, que sólo Enrique/el propietario de GSC puede exportar) |
| Cargar registro TXT `_vercel` en DNS, o liberar/transferir el dominio | **Enrique** |
| Cambiar A/CNAME si no apuntan a Vercel | **Enrique** / administrador DNS |
| Promover a producción y asignar dominio | Felipe |
| Verificaciones post-corte | Felipe |
