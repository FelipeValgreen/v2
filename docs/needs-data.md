# Datos pendientes (no inventados)

Registro de datos que el sitio o el traspaso a `rinon.cl` necesitan y que **no** existen en el repositorio ni pudieron verificarse desde esta sesión. Ningún valor de esta lista fue inventado ni supuesto en el código.

| # | Dato | Dónde se usa | Quién lo aporta | Estado |
| --- | --- | --- | --- | --- |
| 1 | ID de contenedor GTM (`GTM-XXXXXXX`) | `NEXT_PUBLIC_GTM_ID` → `components/ProductionTracking.tsx` | Felipe | Pendiente. Sin id, GTM no se carga (el hook queda listo). |
| 2 | ID de propiedad GA4 (`G-XXXXXXX`) | Se configura **dentro** de GTM (no en el código). | Felipe | Pendiente. |
| 3 | ID de proyecto Microsoft Clarity | `NEXT_PUBLIC_CLARITY_ID` | Felipe | Pendiente. Sin id, Clarity no se carga. |
| 4 | Export de Search Console del sitio viejo (páginas + consultas, 16 meses) | Resolver las 58 URLs `GSC-PENDING` de `docs/GSC_PENDING_URLS.csv` y elegir las 3 páginas de mayor tráfico a preservar | Enrique (propietario de la propiedad GSC de `rinon.cl`) | Pendiente. Sin este dato no se puede afirmar cuáles son las páginas de mayor tráfico. |
| 5 | Valor del registro TXT `_vercel.rinon.cl` que pedirá Vercel al agregar el dominio | `docs/cutover-rinon-cl.md` §3 | Aparece en el panel de Vercel al agregar el dominio; lo carga Enrique en DNS | Pendiente. |
| 6 | Registros DNS actuales de `rinon.cl` / `www.rinon.cl` | `docs/cutover-rinon-cl.md` §4 | Cualquiera con `dig` (este contenedor no tiene salida a `rinon.cl`) | Pendiente de comprobar. |
| 7 | Confirmación de que la Edge Function `rinon-public-intake`, la tabla `leads` y el bucket privado `rinon-lead-attachments` están desplegados en el proyecto Supabase `wbinwroidinsretcgsox` | `lib/public-intake.ts`, `lib/leads.ts`, `lib/lead-attachments.ts` | Felipe (panel Supabase) | Pendiente. El código lo asume; no se probó escritura desde esta sesión. |
| 8 | `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD` de producción | Env vars de servidor del proyecto `rinon-v2` | Felipe | Pendiente (nunca deben ir al repo ni a `NEXT_PUBLIC_*`). |
| 9 | Correo público de contacto / privacidad | `NEXT_PUBLIC_RINON_PRIVACY_EMAIL` (`lib/legal.ts`) | Felipe | Verificar si el valor actual por defecto es el correcto; no se modificó. |
| 10 | Plan de Vercel del team `filipovalverde-5673s-projects` | Decide si `"regions": ["gru1"]` en `vercel.json` se aplica (Hobby permite una sola región; Pro varias) | Felipe | Pendiente de confirmar en el panel. |
| 11 | Intención de diseño del título "Elige cómo empezar." (home) | `app/legibility.css` lo pasa a tinta; si estaba pensado sobre foto/fondo oscuro, hay que decidir | Felipe / diseño | Pendiente de confirmar (ver reporte). |

Datos ya verificados en el código y que **no** deben cambiarse: razón social Tolipoli SpA, RUT 77.795.508-K, Portezuelo 1506, San Bernardo, WhatsApp/teléfono +56 9 7589 3742.
