# Mapeo de URLs GSC-pending

Diagnostico para RC.7. No implementa redirects, no cambia produccion, no activa indexacion y no decide familias SEO por proximidad de slug.

Fuente base: `docs/GSC_PENDING_URLS.csv`, 58 filas con estado `LIVE-OBSERVED GSC-PENDING`.

## Resumen ejecutivo

- URLs con ruta identica viva en RINON 2.0: 0.
- URLs con destino equivalente claro en el primer inventario: 15.
- URLs originalmente clasificadas como parciales/no claras: 43.
- URLs sin candidato tecnico en el inventario actual: 0.
- Decidibles ahora por criterio documentado: 32.
- Requieren export GSC como bloqueo primario: 10.
- Bloqueadas por decision de cobertura: 2.
- Bloqueadas por decision del dueno: 1.
- Sin bloqueo adicional despues del criterio documentado: 30.

Linea critica: 0 de las 58 conserva su ruta. El cutover es una migracion completa de URLs, no un reemplazo de sitio. Sin redirects correctos, las 58 pierden historial de golpe.

La lista critica para cutover es la C documentada mas abajo: rutas que no se deben decidir tecnicamente porque requieren datos GSC, definicion de cobertura fuera de la RM o decision del dueno sobre San Bernardo.

## Tabla de mapeo

| URL actual (rinon.cl) | Estado GSC | ¿Existe equivalente en RINON 2.0? | Ruta destino candidata | Tipo de match |
|---|---|---|---|---|
| `/literas` | GSC-PENDING | Si | `/camarotes` | equivalente |
| `/litera-metalica` | GSC-PENDING | Si | `/camarotes` | equivalente |
| `/camarotes-adultos` | GSC-PENDING | Si | `/camarotes` | equivalente |
| `/camarotes-baratos` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-precio` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-faenas` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-salmoneras` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-mineria` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-metalicos` | GSC-PENDING | Si | `/camarotes` | equivalente |
| `/fabricante-camarotes-chile` | GSC-PENDING | Si | `/camarotes` | equivalente |
| `/camarotes-al-por-mayor` | GSC-PENDING | Si | `/camarotes` | equivalente |
| `/camarotes-para-internados` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-para-hospitales` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-militares` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-providencia` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-las-condes` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-maipu` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-nunoa` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-la-florida` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-pudahuel` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-santiago-centro` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-penalolen` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-quilicura` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-puente-alto` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-san-bernardo` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-renca` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-estacion-central` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarotes-lo-barnechea` | GSC-PENDING | Parcial | `/camarotes` | parcial |
| `/camarote-con-escritorio-economico` | GSC-PENDING | Parcial | `/camarote-con-escritorio` | parcial |
| `/camarote-con-escritorio-full` | GSC-PENDING | Si | `/camarote-con-escritorio` | equivalente |
| `/camarote-con-escritorio-full-2-plazas` | GSC-PENDING | Parcial | `/camarote-con-escritorio` | parcial |
| `/reja-metalica-santiago` | GSC-PENDING | Si | `/rejas-metalicas` | equivalente |
| `/rejas-metalicas-pudahuel` | GSC-PENDING | Parcial | `/rejas-metalicas` | parcial |
| `/rejas-metalicas-maipu` | GSC-PENDING | Parcial | `/rejas-metalicas` | parcial |
| `/rejas-metalicas-cerrillos` | GSC-PENDING | Parcial | `/rejas-metalicas` | parcial |
| `/rejas-metalicas-puente-alto` | GSC-PENDING | Parcial | `/rejas-metalicas` | parcial |
| `/rejas-metalicas-precio` | GSC-PENDING | Parcial | `/rejas-metalicas` | parcial |
| `/rejas-metalicas-para-casas` | GSC-PENDING | Si | `/rejas-metalicas` | equivalente |
| `/rejas-decorativas` | GSC-PENDING | Parcial | `/rejas-metalicas` | parcial |
| `/rejas-para-exteriores` | GSC-PENDING | Si | `/rejas-metalicas` | equivalente |
| `/rejas-para-terraza` | GSC-PENDING | Parcial | `/rejas-metalicas` | parcial |
| `/rejas-para-balcon` | GSC-PENDING | Parcial | `/rejas-metalicas` | parcial |
| `/portones-industriales` | GSC-PENDING | Si | `/portones-metalicos` | equivalente |
| `/cercos-para-empresas` | GSC-PENDING | Si | `/cierres-perimetrales` | equivalente |
| `/cercos-para-parcelas` | GSC-PENDING | Si | `/cierres-perimetrales` | equivalente |
| `/cercos-perimetrales-concepcion` | GSC-PENDING | Parcial | `/cierres-perimetrales` | parcial |
| `/cercos-perimetrales-antofagasta` | GSC-PENDING | Parcial | `/cierres-perimetrales` | parcial |
| `/mallas-separadoras-industriales` | GSC-PENDING | Si | `/mallas-separadoras` | equivalente |
| `/soldadura-metalica-santiago` | GSC-PENDING | Si | `/soldadura-mig` | equivalente |
| `/pintura-electrostatica-zona-sur-santiago` | GSC-PENDING | Parcial | `/pintura-electrostatica` | parcial |
| `/pintura-electrostatica-colina` | GSC-PENDING | Parcial | `/pintura-electrostatica` | parcial |
| `/pintura-electrostatica-las-condes` | GSC-PENDING | Parcial | `/pintura-electrostatica` | parcial |
| `/pintura-electrostatica-providencia` | GSC-PENDING | Parcial | `/pintura-electrostatica` | parcial |
| `/pintura-electrostatica-santiago-centro` | GSC-PENDING | Parcial | `/pintura-electrostatica` | parcial |
| `/pintura-electrostatica-maipu` | GSC-PENDING | Parcial | `/pintura-electrostatica` | parcial |
| `/pintura-electrostatica-talagante` | GSC-PENDING | Parcial | `/pintura-electrostatica` | parcial |
| `/pintura-electrostatica-la-pintana` | GSC-PENDING | Parcial | `/pintura-electrostatica` | parcial |
| `/pintura-electrostatica-la-cisterna` | GSC-PENDING | Parcial | `/pintura-electrostatica` | parcial |

## A. URLs con destino exacto

Ninguna. Las 58 URLs GSC-pending no existen con la misma ruta en RINON 2.0.

## B. URLs con destino equivalente pero ruta distinta

Estas requieren redirect si el dueno aprueba consolidar la intencion en la ruta candidata:

- `/literas` -> `/camarotes`
- `/litera-metalica` -> `/camarotes`
- `/camarotes-adultos` -> `/camarotes`
- `/camarotes-metalicos` -> `/camarotes`
- `/fabricante-camarotes-chile` -> `/camarotes`
- `/camarotes-al-por-mayor` -> `/camarotes`
- `/camarote-con-escritorio-full` -> `/camarote-con-escritorio`
- `/reja-metalica-santiago` -> `/rejas-metalicas`
- `/rejas-metalicas-para-casas` -> `/rejas-metalicas`
- `/rejas-para-exteriores` -> `/rejas-metalicas`
- `/portones-industriales` -> `/portones-metalicos`
- `/cercos-para-empresas` -> `/cierres-perimetrales`
- `/cercos-para-parcelas` -> `/cierres-perimetrales`
- `/mallas-separadoras-industriales` -> `/mallas-separadoras`
- `/soldadura-metalica-santiago` -> `/soldadura-mig`

## C. URLs que siguen sin destino ejecutable

Estas no se deben convertir en redirects automaticos todavia. Requieren datos GSC, definicion del dueno o decision de ubicacion.

| URL origen | Decisión | Destino | Justificación | ¿requiere dato GSC? | Tipo de bloqueo |
|---|---|---|---|---|---|
| `/camarotes-faenas` | NO CONSOLIDAR sin datos | Por definir | Intencion B2B/sectorial valiosa; puede implicar especificacion, volumen y condiciones de entrega propias. | Si | dato_gsc |
| `/camarotes-salmoneras` | NO CONSOLIDAR sin datos | Por definir | Intencion sectorial exacta para cliente B2B; no es solo sinonimo de camarote. | Si | dato_gsc |
| `/camarotes-mineria` | NO CONSOLIDAR sin datos | Por definir | Intencion sectorial con exigencias potencialmente propias; no inferir certificaciones ni condiciones de faena. | Si | dato_gsc |
| `/camarotes-para-internados` | NO CONSOLIDAR sin datos | Por definir | Intencion institucional y de volumen; puede requerir pagina o seccion especifica. | Si | dato_gsc |
| `/camarotes-para-hospitales` | NO CONSOLIDAR sin datos | Por definir | Intencion institucional sensible; no consolidar sin saber valor organico y alcance real. | Si | dato_gsc |
| `/camarotes-militares` | NO CONSOLIDAR sin datos | Por definir | Intencion institucional/licitacion; puede tener requisitos propios y valor alto. | Si | dato_gsc |
| `/rejas-decorativas` | PRESERVAR | Por definir, pagina propia enlazada desde `/rejas-metalicas` | Producto/intencion distinta a reja perimetral generica. | Solo para priorizar | dato_gsc |
| `/rejas-para-terraza` | PRESERVAR | Por definir, pagina propia enlazada desde `/rejas-metalicas` | Uso distinto y mas residencial; no es solo comuna ni sinonimo. | Solo para priorizar | dato_gsc |
| `/rejas-para-balcon` | PRESERVAR | Por definir, pagina propia enlazada desde `/rejas-metalicas` | Uso distinto, con restricciones y lenguaje propio. | Solo para priorizar | dato_gsc |
| `/cercos-perimetrales-concepcion` | BLOQUEADO POR COBERTURA | Por definir | El schema declara `areaServed: Región Metropolitana de Santiago`; hay que confirmar si RINON atiende Concepcion. | No: decision de cobertura | decision_cobertura |
| `/cercos-perimetrales-antofagasta` | BLOQUEADO POR COBERTURA | Por definir | El schema declara `areaServed: Región Metropolitana de Santiago`; hay que confirmar si RINON atiende Antofagasta. | No: decision de cobertura | decision_cobertura |
| `/camarotes-san-bernardo` | PRESERVAR CONTENIDO, ubicacion por definir | Por definir: landing propia o `/nosotros#ubicacion` | San Bernardo es la ubicacion real del taller; tiene informacion local defendible. | No: decision del dueno | decision_dueño |

## Decisiones documentadas sobre las 43 antiguas de Lista C

Estas decisiones quedan documentadas, no ejecutadas. Ningun redirect se implementa en este lote.

| URL origen | Decisión | Destino | Justificación | ¿requiere dato GSC? | Tipo de bloqueo |
|---|---|---|---|---|---|
| `/camarotes-providencia` | CONSOLIDAR · 301 | `/camarotes` | Producto identico y despacho a toda la RM; 13 comunas casi iguales serian patron doorway. | No | ninguno |
| `/camarotes-las-condes` | CONSOLIDAR · 301 | `/camarotes` | Producto identico y despacho a toda la RM; comuna no cambia el producto. | No | ninguno |
| `/camarotes-maipu` | CONSOLIDAR · 301 | `/camarotes` | Producto identico y despacho a toda la RM; comuna no cambia el producto. | No | ninguno |
| `/camarotes-nunoa` | CONSOLIDAR · 301 | `/camarotes` | Producto identico y despacho a toda la RM; comuna no cambia el producto. | No | ninguno |
| `/camarotes-la-florida` | CONSOLIDAR · 301 | `/camarotes` | Producto identico y despacho a toda la RM; comuna no cambia el producto. | No | ninguno |
| `/camarotes-pudahuel` | CONSOLIDAR · 301 | `/camarotes` | Producto identico y despacho a toda la RM; comuna no cambia el producto. | No | ninguno |
| `/camarotes-santiago-centro` | CONSOLIDAR · 301 | `/camarotes` | Producto identico y despacho a toda la RM; comuna no cambia el producto. | No | ninguno |
| `/camarotes-penalolen` | CONSOLIDAR · 301 | `/camarotes` | Producto identico y despacho a toda la RM; comuna no cambia el producto. | No | ninguno |
| `/camarotes-quilicura` | CONSOLIDAR · 301 | `/camarotes` | Producto identico y despacho a toda la RM; comuna no cambia el producto. | No | ninguno |
| `/camarotes-puente-alto` | CONSOLIDAR · 301 | `/camarotes` | Producto identico y despacho a toda la RM; comuna no cambia el producto. | No | ninguno |
| `/camarotes-renca` | CONSOLIDAR · 301 | `/camarotes` | Producto identico y despacho a toda la RM; comuna no cambia el producto. | No | ninguno |
| `/camarotes-estacion-central` | CONSOLIDAR · 301 | `/camarotes` | Producto identico y despacho a toda la RM; comuna no cambia el producto. | No | ninguno |
| `/camarotes-lo-barnechea` | CONSOLIDAR · 301 | `/camarotes` | Producto identico y despacho a toda la RM; comuna no cambia el producto. | No | ninguno |
| `/camarotes-san-bernardo` | PRESERVAR CONTENIDO | Por definir | Es donde esta el taller: retiro, direccion y cercania son datos reales. Definir si vive como landing propia o seccion de `/nosotros#ubicacion`. | No | decision_dueño |
| `/pintura-electrostatica-colina` | CONSOLIDAR · 301 | `/pintura-electrostatica` | La pieza viaja al taller; la distancia importa, pero no justifica una pagina por comuna sin evidencia diferenciada. | No | ninguno |
| `/pintura-electrostatica-las-condes` | CONSOLIDAR · 301 | `/pintura-electrostatica` | La pieza viaja al taller; comuna no cambia el servicio confirmado. | No | ninguno |
| `/pintura-electrostatica-providencia` | CONSOLIDAR · 301 | `/pintura-electrostatica` | La pieza viaja al taller; comuna no cambia el servicio confirmado. | No | ninguno |
| `/pintura-electrostatica-santiago-centro` | CONSOLIDAR · 301 | `/pintura-electrostatica` | La pieza viaja al taller; comuna no cambia el servicio confirmado. | No | ninguno |
| `/pintura-electrostatica-maipu` | CONSOLIDAR · 301 | `/pintura-electrostatica` | La pieza viaja al taller; comuna no cambia el servicio confirmado. | No | ninguno |
| `/pintura-electrostatica-talagante` | CONSOLIDAR · 301 | `/pintura-electrostatica` | La pieza viaja al taller; comuna no cambia el servicio confirmado. | No | ninguno |
| `/pintura-electrostatica-la-pintana` | CONSOLIDAR · 301 | `/pintura-electrostatica` | La pieza viaja al taller; comuna no cambia el servicio confirmado. | No | ninguno |
| `/pintura-electrostatica-la-cisterna` | CONSOLIDAR · 301 | `/pintura-electrostatica` | La pieza viaja al taller; comuna no cambia el servicio confirmado. | No | ninguno |
| `/pintura-electrostatica-zona-sur-santiago` | EVALUAR PRESERVAR | Por definir | Zona sur puede reflejar proximidad real al taller y una busqueda distinta a comuna aislada. | Si | dato_gsc |
| `/camarotes-faenas` | NO CONSOLIDAR sin datos | Por definir | Grupo B2B valioso; coincide con compra por volumen y posible especificacion propia. | Si | dato_gsc |
| `/camarotes-salmoneras` | NO CONSOLIDAR sin datos | Por definir | Grupo B2B valioso; sector con contexto propio. | Si | dato_gsc |
| `/camarotes-mineria` | NO CONSOLIDAR sin datos | Por definir | Grupo B2B valioso; no inferir requisitos de faena sin respaldo. | Si | dato_gsc |
| `/camarotes-para-internados` | NO CONSOLIDAR sin datos | Por definir | Grupo institucional/de volumen; puede merecer contenido propio. | Si | dato_gsc |
| `/camarotes-para-hospitales` | NO CONSOLIDAR sin datos | Por definir | Grupo institucional sensible; requiere datos antes de decidir. | Si | dato_gsc |
| `/camarotes-militares` | NO CONSOLIDAR sin datos | Por definir | Grupo institucional/de compra formal; requiere datos antes de decidir. | Si | dato_gsc |
| `/rejas-decorativas` | PRESERVAR | Pagina propia por definir, enlazada desde `/rejas-metalicas` | Intencion distinta a reja perimetral: producto y criterio de decision propios. | Solo para priorizar | dato_gsc |
| `/rejas-para-terraza` | PRESERVAR | Pagina propia por definir, enlazada desde `/rejas-metalicas` | Uso residencial/especifico distinto a cierre perimetral generico. | Solo para priorizar | dato_gsc |
| `/rejas-para-balcon` | PRESERVAR | Pagina propia por definir, enlazada desde `/rejas-metalicas` | Uso especifico con lenguaje y restricciones propias. | Solo para priorizar | dato_gsc |
| `/rejas-metalicas-pudahuel` | CONSOLIDAR · 301 | `/rejas-metalicas` | Comuna no cambia el producto; evitar patron doorway. | No | ninguno |
| `/rejas-metalicas-maipu` | CONSOLIDAR · 301 | `/rejas-metalicas` | Comuna no cambia el producto; evitar patron doorway. | No | ninguno |
| `/rejas-metalicas-cerrillos` | CONSOLIDAR · 301 | `/rejas-metalicas` | Comuna no cambia el producto; evitar patron doorway. | No | ninguno |
| `/rejas-metalicas-puente-alto` | CONSOLIDAR · 301 | `/rejas-metalicas` | Comuna no cambia el producto; evitar patron doorway. | No | ninguno |
| `/rejas-metalicas-precio` | CONSOLIDAR · 301 | `/rejas-metalicas` | Trafico de comparacion/precio; la cotizacion define alcance, no una landing de precio. | No | ninguno |
| `/camarotes-baratos` | CONSOLIDAR · 301 | `/camarotes` | "Baratos" contradice posicionamiento de marca y no define producto distinto. | No | ninguno |
| `/camarotes-precio` | CONSOLIDAR · 301 | `/camarotes` | Trafico de comparacion/precio; la cotizacion define alcance. | No | ninguno |
| `/camarote-con-escritorio-economico` | CONSOLIDAR · 301 | `/camarote-con-escritorio` | Variante comercial/precio sin producto propio aprobado. | No | ninguno |
| `/camarote-con-escritorio-full-2-plazas` | CONSOLIDAR · 301 | `/camarote-con-escritorio` | Variante del mismo owner; plazas y configuracion se confirman en cotizacion. | No | ninguno |
| `/cercos-perimetrales-concepcion` | BLOQUEADO POR COBERTURA | Por definir | Area servida declarada es RM; confirmar si RINON atiende Concepcion o si esta URL debe retirarse/consolidarse. | No | decision_cobertura |
| `/cercos-perimetrales-antofagasta` | BLOQUEADO POR COBERTURA | Por definir | Area servida declarada es RM; confirmar si RINON atiende Antofagasta o si esta URL debe retirarse/consolidarse. | No | decision_cobertura |

## Resumen de decision de la Lista C

- Tipo de bloqueo `ninguno`: 30.
- Tipo de bloqueo `dato_gsc`: 10 (6 sectoriales de camarotes, 3 tipologias de reja y `/pintura-electrostatica-zona-sur-santiago`).
- Tipo de bloqueo `decision_cobertura`: 2 (`/cercos-perimetrales-concepcion`, `/cercos-perimetrales-antofagasta`).
- Tipo de bloqueo `decision_dueño`: 1 (`/camarotes-san-bernardo`).

Nota de conteo: con la separacion por tipo de bloqueo, la discrepancia queda explicada. El conteo no cierra en 9 si `/pintura-electrostatica-zona-sur-santiago` se mantiene como bloqueo por dato GSC; cierra en 10. El numero 9 solo cuenta 6 sectoriales de camarotes + 3 tipologias de reja.

## Verificaciones adicionales

### 1. `/mallas-3d` y `/mallas-separadoras`

Son rutas distintas en RC.7.

- `/mallas-3d`: panel modular de malla electrosoldada para cierres perimetrales y delimitaciones. El H1 es "Un panel metalico modular para el perimetro." El CTA de cotizacion usa `category=cierres&detail=malla_3d`.
- `/mallas-separadoras`: divisiones metalicas y mallas separadoras para bodegas, galpones, plantas y espacios operacionales. El H1 es "Divide el espacio sin perder lectura del recinto." El CTA de cotizacion usa `category=cierres&detail=mallas_separadoras`.

Diagnostico: no son duplicadas si se mantiene la frontera "perimetro/panel 3D" versus "division interior/operacional". Hay riesgo de canibalizacion solo en consultas genericas de "mallas" o "malla metalica"; eso debe resolverse con el export de Search Console por query antes de fijar redirects.

### 2. CTA de `/empresas`

`/empresas` enlaza a `/recursos/fabricacion-por-lote-que-definir` en el CTA "Preparar compra".

Estado verificado contra preview explicito `rinon-v2-izf0cujn1-filipovalverde-5673s-projects.vercel.app`: HTTP 200.

Titulo servido: "Fabricacion por lote: que definir antes de pedir precio por volumen | RINON".

Conclusion: no hay 404 en RC.7; el CTA no esta perdiendo conversion en el preview verificado.

### 3. Rutas huerfanas

Rutas publicas existentes en `app/` o en la plantilla legacy-commercial que no aparecen enlazadas desde header, footer ni navegacion/render de paginas escaneadas:

- `/cama-alta`
- `/cama-dos-plazas-con-cajon`
- `/cama-institucional-metalica`
- `/cama-loft-con-escritorio`
- `/cama-loft-metalica`
- `/camarote-1-5-plazas`
- `/camarote-2-plazas`
- `/camarote-desmontable`
- `/camarote-doble`
- `/camarote-nido`
- `/camarote-titanic`
- `/camarote-triple`
- `/tratamiento-superficies`

Notas:

- `/soluciones` no esta huerfana: aparece enlazada desde Home, DesktopMegaNav, `/proyectos` y paginas legacy.
- `/mobiliario-institucional` no esta huerfana: `/proyectos` la enlaza como ruta institucional.
- Las rutas legacy de camas/camarotes preservadas existen y son organicas, pero no estan descubiertas desde navegacion principal ni desde un listado visible de variantes.

### 4. Discrepancia del `logo` en JSON-LD de Organization

Origen actual:

- `lib/seo.ts` define `organizationJsonLd` con `@id: https://rinon.cl/#organization` y `logo: https://rinon.cl/brand/logo-rinon-horizontal.png`.
- `app/layout.tsx` monta ese `organizationJsonLd` globalmente en todas las paginas.
- `components/SiteHeader.tsx`, `components/SiteFooter.tsx` y `components/MobileNav.tsx` renderizan el lockup visual desde `/brand/rinon-lockup-horizontal-inverse.svg`.
- Busqueda de segunda definicion `Organization` / `LocalBusiness`: no aparece otra definicion en `app/`, `components/`, `lib/`, `scripts/` ni `tests/`.
- Comparacion en el mismo preview actual `rinon-v2-izf0cujn1-filipovalverde-5673s-projects.vercel.app`: Home y `/empresas` sirven `logo: https://rinon.cl/brand/logo-rinon-horizontal.png`.
- `public/brand/logo-rinon-horizontal.png` existe y es PNG raster 1760x420; schema.org prefiere raster para logo, por lo que este valor es adecuado.

Conclusion: la discrepancia observada venia de un deploy/cache anterior. En el deploy actual no hay discrepancia entre Home y `/empresas`; ambas paginas usan el JSON-LD global con el mismo `@id` y el mismo PNG raster.

No se corrigio en este lote.

### 5. Exclusión deliberada de `/tratamiento-superficies`

Decision registrada el 2026-09-07: `/tratamiento-superficies` queda sin enlazar por instruccion explicita. No es una omision del inventario ni un error de IA. La ruta depende de la decision no tecnica sobre la linea "Terminaciones" y no debe ser enlazada automaticamente desde este lote.
