# handoff-to-claude.md

## ACTUALIZACION VIGENTE — Codex 2026-08-27

Esta seccion corrige el estado del paquete generado previamente. Claude debe usar esta actualizacion como estado actual y tratar las secciones antiguas inferiores como contexto literal historico cuando difieran.

### Tarea 1 — verificacion de estado

```text
Repositorio revisado: /Users/valgreen/Documents/CLIENTES/RINON/rinon-v2
Branch actual: codex/rc7
Branch codex/rc7 existe: si
Commit 1157c4d existe: si, tipo commit
Stash: vacio
Working tree antes de generar este addendum: limpio
AGENTS.md existe: si
CODEX_HANDOFF.md existe: si
RELEASE_STATUS.md existe: si
```

### git status --short --branch actual

```text
## codex/rc7...origin/codex/rc7
```

### git log --oneline -10 actual

```text
1bc2a1c test: detect technical visuals in legacy hero gates
cf27d8e chore: stabilize browser QA asset setup
69f5035 test: guard commercial heroes against technical fallbacks
6decad8 docs: align release status with GSC pending count
1fc9af1 docs: add Claude collaboration handoff
4edfd24 fix: stabilize RC7 visual chrome and QA gates
1157c4d docs: add full RINON RC.7 Codex handoff
51782e9 docs: add Codex operating instructions for RINON RC.7
4992528 qa: synchronize quarantine with canonical GSC ledger
15236ed seo: add canonical live URL review ledger
```

### Coincidencia del lote P0 descrito

```text
Coincide en los puntos principales:
- Logo robusto: SiteHeader, SiteFooter y MobileNav usan /brand/logo-rinon-horizontal-transparent.png directamente.
- Isotipo .webp invalido eliminado del bloque s7-custom de app/page.tsx.
- public/visuals/structures/pergola-mediterranea-conceptual.svg ya no existe.
- Copy/labels corregidos en Empresas, Estructuras y QuoteForm.
- Responsive/mobile sticky reforzado en app/styles/part-15.css.
- QA served reforzado en scripts/check-served-build.mjs.
- Existe qa:browser:remote en package.json.
- Tests actualizados y ampliados; hoy son 52 tests browser, no 51.

Tambien hay commits posteriores al primer lote P0:
- handoff-to-claude.md fue agregado en 1fc9af1.
- RELEASE_STATUS.md ya alinea 58 URLs GSC-pending en 6decad8.
- Se agregaron guards de QA visual/comercial en 69f5035 y 1bc2a1c.
```

### QA actual ejecutado por Codex

```text
npm run qa:static
Resultado: PASA.

npm run build
Primer intento sandbox: FALLA por descarga de Google Fonts/Raleway.
Motivo literal: Failed to fetch `Raleway` from Google Fonts.
Reintento con red aprobada: PASA.

npm run qa:served
Primer intento sandbox: FALLA por listen EPERM en 0.0.0.0:3210.
Reintento fuera del sandbox: PASA.
Resumen literal: RINON SERVED-BUILD GATE PASSED: 28 routes, 25 assets (2 CSS / 13 JS / 7 images).

npm run qa:browser
Primer intento sandbox: FALLA por listen EPERM en 0.0.0.0:3211.
Reintento fuera del sandbox: PASA.
Resumen literal: 52 passed (2.3m)

npm run qa:remote -- https://rinon-v2.vercel.app
Primer intento sandbox: FALLA por DNS ENOTFOUND rinon-v2.vercel.app.
Reintento con red aprobada: PASA.
Resumen literal: RINON SERVED-BUILD GATE PASSED: 28 routes, 25 assets (2 CSS / 13 JS / 9 images).

npm run qa:browser:remote
Primer intento sandbox: invalido; 52/52 fallaron por bloqueo de lanzamiento Chromium:
bootstrap_check_in org.chromium.Chromium.MachPortRendezvousServer: Permission denied (1100)
Reintento fuera del sandbox: FALLA real contra Vercel.
Resumen literal: 8 failed, 44 passed (4.5m)
```

### Fallos reales actuales en npm run qa:browser:remote

```text
1) tests/commercial-evidence.spec.mjs:67:1 › commercial heroes never fall back to TechnicalVisual
Assert/operacion exacta:
const response=await page.goto(route,{waitUntil:"networkidle"});
Esperado: navegacion completa dentro de 30000ms.
Recibido: Test timeout of 30000ms exceeded while navigating to "https://rinon-v2.vercel.app/cotizar", waiting until "networkidle".

2) tests/render.spec.mjs:29:1 › home renders RC7 brand, navigation and quality-gated structure visual
Assert exacto:
expect(chrome.logoLoaded).toBeTruthy();
Esperado: true.
Recibido: false.
Notas del helper: logoLoaded = logo instanceof HTMLImageElement && logo.complete && logo.naturalWidth > 100.

3) tests/render.spec.mjs:42:1 › critical commercial pages including expanded catalog render with CSS
Assert exacto:
expect(chrome.logoLoaded).toBeTruthy();
Esperado: true.
Recibido: false.

4) tests/render.spec.mjs:50:1 › quote experience is a real three-step progressive wizard
Assert/operacion exacta:
await page.getByLabel(/Acepto que RINON use estos datos/).check();
Esperado: encontrar y marcar el checkbox de consentimiento en paso 3.
Recibido: Test timeout of 30000ms exceeded waiting for getByLabel(/Acepto que RINON use estos datos/).

5) tests/render.spec.mjs:60:1 › mobile navigation is task-led, reachable and responsive without overflow
Assert exacto:
expect(navCss.top).toBe("sticky");
Esperado: "sticky".
Recibido: "absolute".

6) tests/render.spec.mjs:68:1 › about and contact include usable location actions
Assert exacto:
expect(chrome.logoLoaded).toBeTruthy();
Esperado: true.
Recibido: false.

7) tests/seo-cro.spec.mjs:86:1 › structures landing owns structural intent without pretending conceptual evidence is executed work
Assert exacto:
expect(text).toContain("visual conceptual");
Esperado: substring "visual conceptual".
Recibido: texto de main incluye "referencia arquitectónica · render aportado" y "referencia · no obra ejecutada", pero no incluye "visual conceptual".

8) tests/seo-cro.spec.mjs:104:1 › enterprise landing is a B2B intent owner with structured answers and three closing paths
Assert exacto:
expect(text).toContain("Compra por volumen");
Esperado: substring "Compra por volumen".
Recibido: texto de main incluye "COMPRA POR VOLUMEN" en mayusculas y "Compra por unidad o volumen", pero no el substring exacto con esa capitalizacion.
```

### Interpretacion actual para Claude

```text
Correccion posterior: la hipotesis antigua "staging desactualizado respecto de local" NO queda descartada. Si explica fallas reales del alias publico, especialmente logo/CSS/mobile-nav/copy afectado por build viejo.

Estado actual:
- Local esta verde: static, build, served y browser pasan.
- HTTP remoto esta verde.
- Browser remoto falla 8/52 contra Vercel.
- Parte de las fallas son sensibilidad de asserts/copy/capitalizacion o espera networkidle.
- Parte de las fallas del alias publico se explican por deployment stale: `rinon-v2.vercel.app` servia un build anterior a 4edfd24. Marcadores: HTML con `/brand/logo-rinon-horizontal-white.png`; CSS mobile con `.mobile-nav-top{position:sticky}` sin prefijo `.prd2-mobile-nav`.
- Causa raiz de P0.1: `public/brand/logo-rinon-horizontal-white.png` era un PNG corrupto. HTTP 200 y `file` no bastaban; Chromium decodificaba `complete:true` pero `naturalWidth:0`, y `createImageBitmap` fallaba.
- P0.1 SIGUE ABIERTO. `/brand/logo-rinon-horizontal-transparent.png` tambien esta danado: su chunk IDAT declara 19181 bytes y solo hay 14544, el stream zlib esta incompleto e inflate falla. Chromium reporta 880x168 leyendo el IHDR intacto y pinta basura visual. Mismo defecto en `apple-touch-icon-180.png` (8599 declarados vs 8532 reales). Solo `favicon-64.png` esta sano.
- Por eso la asercion `complete && naturalWidth > 100` no detecta este dano: naturalWidth sale del IHDR, que sobrevive. El repositorio hoy no tiene ningun logo horizontal valido; hace falta el asset original del duenio.
- Assets de marca corruptos eliminados: `logo-rinon-horizontal-white.png` y `isotipo-rinoceronte-transparent.webp` (este ultimo sin cabecera RIFF/WEBP). Sus usos en CSS decorativo se retiraron sin sustituirlos por formas genericas.

No activar produccion. No activar indexacion. No activar redirects. No activar leads reales.
```

Generado por Codex para Claude. Fecha local: 2026-08-27T19:34:05.057Z

Regla de uso: Claude no tiene acceso al repo ni a comandos; este archivo incluye salidas literales y extracciones DOM para revisión/propuesta. No autoriza producción.

## 1. Git status y ultimos commits
### Salida literal: git status --short --branch && git log --oneline -10

```text
## codex/rc7...origin/codex/rc7
 M app/empresas/page.tsx
 M app/estructuras-metalicas/page.tsx
 M app/page.tsx
 M app/styles/part-15.css
 M components/MobileNav.tsx
 M components/QuoteForm.tsx
 M components/SiteFooter.tsx
 M components/SiteHeader.tsx
 M docs/DESIGN_SYSTEM_UI_SPEC.md
 M docs/VISUAL_PROVENANCE_INVENTORY.md
 M package.json
 D public/visuals/structures/pergola-mediterranea-conceptual.svg
 M scripts/check-served-build.mjs
 M tests/navigation-context.spec.mjs
 M tests/quote-keyboard.spec.mjs
 M tests/render.spec.mjs
 M tests/seo-cro.spec.mjs
?? handoff-to-claude.md
1157c4d docs: add full RINON RC.7 Codex handoff
51782e9 docs: add Codex operating instructions for RINON RC.7
4992528 qa: synchronize quarantine with canonical GSC ledger
15236ed seo: add canonical live URL review ledger
05f5c55 qa: derive migration quarantine contract from source of truth
f185a3f seo: protect five additional live organic owners
df79eb7 assets: add residential reference chunk 005
9af2c78 assets: add residential reference chunk 004
aaa4988 assets: add residential reference chunk 003
c68da16 assets: add residential reference chunk 002
```

## 2. Diff contra 1157c4d
### Salida literal: git diff 1157c4d --stat

```text
 app/empresas/page.tsx                                       |  8 ++++----
 app/estructuras-metalicas/page.tsx                          |  2 +-
 app/page.tsx                                                |  2 +-
 app/styles/part-15.css                                      |  4 +++-
 components/MobileNav.tsx                                    |  2 +-
 components/QuoteForm.tsx                                    |  2 +-
 components/SiteFooter.tsx                                   |  2 +-
 components/SiteHeader.tsx                                   |  2 +-
 docs/DESIGN_SYSTEM_UI_SPEC.md                               |  2 +-
 docs/VISUAL_PROVENANCE_INVENTORY.md                         |  2 +-
 package.json                                                |  1 +
 .../visuals/structures/pergola-mediterranea-conceptual.svg  |  1 -
 scripts/check-served-build.mjs                              | 13 +++++++------
 tests/navigation-context.spec.mjs                           |  2 +-
 tests/quote-keyboard.spec.mjs                               |  2 +-
 tests/render.spec.mjs                                       |  8 ++++----
 tests/seo-cro.spec.mjs                                      |  2 +-
 17 files changed, 30 insertions(+), 27 deletions(-)
```
### Diff completo SOLO de archivos con copy o UI visible

### git diff 1157c4d -- app/page.tsx

```diff
diff --git a/app/page.tsx b/app/page.tsx
index 4bb07ee..fb8ef1b 100644
--- a/app/page.tsx
+++ b/app/page.tsx
@@ -23,7 +23,7 @@ export default function Home(){return <main className="s7-home">
  </section>
 
  <section className="s7-process" data-reveal><div className="container"><div className="s7-process-heading"><span className="s7-kicker">CÓMO TRABAJAMOS</span><h2>Un proceso simple.</h2></div><ol className="s7-process-list">{process.map(([n,title,body])=><li key={n}><span>{n}</span><strong>{title}</strong><p>{body}</p></li>)}</ol></div></section>
- <section className="s7-custom" data-reveal><div className="s7-custom-mark" aria-hidden="true"><Image src="/brand/isotipo-rinoceronte-transparent.webp" alt="" fill sizes="45vw"/></div><div className="container s7-custom-inner"><span className="s7-kicker">PROYECTOS A MEDIDA</span><h2>Cuando no existe<br/>en un catálogo.</h2><p>Una foto, un plano, un croquis, una muestra o unas medidas pueden ser suficientes para empezar a conversar.</p><Link className="s7-text-link light" href="/fabricacion-metalica">Ver proyectos a medida <span>↗</span></Link></div></section>
+ <section className="s7-custom" data-reveal><div className="s7-custom-mark" aria-hidden="true" /><div className="container s7-custom-inner"><span className="s7-kicker">PROYECTOS A MEDIDA</span><h2>Cuando no existe<br/>en un catálogo.</h2><p>Una foto, un plano, un croquis, una muestra o unas medidas pueden ser suficientes para empezar a conversar.</p><Link className="s7-text-link light" href="/fabricacion-metalica">Ver proyectos a medida <span>↗</span></Link></div></section>
  <section className="s7-enterprise" data-reveal><div className="container s7-enterprise-inner"><div><span className="s7-kicker ink">EMPRESAS / VOLUMEN</span><h2>Primero entendemos<br/>qué necesitas fabricar.</h2></div><div className="s7-enterprise-copy"><p>Cantidad, uso, ubicación, antecedentes y plazo objetivo: lo necesario para evaluar compras por volumen y proyectos especiales.</p><Link href="/empresas">Soluciones para empresas <span>↗</span></Link></div></div></section>
  <section className="s7-final" data-reveal><div className="container s7-final-inner"><div><span className="s7-kicker">TU PROYECTO</span><h2>¿Qué necesitas fabricar?</h2></div><div className="s7-final-actions"><Link className="s7-cta" data-event="quote_start" data-cta-location="home_footer" href="/cotizar">Cotizar <span>↗</span></Link><WhatsAppCTA location="home_footer" label="WhatsApp" className="s7-text-link dark"/></div></div></section>
  </main>}
```
### git diff 1157c4d -- app/empresas/page.tsx

```diff
diff --git a/app/empresas/page.tsx b/app/empresas/page.tsx
index 62b2787..02c5034 100644
--- a/app/empresas/page.tsx
+++ b/app/empresas/page.tsx
@@ -15,10 +15,10 @@ const buyers=[
 ] as const;
 
 const proof=[
- ["VOLUMEN","Series, lotes y compras repetibles cuando cantidad y configuración están definidas."],
- ["BAJO PLANO","Piezas, soportes y conjuntos cuando la geometría y especificación vienen definidas."],
- ["PROYECTO","Cierres, estructuras y equipamiento asociados a una obra o necesidad de terreno."],
- ["RECURRENTE","Requerimientos que se repiten y pueden estandarizarse comercialmente."],
+ ["Compra por volumen","Series, lotes y compras repetibles cuando cantidad y configuración están definidas."],
+ ["Bajo plano","Piezas, soportes y conjuntos cuando la geometría y especificación vienen definidas."],
+ ["Proyecto / obra","Cierres, estructuras y equipamiento asociados a una obra o necesidad de terreno."],
+ ["Requerimiento recurrente","Requerimientos que se repiten y pueden estandarizarse comercialmente."],
 ] as const;
 
 const faqs=[
```
### git diff 1157c4d -- app/estructuras-metalicas/page.tsx

```diff
diff --git a/app/estructuras-metalicas/page.tsx b/app/estructuras-metalicas/page.tsx
index 0db5e06..69e0139 100644
--- a/app/estructuras-metalicas/page.tsx
+++ b/app/estructuras-metalicas/page.tsx
@@ -69,7 +69,7 @@ export default function Page() {
         </div>
         <div className="prd2-solution-media has-photo">
           <VisualEvidence slug="/estructuras-metalicas" fallback={["estructura completa", "detalle de unión", "contexto de uso"]} />
-          <div className="prd2-solution-media-caption"><span>REFERENCIA · NO OBRA EJECUTADA</span><b>Render aportado para mostrar contexto residencial</b></div>
+          <div className="prd2-solution-media-caption"><span>VISUAL CONCEPTUAL · NO OBRA EJECUTADA</span><b>Render aportado para mostrar contexto residencial</b></div>
         </div>
       </div>
     </section>
```
### git diff 1157c4d -- app/styles/part-15.css

```diff
diff --git a/app/styles/part-15.css b/app/styles/part-15.css
index 640b916..019c94f 100644
--- a/app/styles/part-15.css
+++ b/app/styles/part-15.css
@@ -1,5 +1,7 @@
 .prd2-desktop-nav>a.is-active,.prd2-desktop-nav>button.is-active,.prd2-desktop-nav>a[aria-current="page"]{color:#f58220}.prd2-mega-group>a.is-active,.prd2-service-grid>a.is-active{background:#202427}.prd2-mega-group>a.is-active strong,.prd2-service-grid>a.is-active strong{color:#f58220}.mobile-nav-sections summary.is-active,.mobile-nav-groups a.is-active,.mobile-nav-primary>a.is-active,.mobile-nav-groups a[aria-current="page"],.mobile-nav-primary>a[aria-current="page"]{color:#f58220!important}.mobile-nav-primary>a.is-active span{color:#f58220}.s6-footer-products{grid-template-columns:repeat(2,minmax(0,1fr));column-gap:18px;row-gap:9px}.s6-footer-products>strong{grid-column:1/-1}.s6-footer-products>a{min-width:0}
 
 /* RC7 compact-navigation ergonomics */
-@media(max-width:1100px){.mobile-nav-panel{overscroll-behavior:contain;padding-top:max(14px,env(safe-area-inset-top));padding-bottom:max(18px,env(safe-area-inset-bottom))}.mobile-nav-top{position:sticky;top:0;z-index:6;background:#111315;padding-top:4px}.mobile-nav-sections summary{min-height:54px}.mobile-nav-primary>a{min-height:54px}.mobile-nav-actions{position:sticky;bottom:0;z-index:7;margin-top:22px;box-shadow:0 -18px 28px rgba(17,19,21,.88);padding-bottom:env(safe-area-inset-bottom)}.mobile-nav-actions a{min-height:54px}.mobile-nav-toggle{touch-action:manipulation}.mobile-nav-close{touch-action:manipulation}}
+@media(max-width:1100px){.mobile-nav-panel{overscroll-behavior:contain;padding-top:max(14px,env(safe-area-inset-top));padding-bottom:max(18px,env(safe-area-inset-bottom))}.prd2-mobile-nav .mobile-nav-top{position:sticky;left:auto;right:auto;top:0;height:auto;z-index:6;background:#111315;padding-top:4px}.mobile-nav-sections summary{min-height:54px}.mobile-nav-primary>a{min-height:54px}.mobile-nav-actions{position:sticky;bottom:0;z-index:7;margin-top:22px;box-shadow:0 -18px 28px rgba(17,19,21,.88);padding-bottom:env(safe-area-inset-bottom)}.mobile-nav-actions a{min-height:54px}.mobile-nav-toggle{touch-action:manipulation}.mobile-nav-close{touch-action:manipulation}}
+@media(min-width:901px){.v5-editorial-page .card-grid>article{grid-template-columns:44px minmax(0,1fr);gap:14px 20px;margin-right:0;padding-right:22px}.v5-editorial-page .card-grid>article p{grid-column:1/-1;max-width:none}}
+@media(min-width:901px){.prd2-scope-grid article{display:block;margin-right:0;padding-right:24px}.prd2-scope-grid p{max-width:none}.prd2-application-grid>div{margin-right:0;padding-right:22px}}
 @media(max-width:520px){.s6-footer-products{grid-template-columns:1fr}.s6-footer-products>strong{grid-column:auto}.mobile-nav-panel{padding-left:14px;padding-right:14px}.mobile-nav-top{padding-bottom:14px}.mobile-nav-actions{margin-left:0;margin-right:0}}
```
### git diff 1157c4d -- components/MobileNav.tsx

```diff
diff --git a/components/MobileNav.tsx b/components/MobileNav.tsx
index d0eb514..9937798 100644
--- a/components/MobileNav.tsx
+++ b/components/MobileNav.tsx
@@ -13,7 +13,7 @@ export function MobileNav(){
  return <div className="mobile-nav-wrap prd2-mobile-nav">
   <button ref={toggleRef} type="button" className="mobile-nav-toggle" aria-haspopup="dialog" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?"Cerrar menú":"Abrir menú"} onClick={()=>setOpen(value=>!value)}><span aria-hidden="true">Menú</span></button>
   {open?<div ref={panelRef} role="dialog" aria-modal="true" aria-label="Navegación" className="mobile-nav-panel" id="mobile-navigation" onKeyDown={trapFocus}>
-   <div className="mobile-nav-top"><Link href="/" onClick={()=>setOpen(false)} aria-label="RINON inicio"><img src="/brand/logo-rinon-horizontal-white.png" alt="RINON Soluciones Metálicas" width="174" height="48"/></Link><button type="button" className="mobile-nav-close" onClick={()=>{setOpen(false);window.requestAnimationFrame(()=>toggleRef.current?.focus())}} aria-label="Cerrar menú">×</button></div>
+   <div className="mobile-nav-top"><Link href="/" onClick={()=>setOpen(false)} aria-label="RINON inicio"><img src="/brand/logo-rinon-horizontal-transparent.png" alt="RINON Soluciones Metálicas" width="174" height="48"/></Link><button type="button" className="mobile-nav-close" onClick={()=>{setOpen(false);window.requestAnimationFrame(()=>toggleRef.current?.focus())}} aria-label="Cerrar menú">×</button></div>
    <div className="mobile-nav-sections">
     <details><summary className={active==="products"?"is-active":undefined}>Productos <span>+</span></summary><div className="mobile-nav-groups">{productNavGroups.map(group=><div key={group.label}><b>{group.label}</b>{group.items.map(item=><Link aria-current={isExactNavPath(pathname,item.href)?"page":undefined} className={isExactNavPath(pathname,item.href)?"is-active":undefined} key={item.href} href={item.href} data-event="menu_product_click" data-product={item.label} onClick={()=>setOpen(false)}>{item.label}</Link>)}</div>)}</div></details>
    </div>
```
### git diff 1157c4d -- components/QuoteForm.tsx

```diff
diff --git a/components/QuoteForm.tsx b/components/QuoteForm.tsx
index a0415d6..95a26ae 100644
--- a/components/QuoteForm.tsx
+++ b/components/QuoteForm.tsx
@@ -78,7 +78,7 @@ export function QuoteForm({leadWriteEnabled=false,powderCoatingEnabled=false}:{l
     <label>Tipo de cliente *<select name="tipo_cliente" required value={clientType} onChange={e=>setClientType(e.target.value)}><option value="">Selecciona</option><option value="Particular">Particular</option><option value="Empresa">Empresa</option><option value="Institución">Institución</option></select></label>
     {(clientType==="Empresa"||clientType==="Institución"||requestType==="Empresa")&&<><label>Empresa / institución<input name="empresa" autoComplete="organization"/></label><label>Modalidad<select name="modo_compra" defaultValue={requestedClient==="b2b"?"Compra por volumen":"Por definir"}><option>Por definir</option><option>Compra por volumen</option><option>Proyecto / obra</option><option>Fabricación bajo requerimiento</option><option>Requerimiento recurrente</option></select></label></>}
     <label>WhatsApp *<input type="tel" name="telefono" autoComplete="tel" required placeholder="+56 9 ..."/></label><label>Correo<input type="email" name="email" autoComplete="email"/></label>
-    <label className="wide consent"><input type="checkbox" name="privacidad" required/><span>Acepto el uso de estos datos para evaluar y responder mi solicitud. Consulta la <Link href="/politica-de-privacidad">política de privacidad</Link>. *</span></label>
+    <label className="wide consent"><input type="checkbox" name="privacidad" required/><span>Acepto que RINON use estos datos para evaluar y responder mi solicitud. Consulta la <Link href="/politica-de-privacidad">política de privacidad</Link>. *</span></label>
    </div>
    <div className="quote-step-actions quote-step-submit"><button type="button" className="quote-back" onClick={()=>goTo(2)}>← Atrás</button><span>Paso 3 de 3</span><button className="button primary v5-quote-submit" type="submit" disabled={submitting} data-event="quote_submit_attempt" data-quote-category={category||"unselected"}>{submitting?"Enviando…":"Solicitar cotización"}</button></div>
    <div className="quote-alt"><span>¿Prefieres conversar primero?</span><WhatsAppCTA category={category||undefined} location="quote_form" label="Abrir WhatsApp"/></div>
```
### git diff 1157c4d -- components/SiteFooter.tsx

```diff
diff --git a/components/SiteFooter.tsx b/components/SiteFooter.tsx
index ee17ba6..e8d3279 100644
--- a/components/SiteFooter.tsx
+++ b/components/SiteFooter.tsx
@@ -8,7 +8,7 @@ export function SiteFooter(){
  return <footer className="s6-footer">
   <div className="container s6-footer-main s6-footer-main-v2">
    <div className="s6-footer-brand">
-    <img src="/brand/logo-rinon-horizontal-white.png" alt="RINON Soluciones Metálicas" width="220" height="60"/>
+    <img src="/brand/logo-rinon-horizontal-transparent.png" alt="RINON Soluciones Metálicas" width="220" height="60"/>
     <p>Productos, proyectos a medida y servicios metálicos desde San Bernardo.</p>
     <Link className="s6-footer-quote" href="/cotizar" data-event="quote_start" data-cta-location="footer">Cotizar ↗</Link>
    </div>
```
### git diff 1157c4d -- components/SiteHeader.tsx

```diff
diff --git a/components/SiteHeader.tsx b/components/SiteHeader.tsx
index 2d648d9..2b6e24a 100644
--- a/components/SiteHeader.tsx
+++ b/components/SiteHeader.tsx
@@ -6,7 +6,7 @@ export function SiteHeader() {
   return <header className="prd2-header">
     <div className="container prd2-header-inner">
       <Link className="prd2-brand" href="/" aria-label="RINON inicio">
-        <img src="/brand/logo-rinon-horizontal-white.png" alt="RINON Soluciones Metálicas" width="205" height="56" fetchPriority="high" />
+        <img src="/brand/logo-rinon-horizontal-transparent.png" alt="RINON Soluciones Metálicas" width="205" height="56" fetchPriority="high" />
       </Link>
       <DesktopMegaNav />
       <div className="prd2-header-actions">
```

## 3. Copy visible extraido del DOM

### Home (/)

### Texto visible completo literal de main.innerText

```text
FABRICACIÓN METÁLICA · SAN BERNARDO
Lo necesitas
en metal.
Lo fabricamos.

Productos, proyectos y soluciones a medida para empresas y particulares.

Cotizar
↗
Ver productos
↓
VISUAL CONCEPTUAL · 720 × 730 FUENTE
FABRICACIÓN DIRECTA
PLANO · FOTO · REFERENCIA
PORTEZUELO 1506, SAN BERNARDO
EMPIEZA POR LO QUE NECESITAS
Elige cómo empezar.

No necesitas conocer el nombre técnico exacto. Parte por un producto, un proyecto a medida o una compra para empresa.

01 · PRODUCTO
Necesito un producto.

Camarotes, camas, balinesas, mesas, escritorios, cierres, rejas, portones y equipamiento.

Ver productos →
02 · PROYECTO A MEDIDA
Necesito fabricar algo especial.

Parte con una foto, plano, croquis, muestra, medidas o una explicación de lo que necesitas resolver.

Ver proyectos a medida →
03 · EMPRESA
Necesito volumen o un requerimiento B2B.

Cantidad, destino, fecha objetivo y especificación para ordenar la compra desde el inicio.

Soluciones para empresas →
QUÉ FABRICAMOS
Tres mundos.
Una misma fabricación.
REFERENCIA DE PRODUCTO · ARCHIVO
01
PRODUCTO / VOLUMEN
Camas y
camarotes.

Configuraciones metálicas para hogar, instituciones, faenas, alojamientos y proyectos por cantidad.

Explorar camarotes ↗
VISUAL CONCEPTUAL
02
PERÍMETRO / ACCESO
Cierres y
protecciones.

Rejas, portones, mallas y sistemas perimetrales definidos según medidas, accesos y contexto de uso.

Explorar cierres ↗
REFERENCIA ARQUITECTÓNICA · RENDER
03
PROYECTO / A MEDIDA
Estructuras
metálicas.

Cobertizos, pérgolas, escaleras, plataformas, soportes y estructuras definidas para cada espacio o necesidad.

Explorar estructuras ↗
Más productos
Camas balinesas ↗
Mesas ↗
Escritorios ↗
Equipamiento ↗
Rejas ↗
Portones ↗
CÓMO TRABAJAMOS
Un proceso simple.
01
Cuéntanos

Qué necesitas, para qué se usará y qué antecedentes ya tienes.

02
Definimos

Revisamos medidas, cantidad y lo que falta confirmar.

03
Fabricamos

Acordamos la solución fabricable antes de pasar a producción.

04
Entregamos

Coordinamos despacho o instalación cuando corresponda.

PROYECTOS A MEDIDA
Cuando no existe
en un catálogo.

Una foto, un plano, un croquis, una muestra o unas medidas pueden ser suficientes para empezar a conversar.

Ver proyectos a medida
↗
EMPRESAS / VOLUMEN
Primero entendemos
qué necesitas fabricar.

Cantidad, uso, ubicación, antecedentes y plazo objetivo: lo necesario para evaluar compras por volumen y proyectos especiales.

Soluciones para empresas ↗
TU PROYECTO
¿Qué necesitas fabricar?
Cotizar
↗
WhatsApp
```
### Jerarquia y elementos visibles detectados

- H1: Lo necesitas en metal. Lo fabricamos.
- parrafo: Productos, proyectos y soluciones a medida para empresas y particulares.
- CTA: Cotizar ↗
- CTA: Ver productos ↓
- H2: Elige cómo empezar.
- parrafo: No necesitas conocer el nombre técnico exacto. Parte por un producto, un proyecto a medida o una compra para empresa.
- CTA: 01 · PRODUCTO Necesito un producto. Camarotes, camas, balinesas, mesas, escritorios, cierres, rejas, portones y equipamiento. Ver productos →
- H3: Necesito un producto.
- parrafo: Camarotes, camas, balinesas, mesas, escritorios, cierres, rejas, portones y equipamiento.
- CTA: 02 · PROYECTO A MEDIDA Necesito fabricar algo especial. Parte con una foto, plano, croquis, muestra, medidas o una explicación de lo que necesitas resolver. Ver proyectos a medida →
- H3: Necesito fabricar algo especial.
- parrafo: Parte con una foto, plano, croquis, muestra, medidas o una explicación de lo que necesitas resolver.
- CTA: 03 · EMPRESA Necesito volumen o un requerimiento B2B. Cantidad, destino, fecha objetivo y especificación para ordenar la compra desde el inicio. Soluciones para empresas →
- H3: Necesito volumen o un requerimiento B2B.
- parrafo: Cantidad, destino, fecha objetivo y especificación para ordenar la compra desde el inicio.
- H2: Tres mundos. Una misma fabricación.
- figcaption: REFERENCIA DE PRODUCTO · ARCHIVO
- small: PRODUCTO / VOLUMEN
- H3: Camas y camarotes.
- parrafo: Configuraciones metálicas para hogar, instituciones, faenas, alojamientos y proyectos por cantidad.
- CTA: Explorar camarotes ↗
- figcaption: VISUAL CONCEPTUAL
- small: PERÍMETRO / ACCESO
- H3: Cierres y protecciones.
- parrafo: Rejas, portones, mallas y sistemas perimetrales definidos según medidas, accesos y contexto de uso.
- CTA: Explorar cierres ↗
- figcaption: REFERENCIA ARQUITECTÓNICA · RENDER
- small: PROYECTO / A MEDIDA
- H3: Estructuras metálicas.
- parrafo: Cobertizos, pérgolas, escaleras, plataformas, soportes y estructuras definidas para cada espacio o necesidad.
- CTA: Explorar estructuras ↗
- CTA: Camas balinesas ↗
- CTA: Mesas ↗
- CTA: Escritorios ↗
- CTA: Equipamiento ↗
- CTA: Rejas ↗
- CTA: Portones ↗
- H2: Un proceso simple.
- li: 01 Cuéntanos Qué necesitas, para qué se usará y qué antecedentes ya tienes.
- parrafo: Qué necesitas, para qué se usará y qué antecedentes ya tienes.
- li: 02 Definimos Revisamos medidas, cantidad y lo que falta confirmar.
- parrafo: Revisamos medidas, cantidad y lo que falta confirmar.
- li: 03 Fabricamos Acordamos la solución fabricable antes de pasar a producción.
- parrafo: Acordamos la solución fabricable antes de pasar a producción.
- li: 04 Entregamos Coordinamos despacho o instalación cuando corresponda.
- parrafo: Coordinamos despacho o instalación cuando corresponda.
- H2: Cuando no existe en un catálogo.
- parrafo: Una foto, un plano, un croquis, una muestra o unas medidas pueden ser suficientes para empezar a conversar.
- CTA: Ver proyectos a medida ↗
- H2: Primero entendemos qué necesitas fabricar.
- parrafo: Cantidad, uso, ubicación, antecedentes y plazo objetivo: lo necesario para evaluar compras por volumen y proyectos especiales.
- CTA: Soluciones para empresas ↗
- H2: ¿Qué necesitas fabricar?
- CTA: Cotizar ↗
- CTA: WhatsApp


### Empresas (/empresas)

### Texto visible completo literal de main.innerText

```text
EMPRESAS · INSTITUCIONES · OBRAS
Fabricación para empresas, obras e instituciones.

Desde una serie de camarotes hasta cierres, estructuras, soportes o piezas bajo plano. Cuéntanos cantidad, destino y fecha objetivo para ordenar la evaluación desde el inicio.

Cotizar para empresa
Conversar por WhatsApp
COMPRA POR VOLUMEN
PROYECTO / OBRA
BAJO PLANO
REQUERIMIENTO RECURRENTE
QUÉ PODEMOS ORDENAR CONTIGO
01
Compra por volumen

Series, lotes y compras repetibles cuando cantidad y configuración están definidas.

02
Bajo plano

Piezas, soportes y conjuntos cuando la geometría y especificación vienen definidas.

03
Proyecto / obra

Cierres, estructuras y equipamiento asociados a una obra o necesidad de terreno.

04
Requerimiento recurrente

Requerimientos que se repiten y pueden estandarizarse comercialmente.

La capacidad, plazo y alcance final se confirman para cada cotización.
QUIÉN NECESITA QUÉ
Un mismo proyecto se ve distinto según el rol.

La solicitud comercial debe recoger suficiente contexto para que el requerimiento sobreviva al traspaso entre áreas.

COMPRAS
Necesita comparar alcance y precio

Cantidad, especificación, destino, fecha y condiciones comerciales claramente separadas.

OPERACIONES
Necesita resolver una función

Uso real, restricciones, ubicación, mantenimiento y continuidad operacional.

OBRA / TERRENO
Necesita coordinar fabricación y montaje

Medidas, accesos, secuencia, interferencias y condiciones del sitio.

ADMINISTRACIÓN
Necesita trazabilidad del requerimiento

Qué se pidió, qué se cotizó, qué cambió y qué incluye finalmente el alcance.

ENTORNOS DE COMPRA
Lo que se fabrica cambia según la operación.

La misma capacidad de taller puede resolver necesidades distintas. Lo importante es definir uso, cantidad, destino y condiciones del proyecto.

01
Construcción y obra

Cierres, estructuras, soportes, accesos y piezas asociadas a una habilitación o frente de trabajo.

CLAVE · medidas · secuencia · terreno
02
Industria y mantenimiento

Reparaciones, bases, protecciones, bastidores y fabricaciones para resolver una necesidad operacional concreta.

CLAVE · función · interferencias · continuidad
03
Bodegas y logística

Equipamiento, divisiones, cierres y elementos repetibles para ordenar o habilitar espacios.

CLAVE · uso · espacio · cantidad
04
Instituciones y faenas

Camas, camarotes, lockers y otros productos cuando cantidad, destino y entrega son parte central de la compra.

CLAVE · volumen · destino · fecha
CÓMO AVANZA
Una compra ordenada desde el primer contacto.

Primero entendemos lo que se necesita. Después definimos qué falta confirmar para convertirlo en una propuesta fabricable y coordinable.

01
Necesidad
CONTEXTO
02
Revisión
FACTIBILIDAD
03
Cotización
ALCANCE
04
Coordinación
PROYECTO
05
Fabricación y entrega
EJECUCIÓN
PARA UNA PRIMERA REVISIÓN
Cuatro datos permiten empezar.

No necesitas preparar una licitación completa para conversar. Con estos antecedentes podemos identificar rápidamente qué falta.

01 · REFERENCIA
Qué necesitas

Producto, plano, fotografía, muestra o descripción funcional.

02 · CANTIDAD
Qué volumen

Unidades o metraje aproximado para dimensionar fabricación.

03 · DESTINO
Dónde se entrega

Ubicación para evaluar logística y montaje cuando corresponda.

04 · FECHA
Cuándo lo necesitas

Plazo objetivo sujeto a revisión contra alcance y capacidad.

RUTAS DE COMPRA
Entra por la necesidad que ya tienes definida.

Estas rutas mantienen separada la intención de producto, cierre y proyecto a medida para evitar cotizaciones ambiguas.

ALOJAMIENTO
Camas y camarotes

Compra por unidad o volumen con configuración confirmada al cotizar.

Ver productos →
PERÍMETRO
Cierres y accesos

Cierres, mallas, rejas y portones para terrenos, obras y recintos.

Ver cierres →
ESTRUCTURAS
Estructuras metálicas

Cobertizos, escaleras, plataformas, soportes y conjuntos especiales.

Ver estructuras →
A MEDIDA
Fabricación bajo requerimiento

Parte desde plano, foto, muestra, croquis o una necesidad funcional.

Ver fabricación →
PREGUNTAS FRECUENTES
Antes de enviar un requerimiento B2B.

La cotización vigente define capacidad, plazo, logística, montaje y documentación aplicables a cada compra.

¿Pueden cotizar compras por volumen?
¿Trabajan a partir de planos o especificaciones de empresa?
¿Pueden incluir despacho o montaje?
¿Qué información conviene enviar primero?
EMPRESAS
¿Tienes un requerimiento por volumen o proyecto?

Indica referencia, cantidad, destino y fecha objetivo. Si tienes plano, ficha o fotografías, también puedes enviarlas por WhatsApp.

Enviar requerimiento B2B
Enviar antecedentes por WhatsApp
Preparar compra
```
### Jerarquia y elementos visibles detectados

- H1: Fabricación para empresas, obras e instituciones.
- parrafo: Desde una serie de camarotes hasta cierres, estructuras, soportes o piezas bajo plano. Cuéntanos cantidad, destino y fecha objetivo para ordenar la evaluación desde el inicio.
- CTA: Cotizar para empresa
- CTA: Conversar por WhatsApp
- parrafo: Series, lotes y compras repetibles cuando cantidad y configuración están definidas.
- parrafo: Piezas, soportes y conjuntos cuando la geometría y especificación vienen definidas.
- parrafo: Cierres, estructuras y equipamiento asociados a una obra o necesidad de terreno.
- parrafo: Requerimientos que se repiten y pueden estandarizarse comercialmente.
- small: La capacidad, plazo y alcance final se confirman para cada cotización.
- H2: Un mismo proyecto se ve distinto según el rol.
- parrafo: La solicitud comercial debe recoger suficiente contexto para que el requerimiento sobreviva al traspaso entre áreas.
- H3: Necesita comparar alcance y precio
- parrafo: Cantidad, especificación, destino, fecha y condiciones comerciales claramente separadas.
- H3: Necesita resolver una función
- parrafo: Uso real, restricciones, ubicación, mantenimiento y continuidad operacional.
- H3: Necesita coordinar fabricación y montaje
- parrafo: Medidas, accesos, secuencia, interferencias y condiciones del sitio.
- H3: Necesita trazabilidad del requerimiento
- parrafo: Qué se pidió, qué se cotizó, qué cambió y qué incluye finalmente el alcance.
- H2: Lo que se fabrica cambia según la operación.
- parrafo: La misma capacidad de taller puede resolver necesidades distintas. Lo importante es definir uso, cantidad, destino y condiciones del proyecto.
- H3: Construcción y obra
- parrafo: Cierres, estructuras, soportes, accesos y piezas asociadas a una habilitación o frente de trabajo.
- small: CLAVE · medidas · secuencia · terreno
- H3: Industria y mantenimiento
- parrafo: Reparaciones, bases, protecciones, bastidores y fabricaciones para resolver una necesidad operacional concreta.
- small: CLAVE · función · interferencias · continuidad
- H3: Bodegas y logística
- parrafo: Equipamiento, divisiones, cierres y elementos repetibles para ordenar o habilitar espacios.
- small: CLAVE · uso · espacio · cantidad
- H3: Instituciones y faenas
- parrafo: Camas, camarotes, lockers y otros productos cuando cantidad, destino y entrega son parte central de la compra.
- small: CLAVE · volumen · destino · fecha
- H2: Una compra ordenada desde el primer contacto.
- parrafo: Primero entendemos lo que se necesita. Después definimos qué falta confirmar para convertirlo en una propuesta fabricable y coordinable.
- H2: Cuatro datos permiten empezar.
- parrafo: No necesitas preparar una licitación completa para conversar. Con estos antecedentes podemos identificar rápidamente qué falta.
- H3: Qué necesitas
- parrafo: Producto, plano, fotografía, muestra o descripción funcional.
- H3: Qué volumen
- parrafo: Unidades o metraje aproximado para dimensionar fabricación.
- H3: Dónde se entrega
- parrafo: Ubicación para evaluar logística y montaje cuando corresponda.
- H3: Cuándo lo necesitas
- parrafo: Plazo objetivo sujeto a revisión contra alcance y capacidad.
- H2: Entra por la necesidad que ya tienes definida.
- parrafo: Estas rutas mantienen separada la intención de producto, cierre y proyecto a medida para evitar cotizaciones ambiguas.
- CTA: ALOJAMIENTO Camas y camarotes Compra por unidad o volumen con configuración confirmada al cotizar. Ver productos →
- H3: Camas y camarotes
- parrafo: Compra por unidad o volumen con configuración confirmada al cotizar.
- CTA: PERÍMETRO Cierres y accesos Cierres, mallas, rejas y portones para terrenos, obras y recintos. Ver cierres →
- H3: Cierres y accesos
- parrafo: Cierres, mallas, rejas y portones para terrenos, obras y recintos.
- CTA: ESTRUCTURAS Estructuras metálicas Cobertizos, escaleras, plataformas, soportes y conjuntos especiales. Ver estructuras →
- H3: Estructuras metálicas
- parrafo: Cobertizos, escaleras, plataformas, soportes y conjuntos especiales.
- CTA: A MEDIDA Fabricación bajo requerimiento Parte desde plano, foto, muestra, croquis o una necesidad funcional. Ver fabricación →
- H3: Fabricación bajo requerimiento
- parrafo: Parte desde plano, foto, muestra, croquis o una necesidad funcional.
- H2: Antes de enviar un requerimiento B2B.
- parrafo: La cotización vigente define capacidad, plazo, logística, montaje y documentación aplicables a cada compra.
- summary: ¿Pueden cotizar compras por volumen?
- summary: ¿Trabajan a partir de planos o especificaciones de empresa?
- summary: ¿Pueden incluir despacho o montaje?
- summary: ¿Qué información conviene enviar primero?
- H2: ¿Tienes un requerimiento por volumen o proyecto?
- parrafo: Indica referencia, cantidad, destino y fecha objetivo. Si tienes plano, ficha o fotografías, también puedes enviarlas por WhatsApp.
- CTA: Enviar requerimiento B2B
- CTA: Enviar antecedentes por WhatsApp
- CTA: Preparar compra


### Nosotros (/nosotros)

### Texto visible completo literal de main.innerText

```text
RINON · SAN BERNARDO
Fabricamos en San Bernardo.

RINON fabrica productos, estructuras y soluciones metálicas para particulares, empresas e instituciones. Nuestro taller es el punto de partida: desde ahí evaluamos, fabricamos y coordinamos cada trabajo.

Cotizar
Hablar por WhatsApp
Cómo llegar
FABRICACIÓN DIRECTA
UNIDAD O VOLUMEN
PORTEZUELO 1506, SAN BERNARDO
RINON EN CONCRETO
01
TALLER

Portezuelo 1506, San Bernardo

02
FABRICACIÓN

Productos, estructuras y piezas a medida

03
PROCESOS

Corte, dimensionado, doblez, soldadura MIG y armado

04
CLIENTES

Particulares, empresas e instituciones

La evidencia fotográfica del taller se incorpora únicamente con material RINON aprobado.
QUÉ HACEMOS
Productos cuando existe una configuración. A medida cuando necesitas otra respuesta.

No necesitas hablar en términos técnicos para consultar. Una foto, plano, croquis, muestra o medidas pueden ser suficientes para ubicar el trabajo en la línea correcta.

01
Productos

Camas, camarotes, mobiliario y equipamiento dentro de configuraciones evaluables.

02
Cierres

Rejas, portones, mallas y soluciones perimetrales según lugar y uso.

03
Estructuras

Cobertizos, soportes, escaleras, plataformas y proyectos especiales según requerimiento.

04
Servicios

Soldadura MIG, corte, pintura electrostática, instalación y reparaciones según alcance.

TALLER
Capacidad práctica para convertir una necesidad en algo fabricable.

Trabajamos principalmente con acero y podemos evaluar acero inoxidable y aluminio estructural según geometría y proceso. No publicamos límites de máquina, cargas o certificaciones que no estén respaldados para el trabajo específico.

01
Corte y dimensionado
PREPARACIÓN
02
Soldadura MIG
UNIÓN
03
Proyectos a medida
FABRICACIÓN
04
Reparación y recuperación
SERVICIO
CÓMO TRABAJAMOS
Un proceso simple antes de entrar a taller.

Primero entendemos qué necesitas. Después pedimos solo la información que realmente cambia la fabricación o la cotización.

01
Cuéntanos

Qué necesitas, cantidad, uso, ubicación y el mejor antecedente disponible.

02
Definimos

Separamos lo confirmado de lo que todavía necesita medidas, material o contexto.

03
Fabricamos

El trabajo pasa a taller con una definición clara de lo que se debe producir.

04
Entregamos

Despacho, armado o instalación se coordinan cuando forman parte del alcance.

TALLER · SAN BERNARDO
Ven a RINON.

Portezuelo 1506, San Bernardo
Región Metropolitana

Antes de visitar, coordina tu requerimiento para que podamos orientarte con el contexto correcto.

Cómo llegar en Google Maps
↗
Cómo llegar en Waze
↗
COBERTURA
Desde San Bernardo hacia el proyecto.

La Región Metropolitana es nuestra base operativa. Despachos, proyectos regionales e instalación se evalúan de acuerdo con el tipo de trabajo, destino y alcance requerido.

Cuéntanos qué necesitas
Hablar por WhatsApp
Contacto
```
### Jerarquia y elementos visibles detectados

- H1: Fabricamos en San Bernardo.
- parrafo: RINON fabrica productos, estructuras y soluciones metálicas para particulares, empresas e instituciones. Nuestro taller es el punto de partida: desde ahí evaluamos, fabricamos y coordinamos cada trabajo.
- CTA: Cotizar
- CTA: Hablar por WhatsApp
- CTA: Cómo llegar
- parrafo: Portezuelo 1506, San Bernardo
- parrafo: Productos, estructuras y piezas a medida
- parrafo: Corte, dimensionado, doblez, soldadura MIG y armado
- parrafo: Particulares, empresas e instituciones
- small: La evidencia fotográfica del taller se incorpora únicamente con material RINON aprobado.
- H2: Productos cuando existe una configuración. A medida cuando necesitas otra respuesta.
- parrafo: No necesitas hablar en términos técnicos para consultar. Una foto, plano, croquis, muestra o medidas pueden ser suficientes para ubicar el trabajo en la línea correcta.
- H3: Productos
- parrafo: Camas, camarotes, mobiliario y equipamiento dentro de configuraciones evaluables.
- H3: Cierres
- parrafo: Rejas, portones, mallas y soluciones perimetrales según lugar y uso.
- H3: Estructuras
- parrafo: Cobertizos, soportes, escaleras, plataformas y proyectos especiales según requerimiento.
- H3: Servicios
- parrafo: Soldadura MIG, corte, pintura electrostática, instalación y reparaciones según alcance.
- H2: Capacidad práctica para convertir una necesidad en algo fabricable.
- parrafo: Trabajamos principalmente con acero y podemos evaluar acero inoxidable y aluminio estructural según geometría y proceso. No publicamos límites de máquina, cargas o certificaciones que no estén respaldados para el trabajo específico.
- H2: Un proceso simple antes de entrar a taller.
- parrafo: Primero entendemos qué necesitas. Después pedimos solo la información que realmente cambia la fabricación o la cotización.
- li: 01 Cuéntanos Qué necesitas, cantidad, uso, ubicación y el mejor antecedente disponible.
- parrafo: Qué necesitas, cantidad, uso, ubicación y el mejor antecedente disponible.
- li: 02 Definimos Separamos lo confirmado de lo que todavía necesita medidas, material o contexto.
- parrafo: Separamos lo confirmado de lo que todavía necesita medidas, material o contexto.
- li: 03 Fabricamos El trabajo pasa a taller con una definición clara de lo que se debe producir.
- parrafo: El trabajo pasa a taller con una definición clara de lo que se debe producir.
- li: 04 Entregamos Despacho, armado o instalación se coordinan cuando forman parte del alcance.
- parrafo: Despacho, armado o instalación se coordinan cuando forman parte del alcance.
- H2: Ven a RINON.
- parrafo: Portezuelo 1506, San Bernardo Región Metropolitana
- parrafo: Antes de visitar, coordina tu requerimiento para que podamos orientarte con el contexto correcto.
- CTA: Cómo llegar en Google Maps ↗
- CTA: Cómo llegar en Waze ↗
- H2: Desde San Bernardo hacia el proyecto.
- parrafo: La Región Metropolitana es nuestra base operativa. Despachos, proyectos regionales e instalación se evalúan de acuerdo con el tipo de trabajo, destino y alcance requerido.
- CTA: Cuéntanos qué necesitas
- CTA: Hablar por WhatsApp
- CTA: Contacto


### Soluciones (/soluciones)

### Texto visible completo literal de main.innerText

```text
PRODUCTOS · SERVICIOS · PROYECTOS
Productos y soluciones metálicas para cada tipo de requerimiento.

Parte por el producto, el servicio o el resultado que necesitas. Si tu requerimiento no encaja en una categoría estándar, puedes pasar directamente a fabricación a medida con una foto, plano, croquis, muestra o medidas.

Cotizar requerimiento
Proyectos a medida
Orientarme por WhatsApp
PRODUCTOS Y FAMILIAS
Elige primero la categoría que más se parece a tu necesidad.

Cada landing conserva una intención propia para que puedas comparar alcance, antecedentes necesarios y forma de cotizar sin mezclar productos distintos.

01 · CAMAS Y DESCANSO
Camas y descanso

Camarotes, camas metálicas y camas balinesas para hogar, instituciones, exterior y compras por volumen.

Camarotes
Camas y camarotes metálicos.
↗
Camas metálicas
Camas para hogar, instituciones y volumen.
↗
Camas balinesas
Estructuras metálicas para terrazas y exterior.
↗
02 · MOBILIARIO
Mobiliario y equipamiento

Mesas, escritorios, racks, soportes y equipamiento para hogar, empresa e instituciones.

Mesas
Mesas con estructura metálica.
↗
Escritorios
Escritorios para hogar y empresa.
↗
Equipamiento
Racks, soportes, lockers y equipamiento.
↗
03 · CIERRES Y ACCESOS
Cierres y accesos

Cierres, rejas, mallas y portones definidos según medidas, accesos, terreno y uso.

Cierres
Soluciones para perímetros.
↗
Rejas
Rejas fabricadas según medida y uso.
↗
Portones
Accesos metálicos.
↗
Malla 3D
Paneles para cierres y delimitaciones.
↗
Divisiones
Separaciones para espacios y bodegas.
↗
04 · ESTRUCTURAS
Estructuras

Estructuras y fabricaciones especiales desde plano, foto, croquis, muestra o medidas.

Estructuras metálicas
Pérgolas, cobertizos, escaleras, plataformas y estructuras.
↗
Fabricaciones especiales
Piezas y conjuntos no estándar.
↗
SERVICIOS DE TALLER Y TERRENO
Cuando lo que necesitas es un proceso o una intervención.

Soldadura, corte, pintura, instalación y reparación tienen rutas propias. La fabricación a medida vive en Proyectos a medida para no duplicar conceptos ni competir por la misma intención de búsqueda.

SERVICIO
Soldadura MIG

Soldadura para piezas, conjuntos y reparaciones.

Ver servicio →
SERVICIO
Corte y dimensionado

Preparación de piezas según medidas y requerimiento.

Ver servicio →
SERVICIO
Pintura electrostática

Terminación electrostática al horno.

Ver servicio →
SERVICIO
Instalación y montaje

Montaje según proyecto, ubicación y acceso.

Ver servicio →
SERVICIO
Reparaciones

Reparación, modificación y recuperación.

Ver servicio →
NO SABES QUÉ CATEGORÍA ELEGIR
Describe el resultado y nosotros partimos desde ahí.

No necesitas conocer el nombre técnico de la solución. Explica qué debe resolver, dónde se usará y qué antecedente tienes disponible.

01
Producto conocido

Indica modelo o tipo, cantidad y destino.

02
Trabajo de taller

Explica proceso, pieza, material o intervención que necesitas evaluar.

03
Proyecto a medida

Envía foto, plano, croquis, muestra o dimensiones disponibles.

04
Empresa o volumen

Incluye cantidad, destino y fecha objetivo para ordenar la compra.

Compra para empresa
Fabricación a medida
SIGUIENTE PASO
¿Ya sabes qué necesitas o prefieres que te orientemos?

Envía el requerimiento por formulario o comparte una referencia por WhatsApp. Si falta información, separamos lo confirmado de lo que todavía debe definirse.

Cotizar requerimiento
Hablar por WhatsApp
Proyectos a medida
```
### Jerarquia y elementos visibles detectados

- H1: Productos y soluciones metálicas para cada tipo de requerimiento.
- parrafo: Parte por el producto, el servicio o el resultado que necesitas. Si tu requerimiento no encaja en una categoría estándar, puedes pasar directamente a fabricación a medida con una foto, plano, croquis, muestra o medidas.
- CTA: Cotizar requerimiento
- CTA: Proyectos a medida
- CTA: Orientarme por WhatsApp
- H2: Elige primero la categoría que más se parece a tu necesidad.
- parrafo: Cada landing conserva una intención propia para que puedas comparar alcance, antecedentes necesarios y forma de cotizar sin mezclar productos distintos.
- H2: Camas y descanso
- parrafo: Camarotes, camas metálicas y camas balinesas para hogar, instituciones, exterior y compras por volumen.
- CTA: Camarotes Camas y camarotes metálicos. ↗
- small: Camas y camarotes metálicos.
- CTA: Camas metálicas Camas para hogar, instituciones y volumen. ↗
- small: Camas para hogar, instituciones y volumen.
- CTA: Camas balinesas Estructuras metálicas para terrazas y exterior. ↗
- small: Estructuras metálicas para terrazas y exterior.
- H2: Mobiliario y equipamiento
- parrafo: Mesas, escritorios, racks, soportes y equipamiento para hogar, empresa e instituciones.
- CTA: Mesas Mesas con estructura metálica. ↗
- small: Mesas con estructura metálica.
- CTA: Escritorios Escritorios para hogar y empresa. ↗
- small: Escritorios para hogar y empresa.
- CTA: Equipamiento Racks, soportes, lockers y equipamiento. ↗
- small: Racks, soportes, lockers y equipamiento.
- H2: Cierres y accesos
- parrafo: Cierres, rejas, mallas y portones definidos según medidas, accesos, terreno y uso.
- CTA: Cierres Soluciones para perímetros. ↗
- small: Soluciones para perímetros.
- CTA: Rejas Rejas fabricadas según medida y uso. ↗
- small: Rejas fabricadas según medida y uso.
- CTA: Portones Accesos metálicos. ↗
- small: Accesos metálicos.
- CTA: Malla 3D Paneles para cierres y delimitaciones. ↗
- small: Paneles para cierres y delimitaciones.
- CTA: Divisiones Separaciones para espacios y bodegas. ↗
- small: Separaciones para espacios y bodegas.
- H2: Estructuras
- parrafo: Estructuras y fabricaciones especiales desde plano, foto, croquis, muestra o medidas.
- CTA: Estructuras metálicas Pérgolas, cobertizos, escaleras, plataformas y estructuras. ↗
- small: Pérgolas, cobertizos, escaleras, plataformas y estructuras.
- CTA: Fabricaciones especiales Piezas y conjuntos no estándar. ↗
- small: Piezas y conjuntos no estándar.
- H2: Cuando lo que necesitas es un proceso o una intervención.
- parrafo: Soldadura, corte, pintura, instalación y reparación tienen rutas propias. La fabricación a medida vive en Proyectos a medida para no duplicar conceptos ni competir por la misma intención de búsqueda.
- CTA: SERVICIO Soldadura MIG Soldadura para piezas, conjuntos y reparaciones. Ver servicio →
- H3: Soldadura MIG
- parrafo: Soldadura para piezas, conjuntos y reparaciones.
- CTA: SERVICIO Corte y dimensionado Preparación de piezas según medidas y requerimiento. Ver servicio →
- H3: Corte y dimensionado
- parrafo: Preparación de piezas según medidas y requerimiento.
- CTA: SERVICIO Pintura electrostática Terminación electrostática al horno. Ver servicio →
- H3: Pintura electrostática
- parrafo: Terminación electrostática al horno.
- CTA: SERVICIO Instalación y montaje Montaje según proyecto, ubicación y acceso. Ver servicio →
- H3: Instalación y montaje
- parrafo: Montaje según proyecto, ubicación y acceso.
- CTA: SERVICIO Reparaciones Reparación, modificación y recuperación. Ver servicio →
- H3: Reparaciones
- parrafo: Reparación, modificación y recuperación.
- H2: Describe el resultado y nosotros partimos desde ahí.
- parrafo: No necesitas conocer el nombre técnico de la solución. Explica qué debe resolver, dónde se usará y qué antecedente tienes disponible.
- H3: Producto conocido
- parrafo: Indica modelo o tipo, cantidad y destino.
- H3: Trabajo de taller
- parrafo: Explica proceso, pieza, material o intervención que necesitas evaluar.
- H3: Proyecto a medida
- parrafo: Envía foto, plano, croquis, muestra o dimensiones disponibles.
- H3: Empresa o volumen
- parrafo: Incluye cantidad, destino y fecha objetivo para ordenar la compra.
- CTA: Compra para empresa
- CTA: Fabricación a medida
- H2: ¿Ya sabes qué necesitas o prefieres que te orientemos?
- parrafo: Envía el requerimiento por formulario o comparte una referencia por WhatsApp. Si falta información, separamos lo confirmado de lo que todavía debe definirse.
- CTA: Cotizar requerimiento
- CTA: Hablar por WhatsApp
- CTA: Proyectos a medida


### Fabricacion metalica / Proyectos a medida (/fabricacion-metalica)

### Texto visible completo literal de main.innerText

```text
PROYECTOS A MEDIDA · SAN BERNARDO
Tu proyecto en metal, hecho a medida.

No necesitas llegar con todo resuelto. Una foto, plano, croquis, muestra o algunas medidas pueden ser suficientes para empezar.

Cotizar proyecto
Enviar referencia por WhatsApp
PUEDES PARTIR CON
01
Foto o referencia

Muéstranos algo parecido a lo que necesitas.

02
Plano o croquis

Puede ser técnico o simplemente un dibujo con medidas.

03
Muestra o pieza

Útil cuando necesitas replicar, adaptar o reparar.

04
Medidas y problema

Si no tienes nada más, explica qué debe resolver.

QUÉ PODEMOS EVALUAR
Primero entendemos qué necesitas resolver.

La categoría importa menos que el uso, las medidas, la cantidad y los antecedentes disponibles. Con eso definimos si el trabajo está dentro de nuestras capacidades y qué falta confirmar.

01
Estructuras

Cobertizos, pérgolas, escaleras, plataformas, soportes y otros conjuntos fabricables.

02
Piezas y soportes

Bases, marcos, bastidores y componentes para una función específica.

03
Equipamiento

Racks, mobiliario, protecciones y soluciones para espacios de trabajo.

04
Series y lotes

Piezas o conjuntos repetibles cuando cantidad y geometría están definidas.

CÓMO AVANZA
De una idea a algo fabricable.

Separar lo que ya está definido de lo que todavía necesita revisión evita fabricar sobre supuestos.

01 · CUÉNTANOS
Qué necesitas

Uso, referencia, medidas, cantidad y ubicación.

02 · DEFINIMOS
Qué falta confirmar

Material, geometría, terminación, montaje u otros datos necesarios.

03 · COTIZAMOS
Alcance claro

La propuesta separa lo incluido de lo que queda fuera.

04 · FABRICAMOS
Con el alcance acordado

Producción, terminación y entrega según el trabajo confirmado.

PREGUNTAS FRECUENTES
Qué necesitas tener claro para empezar.

La web orienta la conversación. Materiales, dimensiones, procesos e instalación se confirman únicamente después de revisar el requerimiento.

¿Necesito un plano técnico para cotizar fabricación metálica?
¿Qué materiales pueden evaluar?
¿La instalación está incluida en todos los proyectos?
PROYECTOS A MEDIDA
¿Tienes una foto, plano o idea?

Envíala junto con medidas aproximadas, cantidad y ubicación. Si falta algo importante, te indicaremos qué necesitamos para evaluar.

Cotizar proyecto
WhatsApp
```
### Jerarquia y elementos visibles detectados

- H1: Tu proyecto en metal, hecho a medida.
- parrafo: No necesitas llegar con todo resuelto. Una foto, plano, croquis, muestra o algunas medidas pueden ser suficientes para empezar.
- CTA: Cotizar proyecto
- CTA: Enviar referencia por WhatsApp
- parrafo: Muéstranos algo parecido a lo que necesitas.
- parrafo: Puede ser técnico o simplemente un dibujo con medidas.
- parrafo: Útil cuando necesitas replicar, adaptar o reparar.
- parrafo: Si no tienes nada más, explica qué debe resolver.
- H2: Primero entendemos qué necesitas resolver.
- parrafo: La categoría importa menos que el uso, las medidas, la cantidad y los antecedentes disponibles. Con eso definimos si el trabajo está dentro de nuestras capacidades y qué falta confirmar.
- H3: Estructuras
- parrafo: Cobertizos, pérgolas, escaleras, plataformas, soportes y otros conjuntos fabricables.
- H3: Piezas y soportes
- parrafo: Bases, marcos, bastidores y componentes para una función específica.
- H3: Equipamiento
- parrafo: Racks, mobiliario, protecciones y soluciones para espacios de trabajo.
- H3: Series y lotes
- parrafo: Piezas o conjuntos repetibles cuando cantidad y geometría están definidas.
- H2: De una idea a algo fabricable.
- parrafo: Separar lo que ya está definido de lo que todavía necesita revisión evita fabricar sobre supuestos.
- H3: Qué necesitas
- parrafo: Uso, referencia, medidas, cantidad y ubicación.
- H3: Qué falta confirmar
- parrafo: Material, geometría, terminación, montaje u otros datos necesarios.
- H3: Alcance claro
- parrafo: La propuesta separa lo incluido de lo que queda fuera.
- H3: Con el alcance acordado
- parrafo: Producción, terminación y entrega según el trabajo confirmado.
- H2: Qué necesitas tener claro para empezar.
- parrafo: La web orienta la conversación. Materiales, dimensiones, procesos e instalación se confirman únicamente después de revisar el requerimiento.
- summary: ¿Necesito un plano técnico para cotizar fabricación metálica?
- summary: ¿Qué materiales pueden evaluar?
- summary: ¿La instalación está incluida en todos los proyectos?
- H2: ¿Tienes una foto, plano o idea?
- parrafo: Envíala junto con medidas aproximadas, cantidad y ubicación. Si falta algo importante, te indicaremos qué necesitamos para evaluar.
- CTA: Cotizar proyecto
- CTA: WhatsApp


### Cotizar (/cotizar)

### Texto visible completo literal de main.innerText

```text
COTIZAR CON RINON
Cuéntanos qué necesitas fabricar.

No necesitas llegar con todo resuelto. Envíanos lo que ya tengas y te indicaremos qué falta para poder cotizar.

3 PASOS
SIN TECNICISMOS INNECESARIOS
PARTICULAR O EMPRESA
PUEDES PARTIR CON
01
FOTO O REFERENCIA

Muéstranos algo parecido a lo que necesitas.

02
PLANO O CROQUIS

Puede ser técnico o simplemente una idea dibujada.

03
MEDIDAS

Aproximadas sirven para una primera revisión.

04
PROBLEMA

Explícanos qué necesitas resolver y para qué se usará.

No prometemos plazo, precio ni factibilidad antes de revisar el caso.
ANTES DE EMPEZAR
Con poco podemos empezar bien.

El formulario cambia según lo que selecciones. No te pediremos datos de cierres si estás cotizando una cama, ni datos de cama si necesitas una estructura.

Elige qué necesitas.
Agrega contexto útil.
Déjanos un canal de contacto.
En staging validamos el flujo sin guardar ni enviar tus datos.
01
Qué necesitas
02
Contexto
03
Contacto
01
¿Qué necesitas?
Primero ubicamos tu solicitud. Solo después pedimos los datos que realmente ayudan a cotizar.
QUIERO COTIZAR *
Selecciona una opción
Un producto
Un proyecto a medida
Compra para empresa / volumen
PRODUCTO O SERVICIO *
Selecciona una categoría
Camas / camarotes
Mesas / escritorios / equipamiento
Cierre / reja / portón / malla
Estructura metálica
Fabricación / soldadura / corte / reparación
Fabricación especial
Pintura electrostática
PASO 1 DE 3
Continuar
→
```
### Jerarquia y elementos visibles detectados

- H1: Cuéntanos qué necesitas fabricar.
- parrafo: No necesitas llegar con todo resuelto. Envíanos lo que ya tengas y te indicaremos qué falta para poder cotizar.
- parrafo: Muéstranos algo parecido a lo que necesitas.
- parrafo: Puede ser técnico o simplemente una idea dibujada.
- parrafo: Aproximadas sirven para una primera revisión.
- parrafo: Explícanos qué necesitas resolver y para qué se usará.
- small: No prometemos plazo, precio ni factibilidad antes de revisar el caso.
- H2: Con poco podemos empezar bien.
- parrafo: El formulario cambia según lo que selecciones. No te pediremos datos de cierres si estás cotizando una cama, ni datos de cama si necesitas una estructura.
- li: Elige qué necesitas.
- li: Agrega contexto útil.
- li: Déjanos un canal de contacto.
- small: En staging validamos el flujo sin guardar ni enviar tus datos.
- microcopy de formulario: 01 ¿Qué necesitas? Primero ubicamos tu solicitud. Solo después pedimos los datos que realmente ayudan a cotizar.
- small: Primero ubicamos tu solicitud. Solo después pedimos los datos que realmente ayudan a cotizar.
- microcopy de formulario: QUIERO COTIZAR * Selecciona una opción Un producto Un proyecto a medida Compra para empresa / volumen
- microcopy de formulario: QUIERO COTIZAR * Selecciona una opción Un producto Un proyecto a medida Compra para empresa / volumen
- microcopy de formulario: PRODUCTO O SERVICIO * Selecciona una categoría Camas / camarotes Mesas / escritorios / equipamiento Cierre / reja / portón / malla Estructura metálica Fabricación / soldadura / corte / reparación Fabricación especial Pintura electrostática
- microcopy de formulario: PRODUCTO O SERVICIO * Selecciona una categoría Camas / camarotes Mesas / escritorios / equipamiento Cierre / reja / portón / malla Estructura metálica Fabricación / soldadura / corte / reparación Fabricación especial Pintura electrostática
- CTA: Continuar →


## 4. Arbol de rutas app/ y mapa de navegacion
### Salida literal: rg --files app | sort

```text
app/[legacy]/page.tsx
app/admin/analitica/page.tsx
app/admin/api/leads/[id]/attachments/[attachmentId]/route.ts
app/admin/api/leads/[id]/route.ts
app/admin/api/opportunities/[id]/quotes/route.ts
app/admin/api/opportunities/[id]/route.ts
app/admin/api/opportunities/route.ts
app/admin/layout.tsx
app/admin/oportunidades/[id]/page.tsx
app/admin/oportunidades/page.tsx
app/admin/page.tsx
app/api/admin/login/route.ts
app/api/admin/logout/route.ts
app/api/analytics/route.ts
app/api/contacto/route.ts
app/api/privacidad/route.ts
app/blog/[slug]/page.tsx
app/blog/page.tsx
app/camarote-con-escritorio/page.tsx
app/camarotes/page.tsx
app/camas-balinesas/page.tsx
app/camas-metalicas/page.tsx
app/cierres-perimetrales/page.tsx
app/contacto/page.tsx
app/corte-metalico/page.tsx
app/cotizar/page.tsx
app/empresas/page.tsx
app/equipamiento-metalico/page.tsx
app/escritorios-metalicos/page.tsx
app/estructuras-metalicas/page.tsx
app/fabricacion-metalica/page.tsx
app/fabricaciones-especiales/page.tsx
app/globals.css
app/instalacion/page.tsx
app/layout.tsx
app/mallas-3d/page.tsx
app/mallas-separadoras/page.tsx
app/mesas-metalicas/page.tsx
app/nosotros/page.tsx
app/not-found.tsx
app/opengraph-image.tsx
app/page.tsx
app/pintura-electrostatica/page.tsx
app/politica-de-cookies/page.tsx
app/politica-de-privacidad/page.tsx
app/portones-metalicos/page.tsx
app/preguntas-frecuentes/page.tsx
app/proyectos/page.tsx
app/recursos/[slug]/page.tsx
app/recursos/page.tsx
app/rejas-metalicas/page.tsx
app/reparaciones-metalicas/page.tsx
app/robots.ts
app/sitemap.ts
app/soldadura-mig/page.tsx
app/solicitud-de-datos/page.tsx
app/soluciones/page.tsx
app/styles/part-01.css
app/styles/part-02.css
app/styles/part-03.css
app/styles/part-04.css
app/styles/part-05.css
app/styles/part-06.css
app/styles/part-07.css
app/styles/part-08.css
app/styles/part-09.css
app/styles/part-10.css
app/styles/part-11.css
app/styles/part-12.css
app/styles/part-13.css
app/styles/part-14.css
app/styles/part-15.css
app/terminos/page.tsx
app/tratamiento-superficies/page.tsx
```
### Fuente literal: lib/navigation.ts

```ts
export type NavItem={label:string;href:string;description?:string};
export type NavGroup={label:string;items:readonly NavItem[]};
export type NavigationSection="products"|"services"|"project"|"company"|"about"|null;

export const productNavGroups:readonly NavGroup[]=[
  {label:"Camas y descanso",items:[
    {label:"Camarotes",href:"/camarotes",description:"Camas y camarotes metálicos."},
    {label:"Camas metálicas",href:"/camas-metalicas",description:"Camas para hogar, instituciones y volumen."},
    {label:"Camas balinesas",href:"/camas-balinesas",description:"Estructuras metálicas para terrazas y exterior."},
  ]},
  {label:"Mobiliario y equipamiento",items:[
    {label:"Mesas",href:"/mesas-metalicas",description:"Mesas con estructura metálica."},
    {label:"Escritorios",href:"/escritorios-metalicos",description:"Escritorios para hogar y empresa."},
    {label:"Equipamiento",href:"/equipamiento-metalico",description:"Racks, soportes, lockers y equipamiento."},
  ]},
  {label:"Cierres y accesos",items:[
    {label:"Cierres",href:"/cierres-perimetrales",description:"Soluciones para perímetros."},
    {label:"Rejas",href:"/rejas-metalicas",description:"Rejas fabricadas según medida y uso."},
    {label:"Portones",href:"/portones-metalicos",description:"Accesos metálicos."},
    {label:"Malla 3D",href:"/mallas-3d",description:"Paneles para cierres y delimitaciones."},
    {label:"Divisiones",href:"/mallas-separadoras",description:"Separaciones para espacios y bodegas."},
  ]},
  {label:"Estructuras",items:[
    {label:"Estructuras metálicas",href:"/estructuras-metalicas",description:"Pérgolas, cobertizos, escaleras, plataformas y estructuras."},
    {label:"Fabricaciones especiales",href:"/fabricaciones-especiales",description:"Piezas y conjuntos no estándar."},
  ]},
] as const;

export const serviceNavItems:readonly NavItem[]=[
  {label:"Soldadura MIG",href:"/soldadura-mig",description:"Soldadura para piezas, conjuntos y reparaciones."},
  {label:"Corte y dimensionado",href:"/corte-metalico",description:"Preparación de piezas según medidas y requerimiento."},
  {label:"Pintura electrostática",href:"/pintura-electrostatica",description:"Terminación electrostática al horno."},
  {label:"Instalación y montaje",href:"/instalacion",description:"Montaje según proyecto, ubicación y acceso."},
  {label:"Reparaciones",href:"/reparaciones-metalicas",description:"Reparación, modificación y recuperación."},
] as const;

export const projectNavItem:NavItem={label:"Proyectos a medida",href:"/fabricacion-metalica",description:"Parte con una foto, plano, croquis, muestra o medidas."};
export const companyNavItem:NavItem={label:"Empresas",href:"/empresas",description:"Volumen, proyectos, instituciones y requerimientos B2B."};
export const aboutNavItem:NavItem={label:"Nosotros",href:"/nosotros",description:"Taller, proceso, ubicación y cómo llegar."};

export const primaryStandaloneNav:readonly NavItem[]=[projectNavItem,companyNavItem,aboutNavItem] as const;

const productHrefs=productNavGroups.flatMap(group=>group.items.map(item=>item.href));
const serviceHrefs=serviceNavItems.map(item=>item.href);
const legacyProductPrefixes=["/camarote-","/camarotes-","/cama-","/mobiliario-"] as const;

export function navigationSection(pathname:string):NavigationSection{
  const path=(pathname||"/").split("?")[0].split("#")[0].replace(/\/$/,"")||"/";
  if(productHrefs.includes(path as never)||legacyProductPrefixes.some(prefix=>path.startsWith(prefix)))return "products";
  if(serviceHrefs.includes(path as never))return "services";
  if(path===projectNavItem.href)return "project";
  if(path===companyNavItem.href)return "company";
  if(path===aboutNavItem.href)return "about";
  return null;
}

export function isExactNavPath(pathname:string,href:string){
  const path=(pathname||"/").split("?")[0].split("#")[0].replace(/\/$/,"")||"/";
  return path===href;
}

export const footerProductItems:readonly NavItem[]=[
  {label:"Camarotes",href:"/camarotes"},
  {label:"Camas metálicas",href:"/camas-metalicas"},
  {label:"Equipamiento",href:"/equipamiento-metalico"},
  {label:"Cierres",href:"/cierres-perimetrales"},
  {label:"Rejas",href:"/rejas-metalicas"},
  {label:"Portones",href:"/portones-metalicos"},
  {label:"Malla 3D",href:"/mallas-3d"},
  {label:"Estructuras",href:"/estructuras-metalicas"},
] as const;
```
### Fuente literal: components/DesktopMegaNav.tsx

```tsx
"use client";

import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import {usePathname} from "next/navigation";
import {aboutNavItem,companyNavItem,isExactNavPath,navigationSection,productNavGroups,projectNavItem,serviceNavItems} from "@/lib/navigation";

type MenuName="products"|"services"|null;

export function DesktopMegaNav(){
  const [open,setOpen]=useState<MenuName>(null);
  const pathname=usePathname();
  const active=navigationSection(pathname);
  const wrapRef=useRef<HTMLDivElement>(null);
  const productTriggerRef=useRef<HTMLButtonElement>(null);
  const serviceTriggerRef=useRef<HTMLButtonElement>(null);
  useEffect(()=>setOpen(null),[pathname]);
  useEffect(()=>{
    const onPointer=(event:MouseEvent)=>{if(open&&!wrapRef.current?.contains(event.target as Node))setOpen(null)};
    const onKey=(event:KeyboardEvent)=>{
      if(event.key!=="Escape"||!open)return;
      const trigger=open==="products"?productTriggerRef.current:serviceTriggerRef.current;
      setOpen(null);
      window.requestAnimationFrame(()=>trigger?.focus());
    };
    document.addEventListener("mousedown",onPointer);document.addEventListener("keydown",onKey);
    return()=>{document.removeEventListener("mousedown",onPointer);document.removeEventListener("keydown",onKey)};
  },[open]);
  const closeMenu=()=>setOpen(null);
  return <div className="prd2-desktop-nav-shell" ref={wrapRef}>
    <nav className="prd2-desktop-nav" aria-label="Principal">
      <button ref={productTriggerRef} type="button" aria-haspopup="true" className={[open==="products"?"is-open":"",active==="products"?"is-active":""].filter(Boolean).join(" ")} aria-expanded={open==="products"} aria-controls="mega-products" onClick={()=>setOpen(open==="products"?null:"products")}>Productos <span aria-hidden="true">⌄</span></button>
      <Link className={active==="project"?"is-active":undefined} aria-current={isExactNavPath(pathname,projectNavItem.href)?"page":undefined} href={projectNavItem.href}>{projectNavItem.label}</Link>
      <Link className={active==="company"?"is-active":undefined} aria-current={isExactNavPath(pathname,companyNavItem.href)?"page":undefined} href={companyNavItem.href}>{companyNavItem.label}</Link>
      <button ref={serviceTriggerRef} type="button" aria-haspopup="true" className={[open==="services"?"is-open":"",active==="services"?"is-active":""].filter(Boolean).join(" ")} aria-expanded={open==="services"} aria-controls="mega-services" onClick={()=>setOpen(open==="services"?null:"services")}>Servicios <span aria-hidden="true">⌄</span></button>
      <Link className={active==="about"?"is-active":undefined} aria-current={isExactNavPath(pathname,aboutNavItem.href)?"page":undefined} href={aboutNavItem.href}>{aboutNavItem.label}</Link>
    </nav>
    {open==="products"?<div className="prd2-mega-menu prd2-mega-products" id="mega-products" role="region" aria-label="Productos RINON">
      <div className="prd2-mega-grid">
        {productNavGroups.map(group=><div className="prd2-mega-group" key={group.label}><span>{group.label}</span>{group.items.map(item=><Link aria-current={isExactNavPath(pathname,item.href)?"page":undefined} className={isExactNavPath(pathname,item.href)?"is-active":undefined} data-event="menu_product_click" data-product={item.label} key={item.href} href={item.href} onClick={closeMenu}><strong>{item.label}</strong><small>{item.description}</small></Link>)}</div>)}
      </div>
      <Link className="prd2-mega-all" href="/soluciones" onClick={closeMenu}>Ver todos los productos <span>↗</span></Link>
    </div>:null}
    {open==="services"?<div className="prd2-mega-menu prd2-mega-services" id="mega-services" role="region" aria-label="Servicios RINON">
      <div className="prd2-service-grid">{serviceNavItems.map(item=><Link aria-current={isExactNavPath(pathname,item.href)?"page":undefined} className={isExactNavPath(pathname,item.href)?"is-active":undefined} data-event="menu_service_click" data-service={item.label} key={item.href} href={item.href} onClick={closeMenu}><strong>{item.label}</strong><small>{item.description}</small><span>↗</span></Link>)}</div>
    </div>:null}
  </div>;
}
```
### Fuente literal: components/MobileNav.tsx

```tsx
"use client";
import Link from "next/link";
import {KeyboardEvent as ReactKeyboardEvent,useEffect,useRef,useState} from "react";
import {usePathname} from "next/navigation";
import {aboutNavItem,companyNavItem,isExactNavPath,navigationSection,productNavGroups,projectNavItem,serviceNavItems} from "@/lib/navigation";
import {whatsappUrl} from "@/lib/whatsapp";

export function MobileNav(){
 const [open,setOpen]=useState(false); const pathname=usePathname(); const active=navigationSection(pathname); const toggleRef=useRef<HTMLButtonElement>(null); const panelRef=useRef<HTMLDivElement>(null); const whatsapp=whatsappUrl();
 useEffect(()=>setOpen(false),[pathname]);
 useEffect(()=>{if(!open)return;const prev=document.body.style.overflow;document.body.style.overflow="hidden";window.requestAnimationFrame(()=>panelRef.current?.querySelector<HTMLElement>("a,button,summary")?.focus());const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(false);window.requestAnimationFrame(()=>toggleRef.current?.focus())}};document.addEventListener("keydown",onKey);return()=>{document.removeEventListener("keydown",onKey);document.body.style.overflow=prev}},[open]);
 function trapFocus(event:ReactKeyboardEvent<HTMLDivElement>){if(event.key!=="Tab")return;const f=Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a,button,summary,[tabindex]:not([tabindex="-1"])')??[]).filter(n=>!n.hasAttribute("disabled"));if(!f.length)return;const first=f[0],last=f[f.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}
 return <div className="mobile-nav-wrap prd2-mobile-nav">
  <button ref={toggleRef} type="button" className="mobile-nav-toggle" aria-haspopup="dialog" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?"Cerrar menú":"Abrir menú"} onClick={()=>setOpen(value=>!value)}><span aria-hidden="true">Menú</span></button>
  {open?<div ref={panelRef} role="dialog" aria-modal="true" aria-label="Navegación" className="mobile-nav-panel" id="mobile-navigation" onKeyDown={trapFocus}>
   <div className="mobile-nav-top"><Link href="/" onClick={()=>setOpen(false)} aria-label="RINON inicio"><img src="/brand/logo-rinon-horizontal-transparent.png" alt="RINON Soluciones Metálicas" width="174" height="48"/></Link><button type="button" className="mobile-nav-close" onClick={()=>{setOpen(false);window.requestAnimationFrame(()=>toggleRef.current?.focus())}} aria-label="Cerrar menú">×</button></div>
   <div className="mobile-nav-sections">
    <details><summary className={active==="products"?"is-active":undefined}>Productos <span>+</span></summary><div className="mobile-nav-groups">{productNavGroups.map(group=><div key={group.label}><b>{group.label}</b>{group.items.map(item=><Link aria-current={isExactNavPath(pathname,item.href)?"page":undefined} className={isExactNavPath(pathname,item.href)?"is-active":undefined} key={item.href} href={item.href} data-event="menu_product_click" data-product={item.label} onClick={()=>setOpen(false)}>{item.label}</Link>)}</div>)}</div></details>
   </div>
   <nav className="mobile-nav-primary" aria-label="Navegación móvil principal">
    <Link className={active==="project"?"is-active":undefined} aria-current={isExactNavPath(pathname,projectNavItem.href)?"page":undefined} href={projectNavItem.href} onClick={()=>setOpen(false)}><span>01</span>{projectNavItem.label}</Link>
    <Link className={active==="company"?"is-active":undefined} aria-current={isExactNavPath(pathname,companyNavItem.href)?"page":undefined} href={companyNavItem.href} onClick={()=>setOpen(false)}><span>02</span>{companyNavItem.label}</Link>
   </nav>
   <div className="mobile-nav-sections mobile-nav-services">
    <details><summary className={active==="services"?"is-active":undefined}>Servicios <span>+</span></summary><div className="mobile-nav-groups one">{serviceNavItems.map(item=><Link aria-current={isExactNavPath(pathname,item.href)?"page":undefined} className={isExactNavPath(pathname,item.href)?"is-active":undefined} key={item.href} href={item.href} data-event="menu_service_click" data-service={item.label} onClick={()=>setOpen(false)}>{item.label}</Link>)}</div></details>
   </div>
   <nav className="mobile-nav-primary mobile-nav-secondary" aria-label="Información de RINON"><Link className={active==="about"?"is-active":undefined} aria-current={isExactNavPath(pathname,aboutNavItem.href)?"page":undefined} href={aboutNavItem.href} onClick={()=>setOpen(false)}><span>03</span>{aboutNavItem.label}</Link></nav>
   <div className="mobile-nav-actions">
    {whatsapp?<a className="mobile-nav-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer" data-event="contact_whatsapp" data-cta-location="mobile_menu">WhatsApp ↗</a>:null}
    <Link className="mobile-nav-quote" href="/cotizar" data-event="quote_start" data-cta-location="mobile_menu" onClick={()=>setOpen(false)}>Cotizar ↗</Link>
   </div>
  </div>:null}
 </div>
}
```
### Fuente literal: components/SiteFooter.tsx

```tsx
import Link from "next/link";
import {publicAddressDisplay,publicPhoneDisplay,publicPhoneHref} from "@/lib/contact";
import {whatsappUrl} from "@/lib/whatsapp";
import {footerProductItems,serviceNavItems,projectNavItem,aboutNavItem} from "@/lib/navigation";

export function SiteFooter(){
 const phoneHref=publicPhoneHref(); const whatsapp=whatsappUrl();
 return <footer className="s6-footer">
  <div className="container s6-footer-main s6-footer-main-v2">
   <div className="s6-footer-brand">
    <img src="/brand/logo-rinon-horizontal-transparent.png" alt="RINON Soluciones Metálicas" width="220" height="60"/>
    <p>Productos, proyectos a medida y servicios metálicos desde San Bernardo.</p>
    <Link className="s6-footer-quote" href="/cotizar" data-event="quote_start" data-cta-location="footer">Cotizar ↗</Link>
   </div>
   <nav className="s6-footer-column s6-footer-products" aria-label="Productos"><strong>Productos</strong>{footerProductItems.map(item=><Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
   <nav className="s6-footer-column" aria-label="Servicios"><strong>Servicios</strong>{serviceNavItems.map(item=><Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
   <div className="s6-footer-column s6-footer-contact"><strong>RINON</strong><Link href={projectNavItem.href}>{projectNavItem.label}</Link><Link href={aboutNavItem.href}>{aboutNavItem.label}</Link><Link href="/empresas">Empresas</Link><Link href="/proyectos">Proyectos</Link><Link href="/recursos">Guías y recursos</Link><Link href="/blog">Blog</Link>{whatsapp?<a href={whatsapp} target="_blank" rel="noopener noreferrer" data-event="contact_whatsapp" data-cta-location="footer">WhatsApp ↗</a>:null}{phoneHref?<a href={phoneHref} data-event="contact_phone" data-cta-location="footer">{publicPhoneDisplay()}</a>:null}<span>{publicAddressDisplay()}</span><Link href="/nosotros#ubicacion">Cómo llegar ↗</Link><Link href="/contacto">Contacto</Link></div>
  </div>
  <div className="container s6-footer-bottom">
   <span>© 2026 RINON · Tolipoli SpA · 77.795.508-K</span>
   <div><Link href="/politica-de-privacidad">Privacidad</Link><Link href="/politica-de-cookies">Cookies</Link><Link href="/solicitud-de-datos">Solicitar datos</Link></div>
   <span>San Bernardo · Región Metropolitana</span>
  </div>
 </footer>
}
```
### Diferencias desktop vs mobile detectadas

- Desktop header: logo + Productos mega button + Proyectos a medida + Empresas + Servicios mega button + Nosotros + CTA Cotizar.
- Mobile nav: botón Menú abre dialog; primer nivel: Productos, Proyectos a medida, Empresas, Servicios, Nosotros; acciones separadas al fondo: WhatsApp y Cotizar.
- Footer: mantiene navegación de productos priorizados, servicios puros, empresa/proyecto y contacto; incluye Contacto aunque el header primario no lo incluye.


## 5. Salidas QA/build
### Salida literal: npm run qa:static

```text

> rinon-v2-staging@1.0.0-rc.7 qa:static
> npm run typecheck && npm run qa:migration && npm run qa:seo-cro && npm run qa:visual-provenance && npm run qa:attachments && npm run qa:crm && npm run qa:analytics && npm run qa:legal && npm run preflight:production


> rinon-v2-staging@1.0.0-rc.7 typecheck
> tsc --noEmit --pretty false


> rinon-v2-staging@1.0.0-rc.7 qa:migration
> node scripts/check-migration-contract.mjs

✓ migration resolver has an explicit live-observed quarantine set
✓ live-observed quarantine contains no duplicate URLs
✓ live-observed quarantine protects at least 58 current organic URLs
✓ GSC pending ledger contains no duplicate URLs
✓ GSC pending ledger row count matches migration quarantine
✓ GSC pending ledger records /literas
✓ GSC pending ledger records /litera-metalica
✓ GSC pending ledger records /camarotes-adultos
✓ GSC pending ledger records /camarotes-baratos
✓ GSC pending ledger records /camarotes-precio
✓ GSC pending ledger records /camarotes-faenas
✓ GSC pending ledger records /camarotes-salmoneras
✓ GSC pending ledger records /camarotes-mineria
✓ GSC pending ledger records /camarotes-metalicos
✓ GSC pending ledger records /fabricante-camarotes-chile
✓ GSC pending ledger records /camarotes-al-por-mayor
✓ GSC pending ledger records /camarotes-para-internados
✓ GSC pending ledger records /camarotes-para-hospitales
✓ GSC pending ledger records /camarotes-militares
✓ GSC pending ledger records /camarotes-providencia
✓ GSC pending ledger records /camarotes-las-condes
✓ GSC pending ledger records /camarotes-maipu
✓ GSC pending ledger records /camarotes-nunoa
✓ GSC pending ledger records /camarotes-la-florida
✓ GSC pending ledger records /camarotes-pudahuel
✓ GSC pending ledger records /camarotes-santiago-centro
✓ GSC pending ledger records /camarotes-penalolen
✓ GSC pending ledger records /camarotes-quilicura
✓ GSC pending ledger records /camarotes-puente-alto
✓ GSC pending ledger records /camarotes-san-bernardo
✓ GSC pending ledger records /camarotes-renca
✓ GSC pending ledger records /camarotes-estacion-central
✓ GSC pending ledger records /camarotes-lo-barnechea
✓ GSC pending ledger records /camarote-con-escritorio-economico
✓ GSC pending ledger records /camarote-con-escritorio-full
✓ GSC pending ledger records /camarote-con-escritorio-full-2-plazas
✓ GSC pending ledger records /reja-metalica-santiago
✓ GSC pending ledger records /rejas-metalicas-pudahuel
✓ GSC pending ledger records /rejas-metalicas-maipu
✓ GSC pending ledger records /rejas-metalicas-cerrillos
✓ GSC pending ledger records /rejas-metalicas-puente-alto
✓ GSC pending ledger records /rejas-metalicas-precio
✓ GSC pending ledger records /rejas-metalicas-para-casas
✓ GSC pending ledger records /rejas-decorativas
✓ GSC pending ledger records /rejas-para-exteriores
✓ GSC pending ledger records /rejas-para-terraza
✓ GSC pending ledger records /rejas-para-balcon
✓ GSC pending ledger records /portones-industriales
✓ GSC pending ledger records /cercos-para-empresas
✓ GSC pending ledger records /cercos-para-parcelas
✓ GSC pending ledger records /cercos-perimetrales-concepcion
✓ GSC pending ledger records /cercos-perimetrales-antofagasta
✓ GSC pending ledger records /mallas-separadoras-industriales
✓ GSC pending ledger records /soldadura-metalica-santiago
✓ GSC pending ledger records /pintura-electrostatica-zona-sur-santiago
✓ GSC pending ledger records /pintura-electrostatica-colina
✓ GSC pending ledger records /pintura-electrostatica-las-condes
✓ GSC pending ledger records /pintura-electrostatica-providencia
✓ GSC pending ledger records /pintura-electrostatica-santiago-centro
✓ GSC pending ledger records /pintura-electrostatica-maipu
✓ GSC pending ledger records /pintura-electrostatica-talagante
✓ GSC pending ledger records /pintura-electrostatica-la-pintana
✓ GSC pending ledger records /pintura-electrostatica-la-cisterna
✓ migration quarantine protects ledger URL /literas
✓ migration quarantine protects ledger URL /litera-metalica
✓ migration quarantine protects ledger URL /camarotes-adultos
✓ migration quarantine protects ledger URL /camarotes-baratos
✓ migration quarantine protects ledger URL /camarotes-precio
✓ migration quarantine protects ledger URL /camarotes-faenas
✓ migration quarantine protects ledger URL /camarotes-salmoneras
✓ migration quarantine protects ledger URL /camarotes-mineria
✓ migration quarantine protects ledger URL /camarotes-metalicos
✓ migration quarantine protects ledger URL /fabricante-camarotes-chile
✓ migration quarantine protects ledger URL /camarotes-al-por-mayor
✓ migration quarantine protects ledger URL /camarotes-para-internados
✓ migration quarantine protects ledger URL /camarotes-para-hospitales
✓ migration quarantine protects ledger URL /camarotes-militares
✓ migration quarantine protects ledger URL /camarotes-providencia
✓ migration quarantine protects ledger URL /camarotes-las-condes
✓ migration quarantine protects ledger URL /camarotes-maipu
✓ migration quarantine protects ledger URL /camarotes-nunoa
✓ migration quarantine protects ledger URL /camarotes-la-florida
✓ migration quarantine protects ledger URL /camarotes-pudahuel
✓ migration quarantine protects ledger URL /camarotes-santiago-centro
✓ migration quarantine protects ledger URL /camarotes-penalolen
✓ migration quarantine protects ledger URL /camarotes-quilicura
✓ migration quarantine protects ledger URL /camarotes-puente-alto
✓ migration quarantine protects ledger URL /camarotes-san-bernardo
✓ migration quarantine protects ledger URL /camarotes-renca
✓ migration quarantine protects ledger URL /camarotes-estacion-central
✓ migration quarantine protects ledger URL /camarotes-lo-barnechea
✓ migration quarantine protects ledger URL /camarote-con-escritorio-economico
✓ migration quarantine protects ledger URL /camarote-con-escritorio-full
✓ migration quarantine protects ledger URL /camarote-con-escritorio-full-2-plazas
✓ migration quarantine protects ledger URL /reja-metalica-santiago
✓ migration quarantine protects ledger URL /rejas-metalicas-pudahuel
✓ migration quarantine protects ledger URL /rejas-metalicas-maipu
✓ migration quarantine protects ledger URL /rejas-metalicas-cerrillos
✓ migration quarantine protects ledger URL /rejas-metalicas-puente-alto
✓ migration quarantine protects ledger URL /rejas-metalicas-precio
✓ migration quarantine protects ledger URL /rejas-metalicas-para-casas
✓ migration quarantine protects ledger URL /rejas-decorativas
✓ migration quarantine protects ledger URL /rejas-para-exteriores
✓ migration quarantine protects ledger URL /rejas-para-terraza
✓ migration quarantine protects ledger URL /rejas-para-balcon
✓ migration quarantine protects ledger URL /portones-industriales
✓ migration quarantine protects ledger URL /cercos-para-empresas
✓ migration quarantine protects ledger URL /cercos-para-parcelas
✓ migration quarantine protects ledger URL /cercos-perimetrales-concepcion
✓ migration quarantine protects ledger URL /cercos-perimetrales-antofagasta
✓ migration quarantine protects ledger URL /mallas-separadoras-industriales
✓ migration quarantine protects ledger URL /soldadura-metalica-santiago
✓ migration quarantine protects ledger URL /pintura-electrostatica-zona-sur-santiago
✓ migration quarantine protects ledger URL /pintura-electrostatica-colina
✓ migration quarantine protects ledger URL /pintura-electrostatica-las-condes
✓ migration quarantine protects ledger URL /pintura-electrostatica-providencia
✓ migration quarantine protects ledger URL /pintura-electrostatica-santiago-centro
✓ migration quarantine protects ledger URL /pintura-electrostatica-maipu
✓ migration quarantine protects ledger URL /pintura-electrostatica-talagante
✓ migration quarantine protects ledger URL /pintura-electrostatica-la-pintana
✓ migration quarantine protects ledger URL /pintura-electrostatica-la-cisterna
✓ preserved commercial page exists: /camarote-nido
✓ URL inventory preserves /camarote-nido
✓ preserved commercial page exists: /camarote-triple
✓ URL inventory preserves /camarote-triple
✓ preserved commercial page exists: /camarote-doble
✓ URL inventory preserves /camarote-doble
✓ preserved commercial page exists: /cama-alta
✓ URL inventory preserves /cama-alta
✓ preserved commercial page exists: /camarote-titanic
✓ URL inventory preserves /camarote-titanic
✓ preserved commercial page exists: /camarote-1-5-plazas
✓ URL inventory preserves /camarote-1-5-plazas
✓ preserved commercial page exists: /camarote-desmontable
✓ URL inventory preserves /camarote-desmontable
✓ preserved commercial page exists: /cama-dos-plazas-con-cajon
✓ URL inventory preserves /cama-dos-plazas-con-cajon
✓ preserved commercial page exists: /camarote-2-plazas
✓ URL inventory preserves /camarote-2-plazas
✓ preserved commercial page exists: /cama-institucional-metalica
✓ URL inventory preserves /cama-institucional-metalica
✓ preserved commercial page exists: /cama-loft-metalica
✓ URL inventory preserves /cama-loft-metalica
✓ preserved commercial page exists: /cama-loft-con-escritorio
✓ URL inventory preserves /cama-loft-con-escritorio
✓ preserved commercial page exists: /mobiliario-institucional
✓ URL inventory preserves /mobiliario-institucional
✓ preserved commercial slugs are durable in migration resolver
✓ preserved commercial routes are included in sitemap source
✓ expanded catalog defines /camas-metalicas
✓ navigation exposes /camas-metalicas
✓ migration resolver preserves /camas-metalicas
✓ URL inventory records intent owner /camas-metalicas
✓ expanded catalog defines /camas-balinesas
✓ navigation exposes /camas-balinesas
✓ migration resolver preserves /camas-balinesas
✓ URL inventory records intent owner /camas-balinesas
✓ expanded catalog defines /mesas-metalicas
✓ navigation exposes /mesas-metalicas
✓ migration resolver preserves /mesas-metalicas
✓ URL inventory records intent owner /mesas-metalicas
✓ expanded catalog defines /escritorios-metalicos
✓ navigation exposes /escritorios-metalicos
✓ migration resolver preserves /escritorios-metalicos
✓ URL inventory records intent owner /escritorios-metalicos
✓ expanded catalog defines /soldadura-mig
✓ navigation exposes /soldadura-mig
✓ migration resolver preserves /soldadura-mig
✓ URL inventory records intent owner /soldadura-mig
✓ expanded catalog defines /corte-metalico
✓ navigation exposes /corte-metalico
✓ migration resolver preserves /corte-metalico
✓ URL inventory records intent owner /corte-metalico
✓ expanded catalog defines /instalacion
✓ navigation exposes /instalacion
✓ migration resolver preserves /instalacion
✓ URL inventory records intent owner /instalacion
✓ expanded catalog defines /reparaciones-metalicas
✓ navigation exposes /reparaciones-metalicas
✓ migration resolver preserves /reparaciones-metalicas
✓ URL inventory records intent owner /reparaciones-metalicas
✓ expanded catalog owners are included in sitemap generation
✓ machine-readable GSC pending count matches 58 protected live URLs
✓ authorized production preflight hard-blocks unresolved GSC URL reviews
✓ live-observed guard executes before broad redirect if(path.startsWith("/camarotes-")
✓ live-observed guard executes before broad redirect if(path.startsWith("/rejas-metalicas-")
✓ live-observed guard executes before broad redirect if(path.startsWith("/portones-")
✓ live-observed guard executes before broad redirect if(path.startsWith("/pintura-electrostatica-")
✓ live-observed guard executes before broad redirect if(path.startsWith("/mallas-separadoras-")
✓ approved blog redirect is allowlisted: como-cotizar-rejas-metalicas
✓ approved redirect destination exists: como-cotizar-rejas-metalicas
✓ URL inventory records editorial redirect: como-cotizar-rejas-metalicas
✓ approved blog redirect is allowlisted: tipos-de-cierres-perimetrales
✓ approved redirect destination exists: tipos-de-cierres-perimetrales
✓ URL inventory records editorial redirect: tipos-de-cierres-perimetrales
✓ approved blog redirect is allowlisted: porton-corredizo-vs-batiente
✓ approved redirect destination exists: porton-corredizo-vs-batiente
✓ URL inventory records editorial redirect: porton-corredizo-vs-batiente
✓ approved blog redirect is allowlisted: mezzanine-metalico-bodega-guia
✓ approved redirect destination exists: mezzanine-metalico-bodega-guia
✓ URL inventory records editorial redirect: mezzanine-metalico-bodega-guia
✓ approved blog redirect is allowlisted: proveedor-camarotes-empresas
✓ approved redirect destination exists: proveedor-camarotes-empresas
✓ URL inventory records editorial redirect: proveedor-camarotes-empresas
✓ approved blog redirect is allowlisted: como-elegir-reja-metalica-frontis
✓ approved redirect destination exists: como-elegir-reja-metalica-frontis
✓ URL inventory records editorial redirect: como-elegir-reja-metalica-frontis
✓ high-risk blog slug is not approved for redirect: cuanto-cuesta-camarote-chile
✓ URL inventory records high-risk review: cuanto-cuesta-camarote-chile
✓ high-risk blog slug is not approved for redirect: cuanto-cuesta-cierre-perimetral-chile
✓ URL inventory records high-risk review: cuanto-cuesta-cierre-perimetral-chile
✓ high-risk blog slug is not approved for redirect: cuanto-cuesta-porton-automatico-chile
✓ URL inventory records high-risk review: cuanto-cuesta-porton-automatico-chile
✓ high-risk blog slug is not approved for redirect: altura-reja-casa-seguridad
✓ URL inventory records high-risk review: altura-reja-casa-seguridad
✓ high-risk blog slug is not approved for redirect: camarote-nino-6-anos
✓ URL inventory records high-risk review: camarote-nino-6-anos
✓ high-risk blog slug is not approved for redirect: camarote-para-adulto-mayor
✓ URL inventory records high-risk review: camarote-para-adulto-mayor
✓ high-risk blog slug is not approved for redirect: pintura-electrostatica-que-es
✓ URL inventory records high-risk review: pintura-electrostatica-que-es
✓ high-risk blog slug is not approved for redirect: camarotes-mineria-que-exige-cada-faena
✓ URL inventory records high-risk review: camarotes-mineria-que-exige-cada-faena
✓ inventory remains completion-gated on crawl + Search Console reconciliation
✓ inventory defaults to preservation when GSC evidence is unavailable
✓ inventory has no misspelled structures destination
✓ /mallas-3d has a dedicated page owner
✓ /mallas-separadoras has a dedicated page owner
✓ navigation links both malla intent owners
✓ legacy mallas separadoras aliases consolidate only behind quarantine
✓ legacy Santiago welding intent has a defined candidate owner behind quarantine
✓ powder coating is a confirmed commercial capability
✓ repairs are a confirmed commercial capability
✓ blog redirects require explicit production flag
✓ commercial migration redirects fail closed unless explicitly enabled
✓ migration-safe resources are included in sitemap source
✓ environment keeps migration redirects disabled by default
✓ environment keeps blog redirects disabled by default
✓ environment keeps URL inventory incomplete by default
✓ environment keeps migration redirects disabled by default
✓ environment keeps blog redirects disabled by default
✓ environment keeps URL inventory incomplete by default

RINON MIGRATION CONTRACT PASSED: 13 preserved commercial URLs, 8 new intent owners, 58 live-observed GSC-pending URLs and 6 editorial redirects.

> rinon-v2-staging@1.0.0-rc.7 qa:seo-cro
> node scripts/check-seo-cro-contract.mjs

✓ SEO migration + CRO contract exists
✓ Search Console baseline records 125
✓ Search Console baseline records 6.13k
✓ Search Console baseline records 2%
✓ Search Console baseline records 14.7
✓ success formula couples organic visibility, intent and conversion
✓ URL migration decisions are explicit and non-blanket
✓ commercial landing CRO minimums are documented
✓ post-migration organic and conversion monitoring is defined
✓ canonical production base remains rinon.cl
✓ indexation remains explicit opt-in
✓ route metadata emits canonical URLs
✓ staging robots remain fail-closed
✓ primary solution template owns one explicit H1
✓ primary solution template exposes quote + WhatsApp conversion paths
✓ primary solution template supports FAQ and structured data
✓ primary solution template explains quote inputs
✓ expanded commercial template owns one explicit H1
✓ expanded commercial template exposes WhatsApp in hero and closing CTA
✓ expanded commercial template tracks quote starts in hero and footer
✓ expanded commercial template emits FAQ and breadcrumb schema
✓ expanded commercial template captures intent-specific quote inputs
✓ preserved commercial template owns one explicit H1
✓ preserved commercial template exposes WhatsApp in hero and closing CTA
✓ preserved commercial template tracks quote starts in hero and footer
✓ preserved commercial template keeps metadata and decision-support FAQs
✓ preserved organic owner remains protected: /camarote-nido
✓ preserved organic owner remains protected: /camarote-triple
✓ preserved organic owner remains protected: /camarote-doble
✓ preserved organic owner remains protected: /cama-alta
✓ preserved organic owner remains protected: /camarote-titanic
✓ preserved organic owner remains protected: /camarote-1-5-plazas
✓ preserved organic owner remains protected: /camarote-desmontable
✓ preserved organic owner remains protected: /cama-dos-plazas-con-cajon
✓ preserved organic owner remains protected: /camarote-2-plazas
✓ preserved organic owner remains protected: /cama-institucional-metalica
✓ preserved organic owner remains protected: /cama-loft-metalica
✓ preserved organic owner remains protected: /cama-loft-con-escritorio
✓ preserved organic owner remains protected: /mobiliario-institucional
✓ commercial intent owner remains defined: /camas-metalicas
✓ commercial intent owner remains defined: /camas-balinesas
✓ commercial intent owner remains defined: /mesas-metalicas
✓ commercial intent owner remains defined: /escritorios-metalicos
✓ commercial intent owner remains defined: /soldadura-mig
✓ commercial intent owner remains defined: /corte-metalico
✓ commercial intent owner remains defined: /instalacion
✓ commercial intent owner remains defined: /reparaciones-metalicas
✓ production analytics covers WhatsApp, phone and generated leads
✓ conversion events preserve landing/CTA intent context
✓ quote form remains progressive rather than a single long first step
✓ package exposes dedicated SEO/CRO QA command
✓ Vercel build executes SEO/CRO contract before Next build
✓ release static QA executes SEO/CRO contract

RINON SEO/CRO CONTRACT PASSED: baseline protected, 13 preserved organic owners, 8 expanded intent owners and conversion paths enforced.

> rinon-v2-staging@1.0.0-rc.7 qa:visual-provenance
> node scripts/check-visual-provenance.mjs

✓ visual registry exposes 7 auditable assets
✓ /visuals/archive/camarote-product-reference.webp declares provenance
✓ /visuals/archive/camarote-product-reference.webp declares sourceRef
✓ /visuals/archive/camarote-product-reference.webp remains reference-only
✓ /visuals/archive/structures-residential-reference.webp declares provenance
✓ /visuals/archive/structures-residential-reference.webp declares sourceRef
✓ /visuals/archive/structures-residential-reference.webp remains reference-only
✓ /visuals/product-theatre/camarote-conceptual.webp declares provenance
✓ /visuals/product-theatre/camarote-conceptual.webp declares sourceRef
✓ /visuals/product-theatre/camarote-conceptual.webp conceptual attribution is explicit
✓ /visuals/product-theatre/cierre-conceptual.webp declares provenance
✓ /visuals/product-theatre/cierre-conceptual.webp declares sourceRef
✓ /visuals/product-theatre/cierre-conceptual.webp conceptual attribution is explicit
✓ /visuals/product-theatre/estructura-conceptual.webp declares provenance
✓ /visuals/product-theatre/estructura-conceptual.webp declares sourceRef
✓ /visuals/product-theatre/estructura-conceptual.webp conceptual attribution is explicit
✓ ${referenceBase}/cama-institucional-gris-individual-y-camarote.jpg declares provenance
✓ ${referenceBase}/cama-institucional-gris-individual-y-camarote.jpg declares sourceRef
✓ ${referenceBase}/cama-institucional-gris-individual-y-camarote.jpg remains reference-only
✓ ${referenceBase}/camarote-desmontable-dormitorio-compartido.jpg declares provenance
✓ ${referenceBase}/camarote-desmontable-dormitorio-compartido.jpg declares sourceRef
✓ ${referenceBase}/camarote-desmontable-dormitorio-compartido.jpg remains reference-only
✓ verified-rinon type requires verificationRef
✓ all visual assets require sourceRef
✓ structures conceptual replacement brief exists
✓ structure conceptual asset points to its replacement brief
✓ visual registry declares 2 cutover blockers
✓ Home hero temporary state remains release-gated
✓ Structures temporary state remains release-gated
RINON VISUAL PROVENANCE CONTRACT PASSED: 7 assets have explicit, auditable provenance.

> rinon-v2-staging@1.0.0-rc.7 qa:attachments
> node scripts/check-quote-attachments.mjs

✓ quote form exposes a multi-file attachment control
✓ client attachment limits are explicit: 3 files x 5 MB
✓ quote form accepts image/jpeg
✓ quote form accepts image/png
✓ quote form accepts image/webp
✓ quote form accepts application/pdf
✓ quote form no longer presents attachments as unavailable
✓ quote submission sends FormData without overriding multipart Content-Type
✓ public write security exposes bounded multipart parsing
✓ multipart and JSON writes share origin validation
✓ multipart actual body bytes are checked, not only Content-Length
✓ contact API accepts bounded multipart and delegates private storage
✓ attachments are validated before creating the lead
✓ lead is created before any attachment is stored
✓ attachment failures preserve the valid lead and return a user-safe warning
✓ attachments target the dedicated private bucket contract
✓ server attachment limits mirror the client limits
✓ attachment storage is server-only and service-role authenticated
✓ stored object names do not trust user filenames
✓ multi-file attachment storage rolls back partial writes
✓ lead attachment IDs are linked only after the full batch succeeds
✓ admin attachment lookup binds file id to its lead id
✓ private attachment reads use the authenticated Storage path
✓ public intake client can receive a created lead identifier
✓ lead creation requires a valid returned UUID before attachment association
✓ admin lead model exposes only stored attachment ids
✓ private attachment route requires the existing admin gate and token
✓ private attachment responses are never cacheable
✓ admin route resolves metadata before streaming private content
✓ private file response applies browser hardening headers
✓ commercial admin exposes the lead's private attachments without public URLs
✓ admin attachment links stay behind the authenticated route

RINON QUOTE ATTACHMENT CONTRACT PASSED: private, bounded, atomic, preview-safe and admin-authenticated attachment flow is wired.

> rinon-v2-staging@1.0.0-rc.7 qa:crm
> node scripts/check-lead-structure.mjs

✓ quote layer builds structured CRM fields
✓ contact route sends structured fields with the lead
✓ lead origin is constrained to an internal path
✓ server captures a bounded referrer host fallback
✓ lead model types structured intake fields
✓ quote mapping includes landing_path
✓ edge whitelist includes landing_path
✓ quote mapping includes referrer_host
✓ edge whitelist includes referrer_host
✓ quote mapping includes utm_source
✓ edge whitelist includes utm_source
✓ quote mapping includes utm_medium
✓ edge whitelist includes utm_medium
✓ quote mapping includes utm_campaign
✓ edge whitelist includes utm_campaign
✓ quote mapping includes utm_term
✓ edge whitelist includes utm_term
✓ quote mapping includes utm_content
✓ edge whitelist includes utm_content
✓ quote mapping includes gclid
✓ edge whitelist includes gclid
✓ quote mapping includes gbraid
✓ edge whitelist includes gbraid
✓ quote mapping includes wbraid
✓ edge whitelist includes wbraid
✓ quote mapping includes fbclid
✓ edge whitelist includes fbclid
✓ quote mapping includes categoria
✓ edge whitelist includes categoria
✓ quote mapping includes subcategoria
✓ edge whitelist includes subcategoria
✓ quote mapping includes cantidad_aprox
✓ edge whitelist includes cantidad_aprox
✓ quote mapping includes ubicacion_proyecto
✓ edge whitelist includes ubicacion_proyecto
✓ quote mapping includes fecha_objetivo
✓ edge whitelist includes fecha_objetivo
✓ quote mapping includes requiere_instalacion
✓ edge whitelist includes requiere_instalacion
✓ quote mapping includes tiene_plano
✓ edge whitelist includes tiene_plano
✓ quote mapping includes uso_proyecto
✓ edge whitelist includes uso_proyecto
✓ quote mapping includes estado_superficie
✓ edge whitelist includes estado_superficie
✓ quote mapping includes tipo_cliente
✓ edge whitelist includes tipo_cliente
✓ quote mapping includes empresa
✓ edge whitelist includes empresa
✓ edge inserts only an explicit lead row whitelist
✓ edge normalizes dates and tri-state booleans
✓ edge independently constrains landing path
✓ edge repeats core contact validation
✓ edge preserves persistent intake rate limiting

RINON STRUCTURED LEAD CONTRACT PASSED: 22 CRM fields are typed, mapped and server-whitelisted.

> rinon-v2-staging@1.0.0-rc.7 qa:analytics
> node scripts/check-analytics-contract.mjs

✓ server analytics allows page_view
✓ client tracking knows page_view
✓ Edge intake allows page_view
✓ server analytics allows view_product
✓ client tracking knows view_product
✓ Edge intake allows view_product
✓ server analytics allows view_service
✓ client tracking knows view_service
✓ Edge intake allows view_service
✓ server analytics allows quote_start
✓ client tracking knows quote_start
✓ Edge intake allows quote_start
✓ server analytics allows quote_step
✓ client tracking knows quote_step
✓ Edge intake allows quote_step
✓ server analytics allows quote_submit
✓ client tracking knows quote_submit
✓ Edge intake allows quote_submit
✓ server analytics allows contact_whatsapp
✓ client tracking knows contact_whatsapp
✓ Edge intake allows contact_whatsapp
✓ server analytics allows contact_phone
✓ client tracking knows contact_phone
✓ Edge intake allows contact_phone
✓ server analytics allows generate_lead
✓ client tracking knows generate_lead
✓ Edge intake allows generate_lead
✓ server analytics allows maps_click
✓ client tracking knows maps_click
✓ Edge intake allows maps_click
✓ server analytics allows waze_click
✓ client tracking knows waze_click
✓ Edge intake allows waze_click
✓ server analytics allows menu_product_click
✓ client tracking knows menu_product_click
✓ Edge intake allows menu_product_click
✓ server analytics allows menu_service_click
✓ client tracking knows menu_service_click
✓ Edge intake allows menu_service_click
✓ server analytics allows resource_view
✓ client tracking knows resource_view
✓ Edge intake allows resource_view
✓ server analytics allows cta_click
✓ client tracking knows cta_click
✓ Edge intake allows cta_click
✓ public analytics route validates against server allowlist
✓ semantic CRO events persist internally after consent
✓ click tracking avoids duplicate contact persistence
✓ successful lead submission persists generate_lead
✓ analytics summary type exposes quote funnel metrics
✓ analytics funnel RPC migration is versioned
✓ analytics RPC migration includes quote_start
✓ analytics RPC migration includes quote_submit
✓ analytics RPC migration includes maps_click
✓ analytics RPC migration includes waze_click
✓ analytics RPC migration includes start_to_submit_rate
✓ analytics RPC migration includes submit_to_lead_rate
✓ admin analytics view exposes the persisted quote funnel
✓ admin analytics view is auth-gated and noindex
✓ package scripts expose analytics contract QA

RINON ANALYTICS CONTRACT PASSED: 15 consented CRO events aligned across client, API, Edge intake, RPC and admin funnel.

> rinon-v2-staging@1.0.0-rc.7 qa:legal
> node scripts/check-legal-contract.mjs

✓ legal publication is fail-closed behind explicit approval
✓ legal publication requires configured legal identity and representative
✓ legal pages share the publication readiness gate
✓ privacy draft documents the active private attachment flow
✓ privacy draft no longer describes attachments as unvalidated
✓ privacy draft documents consented campaign attribution
✓ cookie draft documents the supported optional external tools
✓ cookie copy and runtime both keep optional tracking consent-gated
✓ production tracking is mounted through the consent-aware production layer
✓ privacy request page is permanently noindex
✓ terms keep web requests distinct from binding fabrication orders
✓ authorized cutover requires explicit legal approval

RINON LEGAL CONTRACT PASSED: legal publication remains fail-closed and the draft matches the current intake, attachment and consent architecture.

> rinon-v2-staging@1.0.0-rc.7 preflight:production
> node scripts/preflight-production.mjs

RINON production preflight · SAFE PRE-CUTOVER
✓ canonical production base is https://rinon.cl
✓ indexation is fail-closed behind RINON_INDEXABLE
✓ robots.txt follows the indexation gate
✓ non-indexable environments block all crawlers
✓ commercial migration redirects are fail-closed
✓ legacy blog redirects are fail-closed
✓ public contact writes require lead-write configuration
✓ lead persistence has an explicit write gate
✓ normal lead persistence is tied to production release state
✓ public intake targets the dedicated Supabase edge endpoint
✓ public intake has a runtime configuration validator
✓ expanded products and services are part of sitemap generation
✓ preserved commercial URLs and migration resources remain in sitemap generation
✓ powder coating offer is confirmed while technical limits remain bounded
✓ metal repairs are registered as a confirmed commercial capability
✓ navigation owns /camas-metalicas
✓ migration resolver preserves /camas-metalicas
✓ navigation owns /camas-balinesas
✓ migration resolver preserves /camas-balinesas
✓ navigation owns /mesas-metalicas
✓ migration resolver preserves /mesas-metalicas
✓ navigation owns /escritorios-metalicos
✓ migration resolver preserves /escritorios-metalicos
✓ navigation owns /soldadura-mig
✓ migration resolver preserves /soldadura-mig
✓ navigation owns /corte-metalico
✓ migration resolver preserves /corte-metalico
✓ navigation owns /instalacion
✓ migration resolver preserves /instalacion
✓ navigation owns /reparaciones-metalicas
✓ migration resolver preserves /reparaciones-metalicas
✓ service navigation is commercial, short and free of removed menu labels
✓ URL migration inventory defines GSC reconciliation and completion gate
✓ URL migration inventory contains /portones-industriales
✓ URL migration inventory contains /mallas-separadoras-industriales
✓ URL migration inventory contains /cierre-perimetral-industrial
✓ URL migration inventory contains /cercos-metalicos-santiago
✓ URL migration inventory contains /reja-metalica-santiago
✓ URL migration inventory contains /soldadura-metalica-santiago
✓ URL migration inventory contains /pintura-electrostatica-zona-sur-santiago
✓ historical cercos-metalicos geographic family is covered
✓ migration declares a machine-readable GSC review pending count
✓ visual registry declares machine-readable cutover blockers
✓ RINON_INDEXABLE is not active before cutover authorization
✓ RINON_ENABLE_MIGRATION_REDIRECTS is not active before cutover authorization
✓ RINON_ENABLE_BLOG_REDIRECTS is not active before cutover authorization
✓ RINON_LEAD_WRITE_ENABLED is not active before cutover authorization
✓ RINON_PRODUCTION_TRACKING_ENABLED is not active before cutover authorization
✓ URL inventory remains explicitly incomplete before final crawl/GSC reconciliation

RINON PRODUCTION PREFLIGHT PASSED · SAFE PRE-CUTOVER.
NOTE: Cutover is intentionally blocked. Set RINON_CUTOVER_AUTHORIZED=true only during an explicitly authorized production release.
NOTE: RINON_URL_INVENTORY_COMPLETE must remain false until the live crawl and Search Console export are reconciled.
NOTE: 58 live-observed URL decisions remain GSC-pending and are hard-blocked from cutover.
NOTE: 2 final visual release blockers remain: home-hero-final-master, structures-residential-final-master.
```
### Salida literal: npm run build

```text

> rinon-v2-staging@1.0.0-rc.7 prebuild
> node scripts/reconstruct-visual-assets.mjs

ASSET RINON-VIS-P0-HOME-WELDING target=public/visuals/home-hero-conceptual-welding.webp provenance=conceptual-context dimensions=720x730 minimum=700x700 bytes=29328 sha256=d150f20dd38b61cb48e94dba24c304a23b8e09985416b6f4fca473487962951f
ASSET RINON-VIS-P1-BUNK target=public/visuals/product-theatre/camarote-conceptual.webp provenance=conceptual-context dimensions=900x534 minimum=900x500 bytes=13394 sha256=34ecd542faeed218b673ab70d79480737d4da0ed68fd3ec54fca4f27a0664c9d
ASSET RINON-VIS-P1-BUNK-ARCHIVE target=public/visuals/archive/camarote-product-reference.webp provenance=user-drive-reference dimensions=1200x900 minimum=1200x900 bytes=41740 sha256=9165c9e04eccbb62208db32d5fbe3c61b2a084c1e35dd6a09bdb5a62a63b1892
ASSET RINON-VIS-P1-FENCE target=public/visuals/product-theatre/cierre-conceptual.webp provenance=conceptual-context dimensions=900x537 minimum=900x500 bytes=18232 sha256=934b333adfdbeae5a495beee0d22e7ac3f3d06c78dcee7f05ec264dddc191f62
ASSET RINON-VIS-P0-STRUCTURE-RESIDENTIAL-REFERENCE target=public/visuals/archive/structures-residential-reference.webp provenance=user-drive-reference dimensions=1200x510 minimum=1200x500 bytes=31180 sha256=f222ebf91b11dcef94b922655d9db6fa968779cd841af05aa770dd5f70f8a4d6
ASSET RINON-VIS-P0-HOME-STRUCTURE-TEMP target=public/visuals/product-theatre/estructura-conceptual.webp provenance=conceptual-context dimensions=900x500 minimum=900x500 bytes=14286 sha256=ab18df9470c690bd68a4de1dea1e6bd2a28662a7727b1b5644eabfa6ddcbbd38
✓ All final RINON visual assets reconstructed, measured, dimension-gated and SHA-256 verified

> rinon-v2-staging@1.0.0-rc.7 build
> npm run qa:migration && npm run qa:seo-cro && npm run qa:visual-provenance && npm run qa:attachments && npm run qa:crm && npm run qa:analytics && npm run qa:legal && npm run preflight:production && next build


> rinon-v2-staging@1.0.0-rc.7 qa:migration
> node scripts/check-migration-contract.mjs

✓ migration resolver has an explicit live-observed quarantine set
✓ live-observed quarantine contains no duplicate URLs
✓ live-observed quarantine protects at least 58 current organic URLs
✓ GSC pending ledger contains no duplicate URLs
✓ GSC pending ledger row count matches migration quarantine
✓ GSC pending ledger records /literas
✓ GSC pending ledger records /litera-metalica
✓ GSC pending ledger records /camarotes-adultos
✓ GSC pending ledger records /camarotes-baratos
✓ GSC pending ledger records /camarotes-precio
✓ GSC pending ledger records /camarotes-faenas
✓ GSC pending ledger records /camarotes-salmoneras
✓ GSC pending ledger records /camarotes-mineria
✓ GSC pending ledger records /camarotes-metalicos
✓ GSC pending ledger records /fabricante-camarotes-chile
✓ GSC pending ledger records /camarotes-al-por-mayor
✓ GSC pending ledger records /camarotes-para-internados
✓ GSC pending ledger records /camarotes-para-hospitales
✓ GSC pending ledger records /camarotes-militares
✓ GSC pending ledger records /camarotes-providencia
✓ GSC pending ledger records /camarotes-las-condes
✓ GSC pending ledger records /camarotes-maipu
✓ GSC pending ledger records /camarotes-nunoa
✓ GSC pending ledger records /camarotes-la-florida
✓ GSC pending ledger records /camarotes-pudahuel
✓ GSC pending ledger records /camarotes-santiago-centro
✓ GSC pending ledger records /camarotes-penalolen
✓ GSC pending ledger records /camarotes-quilicura
✓ GSC pending ledger records /camarotes-puente-alto
✓ GSC pending ledger records /camarotes-san-bernardo
✓ GSC pending ledger records /camarotes-renca
✓ GSC pending ledger records /camarotes-estacion-central
✓ GSC pending ledger records /camarotes-lo-barnechea
✓ GSC pending ledger records /camarote-con-escritorio-economico
✓ GSC pending ledger records /camarote-con-escritorio-full
✓ GSC pending ledger records /camarote-con-escritorio-full-2-plazas
✓ GSC pending ledger records /reja-metalica-santiago
✓ GSC pending ledger records /rejas-metalicas-pudahuel
✓ GSC pending ledger records /rejas-metalicas-maipu
✓ GSC pending ledger records /rejas-metalicas-cerrillos
✓ GSC pending ledger records /rejas-metalicas-puente-alto
✓ GSC pending ledger records /rejas-metalicas-precio
✓ GSC pending ledger records /rejas-metalicas-para-casas
✓ GSC pending ledger records /rejas-decorativas
✓ GSC pending ledger records /rejas-para-exteriores
✓ GSC pending ledger records /rejas-para-terraza
✓ GSC pending ledger records /rejas-para-balcon
✓ GSC pending ledger records /portones-industriales
✓ GSC pending ledger records /cercos-para-empresas
✓ GSC pending ledger records /cercos-para-parcelas
✓ GSC pending ledger records /cercos-perimetrales-concepcion
✓ GSC pending ledger records /cercos-perimetrales-antofagasta
✓ GSC pending ledger records /mallas-separadoras-industriales
✓ GSC pending ledger records /soldadura-metalica-santiago
✓ GSC pending ledger records /pintura-electrostatica-zona-sur-santiago
✓ GSC pending ledger records /pintura-electrostatica-colina
✓ GSC pending ledger records /pintura-electrostatica-las-condes
✓ GSC pending ledger records /pintura-electrostatica-providencia
✓ GSC pending ledger records /pintura-electrostatica-santiago-centro
✓ GSC pending ledger records /pintura-electrostatica-maipu
✓ GSC pending ledger records /pintura-electrostatica-talagante
✓ GSC pending ledger records /pintura-electrostatica-la-pintana
✓ GSC pending ledger records /pintura-electrostatica-la-cisterna
✓ migration quarantine protects ledger URL /literas
✓ migration quarantine protects ledger URL /litera-metalica
✓ migration quarantine protects ledger URL /camarotes-adultos
✓ migration quarantine protects ledger URL /camarotes-baratos
✓ migration quarantine protects ledger URL /camarotes-precio
✓ migration quarantine protects ledger URL /camarotes-faenas
✓ migration quarantine protects ledger URL /camarotes-salmoneras
✓ migration quarantine protects ledger URL /camarotes-mineria
✓ migration quarantine protects ledger URL /camarotes-metalicos
✓ migration quarantine protects ledger URL /fabricante-camarotes-chile
✓ migration quarantine protects ledger URL /camarotes-al-por-mayor
✓ migration quarantine protects ledger URL /camarotes-para-internados
✓ migration quarantine protects ledger URL /camarotes-para-hospitales
✓ migration quarantine protects ledger URL /camarotes-militares
✓ migration quarantine protects ledger URL /camarotes-providencia
✓ migration quarantine protects ledger URL /camarotes-las-condes
✓ migration quarantine protects ledger URL /camarotes-maipu
✓ migration quarantine protects ledger URL /camarotes-nunoa
✓ migration quarantine protects ledger URL /camarotes-la-florida
✓ migration quarantine protects ledger URL /camarotes-pudahuel
✓ migration quarantine protects ledger URL /camarotes-santiago-centro
✓ migration quarantine protects ledger URL /camarotes-penalolen
✓ migration quarantine protects ledger URL /camarotes-quilicura
✓ migration quarantine protects ledger URL /camarotes-puente-alto
✓ migration quarantine protects ledger URL /camarotes-san-bernardo
✓ migration quarantine protects ledger URL /camarotes-renca
✓ migration quarantine protects ledger URL /camarotes-estacion-central
✓ migration quarantine protects ledger URL /camarotes-lo-barnechea
✓ migration quarantine protects ledger URL /camarote-con-escritorio-economico
✓ migration quarantine protects ledger URL /camarote-con-escritorio-full
✓ migration quarantine protects ledger URL /camarote-con-escritorio-full-2-plazas
✓ migration quarantine protects ledger URL /reja-metalica-santiago
✓ migration quarantine protects ledger URL /rejas-metalicas-pudahuel
✓ migration quarantine protects ledger URL /rejas-metalicas-maipu
✓ migration quarantine protects ledger URL /rejas-metalicas-cerrillos
✓ migration quarantine protects ledger URL /rejas-metalicas-puente-alto
✓ migration quarantine protects ledger URL /rejas-metalicas-precio
✓ migration quarantine protects ledger URL /rejas-metalicas-para-casas
✓ migration quarantine protects ledger URL /rejas-decorativas
✓ migration quarantine protects ledger URL /rejas-para-exteriores
✓ migration quarantine protects ledger URL /rejas-para-terraza
✓ migration quarantine protects ledger URL /rejas-para-balcon
✓ migration quarantine protects ledger URL /portones-industriales
✓ migration quarantine protects ledger URL /cercos-para-empresas
✓ migration quarantine protects ledger URL /cercos-para-parcelas
✓ migration quarantine protects ledger URL /cercos-perimetrales-concepcion
✓ migration quarantine protects ledger URL /cercos-perimetrales-antofagasta
✓ migration quarantine protects ledger URL /mallas-separadoras-industriales
✓ migration quarantine protects ledger URL /soldadura-metalica-santiago
✓ migration quarantine protects ledger URL /pintura-electrostatica-zona-sur-santiago
✓ migration quarantine protects ledger URL /pintura-electrostatica-colina
✓ migration quarantine protects ledger URL /pintura-electrostatica-las-condes
✓ migration quarantine protects ledger URL /pintura-electrostatica-providencia
✓ migration quarantine protects ledger URL /pintura-electrostatica-santiago-centro
✓ migration quarantine protects ledger URL /pintura-electrostatica-maipu
✓ migration quarantine protects ledger URL /pintura-electrostatica-talagante
✓ migration quarantine protects ledger URL /pintura-electrostatica-la-pintana
✓ migration quarantine protects ledger URL /pintura-electrostatica-la-cisterna
✓ preserved commercial page exists: /camarote-nido
✓ URL inventory preserves /camarote-nido
✓ preserved commercial page exists: /camarote-triple
✓ URL inventory preserves /camarote-triple
✓ preserved commercial page exists: /camarote-doble
✓ URL inventory preserves /camarote-doble
✓ preserved commercial page exists: /cama-alta
✓ URL inventory preserves /cama-alta
✓ preserved commercial page exists: /camarote-titanic
✓ URL inventory preserves /camarote-titanic
✓ preserved commercial page exists: /camarote-1-5-plazas
✓ URL inventory preserves /camarote-1-5-plazas
✓ preserved commercial page exists: /camarote-desmontable
✓ URL inventory preserves /camarote-desmontable
✓ preserved commercial page exists: /cama-dos-plazas-con-cajon
✓ URL inventory preserves /cama-dos-plazas-con-cajon
✓ preserved commercial page exists: /camarote-2-plazas
✓ URL inventory preserves /camarote-2-plazas
✓ preserved commercial page exists: /cama-institucional-metalica
✓ URL inventory preserves /cama-institucional-metalica
✓ preserved commercial page exists: /cama-loft-metalica
✓ URL inventory preserves /cama-loft-metalica
✓ preserved commercial page exists: /cama-loft-con-escritorio
✓ URL inventory preserves /cama-loft-con-escritorio
✓ preserved commercial page exists: /mobiliario-institucional
✓ URL inventory preserves /mobiliario-institucional
✓ preserved commercial slugs are durable in migration resolver
✓ preserved commercial routes are included in sitemap source
✓ expanded catalog defines /camas-metalicas
✓ navigation exposes /camas-metalicas
✓ migration resolver preserves /camas-metalicas
✓ URL inventory records intent owner /camas-metalicas
✓ expanded catalog defines /camas-balinesas
✓ navigation exposes /camas-balinesas
✓ migration resolver preserves /camas-balinesas
✓ URL inventory records intent owner /camas-balinesas
✓ expanded catalog defines /mesas-metalicas
✓ navigation exposes /mesas-metalicas
✓ migration resolver preserves /mesas-metalicas
✓ URL inventory records intent owner /mesas-metalicas
✓ expanded catalog defines /escritorios-metalicos
✓ navigation exposes /escritorios-metalicos
✓ migration resolver preserves /escritorios-metalicos
✓ URL inventory records intent owner /escritorios-metalicos
✓ expanded catalog defines /soldadura-mig
✓ navigation exposes /soldadura-mig
✓ migration resolver preserves /soldadura-mig
✓ URL inventory records intent owner /soldadura-mig
✓ expanded catalog defines /corte-metalico
✓ navigation exposes /corte-metalico
✓ migration resolver preserves /corte-metalico
✓ URL inventory records intent owner /corte-metalico
✓ expanded catalog defines /instalacion
✓ navigation exposes /instalacion
✓ migration resolver preserves /instalacion
✓ URL inventory records intent owner /instalacion
✓ expanded catalog defines /reparaciones-metalicas
✓ navigation exposes /reparaciones-metalicas
✓ migration resolver preserves /reparaciones-metalicas
✓ URL inventory records intent owner /reparaciones-metalicas
✓ expanded catalog owners are included in sitemap generation
✓ machine-readable GSC pending count matches 58 protected live URLs
✓ authorized production preflight hard-blocks unresolved GSC URL reviews
✓ live-observed guard executes before broad redirect if(path.startsWith("/camarotes-")
✓ live-observed guard executes before broad redirect if(path.startsWith("/rejas-metalicas-")
✓ live-observed guard executes before broad redirect if(path.startsWith("/portones-")
✓ live-observed guard executes before broad redirect if(path.startsWith("/pintura-electrostatica-")
✓ live-observed guard executes before broad redirect if(path.startsWith("/mallas-separadoras-")
✓ approved blog redirect is allowlisted: como-cotizar-rejas-metalicas
✓ approved redirect destination exists: como-cotizar-rejas-metalicas
✓ URL inventory records editorial redirect: como-cotizar-rejas-metalicas
✓ approved blog redirect is allowlisted: tipos-de-cierres-perimetrales
✓ approved redirect destination exists: tipos-de-cierres-perimetrales
✓ URL inventory records editorial redirect: tipos-de-cierres-perimetrales
✓ approved blog redirect is allowlisted: porton-corredizo-vs-batiente
✓ approved redirect destination exists: porton-corredizo-vs-batiente
✓ URL inventory records editorial redirect: porton-corredizo-vs-batiente
✓ approved blog redirect is allowlisted: mezzanine-metalico-bodega-guia
✓ approved redirect destination exists: mezzanine-metalico-bodega-guia
✓ URL inventory records editorial redirect: mezzanine-metalico-bodega-guia
✓ approved blog redirect is allowlisted: proveedor-camarotes-empresas
✓ approved redirect destination exists: proveedor-camarotes-empresas
✓ URL inventory records editorial redirect: proveedor-camarotes-empresas
✓ approved blog redirect is allowlisted: como-elegir-reja-metalica-frontis
✓ approved redirect destination exists: como-elegir-reja-metalica-frontis
✓ URL inventory records editorial redirect: como-elegir-reja-metalica-frontis
✓ high-risk blog slug is not approved for redirect: cuanto-cuesta-camarote-chile
✓ URL inventory records high-risk review: cuanto-cuesta-camarote-chile
✓ high-risk blog slug is not approved for redirect: cuanto-cuesta-cierre-perimetral-chile
✓ URL inventory records high-risk review: cuanto-cuesta-cierre-perimetral-chile
✓ high-risk blog slug is not approved for redirect: cuanto-cuesta-porton-automatico-chile
✓ URL inventory records high-risk review: cuanto-cuesta-porton-automatico-chile
✓ high-risk blog slug is not approved for redirect: altura-reja-casa-seguridad
✓ URL inventory records high-risk review: altura-reja-casa-seguridad
✓ high-risk blog slug is not approved for redirect: camarote-nino-6-anos
✓ URL inventory records high-risk review: camarote-nino-6-anos
✓ high-risk blog slug is not approved for redirect: camarote-para-adulto-mayor
✓ URL inventory records high-risk review: camarote-para-adulto-mayor
✓ high-risk blog slug is not approved for redirect: pintura-electrostatica-que-es
✓ URL inventory records high-risk review: pintura-electrostatica-que-es
✓ high-risk blog slug is not approved for redirect: camarotes-mineria-que-exige-cada-faena
✓ URL inventory records high-risk review: camarotes-mineria-que-exige-cada-faena
✓ inventory remains completion-gated on crawl + Search Console reconciliation
✓ inventory defaults to preservation when GSC evidence is unavailable
✓ inventory has no misspelled structures destination
✓ /mallas-3d has a dedicated page owner
✓ /mallas-separadoras has a dedicated page owner
✓ navigation links both malla intent owners
✓ legacy mallas separadoras aliases consolidate only behind quarantine
✓ legacy Santiago welding intent has a defined candidate owner behind quarantine
✓ powder coating is a confirmed commercial capability
✓ repairs are a confirmed commercial capability
✓ blog redirects require explicit production flag
✓ commercial migration redirects fail closed unless explicitly enabled
✓ migration-safe resources are included in sitemap source
✓ environment keeps migration redirects disabled by default
✓ environment keeps blog redirects disabled by default
✓ environment keeps URL inventory incomplete by default
✓ environment keeps migration redirects disabled by default
✓ environment keeps blog redirects disabled by default
✓ environment keeps URL inventory incomplete by default

RINON MIGRATION CONTRACT PASSED: 13 preserved commercial URLs, 8 new intent owners, 58 live-observed GSC-pending URLs and 6 editorial redirects.

> rinon-v2-staging@1.0.0-rc.7 qa:seo-cro
> node scripts/check-seo-cro-contract.mjs

✓ SEO migration + CRO contract exists
✓ Search Console baseline records 125
✓ Search Console baseline records 6.13k
✓ Search Console baseline records 2%
✓ Search Console baseline records 14.7
✓ success formula couples organic visibility, intent and conversion
✓ URL migration decisions are explicit and non-blanket
✓ commercial landing CRO minimums are documented
✓ post-migration organic and conversion monitoring is defined
✓ canonical production base remains rinon.cl
✓ indexation remains explicit opt-in
✓ route metadata emits canonical URLs
✓ staging robots remain fail-closed
✓ primary solution template owns one explicit H1
✓ primary solution template exposes quote + WhatsApp conversion paths
✓ primary solution template supports FAQ and structured data
✓ primary solution template explains quote inputs
✓ expanded commercial template owns one explicit H1
✓ expanded commercial template exposes WhatsApp in hero and closing CTA
✓ expanded commercial template tracks quote starts in hero and footer
✓ expanded commercial template emits FAQ and breadcrumb schema
✓ expanded commercial template captures intent-specific quote inputs
✓ preserved commercial template owns one explicit H1
✓ preserved commercial template exposes WhatsApp in hero and closing CTA
✓ preserved commercial template tracks quote starts in hero and footer
✓ preserved commercial template keeps metadata and decision-support FAQs
✓ preserved organic owner remains protected: /camarote-nido
✓ preserved organic owner remains protected: /camarote-triple
✓ preserved organic owner remains protected: /camarote-doble
✓ preserved organic owner remains protected: /cama-alta
✓ preserved organic owner remains protected: /camarote-titanic
✓ preserved organic owner remains protected: /camarote-1-5-plazas
✓ preserved organic owner remains protected: /camarote-desmontable
✓ preserved organic owner remains protected: /cama-dos-plazas-con-cajon
✓ preserved organic owner remains protected: /camarote-2-plazas
✓ preserved organic owner remains protected: /cama-institucional-metalica
✓ preserved organic owner remains protected: /cama-loft-metalica
✓ preserved organic owner remains protected: /cama-loft-con-escritorio
✓ preserved organic owner remains protected: /mobiliario-institucional
✓ commercial intent owner remains defined: /camas-metalicas
✓ commercial intent owner remains defined: /camas-balinesas
✓ commercial intent owner remains defined: /mesas-metalicas
✓ commercial intent owner remains defined: /escritorios-metalicos
✓ commercial intent owner remains defined: /soldadura-mig
✓ commercial intent owner remains defined: /corte-metalico
✓ commercial intent owner remains defined: /instalacion
✓ commercial intent owner remains defined: /reparaciones-metalicas
✓ production analytics covers WhatsApp, phone and generated leads
✓ conversion events preserve landing/CTA intent context
✓ quote form remains progressive rather than a single long first step
✓ package exposes dedicated SEO/CRO QA command
✓ Vercel build executes SEO/CRO contract before Next build
✓ release static QA executes SEO/CRO contract

RINON SEO/CRO CONTRACT PASSED: baseline protected, 13 preserved organic owners, 8 expanded intent owners and conversion paths enforced.

> rinon-v2-staging@1.0.0-rc.7 qa:visual-provenance
> node scripts/check-visual-provenance.mjs

✓ visual registry exposes 7 auditable assets
✓ /visuals/archive/camarote-product-reference.webp declares provenance
✓ /visuals/archive/camarote-product-reference.webp declares sourceRef
✓ /visuals/archive/camarote-product-reference.webp remains reference-only
✓ /visuals/archive/structures-residential-reference.webp declares provenance
✓ /visuals/archive/structures-residential-reference.webp declares sourceRef
✓ /visuals/archive/structures-residential-reference.webp remains reference-only
✓ /visuals/product-theatre/camarote-conceptual.webp declares provenance
✓ /visuals/product-theatre/camarote-conceptual.webp declares sourceRef
✓ /visuals/product-theatre/camarote-conceptual.webp conceptual attribution is explicit
✓ /visuals/product-theatre/cierre-conceptual.webp declares provenance
✓ /visuals/product-theatre/cierre-conceptual.webp declares sourceRef
✓ /visuals/product-theatre/cierre-conceptual.webp conceptual attribution is explicit
✓ /visuals/product-theatre/estructura-conceptual.webp declares provenance
✓ /visuals/product-theatre/estructura-conceptual.webp declares sourceRef
✓ /visuals/product-theatre/estructura-conceptual.webp conceptual attribution is explicit
✓ ${referenceBase}/cama-institucional-gris-individual-y-camarote.jpg declares provenance
✓ ${referenceBase}/cama-institucional-gris-individual-y-camarote.jpg declares sourceRef
✓ ${referenceBase}/cama-institucional-gris-individual-y-camarote.jpg remains reference-only
✓ ${referenceBase}/camarote-desmontable-dormitorio-compartido.jpg declares provenance
✓ ${referenceBase}/camarote-desmontable-dormitorio-compartido.jpg declares sourceRef
✓ ${referenceBase}/camarote-desmontable-dormitorio-compartido.jpg remains reference-only
✓ verified-rinon type requires verificationRef
✓ all visual assets require sourceRef
✓ structures conceptual replacement brief exists
✓ structure conceptual asset points to its replacement brief
✓ visual registry declares 2 cutover blockers
✓ Home hero temporary state remains release-gated
✓ Structures temporary state remains release-gated
RINON VISUAL PROVENANCE CONTRACT PASSED: 7 assets have explicit, auditable provenance.

> rinon-v2-staging@1.0.0-rc.7 qa:attachments
> node scripts/check-quote-attachments.mjs

✓ quote form exposes a multi-file attachment control
✓ client attachment limits are explicit: 3 files x 5 MB
✓ quote form accepts image/jpeg
✓ quote form accepts image/png
✓ quote form accepts image/webp
✓ quote form accepts application/pdf
✓ quote form no longer presents attachments as unavailable
✓ quote submission sends FormData without overriding multipart Content-Type
✓ public write security exposes bounded multipart parsing
✓ multipart and JSON writes share origin validation
✓ multipart actual body bytes are checked, not only Content-Length
✓ contact API accepts bounded multipart and delegates private storage
✓ attachments are validated before creating the lead
✓ lead is created before any attachment is stored
✓ attachment failures preserve the valid lead and return a user-safe warning
✓ attachments target the dedicated private bucket contract
✓ server attachment limits mirror the client limits
✓ attachment storage is server-only and service-role authenticated
✓ stored object names do not trust user filenames
✓ multi-file attachment storage rolls back partial writes
✓ lead attachment IDs are linked only after the full batch succeeds
✓ admin attachment lookup binds file id to its lead id
✓ private attachment reads use the authenticated Storage path
✓ public intake client can receive a created lead identifier
✓ lead creation requires a valid returned UUID before attachment association
✓ admin lead model exposes only stored attachment ids
✓ private attachment route requires the existing admin gate and token
✓ private attachment responses are never cacheable
✓ admin route resolves metadata before streaming private content
✓ private file response applies browser hardening headers
✓ commercial admin exposes the lead's private attachments without public URLs
✓ admin attachment links stay behind the authenticated route

RINON QUOTE ATTACHMENT CONTRACT PASSED: private, bounded, atomic, preview-safe and admin-authenticated attachment flow is wired.

> rinon-v2-staging@1.0.0-rc.7 qa:crm
> node scripts/check-lead-structure.mjs

✓ quote layer builds structured CRM fields
✓ contact route sends structured fields with the lead
✓ lead origin is constrained to an internal path
✓ server captures a bounded referrer host fallback
✓ lead model types structured intake fields
✓ quote mapping includes landing_path
✓ edge whitelist includes landing_path
✓ quote mapping includes referrer_host
✓ edge whitelist includes referrer_host
✓ quote mapping includes utm_source
✓ edge whitelist includes utm_source
✓ quote mapping includes utm_medium
✓ edge whitelist includes utm_medium
✓ quote mapping includes utm_campaign
✓ edge whitelist includes utm_campaign
✓ quote mapping includes utm_term
✓ edge whitelist includes utm_term
✓ quote mapping includes utm_content
✓ edge whitelist includes utm_content
✓ quote mapping includes gclid
✓ edge whitelist includes gclid
✓ quote mapping includes gbraid
✓ edge whitelist includes gbraid
✓ quote mapping includes wbraid
✓ edge whitelist includes wbraid
✓ quote mapping includes fbclid
✓ edge whitelist includes fbclid
✓ quote mapping includes categoria
✓ edge whitelist includes categoria
✓ quote mapping includes subcategoria
✓ edge whitelist includes subcategoria
✓ quote mapping includes cantidad_aprox
✓ edge whitelist includes cantidad_aprox
✓ quote mapping includes ubicacion_proyecto
✓ edge whitelist includes ubicacion_proyecto
✓ quote mapping includes fecha_objetivo
✓ edge whitelist includes fecha_objetivo
✓ quote mapping includes requiere_instalacion
✓ edge whitelist includes requiere_instalacion
✓ quote mapping includes tiene_plano
✓ edge whitelist includes tiene_plano
✓ quote mapping includes uso_proyecto
✓ edge whitelist includes uso_proyecto
✓ quote mapping includes estado_superficie
✓ edge whitelist includes estado_superficie
✓ quote mapping includes tipo_cliente
✓ edge whitelist includes tipo_cliente
✓ quote mapping includes empresa
✓ edge whitelist includes empresa
✓ edge inserts only an explicit lead row whitelist
✓ edge normalizes dates and tri-state booleans
✓ edge independently constrains landing path
✓ edge repeats core contact validation
✓ edge preserves persistent intake rate limiting

RINON STRUCTURED LEAD CONTRACT PASSED: 22 CRM fields are typed, mapped and server-whitelisted.

> rinon-v2-staging@1.0.0-rc.7 qa:analytics
> node scripts/check-analytics-contract.mjs

✓ server analytics allows page_view
✓ client tracking knows page_view
✓ Edge intake allows page_view
✓ server analytics allows view_product
✓ client tracking knows view_product
✓ Edge intake allows view_product
✓ server analytics allows view_service
✓ client tracking knows view_service
✓ Edge intake allows view_service
✓ server analytics allows quote_start
✓ client tracking knows quote_start
✓ Edge intake allows quote_start
✓ server analytics allows quote_step
✓ client tracking knows quote_step
✓ Edge intake allows quote_step
✓ server analytics allows quote_submit
✓ client tracking knows quote_submit
✓ Edge intake allows quote_submit
✓ server analytics allows contact_whatsapp
✓ client tracking knows contact_whatsapp
✓ Edge intake allows contact_whatsapp
✓ server analytics allows contact_phone
✓ client tracking knows contact_phone
✓ Edge intake allows contact_phone
✓ server analytics allows generate_lead
✓ client tracking knows generate_lead
✓ Edge intake allows generate_lead
✓ server analytics allows maps_click
✓ client tracking knows maps_click
✓ Edge intake allows maps_click
✓ server analytics allows waze_click
✓ client tracking knows waze_click
✓ Edge intake allows waze_click
✓ server analytics allows menu_product_click
✓ client tracking knows menu_product_click
✓ Edge intake allows menu_product_click
✓ server analytics allows menu_service_click
✓ client tracking knows menu_service_click
✓ Edge intake allows menu_service_click
✓ server analytics allows resource_view
✓ client tracking knows resource_view
✓ Edge intake allows resource_view
✓ server analytics allows cta_click
✓ client tracking knows cta_click
✓ Edge intake allows cta_click
✓ public analytics route validates against server allowlist
✓ semantic CRO events persist internally after consent
✓ click tracking avoids duplicate contact persistence
✓ successful lead submission persists generate_lead
✓ analytics summary type exposes quote funnel metrics
✓ analytics funnel RPC migration is versioned
✓ analytics RPC migration includes quote_start
✓ analytics RPC migration includes quote_submit
✓ analytics RPC migration includes maps_click
✓ analytics RPC migration includes waze_click
✓ analytics RPC migration includes start_to_submit_rate
✓ analytics RPC migration includes submit_to_lead_rate
✓ admin analytics view exposes the persisted quote funnel
✓ admin analytics view is auth-gated and noindex
✓ package scripts expose analytics contract QA

RINON ANALYTICS CONTRACT PASSED: 15 consented CRO events aligned across client, API, Edge intake, RPC and admin funnel.

> rinon-v2-staging@1.0.0-rc.7 qa:legal
> node scripts/check-legal-contract.mjs

✓ legal publication is fail-closed behind explicit approval
✓ legal publication requires configured legal identity and representative
✓ legal pages share the publication readiness gate
✓ privacy draft documents the active private attachment flow
✓ privacy draft no longer describes attachments as unvalidated
✓ privacy draft documents consented campaign attribution
✓ cookie draft documents the supported optional external tools
✓ cookie copy and runtime both keep optional tracking consent-gated
✓ production tracking is mounted through the consent-aware production layer
✓ privacy request page is permanently noindex
✓ terms keep web requests distinct from binding fabrication orders
✓ authorized cutover requires explicit legal approval

RINON LEGAL CONTRACT PASSED: legal publication remains fail-closed and the draft matches the current intake, attachment and consent architecture.

> rinon-v2-staging@1.0.0-rc.7 preflight:production
> node scripts/preflight-production.mjs

RINON production preflight · SAFE PRE-CUTOVER
✓ canonical production base is https://rinon.cl
✓ indexation is fail-closed behind RINON_INDEXABLE
✓ robots.txt follows the indexation gate
✓ non-indexable environments block all crawlers
✓ commercial migration redirects are fail-closed
✓ legacy blog redirects are fail-closed
✓ public contact writes require lead-write configuration
✓ lead persistence has an explicit write gate
✓ normal lead persistence is tied to production release state
✓ public intake targets the dedicated Supabase edge endpoint
✓ public intake has a runtime configuration validator
✓ expanded products and services are part of sitemap generation
✓ preserved commercial URLs and migration resources remain in sitemap generation
✓ powder coating offer is confirmed while technical limits remain bounded
✓ metal repairs are registered as a confirmed commercial capability
✓ navigation owns /camas-metalicas
✓ migration resolver preserves /camas-metalicas
✓ navigation owns /camas-balinesas
✓ migration resolver preserves /camas-balinesas
✓ navigation owns /mesas-metalicas
✓ migration resolver preserves /mesas-metalicas
✓ navigation owns /escritorios-metalicos
✓ migration resolver preserves /escritorios-metalicos
✓ navigation owns /soldadura-mig
✓ migration resolver preserves /soldadura-mig
✓ navigation owns /corte-metalico
✓ migration resolver preserves /corte-metalico
✓ navigation owns /instalacion
✓ migration resolver preserves /instalacion
✓ navigation owns /reparaciones-metalicas
✓ migration resolver preserves /reparaciones-metalicas
✓ service navigation is commercial, short and free of removed menu labels
✓ URL migration inventory defines GSC reconciliation and completion gate
✓ URL migration inventory contains /portones-industriales
✓ URL migration inventory contains /mallas-separadoras-industriales
✓ URL migration inventory contains /cierre-perimetral-industrial
✓ URL migration inventory contains /cercos-metalicos-santiago
✓ URL migration inventory contains /reja-metalica-santiago
✓ URL migration inventory contains /soldadura-metalica-santiago
✓ URL migration inventory contains /pintura-electrostatica-zona-sur-santiago
✓ historical cercos-metalicos geographic family is covered
✓ migration declares a machine-readable GSC review pending count
✓ visual registry declares machine-readable cutover blockers
✓ RINON_INDEXABLE is not active before cutover authorization
✓ RINON_ENABLE_MIGRATION_REDIRECTS is not active before cutover authorization
✓ RINON_ENABLE_BLOG_REDIRECTS is not active before cutover authorization
✓ RINON_LEAD_WRITE_ENABLED is not active before cutover authorization
✓ RINON_PRODUCTION_TRACKING_ENABLED is not active before cutover authorization
✓ URL inventory remains explicitly incomplete before final crawl/GSC reconciliation

RINON PRODUCTION PREFLIGHT PASSED · SAFE PRE-CUTOVER.
NOTE: Cutover is intentionally blocked. Set RINON_CUTOVER_AUTHORIZED=true only during an explicitly authorized production release.
NOTE: RINON_URL_INVENTORY_COMPLETE must remain false until the live crawl and Search Console export are reconciled.
NOTE: 58 live-observed URL decisions remain GSC-pending and are hard-blocked from cutover.
NOTE: 2 final visual release blockers remain: home-hero-final-master, structures-residential-final-master.
▲ Next.js 16.2.9 (Turbopack)

  Creating an optimized production build ...
✓ Compiled successfully in 3.0s
  Running TypeScript ...

  We detected TypeScript in your project and reconfigured your tsconfig.json file for you.
  The following suggested values were added to your tsconfig.json. These values can be changed to fit your project's needs:

  	- include was updated to add '.next/dev/types/**/*.ts'

  Finished TypeScript in 2.9s ...
  Collecting page data using 7 workers ...
⚠ Using edge runtime on a page currently disables static generation for that page
  Generating static pages using 7 workers (0/150) ...
  Generating static pages using 7 workers (37/150) 
  Generating static pages using 7 workers (74/150) 
  Generating static pages using 7 workers (112/150) 
✓ Generating static pages using 7 workers (150/150) in 636ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
├ ● /[legacy]
│ ├ /camarote-nido
│ ├ /camarote-triple
│ ├ /camarote-doble
│ └ [+10 more paths]
├ ƒ /admin
├ ƒ /admin/analitica
├ ƒ /admin/api/leads/[id]
├ ƒ /admin/api/leads/[id]/attachments/[attachmentId]
├ ƒ /admin/api/opportunities
├ ƒ /admin/api/opportunities/[id]
├ ƒ /admin/api/opportunities/[id]/quotes
├ ƒ /admin/oportunidades
├ ƒ /admin/oportunidades/[id]
├ ƒ /api/admin/login
├ ƒ /api/admin/logout
├ ƒ /api/analytics
├ ƒ /api/contacto
├ ƒ /api/privacidad
├ ○ /blog
├ ● /blog/[slug]
│ ├ /blog/camarote-con-escritorio-guia-completa
│ ├ /blog/camarote-nido-que-es
│ ├ /blog/cama-alta-vs-camarote
│ └ [+73 more paths]
├ ○ /camarote-con-escritorio
├ ○ /camarotes
├ ○ /camas-balinesas
├ ○ /camas-metalicas
├ ○ /cierres-perimetrales
├ ○ /contacto
├ ○ /corte-metalico
├ ○ /cotizar
├ ○ /empresas
├ ○ /equipamiento-metalico
├ ○ /escritorios-metalicos
├ ○ /estructuras-metalicas
├ ○ /fabricacion-metalica
├ ○ /fabricaciones-especiales
├ ○ /instalacion
├ ○ /mallas-3d
├ ○ /mallas-separadoras
├ ○ /mesas-metalicas
├ ○ /nosotros
├ ƒ /opengraph-image
├ ○ /pintura-electrostatica
├ ○ /politica-de-cookies
├ ○ /politica-de-privacidad
├ ○ /portones-metalicos
├ ○ /preguntas-frecuentes
├ ○ /proyectos
├ ○ /recursos
├ ● /recursos/[slug]
│ ├ /recursos/como-cotizar-estructura-metalica
│ ├ /recursos/como-cotizar-cierre-perimetral
│ ├ /recursos/que-informacion-enviar-pintura-electrostatica
│ └ [+13 more paths]
├ ○ /rejas-metalicas
├ ○ /reparaciones-metalicas
├ ○ /robots.txt
├ ○ /sitemap.xml
├ ○ /soldadura-mig
├ ○ /solicitud-de-datos
├ ○ /soluciones
├ ○ /terminos
└ ○ /tratamiento-superficies


ƒ Proxy (Middleware)

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```
### Salida literal: npm run qa:served

```text

> rinon-v2-staging@1.0.0-rc.7 qa:served
> node scripts/check-served-build.mjs

✓ Next.js served build is reachable at http://127.0.0.1:3210
✓ /: HTML 200 (20 local assets referenced)
✓ /soluciones: HTML 200 (16 local assets referenced)
✓ /camarotes: HTML 200 (18 local assets referenced)
✓ /camarote-nido: HTML 200 (16 local assets referenced)
✓ /camas-metalicas: HTML 200 (16 local assets referenced)
✓ /camas-balinesas: HTML 200 (16 local assets referenced)
✓ /mesas-metalicas: HTML 200 (16 local assets referenced)
✓ /escritorios-metalicos: HTML 200 (16 local assets referenced)
✓ /cierres-perimetrales: HTML 200 (18 local assets referenced)
✓ /rejas-metalicas: HTML 200 (16 local assets referenced)
✓ /portones-metalicos: HTML 200 (16 local assets referenced)
✓ /mallas-3d: HTML 200 (16 local assets referenced)
✓ /mallas-separadoras: HTML 200 (16 local assets referenced)
✓ /estructuras-metalicas: HTML 200 (17 local assets referenced)
✓ /fabricacion-metalica: HTML 200 (16 local assets referenced)
✓ /mobiliario-institucional: HTML 200 (16 local assets referenced)
✓ /soldadura-mig: HTML 200 (16 local assets referenced)
✓ /corte-metalico: HTML 200 (16 local assets referenced)
✓ /pintura-electrostatica: HTML 200 (16 local assets referenced)
✓ /instalacion: HTML 200 (16 local assets referenced)
✓ /reparaciones-metalicas: HTML 200 (16 local assets referenced)
✓ /empresas: HTML 200 (16 local assets referenced)
✓ /proyectos: HTML 200 (17 local assets referenced)
✓ /nosotros: HTML 200 (16 local assets referenced)
✓ /contacto: HTML 200 (15 local assets referenced)
✓ /cotizar: HTML 200 (16 local assets referenced)
✓ /recursos: HTML 200 (15 local assets referenced)
✓ /blog: HTML 200 (15 local assets referenced)
✓ /robots.txt blocks indexing in preview
✓ unknown routes return 404

RINON SERVED-BUILD GATE PASSED: 28 routes, 25 assets (2 CSS / 13 JS / 7 images).
```
### Salida literal: npm run qa:browser

```text

> rinon-v2-staging@1.0.0-rc.7 qa:browser
> playwright test

[WebServer] (node:25695) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
[WebServer] (Use `node --trace-warnings ...` to show where the warning was created)

Running 51 tests using 1 worker

(node:25696) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
  ✓   1 tests/archive-visuals.spec.mjs:18:1 › home bunk chapter uses governed archive photography (1.3s)
  ✓   2 tests/archive-visuals.spec.mjs:34:1 › camarotes landing keeps archive provenance explicit (1.0s)
  ✓   3 tests/commercial-evidence.spec.mjs:5:1 › perimeter money pages use concrete evidence panels instead of hero diagrams (2.8s)
  ✓   4 tests/commercial-evidence.spec.mjs:17:1 › generic commercial solution fallback never promotes a technical diagram to hero evidence (862ms)
  ✓   5 tests/commercial-evidence.spec.mjs:25:1 › evidence-led perimeter heroes stay responsive (3.3s)
  ✓   6 tests/home-hero-resolution.spec.mjs:6:2 › home temporary hero respects governed source density at 1440px (999ms)
  ✓   7 tests/home-hero-resolution.spec.mjs:6:2 › home temporary hero respects governed source density at 1024px (942ms)
  ✓   8 tests/home-hero-resolution.spec.mjs:6:2 › home temporary hero respects governed source density at 768px (919ms)
  ✓   9 tests/home-hero-resolution.spec.mjs:6:2 › home temporary hero respects governed source density at 390px (845ms)
  ✓  10 tests/home-hero-resolution.spec.mjs:6:2 › home temporary hero respects governed source density at 320px (846ms)
  ✓  11 tests/legacy-evidence.spec.mjs:19:1 › preserved commercial URLs keep evidence-led heroes (8.5s)
  ✓  12 tests/local-trust.spec.mjs:6:2 › /contacto exposes one auditable workshop location (1.4s)
  ✓  13 tests/local-trust.spec.mjs:6:2 › /nosotros exposes one auditable workshop location (1.3s)
  ✓  14 tests/local-trust.spec.mjs:31:1 › contacto keeps quote, WhatsApp and phone paths measurable (1.3s)
  ✓  15 tests/local-trust.spec.mjs:40:1 › nosotros keeps local trust and dual conversion paths (1.3s)
  ✓  16 tests/local-trust.spec.mjs:49:1 › local trust pages do not overflow at mobile width (2.2s)
  ✓  17 tests/navigation-context.spec.mjs:3:1 › desktop navigation exposes the active product and service section (1.7s)
  ✓  18 tests/navigation-context.spec.mjs:15:1 › legacy product routes still orient the user toward Productos (853ms)
  ✓  19 tests/navigation-context.spec.mjs:21:1 › mobile navigation marks the current task family without overflow (934ms)
  ✓  20 tests/navigation-context.spec.mjs:30:1 › footer keeps products concise and services semantically pure (848ms)
  ✓  21 tests/projects-evidence.spec.mjs:3:1 › projects page opens with commercial evidence instead of a technical diagram (858ms)
  ✓  22 tests/projects-evidence.spec.mjs:12:1 › governed conceptual evidence never exceeds its declared source width (857ms)
  ✓  23 tests/projects-evidence.spec.mjs:34:1 › projects page has no horizontal overflow on compact breakpoints (2.5s)
  ✓  24 tests/quote-attachments.spec.mjs:10:1 › quote flow accepts up to three private-ready reference files without writing in staging (1.2s)
  ✓  25 tests/quote-attachments.spec.mjs:39:1 › quote attachment picker rejects more than three files before submission (934ms)
  ✓  26 tests/quote-attachments.spec.mjs:53:1 › quote attachment control remains usable and bounded on mobile (837ms)
  ✓  27 tests/quote-keyboard.spec.mjs:3:1 › quote wizard owns validation instead of hidden future fields (952ms)
  ✓  28 tests/quote-keyboard.spec.mjs:11:1 › pressing Enter can advance a prequalified first step (819ms)
  ✓  29 tests/render.spec.mjs:29:1 › home renders RC7 brand, navigation and quality-gated structure visual (1.0s)
  ✓  30 tests/render.spec.mjs:42:1 › critical commercial pages including expanded catalog render with CSS (13.0s)
  ✓  31 tests/render.spec.mjs:48:1 › projects-to-measure keeps SEO route but uses human-first UX (841ms)
  ✓  32 tests/render.spec.mjs:50:1 › quote experience is a real three-step progressive wizard (1.4s)
  ✓  33 tests/render.spec.mjs:60:1 › mobile navigation is task-led, reachable and responsive without overflow (3.9s)
  ✓  34 tests/render.spec.mjs:64:1 › quote wizard has no horizontal overflow on compact breakpoints (3.7s)
  ✓  35 tests/render.spec.mjs:66:1 › desktop does not duplicate the conversion dock (808ms)
  ✓  36 tests/render.spec.mjs:68:1 › about and contact include usable location actions (344ms)
  ✓  37 tests/render.spec.mjs:72:1 › approved legacy blog URL stays non-redirecting in safe preview (882ms)
  ✓  38 tests/render.spec.mjs:74:1 › unknown root-level routes still return the real 404 (991ms)
  ✓  39 tests/seo-cro.spec.mjs:60:1 › expanded commercial intent owners preserve SEO and dual conversion paths (5.3s)
  ✓  40 tests/seo-cro.spec.mjs:64:1 › preserved organic commercial URLs remain full conversion pages (8.5s)
  ✓  41 tests/seo-cro.spec.mjs:68:1 › primary solution landings keep canonical intent and commercial exit (4.8s)
  ✓  42 tests/seo-cro.spec.mjs:72:1 › generic solution template tracks the closing quote as well as WhatsApp (3.0s)
  ✓  43 tests/seo-cro.spec.mjs:82:1 › dedicated malla and custom-fabrication owners keep dual conversion paths (2.2s)
  ✓  44 tests/seo-cro.spec.mjs:86:1 › structures landing owns structural intent without pretending conceptual evidence is executed work (1.1s)
  ✓  45 tests/seo-cro.spec.mjs:104:1 › enterprise landing is a B2B intent owner with structured answers and three closing paths (855ms)
  ✓  46 tests/seo-cro.spec.mjs:123:1 › projects remains an evidence hub rather than a fake portfolio and keeps dual conversion (841ms)
  ✓  47 tests/seo-cro.spec.mjs:139:1 › rejas and portones preserve a dual conversion choice at the decision point (1.6s)
  ✓  48 tests/seo-cro.spec.mjs:149:1 › pre-cutover migration aliases remain disabled in staging (3.5s)
  ✓  49 tests/seo-cro.spec.mjs:158:1 › representative organic landings remain usable at mobile width (8.5s)
  ✓  50 tests/solutions-hub.spec.mjs:23:1 › solutions hub owns discovery IA and commercial exits (961ms)
  ✓  51 tests/solutions-hub.spec.mjs:27:1 › solutions hub remains usable on mobile (764ms)

  51 passed (1.9m)
```
### Salida literal: npm run qa:remote

```text

> rinon-v2-staging@1.0.0-rc.7 qa:remote
> node scripts/check-served-build.mjs https://rinon-v2.vercel.app

✓ /: HTML 200 (21 local assets referenced)
✓ /soluciones: HTML 200 (16 local assets referenced)
✓ /camarotes: HTML 200 (18 local assets referenced)
✓ /camarote-nido: HTML 200 (16 local assets referenced)
✓ /camas-metalicas: HTML 200 (16 local assets referenced)
✓ /camas-balinesas: HTML 200 (16 local assets referenced)
✓ /mesas-metalicas: HTML 200 (16 local assets referenced)
✓ /escritorios-metalicos: HTML 200 (16 local assets referenced)
✓ /cierres-perimetrales: HTML 200 (17 local assets referenced)
✓ /rejas-metalicas: HTML 200 (16 local assets referenced)
✓ /portones-metalicos: HTML 200 (16 local assets referenced)
✓ /mallas-3d: HTML 200 (16 local assets referenced)
✓ /mallas-separadoras: HTML 200 (16 local assets referenced)
✓ /estructuras-metalicas: HTML 200 (17 local assets referenced)
✓ /fabricacion-metalica: HTML 200 (16 local assets referenced)
✓ /mobiliario-institucional: HTML 200 (16 local assets referenced)
✓ /soldadura-mig: HTML 200 (16 local assets referenced)
✓ /corte-metalico: HTML 200 (16 local assets referenced)
✓ /pintura-electrostatica: HTML 200 (16 local assets referenced)
✓ /instalacion: HTML 200 (16 local assets referenced)
✓ /reparaciones-metalicas: HTML 200 (16 local assets referenced)
✓ /empresas: HTML 200 (16 local assets referenced)
✓ /proyectos: HTML 200 (17 local assets referenced)
✓ /nosotros: HTML 200 (16 local assets referenced)
✓ /contacto: HTML 200 (15 local assets referenced)
✓ /cotizar: HTML 200 (16 local assets referenced)
✓ /recursos: HTML 200 (15 local assets referenced)
✓ /blog: HTML 200 (15 local assets referenced)
✓ /robots.txt blocks indexing in preview
✓ unknown routes return 404

RINON SERVED-BUILD GATE PASSED: 28 routes, 25 assets (2 CSS / 13 JS / 9 images).
```
### Salida literal: npm run qa:browser:remote

```text

> rinon-v2-staging@1.0.0-rc.7 qa:browser:remote
> RINON_PLAYWRIGHT_BASE_URL=${RINON_PLAYWRIGHT_BASE_URL:-https://rinon-v2.vercel.app} playwright test


Running 51 tests using 1 worker

(node:26241) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
  ✓   1 tests/archive-visuals.spec.mjs:18:1 › home bunk chapter uses governed archive photography (2.0s)
  ✓   2 tests/archive-visuals.spec.mjs:34:1 › camarotes landing keeps archive provenance explicit (2.3s)
  ✓   3 tests/commercial-evidence.spec.mjs:5:1 › perimeter money pages use concrete evidence panels instead of hero diagrams (6.3s)
  ✓   4 tests/commercial-evidence.spec.mjs:17:1 › generic commercial solution fallback never promotes a technical diagram to hero evidence (1.9s)
  ✓   5 tests/commercial-evidence.spec.mjs:25:1 › evidence-led perimeter heroes stay responsive (6.0s)
  ✓   6 tests/home-hero-resolution.spec.mjs:6:2 › home temporary hero respects governed source density at 1440px (1.9s)
  ✓   7 tests/home-hero-resolution.spec.mjs:6:2 › home temporary hero respects governed source density at 1024px (1.5s)
  ✓   8 tests/home-hero-resolution.spec.mjs:6:2 › home temporary hero respects governed source density at 768px (1.5s)
  ✓   9 tests/home-hero-resolution.spec.mjs:6:2 › home temporary hero respects governed source density at 390px (1.4s)
  ✓  10 tests/home-hero-resolution.spec.mjs:6:2 › home temporary hero respects governed source density at 320px (1.5s)
  ✓  11 tests/legacy-evidence.spec.mjs:19:1 › preserved commercial URLs keep evidence-led heroes (16.6s)
  ✓  12 tests/local-trust.spec.mjs:6:2 › /contacto exposes one auditable workshop location (1.8s)
  ✓  13 tests/local-trust.spec.mjs:6:2 › /nosotros exposes one auditable workshop location (1.6s)
  ✓  14 tests/local-trust.spec.mjs:31:1 › contacto keeps quote, WhatsApp and phone paths measurable (1.7s)
  ✓  15 tests/local-trust.spec.mjs:40:1 › nosotros keeps local trust and dual conversion paths (1.6s)
  ✓  16 tests/local-trust.spec.mjs:49:1 › local trust pages do not overflow at mobile width (3.6s)
  ✓  17 tests/navigation-context.spec.mjs:3:1 › desktop navigation exposes the active product and service section (3.3s)
  ✓  18 tests/navigation-context.spec.mjs:15:1 › legacy product routes still orient the user toward Productos (1.8s)
  ✓  19 tests/navigation-context.spec.mjs:21:1 › mobile navigation marks the current task family without overflow (1.5s)
  ✓  20 tests/navigation-context.spec.mjs:30:1 › footer keeps products concise and services semantically pure (1.6s)
  ✓  21 tests/projects-evidence.spec.mjs:3:1 › projects page opens with commercial evidence instead of a technical diagram (1.7s)
  ✓  22 tests/projects-evidence.spec.mjs:12:1 › governed conceptual evidence never exceeds its declared source width (1.6s)
  ✓  23 tests/projects-evidence.spec.mjs:34:1 › projects page has no horizontal overflow on compact breakpoints (4.6s)
  ✓  24 tests/quote-attachments.spec.mjs:10:1 › quote flow accepts up to three private-ready reference files without writing in staging (1.9s)
  ✓  25 tests/quote-attachments.spec.mjs:39:1 › quote attachment picker rejects more than three files before submission (1.9s)
  ✓  26 tests/quote-attachments.spec.mjs:53:1 › quote attachment control remains usable and bounded on mobile (1.5s)
  ✓  27 tests/quote-keyboard.spec.mjs:3:1 › quote wizard owns validation instead of hidden future fields (1.8s)
  ✓  28 tests/quote-keyboard.spec.mjs:11:1 › pressing Enter can advance a prequalified first step (1.7s)
  ✘  29 tests/render.spec.mjs:29:1 › home renders RC7 brand, navigation and quality-gated structure visual (1.7s)
(node:26558) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
  ✘  30 tests/render.spec.mjs:42:1 › critical commercial pages including expanded catalog render with CSS (1.8s)
(node:26566) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
  ✓  31 tests/render.spec.mjs:48:1 › projects-to-measure keeps SEO route but uses human-first UX (1.8s)
  ✘  32 tests/render.spec.mjs:50:1 › quote experience is a real three-step progressive wizard (30.5s)
(node:26660) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
  ✘  33 tests/render.spec.mjs:60:1 › mobile navigation is task-led, reachable and responsive without overflow (1.8s)
(node:26676) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
  ✓  34 tests/render.spec.mjs:64:1 › quote wizard has no horizontal overflow on compact breakpoints (5.5s)
  ✓  35 tests/render.spec.mjs:66:1 › desktop does not duplicate the conversion dock (1.7s)
  ✘  36 tests/render.spec.mjs:68:1 › about and contact include usable location actions (802ms)
(node:26745) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
  ✓  37 tests/render.spec.mjs:72:1 › approved legacy blog URL stays non-redirecting in safe preview (3.6s)
  ✓  38 tests/render.spec.mjs:74:1 › unknown root-level routes still return the real 404 (3.6s)
  ✓  39 tests/seo-cro.spec.mjs:60:1 › expanded commercial intent owners preserve SEO and dual conversion paths (11.8s)
  ✓  40 tests/seo-cro.spec.mjs:64:1 › preserved organic commercial URLs remain full conversion pages (17.2s)
  ✓  41 tests/seo-cro.spec.mjs:68:1 › primary solution landings keep canonical intent and commercial exit (9.7s)
  ✓  42 tests/seo-cro.spec.mjs:72:1 › generic solution template tracks the closing quote as well as WhatsApp (5.8s)
  ✓  43 tests/seo-cro.spec.mjs:82:1 › dedicated malla and custom-fabrication owners keep dual conversion paths (4.5s)
  ✘  44 tests/seo-cro.spec.mjs:86:1 › structures landing owns structural intent without pretending conceptual evidence is executed work (1.8s)
(node:26965) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
  ✘  45 tests/seo-cro.spec.mjs:104:1 › enterprise landing is a B2B intent owner with structured answers and three closing paths (1.9s)
(node:26976) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
  ✓  46 tests/seo-cro.spec.mjs:123:1 › projects remains an evidence hub rather than a fake portfolio and keeps dual conversion (1.7s)
  ✓  47 tests/seo-cro.spec.mjs:139:1 › rejas and portones preserve a dual conversion choice at the decision point (3.8s)
  ✓  48 tests/seo-cro.spec.mjs:149:1 › pre-cutover migration aliases remain disabled in staging (12.4s)
  ✓  49 tests/seo-cro.spec.mjs:158:1 › representative organic landings remain usable at mobile width (13.9s)
  ✓  50 tests/solutions-hub.spec.mjs:23:1 › solutions hub owns discovery IA and commercial exits (3.9s)
  ✓  51 tests/solutions-hub.spec.mjs:27:1 › solutions hub remains usable on mobile (1.4s)


  1) tests/render.spec.mjs:29:1 › home renders RC7 brand, navigation and quality-gated structure visual 

    Error: expect(received).toBeTruthy()

    Received: false

      13 |   return {logoLoaded:logo instanceof HTMLImageElement&&logo.complete&&logo.naturalWidth>100,logoSrc:logo instanceof HTMLImageElement?logo.currentSrc:"",bodyFont:body.fontFamily,footerColor:link?.color??"",footerDecoration:link?.textDecorationLine??"",scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth};
      14 |  });
    > 15 |  expect(chrome.logoLoaded).toBeTruthy();
         |                            ^
      16 |  expect(chrome.logoSrc).toContain("/brand/logo-rinon-horizontal-transparent.png");
      17 |  expect(chrome.logoSrc).not.toContain("/_next/image");
      18 |  expect(chrome.bodyFont.toLowerCase()).toContain("raleway");
        at assertBrandChrome (/Users/valgreen/Documents/CLIENTES/RINON/rinon-v2/tests/render.spec.mjs:15:28)
        at /Users/valgreen/Documents/CLIENTES/RINON/rinon-v2/tests/render.spec.mjs:31:131

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/render-home-renders-RC7-br-65e8c-lity-gated-structure-visual/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/render-home-renders-RC7-br-65e8c-lity-gated-structure-visual/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/render-home-renders-RC7-br-65e8c-lity-gated-structure-visual/trace.zip
    Usage:

        npx playwright show-trace test-results/render-home-renders-RC7-br-65e8c-lity-gated-structure-visual/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

  2) tests/render.spec.mjs:42:1 › critical commercial pages including expanded catalog render with CSS 

    Error: expect(received).toBeTruthy()

    Received: false

      13 |   return {logoLoaded:logo instanceof HTMLImageElement&&logo.complete&&logo.naturalWidth>100,logoSrc:logo instanceof HTMLImageElement?logo.currentSrc:"",bodyFont:body.fontFamily,footerColor:link?.color??"",footerDecoration:link?.textDecorationLine??"",scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth};
      14 |  });
    > 15 |  expect(chrome.logoLoaded).toBeTruthy();
         |                            ^
      16 |  expect(chrome.logoSrc).toContain("/brand/logo-rinon-horizontal-transparent.png");
      17 |  expect(chrome.logoSrc).not.toContain("/_next/image");
      18 |  expect(chrome.bodyFont.toLowerCase()).toContain("raleway");
        at assertBrandChrome (/Users/valgreen/Documents/CLIENTES/RINON/rinon-v2/tests/render.spec.mjs:15:28)
        at /Users/valgreen/Documents/CLIENTES/RINON/rinon-v2/tests/render.spec.mjs:44:104

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/render-critical-commercial-c3e03-ded-catalog-render-with-CSS/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/render-critical-commercial-c3e03-ded-catalog-render-with-CSS/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/render-critical-commercial-c3e03-ded-catalog-render-with-CSS/trace.zip
    Usage:

        npx playwright show-trace test-results/render-critical-commercial-c3e03-ded-catalog-render-with-CSS/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

  3) tests/render.spec.mjs:50:1 › quote experience is a real three-step progressive wizard ─────────

    Test timeout of 30000ms exceeded.

    Error: locator.check: Test timeout of 30000ms exceeded.
    Call log:
      - waiting for getByLabel(/Acepto que RINON use estos datos/)


      54 |  await page.getByRole("button",{name:/Continuar/}).click();await expect(page.locator('[data-quote-step="2"]')).toBeVisible();await expect(page.locator('[data-quote-step="1"]')).toBeHidden();
      55 |  await page.getByLabel("Ubicación *").fill("San Bernardo");await page.getByLabel("Cuéntanos qué necesitas resolver *").fill("Necesito fabricar y soldar una estructura metálica según medidas aproximadas.");await page.getByRole("button",{name:/Continuar/}).click();
    > 56 |  await expect(page.locator('[data-quote-step="3"]')).toBeVisible();await page.getByLabel("Nombre *").fill("QA RINON");await page.getByLabel("Tipo de cliente *").selectOption("Particular");await page.getByLabel("WhatsApp *").fill("+56911111111");await page.getByLabel(/Acepto que RINON use estos datos/).check();await page.getByRole("button",{name:"Solicitar cotización"}).click();
         |                                                                                                                                                                                                                                                                                                                ^
      57 |  await expect(page.locator(".quote-status")).toContainText("Formulario revisado correctamente");
      58 | });
      59 |
        at /Users/valgreen/Documents/CLIENTES/RINON/rinon-v2/tests/render.spec.mjs:56:304

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/render-quote-experience-is-cc323-ree-step-progressive-wizard/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/render-quote-experience-is-cc323-ree-step-progressive-wizard/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/render-quote-experience-is-cc323-ree-step-progressive-wizard/trace.zip
    Usage:

        npx playwright show-trace test-results/render-quote-experience-is-cc323-ree-step-progressive-wizard/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

  4) tests/render.spec.mjs:60:1 › mobile navigation is task-led, reachable and responsive without overflow 

    Error: expect(received).toBe(expected) // Object.is equality

    Expected: "sticky"
    Received: "absolute"

      59 |
      60 | test("mobile navigation is task-led, reachable and responsive without overflow",async({page})=>{
    > 61 |  for(const width of [320,375,430,768,1024]){await page.setViewportSize({width,height:900});await page.goto("/",{waitUntil:"networkidle"});const state=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth}));expect(state.scrollWidth).toBeLessThanOrEqual(state.innerWidth+2);const toggle=page.locator(".mobile-nav-toggle");await expect(toggle).toBeVisible();await toggle.click();const panel=page.locator("#mobile-navigation");await expect(panel).toBeVisible();await expect(panel.getByRole("link",{name:/Proyectos a medida/})).toBeVisible();await expect(panel.getByRole("link",{name:/Empresas/})).toBeVisible();await expect(panel.getByRole("link",{name:/Nosotros/})).toBeVisible();const actions=page.locator(".mobile-nav-actions");await expect(actions).toBeVisible();await expect(panel.getByRole("link",{name:/Cotizar/})).toBeVisible();const navCss=await page.evaluate(()=>({top:getComputedStyle(document.querySelector(".mobile-nav-top")).position,actions:getComputedStyle(document.querySelector(".mobile-nav-actions")).position}));expect(navCss.top).toBe("sticky");expect(navCss.actions).toBe("sticky");await panel.evaluate(node=>{node.scrollTop=node.scrollHeight});await expect(actions).toBeVisible();await page.locator(".mobile-nav-close").click();await expect(toggle).toBeFocused()}
         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ^
      62 | });
      63 |
      64 | test("quote wizard has no horizontal overflow on compact breakpoints",async({page})=>{for(const width of [320,360,375,390,430,768]){await page.setViewportSize({width,height:900});await page.goto("/cotizar?category=estructuras",{waitUntil:"networkidle"});const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth,progressVisible:!!document.querySelector(".quote-progress"),activeStep:document.querySelector('.quote-progress [aria-current="step"]')?.textContent??""}));expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth+2);expect(metrics.progressVisible).toBeTruthy();expect(metrics.activeStep).toContain("Qué necesitas")}});
        at /Users/valgreen/Documents/CLIENTES/RINON/rinon-v2/tests/render.spec.mjs:61:1099

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/render-mobile-navigation-i-710a9-responsive-without-overflow/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/render-mobile-navigation-i-710a9-responsive-without-overflow/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/render-mobile-navigation-i-710a9-responsive-without-overflow/trace.zip
    Usage:

        npx playwright show-trace test-results/render-mobile-navigation-i-710a9-responsive-without-overflow/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

  5) tests/render.spec.mjs:68:1 › about and contact include usable location actions ────────────────

    Error: expect(received).toBeTruthy()

    Received: false

      13 |   return {logoLoaded:logo instanceof HTMLImageElement&&logo.complete&&logo.naturalWidth>100,logoSrc:logo instanceof HTMLImageElement?logo.currentSrc:"",bodyFont:body.fontFamily,footerColor:link?.color??"",footerDecoration:link?.textDecorationLine??"",scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth};
      14 |  });
    > 15 |  expect(chrome.logoLoaded).toBeTruthy();
         |                            ^
      16 |  expect(chrome.logoSrc).toContain("/brand/logo-rinon-horizontal-transparent.png");
      17 |  expect(chrome.logoSrc).not.toContain("/_next/image");
      18 |  expect(chrome.bodyFont.toLowerCase()).toContain("raleway");
        at assertBrandChrome (/Users/valgreen/Documents/CLIENTES/RINON/rinon-v2/tests/render.spec.mjs:15:28)
        at /Users/valgreen/Documents/CLIENTES/RINON/rinon-v2/tests/render.spec.mjs:69:102

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/render-about-and-contact-include-usable-location-actions/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/render-about-and-contact-include-usable-location-actions/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/render-about-and-contact-include-usable-location-actions/trace.zip
    Usage:

        npx playwright show-trace test-results/render-about-and-contact-include-usable-location-actions/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

  6) tests/seo-cro.spec.mjs:86:1 › structures landing owns structural intent without pretending conceptual evidence is executed work 

    Error: expect(received).toContain(expected) // indexOf

    Expected substring: "visual conceptual"
    Received string:    "estructuras metálicas · san bernardo
    estructuras metálicas para el espacio y la función que necesitas.·
    desde un cobertizo o pérgola para una vivienda hasta una escalera, plataforma o soporte para una empresa. partimos por el uso, las dimensiones, los apoyos y el lugar real; después definimos qué es fabricable y qué antecedentes faltan.·
    cotizar estructura
    ↗
    enviar referencia por whatsapp
    ver qué fabricamos
    ↓
    foto · plano · croquis
    residencial + empresa
    alcance antes de fabricar
    referencia arquitectónica · render
    referencia arquitectónica · render aportado
    render de referencia proveniente del archivo del usuario. ayuda a explicar contexto e integración espacial; no corresponde a una obra ejecutada por rinon ni define la solución estructural final.
    referencia · no obra ejecutada
    render aportado para mostrar contexto residencial
    qué podemos evaluar
    una misma capacidad, cuatro tipos de necesidad.·
    esta página es para quien ya sabe que necesita una estructura. si lo que buscas es una pieza, réplica, componente o fabricación todavía abierta, conviene partir por fabricación metálica a medida.·
    01
    cobertizos y pérgolas·
    estructuras para viviendas, terrazas, estacionamientos y espacios comerciales, evaluadas según dimensiones, apoyos, cubierta, terminación e integración arquitectónica.·
    02
    escaleras y plataformas·
    elementos de acceso o trabajo fabricados a medida cuando dimensiones, uso, apoyos y requerimientos aplicables están suficientemente definidos.·
    03
    soportes y bastidores·
    marcos, bases y conjuntos metálicos para habilitación, apoyo de equipos u otras funciones con geometría conocida.·
    04
    estructuras especiales·
    conjuntos no estándar que se revisan desde su función, dimensiones, material, restricciones del lugar y forma de montaje.·
    tengo otro proyecto a medida
    residencial + comercial
    un cobertizo debe integrarse al lugar, no parecer agregado después.·
    en viviendas y espacios de atención al público importan tanto la modulación y los apoyos como la proporción, la cubierta y la terminación. el objetivo es evaluar una estructura limpia y coherente con la arquitectura existente.·
    01
    implantación·
    se revisan medidas, circulación, muros, apoyos existentes y relación con puertas, ventanas o estacionamientos.·
    02
    geometría·
    altura, luces, modulación y encuentros deben responder al espacio real y al uso previsto.·
    03
    terminación·
    color, acabado y cubierta se confirman dentro del alcance aplicable al proyecto.·
    04
    montaje·
    accesos, apoyos, interferencias y condiciones del lugar se revisan antes de comprometer instalación.·
    empresas y operación
    también fabricamos estructuras donde la función manda.·
    escaleras, plataformas, bastidores, soportes y conjuntos especiales requieren un requerimiento más explícito. si existen cargas, normas, documentación o ingeniería exigida por el proyecto, deben informarse para separar fabricación de responsabilidades técnicas adicionales.·
    01
    escaleras
    acceso
    02
    plataformas
    operación
    03
    soportes
    habilitación
    04
    bastidores
    conjunto
    05
    especiales
    a medida
    para cotizar
    cuatro antecedentes reducen la mayor parte de los supuestos.·
    no necesitas tener un plano profesional para iniciar. envía lo que tengas y separamos la información disponible de lo que realmente debe definirse antes de fabricar.·
    01
    referencia·
    plano, croquis, fotografía o una explicación clara de lo que la estructura debe resolver.·
    02
    dimensiones·
    ancho, largo, altura y cualquier restricción relevante del espacio.·
    03
    uso·
    residencial, comercial u operacional; incluye cargas o condiciones técnicas solo cuando ya estén definidas.·
    04
    ubicación·
    comuna, fotografías del lugar y si necesitas evaluar fabricación, despacho o montaje.·
    alcance sin letra chica
    fabricar una estructura no equivale automáticamente a desarrollar su ingeniería.
    buen punto de partida
    ✓
    tienes función, croquis, plano, foto o medidas
    ✓
    conoces ubicación y restricciones del lugar
    ✓
    puedes explicar el uso del conjunto
    se confirma antes de comprometer
    →
    cálculo o memoria cuando se requiera
    →
    cargas o capacidades que exijan respaldo técnico
    →
    montaje, documentación o responsabilidad profesional especial
    preguntas frecuentes
    antes de definir geometría y precio.·
    las respuestas describen el proceso de evaluación. materiales, medidas, montaje y terminación definitivos quedan en la cotización aplicable al proyecto.·
    ¿qué necesito para cotizar una estructura metálica?
    ¿fabrican cobertizos y pérgolas metálicas para casas?
    ¿también trabajan estructuras para empresas?
    ¿incluyen cálculo estructural o memoria de cálculo?
    siguiente paso
    muéstranos el espacio o la estructura que necesitas.·
    una foto, croquis o plano junto con medidas aproximadas, ubicación y uso es suficiente para iniciar la revisión.·
    cotizar estructura
    hablar por whatsapp"

      94 |  expect(text).toContain("empresas y operación");
      95 |  expect(text).toContain("fabricar una estructura no equivale automáticamente a desarrollar su ingeniería");
    > 96 |  expect(text).toContain("visual conceptual");
         |               ^
      97 |  expect(text).toContain("no obra ejecutada");
      98 |  const schema=await main.locator('script[type="application/ld+json"]').first().textContent();
      99 |  expect(schema).toContain('"@type":"Service"');
        at /Users/valgreen/Documents/CLIENTES/RINON/rinon-v2/tests/seo-cro.spec.mjs:96:15

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/seo-cro-structures-landing-b4a70-l-evidence-is-executed-work/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/seo-cro-structures-landing-b4a70-l-evidence-is-executed-work/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/seo-cro-structures-landing-b4a70-l-evidence-is-executed-work/trace.zip
    Usage:

        npx playwright show-trace test-results/seo-cro-structures-landing-b4a70-l-evidence-is-executed-work/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

  7) tests/seo-cro.spec.mjs:104:1 › enterprise landing is a B2B intent owner with structured answers and three closing paths 

    Error: expect(received).toContain(expected) // indexOf

    Expected substring: "Compra por volumen"
    Received string:    "EMPRESAS · INSTITUCIONES · OBRAS
    Fabricación para empresas, obras e instituciones.·
    Desde una serie de camarotes hasta cierres, estructuras, soportes o piezas bajo plano. Cuéntanos cantidad, destino y fecha objetivo para ordenar la evaluación desde el inicio.·
    Cotizar para empresa
    Conversar por WhatsApp
    COMPRA POR VOLUMEN
    PROYECTO / OBRA
    BAJO PLANO
    REQUERIMIENTO RECURRENTE
    QUÉ PODEMOS ORDENAR CONTIGO
    01
    VOLUMEN·
    Series, lotes y compras repetibles cuando cantidad y configuración están definidas.·
    02
    BAJO PLANO·
    Piezas, soportes y conjuntos cuando la geometría y especificación vienen definidas.·
    03
    PROYECTO·
    Cierres, estructuras y equipamiento asociados a una obra o necesidad de terreno.·
    04
    RECURRENTE·
    Requerimientos que se repiten y pueden estandarizarse comercialmente.·
    La capacidad, plazo y alcance final se confirman para cada cotización.
    QUIÉN NECESITA QUÉ
    Un mismo proyecto se ve distinto según el rol.·
    La solicitud comercial debe recoger suficiente contexto para que el requerimiento sobreviva al traspaso entre áreas.·
    COMPRAS
    Necesita comparar alcance y precio·
    Cantidad, especificación, destino, fecha y condiciones comerciales claramente separadas.·
    OPERACIONES
    Necesita resolver una función·
    Uso real, restricciones, ubicación, mantenimiento y continuidad operacional.·
    OBRA / TERRENO
    Necesita coordinar fabricación y montaje·
    Medidas, accesos, secuencia, interferencias y condiciones del sitio.·
    ADMINISTRACIÓN
    Necesita trazabilidad del requerimiento·
    Qué se pidió, qué se cotizó, qué cambió y qué incluye finalmente el alcance.·
    ENTORNOS DE COMPRA
    Lo que se fabrica cambia según la operación.·
    La misma capacidad de taller puede resolver necesidades distintas. Lo importante es definir uso, cantidad, destino y condiciones del proyecto.·
    01
    Construcción y obra·
    Cierres, estructuras, soportes, accesos y piezas asociadas a una habilitación o frente de trabajo.·
    CLAVE · medidas · secuencia · terreno
    02
    Industria y mantenimiento·
    Reparaciones, bases, protecciones, bastidores y fabricaciones para resolver una necesidad operacional concreta.·
    CLAVE · función · interferencias · continuidad
    03
    Bodegas y logística·
    Equipamiento, divisiones, cierres y elementos repetibles para ordenar o habilitar espacios.·
    CLAVE · uso · espacio · cantidad
    04
    Instituciones y faenas·
    Camas, camarotes, lockers y otros productos cuando cantidad, destino y entrega son parte central de la compra.·
    CLAVE · volumen · destino · fecha
    CÓMO AVANZA
    Una compra ordenada desde el primer contacto.·
    Primero entendemos lo que se necesita. Después definimos qué falta confirmar para convertirlo en una propuesta fabricable y coordinable.·
    01
    Necesidad
    CONTEXTO
    02
    Revisión
    FACTIBILIDAD
    03
    Cotización
    ALCANCE
    04
    Coordinación
    PROYECTO
    05
    Fabricación y entrega
    EJECUCIÓN
    PARA UNA PRIMERA REVISIÓN
    Cuatro datos permiten empezar.·
    No necesitas preparar una licitación completa para conversar. Con estos antecedentes podemos identificar rápidamente qué falta.·
    01 · REFERENCIA
    Qué necesitas·
    Producto, plano, fotografía, muestra o descripción funcional.·
    02 · CANTIDAD
    Qué volumen·
    Unidades o metraje aproximado para dimensionar fabricación.·
    03 · DESTINO
    Dónde se entrega·
    Ubicación para evaluar logística y montaje cuando corresponda.·
    04 · FECHA
    Cuándo lo necesitas·
    Plazo objetivo sujeto a revisión contra alcance y capacidad.·
    RUTAS DE COMPRA
    Entra por la necesidad que ya tienes definida.·
    Estas rutas mantienen separada la intención de producto, cierre y proyecto a medida para evitar cotizaciones ambiguas.·
    ALOJAMIENTO
    Camas y camarotes·
    Compra por unidad o volumen con configuración confirmada al cotizar.·
    Ver productos →
    PERÍMETRO
    Cierres y accesos·
    Cierres, mallas, rejas y portones para terrenos, obras y recintos.·
    Ver cierres →
    ESTRUCTURAS
    Estructuras metálicas·
    Cobertizos, escaleras, plataformas, soportes y conjuntos especiales.·
    Ver estructuras →
    A MEDIDA
    Fabricación bajo requerimiento·
    Parte desde plano, foto, muestra, croquis o una necesidad funcional.·
    Ver fabricación →
    PREGUNTAS FRECUENTES
    Antes de enviar un requerimiento B2B.·
    La cotización vigente define capacidad, plazo, logística, montaje y documentación aplicables a cada compra.·
    ¿Pueden cotizar compras por volumen?
    ¿Trabajan a partir de planos o especificaciones de empresa?
    ¿Pueden incluir despacho o montaje?
    ¿Qué información conviene enviar primero?
    EMPRESAS
    ¿Tienes un requerimiento por volumen o proyecto?·
    Indica referencia, cantidad, destino y fecha objetivo. Si tienes plano, ficha o fotografías, también puedes enviarlas por WhatsApp.·
    Enviar requerimiento B2B
    Enviar antecedentes por WhatsApp
    Preparar compra"

      109 |  await expect(main).toHaveCount(1);
      110 |  const text=await main.innerText();
    > 111 |  expect(text).toContain("Compra por volumen");
          |               ^
      112 |  expect(text).toContain("RUTAS DE COMPRA");
      113 |  expect(text).toContain("Bajo plano");
      114 |  const schema=await main.locator('script[type="application/ld+json"]').first().textContent();
        at /Users/valgreen/Documents/CLIENTES/RINON/rinon-v2/tests/seo-cro.spec.mjs:111:15

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/seo-cro-enterprise-landing-cec75-ers-and-three-closing-paths/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/seo-cro-enterprise-landing-cec75-ers-and-three-closing-paths/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/seo-cro-enterprise-landing-cec75-ers-and-three-closing-paths/trace.zip
    Usage:

        npx playwright show-trace test-results/seo-cro-enterprise-landing-cec75-ers-and-three-closing-paths/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

  7 failed
    tests/render.spec.mjs:29:1 › home renders RC7 brand, navigation and quality-gated structure visual 
    tests/render.spec.mjs:42:1 › critical commercial pages including expanded catalog render with CSS 
    tests/render.spec.mjs:50:1 › quote experience is a real three-step progressive wizard ──────────
    tests/render.spec.mjs:60:1 › mobile navigation is task-led, reachable and responsive without overflow 
    tests/render.spec.mjs:68:1 › about and contact include usable location actions ─────────────────
    tests/seo-cro.spec.mjs:86:1 › structures landing owns structural intent without pretending conceptual evidence is executed work 
    tests/seo-cro.spec.mjs:104:1 › enterprise landing is a B2B intent owner with structured answers and three closing paths 
  44 passed (3.8m)
```
### Fallos remotos extraidos

### Fallo remoto

```text
1) tests/render.spec.mjs:29:1 › home renders RC7 brand, navigation and quality-gated structure visual 

    Error: expect(received).toBeTruthy()

    Received: false

      13 |   return {logoLoaded:logo instanceof HTMLImageElement&&logo.complete&&logo.naturalWidth>100,logoSrc:logo instanceof HTMLImageElement?logo.currentSrc:"",bodyFont:body.fontFamily,footerColor:link?.color??"",footerDecoration:link?.textDecorationLine??"",scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth};
      14 |  });
    > 15 |  expect(chrome.logoLoaded).toBeTruthy();
         |                            ^
      16 |  expect(chrome.logoSrc).toContain("/brand/logo-rinon-horizontal-transparent.png");
      17 |  expect(chrome.logoSrc).not.toContain("/_next/image");
      18 |  expect(chrome.bodyFont.toLowerCase()).toContain("raleway");
        at assertBrandChrome (/Users/valgreen/Documents/CLIENTES/RINON/rinon-v2/tests/render.spec.mjs:15:28)
        at /Users/valgreen/Documents/CLIENTES/RINON/rinon-v2/tests/render.spec.mjs:31:131

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/render-home-renders-RC7-br-65e8c-lity-gated-structure-visual/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/render-home-renders-RC7-br-65e8c-lity-gated-structure-visual/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/render-home-renders-RC7-br-65e8c-lity-gated-structure-visual/trace.zip
    Usage:

        npx playwright show-trace test-results/render-home-renders-RC7-br-65e8c-lity-gated-structure-visual/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────
```
### Fallo remoto

```text
2) tests/render.spec.mjs:42:1 › critical commercial pages including expanded catalog render with CSS 

    Error: expect(received).toBeTruthy()

    Received: false

      13 |   return {logoLoaded:logo instanceof HTMLImageElement&&logo.complete&&logo.naturalWidth>100,logoSrc:logo instanceof HTMLImageElement?logo.currentSrc:"",bodyFont:body.fontFamily,footerColor:link?.color??"",footerDecoration:link?.textDecorationLine??"",scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth};
      14 |  });
    > 15 |  expect(chrome.logoLoaded).toBeTruthy();
         |                            ^
      16 |  expect(chrome.logoSrc).toContain("/brand/logo-rinon-horizontal-transparent.png");
      17 |  expect(chrome.logoSrc).not.toContain("/_next/image");
      18 |  expect(chrome.bodyFont.toLowerCase()).toContain("raleway");
        at assertBrandChrome (/Users/valgreen/Documents/CLIENTES/RINON/rinon-v2/tests/render.spec.mjs:15:28)
        at /Users/valgreen/Documents/CLIENTES/RINON/rinon-v2/tests/render.spec.mjs:44:104

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/render-critical-commercial-c3e03-ded-catalog-render-with-CSS/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/render-critical-commercial-c3e03-ded-catalog-render-with-CSS/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/render-critical-commercial-c3e03-ded-catalog-render-with-CSS/trace.zip
    Usage:

        npx playwright show-trace test-results/render-critical-commercial-c3e03-ded-catalog-render-with-CSS/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────
```
### Fallo remoto

```text
3) tests/render.spec.mjs:50:1 › quote experience is a real three-step progressive wizard ─────────

    Test timeout of 30000ms exceeded.

    Error: locator.check: Test timeout of 30000ms exceeded.
    Call log:
      - waiting for getByLabel(/Acepto que RINON use estos datos/)


      54 |  await page.getByRole("button",{name:/Continuar/}).click();await expect(page.locator('[data-quote-step="2"]')).toBeVisible();await expect(page.locator('[data-quote-step="1"]')).toBeHidden();
      55 |  await page.getByLabel("Ubicación *").fill("San Bernardo");await page.getByLabel("Cuéntanos qué necesitas resolver *").fill("Necesito fabricar y soldar una estructura metálica según medidas aproximadas.");await page.getByRole("button",{name:/Continuar/}).click();
    > 56 |  await expect(page.locator('[data-quote-step="3"]')).toBeVisible();await page.getByLabel("Nombre *").fill("QA RINON");await page.getByLabel("Tipo de cliente *").selectOption("Particular");await page.getByLabel("WhatsApp *").fill("+56911111111");await page.getByLabel(/Acepto que RINON use estos datos/).check();await page.getByRole("button",{name:"Solicitar cotización"}).click();
         |                                                                                                                                                                                                                                                                                                                ^
      57 |  await expect(page.locator(".quote-status")).toContainText("Formulario revisado correctamente");
      58 | });
      59 |
        at /Users/valgreen/Documents/CLIENTES/RINON/rinon-v2/tests/render.spec.mjs:56:304

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/render-quote-experience-is-cc323-ree-step-progressive-wizard/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/render-quote-experience-is-cc323-ree-step-progressive-wizard/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/render-quote-experience-is-cc323-ree-step-progressive-wizard/trace.zip
    Usage:

        npx playwright show-trace test-results/render-quote-experience-is-cc323-ree-step-progressive-wizard/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────
```
### Fallo remoto

```text
4) tests/render.spec.mjs:60:1 › mobile navigation is task-led, reachable and responsive without overflow 

    Error: expect(received).toBe(expected) // Object.is equality

    Expected: "sticky"
    Received: "absolute"

      59 |
      60 | test("mobile navigation is task-led, reachable and responsive without overflow",async({page})=>{
    > 61 |  for(const width of [320,375,430,768,1024]){await page.setViewportSize({width,height:900});await page.goto("/",{waitUntil:"networkidle"});const state=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth}));expect(state.scrollWidth).toBeLessThanOrEqual(state.innerWidth+2);const toggle=page.locator(".mobile-nav-toggle");await expect(toggle).toBeVisible();await toggle.click();const panel=page.locator("#mobile-navigation");await expect(panel).toBeVisible();await expect(panel.getByRole("link",{name:/Proyectos a medida/})).toBeVisible();await expect(panel.getByRole("link",{name:/Empresas/})).toBeVisible();await expect(panel.getByRole("link",{name:/Nosotros/})).toBeVisible();const actions=page.locator(".mobile-nav-actions");await expect(actions).toBeVisible();await expect(panel.getByRole("link",{name:/Cotizar/})).toBeVisible();const navCss=await page.evaluate(()=>({top:getComputedStyle(document.querySelector(".mobile-nav-top")).position,actions:getComputedStyle(document.querySelector(".mobile-nav-actions")).position}));expect(navCss.top).toBe("sticky");expect(navCss.actions).toBe("sticky");await panel.evaluate(node=>{node.scrollTop=node.scrollHeight});await expect(actions).toBeVisible();await page.locator(".mobile-nav-close").click();await expect(toggle).toBeFocused()}
         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           ^
      62 | });
      63 |
      64 | test("quote wizard has no horizontal overflow on compact breakpoints",async({page})=>{for(const width of [320,360,375,390,430,768]){await page.setViewportSize({width,height:900});await page.goto("/cotizar?category=estructuras",{waitUntil:"networkidle"});const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth,progressVisible:!!document.querySelector(".quote-progress"),activeStep:document.querySelector('.quote-progress [aria-current="step"]')?.textContent??""}));expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.innerWidth+2);expect(metrics.progressVisible).toBeTruthy();expect(metrics.activeStep).toContain("Qué necesitas")}});
        at /Users/valgreen/Documents/CLIENTES/RINON/rinon-v2/tests/render.spec.mjs:61:1099

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/render-mobile-navigation-i-710a9-responsive-without-overflow/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/render-mobile-navigation-i-710a9-responsive-without-overflow/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/render-mobile-navigation-i-710a9-responsive-without-overflow/trace.zip
    Usage:

        npx playwright show-trace test-results/render-mobile-navigation-i-710a9-responsive-without-overflow/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────
```
### Fallo remoto

```text
5) tests/render.spec.mjs:68:1 › about and contact include usable location actions ────────────────

    Error: expect(received).toBeTruthy()

    Received: false

      13 |   return {logoLoaded:logo instanceof HTMLImageElement&&logo.complete&&logo.naturalWidth>100,logoSrc:logo instanceof HTMLImageElement?logo.currentSrc:"",bodyFont:body.fontFamily,footerColor:link?.color??"",footerDecoration:link?.textDecorationLine??"",scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth};
      14 |  });
    > 15 |  expect(chrome.logoLoaded).toBeTruthy();
         |                            ^
      16 |  expect(chrome.logoSrc).toContain("/brand/logo-rinon-horizontal-transparent.png");
      17 |  expect(chrome.logoSrc).not.toContain("/_next/image");
      18 |  expect(chrome.bodyFont.toLowerCase()).toContain("raleway");
        at assertBrandChrome (/Users/valgreen/Documents/CLIENTES/RINON/rinon-v2/tests/render.spec.mjs:15:28)
        at /Users/valgreen/Documents/CLIENTES/RINON/rinon-v2/tests/render.spec.mjs:69:102

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/render-about-and-contact-include-usable-location-actions/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/render-about-and-contact-include-usable-location-actions/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/render-about-and-contact-include-usable-location-actions/trace.zip
    Usage:

        npx playwright show-trace test-results/render-about-and-contact-include-usable-location-actions/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────
```
### Fallo remoto

```text
6) tests/seo-cro.spec.mjs:86:1 › structures landing owns structural intent without pretending conceptual evidence is executed work 

    Error: expect(received).toContain(expected) // indexOf

    Expected substring: "visual conceptual"
    Received string:    "estructuras metálicas · san bernardo
    estructuras metálicas para el espacio y la función que necesitas.·
    desde un cobertizo o pérgola para una vivienda hasta una escalera, plataforma o soporte para una empresa. partimos por el uso, las dimensiones, los apoyos y el lugar real; después definimos qué es fabricable y qué antecedentes faltan.·
    cotizar estructura
    ↗
    enviar referencia por whatsapp
    ver qué fabricamos
    ↓
    foto · plano · croquis
    residencial + empresa
    alcance antes de fabricar
    referencia arquitectónica · render
    referencia arquitectónica · render aportado
    render de referencia proveniente del archivo del usuario. ayuda a explicar contexto e integración espacial; no corresponde a una obra ejecutada por rinon ni define la solución estructural final.
    referencia · no obra ejecutada
    render aportado para mostrar contexto residencial
    qué podemos evaluar
    una misma capacidad, cuatro tipos de necesidad.·
    esta página es para quien ya sabe que necesita una estructura. si lo que buscas es una pieza, réplica, componente o fabricación todavía abierta, conviene partir por fabricación metálica a medida.·
    01
    cobertizos y pérgolas·
    estructuras para viviendas, terrazas, estacionamientos y espacios comerciales, evaluadas según dimensiones, apoyos, cubierta, terminación e integración arquitectónica.·
    02
    escaleras y plataformas·
    elementos de acceso o trabajo fabricados a medida cuando dimensiones, uso, apoyos y requerimientos aplicables están suficientemente definidos.·
    03
    soportes y bastidores·
    marcos, bases y conjuntos metálicos para habilitación, apoyo de equipos u otras funciones con geometría conocida.·
    04
    estructuras especiales·
    conjuntos no estándar que se revisan desde su función, dimensiones, material, restricciones del lugar y forma de montaje.·
    tengo otro proyecto a medida
    residencial + comercial
    un cobertizo debe integrarse al lugar, no parecer agregado después.·
    en viviendas y espacios de atención al público importan tanto la modulación y los apoyos como la proporción, la cubierta y la terminación. el objetivo es evaluar una estructura limpia y coherente con la arquitectura existente.·
    01
    implantación·
    se revisan medidas, circulación, muros, apoyos existentes y relación con puertas, ventanas o estacionamientos.·
    02
    geometría·
    altura, luces, modulación y encuentros deben responder al espacio real y al uso previsto.·
    03
    terminación·
    color, acabado y cubierta se confirman dentro del alcance aplicable al proyecto.·
    04
    montaje·
    accesos, apoyos, interferencias y condiciones del lugar se revisan antes de comprometer instalación.·
    empresas y operación
    también fabricamos estructuras donde la función manda.·
    escaleras, plataformas, bastidores, soportes y conjuntos especiales requieren un requerimiento más explícito. si existen cargas, normas, documentación o ingeniería exigida por el proyecto, deben informarse para separar fabricación de responsabilidades técnicas adicionales.·
    01
    escaleras
    acceso
    02
    plataformas
    operación
    03
    soportes
    habilitación
    04
    bastidores
    conjunto
    05
    especiales
    a medida
    para cotizar
    cuatro antecedentes reducen la mayor parte de los supuestos.·
    no necesitas tener un plano profesional para iniciar. envía lo que tengas y separamos la información disponible de lo que realmente debe definirse antes de fabricar.·
    01
    referencia·
    plano, croquis, fotografía o una explicación clara de lo que la estructura debe resolver.·
    02
    dimensiones·
    ancho, largo, altura y cualquier restricción relevante del espacio.·
    03
    uso·
    residencial, comercial u operacional; incluye cargas o condiciones técnicas solo cuando ya estén definidas.·
    04
    ubicación·
    comuna, fotografías del lugar y si necesitas evaluar fabricación, despacho o montaje.·
    alcance sin letra chica
    fabricar una estructura no equivale automáticamente a desarrollar su ingeniería.
    buen punto de partida
    ✓
    tienes función, croquis, plano, foto o medidas
    ✓
    conoces ubicación y restricciones del lugar
    ✓
    puedes explicar el uso del conjunto
    se confirma antes de comprometer
    →
    cálculo o memoria cuando se requiera
    →
    cargas o capacidades que exijan respaldo técnico
    →
    montaje, documentación o responsabilidad profesional especial
    preguntas frecuentes
    antes de definir geometría y precio.·
    las respuestas describen el proceso de evaluación. materiales, medidas, montaje y terminación definitivos quedan en la cotización aplicable al proyecto.·
    ¿qué necesito para cotizar una estructura metálica?
    ¿fabrican cobertizos y pérgolas metálicas para casas?
    ¿también trabajan estructuras para empresas?
    ¿incluyen cálculo estructural o memoria de cálculo?
    siguiente paso
    muéstranos el espacio o la estructura que necesitas.·
    una foto, croquis o plano junto con medidas aproximadas, ubicación y uso es suficiente para iniciar la revisión.·
    cotizar estructura
    hablar por whatsapp"

      94 |  expect(text).toContain("empresas y operación");
      95 |  expect(text).toContain("fabricar una estructura no equivale automáticamente a desarrollar su ingeniería");
    > 96 |  expect(text).toContain("visual conceptual");
         |               ^
      97 |  expect(text).toContain("no obra ejecutada");
      98 |  const schema=await main.locator('script[type="application/ld+json"]').first().textContent();
      99 |  expect(schema).toContain('"@type":"Service"');
        at /Users/valgreen/Documents/CLIENTES/RINON/rinon-v2/tests/seo-cro.spec.mjs:96:15

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/seo-cro-structures-landing-b4a70-l-evidence-is-executed-work/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/seo-cro-structures-landing-b4a70-l-evidence-is-executed-work/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/seo-cro-structures-landing-b4a70-l-evidence-is-executed-work/trace.zip
    Usage:

        npx playwright show-trace test-results/seo-cro-structures-landing-b4a70-l-evidence-is-executed-work/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────
```
### Fallo remoto

```text
7) tests/seo-cro.spec.mjs:104:1 › enterprise landing is a B2B intent owner with structured answers and three closing paths 

    Error: expect(received).toContain(expected) // indexOf

    Expected substring: "Compra por volumen"
    Received string:    "EMPRESAS · INSTITUCIONES · OBRAS
    Fabricación para empresas, obras e instituciones.·
    Desde una serie de camarotes hasta cierres, estructuras, soportes o piezas bajo plano. Cuéntanos cantidad, destino y fecha objetivo para ordenar la evaluación desde el inicio.·
    Cotizar para empresa
    Conversar por WhatsApp
    COMPRA POR VOLUMEN
    PROYECTO / OBRA
    BAJO PLANO
    REQUERIMIENTO RECURRENTE
    QUÉ PODEMOS ORDENAR CONTIGO
    01
    VOLUMEN·
    Series, lotes y compras repetibles cuando cantidad y configuración están definidas.·
    02
    BAJO PLANO·
    Piezas, soportes y conjuntos cuando la geometría y especificación vienen definidas.·
    03
    PROYECTO·
    Cierres, estructuras y equipamiento asociados a una obra o necesidad de terreno.·
    04
    RECURRENTE·
    Requerimientos que se repiten y pueden estandarizarse comercialmente.·
    La capacidad, plazo y alcance final se confirman para cada cotización.
    QUIÉN NECESITA QUÉ
    Un mismo proyecto se ve distinto según el rol.·
    La solicitud comercial debe recoger suficiente contexto para que el requerimiento sobreviva al traspaso entre áreas.·
    COMPRAS
    Necesita comparar alcance y precio·
    Cantidad, especificación, destino, fecha y condiciones comerciales claramente separadas.·
    OPERACIONES
    Necesita resolver una función·
    Uso real, restricciones, ubicación, mantenimiento y continuidad operacional.·
    OBRA / TERRENO
    Necesita coordinar fabricación y montaje·
    Medidas, accesos, secuencia, interferencias y condiciones del sitio.·
    ADMINISTRACIÓN
    Necesita trazabilidad del requerimiento·
    Qué se pidió, qué se cotizó, qué cambió y qué incluye finalmente el alcance.·
    ENTORNOS DE COMPRA
    Lo que se fabrica cambia según la operación.·
    La misma capacidad de taller puede resolver necesidades distintas. Lo importante es definir uso, cantidad, destino y condiciones del proyecto.·
    01
    Construcción y obra·
    Cierres, estructuras, soportes, accesos y piezas asociadas a una habilitación o frente de trabajo.·
    CLAVE · medidas · secuencia · terreno
    02
    Industria y mantenimiento·
    Reparaciones, bases, protecciones, bastidores y fabricaciones para resolver una necesidad operacional concreta.·
    CLAVE · función · interferencias · continuidad
    03
    Bodegas y logística·
    Equipamiento, divisiones, cierres y elementos repetibles para ordenar o habilitar espacios.·
    CLAVE · uso · espacio · cantidad
    04
    Instituciones y faenas·
    Camas, camarotes, lockers y otros productos cuando cantidad, destino y entrega son parte central de la compra.·
    CLAVE · volumen · destino · fecha
    CÓMO AVANZA
    Una compra ordenada desde el primer contacto.·
    Primero entendemos lo que se necesita. Después definimos qué falta confirmar para convertirlo en una propuesta fabricable y coordinable.·
    01
    Necesidad
    CONTEXTO
    02
    Revisión
    FACTIBILIDAD
    03
    Cotización
    ALCANCE
    04
    Coordinación
    PROYECTO
    05
    Fabricación y entrega
    EJECUCIÓN
    PARA UNA PRIMERA REVISIÓN
    Cuatro datos permiten empezar.·
    No necesitas preparar una licitación completa para conversar. Con estos antecedentes podemos identificar rápidamente qué falta.·
    01 · REFERENCIA
    Qué necesitas·
    Producto, plano, fotografía, muestra o descripción funcional.·
    02 · CANTIDAD
    Qué volumen·
    Unidades o metraje aproximado para dimensionar fabricación.·
    03 · DESTINO
    Dónde se entrega·
    Ubicación para evaluar logística y montaje cuando corresponda.·
    04 · FECHA
    Cuándo lo necesitas·
    Plazo objetivo sujeto a revisión contra alcance y capacidad.·
    RUTAS DE COMPRA
    Entra por la necesidad que ya tienes definida.·
    Estas rutas mantienen separada la intención de producto, cierre y proyecto a medida para evitar cotizaciones ambiguas.·
    ALOJAMIENTO
    Camas y camarotes·
    Compra por unidad o volumen con configuración confirmada al cotizar.·
    Ver productos →
    PERÍMETRO
    Cierres y accesos·
    Cierres, mallas, rejas y portones para terrenos, obras y recintos.·
    Ver cierres →
    ESTRUCTURAS
    Estructuras metálicas·
    Cobertizos, escaleras, plataformas, soportes y conjuntos especiales.·
    Ver estructuras →
    A MEDIDA
    Fabricación bajo requerimiento·
    Parte desde plano, foto, muestra, croquis o una necesidad funcional.·
    Ver fabricación →
    PREGUNTAS FRECUENTES
    Antes de enviar un requerimiento B2B.·
    La cotización vigente define capacidad, plazo, logística, montaje y documentación aplicables a cada compra.·
    ¿Pueden cotizar compras por volumen?
    ¿Trabajan a partir de planos o especificaciones de empresa?
    ¿Pueden incluir despacho o montaje?
    ¿Qué información conviene enviar primero?
    EMPRESAS
    ¿Tienes un requerimiento por volumen o proyecto?·
    Indica referencia, cantidad, destino y fecha objetivo. Si tienes plano, ficha o fotografías, también puedes enviarlas por WhatsApp.·
    Enviar requerimiento B2B
    Enviar antecedentes por WhatsApp
    Preparar compra"

      109 |  await expect(main).toHaveCount(1);
      110 |  const text=await main.innerText();
    > 111 |  expect(text).toContain("Compra por volumen");
          |               ^
      112 |  expect(text).toContain("RUTAS DE COMPRA");
      113 |  expect(text).toContain("Bajo plano");
      114 |  const schema=await main.locator('script[type="application/ld+json"]').first().textContent();
        at /Users/valgreen/Documents/CLIENTES/RINON/rinon-v2/tests/seo-cro.spec.mjs:111:15

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/seo-cro-enterprise-landing-cec75-ers-and-three-closing-paths/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/seo-cro-enterprise-landing-cec75-ers-and-three-closing-paths/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/seo-cro-enterprise-landing-cec75-ers-and-three-closing-paths/trace.zip
    Usage:

        npx playwright show-trace test-results/seo-cro-enterprise-landing-cec75-ers-and-three-closing-paths/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

  7 failed
    tests/render.spec.mjs:29:1 › home renders RC7 brand, navigation and quality-gated structure visual 
    tests/render.spec.mjs:42:1 › critical commercial pages including expanded catalog render with CSS 
    tests/render.spec.mjs:50:1 › quote experience is a real three-step progressive wizard ──────────
    tests/render.spec.mjs:60:1 › mobile navigation is task-led, reachable and responsive without overflow 
    tests/render.spec.mjs:68:1 › about and contact include usable location actions ─────────────────
    tests/seo-cro.spec.mjs:86:1 › structures landing owns structural intent without pretending conceptual evidence is executed work 
    tests/seo-cro.spec.mjs:104:1 › enterprise landing is a B2B intent owner with structured answers and three closing paths 
  44 passed (3.8m)
```

## 6. 58 URLs GSC-pending
### Fuente literal: docs/GSC_PENDING_URLS.csv

```csv
old_url,candidate_owner,evidence_state,cutover_rule
/literas,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/litera-metalica,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-adultos,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-baratos,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-precio,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-faenas,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-salmoneras,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-mineria,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-metalicos,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/fabricante-camarotes-chile,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-al-por-mayor,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-para-internados,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-para-hospitales,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-militares,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-providencia,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-las-condes,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-maipu,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-nunoa,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-la-florida,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-pudahuel,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-santiago-centro,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-penalolen,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-quilicura,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-puente-alto,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-san-bernardo,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-renca,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-estacion-central,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarotes-lo-barnechea,/camarotes,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarote-con-escritorio-economico,/camarote-con-escritorio,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarote-con-escritorio-full,/camarote-con-escritorio,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/camarote-con-escritorio-full-2-plazas,/camarote-con-escritorio,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/reja-metalica-santiago,/rejas-metalicas,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/rejas-metalicas-pudahuel,/rejas-metalicas,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/rejas-metalicas-maipu,/rejas-metalicas,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/rejas-metalicas-cerrillos,/rejas-metalicas,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/rejas-metalicas-puente-alto,/rejas-metalicas,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/rejas-metalicas-precio,/rejas-metalicas,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/rejas-metalicas-para-casas,/rejas-metalicas,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/rejas-decorativas,/rejas-metalicas,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/rejas-para-exteriores,/rejas-metalicas,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/rejas-para-terraza,/rejas-metalicas,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/rejas-para-balcon,/rejas-metalicas,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/portones-industriales,/portones-metalicos,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/cercos-para-empresas,/cierres-perimetrales,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/cercos-para-parcelas,/cierres-perimetrales,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/cercos-perimetrales-concepcion,/cierres-perimetrales,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/cercos-perimetrales-antofagasta,/cierres-perimetrales,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/mallas-separadoras-industriales,/mallas-separadoras,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/soldadura-metalica-santiago,/soldadura-mig,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/pintura-electrostatica-zona-sur-santiago,/pintura-electrostatica,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/pintura-electrostatica-colina,/pintura-electrostatica,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/pintura-electrostatica-las-condes,/pintura-electrostatica,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/pintura-electrostatica-providencia,/pintura-electrostatica,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/pintura-electrostatica-santiago-centro,/pintura-electrostatica,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/pintura-electrostatica-maipu,/pintura-electrostatica,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/pintura-electrostatica-talagante,/pintura-electrostatica,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/pintura-electrostatica-la-pintana,/pintura-electrostatica,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
/pintura-electrostatica-la-cisterna,/pintura-electrostatica,LIVE-OBSERVED GSC-PENDING,no redirect until resolved
```
Nota literal/estado: RELEASE_STATUS.md aun menciona 53 URLs, pero `lib/migration.ts`, `docs/GSC_PENDING_URLS.csv` y QA actual declaran/protegen 58. Claude debe tratar esto como discrepancia documental a resolver, no como autorizacion de redirect.

## 7. Blockers visuales
### Fuente literal: lib/visuals.ts

```ts
type VisualBase = {
  src: string;
  alt: string;
  kind: "photo" | "conceptual" | "render";
  label: string;
  note?: string;
  sourceWidth?: number;
  sourceHeight?: number;
  /** Human-auditable origin for the asset. Never use a vague label such as "internal". */
  sourceRef: string;
};

type VerifiedRinonVisual = VisualBase & {
  provenance: "verified-rinon";
  /** Required before an image can be presented as verified RINON evidence. */
  verificationRef: string;
};

type ReferenceVisual = VisualBase & {
  provenance: "current-site-approved" | "user-drive-reference" | "conceptual";
  verificationRef?: never;
};

export type VisualAsset = VerifiedRinonVisual | ReferenceVisual;

/**
 * Production cutover is blocked while these release-level visual requirements remain.
 * Remove an ID only after the replacement asset is integrated, provenance-registered,
 * dimension-gated and visually accepted on desktop/tablet/mobile.
 */
export const VISUAL_CUTOVER_BLOCKERS=[
  "home-hero-final-master",
  "structures-residential-final-master",
] as const;

const referenceBase = "/visuals/reference-current";

/**
 * Visual provenance is intentionally conservative:
 * - verified-rinon: only when RINON ownership/project attribution is independently verified;
 *   TypeScript requires an explicit verificationRef before that provenance can be used.
 * - user-drive-reference: product or architectural reference imagery found in the user's archive;
 *   never attributed to a client/project without further evidence.
 * - current-site-approved: reference imagery inherited from the current public site.
 * - conceptual: art-direction imagery, always labelled as conceptual.
 *
 * sourceRef is required for every asset so provenance can be audited without relying on memory.
 */
const archiveReferenceAssets: Record<string, VisualAsset[]> = {
  "/camarotes": [
    {
      src: "/visuals/archive/camarote-product-reference.webp",
      alt: "Camarote metálico negro de una plaza en referencia de producto",
      kind: "photo",
      provenance: "user-drive-reference",
      label: "Referencia de producto · archivo",
      note: "Fotografía de producto proveniente del archivo del usuario. No se atribuye a un cliente o proyecto específico.",
      sourceRef: "Google Drive archive · promoted under RINON-VIS-P1-BUNK-ARCHIVE",
      sourceWidth: 1200,
      sourceHeight: 900,
    },
  ],
  "/estructuras-metalicas": [
    {
      src: "/visuals/archive/structures-residential-reference.webp",
      alt: "Render de referencia de un espacio residencial cubierto para orientar una solución de cobertizo o pérgola",
      kind: "render",
      provenance: "user-drive-reference",
      label: "Referencia arquitectónica · render aportado",
      note: "Render de referencia proveniente del archivo del usuario. Ayuda a explicar contexto e integración espacial; no corresponde a una obra ejecutada por RINON ni define la solución estructural final.",
      sourceRef: "User archive · COBERTIZO SALA.jpg · derived RINON-VIS-P0-STRUCTURE-RESIDENTIAL-REFERENCE",
      sourceWidth: 1200,
      sourceHeight: 510,
    },
  ],
};

const conceptualAssets: Record<string, VisualAsset[]> = {
  "/camarotes": [
    {
      src: "/visuals/product-theatre/camarote-conceptual.webp",
      alt: "Visual conceptual de camarote metálico",
      kind: "conceptual",
      provenance: "conceptual",
      label: "Visual conceptual de producto",
      note: "Dirección de producto para explicar configuración y proporción. No corresponde a un proyecto ejecutado por RINON.",
      sourceRef: "RINON conceptual art direction · RINON-VIS-P1-BUNK",
      sourceWidth: 900,
      sourceHeight: 534,
    },
  ],
  "/cierres-perimetrales": [
    {
      src: "/visuals/product-theatre/cierre-conceptual.webp",
      alt: "Visual conceptual de cierre metálico modular",
      kind: "conceptual",
      provenance: "conceptual",
      label: "Visual conceptual de sistema",
      note: "Dirección de producto para explicar modulación y proporción. No corresponde a un proyecto ejecutado por RINON.",
      sourceRef: "RINON conceptual art direction · RINON-VIS-P1-FENCE",
      sourceWidth: 900,
      sourceHeight: 537,
    },
  ],
  "/estructuras-metalicas": [
    {
      src: "/visuals/product-theatre/estructura-conceptual.webp",
      alt: "Visual conceptual de estructura metálica modular",
      kind: "conceptual",
      provenance: "conceptual",
      label: "Visual conceptual de estructura",
      note: "Referencia de dirección visual; no corresponde a una obra ejecutada por RINON. Geometría y solución final se definen según el requerimiento real.",
      sourceRef: "RINON conceptual art direction · RINON-VIS-P0-HOME-STRUCTURE-TEMP · replacement brief docs/STRUCTURES_VISUAL_BRIEF.md",
      sourceWidth: 900,
      sourceHeight: 500,
    },
  ],
};

const legacyReferenceAssets: Record<string, VisualAsset[]> = {
  "/camarotes": [
    {
      src: `${referenceBase}/cama-institucional-gris-individual-y-camarote.jpg`,
      alt: "Cama metálica individual y camarote en configuración institucional",
      kind: "photo",
      provenance: "current-site-approved",
      label: "Producto / referencia actual",
      note: "Imagen del sitio RINON actual. No se atribuye a un cliente o proyecto específico.",
      sourceRef: "Current public rinon.cl reference library",
    },
    {
      src: `${referenceBase}/camarote-desmontable-dormitorio-compartido.jpg`,
      alt: "Camarote metálico desmontable en dormitorio compartido",
      kind: "photo",
      provenance: "current-site-approved",
      label: "Producto / referencia actual",
      sourceRef: "Current public rinon.cl reference library",
    },
  ],
  "/camarote-con-escritorio": [],
};

export function allowLegacyReferenceImages() {
  return process.env.RINON_ALLOW_LEGACY_REFERENCE_IMAGES === "true";
}

export function getArchiveReferenceVisuals(slug: string): VisualAsset[] {
  return archiveReferenceAssets[slug] ?? [];
}

export function getConceptualVisuals(slug: string): VisualAsset[] {
  return conceptualAssets[slug] ?? [];
}

export function getLegacyReferenceVisuals(slug: string): VisualAsset[] {
  if (!allowLegacyReferenceImages()) return [];
  return legacyReferenceAssets[slug] ?? [];
}

export function getVisuals(slug: string): VisualAsset[] {
  return [...getArchiveReferenceVisuals(slug), ...getLegacyReferenceVisuals(slug), ...getConceptualVisuals(slug)];
}

export function getReferencePhotos(slug: string): VisualAsset[] {
  return [...getArchiveReferenceVisuals(slug), ...getLegacyReferenceVisuals(slug)].filter((asset) => asset.kind === "photo");
}
```
### Fuente literal: docs/VISUAL_PROVENANCE_INVENTORY.md

```md
# RINON RC.7 — Visual Provenance Inventory

This inventory is the release-control layer between source imagery and commercial UI.

## Status vocabulary
- **ACTIVE**: currently referenced in staging.
- **TEMPORARY**: safe for its current bounded placement but must be replaced before final visual acceptance.
- **CANDIDATE**: audited source available for art direction/reference but not yet promoted into the production asset registry.
- **DISABLED**: code/reference exists but the asset is not enabled in the current staging configuration.
- **REPLACE**: must not be promoted to a larger placement.
- **PENDING**: required production asset does not yet exist or has not yet passed acceptance.

## Release-level visual blockers

The machine-readable source of truth is `VISUAL_CUTOVER_BLOCKERS` in `lib/visuals.ts`.

| Blocker ID | Requirement | Current state |
|---|---|---|
| `home-hero-final-master` | Replace the constrained 720×730 Home welding master with an accepted high-resolution master or an equally strong approved composition. | PENDING |
| `structures-residential-final-master` | Replace the generic industrial structures visual with the accepted premium residential cobertizo/pergola direction. | PENDING |

Production preflight must fail in AUTHORIZED CUTOVER mode while either blocker remains.

## Active measured assets

| Asset ID | Source | Provenance | Measured source | Current placement | Status | Rule |
| --- | --- | --- | ---: | --- | --- | --- |
| `RINON-VIS-P0-HOME-WELDING` | `/visuals/home-hero-conceptual-welding.webp` | `conceptual-context` | **720×730** | Home hero, contained editorial visual | TEMPORARY | Never full bleed. Desktop rendered width must remain ≤620 px. Replace before final visual acceptance. |
| `RINON-VIS-P1-BUNK` | `/visuals/product-theatre/camarote-conceptual.webp` | `conceptual-context` | **900×534** | Home / Camarotes theatre | ACTIVE | Keep rendered width ≤ source width. Always label as conceptual. |
| `RINON-VIS-P1-FENCE` | `/visuals/product-theatre/cierre-conceptual.webp` | `conceptual-context` | **900×537** | Home / Cierres theatre | ACTIVE | Keep rendered width ≤ source width. Always label as conceptual. |
| `RINON-VIS-P0-HOME-STRUCTURE-TEMP` | `/visuals/product-theatre/estructura-conceptual.webp` | `conceptual-context` | **900×500** | Home / Estructuras theatre | TEMPORARY | Keep rendered width ≤ source width. Replace with accepted residential structure master. |

Dimensions above are read from reconstructed WebP binaries during Vercel `prebuild`; they are not inferred from file names or CSS.

## User-provided cobertizo references audited 2026-08-21

These files were supplied directly in the project conversation. They are **reference renders only**. None may be described as a completed RINON project, a named client project or a real Chicureo installation without independent verification.

| Source file | Dimensions | SHA-256 | Classification | Assessment | Status |
|---|---:|---|---|---|---|
| `COBERTIZO SALA.jpg` | **2212×941** | `b3a043c6ba87a6b05f88597fc2712a6cd95d33b99977661f9ce1d5881c19c915` | `user-provided-reference-render` | Best current candidate. Warm covered terrace/dining context, clean architectural presentation and closer to the requested premium residential story than the generic industrial master. It is primarily an interior/under-cover view rather than the ideal exterior house hero. | CANDIDATE |
| `cobertizo (1).jpg` | **2212×941** | `1da4493bc6727a5443bc7913995208fbf0cc24a9912151c3d5722470bf7ee01c` | `user-provided-reference-render` | Long covered living/patio corridor. Useful as supporting residential reference but weaker focal hierarchy for the Home theatre. | CANDIDATE |
| `cobertizo (2).jpg` | **2212×941** | `03331cc4cd61bec9c67bdd96737e466a1e19335d9269e2972837484272393575` | `user-provided-reference-render` | Covered multipurpose interior. Useful for material/context reference; not preferred for hero placement. | CANDIDATE |
| `espinoza estructuras metalicas.jpeg.jpg` | **760×796** | `1c2164cec466006b75d0df16de80e594a539a06504c917235211f1695dcbd977` | third-party/logo reference | Logo/identity reference, not useful as project evidence or commercial hero photography. | DISABLED |

### Candidate promotion rule
If `COBERTIZO SALA.jpg` is promoted before a stronger exterior master exists:
1. convert to an optimized web asset without upscaling;
2. register its exact derived-file SHA and dimensions;
3. expose it as `kind: "render"` / reference imagery;
4. visible label must say **“Render de referencia”** or equivalent;
5. caption must explicitly state that it does not correspond to an executed RINON project;
6. do not use “Proyecto Chicureo” or any named client/location attribution;
7. validate desktop/mobile crop before removing the structures visual blocker.

## Existing non-primary references

| Asset | Provenance | Status | Commercial constraint |
| --- | --- | --- | --- |
| `/visuals/reference-current/cama-institucional-gris-individual-y-camarote.jpg` | `current-site-approved` | DISABLED by default | Product/reference evidence only. Do not claim a named client/project. |
| `/visuals/reference-current/camarote-desmontable-dormitorio-compartido.jpg` | `current-site-approved` | DISABLED by default | Product/reference evidence only. Do not claim a named client/project. |
| `/visuals/structures/pergola-mediterranea-conceptual.svg` | `explanatory` | REMOVED / known-bad | Was an SVG wrapper around a low-resolution raster and must not return as primary commercial proof or final Home structures visual. |

Legacy reference imagery remains behind `RINON_ALLOW_LEGACY_REFERENCE_IMAGES=true` and is not part of the default RC.7 visual surface.

## Other desirable production photography

These improve trust but are not release-blocking when the page uses an honest evidence-panel fallback:

| Intended route | Preferred provenance | Preferred master |
|---|---|---:|
| Nosotros / workshop | `verified-rinon` | 2400×1600 |
| Empresas / batch production | `verified-rinon` preferred | 2400×1600 |
| Soldadura MIG | `verified-rinon` preferred | 1800×1200 |
| Pintura electrostática | `verified-rinon` preferred | 1800×1200 |

## Placement rules
1. No source may be rendered wider than its intrinsic pixel width on a standard-density viewport unless explicitly approved after review.
2. Full-width/full-bleed photographic heroes require a source master of at least 2200 px wide.
3. A conceptual image or render capable of being mistaken for an executed RINON project must display a visible conceptual/reference label.
4. `verified-rinon` is the only class that may be presented unqualified as workshop/project execution evidence.
5. `current-site-approved` and user-provided references are reference evidence, not automatic project provenance.
6. Explanatory visuals can support understanding but cannot be the primary proof in a commercial hero.
7. Missing photography falls back to `CommercialEvidencePanel`; it does not trigger invented project evidence.

## Release gate
Before an asset changes state to ACTIVE:
- provenance is known;
- source dimensions and SHA are recorded;
- target placement is defined;
- conceptual/reference/project labels are correct;
- desktop and mobile crops are validated;
- browser QA confirms no horizontal overflow or accidental upscaling;
- the asset is registered in `lib/visuals.ts` where applicable and, when reconstructed, SHA-locked in `scripts/reconstruct-visual-assets.mjs`.

Before production cutover, `VISUAL_CUTOVER_BLOCKERS` must be empty and the production preflight must confirm zero unresolved final visual blockers.
```

## 8. Metadata por ruta
### / (HTTP 200)

- title: Fabricación metálica a medida en Santiago
- meta description: Camarotes, camas, mobiliario, cierres, estructuras y servicios de fabricación metálica a medida con RINON en San Bernardo.
- canonical: https://rinon.cl
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### /soluciones (HTTP 200)

- title: Productos y soluciones metálicas en Santiago | RINON
- meta description: Explora productos y servicios de RINON: camarotes, camas, camas balinesas, mesas, escritorios, cierres, rejas, portones, mallas, estructuras y fabricación metálica a medida.
- canonical: https://rinon.cl/soluciones
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### /camarotes (HTTP 200)

- title: Camarotes y camas metálicas en Santiago | RINON
- meta description: Camas y camarotes metálicos para hogares, instituciones, faenas, residencias y compras por volumen.
- canonical: https://rinon.cl/camarotes
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Service","@id":"https://rinon.cl/camarotes#service","name":"Camas y camarotes","description":"Camas y camarotes metálicos para hogares, instituciones, faenas, residencias y compras por volumen.","url":"https://rinon.cl/camarotes","provider":{"@id":"https://rinon.cl/#organization"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Camas y camarotes","item":"https://rinon.cl/camarotes"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Fabrican por volumen?","acceptedAnswer":{"@type":"Answer","text":"Sí, se pueden evaluar compras por volumen. Para hacerlo correctamente necesitamos cantidad, configuración, destino y fecha objetivo."}},{"@type":"Question","name":"¿Puedo pedir una medida especial?","acceptedAnswer":{"@type":"Answer","text":"Puede evaluarse. La factibilidad y cualquier ajuste de precio se confirman para el modelo y requerimiento específico."}},{"@type":"Question","name":"¿Puedo cotizar para una institución o faena?","acceptedAnswer":{"@type":"Answer","text":"Sí. Indica cantidad, destino, tipo de uso y cualquier requisito de logística o instalación que deba considerarse."}}]}]
```
### /camarote-nido (HTTP 200)

- title: Camarote nido metálico. | RINON
- meta description: Camarote metálico con una cama adicional inferior deslizante. Consulta configuración, medidas y disponibilidad vigente con RINON.
- canonical: https://rinon.cl/camarote-nido
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### /camas-metalicas (HTTP 200)

- title: Camas metálicas en Santiago | RINON
- meta description: Camas metálicas para hogar, instituciones, alojamientos y compras por volumen. Medidas, configuración y terminación se confirman al cotizar.
- canonical: https://rinon.cl/camas-metalicas
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Product","@id":"https://rinon.cl/camas-metalicas#product","name":"Camas metálicas","description":"Camas metálicas para hogar, instituciones, alojamientos y compras por volumen. Medidas, configuración y terminación se confirman al cotizar.","url":"https://rinon.cl/camas-metalicas","brand":{"@id":"https://rinon.cl/#organization"},"manufacturer":{"@id":"https://rinon.cl/#organization"},"category":"Camas metálicas"},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Camas metálicas","item":"https://rinon.cl/camas-metalicas"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Puedo pedir una medida especial?","acceptedAnswer":{"@type":"Answer","text":"Puede evaluarse. Indica la medida requerida y el espacio disponible para revisar factibilidad."}},{"@type":"Question","name":"¿Fabrican varias unidades?","acceptedAnswer":{"@type":"Answer","text":"Sí, se pueden evaluar compras por volumen indicando cantidad, destino y fecha objetivo."}}]}]
```
### /camas-balinesas (HTTP 200)

- title: Camas balinesas metálicas a medida en Santiago | RINON
- meta description: Camas balinesas con estructura metálica para terrazas, jardines y proyectos de exterior. Medidas, cubierta, terminación y textiles se definen por proyecto.
- canonical: https://rinon.cl/camas-balinesas
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Product","@id":"https://rinon.cl/camas-balinesas#product","name":"Camas balinesas","description":"Camas balinesas con estructura metálica para terrazas, jardines y proyectos de exterior. Medidas, cubierta, terminación y textiles se definen por proyecto.","url":"https://rinon.cl/camas-balinesas","brand":{"@id":"https://rinon.cl/#organization"},"manufacturer":{"@id":"https://rinon.cl/#organization"},"category":"Camas balinesas"},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Camas balinesas","item":"https://rinon.cl/camas-balinesas"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Incluye colchones y cortinas?","acceptedAnswer":{"@type":"Answer","text":"El alcance debe definirse expresamente. La estructura metálica es el punto de partida y cualquier textil o complemento se confirma en la propuesta."}},{"@type":"Question","name":"¿Se puede fabricar para un proyecto comercial?","acceptedAnswer":{"@type":"Answer","text":"Sí, se pueden evaluar unidades o lotes para terrazas, hotelería u otros proyectos indicando cantidad y destino."}}]}]
```
### /mesas-metalicas (HTTP 200)

- title: Mesas con estructura metálica a medida en Santiago | RINON
- meta description: Mesas con bases y estructuras metálicas fabricadas según medidas, uso, cantidad y terminación requerida.
- canonical: https://rinon.cl/mesas-metalicas
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Product","@id":"https://rinon.cl/mesas-metalicas#product","name":"Mesas","description":"Mesas con bases y estructuras metálicas fabricadas según medidas, uso, cantidad y terminación requerida.","url":"https://rinon.cl/mesas-metalicas","brand":{"@id":"https://rinon.cl/#organization"},"manufacturer":{"@id":"https://rinon.cl/#organization"},"category":"Mesas"},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Mesas","item":"https://rinon.cl/mesas-metalicas"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Fabrican solo la estructura?","acceptedAnswer":{"@type":"Answer","text":"Puede evaluarse. Indica si necesitas base/estructura o una solución completa y qué material de cubierta tienes en mente."}},{"@type":"Question","name":"¿Pueden hacer varias iguales?","acceptedAnswer":{"@type":"Answer","text":"Sí, los lotes se evalúan según cantidad, repetibilidad, terminación y calendario."}}]}]
```
### /escritorios-metalicos (HTTP 200)

- title: Escritorios con estructura metálica a medida en Santiago | RINON
- meta description: Escritorios con estructura metálica para hogar, oficina, instituciones y proyectos de equipamiento.
- canonical: https://rinon.cl/escritorios-metalicos
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Product","@id":"https://rinon.cl/escritorios-metalicos#product","name":"Escritorios","description":"Escritorios con estructura metálica para hogar, oficina, instituciones y proyectos de equipamiento.","url":"https://rinon.cl/escritorios-metalicos","brand":{"@id":"https://rinon.cl/#organization"},"manufacturer":{"@id":"https://rinon.cl/#organization"},"category":"Escritorios"},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Escritorios","item":"https://rinon.cl/escritorios-metalicos"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Pueden fabricar un escritorio desde una foto?","acceptedAnswer":{"@type":"Answer","text":"Sí, una fotografía puede iniciar la evaluación. Luego se confirman medidas, materiales y elementos incluidos."}},{"@type":"Question","name":"¿Trabajan por volumen?","acceptedAnswer":{"@type":"Answer","text":"Se pueden evaluar lotes para empresas e instituciones indicando cantidad, destino y fecha objetivo."}}]}]
```
### /cierres-perimetrales (HTTP 200)

- title: Cierres perimetrales, rejas y portones en Santiago | RINON
- meta description: Cierres perimetrales para obras, bodegas, industria, condominios y terrenos.
- canonical: https://rinon.cl/cierres-perimetrales
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Service","@id":"https://rinon.cl/cierres-perimetrales#service","name":"Cierres y protecciones","description":"Cierres perimetrales para obras, bodegas, industria, condominios y terrenos.","url":"https://rinon.cl/cierres-perimetrales","provider":{"@id":"https://rinon.cl/#organization"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Cierres y protecciones","item":"https://rinon.cl/cierres-perimetrales"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Pueden evaluar con medidas aproximadas?","acceptedAnswer":{"@type":"Answer","text":"Sí, sirven para una primera evaluación. La definición final dependerá del sistema, terreno, accesos y alcance de instalación."}},{"@type":"Question","name":"¿El cierre puede incluir portón?","acceptedAnswer":{"@type":"Answer","text":"Sí, el acceso puede evaluarse como parte del conjunto cuando el tipo de portón solicitado esté dentro del alcance del proyecto."}},{"@type":"Question","name":"¿Hacen instalación?","acceptedAnswer":{"@type":"Answer","text":"La instalación se evalúa según proyecto y ubicación. Indica dónde se ejecutará el trabajo para incluirla correctamente en la revisión."}}]}]
```
### /rejas-metalicas (HTTP 200)

- title: Rejas metálicas a medida | RINON
- meta description: Fabricación de rejas metálicas según medidas, uso, acceso y terminación en Santiago.
- canonical: https://rinon.cl/rejas-metalicas
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Service","@id":"https://rinon.cl/rejas-metalicas#service","name":"Rejas metálicas a medida","description":"Fabricación de rejas metálicas según medidas, uso, acceso y terminación.","url":"https://rinon.cl/rejas-metalicas","provider":{"@id":"https://rinon.cl/#organization"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Rejas metálicas a medida","item":"https://rinon.cl/rejas-metalicas"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Qué necesitan para cotizar una reja?","acceptedAnswer":{"@type":"Answer","text":"Medidas aproximadas, una fotografía del lugar, ubicación y una descripción del uso permiten iniciar la evaluación."}},{"@type":"Question","name":"¿Pueden integrar un portón?","acceptedAnswer":{"@type":"Answer","text":"Puede evaluarse como parte del conjunto cuando el vano, apertura y alcance del proyecto estén definidos."}},{"@type":"Question","name":"¿La instalación está incluida?","acceptedAnswer":{"@type":"Answer","text":"No se asume por defecto. Se revisa según ubicación, tipo de anclaje y condiciones del lugar."}}]}]
```
### /portones-metalicos (HTTP 200)

- title: Portones metálicos a medida | RINON
- meta description: Portones metálicos fabricados según vano, tipo de apertura, uso y terminación.
- canonical: https://rinon.cl/portones-metalicos
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Service","@id":"https://rinon.cl/portones-metalicos#service","name":"Portones metálicos a medida","description":"Portones metálicos fabricados según vano, tipo de apertura, uso y terminación.","url":"https://rinon.cl/portones-metalicos","provider":{"@id":"https://rinon.cl/#organization"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Portones metálicos a medida","item":"https://rinon.cl/portones-metalicos"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Qué medidas necesitan para cotizar un portón?","acceptedAnswer":{"@type":"Answer","text":"Ancho y alto aproximados del vano, fotos del acceso y el espacio disponible para apertura permiten una primera evaluación."}},{"@type":"Question","name":"¿Fabrican portones corredizos y batientes?","acceptedAnswer":{"@type":"Answer","text":"Ambas configuraciones pueden evaluarse según el espacio, apoyos y condiciones del acceso."}},{"@type":"Question","name":"¿Incluyen automatización?","acceptedAnswer":{"@type":"Answer","text":"La automatización no se asume. Si la necesitas debe indicarse expresamente y solo se incorpora cuando ese alcance esté confirmado."}}]}]
```
### /mallas-3d (HTTP 200)

- title: Malla 3D y panel electrosoldado para cierres perimetrales | RINON
- meta description: Paneles de malla electrosoldada para evaluar dentro de cierres perimetrales. Configuración, altura, postes, terminación e instalación se confirman al cotizar.
- canonical: https://rinon.cl/mallas-3d
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Service","@id":"https://rinon.cl/mallas-3d#service","name":"Malla 3D y panel electrosoldado para cierres perimetrales","description":"Paneles de malla electrosoldada para evaluar dentro de cierres perimetrales. Configuración, altura, postes, terminación e instalación se confirman al cotizar.","url":"https://rinon.cl/mallas-3d","provider":{"@id":"https://rinon.cl/#organization"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Malla 3D y panel electrosoldado para cierres perimetrales","item":"https://rinon.cl/mallas-3d"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Qué necesito enviar para cotizar malla 3D?","acceptedAnswer":{"@type":"Answer","text":"Metros lineales aproximados, altura objetivo, ubicación y fotografías del terreno son un buen punto de partida. Si existen accesos, conviene indicar también su cantidad y ancho aproximado."}},{"@type":"Question","name":"¿La cotización considera solo el panel?","acceptedAnswer":{"@type":"Answer","text":"No necesariamente. La evaluación puede incluir postes, fijaciones, encuentros, puertas o portones cuando forman parte del alcance. Lo incluido se confirma en la cotización vigente."}},{"@type":"Question","name":"¿Pueden integrar puertas o portones al cierre?","acceptedAnswer":{"@type":"Answer","text":"Sí, pueden evaluarse como parte del sistema cuando el proyecto los requiere. La configuración y el alcance de fabricación o instalación se confirman antes de comprometer el trabajo."}}]}]
```
### /mallas-separadoras (HTTP 200)

- title: Mallas separadoras metálicas para bodegas e industria | RINON
- meta description: Divisiones metálicas y mallas separadoras para bodegas, galpones, plantas y espacios operacionales. Evaluación según metros, altura, accesos y soporte existente.
- canonical: https://rinon.cl/mallas-separadoras
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Service","@id":"https://rinon.cl/mallas-separadoras#service","name":"Mallas separadoras metálicas para bodegas e industria","description":"Divisiones metálicas y mallas separadoras para bodegas, galpones, plantas y espacios operacionales. Evaluación según metros, altura, accesos y soporte existente.","url":"https://rinon.cl/mallas-separadoras","provider":{"@id":"https://rinon.cl/#organization"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Mallas separadoras metálicas para bodegas e industria","item":"https://rinon.cl/mallas-separadoras"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Qué información necesito para cotizar una malla separadora?","acceptedAnswer":{"@type":"Answer","text":"Metros lineales aproximados, altura, ubicación de puertas o pasos y fotografías del soporte existente permiten hacer una primera evaluación. Un croquis o layout ayuda cuando está disponible."}},{"@type":"Question","name":"¿Una malla separadora sirve automáticamente como resguardo de maquinaria?","acceptedAnswer":{"@type":"Answer","text":"No. Si la división forma parte de un resguardo de maquinaria o de una exigencia normativa, esas condiciones deben estar definidas y validadas por el proyecto antes de fabricar. Una división genérica no se presenta como certificación del sistema completo."}},{"@type":"Question","name":"¿Se pueden incorporar puertas o accesos?","acceptedAnswer":{"@type":"Answer","text":"Sí, pueden evaluarse puertas y pasos dentro de la división. Su cantidad, posición, dimensiones y alcance se confirman en la cotización vigente."}}]}]
```
### /estructuras-metalicas (HTTP 200)

- title: Estructuras metálicas a medida en Santiago | RINON
- meta description: Estructuras metálicas a medida para cobertizos, pérgolas, escaleras, plataformas, soportes y proyectos especiales desde San Bernardo.
- canonical: https://rinon.cl/estructuras-metalicas
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Service","@id":"https://rinon.cl/estructuras-metalicas#service","name":"Estructuras metálicas a medida","description":"Estructuras metálicas a medida para cobertizos, pérgolas, escaleras, plataformas, soportes y proyectos especiales desde San Bernardo.","url":"https://rinon.cl/estructuras-metalicas","provider":{"@id":"https://rinon.cl/#organization"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Estructuras metálicas a medida","item":"https://rinon.cl/estructuras-metalicas"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Qué necesito para cotizar una estructura metálica?","acceptedAnswer":{"@type":"Answer","text":"Puedes partir con un croquis, plano, fotografía o medidas aproximadas. También necesitamos conocer el uso, la ubicación y si esperas fabricación solamente o si el proyecto debe evaluar montaje."}},{"@type":"Question","name":"¿Fabrican cobertizos y pérgolas metálicas para casas?","acceptedAnswer":{"@type":"Answer","text":"Sí, pueden evaluarse cobertizos y pérgolas residenciales. La geometría, apoyos, cubierta, terminación e integración con la vivienda se confirman para el espacio real antes de fabricar."}},{"@type":"Question","name":"¿También trabajan estructuras para empresas?","acceptedAnswer":{"@type":"Answer","text":"Sí. Se pueden evaluar escaleras, plataformas, soportes, bastidores y otras estructuras para proyectos comerciales u operacionales cuando el requerimiento y sus condiciones técnicas están definidos."}},{"@type":"Question","name":"¿Incluyen cálculo estructural o memoria de cálculo?","acceptedAnswer":{"@type":"Answer","text":"No por defecto. Si el proyecto requiere ingeniería, memoria de cálculo, cargas certificadas o responsabilidad profesional específica, ese alcance debe definirse expresamente antes de comprometer el trabajo."}}]}]
```
### /fabricacion-metalica (HTTP 200)

- title: Fabricación metálica a medida en San Bernardo | RINON
- meta description: Proyectos y fabricación metálica a medida desde foto, plano, croquis, muestra o medidas con RINON en San Bernardo.
- canonical: https://rinon.cl/fabricacion-metalica
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Service","@id":"https://rinon.cl/fabricacion-metalica#service","name":"Fabricación metálica a medida en San Bernardo","description":"Proyectos y fabricación metálica a medida desde foto, plano, croquis, muestra o medidas con RINON en San Bernardo.","url":"https://rinon.cl/fabricacion-metalica","provider":{"@id":"https://rinon.cl/#organization"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Fabricación metálica a medida en San Bernardo","item":"https://rinon.cl/fabricacion-metalica"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Necesito un plano técnico para cotizar fabricación metálica?","acceptedAnswer":{"@type":"Answer","text":"No necesariamente. Puedes comenzar con una foto, croquis, muestra, medidas o una explicación de lo que necesitas resolver. Si hace falta información adicional para fabricar, se define antes de confirmar el alcance."}},{"@type":"Question","name":"¿Qué materiales pueden evaluar?","acceptedAnswer":{"@type":"Answer","text":"RINON puede evaluar trabajos en acero estructural, acero inoxidable y aluminio estructural según el requerimiento, geometría y proceso necesario. El material definitivo se confirma en la propuesta."}},{"@type":"Question","name":"¿La instalación está incluida en todos los proyectos?","acceptedAnswer":{"@type":"Answer","text":"No. La instalación o montaje se evalúa cuando corresponde al proyecto y se incluye solo si queda expresamente incorporada en la cotización vigente."}}]}]
```
### /mobiliario-institucional (HTTP 200)

- title: Mobiliario metálico para requerimientos institucionales. | RINON
- meta description: Camas, camarotes y equipamiento metálico para empresas e instituciones, evaluados por especificación, volumen, destino y plazo.
- canonical: https://rinon.cl/mobiliario-institucional
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### /soldadura-mig (HTTP 200)

- title: Soldadura MIG y fabricación metálica en San Bernardo | RINON
- meta description: Servicio de soldadura MIG en San Bernardo para piezas, reparaciones, conjuntos y fabricación metálica dentro del alcance evaluado.
- canonical: https://rinon.cl/soldadura-mig
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Service","@id":"https://rinon.cl/soldadura-mig#service","name":"Soldadura MIG","description":"Servicio de soldadura MIG en San Bernardo para piezas, reparaciones, conjuntos y fabricación metálica dentro del alcance evaluado.","url":"https://rinon.cl/soldadura-mig","provider":{"@id":"https://rinon.cl/#organization"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Soldadura MIG","item":"https://rinon.cl/soldadura-mig"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Realizan soldadura certificada?","acceptedAnswer":{"@type":"Answer","text":"No se comunica una certificación de soldadura sin respaldo específico. Si tu proyecto exige documentación o calificación, indícalo antes de cotizar."}},{"@type":"Question","name":"¿Puedo llevar una pieza para reparar?","acceptedAnswer":{"@type":"Answer","text":"Puede evaluarse. Envía fotografías, dimensiones y explica la falla antes de coordinar el trabajo."}}]}]
```
### /corte-metalico (HTTP 200)

- title: Corte y dimensionado de metal en San Bernardo | RINON
- meta description: Corte y dimensionado de piezas metálicas dentro de trabajos y requerimientos evaluados por RINON en San Bernardo.
- canonical: https://rinon.cl/corte-metalico
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Service","@id":"https://rinon.cl/corte-metalico#service","name":"Corte","description":"Corte y dimensionado de piezas metálicas dentro de trabajos y requerimientos evaluados por RINON en San Bernardo.","url":"https://rinon.cl/corte-metalico","provider":{"@id":"https://rinon.cl/#organization"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Corte","item":"https://rinon.cl/corte-metalico"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Qué espesores pueden cortar?","acceptedAnswer":{"@type":"Answer","text":"La capacidad se confirma para el material, geometría y proceso del requerimiento. Envía las especificaciones y se evalúa."}},{"@type":"Question","name":"¿Puedo pedir varias piezas iguales?","acceptedAnswer":{"@type":"Answer","text":"Sí, los lotes repetibles pueden evaluarse indicando cantidad y medidas."}}]}]
```
### /pintura-electrostatica (HTTP 200)

- title: Pintura electrostática para metal en Santiago | RINON
- meta description: Pintura electrostática para piezas y estructuras metálicas, cotizada según geometría, cantidad, estado y terminación.
- canonical: https://rinon.cl/pintura-electrostatica
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Service","@id":"https://rinon.cl/pintura-electrostatica#service","name":"Pintura electrostática","description":"Pintura electrostática para piezas y estructuras metálicas, cotizada según geometría, cantidad, estado y terminación.","url":"https://rinon.cl/pintura-electrostatica","provider":{"@id":"https://rinon.cl/#organization"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Pintura electrostática","item":"https://rinon.cl/pintura-electrostatica"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Cómo cotizan la pintura?","acceptedAnswer":{"@type":"Answer","text":"Se revisan geometría, cantidad, dimensiones, estado de las piezas y preparación necesaria antes de confirmar el trabajo."}},{"@type":"Question","name":"¿Qué dimensiones máximas pueden pintar?","acceptedAnswer":{"@type":"Answer","text":"Ese dato se confirma contra las dimensiones útiles reales del proceso antes de aceptar el trabajo."}},{"@type":"Question","name":"¿Qué colores tienen?","acceptedAnswer":{"@type":"Answer","text":"La disponibilidad se confirma al cotizar de acuerdo con la operación vigente del servicio."}}]}]
```
### /instalacion (HTTP 200)

- title: Instalación y montaje de soluciones metálicas en Santiago | RINON
- meta description: Instalación y montaje de soluciones metálicas sujetos al tipo de proyecto, ubicación, accesos y alcance acordado.
- canonical: https://rinon.cl/instalacion
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Service","@id":"https://rinon.cl/instalacion#service","name":"Instalación","description":"Instalación y montaje de soluciones metálicas sujetos al tipo de proyecto, ubicación, accesos y alcance acordado.","url":"https://rinon.cl/instalacion","provider":{"@id":"https://rinon.cl/#organization"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Instalación","item":"https://rinon.cl/instalacion"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Instalan en toda la Región Metropolitana?","acceptedAnswer":{"@type":"Answer","text":"La instalación se evalúa por proyecto y ubicación. Indica la comuna y el tipo de trabajo para confirmar cobertura."}},{"@type":"Question","name":"¿Pueden instalar un producto ya fabricado?","acceptedAnswer":{"@type":"Answer","text":"Puede evaluarse según producto, condiciones del lugar, información disponible y responsabilidad sobre la pieza existente."}}]}]
```
### /reparaciones-metalicas (HTTP 200)

- title: Reparaciones metálicas en San Bernardo | RINON
- meta description: Evaluación de reparaciones, modificaciones y recuperación de piezas y estructuras metálicas desde San Bernardo.
- canonical: https://rinon.cl/reparaciones-metalicas
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Service","@id":"https://rinon.cl/reparaciones-metalicas#service","name":"Reparaciones","description":"Evaluación de reparaciones, modificaciones y recuperación de piezas y estructuras metálicas desde San Bernardo.","url":"https://rinon.cl/reparaciones-metalicas","provider":{"@id":"https://rinon.cl/#organization"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Reparaciones","item":"https://rinon.cl/reparaciones-metalicas"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Toda pieza metálica se puede reparar?","acceptedAnswer":{"@type":"Answer","text":"No. La viabilidad depende de material, daño, geometría y función. En algunos casos fabricar nuevamente puede ser más apropiado."}},{"@type":"Question","name":"¿Pueden ir a revisar a terreno?","acceptedAnswer":{"@type":"Answer","text":"La visita o instalación se evalúa según proyecto y ubicación. Comienza enviando fotografías y contexto."}}]}]
```
### /empresas (HTTP 200)

- title: Fabricación metálica para empresas e instituciones | RINON
- meta description: Fabricación metálica para compras por volumen, proyectos, obras e instituciones con evaluación de cantidad, alcance, logística y fecha objetivo.
- canonical: https://rinon.cl/empresas
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Service","@id":"https://rinon.cl/empresas#service","name":"Fabricación metálica para empresas e instituciones","description":"Fabricación metálica para compras por volumen, proyectos, obras e instituciones con evaluación de cantidad, alcance, logística y fecha objetivo.","url":"https://rinon.cl/empresas","provider":{"@id":"https://rinon.cl/#organization"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Fabricación metálica para empresas e instituciones","item":"https://rinon.cl/empresas"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Pueden cotizar compras por volumen?","acceptedAnswer":{"@type":"Answer","text":"Sí. Para evaluar un lote conviene indicar producto o referencia, cantidad, destino y fecha objetivo. La capacidad y el plazo se confirman para el requerimiento concreto."}},{"@type":"Question","name":"¿Trabajan a partir de planos o especificaciones de empresa?","acceptedAnswer":{"@type":"Answer","text":"Sí, pueden evaluarse piezas, soportes, estructuras y conjuntos bajo plano o especificación cuando la geometría, materiales y requisitos aplicables están suficientemente definidos."}},{"@type":"Question","name":"¿Pueden incluir despacho o montaje?","acceptedAnswer":{"@type":"Answer","text":"Puede evaluarse según ubicación, accesos, condiciones del sitio y alcance del proyecto. No se asume como incluido hasta que aparezca expresamente en la cotización."}},{"@type":"Question","name":"¿Qué información conviene enviar primero?","acceptedAnswer":{"@type":"Answer","text":"Una referencia, la cantidad aproximada, el destino y la fecha objetivo suelen ser suficientes para iniciar. Si existe plano, fotografía, ficha o especificación, también ayuda a reducir iteraciones."}}]}]
```
### /proyectos (HTTP 200)

- title: Proyectos de fabricación metálica | RINON | RINON
- meta description: Referencias, criterios de proyecto y líneas de fabricación RINON para estructuras, cierres, equipamiento y requerimientos institucionales.
- canonical: https://rinon.cl/proyectos
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### /nosotros (HTTP 200)

- title: RINON: fabricación metálica en San Bernardo | RINON
- meta description: Conoce RINON, fabricante de productos y soluciones metálicas desde San Bernardo para particulares, empresas e instituciones.
- canonical: https://rinon.cl/nosotros
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### /contacto (HTTP 200)

- title: Contacto y cotizaciones | RINON
- meta description: Contacta a RINON para evaluar fabricación metálica, estructuras, cierres, camarotes, mobiliario y proyectos a medida desde San Bernardo.
- canonical: https://rinon.cl/contacto
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### /cotizar (HTTP 200)

- title: Cotizar proyecto | RINON
- meta description: Envía una foto, plano, medidas o una descripción para que RINON pueda evaluar tu requerimiento.
- canonical: https://rinon.cl/cotizar
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### /recursos (HTTP 200)

- title: Recursos de fabricación metálica | RINON
- meta description: Guías prácticas para preparar cotizaciones y requerimientos de fabricación metálica, estructuras, cierres, rejas, portones y camarotes.
- canonical: https://rinon.cl/recursos
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### /blog (HTTP 200)

- title: Guías y recursos RINON | RINON
- meta description: Archivo editorial de RINON y acceso a las nuevas guías de fabricación metálica.
- canonical: https://rinon.cl/blog
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### /camarote-con-escritorio (HTTP 200)

- title: Camarote metálico con escritorio | RINON
- meta description: Camarote metálico con escritorio integrado para aprovechar el espacio vertical. Consulta configuración y cotización con RINON.
- canonical: https://rinon.cl/camarote-con-escritorio
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Service","@id":"https://rinon.cl/camarote-con-escritorio#service","name":"Camarote metálico con escritorio","description":"Camarote metálico con escritorio integrado para aprovechar el espacio vertical.","url":"https://rinon.cl/camarote-con-escritorio","provider":{"@id":"https://rinon.cl/#organization"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Camarote metálico con escritorio","item":"https://rinon.cl/camarote-con-escritorio"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Qué medidas tiene el camarote con escritorio?","acceptedAnswer":{"@type":"Answer","text":"Las dimensiones y elementos incluidos deben confirmarse para la configuración vigente que se esté cotizando; no se trasladan medidas de modelos antiguos sin validación."}},{"@type":"Question","name":"¿Se puede pedir por volumen?","acceptedAnswer":{"@type":"Answer","text":"Sí, se pueden evaluar pedidos por volumen indicando cantidad, destino y fecha objetivo."}},{"@type":"Question","name":"¿Puedo enviar las medidas de mi pieza?","acceptedAnswer":{"@type":"Answer","text":"Sí. Ancho, largo y altura disponible ayudan a revisar si la configuración es adecuada antes de avanzar."}}]}]
```
### /equipamiento-metalico (HTTP 200)

- title: Equipamiento metálico a medida en Santiago | RINON
- meta description: Racks, estanterías, lockers, gabinetes, soportes y equipamiento metálico sujeto a requerimiento.
- canonical: https://rinon.cl/equipamiento-metalico
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Service","@id":"https://rinon.cl/equipamiento-metalico#service","name":"Equipamiento metálico","description":"Racks, estanterías, lockers, gabinetes, soportes y equipamiento metálico sujeto a requerimiento.","url":"https://rinon.cl/equipamiento-metalico","provider":{"@id":"https://rinon.cl/#organization"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Equipamiento metálico","item":"https://rinon.cl/equipamiento-metalico"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Venden productos estándar o fabrican a medida?","acceptedAnswer":{"@type":"Answer","text":"Ambos escenarios pueden evaluarse. Si existe una configuración vigente se cotiza como tal; si el requerimiento es distinto, se revisa la factibilidad de fabricación."}},{"@type":"Question","name":"¿Puedo mandar una referencia?","acceptedAnswer":{"@type":"Answer","text":"Sí. Una foto, croquis o producto de referencia ayuda a explicar el requerimiento, junto con medidas, cantidad y uso."}},{"@type":"Question","name":"¿Cómo definen la capacidad de un rack?","acceptedAnswer":{"@type":"Answer","text":"Las cargas no deben asumirse. Si el proyecto depende de una capacidad específica, debe informarse para que el alcance técnico se defina antes de fabricar."}}]}]
```
### /fabricaciones-especiales (HTTP 200)

- title: Fabricaciones metálicas especiales en Santiago | RINON
- meta description: Piezas, conjuntos, bases, soportes y fabricaciones especiales desde plano, muestra, fotografía, croquis o medidas.
- canonical: https://rinon.cl/fabricaciones-especiales
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
[{"@context":"https://schema.org","@type":"Service","@id":"https://rinon.cl/fabricaciones-especiales#service","name":"Fabricaciones especiales","description":"Piezas, conjuntos, bases, soportes y fabricaciones especiales desde plano, muestra, fotografía, croquis o medidas.","url":"https://rinon.cl/fabricaciones-especiales","provider":{"@id":"https://rinon.cl/#organization"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"}},{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"RINON","item":"https://rinon.cl"},{"@type":"ListItem","position":2,"name":"Fabricaciones especiales","item":"https://rinon.cl/fabricaciones-especiales"}]},{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Qué pasa si no sé el nombre técnico?","acceptedAnswer":{"@type":"Answer","text":"No es problema. Describe qué debe hacer la pieza, dónde se usa y aporta fotografías, medidas o referencias si las tienes."}},{"@type":"Question","name":"¿Pueden fabricar desde una muestra?","acceptedAnswer":{"@type":"Answer","text":"Puede evaluarse caso a caso según geometría, material, tolerancias y posibilidad de medir o reproducir correctamente la muestra."}},{"@type":"Question","name":"¿Hacen series?","acceptedAnswer":{"@type":"Answer","text":"Sí se pueden evaluar lotes o series. Indica cantidad estimada para considerar repetibilidad y capacidad desde el inicio."}}]}]
```
### /politica-de-cookies (HTTP 200)

- title: Política de cookies | RINON | RINON
- meta description: Cómo RINON utiliza almacenamiento necesario y activa medición opcional según las preferencias del usuario.
- canonical: https://rinon.cl/politica-de-cookies
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### /politica-de-privacidad (HTTP 200)

- title: Política de privacidad | RINON | RINON
- meta description: Cómo RINON trata los datos personales recibidos a través de su sitio, cotizaciones y canales comerciales.
- canonical: https://rinon.cl/politica-de-privacidad
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### /preguntas-frecuentes (HTTP 200)

- title: Preguntas frecuentes | RINON
- meta description: Preguntas frecuentes sobre fabricación a medida, cotizaciones, planos, cantidades, despacho e instalación con RINON.
- canonical: https://rinon.cl/preguntas-frecuentes
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### JSON-LD 2

```json
{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"¿Fabrican a medida?","acceptedAnswer":{"@type":"Answer","text":"Sí se evalúan trabajos a medida cuando están dentro de la capacidad de fabricación. Puedes partir por plano, croquis, foto, muestra o medidas."}},{"@type":"Question","name":"¿Puedo enviar un plano o foto?","acceptedAnswer":{"@type":"Answer","text":"Sí. Son antecedentes muy útiles para entender dimensiones, geometría y contexto del trabajo."}},{"@type":"Question","name":"¿Atienden empresas y particulares?","acceptedAnswer":{"@type":"Answer","text":"Sí. Para compras por volumen o proyectos de empresa conviene indicar cantidad, destino y fecha objetivo desde el inicio."}},{"@type":"Question","name":"¿Puedo cotizar sin conocer el nombre técnico?","acceptedAnswer":{"@type":"Answer","text":"Sí. Describe qué necesitas resolver, dónde se usa y qué medidas o referencias tienes."}},{"@type":"Question","name":"¿Hacen instalación?","acceptedAnswer":{"@type":"Answer","text":"Se evalúa según tipo de proyecto y ubicación. Indica la comuna o región para revisar el alcance correctamente."}},{"@type":"Question","name":"¿Cuánto demora una cotización?","acceptedAnswer":{"@type":"Answer","text":"Depende de la información y complejidad del requerimiento. Un plano, fotos, medidas y cantidad reducen preguntas adicionales antes de cotizar."}},{"@type":"Question","name":"¿Puedo comprar por volumen?","acceptedAnswer":{"@type":"Answer","text":"Sí. Para una compra por volumen indica cantidad, referencia, destino y fecha objetivo. Eso permite revisar fabricación y logística desde el inicio."}},{"@type":"Question","name":"¿Los precios son estándar?","acceptedAnswer":{"@type":"Answer","text":"No se publica un precio universal cuando el alcance depende de medidas, cantidad, material, terminación, despacho o instalación. La cotización define qué está incluido para el requerimiento evaluado."}}]}
```
### /solicitud-de-datos (HTTP 200)

- title: Solicitud sobre datos personales | RINON | RINON
- meta description: Canal para enviar una solicitud relacionada con datos personales tratados por RINON.
- canonical: https://rinon.cl/solicitud-de-datos
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### /terminos (HTTP 200)

- title: Términos de uso | RINON | RINON
- meta description: Condiciones generales de uso del sitio y alcance de las solicitudes de cotización de RINON.
- canonical: https://rinon.cl/terminos
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
### /tratamiento-superficies (HTTP 200)

- title: Tratamiento de superficies metálicas | RINON
- meta description: Consulta por preparación y terminación de superficies metálicas disponibles en RINON.
- canonical: https://rinon.cl/tratamiento-superficies
### JSON-LD 1

```json
[{"@context":"https://schema.org","@type":["Organization","LocalBusiness"],"@id":"https://rinon.cl/#organization","name":"RINON","legalName":"Tolipoli SpA","taxID":"77.795.508-K","url":"https://rinon.cl","logo":"https://rinon.cl/brand/logo-rinon-horizontal-transparent.png","telephone":"+56 9 7589 3742","address":{"@type":"PostalAddress","streetAddress":"Portezuelo 1506","addressLocality":"San Bernardo","addressRegion":"Región Metropolitana","addressCountry":"CL"},"areaServed":{"@type":"AdministrativeArea","name":"Región Metropolitana de Santiago"},"contactPoint":{"@type":"ContactPoint","telephone":"+56 9 7589 3742","contactType":"sales","areaServed":"Región Metropolitana de Santiago","availableLanguage":["es"]},"description":"Fabricación y soluciones metálicas para particulares, empresas e instituciones."},{"@context":"https://schema.org","@type":"WebSite","@id":"https://rinon.cl/#website","url":"https://rinon.cl","name":"RINON","inLanguage":"es-CL","publisher":{"@id":"https://rinon.cl/#organization"}}]
```
